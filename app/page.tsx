"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function LiveClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      let h = now.getHours();
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      const ap = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      setTime(`${String(h).padStart(2, "0")}:${m}:${s} ${ap}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", fontWeight: 300, color: "var(--text-secondary)", letterSpacing: "0.12em", fontVariantNumeric: "tabular-nums" }}>
      {time}
    </span>
  );
}

interface NavCardProps {
  title: string; label: string; href: string;
  initX: number; initY: number; rot: number; delay?: number; cls?: string;
  mobile?: { x: number; y: number };
}

function NavCard({ title, label, href, initX, initY, rot, delay = 0, cls = "anim-float", mobile }: NavCardProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [pos, setPos] = useState({ x: initX, y: initY });
  const dragging = useRef(false);
  const start = useRef({ mx: 0, my: 0, cx: initX, cy: initY });
  const [moved, setMoved] = useState(false);
  const [floating, setFloating] = useState(true);

  useEffect(() => {
    const check = () => {
      const mob = window.innerWidth < 768;
      setIsMobile(mob);
      if (mob && mobile) setPos({ x: mobile.x, y: mobile.y });
      else setPos({ x: initX, y: initY });
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [initX, initY, mobile]);

  const onDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (isMobile) return;
    dragging.current = true; setFloating(false);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    start.current = { mx: clientX, my: clientY, cx: pos.x, cy: pos.y };
    e.preventDefault();
  };

  useEffect(() => {
    const mv = (e: MouseEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - start.current.mx, dy = e.clientY - start.current.my;
      setPos({ x: start.current.cx + dx, y: start.current.cy + dy });
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) setMoved(true);
    };
    const up = () => { dragging.current = false; };
    window.addEventListener("mousemove", mv); window.addEventListener("mouseup", up);
    return () => { window.removeEventListener("mousemove", mv); window.removeEventListener("mouseup", up); };
  }, []);

  const handleClick = (e: React.MouseEvent) => { if (moved) { e.preventDefault(); setMoved(false); } };

  if (isMobile) {
    return (
      <Link href={href} style={{ textDecoration: "none" }}>
        <div data-hover style={{
          background: "var(--surface2)", border: "0.5px solid var(--border)", borderRadius: "14px",
          padding: "14px 20px", cursor: "none", transition: "border-color 0.2s, background 0.2s",
        }}
          onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = "var(--border-hover)"; d.style.background = "var(--surface3)"; }}
          onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = "var(--border)"; d.style.background = "var(--surface2)"; }}
        >
          <div style={{ fontSize: "9px", letterSpacing: "0.2em", color: "var(--accent)", textTransform: "uppercase", marginBottom: "4px", fontFamily: "var(--font-sans)" }}>{label}</div>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: "18px", fontWeight: 400, color: "var(--text-primary)" }}>{title}</div>
        </div>
      </Link>
    );
  }

  return (
    <motion.div
      style={{ position: "absolute", left: pos.x, top: pos.y, zIndex: 8, "--rot": `${rot}deg` } as React.CSSProperties}
      initial={{ opacity: 0, scale: 0.88, rotate: rot }}
      animate={{ opacity: 1, scale: 1, rotate: rot }}
      transition={{ delay: delay + 1.0, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className={floating ? cls : ""}
      onMouseDown={onDown}
    >
      <Link href={href} onClick={handleClick} style={{ textDecoration: "none" }}>
        <div data-hover style={{
          background: "var(--surface2)", border: "0.5px solid var(--border)", borderRadius: "14px",
          padding: "16px 24px 20px", minWidth: "140px", cursor: "none",
          transition: "border-color 0.2s, background 0.2s", userSelect: "none",
        }}
          onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = "var(--border-hover)"; d.style.background = "var(--surface3)"; }}
          onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.borderColor = "var(--border)"; d.style.background = "var(--surface2)"; }}
        >
          <div style={{ fontSize: "10px", letterSpacing: "0.2em", color: "var(--accent)", textTransform: "uppercase", marginBottom: "6px", fontFamily: "var(--font-sans)" }}>{label}</div>
          <div style={{ fontFamily: "var(--font-serif)", fontSize: "22px", fontWeight: 400, color: "var(--text-primary)" }}>{title}</div>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--border-hover)", marginTop: "12px" }} />
        </div>
      </Link>
    </motion.div>
  );
}

export default function Home() {
  const [dims, setDims] = useState({ w: 1440, h: 900 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const upd = () => {
      setDims({ w: window.innerWidth, h: window.innerHeight });
      setIsMobile(window.innerWidth < 768);
    };
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);

  const cx = dims.w / 2, cy = dims.h / 2;

  return (
    <div style={{ width: "100vw", height: "100dvh", background: "var(--bg)", overflow: isMobile ? "auto" : "hidden", position: "relative" }}>

      {/* Top bar */}
      <div style={{ position: isMobile ? "relative" : "absolute", top: 0, left: 0, right: 0, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 20 }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <LiveClock />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Link href="mailto:emolabenjamin123@gmail.com" style={{ textDecoration: "none" }}>
            <button data-hover style={{
              background: "transparent", border: "0.5px solid var(--border-hover)", borderRadius: "20px",
              padding: "8px 20px", color: "var(--text-secondary)", fontSize: "11px",
              letterSpacing: "0.12em", fontFamily: "var(--font-sans)", cursor: "none",
              transition: "border-color 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.color = "var(--text-secondary)"; }}
            >Let&apos;s Talk</button>
          </Link>
        </motion.div>
      </div>

      {/* ── MOBILE LAYOUT ── */}
      {isMobile ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 24px 60px", gap: "0" }}>
          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
            style={{ textAlign: "center", marginBottom: "48px" }}>
            <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "11px", color: "var(--text-secondary)", letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: "8px" }}>
              Fullstack Frontend Developer
            </div>
            <div style={{ fontFamily: "var(--font-script)", fontSize: "clamp(48px, 14vw, 72px)", color: "var(--text-primary)", lineHeight: 1.05 }}>
              Emola Bodunrin
            </div>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.9, duration: 0.8 }}
              style={{ width: "36px", height: "0.5px", background: "var(--accent)", margin: "16px auto 0", transformOrigin: "left" }} />
          </motion.div>

          {/* Nav cards stacked */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%", maxWidth: "320px", marginBottom: "48px" }}>
            <NavCard title="Home" label="Menu" href="/" initX={0} initY={0} rot={0} />
            <NavCard title="Projects" label="Work" href="/projects" initX={0} initY={0} rot={0} />
            <NavCard title="About Me" label="Info" href="/about" initX={0} initY={0} rot={0} />
          </motion.div>

          {/* Bottom info */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#2a6a3a", display: "inline-block", animation: "pulse 2.5s infinite" }} />
              <span style={{ fontSize: "10px", letterSpacing: "0.18em", color: "var(--text-secondary)", textTransform: "uppercase", fontFamily: "var(--font-sans)" }}>Available for work</span>
            </div>
            <Link href="https://github.com/Bodemola123" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: "10px", letterSpacing: "0.18em", color: "var(--text-secondary)", textTransform: "uppercase", fontFamily: "var(--font-sans)", textDecoration: "none" }}>
              github 
            </Link>
            <span style={{ fontSize: "10px", letterSpacing: "0.18em", color: "#fafafa", textTransform: "uppercase", fontFamily: "var(--font-sans)" }}>Lagos, Nigeria</span>
          </motion.div>
        </div>

      ) : (
        /* ── DESKTOP LAYOUT ── */
        <>
          {/* Location tag */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
            style={{ position: "absolute", top: "62px", right: "28px", fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "11px", color: "#fafafa)", letterSpacing: "0.08em", writingMode: "vertical-rl", zIndex: 10 }}>
            Lagos, Nigeria
          </motion.div>

          {/* Hero center */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -52%)", textAlign: "center", zIndex: 5 }}>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
              style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "13px", color: "var(--text-secondary)", letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: "4px" }}>
              Fullstack Frontend Developer
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "var(--font-script)", fontSize: "clamp(56px, 7.5vw, 92px)", color: "var(--text-primary)", lineHeight: 1.05, whiteSpace: "nowrap" }}>
              Emola Bodunrin
            </motion.div>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ width: "36px", height: "0.5px", background: "var(--accent)", margin: "18px auto 0", transformOrigin: "left" }} />
          </div>

          {/* Nav Cards */}
          <NavCard title="Home" label="Menu" href="/" initX={cx - 420} initY={cy - 200} rot={-4} delay={0} cls="anim-float" />
          <NavCard title="Projects" label="Work" href="/projects" initX={cx - 380} initY={cy + 70} rot={3.5} delay={0.1} cls="anim-float-b" />
          <NavCard title="About Me" label="Info" href="/about" initX={cx + 220} initY={cy + 50} rot={-2.5} delay={0.2} cls="anim-float-c" />

          {/* Drag hint */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
            style={{ position: "absolute", bottom: "50px", left: "50%", transform: "translateX(-50%)", fontSize: "9px", letterSpacing: "0.3em", color: "var(--text-muted)", textTransform: "uppercase", fontFamily: "var(--font-sans)", zIndex: 10, whiteSpace: "nowrap" }}>
            drag to browse my files
          </motion.div>

          {/* Available for work */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
            style={{ position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "8px", fontSize: "10px", letterSpacing: "0.18em", color: "var(--text-secondary)", textTransform: "uppercase", fontFamily: "var(--font-sans)", zIndex: 10, whiteSpace: "nowrap" }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#2a6a3a", display: "inline-block", animation: "pulse 2.5s infinite" }} />
            Available for work
          </motion.div>

          {/* GitHub */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
            style={{ position: "absolute", bottom: "24px", left: "28px", zIndex: 10 }}>
            <Link href="https://github.com/Bodemola123" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: "10px", letterSpacing: "0.18em", color: "var(--text-secondary)", textTransform: "uppercase", fontFamily: "var(--font-sans)", textDecoration: "none" }}>
              github ↗
            </Link>
          </motion.div>

          {/* Year */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
            style={{ position: "absolute", bottom: "24px", right: "28px", zIndex: 10 }}>
            <span style={{ fontSize: "10px", letterSpacing: "0.18em", color: "var(--text-muted)", textTransform: "uppercase", fontFamily: "var(--font-sans)" }}>© 2025</span>
          </motion.div>

          {/* Radial glow */}
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "700px", height: "500px", background: "radial-gradient(ellipse at center, rgba(200,169,110,0.04) 0%, transparent 70%)", pointerEvents: "none", zIndex: 2 }} />
        </>
      )}
    </div>
  );
}
