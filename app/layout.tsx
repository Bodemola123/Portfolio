import type { Metadata } from "next";
import "./globals.css";
import Cursor from "@/components/Cursor";
import Noise from "@/components/Noise";

export const metadata: Metadata = {
  title: "Emola Bodunrin — Fullstack Frontend Developer",
  description: "Portfolio of Emola Bodunrin Ayobami, Fullstack Frontend Developer based in Lagos, Nigeria.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Noise />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
