export interface Shot {
  src: string;
  alt: string;
  width: number;
  height: number;
  device: "desktop" | "phone";
}

export interface Project {
  slug: string;
  name: string;
  kind: string;
  summary: string;
  context: string;
  built: string[];
  role: string;
  org: string;
  period: string;
  stack: string[];
  url?: string;
  /** Brand colour of the product, used as light in the 3D stage. */
  color: string;
  /** Cover screenshot base path; `-1024.jpg` is the 16:10 image used by the CSS poster and the 3D stage. */
  cover: string;
  shots: Shot[];
}

const desktop = (slug: string, file: string, alt: string): Shot => ({
  src: `/work/${slug}/${file}`, alt, width: 1440, height: 900, device: "desktop",
});
const phone = (slug: string, file: string, alt: string): Shot => ({
  src: `/work/${slug}/${file}`, alt, width: 390, height: 844, device: "phone",
});

export const projects: Project[] = [
  {
    slug: "edupay",
    name: "Edupay",
    kind: "Fintech · school-fee financing",
    summary: "Parents apply once, Edubanc pays the school, and the family repays a little each month.",
    context:
      "Edupay is Edubanc's loan platform for school fees, graduate programmes and professional exams. It serves three audiences at once: parents applying for a loan, schools onboarding their students, and an operations team reviewing every application.",
    built: [
      "Parent loan application flows: several children in one request, save-and-resume drafts, and a review step with interest calculation and terms acceptance.",
      "Identity and credit steps: BVN checks with one-time passwords, NIN capture, document upload, credit checks and direct-debit mandate setup.",
      "Admin tools for the operations team: application review tables, manual school loan review, partner performance, repayment schedules and payment rescheduling.",
      "School dashboard features and back-office monitoring for bank-linking webhooks, system errors and request traces.",
    ],
    role: "Frontend developer",
    org: "Edubanc",
    period: "2025 – now",
    stack: ["React", "TypeScript", "Redux Toolkit", "TanStack Query", "Chakra UI"],
    url: "https://edupay.edubanc.ng",
    color: "#ffd023",
    cover: "/work/edupay/cover",
    shots: [
      desktop("edupay", "parent-home.jpg", "Edupay parent home: outstanding balance, repayment progress and recent loan activity"),
      desktop("edupay", "welcome.jpg", "Edupay welcome screen asking whether the visitor needs a tuition loan or represents a school"),
      desktop("edupay", "application.jpg", "Step one of the six-step Edupay loan application: searching for the child's school"),
    ],
  },
  {
    slug: "edubanc",
    name: "Edubanc website",
    kind: "Fintech · marketing site",
    summary: "The public face of Edubanc: product pages, loan calculators and application forms for families, schools and professionals.",
    context:
      "Edubanc finances school fees, graduate programmes and professional exams across Nigeria. The website has to explain several financial products to very different visitors and turn interest into a valid application.",
    built: [
      "Second-largest contributor, with about 350 commits over 12 months.",
      "Product pages for school-fee financing, exam financing (PMP, CFA), graduate financing, tuition invoicing and exam practice, plus the About page and a partner university page.",
      "Loan and instalment calculators, and validated financing application forms connected to the backend.",
      "Site navigation with a products menu, the footer, animation, and mobile layouts for every page.",
    ],
    role: "Frontend developer",
    org: "Edubanc",
    period: "2025 – now",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "React Hook Form", "Zod"],
    url: "https://edubanc.ng",
    color: "#2f7bff",
    cover: "/work/edubanc/cover",
    shots: [
      desktop("edubanc", "home.jpg", "Edubanc homepage: making education easier to access and finance for families"),
      phone("edubanc", "home-phone.jpg", "Edubanc homepage on a phone"),
    ],
  },
  {
    slug: "voyex",
    name: "Voyex",
    kind: "AI · search and discovery",
    summary: "An AI search platform where people ask for anything and get answers, product picks and a workspace to keep them.",
    context:
      "Voyex, built at Prodigal AI for a global audience, combines a chat-style AI search with a product marketplace and a personal workspace. The team was distributed across time zones and worked mostly asynchronously.",
    built: [
      "Primary frontend contributor, with more than 300 commits, about three quarters of the codebase history.",
      "The AI chat and search interface: message rendering, input, history, product recommendation cards, and sharing, renaming and deleting conversations.",
      "Sign-up and onboarding for people and organisations: Google sign-in, email OTP, password reset and profile upload.",
      "The marketplace, workspace, templates, analytics and settings pages, and the Three.js landing site (about 200 commits).",
    ],
    role: "Frontend developer",
    org: "Prodigal AI",
    period: "2024 – 2026",
    stack: ["Next.js", "Redux Toolkit", "Tailwind CSS", "Radix UI", "Three.js", "Google Generative AI"],
    url: "https://voyex-landing.vercel.app",
    color: "#c08cf8",
    cover: "/work/voyex/cover",
    shots: [
      desktop("voyex", "home.jpg", "Voyex landing page"),
      phone("voyex", "home-phone.jpg", "Voyex landing page on a phone"),
    ],
  },
  {
    slug: "learn",
    name: "Edubanc Learn",
    kind: "EdTech · exam practice",
    summary: "Practice questions, mock exams and live quizzes for students preparing for professional and school exams.",
    context:
      "Edubanc Learn helps candidates prepare for exams with topic practice, timed mock tests, leaderboards and report cards. It also connects to Edubanc's exam financing, so a student who is ready can fund the exam itself.",
    built: [
      "Study and home page features, exam types, and the mapping between subjects and topics.",
      "Feedback forms for reporting a problem with a question.",
      "An exam financing prompt shown after a practice exam, linking preparation to Edubanc's loans.",
    ],
    role: "Frontend developer",
    org: "Edubanc",
    period: "2025 – now",
    stack: ["React", "TypeScript", "Vite"],
    url: "https://learn.edubanc.ng",
    color: "#e8862a",
    cover: "/work/learn/cover",
    shots: [
      desktop("learn", "home.jpg", "Edubanc Learn sign-in and landing screen"),
      phone("learn", "home-phone.jpg", "Edubanc Learn on a phone"),
    ],
  },
  {
    slug: "verticul",
    name: "Verticul",
    kind: "EdTech · course marketplace",
    summary: "Professional courses for young Africans, from data skills to ESG, with roles for learners, instructors and employers.",
    context:
      "Verticul is an online course marketplace focused on career skills. Learners buy courses and bundles, instructors publish them, and employers use the platform to train their workforce.",
    built: [
      "Course bundles on both the learner and the admin applications, with validation.",
      "Discount controls and updates to the payment flow.",
    ],
    role: "Frontend developer",
    org: "Edubanc group",
    period: "2026",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    url: "https://goverticul.io",
    color: "#8b5cf6",
    cover: "/work/verticul/cover",
    shots: [
      desktop("verticul", "home.jpg", "Verticul homepage"),
      phone("verticul", "home-phone.jpg", "Verticul homepage on a phone"),
    ],
  },
  {
    slug: "plearnty",
    name: "Plearnty",
    kind: "EdTech · quiz rewards",
    summary: "A quiz and learning platform that rewards Nigerian students as they play.",
    context:
      "Plearnty, under UnifyEdu, turns studying into short quizzes with token rewards and a wallet, which means identity checks and referrals sit inside a learning product.",
    built: [
      "A new sign-up flow.",
      "BVN verification retry inside the wallet.",
      "Referral pages.",
    ],
    role: "Frontend developer",
    org: "UnifyEdu",
    period: "2025",
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    url: "https://plearnty.unifyedu.ng",
    color: "#5452f6",
    cover: "/work/plearnty/cover",
    shots: [
      desktop("plearnty", "artwork.jpg", "Hero artwork from the Plearnty landing page: a student holding exam papers"),
    ],
  },
  {
    slug: "bildare",
    name: "Bildare",
    kind: "Independent · design marketplace",
    summary: "A curated marketplace for Figma UI kits, sections and design systems.",
    context:
      "Bildare is my own product: a marketplace for teams who want well-structured design files, browsable by category, from dashboards and SaaS to e-commerce and AI.",
    built: [
      "The application and the landing page, end to end.",
      "Waitlist, feedback and builder application forms that send transactional email through serverless API routes.",
    ],
    role: "Designer and developer",
    org: "Independent",
    period: "2025 – 2026",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Resend"],
    url: "https://bildare.vercel.app",
    color: "#b9f04a",
    cover: "/work/bildare/cover",
    shots: [
      desktop("bildare", "home.jpg", "Bildare landing page"),
      phone("bildare", "home-phone.jpg", "Bildare landing page on a phone"),
    ],
  },
  {
    slug: "tranzyte",
    name: "Tranzyte",
    kind: "Education · transport and logistics",
    summary: "A website for a training school that prepares drivers, fleet owners and logistics professionals.",
    context:
      "Tranzyte trains people across Africa's transport and logistics sector. The site presents its courses and who they serve, and leads visitors to enrol.",
    built: [
      "The full website: hero, courses, who the school serves, and the enrolment call to action.",
      "Animated sections and mobile layouts.",
    ],
    role: "Frontend developer",
    org: "Freelance",
    period: "2026",
    stack: ["React", "Next.js", "Framer Motion"],
    url: "https://tranzyte.vercel.app",
    color: "#ff6b1a",
    cover: "/work/tranzyte/cover",
    shots: [
      desktop("tranzyte", "home.jpg", "Tranzyte homepage"),
      phone("tranzyte", "home-phone.jpg", "Tranzyte homepage on a phone"),
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const contact = {
  email: "emolabenjamin123@gmail.com",
  github: "https://github.com/Bodemola123",
  linkedin: "https://www.linkedin.com/in/bodunrin-emola-6486bb175",
  cv: "/Emola-Bodunrin-Ayobami-Resume.pdf",
};
