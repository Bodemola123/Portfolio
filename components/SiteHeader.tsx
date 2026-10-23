import Link from "next/link";
import { contact } from "@/lib/projects";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="brand">Emola Bodunrin</Link>
        <nav className="nav" aria-label="Main">
          <Link href="/#work">Work</Link>
          <Link href="/#about">About</Link>
          <Link href="/#contact">Contact</Link>
          <a className="btn btn-sm" href={contact.cv} download>
            Download CV
          </a>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <span className="mono">Emola Bodunrin Ayobami · Lagos, Nigeria</span>
        <span className="mono">Built with Next.js and React Three Fiber</span>
      </div>
    </footer>
  );
}
