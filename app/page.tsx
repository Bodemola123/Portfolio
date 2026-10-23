import SiteHeader, { SiteFooter } from "@/components/SiteHeader";
import WorkDeck from "@/components/WorkDeck";
import { contact } from "@/lib/projects";

const facts = [
  { value: "2 years", label: "building production web apps" },
  { value: "1,100+", label: "commits across the work" },
  { value: "14", label: "production codebases" },
  { value: "First class", label: "B.Eng, Mechanical Engineering" },
];

const experience = [
  {
    period: "2025 – now",
    role: "Frontend developer associate",
    org: "Edubanc · Lagos",
    desc: "Frontend across eight of Edubanc's products: the loan platform, the marketing site, tuition invoicing, the school portal, exam practice and partner API docs.",
  },
  {
    period: "2024 – 2026",
    role: "Frontend developer",
    org: "Prodigal AI · Remote, Australia",
    desc: "Primary frontend contributor on Voyex, an AI search and discovery platform, plus its Three.js landing site and the Linkup investor platform.",
  },
  {
    period: "2025 – 2026",
    role: "Independent projects",
    org: "Bildare, Tranzyte, LeaseGuard",
    desc: "Products I designed and built end to end, from landing pages to serverless email and PDF parsing.",
  },
];

const skills = [
  { title: "Build", items: ["React", "Next.js (App Router)", "TypeScript", "Tailwind CSS", "Three.js · React Three Fiber", "Framer Motion"] },
  { title: "Data and state", items: ["Redux Toolkit", "Zustand", "TanStack Query", "React Hook Form + Zod", "REST APIs"] },
  { title: "Product flows", items: ["Paystack · Flutterwave", "Mono direct debit", "Smile Identity KYC", "Google OAuth · OTP", "Resend email"] },
];

function Intro() {
  return (
    <>
      <p className="availability rise"><span className="dot" />Open to remote roles</p>
      <h1 className="display rise" style={{ "--d": "60ms" } as React.CSSProperties}>
        Emola Bodunrin
      </h1>
      <p className="lead rise" style={{ "--d": "120ms" } as React.CSSProperties}>
        Frontend developer in Lagos. I build the screens people trust with money and learning: loan
        applications, payment dashboards, exam practice and AI search.
      </p>
      <div className="cta-row rise" style={{ "--d": "180ms" } as React.CSSProperties}>
        <a className="btn btn-primary" href="#work">View the work</a>
        <a className="btn" href={contact.cv} download>Download CV</a>
        <a className="btn" href={`mailto:${contact.email}`}>Email me</a>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <WorkDeck intro={<Intro />} />

        <section id="about" className="section" aria-labelledby="about-title">
          <div className="wrap">
            <div className="about-grid">
              <div className="section-head" style={{ marginBottom: 0, alignContent: "start" }}>
                <span className="mono">About</span>
                <h2 id="about-title" className="h2">An engineer&apos;s habits, applied to interfaces.</h2>
                <p className="prose">
                  I trained as a mechanical engineer at FUTA and graduated with first class honours
                  and a PTDF merit scholarship. Now I bring the same habits to the frontend: measure,
                  test the edge cases, make it hold up on a cheap phone.
                </p>
                <p className="prose">
                  Most of my work sits where a mistake costs someone money or a place in an exam, so I
                  care about clear states, honest copy and forms that explain themselves. I work well
                  with distributed teams across time zones.
                </p>
              </div>
              <div>
                <ul className="timeline">
                  {experience.map((e) => (
                    <li key={e.role}>
                      <span className="mono">{e.period}</span>
                      <div>
                        <h3 className="h4">{e.role}</h3>
                        <p className="muted" style={{ fontSize: 15, marginBottom: 6 }}>{e.org}</p>
                        <p className="prose" style={{ fontSize: 16 }}>{e.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="skills">
                  {skills.map((s) => (
                    <div key={s.title}>
                      <h3>{s.title}</h3>
                      <ul>{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <dl className="facts" style={{ marginTop: "clamp(56px, 8vw, 96px)" }}>
              {facts.map((f) => (
                <div key={f.label} className="fact">
                  <dt className="fact-label">{f.label}</dt>
                  <dd className="fact-value" style={{ order: -1 }}>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="contact" className="contact" aria-labelledby="contact-title">
          <div className="wrap" style={{ display: "grid", gap: 28 }}>
            <span className="mono">Contact</span>
            <h2 id="contact-title" className="h2" style={{ maxWidth: "18ch" }}>
              Hiring, or have something to build? Write to me.
            </h2>
            <a className="contact-mail" href={`mailto:${contact.email}`}>{contact.email}</a>
            <div className="cta-row">
              <a className="btn btn-primary" href={contact.cv} download>Download CV</a>
              <a className="btn" href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
              <a className="btn" href={contact.github} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
