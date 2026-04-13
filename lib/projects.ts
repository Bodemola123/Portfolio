export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  url: string;
  tech: string[];
  year: string;
  role: string;
  color: string;
  status: "live" | "production" | "development";
}

export const projects: Project[] = [
  {
    id: "edubanc",
    name: "Edubanc",
    category: "Fintech / EdTech",
    description: "Financial platform making education easier to access & finance across Nigeria.",
    longDescription:
      "A production fintech platform with 50,000+ trusted users. Built features for tuition support, MBA financing, and professional exam financing (PMP, CFA, CIPM, ICAN, ACCA). Integrated AI-powered features into the frontend layer, enhancing product functionality and user engagement.",
    url: "https://edubanc.ng",
    tech: ["Next.js", "React", "TypeScript", "TailwindCSS", "REST API"],
    year: "2025",
    role: "Frontend Developer Associate",
    color: "#1a3a2a",
    status: "live",
  },
  {
    id: "bildare",
    name: "Bildare",
    category: "Design Marketplace",
    description: "Curated marketplace for modern Figma UI kits, sections, and design systems.",
    longDescription:
      "A full-stack marketplace for modern product UIs. Built with Next.js frontend and Node.js backend. Features template browsing across categories including AI, Blockchain, Dashboards, E-commerce, and SaaS. Designed for teams who care about quality, structure, and longevity.",
    url: "https://bildare.vercel.app",
    tech: ["Next.js", "Node.js", "TypeScript", "TailwindCSS", "Prisma"],
    year: "2025",
    role: "Fullstack Developer",
    color: "#1a2a1a",
    status: "production",
  },
  {
    id: "plearnty",
    name: "Plearnty",
    category: "EdTech / Gamification",
    description: "Quiz & learning platform rewarding Nigerian students as they play and learn.",
    longDescription:
      "The #1 quiz and learning platform for Nigerian students with 27k+ active users. An EdTech platform under UnifyEdu that makes learning fun and financially rewarding through gamified quizzes, token rewards, and community engagement.",
    url: "https://plearnty.unifyedu.ng",
    tech: ["React", "Next.js", "TypeScript", "TailwindCSS"],
    year: "2025",
    role: "Frontend Developer",
    color: "#1a1a3a",
    status: "live",
  },
  {
    id: "tranzyte",
    name: "Tranzyte",
    category: "Education / Logistics",
    description: "Professional training school for Africa's transport and logistics sector.",
    longDescription:
      "The #1 pathway to transport mastery in Africa. A professional training platform equipping drivers, fleet owners, logistics professionals, and policymakers with practical skills, industry knowledge, and globally recognized certification.",
    url: "#",
    tech: ["React", "Next.js", "TailwindCSS", "CSS3"],
    year: "2026",
    role: "Frontend Developer",
    color: "#2a1a0a",
    status: "production",
  },
  {
    id: "edpay-orbit",
    name: "EdPay Orbit",
    category: "Fintech",
    description: "Live fintech platform — an Edubanc product for education payment management.",
    longDescription:
      "A live fintech platform under the Edubanc umbrella. EdPay Orbit handles education payment orchestration with a clean, responsive interface designed to make financial transactions seamless for the education sector.",
    url: "https://edpay-orbit.edubanc.ng",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "REST API"],
    year: "2026",
    role: "Frontend Developer Associate",
    color: "#2a1a2a",
    status: "live",
  },
];
