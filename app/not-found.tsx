import Link from "next/link";
import SiteHeader, { SiteFooter } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="wrap" style={{ minHeight: "70svh", display: "grid", alignContent: "center", gap: 20, paddingBlock: 80 }}>
        <span className="mono">404</span>
        <h1 className="h2">This page isn&apos;t here.</h1>
        <p className="prose">The link may be old. The work and my contact details are on the home page.</p>
        <div className="cta-row">
          <Link className="btn btn-primary" href="/#work">See the work</Link>
          <Link className="btn" href="/#contact">Contact</Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
