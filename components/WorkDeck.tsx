"use client";

import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { projects } from "@/lib/projects";
import { deckState } from "@/lib/deckState";

const LightTable = dynamic(() => import("./LightTable"), { ssr: false });

/** Keeps a 3D failure from blanking the page: the CSS stage stays. */
class StageBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

type Mode = "pending" | "3d" | "flat";

function canRender3D() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  if (nav.connection?.saveData) return false;
  if (nav.deviceMemory !== undefined && nav.deviceMemory < 2) return false;
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
}

export default function WorkDeck({ intro }: { intro: ReactNode }) {
  const router = useRouter();
  const stageRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(-1);
  const [mode, setMode] = useState<Mode>("pending");
  const [lite, setLite] = useState(true);
  const [ready, setReady] = useState(false);

  // Decide on 3D after the page has painted, so the work never waits for it.
  useEffect(() => {
    let cancelled = false;
    const decide = () => {
      if (cancelled) return;
      if (!canRender3D()) { setMode("flat"); return; }
      setLite(window.matchMedia("(max-width: 1023px), (pointer: coarse)").matches);
      setMode("3d");
    };
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const schedule = () => {
      if (w.requestIdleCallback) w.requestIdleCallback(decide, { timeout: 1500 });
      else setTimeout(decide, 300);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
    };
  }, []);

  // Native scroll drives the deck: read chapter positions, never hijack the wheel.
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const els = chapterRefs.current.filter(Boolean) as HTMLElement[];
      if (!els.length) return;
      const stage = stageRef.current?.getBoundingClientRect();
      const desktop = window.innerWidth >= 1024;
      const top = desktop || !stage ? 0 : stage.bottom;
      const line = top + (window.innerHeight - top) * (desktop ? 0.5 : 0.42);
      const centers = els.map((el) => {
        const r = el.getBoundingClientRect();
        return r.top + r.height / 2;
      });
      let f = -1;
      if (line <= centers[0]) f = -1;
      else if (line >= centers[centers.length - 1]) f = centers.length - 2;
      else {
        for (let k = 0; k < centers.length - 1; k++) {
          if (line >= centers[k] && line < centers[k + 1]) {
            f = k - 1 + (line - centers[k]) / (centers[k + 1] - centers[k]);
            break;
          }
        }
      }
      deckState.target = f;
      setActive((prev) => {
        const next = Math.round(f);
        return prev === next ? prev : next;
      });
      if (deckState.visible) deckState.invalidate();
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(measure); };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Pointer tilt on desktop, and pausing when the stage is off screen.
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const onMove = (e: PointerEvent) => {
      deckState.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      deckState.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
      if (deckState.visible) deckState.invalidate();
    };
    if (fine) window.addEventListener("pointermove", onMove, { passive: true });
    const io = new IntersectionObserver(([entry]) => {
      deckState.visible = entry.isIntersecting;
      if (entry.isIntersecting) deckState.invalidate();
    });
    if (stageRef.current) io.observe(stageRef.current);
    return () => {
      window.removeEventListener("pointermove", onMove);
      io.disconnect();
    };
  }, []);

  const current = active >= 0 ? projects[active] : undefined;

  return (
    <section className="deck wrap" aria-label="Selected work">
      <div
        ref={stageRef}
        className={`stage${mode === "3d" && ready ? " has-3d" : ""}`}
        aria-hidden="true"
        style={{ "--glow": current?.color ?? "transparent" } as React.CSSProperties}
      >
        <div className="stage-glow" />
        <CssStage active={active} />
        {mode === "3d" && (
          <StageBoundary onError={() => setMode("flat")}>
            <div className={`stage-canvas${ready ? " is-ready" : ""}`}>
              <LightTable
                lite={lite}
                onReady={() => setReady(true)}
                onOpen={(slug) => router.push(`/work/${slug}`)}
              />
            </div>
          </StageBoundary>
        )}
        {active < 0 && (
          <span className="stage-hint mono">
            {lite ? "Scroll to flip through the work" : "Scroll to flip through · click a screen to open it"}
          </span>
        )}
      </div>

      <div className="chapters">
        <div ref={(el) => { chapterRefs.current[0] = el; }} className="chapter chapter-intro">
          {intro}
        </div>
        {projects.map((p, i) => (
          <article
            key={p.slug}
            id={i === 0 ? "work" : undefined}
            ref={(el) => { chapterRefs.current[i + 1] = el; }}
            className="chapter"
            aria-labelledby={`p-${p.slug}`}
          >
            <div className="chapter-head">
              <span className="dot" style={{ "--c": p.color } as React.CSSProperties} />
              <span className="mono">{String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} · {p.kind}</span>
            </div>
            <h2 id={`p-${p.slug}`} className="h3">{p.name}</h2>
            <p className="lead">{p.summary}</p>
            <p className="meta">{p.role} · {p.org} · <span style={{ fontVariantNumeric: "tabular-nums" }}>{p.period}</span></p>
            <ul className="tags" aria-label="Stack">
              {p.stack.slice(0, 4).map((t) => <li key={t} className="tag">{t}</li>)}
            </ul>
            <div className="chapter-actions">
              <Link className="btn btn-sm" href={`/work/${p.slug}`}>Read the case study</Link>
              {p.url && (
                <a className="text-link" href={p.url} target="_blank" rel="noopener noreferrer">
                  Visit site <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/** The poster that paints first, and the fallback when 3D is off. */
function CssStage({ active }: { active: number }) {
  return (
    <div className="css-stage">
      <div className="css-stage-inner">
        {projects.map((p, i) => {
          const d = i - active;
          const passed = d < 0;
          const transform = passed
            ? "translate(0, -40%) scale(1.04)"
            : `translate(${d * 3}%, ${-d * 4}%) scale(${1 - d * 0.05})`;
          const opacity = passed ? 0 : Math.max(0, 1 - d * 0.16);
          return (
            <div key={p.slug} className="css-card" style={{ transform, opacity, zIndex: projects.length - Math.abs(d) }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${p.cover}-1024.jpg`}
                alt=""
                width={1024}
                height={640}
                loading={i < 3 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                decoding="async"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
