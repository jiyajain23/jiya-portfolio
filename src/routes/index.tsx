import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import confetti from "canvas-confetti";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowDown,
  Download,
  Sparkles,
  Rocket,
  Sun,
  Moon,
  ExternalLink,
  Trophy,
  GraduationCap,
  Code2,
  Brain,
  Database,
  Wrench,
  Heart,
  Star,
} from "lucide-react";
import { resume } from "@/lib/resume";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jiya Jain — ML Engineer & CS Student" },
      {
        name: "description",
        content:
          "Playful, interactive portfolio of Jiya Jain — Computer Science student building ML, NLP, and full-stack projects.",
      },
      { property: "og:title", content: "Jiya Jain — ML Engineer & CS Student" },
    ],
  }),
  component: Portfolio,
});

/* ------------------------------ Helpers ------------------------------ */

const palette = [
  "coral",
  "peach",
  "lavender",
  "cyan",
  "mint",
  "sky",
  "sunshine",
  "lime",
  "hotpink",
  "orange",
] as const;
type Color = (typeof palette)[number];

const bg: Record<Color, string> = {
  coral: "bg-coral",
  peach: "bg-peach",
  lavender: "bg-lavender",
  cyan: "bg-cyan",
  mint: "bg-mint",
  sky: "bg-sky",
  sunshine: "bg-sunshine",
  lime: "bg-lime",
  hotpink: "bg-hotpink",
  orange: "bg-orange",
};

function fireConfetti() {
  confetti({
    particleCount: 90,
    spread: 75,
    origin: { y: 0.7 },
    colors: ["#ff6b6b", "#ffd93d", "#6bcfa1", "#7cb8ff", "#ff8fd8", "#c8a2ff"],
  });
}

/* ------------------------------ Cursor ------------------------------ */

