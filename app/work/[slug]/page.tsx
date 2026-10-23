import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader, { SiteFooter } from "@/components/SiteHeader";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return { title: `${p.name} · Emola Bodunrin`, description: p.summary };
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const index = projects.indexOf(p);
  const next = projects[(index + 1) % projects.length];
  const hasPhone = p.shots.some((s) => s.device === "phone");

  return (
    <>
      <SiteHeader />
      <main id="main" className="wrap" style={{ "--c": p.color } as React.CSSProperties}>
        <div className="case-hero">
          <Link href="/#work" className="text-link" style={{ width: "fit-content" }}>
            <span aria-hidden="true">←</span> All work
          </Link>
          <div className="chapter-head">
            <span className="dot" />
            <span className="mono">{String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} · {p.kind}</span>
          </div>
          <h1 className="display" style={{ fontSize: "clamp(44px, 7vw, 96px)" }}>{p.name}</h1>
          <p className="lead" style={{ maxWidth: "54ch" }}>{p.summary}</p>
          {p.url && (
            <div className="cta-row">
              <a className="btn btn-primary" href={p.url} target="_blank" rel="noopener noreferrer">
                Visit {p.url.replace(/^https:\/\//, "")} <span aria-hidden="true">↗</span>
              </a>
            </div>
          )}
        </div>

        <dl className="case-meta">
          <div><dt>Role</dt><dd>{p.role}</dd></div>
          <div><dt>Team</dt><dd>{p.org}</dd></div>
          <div><dt>When</dt><dd style={{ fontVariantNumeric: "tabular-nums" }}>{p.period}</dd></div>
          <div><dt>Stack</dt><dd>{p.stack.join(", ")}</dd></div>
        </dl>

        <div className={`shots${hasPhone ? " has-phone" : ""}`}>
          {p.shots.map((s) => (
            <figure key={s.src} className={`shot${s.device === "phone" ? " shot-phone" : ""}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.src}
                alt={s.alt}
                width={s.width}
                height={s.height}
                // Lazy even for the first shot: on-screen images still load at once, and it stops
                // the home page from preloading every case study's hero when Next prefetches them.
                loading="lazy"
                decoding="async"
              />
              <figcaption>{s.alt}</figcaption>
            </figure>
          ))}
        </div>

        <div className="case-body">
          <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
            <h2 className="h4">The product</h2>
            <p className="prose">{p.context}</p>
          </div>
          <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
            <h2 className="h4">What I built</h2>
            <ul className="built">
              {p.built.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </div>
        </div>

        <Link href={`/work/${next.slug}`} className="next-project" style={{ "--c": next.color } as React.CSSProperties}>
          <span className="mono">Next project</span>
          <span className="h3">{next.name} <span aria-hidden="true">→</span></span>
          <span className="muted">{next.summary}</span>
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
