import raw from "./treatments-content.json";
import type { Faq } from "./site";

export type Block = { type: "p"; text: string } | { type: "list"; items: string[] };
export type Section = { heading: string; blocks: Block[] };

export type CategoryId = "performance" | "fertility" | "procedures" | "wellbeing";

export const categories: { id: CategoryId; label: string; blurb: string }[] = [
  { id: "performance", label: "Sexual Performance", blurb: "Erection, ejaculation & hormones" },
  { id: "fertility", label: "Male Fertility", blurb: "Sperm health & conception" },
  { id: "procedures", label: "Procedures", blurb: "Surgical & structural care" },
  { id: "wellbeing", label: "Wellbeing & Relationships", blurb: "Counselling, habits & infections" },
];

type Meta = {
  slug: string;
  legacy: string;
  name: string;
  category: CategoryId;
  icon: string;
  image?: string;
  /** Short card copy — from the live site's home page or meta description. */
  summary: string;
  keywords: string[];
};

const meta: Meta[] = [
  {
    slug: "erectile-dysfunction", legacy: "erectile", name: "Erectile Dysfunction", category: "performance", icon: "Zap",
    image: "/images/conditions/ed-portrait.jpg",
    summary: "Erectile dysfunction or ED is a condition where a male partner fails to sustain or achieve an erection during sexual activities. This is also called Impotence. If your blood flow through the body is affected at any condition could result in ED.",
    keywords: ["erection", "impotence", "ed", "hard", "firm"],
  },
  {
    slug: "premature-ejaculation", legacy: "premature-ejaculation", name: "Premature Ejaculation", category: "performance", icon: "Timer",
    image: "/images/conditions/premature-ejaculation.jpg",
    summary: "Premature (early) ejaculation is treated medically in a number of ways. For the purposes of the discussion that follows, the patient is presumed to be healthy and his sole issue is premature ejaculation.",
    keywords: ["early", "quick", "fast", "pe", "stamina", "last longer"],
  },
  {
    slug: "delayed-ejaculation", legacy: "delayed-ejaculation", name: "Delayed Ejaculation", category: "performance", icon: "Hourglass",
    summary: "Fortius Health Clinic offers effective delayed ejaculation treatment in Bangalore to help individuals improve their sexual health and enhance their overall quality of life.",
    keywords: ["delayed", "late", "can't finish", "orgasm"],
  },
  {
    slug: "ejaculatory-disorders", legacy: "ejaculatory-disorders", name: "Ejaculatory Disorders", category: "performance", icon: "Activity",
    summary: "Experience effective treatment for ejaculatory disorders in Bangalore at Fortius Health Clinic. Regain control and confidence with our specialized care.",
    keywords: ["ejaculation", "dry orgasm", "retrograde", "semen"],
  },
  {
    slug: "low-testosterone", legacy: "low-testesterone", name: "Low Testosterone", category: "performance", icon: "Gauge",
    image: "/images/conditions/low-testosterone-portrait.png",
    summary: "Testosterone, the primary male hormone, is responsible for developing masculine physical traits such as deep voice, thick hair, and higher bone density. Stimulated by the pituitary gland, it's produced in the testicles and arouses sexual desire.",
    keywords: ["hormone", "libido", "desire", "energy", "fatigue", "testosterone"],
  },
  {
    slug: "infertility-azoospermia", legacy: "infertility", name: "Infertility / Azoospermia", category: "fertility", icon: "Baby",
    image: "/images/conditions/infertility-portrait.jpg",
    summary: "Low production of sperm, abnormal sperm function, and any blockage that restricts sperm delivery is the major cause of male infertility. Lifestyle habits, other persistent health issues, injuries, illness, and other factors are also a reason for male infertility.",
    keywords: ["azoospermia", "no sperm", "baby", "conceive", "fertility"],
  },
  {
    slug: "male-infertility", legacy: "male-infertility", name: "Male Infertility", category: "fertility", icon: "Users",
    image: "/images/conditions/male-infertility-portrait.png",
    summary: "Male infertility accounts for over 50% of failed conception cases in couples. If you've been trying to conceive for a year without success, get a fertility evaluation. We also offer vasectomy reversals for those seeking to have more kids.",
    keywords: ["conceive", "baby", "vasectomy", "pregnancy", "ivf"],
  },
  {
    slug: "sperm-count", legacy: "sperm-count", name: "Sperm Count", category: "fertility", icon: "Microscope",
    image: "/images/conditions/low-sperm-count.jpg",
    summary: "Get accurate sperm check fertility tests in Bangalore at Fortius Health Clinic. Trust our lab semen test for precise results you can rely on.",
    keywords: ["semen analysis", "low count", "test", "oligospermia"],
  },
  {
    slug: "sperm-motility", legacy: "sperm-motility", name: "Sperm Motility", category: "fertility", icon: "Waves",
    summary: "Experience top-notch low-motility treatment in Bangalore at Fortius Health Clinic. Our expert team is dedicated to helping you regain your motility.",
    keywords: ["motility", "movement", "asthenozoospermia", "semen"],
  },
  {
    slug: "varicocele", legacy: "varicocele", name: "Varicocele", category: "fertility", icon: "GitBranch",
    summary: "Find the best varicocele treatment in Bangalore at Fortius Health Clinic. Our best doctor for varicocele in Bangalore offers you the best treatment.",
    keywords: ["vein", "scrotum", "swelling", "testicle pain", "laparoscopic"],
  },
  {
    slug: "circumcision", legacy: "circumcision", name: "Circumcision", category: "procedures", icon: "Scissors",
    summary: "Fortius Health Clinic offers expert foreskin removal surgery in Bangalore. Our experienced surgeons provide safe and effective solutions for your peace of mind.",
    keywords: ["foreskin", "phimosis", "laser", "tight"],
  },
  {
    slug: "penile-enlargement", legacy: "penile-enlargement", name: "Penile Enlargement", category: "procedures", icon: "Maximize2",
    summary: "Enhance your performance with our Penile girth enhancement treatment in Bangalore. Our team provides solutions to help you achieve your goals discreetly and effectively.",
    keywords: ["size", "girth", "length", "enhancement"],
  },
  {
    slug: "peyronies-disease", legacy: "peyronies-disease", name: "Peyronie’s Disease", category: "procedures", icon: "Spline",
    summary: "Find effective Peyronie's disease treatment in Bangalore at Fortius Health Clinic. Our team offers advanced therapies and personalized care for Peyronie's disease.",
    keywords: ["curve", "bend", "curvature", "lump", "plaque"],
  },
  {
    slug: "priapism", legacy: "priapism", name: "Priapism", category: "procedures", icon: "Siren",
    summary: "Fortius Health Clinic specializes in effective priapism treatment. Our experienced team offers personalized care and advanced therapies to address this condition.",
    keywords: ["prolonged erection", "painful erection", "emergency"],
  },
  {
    slug: "couple-problems", legacy: "couple-problems", name: "Couple Problems", category: "wellbeing", icon: "HeartHandshake",
    image: "/images/conditions/couples-problem.jpg",
    summary: "Individual sexual preferences can cause couples to get stuck in a disagreement. Couples frequently seek counseling because they are having problems with the regularity or quality of their sex life.",
    keywords: ["relationship", "partner", "counselling", "marriage", "therapy"],
  },
  {
    slug: "porn-addiction", legacy: "porn-addiction", name: "Porn Addiction", category: "wellbeing", icon: "MonitorX",
    summary: "Get in touch with us for pornography addiction withdrawal in Bangalore with expert support and guidance at Fortius Health Clinic.",
    keywords: ["pornography", "habit", "compulsive", "masturbation"],
  },
  {
    slug: "std", legacy: "std", name: "STD", category: "wellbeing", icon: "ShieldPlus",
    summary: "Find the top STD doctors in Bangalore who provide expert care and support for sexually transmitted diseases. Book an appointment with the best STD specialists in Bangalore.",
    keywords: ["sti", "infection", "discharge", "itching", "sores", "sexually transmitted"],
  },
];

