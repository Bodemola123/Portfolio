"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const skills = [
  { cat: "Frontend", items: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "TailwindCSS"] },
  { cat: "Backend", items: ["Node.js", "ExpressJS", "REST APIs", "Prisma ORM"] },
  { cat: "Tools", items: ["Git", "GitHub", "Vercel", "Figma", "Agile / Scrum"] },
];

const experience = [
  { role: "Frontend Developer Associate", company: "Edubanc", period: "Aug 2025 – Present", location: "Lagos, Nigeria", desc: "Building and optimizing user-facing features for Edubanc's financial platform. Integrating AI-powered features into the frontend layer." },
  { role: "Frontend Developer", company: "Prodigal AI", period: "Oct 2024 – Present", location: "Remote (Australia)", desc: "Developing intuitive user interfaces for an AI-driven product serving a global user base, working asynchronously with a distributed team across time zones." },
  { role: "Freelance Frontend Developer", company: "Independent", period: "Jun 2021 – Present", location: "Remote", desc: "Designed and developed 4+ client-facing web applications including Bildare, Voyex, and Plearnty — all deployed on Vercel with live production traffic." },
];

const stagger = { animate: { transition: { staggerChildren: 0.08 } } };
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { ease: [0.16, 1, 0.3, 1] as [number, number, number, number], duration: 0.7 } }
};