function CursorBlob() {
  const x = useSpring(-100, { stiffness: 200, damping: 20 });
  const y = useSpring(-100, { stiffness: 200, damping: 20 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setHovering(!!el?.closest("[data-cursor='hover']"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
      style={{ x, y }}
    >
      <motion.div
        className="rounded-full mix-blend-multiply"
        animate={{
          width: hovering ? 56 : 20,
          height: hovering ? 56 : 20,
          backgroundColor: hovering ? "oklch(0.7 0.24 350 / 0.6)" : "oklch(0.72 0.19 28 / 0.7)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ translateX: "-50%", translateY: "-50%" }}
      />
    </motion.div>
  );
}

/* ------------------------------ Nav ------------------------------ */

function Nav({ dark, setDark }: { dark: boolean; setDark: (v: boolean) => void }) {
  const links = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="sticky top-4 z-50 mx-auto flex w-[min(1100px,94%)] items-center justify-between rounded-full border-2 border-ink bg-background/85 px-4 py-2 shadow-[4px_4px_0_0_var(--ink)] backdrop-blur">
      <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-coral text-white">
          J
        </span>
        <span>Jiya</span>
      </a>
      <nav className="hidden gap-1 md:flex">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            data-cursor="hover"
            className="rounded-full px-3 py-1.5 text-sm font-semibold text-foreground/80 transition hover:bg-sunshine hover:text-ink"
          >
            {l.label}
          </a>
        ))}
      </nav>
      <button
        onClick={() => setDark(!dark)}
        data-cursor="hover"
        aria-label="Toggle theme"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink bg-sunshine transition hover:rotate-12"
      >
        {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
    </header>
  );
}

/* ------------------------------ Floating shapes ------------------------------ */

function FloatingShapes() {
  const shapes = [
    { c: "bg-coral", x: "8%", y: "18%", s: 90, d: 0 },
    { c: "bg-mint", x: "82%", y: "12%", s: 130, d: 1.2 },
    { c: "bg-lavender", x: "72%", y: "58%", s: 70, d: 0.5 },
    { c: "bg-sunshine", x: "12%", y: "72%", s: 110, d: 0.8 },
    { c: "bg-cyan", x: "48%", y: "88%", s: 80, d: 1.6 },
  ];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {shapes.map((s, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-[42%] border-2 border-ink ${s.c} opacity-70`}
          style={{ left: s.x, top: s.y, width: s.s, height: s.s }}
          animate={{
            y: [0, -20, 0, 15, 0],
            rotate: [0, 15, -8, 6, 0],
            borderRadius: ["42%", "58%", "40%", "60%", "42%"],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            delay: s.d,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------ Hero ------------------------------ */

function Hero() {
  const [titleIdx, setTitleIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setTitleIdx((i) => (i + 1) % resume.rotatingTitles.length),
      2200,
    );
    return () => clearInterval(id);
  }, []);

  const techIcons = [
    { icon: "🧠", label: "ML" },
    { icon: "🐍", label: "Python" },
    { icon: "⚡", label: "FastAPI" },
    { icon: "📊", label: "Data" },
    { icon: "🤖", label: "AI" },
    { icon: "🎯", label: "DSA" },
  ];

  return (
    <section id="top" className="relative overflow-hidden pt-16 pb-32">
      <div className="grid-paper absolute inset-0 opacity-60" aria-hidden />
      <FloatingShapes />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hand mb-4 text-2xl text-coral"
        >
          hi, hello, namaste 👋
        </motion.p>

        <h1 className="font-display text-[clamp(3rem,10vw,8rem)] font-black leading-[0.9] tracking-tight">
          <RevealWord delay={0.1}>I&apos;m</RevealWord>{" "}
          <RevealWord delay={0.25} className="text-coral">
            Jiya
          </RevealWord>{" "}
          <RevealWord delay={0.4} className="text-hotpink">
            Jain.
          </RevealWord>
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-2xl md:text-3xl">
          <span className="font-display italic">a</span>
          <div className="relative h-[1.4em] min-w-[280px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={titleIdx}
                initial={{ y: 40, opacity: 0, rotate: 4 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -40, opacity: 0, rotate: -4 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="absolute inset-0 inline-flex items-center rounded-2xl border-2 border-ink bg-sunshine px-4 font-display font-bold"
              >
                {resume.rotatingTitles[titleIdx]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-8 max-w-2xl text-lg text-foreground/80">
          {resume.summary}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <MagneticButton
            onClick={() => {
              fireConfetti();
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="neo-btn bg-coral text-white"
          >
            <Rocket className="h-4 w-4" /> Explore My Work
          </MagneticButton>
          <MagneticButton
            as="a"
            href="/Jiya_Jain_Resume.pdf"
            download
            className="neo-btn bg-mint text-ink"
          >
            <Download className="h-4 w-4" /> Download Resume
          </MagneticButton>
        </div>

        {/* floating tech chips */}
        <div className="pointer-events-none absolute right-0 top-8 hidden md:block">
          {techIcons.map((t, i) => {
            const angle = (i / techIcons.length) * Math.PI * 2;
            const r = 150;
            return (
              <motion.div
                key={t.label}
                className="sticker absolute bg-card"
                style={{
                  left: 220 + Math.cos(angle) * r,
                  top: 200 + Math.sin(angle) * r,
                }}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3 + i * 0.4,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                <span className="text-xl">{t.icon}</span>
                <span>{t.label}</span>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20 flex items-center gap-3 text-sm text-foreground/60"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-cyan"
          >
            <ArrowDown className="h-4 w-4" />
          </motion.div>
          <span className="hand text-lg">scroll to peek inside my world</span>
        </motion.div>
      </div>
    </section>
  );
}

function RevealWord({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        className={`inline-block ${className}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

function MagneticButton({
  children,
  className = "",
  onClick,
  as = "button",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  as?: "button" | "a";
  href?: string;
  download?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handle = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      x: (e.clientX - (r.left + r.width / 2)) * 0.25,
      y: (e.clientY - (r.top + r.height / 2)) * 0.25,
    });
  };
  const leave = () => setPos({ x: 0, y: 0 });

  const Comp: any = motion[as];
  return (
    <Comp
      ref={ref as any}
      onMouseMove={handle}
      onMouseLeave={leave}
      onClick={onClick}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={className}
      data-cursor="hover"
      {...rest}
    >
      {children}
    </Comp>
  );
}

/* ------------------------------ Section frame ------------------------------ */

function SectionHeader({
  eyebrow,
  title,
  color,
}: {
  eyebrow: string;
  title: string;
  color: Color;
}) {
  return (
    <div className="mb-12">
      <span className={`sticker ${bg[color]} hand text-base`}>
        <Sparkles className="h-4 w-4" /> {eyebrow}
      </span>
      <h2 className="mt-4 font-display text-5xl font-black md:text-6xl">{title}</h2>
    </div>
  );
}

function CurvedDivider({ color = "bg-peach" }: { color?: string }) {
  return (
    <div className={`relative h-16 ${color}`} aria-hidden>
      <svg
        className="absolute -top-1 left-0 w-full"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        style={{ height: 60 }}
      >
        <path
          d="M0,30 C240,80 480,-20 720,30 C960,80 1200,-20 1440,30 L1440,0 L0,0 Z"
          fill="var(--background)"
        />
      </svg>
    </div>
  );
}

/* ------------------------------ About ------------------------------ */

function About() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="about me" title="A quick hello." color="peach" />
        <div className="grid gap-6 md:grid-cols-3">
          <div className="neo-card neo-card-hover p-6 md:col-span-2">
            <p className="text-lg leading-relaxed">
              I&apos;m a Computer Science undergrad at{" "}
              <span className="hand text-2xl text-coral">MSIT, New Delhi</span>{" "}
              obsessed with turning messy real-world data into models that
              actually work. Currently red-teaming LLMs, tokenizing aviation
              reports, and shipping small internet things on the side.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["ML", "NLP", "LLM safety", "FastAPI", "9.22 CGPA"].map((t) => (
                <span key={t} className="sticker bg-lime">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <motion.div
            whileHover={{ rotate: -2, scale: 1.02 }}
            className="neo-card flex flex-col justify-between bg-lavender p-6"
          >
            <GraduationCap className="h-10 w-10" />
            <div>
              <p className="hand text-xl">currently at</p>
              <h3 className="font-display text-2xl font-bold leading-tight">
                {resume.education[0].school}
              </h3>
              <p className="mt-2 text-sm">{resume.education[0].degree}</p>
              <p className="mt-1 font-bold">{resume.education[0].detail}</p>
              <p className="text-sm text-foreground/70">
                {resume.education[0].period}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Skills ------------------------------ */

function Skills() {
  const groupIcon: Record<string, ReactNode> = {
    Languages: <Code2 className="h-5 w-5" />,
    "Machine Learning": <Brain className="h-5 w-5" />,
    "Backend & Databases": <Database className="h-5 w-5" />,
    "Tools & Concepts": <Wrench className="h-5 w-5" />,
  };
  return (
    <section id="skills" className="relative overflow-hidden bg-peach py-24">
      <div className="grid-paper absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="my toolbox" title="Draggable skill stickers." color="hotpink" />
        <p className="hand mb-8 text-xl">grab them, toss them, they&apos;ll bounce back 🎈</p>

        <div className="grid gap-6 md:grid-cols-2">
          {resume.skills.map((g) => (
            <div key={g.group} className="neo-card bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <span className={`inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink ${bg[g.color as Color]}`}>
                  {groupIcon[g.group]}
                </span>
                <h3 className="font-display text-xl font-bold">{g.group}</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {g.items.map((s, i) => (
                  <motion.span
                    key={s}
                    drag
                    dragConstraints={{ left: -40, right: 40, top: -20, bottom: 20 }}
                    dragElastic={0.6}
                    whileHover={{ scale: 1.1, rotate: [-2, 2, 0] }}
                    whileTap={{ scale: 0.95 }}
                    data-cursor="hover"
                    className={`sticker cursor-grab active:cursor-grabbing ${bg[palette[(i + g.group.length) % palette.length]]}`}
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Projects ------------------------------ */

function Projects() {
  return (
    <section id="projects" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="my projects" title="Things I've built & broken." color="cyan" />
      </div>
      <div className="mx-auto max-w-6xl space-y-10 px-6">
        {resume.projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof resume.projects)[number];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 6, y: px * 6 });
  };
  const reset = () => setTilt({ x: 0, y: 0 });

  const flip = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      className="neo-card overflow-hidden bg-card"
    >
      <div className={`grid gap-0 md:grid-cols-5 ${flip ? "" : "md:[direction:rtl]"}`}>
        <div
          className={`relative flex min-h-[240px] items-center justify-center overflow-hidden ${bg[project.color as Color]} p-8 md:col-span-2 [direction:ltr]`}
        >
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 6, -4, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="text-[8rem] leading-none drop-shadow-[4px_4px_0_var(--ink)]"
          >
            {project.emoji}
          </motion.div>
          <div className="pointer-events-none absolute inset-0">
            {[0, 1, 2, 3].map((k) => (
              <motion.div
                key={k}
                className="absolute h-3 w-3 rounded-full border-2 border-ink bg-card"
                style={{
                  left: `${15 + k * 22}%`,
                  top: `${20 + (k % 2) * 55}%`,
                }}
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 2 + k * 0.3, repeat: Infinity, delay: k * 0.2 }}
              />
            ))}
          </div>
        </div>

        <div className="p-8 md:col-span-3 [direction:ltr]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="hand text-lg text-foreground/60">project #{index + 1}</p>
              <h3 className="font-display text-3xl font-black md:text-4xl">
                {project.name}
              </h3>
              <p className="mt-1 text-foreground/70">{project.tagline}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="sticker bg-background text-xs">
                {t}
              </span>
            ))}
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.ul
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 space-y-2 overflow-hidden text-sm text-foreground/80"
              >
                {project.details.map((d) => (
                  <li key={d} className="flex gap-2">
                    <span className="text-coral">✦</span>
                    <span>{d}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setOpen((o) => !o)}
              data-cursor="hover"
              className="neo-btn bg-sunshine text-sm"
            >
              {open ? "hide details" : "peek inside"} <Sparkles className="h-4 w-4" />
            </button>
            <a
              href={project.github || resume.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="neo-btn bg-card text-sm"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------ Experience Timeline ------------------------------ */

function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative overflow-hidden bg-mint py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader eyebrow="the journey" title="Where I've been showing up." color="orange" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-4xl px-6">
        <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 rounded-full bg-ink/10" />
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-1/2 top-0 w-1 -translate-x-1/2 rounded-full bg-coral"
        />

        <div className="space-y-16">
          {resume.experience.map((x, i) => (
            <motion.div
              key={x.role}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`relative flex ${i % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}
            >
              <div className="absolute left-1/2 top-6 z-10 h-6 w-6 -translate-x-1/2 rounded-full border-2 border-ink bg-sunshine">
                <motion.div
                  animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-full w-full rounded-full bg-coral"
                />
              </div>
              <div className={`w-full md:w-[46%] ${i % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                <div className={`neo-card neo-card-hover ${bg[x.color as Color]} p-6`}>
                  <p className="hand text-lg">{x.period}</p>
                  <h3 className="font-display text-2xl font-bold">{x.role}</h3>
                  <p className="font-semibold">
                    {x.org} · <span className="font-normal">{x.location}</span>
                  </p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {x.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <Star className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Achievements + Certs ------------------------------ */

function Achievements() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="badges unlocked"
          title="Achievements & certifications."
          color="sunshine"
        />

        <h3 className="hand mb-4 text-2xl">activities & recognition</h3>
        <div className="grid gap-6 md:grid-cols-3">
          {resume.activities.map((a) => (
            <motion.div
              key={a.title}
              whileHover={{ y: -6, rotate: -1 }}
              className={`neo-card ${bg[a.color as Color]} relative overflow-hidden p-6`}
            >
              <div className="absolute -right-4 -top-4 text-7xl opacity-80">{a.badge}</div>
              <Trophy className="h-6 w-6" />
              <h4 className="mt-3 font-display text-xl font-bold">{a.title}</h4>
              <p className="hand text-lg">{a.period}</p>
              <p className="mt-2 text-sm">{a.note}</p>
              {a.details.length > 0 && (
                <ul className="mt-3 space-y-1 text-xs">
                  {a.details.map((d) => (
                    <li key={d}>· {d}</li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        <h3 className="hand mb-4 mt-16 text-2xl">certifications collected</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {resume.certifications.map((c) => (
            <motion.div
              key={c.name}
              whileHover={{ scale: 1.03, rotate: 1 }}
              className={`neo-card ${bg[c.color as Color]} p-5`}
            >
              <div className="flex items-center justify-between">
                <span className="sticker bg-card text-xs">{c.year}</span>
                <Sparkles className="h-5 w-5" />
              </div>
              <h4 className="mt-3 font-display text-lg font-bold leading-tight">
                {c.name}
              </h4>
              <p className="mt-1 text-sm text-foreground/70">{c.org}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Contact ------------------------------ */

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-lavender py-24">
      <FloatingShapes />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <span className="sticker bg-sunshine hand text-base">
          <Heart className="h-4 w-4" /> say hi
        </span>
        <h2 className="mt-4 font-display text-5xl font-black leading-tight md:text-7xl">
          Let&apos;s build something{" "}
          <span className="relative inline-block">
            amazing
            <motion.svg
              viewBox="0 0 200 20"
              className="absolute -bottom-2 left-0 w-full"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <motion.path
                d="M2 12 Q60 2 120 10 T198 8"
                fill="none"
                stroke="oklch(0.72 0.19 28)"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </motion.svg>
          </span>{" "}
          together.
        </h2>
        <p className="mt-6 text-lg text-foreground/80">
          Recruiter, collaborator, or someone with a wild ML idea — my inbox is open.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <ContactCard
            icon={<Mail className="h-5 w-5" />}
            label="email"
            value={resume.email}
            href={`mailto:${resume.email}`}
            color="coral"
          />
          <ContactCard
            icon={<Phone className="h-5 w-5" />}
            label="phone"
            value={resume.phone}
            href={`tel:${resume.phone.replace(/\s/g, "")}`}
            color="mint"
          />
          <ContactCard
            icon={<Linkedin className="h-5 w-5" />}
            label="linkedin"
            value="jiyajain23"
            href={resume.linkedin}
            color="cyan"
          />
          <ContactCard
            icon={<Github className="h-5 w-5" />}
            label="github"
            value="jiyajain23"
            href={resume.github}
            color="sunshine"
          />
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-foreground/70">
          <MapPin className="h-4 w-4" /> {resume.location}
        </div>

        <MagneticButton
          onClick={fireConfetti}
          className="neo-btn mt-8 bg-hotpink text-white"
        >
          <Sparkles className="h-4 w-4" /> throw some confetti
        </MagneticButton>
      </div>
    </section>
  );
}

function ContactCard({
  icon,
  label,
  value,
  href,
  color,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
  color: Color;
}) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      whileHover={{ y: -4, rotate: -1 }}
      data-cursor="hover"
      className={`neo-card ${bg[color]} flex items-center justify-between gap-4 p-5 text-left`}
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-card">
          {icon}
        </span>
        <div>
          <p className="hand text-base">{label}</p>
          <p className="font-bold">{value}</p>
        </div>
      </div>
      <ExternalLink className="h-4 w-4 opacity-60" />
    </motion.a>
  );
}

/* ------------------------------ Footer ------------------------------ */

function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-background py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 text-sm text-foreground/70 md:flex-row">
        <p>
          Made with <span className="text-hotpink">♥</span>, tea, and too many
          Jupyter notebooks by Jiya Jain.
        </p>
        <p className="hand text-lg">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}

/* ------------------------------ Root ------------------------------ */

function Portfolio() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen">
      <CursorBlob />
      <Nav dark={dark} setDark={setDark} />
      <main>
        <Hero />
        <CurvedDivider color="bg-background" />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
