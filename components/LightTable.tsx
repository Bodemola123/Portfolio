"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { projects } from "@/lib/projects";
import { deckState } from "@/lib/deckState";

const W = 3.2;
const H = 2.0;
const BG = new THREE.Color("#0c0b09");
const WHITE = new THREE.Color("#ffffff");

type Props = { lite: boolean; onReady: () => void; onOpen: (slug: string) => void };

export default function LightTable({ lite, onReady, onOpen }: Props) {
  const [dpr, setDpr] = useState<number | [number, number]>(lite ? [1, 1.5] : [1, 2]);
  return (
    <Canvas
      flat
      frameloop="demand"
      dpr={dpr}
      camera={{ position: [0, 0.15, 7], fov: 35 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      style={{ touchAction: "pan-y" }}
    >
      <Suspense fallback={null}>
        <Deck lite={lite} onOpen={onOpen} onSlow={() => setDpr(1)} />
        <Ready onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}

/** Compiles every material and uploads textures before the canvas fades in, so the first scroll never stalls. */
function Ready({ onReady }: { onReady: () => void }) {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  const camera = useThree((s) => s.camera);
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    let cancelled = false;
    gl.compileAsync(scene, camera).catch(() => {}).finally(() => {
      if (cancelled) return;
      invalidate();
      requestAnimationFrame(() => { if (!cancelled) onReady(); });
    });
    return () => { cancelled = true; };
  }, [gl, scene, camera, invalidate, onReady]);
  return null;
}

/** A rounded-rectangle mask and a soft glow, drawn once on 2D canvases instead of using lights. */
function useCanvasTextures() {
  const textures = useMemo(() => {
    const round = document.createElement("canvas");
    round.width = 512; round.height = 320;
    const r = round.getContext("2d")!;
    r.fillStyle = "#000"; r.fillRect(0, 0, 512, 320);
    r.fillStyle = "#fff"; r.beginPath(); r.roundRect(0, 0, 512, 320, 12); r.fill();

    const glow = document.createElement("canvas");
    glow.width = 256; glow.height = 256;
    const g = glow.getContext("2d")!;
    g.shadowColor = "#fff";
    g.shadowBlur = 40;
    g.fillStyle = "#fff";
    g.beginPath(); g.roundRect(64, 70, 128, 116, 20); g.fill();

    const blob = document.createElement("canvas");
    blob.width = 128; blob.height = 128;
    const b = blob.getContext("2d")!;
    const grad = b.createRadialGradient(64, 64, 2, 64, 64, 64);
    grad.addColorStop(0, "rgba(0,0,0,0.8)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    b.fillStyle = grad; b.fillRect(0, 0, 128, 128);

    return {
      round: new THREE.CanvasTexture(round),
      glow: new THREE.CanvasTexture(glow),
      blob: new THREE.CanvasTexture(blob),
    };
  }, []);
  useEffect(() => () => Object.values(textures).forEach((t) => t.dispose()), [textures]);
  return textures;
}

/** Where a screen sits for a given distance d from the current project (0 = front). */
function layout(d: number) {
  if (d >= 0) {
    const front = Math.max(0, 1 - d);
    return {
      x: d * 0.24, y: d * 0.21, z: -d * 0.75 + front * 0.5,
      rx: -0.1, ry: -0.42 + front * 0.22,
      bright: THREE.MathUtils.clamp(1 - (d - 0.6) * 0.32, 0.08, 1),
      glow: 0.1 + front * 0.8,
    };
  }
  const e = Math.min(-d, 1.6);
  return {
    x: 0, y: e * 2.5, z: 0.5 + e * 1.3,
    rx: -0.1 - e * 1.1, ry: -0.2,
    bright: THREE.MathUtils.clamp(1 - e * 1.4, 0.08, 1),
    glow: Math.max(0, 0.9 - e * 2.2),
  };
}

type DeckProps = { lite: boolean; onOpen: (slug: string) => void; onSlow: () => void };

function Deck({ lite, onOpen, onSlow }: DeckProps) {
  // Same files as the CSS poster, so they come from the browser cache.
  const maps = useLoader(THREE.TextureLoader, projects.map((p) => `${p.cover}-1024.jpg`));
  const { round, glow, blob } = useCanvasTextures();
  const gl = useThree((s) => s.gl);
  const viewport = useThree((s) => s.viewport);
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    const aniso = Math.min(lite ? 2 : 4, gl.capabilities.getMaxAnisotropy());
    maps.forEach((m) => {
      m.colorSpace = THREE.SRGBColorSpace;
      m.anisotropy = aniso;
      m.needsUpdate = true;
    });
  }, [maps, gl, lite]);

  // Frame-time watch while the deck moves: drop to 1x pixel ratio if frames run long.
  const perf = useRef({ sum: 0, n: 0, dropped: false });

  useEffect(() => {
    deckState.invalidate = invalidate;
    return () => { deckState.invalidate = () => {}; };
  }, [invalidate]);

  const group = useRef<THREE.Group>(null);
  const panels = useRef<(THREE.Group | null)[]>([]);
  const shots = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  const glows = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  const cur = useRef(deckState.target);
  const tilt = useRef({ x: 0, y: 0 });
  const hovered = useRef(-1);
  const colors = useMemo(() => projects.map((p) => new THREE.Color(p.color)), []);

  const fit = Math.min(viewport.width / 4.7, viewport.height / 3.7, 1.1);

  useFrame((_, delta) => {
    const p = perf.current;
    if (!p.dropped && delta > 0 && delta < 0.1) {
      p.sum += delta; p.n += 1;
      if (p.n === 90) {
        if (p.sum / p.n > 1 / 40) { p.dropped = true; onSlow(); }
        p.sum = 0; p.n = 0;
      }
    }
    const dt = Math.min(delta, 0.05);
    cur.current = THREE.MathUtils.damp(cur.current, deckState.target, 5, dt);
    const tx = lite ? 0 : deckState.pointerX * 0.07;
    const ty = lite ? 0 : deckState.pointerY * 0.04;
    tilt.current.x = THREE.MathUtils.damp(tilt.current.x, tx, 4, dt);
    tilt.current.y = THREE.MathUtils.damp(tilt.current.y, ty, 4, dt);

    if (group.current) {
      group.current.rotation.y = tilt.current.x;
      group.current.rotation.x = tilt.current.y;
    }

    const activeIndex = Math.round(cur.current);
    panels.current.forEach((panel, i) => {
      if (!panel) return;
      const l = layout(i - cur.current);
      const lift = hovered.current === i && i === activeIndex ? 0.12 : 0;
      panel.position.set(l.x, l.y, l.z + lift);
      panel.rotation.set(l.rx, l.ry, 0);
      panel.visible = l.bright > 0.09;
      shots.current[i]?.color.copy(BG).lerp(WHITE, l.bright);
      const gm = glows.current[i];
      if (gm) gm.opacity = l.glow * (lite ? 0.75 : 1);
    });

    const settled =
      Math.abs(cur.current - deckState.target) < 0.0005 &&
      Math.abs(tilt.current.x - tx) < 0.0005 &&
      Math.abs(tilt.current.y - ty) < 0.0005;
    if (!settled && deckState.visible) invalidate();
  });

  return (
    <group scale={fit} position={[-0.35 * fit, -0.3 * fit, 0]}>
      <mesh position={[0.3, -1.45, -0.4]} rotation-x={-Math.PI / 2} renderOrder={-1}>
        <planeGeometry args={[6, 2.2]} />
        <meshBasicMaterial map={blob} transparent depthWrite={false} toneMapped={false} />
      </mesh>
      <group ref={group}>
        {projects.map((p, i) => (
          <group
            key={p.slug}
            ref={(el) => { panels.current[i] = el; }}
            onClick={(e) => {
              if (i !== Math.round(cur.current)) return;
              e.stopPropagation();
              onOpen(p.slug);
            }}
            onPointerOver={(e) => {
              if (lite || i !== Math.round(cur.current)) return;
              e.stopPropagation();
              hovered.current = i;
              document.body.style.cursor = "pointer";
              invalidate();
            }}
            onPointerOut={() => {
              if (hovered.current !== i) return;
              hovered.current = -1;
              document.body.style.cursor = "";
              invalidate();
            }}
          >
            <mesh position-z={-0.06} renderOrder={1}>
              <planeGeometry args={[W * 1.55, H * 1.75]} />
              <meshBasicMaterial
                ref={(m) => { glows.current[i] = m; }}
                map={glow}
                color={colors[i]}
                transparent
                opacity={0}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                toneMapped={false}
              />
            </mesh>
            <mesh position-z={-0.004}>
              <planeGeometry args={[W + 0.05, H + 0.05]} />
              <meshBasicMaterial color="#3d3a32" alphaMap={round} alphaTest={0.5} toneMapped={false} />
            </mesh>
            <mesh>
              <planeGeometry args={[W, H]} />
              <meshBasicMaterial
                ref={(m) => { shots.current[i] = m; }}
                map={maps[i]}
                alphaMap={round}
                alphaTest={0.5}
                toneMapped={false}
              />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