type RawEntry = { title: string; description: string; tagline: string; sections: Section[]; faqs: Faq[] };
const content = raw as unknown as Record<string, RawEntry>;

export type Treatment = Meta & {
  title: string;
  description: string;
  tagline: string;
  intro: string[];
  sections: Section[];
  faqs: Faq[];
};

function build(m: Meta): Treatment {
  const c = content[m.legacy];
  if (!c) {
    // Low Testosterone: the live page returns 404, so build from the home-page summary.
    return {
      ...m,
      title: `${m.name} Treatment in Bangalore | Fortius Health Clinic`,
      description: m.summary,
      tagline: `${m.name} treatment in Bangalore`,
      intro: [],
      sections: [{ heading: `What is ${m.name.toLowerCase()}?`, blocks: [{ type: "p", text: m.summary }] }],
      faqs: [],
    };
  }
  const sections = [...c.sections];
  const intro: string[] = [];
  if (sections[0] && !sections[0].heading) {
    for (const b of sections.shift()!.blocks) if (b.type === "p") intro.push(b.text);
  }
  return {
    ...m,
    title: c.title,
    description: c.description || m.summary,
    // The live Peyronie's banner text ("Skin polishing for treating numbness") belongs to another page.
    tagline: m.slug === "peyronies-disease" ? "Peyronie’s disease treatment in Bangalore" : c.tagline || m.name,
    intro,
    sections,
    faqs: c.faqs,
  };
}

export const treatments: Treatment[] = meta.map(build);

export const getTreatment = (slug: string) => treatments.find((t) => t.slug === slug);

export const legacyRedirects = meta.map((m) => ({ from: `/${m.legacy}.html`, to: `/treatments/${m.slug}` }));

export const sectionId = (heading: string) =>
  heading.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 60);
