"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { projects } from "@/lib/projects";

const statusColors: Record<string, string> = {
  live: "#2a6a3a",
  production: "#c8a96e",
  development: "#3a3a6a",
};
const statusLabels: Record<string, string> = {
  live: "Live",
  production: "Production",
  development: "Dev",
};

export default function ProjectsPage() {
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const active = projects.find((p) => p.id === activeFolder);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", position: "relative" }}>

      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 24px", borderBottom: "0.5px solid var(--border)" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <motion.span whileHover={{ x: -3 }}
            style={{ fontFamily: "var(--font-sans)", fontSize: "11px", letterSpacing: "0.18em", color: "var(--text-secondary)", textTransform: "uppercase", cursor: "none" }}>
            ← Back
          </motion.span>
        </Link>
        <span style={{ fontFamily: "var(--font-script)", fontSize: "28px", color: "var(--text-primary)" }}>
          Emola Bodunrin
        </span>
        <Link href="/about" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", letterSpacing: "0.18em", color: "var(--text-secondary)", textTransform: "uppercase", cursor: "none" }}>
            About →
          </span>
        </Link>
      </div>

      {/* Page header */}
      <div style={{ padding: "48px 24px 32px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}>
          <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "12px", color: "var(--text-secondary)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "12px" }}>
            Selected Work
          </div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300, color: "var(--text-primary)", lineHeight: 1.1 }}>
            Project Files
          </h1>
          <div style={{ width: "36px", height: "0.5px", background: "var(--accent)", marginTop: "16px" }} />
        </motion.div>
      </div>

      {/* ── MOBILE: stacked list ── */}
      <div className="mobile-only" style={{ padding: "0 24px 60px", display: "flex", flexDirection: "column", gap: "0" }}>
        {projects.map((project, i) => (
          <motion.div key={project.id}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 + 0.2 }}
          >
            <div onClick={() => setActiveFolder(activeFolder === project.id ? null : project.id)}
              style={{ borderBottom: "0.5px solid var(--border)", padding: "20px 0", cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  {/* folder icon */}
                  <div style={{ position: "relative", width: "26px", height: "20px", flexShrink: 0 }}>
                    <div style={{ position: "absolute", top: 0, left: 0, width: "11px", height: "5px", background: activeFolder === project.id ? "var(--accent)" : "#2a2a2a", borderRadius: "2px 2px 0 0", transition: "background 0.2s" }} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, width: "26px", height: "16px", background: "var(--surface2)", border: `0.5px solid ${activeFolder === project.id ? "var(--accent)" : "var(--border)"}`, borderRadius: "0 3px 3px 3px", transition: "border-color 0.2s" }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 400, color: "var(--text-primary)" }}>{project.name}</div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-secondary)", marginTop: "2px" }}>{project.category}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", padding: "3px 10px", borderRadius: "20px", border: `0.5px solid ${statusColors[project.status]}40`, background: `${statusColors[project.status]}18` }}>
                    <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: statusColors[project.status] }} />
                    <span style={{ fontSize: "9px", color: statusColors[project.status], letterSpacing: "0.1em", fontFamily: "var(--font-sans)" }}>{statusLabels[project.status]}</span>
                  </div>
                  <span style={{ color: "var(--text-secondary)", fontSize: "14px", transition: "transform 0.2s", display: "inline-block", transform: activeFolder === project.id ? "rotate(180deg)" : "rotate(0deg)" }}>↓</span>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {activeFolder === project.id && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
                  style={{ overflow: "hidden" }}>
                  <div style={{ padding: "20px 0 24px" }}>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 300, color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: "16px" }}>
                      {project.longDescription}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                      {project.tech.map(t => (
                        <span key={t} className="pill" style={{ fontSize: "10px" }}>{t}</span>
                      ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-secondary)" }}>{project.role} · {project.year}</span>
                      {project.url !== "#" && (
                        <Link href={project.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                          <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "var(--accent)" }}>View site </span>
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* ── DESKTOP: two-column file cabinet ── */}
      <div className="desktop-only" style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 0, minHeight: "calc(100vh - 260px)", padding: "0 40px 60px" }}>

        {/* File list */}
        <div style={{ borderRight: "0.5px solid var(--border)", paddingRight: "32px" }}>
          <div style={{ fontSize: "9px", letterSpacing: "0.25em", color: "var(--text-secondary)", textTransform: "uppercase", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>
            {projects.length} files
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {projects.map((project, i) => (
              <motion.div key={project.id}
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 + 0.3, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
                onClick={() => setActiveFolder(activeFolder === project.id ? null : project.id)}
                data-hover
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px 16px", borderRadius: "10px", cursor: "none",
                  background: activeFolder === project.id ? "var(--surface2)" : "transparent",
                  border: `0.5px solid ${activeFolder === project.id ? "var(--border-hover)" : "transparent"}`,
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => { if (activeFolder !== project.id) { const d = e.currentTarget as HTMLDivElement; d.style.background = "var(--surface)"; d.style.borderColor = "var(--border)"; } }}
                onMouseLeave={e => { if (activeFolder !== project.id) { const d = e.currentTarget as HTMLDivElement; d.style.background = "transparent"; d.style.borderColor = "transparent"; } }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ position: "relative", width: "28px", height: "22px" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, width: "12px", height: "5px", background: activeFolder === project.id ? "var(--accent)" : "#2a2a2a", borderRadius: "2px 2px 0 0", transition: "background 0.2s" }} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, width: "28px", height: "18px", background: activeFolder === project.id ? "rgba(200,169,110,0.1)" : "var(--surface2)", border: `0.5px solid ${activeFolder === project.id ? "rgba(200,169,110,0.3)" : "var(--border)"}`, borderRadius: "0 3px 3px 3px", transition: "all 0.2s" }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 400, color: activeFolder === project.id ? "var(--text-primary)" : "var(--text-secondary)" }}>
                      {project.name}
                    </div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: activeFolder === project.id ? "var(--accent)" : "var(--text-muted)", letterSpacing: "0.08em", marginTop: "2px" }}>
                      {project.year}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", padding: "3px 10px", borderRadius: "20px", border: `0.5px solid ${statusColors[project.status]}40`, background: `${statusColors[project.status]}18` }}>
                  <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: statusColors[project.status] }} />
                  <span style={{ fontSize: "9px", color: statusColors[project.status], letterSpacing: "0.1em", fontFamily: "var(--font-sans)" }}>{statusLabels[project.status]}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: "40px", paddingTop: "20px", borderTop: "0.5px solid var(--border)" }}>
            <div style={{ fontSize: "9px", letterSpacing: "0.18em", color: "var(--text-secondary)", textTransform: "uppercase", fontFamily: "var(--font-sans)", lineHeight: 2 }}>
              <div>React · Next.js · TypeScript</div>
              <div>TailwindCSS · Node.js · Prisma</div>
            </div>
          </div>
        </div>

        {/* Detail view */}
        <div style={{ paddingLeft: "48px", paddingTop: "8px" }}>
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div key={active.id}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}>
                <div style={{ position: "relative", marginTop: "20px" }}>
                  <div className="folder-tab">{active.category}</div>
                  <div style={{ background: "var(--surface2)", border: "0.5px solid var(--border-hover)", borderRadius: "0 14px 14px 14px", padding: "40px" }}>
                    {/* Color block with grid */}
                    <div style={{ width: "100%", height: "180px", background: active.color, borderRadius: "10px", marginBottom: "32px", display: "flex", alignItems: "flex-end", padding: "20px", border: "0.5px solid var(--border)", position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)", backgroundSize: "40px 40px", opacity: 0.3 }} />
                      <div style={{ position: "relative", zIndex: 1, fontFamily: "var(--font-serif)", fontSize: "28px", color: "rgba(232,224,208,0.12)" }}>
                        {active.name}
                      </div>
                      {active.url !== "#" && (
                        <div style={{ position: "absolute", top: "16px", right: "16px", background: "rgba(0,0,0,0.55)", border: "0.5px solid var(--border-hover)", borderRadius: "20px", padding: "4px 12px", fontSize: "10px", color: "var(--text-secondary)", fontFamily: "var(--font-sans)", letterSpacing: "0.1em", zIndex: 1 }}>
                          {active.url.replace("https://", "")}
                        </div>
                      )}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
                      <div>
                        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "30px", fontWeight: 300, color: "var(--text-primary)", marginBottom: "12px" }}>{active.name}</h2>
                        <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 300, color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: "20px" }}>
                          {active.longDescription}
                        </p>
                        {active.url !== "#" && (
                          <Link href={active.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                            <motion.span whileHover={{ x: 3 }} data-hover
                              style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "var(--accent)", letterSpacing: "0.1em", cursor: "none" }}>
                              View live site 
                            </motion.span>
                          </Link>
                        )}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                        {[
                          { k: "Role", v: active.role },
                          { k: "Year", v: active.year },
                        ].map(({ k, v }) => (
                          <div key={k}>
                            <div style={{ fontSize: "9px", letterSpacing: "0.2em", color: "var(--accent)", textTransform: "uppercase", marginBottom: "5px", fontFamily: "var(--font-sans)" }}>{k}</div>
                            <div style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "var(--text-secondary)" }}>{v}</div>
                          </div>
                        ))}
                        <div>
                          <div style={{ fontSize: "9px", letterSpacing: "0.2em", color: "var(--accent)", textTransform: "uppercase", marginBottom: "8px", fontFamily: "var(--font-sans)" }}>Tech Stack</div>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                            {active.tech.map(t => <span key={t} className="pill" style={{ fontSize: "10px" }}>{t}</span>)}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: "9px", letterSpacing: "0.2em", color: "var(--accent)", textTransform: "uppercase", marginBottom: "6px", fontFamily: "var(--font-sans)" }}>Status</div>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: statusColors[active.status] }} />
                            <span style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: statusColors[active.status] }}>{statusLabels[active.status]}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "400px", gap: "16px" }}>
                <div style={{ position: "relative", width: "60px", height: "48px", opacity: 0.15 }}>
                  <div style={{ position: "absolute", top: 0, left: 0, width: "26px", height: "10px", background: "var(--text-secondary)", borderRadius: "3px 3px 0 0" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, width: "60px", height: "38px", background: "var(--surface2)", border: "0.5px solid var(--border-hover)", borderRadius: "0 6px 6px 6px" }} />
                </div>
                <p style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "15px", color: "var(--text-secondary)", letterSpacing: "0.1em" }}>
                  Select a file to open
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