export default function AboutPage() {
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
        <Link href="/projects" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", letterSpacing: "0.18em", color: "var(--text-secondary)", textTransform: "uppercase", cursor: "none" }}>
            Projects →
          </span>
        </Link>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(40px, 6vw, 80px) clamp(24px, 5vw, 40px)" }}>
        <motion.div variants={stagger} initial="initial" animate="animate">

          {/* Header */}
          <motion.div variants={fadeUp} style={{ marginBottom: "clamp(48px, 6vw, 80px)" }}>
            <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "12px", color: "var(--text-secondary)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "12px" }}>
              About
            </div>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300, color: "var(--text-primary)", lineHeight: 1.1, marginBottom: "16px" }}>
              Emola Bodunrin<br />
              <span style={{ fontStyle: "italic", color: "var(--text-secondary)" }}>Ayobami</span>
            </h1>
            <div style={{ width: "36px", height: "0.5px", background: "var(--accent)" }} />
          </motion.div>

          {/* Bio + Quick facts */}
          <motion.div variants={fadeUp} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "clamp(32px, 5vw, 80px)", marginBottom: "clamp(48px, 6vw, 80px)", alignItems: "start" }}>
            <div>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(18px, 2.2vw, 22px)", fontWeight: 300, lineHeight: 1.65, color: "var(--text-primary)", marginBottom: "24px" }}>
                Full-Stack Frontend Developer with 3+ years of hands-on experience building production-grade web applications.
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 300, lineHeight: 1.8, color: "var(--text-secondary)", marginBottom: "16px" }}>
                Currently contributing to two live products: Edubanc (Nigeria) and Prodigal AI (Australia), with demonstrated ability to ship responsive, high-performance UIs and integrate REST APIs end-to-end.
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 300, lineHeight: 1.8, color: "var(--text-secondary)" }}>
                Holds a First Class B.Eng in Mechanical Engineering (FUTA), bringing structured analytical thinking to every engineering challenge.
              </p>
              <div style={{ marginTop: "28px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <Link href="mailto:emolabenjamin123@gmail.com" style={{ textDecoration: "none" }}>
                  <motion.button whileHover={{ scale: 1.02 }} data-hover
                    style={{ background: "var(--accent)", border: "none", borderRadius: "20px", padding: "10px 24px", color: "#0a0a0a", fontSize: "11px", letterSpacing: "0.12em", fontFamily: "var(--font-sans)", fontWeight: 500, cursor: "none" }}>
                    Get in touch
                  </motion.button>
                </Link>
                <Link href="https://github.com/Bodemola123" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                  <motion.button whileHover={{ scale: 1.02 }} data-hover
                    style={{ background: "transparent", border: "0.5px solid var(--border-hover)", borderRadius: "20px", padding: "10px 24px", color: "var(--text-secondary)", fontSize: "11px", letterSpacing: "0.12em", fontFamily: "var(--font-sans)", cursor: "none" }}>
                    GitHub
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* Quick facts */}
            <div style={{ background: "var(--surface2)", border: "0.5px solid var(--border)", borderRadius: "14px", padding: "28px" }}>
              <div style={{ fontSize: "9px", letterSpacing: "0.22em", color: "var(--text-secondary)", textTransform: "uppercase", marginBottom: "20px", fontFamily: "var(--font-sans)" }}>
                Quick File
              </div>
              {[
                { k: "Location", v: "Lagos, Nigeria" },
                { k: "Availability", v: "Open to Remote" },
                { k: "Education", v: "B.Eng – FUTA (First Class)" },
                { k: "Experience", v: "3+ Years" },
                { k: "Email", v: "emolabenjamin123@gmail.com" },
                { k: "Phone", v: "+234 812 756 5606" },
              ].map(({ k, v }) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "0.5px solid var(--border)", gap: "16px" }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--accent)", letterSpacing: "0.08em", flexShrink: 0 }}>{k}</span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-secondary)", textAlign: "right", wordBreak: "break-word" }}>{v}</span>
                </div>
              ))}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "16px" }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#2a6a3a", animation: "pulse 2.5s infinite", display: "inline-block" }} />
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-secondary)", letterSpacing: "0.1em" }}>Available for work</span>
              </div>
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div variants={fadeUp} style={{ marginBottom: "clamp(48px, 6vw, 80px)" }}>
            <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "12px", color: "var(--text-secondary)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "32px" }}>
              Experience
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {experience.map((exp, i) => (
                <div key={i} style={{
                  display: "grid",
                  gridTemplateColumns: "clamp(130px, 18vw, 200px) 1fr",
                  gap: "clamp(16px, 3vw, 32px)",
                  paddingBottom: "40px",
                  borderBottom: i < experience.length - 1 ? "0.5px solid var(--border)" : "none",
                  marginBottom: i < experience.length - 1 ? "40px" : 0
                }}>
                  <div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--accent)", letterSpacing: "0.06em", marginBottom: "4px", lineHeight: 1.5 }}>{exp.period}</div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "11px", color: "var(--text-secondary)", letterSpacing: "0.04em" }}>{exp.location}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 400, color: "var(--text-primary)", marginBottom: "4px" }}>{exp.role}</div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "var(--accent)", letterSpacing: "0.1em", marginBottom: "10px" }}>{exp.company}</div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 300, color: "var(--text-secondary)", lineHeight: 1.75 }}>{exp.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div variants={fadeUp} style={{ marginBottom: "clamp(48px, 6vw, 80px)" }}>
            <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "12px", color: "var(--text-secondary)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "32px" }}>
              Tech Stack
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "32px" }}>
              {skills.map(s => (
                <div key={s.cat}>
                  <div style={{ fontSize: "9px", letterSpacing: "0.2em", color: "var(--accent)", textTransform: "uppercase", marginBottom: "16px", fontFamily: "var(--font-sans)" }}>{s.cat}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {s.items.map(item => (
                      <div key={item} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
                        <span style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 300, color: "var(--text-secondary)" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} style={{ borderTop: "0.5px solid var(--border)", paddingTop: "clamp(40px, 5vw, 60px)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "32px" }}>
            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 300, color: "var(--text-primary)", marginBottom: "8px" }}>
                Let&apos;s build something
              </div>
              <div style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "clamp(18px, 2.5vw, 22px)", color: "var(--text-secondary)" }}>
                together.
              </div>
            </div>
            <Link href="mailto:emolabenjamin123@gmail.com" style={{ textDecoration: "none" }}>
              <motion.div whileHover={{ scale: 1.03 }} data-hover
                style={{ background: "var(--surface2)", border: "0.5px solid var(--border-hover)", borderRadius: "14px", padding: "20px 28px", cursor: "none", transition: "border-color 0.2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = "var(--accent)"}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-hover)"}
              >
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "10px", color: "var(--text-secondary)", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "5px" }}>Email</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: "12px", color: "var(--accent)" }}>emolabenjamin123@gmail.com </div>
              </motion.div>
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
