import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Portfolio — Ethan GORINI (React)
 * Modifs:
 *  - Toggle **clair/sombre** avec persistance (localStorage + prefers-color-scheme)
 *  - Certifications → ouvre Credly + hover glow suiveur
 *  - Boutons "Voir" centrés et ouvrent un fichier local (placeholder ./a-remplacer.pdf)
 */

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100 selection:bg-fuchsia-400/30">
      <ScrollProgress />
      <Header />
      <main className="relative">
        <Hero />
        <Skills />
        <Experience />
        <Certifications />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}

/* ─────────────────────────────── Progress bar */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.2 });
  return (
    <motion.div style={{ scaleX }} className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-fuchsia-400 via-violet-400 to-sky-400" />
  );
}

/* ─────────────────────────────── Header + Theme toggle */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className={`sticky top-0 z-40 backdrop-blur-md ${scrolled ? "bg-white/70 dark:bg-slate-900/60 shadow-lg shadow-black/10 dark:shadow-black/20" : "bg-transparent"}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#accueil" className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-md bg-gradient-to-br from-fuchsia-400 to-sky-400" />
          <span className="font-semibold tracking-wide">Ethan Gorini</span>
        </a>
        <nav className="hidden items-center gap-4 md:flex">
          <a className="text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white" href="#competences">Compétences</a>
          <a className="text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white" href="#experience">Expérience</a>
          <a className="text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white" href="#certifs">Certifications</a>
          <a className="text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white" href="#contact">Contact</a>
          
        </nav>
        <MagneticButton intent="primary" onClick={() => (window.location.href = "mailto:e.gorini@eleve.leschartreux.net")}>
          Me contacter
        </MagneticButton>
      </div>
    </div>
  );
}

/* (Theme toggle removed as requested) */

/* ─────────────────────────────── Hero */
function Hero() {
  return (
    <section id="accueil" className="relative mx-auto flex max-w-6xl items-center px-4 py-16">
      <MorphingBlob />
      <div className="relative z-10 max-w-4xl">
        <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          Ethan <span className="bg-gradient-to-r from-fuchsia-400 to-sky-400 bg-clip-text text-transparent">Gorini</span>
        </motion.h1>
        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }} className="mt-4 max-w-xl text-justify text-slate-600 dark:text-slate-300">
          Étudiant en BTS SIO option SISR et futur étudiant en cycle ingénieur ICS à CPE Lyon, je construis mon profil autour des systèmes, des réseaux, des infrastructures, de la cybersécurité et du DevOps. Curieux, rigoureux et polyvalent, je souhaite développer une vision complète des environnements informatiques, de leur mise en place à leur sécurisation. Basé à Lyon, titulaire du permis B.
        </motion.p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <MagneticButton intent="primary" onClick={() => (window.location.href = "mailto:e.gorini@eleve.leschartreux.net")}>
            e.gorini@eleve.leschartreux.net
          </MagneticButton>
          <MagneticButton intent="ghost" onClick={() => (window.location.href = "tel:+33769835778")}>
            07 69 83 57 78
          </MagneticButton>
          <a
            href="https://www.google.com/maps/search/?api=1&query=38%20rue%20Pierre%20Dupont%2C%20Lyon%2069001"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 dark:bg-slate-800/60 dark:text-white dark:hover:bg-slate-700/60"
          >
            Basé à Lyon 1er
          </a>
          <a
            href="/portfolio/pdfs/CV.pdf"
            download
            className="relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 dark:bg-slate-800/60 dark:text-white dark:hover:bg-slate-700/60"
          >
            Télécharger mon CV
          </a>
        </div>
      </div>
    </section>
  );
}

function MorphingBlob() {
  return (
    <motion.div aria-hidden initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 0.9, scale: 1 }} transition={{ duration: 0.8 }} className="pointer-events-none absolute -top-16 right-4 -z-0 h-80 w-80 blur-2xl md:right-20 md:h-[28rem] md:w-[28rem]" style={{ background: "radial-gradient(closest-side, rgba(236,72,153,0.45), rgba(56,189,248,0.32) 60%, transparent 70%)", filter: "saturate(1.2)" }}>
      <motion.div className="absolute inset-0" animate={{ borderTopLeftRadius: ["30%", "60%", "40%", "35%"], borderTopRightRadius: ["50%", "35%", "60%", "45%"], borderBottomLeftRadius: ["60%", "40%", "35%", "55%"], borderBottomRightRadius: ["35%", "55%", "45%", "30%"], rotate: [0, 10, -8, 0] }} transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }} style={{ background: "conic-gradient(from 180deg at 50% 50%, rgba(99,102,241,0.55), rgba(236,72,153,0.55), rgba(56,189,248,0.55), rgba(99,102,241,0.55))", boxShadow: "0 0 120px 40px rgba(56,189,248,0.12)" }} />
    </motion.div>
  );
}

/* ─────────────────────────────── Bouton magnétique */
function MagneticButton({ children, intent = "secondary", onClick }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const onMove = (e) => {
    const el = ref.current; if (!el) return; const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2; const y = e.clientY - rect.top - rect.height / 2; setPos({ x, y });
  };
  const base = intent === "primary"
    ? "bg-white text-slate-900 hover:bg-white/90"
    : intent === "ghost"
    ? "bg-transparent ring-1 ring-slate-300 text-slate-900 hover:ring-slate-400 dark:ring-white/20 dark:text-white dark:hover:ring-white/40"
    : "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800/60 dark:text-white dark:hover:bg-slate-700/60";
  return (
    <motion.button ref={ref} onClick={onClick} onPointerMove={onMove} onPointerEnter={() => setHover(true)} onPointerLeave={() => { setHover(false); setPos({ x: 0, y: 0 }); }} style={{ transform: hover ? `translate3d(${pos.x * 0.12}px, ${pos.y * 0.12}px, 0)` : undefined }} whileTap={{ scale: 0.98 }} className={`relative overflow-hidden rounded-2xl px-5 py-3 text-sm font-semibold transition ${base}`}>
      <span className="relative z-10">{children}</span>
      <span className="pointer-events-none absolute -inset-6 -z-0 rounded-full opacity-0 blur-2xl transition-opacity duration-300" style={{ background: intent === "primary" ? "radial-gradient(200px circle at center, rgba(14,165,233,0.3), transparent 60%)" : "radial-gradient(200px circle at center, rgba(236,72,153,0.25), transparent 60%)", opacity: hover ? 1 : 0 }} />
    </motion.button>
  );
}

/* ─────────────────────────────── Compétences (tableau) */
function Skills() {
  const competencies = [
    { key: "gpi", label: "Gérer le patrimoine informatique" },
    { key: "incidents", label: "Répondre aux incidents et aux demandes d’assistance et d’évolution" },
    { key: "presence", label: "Développer la présence en ligne de l’organisation" },
    { key: "projet", label: "Travailler en mode projet" },
    { key: "service", label: "Mettre à disposition des utilisateurs un service informatique" },
    { key: "devpro", label: "Organiser son développement professionnel" },
  ];

  const rows = [
    { type: "group", title: "Réalisations en milieu professionnel en cours de première année" },
    { title: "audit du patrimoine informatique", href: "/portfolio/pdfs/Preuve_1.pdf", gpi: true,  incidents: false, presence: false, projet: false, service: false, devpro: false }, // (1-1)
    { title: "déploiement d’un agent ia vocal", href: "/portfolio/pdfs/Preuve_5.pdf", gpi: false, incidents: false, presence: false, projet: false, service: true,  devpro: false }, // (4-5)
    { title: "créer et organiser son développement professionnel", href: "/portfolio/pdfs/Preuve_6.pdf", gpi: false, incidents: false, presence: false, projet: false, service: false, devpro: true  }, // (5-6)
    { title: "chefferie de projet chez tactee", href: "/portfolio/pdfs/Preuve_4.pdf", gpi: false, incidents: false, presence: false, projet: true,  service: false, devpro: false }, // (3-4)
    { title: "audit et optimisation du maillage interne d’un site", href: "/portfolio/pdfs/Preuve_3.pdf", gpi: false, incidents: false, presence: true,  projet: false, service: false, devpro: false }, // (2-3)
    { type: "group", title: "Réalisations en milieu professionnel en cours de seconde année" },
    { title: "Prise en charge d'incidents et traitement de demandes d'évolution sur poste de travail", href: "/portfolio/pdfs/Preuve_2.pdf", gpi: false, incidents: true,  presence: false, projet: false, service: false, devpro: false }, // (2-2)
  ];

  const Cell = ({ ok }) => (
    <td className="px-3 py-3 text-center">
      {ok ? (
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-fuchsia-400 text-white text-[11px] font-bold shadow-sm">✓</span>
      ) : (
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-400/40 dark:bg-white/20" />
      )}
    </td>
  );

  return (
    <section id="competences" className="mx-auto max-w-6xl px-4 py-14">
      <h2 className="mb-8 text-2xl font-semibold tracking-tight md:text-3xl">Compétences</h2>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white/70 shadow-black/5 dark:border-white/10 dark:bg-slate-900/40">
        <table className="min-w-[1000px] w-full text-sm">
          <thead>
            <tr className="text-left">
              <th className="sticky left-0 z-10 bg-white/90 px-4 py-3 text-slate-700 backdrop-blur dark:bg-slate-900/80 dark:text-slate-200">Réalisation</th>
              {competencies.map((competency) => (
                <th key={competency.key} className="px-3 py-3 font-semibold text-slate-600 dark:text-slate-300">{competency.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              r.type === "group" ? (
                <tr key={idx} className="border-t border-slate-200/70 bg-slate-100/90 dark:border-white/10 dark:bg-slate-800/70">
                  <td colSpan={competencies.length + 1} className="px-4 py-3 text-center text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {r.title}
                  </td>
                </tr>
              ) : (
                <tr key={idx} className="border-t border-slate-200/70 hover:bg-slate-100/60 dark:border-white/5 dark:hover:bg-white/5">
                  <td className="sticky left-0 z-10 bg-white/90 px-4 py-3 font-medium text-sky-600 underline-offset-2 hover:underline backdrop-blur dark:bg-slate-900/80">
                    <a href={r.href} target="_blank" rel="noopener noreferrer">{r.title}</a>
                  </td>
                  {competencies.map((competency) => (
                    <Cell key={competency.key} ok={r[competency.key]} />
                  ))}
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Cliquez sur une réalisation pour ouvrir le PDF.</p>
      <a href="/portfolio/pdfs/tableau.pdf" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-medium text-sky-600 underline-offset-2 hover:underline">
        Voir le tableau officiel
      </a>
    </section>
  );
}

/* ─────────────────────────────── Expérience & Éducation */
function Experience() {
  const blocks = [
    { title: "Stage - PC Réparation", sub: "Lyon", when: "", details: "Diagnostic, réparation et évolution de postes informatiques." },
    { title: "Manutention - Indépendant", sub: "Aix-en-Provence", when: "Aout 2025", details: "Rénovation" },
    { title: "Equipier commercial - Métro", sub: "Venelles", when: "Juillet - Aout 2025", details: "Mise en rayon, réassort, gestion des stocks, contrôle des dates, accueil et conseil clients." },
    { title: "Intérim - RAS", sub: "Aix-en-Provence", when: "Juillet 2025", details: "Aide chauffeur" },
    { title: "Stage - Agence Tactee", sub: "Lyon", when: "Juin - juillet 2025", details: "Audits SEO, SEA, Chefferie de projet." },

    { title: "Intérim - Manutention", sub: "InterimNation, Aix-en-Provence", when: "2023 – 2024", details: "Missions logistiques et polyvalence." },
    { title: "Laveur de vitres - Indépendant", sub: "Aix-en-Provence", when: "2022 – 2023", details: "Prestations chez particuliers et pros." },
    { title: "Garde d'enfants - Indépendant", sub: "Aix-en-Provence", when: "2021 – 2023", details: "Responsable et ponctuel." },
    { title: "Stage - Cybercafé NextG", sub: "Aix-en-Provence", when: "Fév. – Mars 2020", details: "Affiches et support logiciel de gestion de postes." },
  ];
  const studies = [
    { title: "BTS SIO", sub: "Institution des Chartreux, Lyon", when: "2024 – 2025 (en cours)", details: "Parcours SISR/SLAM, projets réseau & web." },
    { title: "CPGE PCSI", sub: "Institution des Chartreux, Lyon", when: "2023 – 2024", details: "Physique, Chimie, Sciences de l'Ingénieur." },
    { title: "Baccalauréat général (mention)", sub: "Lycée Vauvenargues, Aix-en-Provence", when: "2022 – 2023", details: "Spécialités Mathématiques, NSI." },
  ];
  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-14">
      <h2 className="mb-8 text-2xl font-semibold tracking-tight md:text-3xl">Expérience</h2>
      <Timeline items={blocks} />
      <h3 className="mb-4 mt-12 text-xl font-semibold">Éducation</h3>
      <Timeline items={studies} />
    </section>
  );
}

function Timeline({ items }) {
  return (
    <div className="relative pl-6">
      <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-gradient-to-b from-fuchsia-400/70 via-violet-400/70 to-sky-400/70" />
      <div className="space-y-8">
        {items.map((s, idx) => (
          <motion.div key={s.title + idx} initial={{ x: -10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, margin: "-40px" }} transition={{ type: "spring", stiffness: 200, damping: 24 }} className="relative rounded-2xl border border-slate-200 bg-white/60 p-5 shadow-black/5 dark:border-white/10 dark:bg-slate-900/50 dark:shadow-black/10">
            <span className="absolute -left-[23px] top-5 h-3 w-3 rounded-full bg-slate-400 dark:bg-white" />
            <div className="flex items-center justify-between gap-4">
              <h4 className="text-lg font-semibold">{s.title}</h4>
              <span className="text-xs text-slate-500 dark:text-slate-400">{s.when}</span>
            </div>
            <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">{s.sub}</p>
            <p className="mt-2 max-w-[60ch] text-slate-600 dark:text-slate-400">{s.details}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────── Certifications (→ Credly + hover anim) */
function Certifications() {
  const certs = [
    { title: "Computer Hardware Basics", href: "https://www.credly.com/badges/a9362b5b-0677-47a5-a7d0-49d88c751b5d" },
    { title: "Python Essentials 1", href: "https://www.credly.com/badges/e14a35d2-ad0d-4b14-ac5a-667b04178913" },
    { title: "Introduction to Cybersecurity", href: "https://www.credly.com/badges/0d97b950-20ba-4374-b850-f0b32c3054e5" },
    { title: "Fortinet Certified Fundamentals Cybersecurity", href: "https://www.credly.com/badges/dd84c8ed-3989-44a1-85e3-85fc3fb89760" },
    { title: "Getting Started in Cybersecurity 2.0", href: "https://www.credly.com/badges/4d2855f0-cdc7-4646-aa94-511394781f17" },
    { title: "Introduction to the Threat Landscape 2.0", href: "https://www.credly.com/badges/6b2617f3-daa6-418a-84f3-7a068c646e4a" },
    { title: "Technical Introduction to Cybersecurity 1.0", href: "https://www.credly.com/badges/174e74fa-4393-4196-a3fd-f1c22c5da452" },
    { title: "CSNA - Certified Stormshield Network Administrator", href: "#" },
  ];

  const openLink = (url) => window.open(url, "_blank", "noopener,noreferrer");
  const handleMove = (e) => {
    const el = e.currentTarget; const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };
  const handleKey = (href) => (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLink(href); } };

  return (
    <section id="certifs" className="mx-auto max-w-6xl px-4 py-14">
      <h2 className="mb-8 text-2xl font-semibold tracking-tight md:text-3xl">Certifications</h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {certs.map((c, idx) => (
          <li
            key={idx}
            onClick={() => openLink(c.href)}
            onMouseMove={handleMove}
            onKeyDown={handleKey(c.href)}
            tabIndex={0}
            className="relative overflow-hidden cursor-pointer select-none rounded-xl border border-slate-200 bg-white/60 px-4 py-3 text-slate-700 transition dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-300"
          >
            <span>{c.title}</span>
          </li>
        ))}
      </ul>
      <style>{`
        :root{ --ease: cubic-bezier(.2,.8,.2,1); }
        #certifs li{ transition: transform .25s var(--ease), border-color .25s var(--ease), background-color .25s var(--ease), box-shadow .25s var(--ease); }
        #certifs li::before{ content:""; position:absolute; inset:-2px; border-radius:inherit; pointer-events:none; opacity:0; transition: opacity .25s var(--ease); background:
          radial-gradient(180px circle at var(--mx,50%) var(--my,50%), rgba(56,189,248,.18), transparent 40%),
          radial-gradient(220px circle at var(--mx,50%) var(--my,50%), rgba(236,72,153,.14), transparent 45%);
          filter:saturate(1.1);
        }
        #certifs li::after{ content:'›'; position:absolute; right:16px; top:50%; transform:translateY(-50%) translateX(4px); opacity:0; font-size:18px; color:rgba(0,0,0,.4); transition: transform .25s var(--ease), opacity .25s var(--ease); }
        /* Hover (clair) */
        #certifs li:hover{ transform: translateY(-2px) scale(1.01); border-color: rgb(203 213 225); background-color: rgba(241,245,249,.9); box-shadow: 0 10px 30px rgba(0,0,0,.12); }
        #certifs li:hover::before{ opacity:1; }
        #certifs li:hover::after{ opacity:.85; transform:translateY(-50%) translateX(0); }
        #certifs li:active{ transform: translateY(0) scale(.995); }
        /* Hover (sombre) */
        .dark #certifs li::after{ color:rgba(255,255,255,.45); }
        .dark #certifs li:hover{ border-color: rgba(255,255,255,.22); background-color: rgba(15,23,42,.65); box-shadow: 0 10px 30px rgba(0,0,0,.35); }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────── Contact */
function ContactCTA() {
  return (
    <section id="contact" className="relative mx-auto my-14 max-w-6xl overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100/80 px-6 py-14 dark:border-white/10 dark:bg-slate-900/60">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl" />
      <div className="relative">
        <h2 className="text-2xl font-semibold md:text-3xl">Restons en contact</h2>
        
        <div className="mt-6 flex flex-wrap gap-3">
          <MagneticButton intent="primary" onClick={() => (window.location.href = "mailto:e.gorini@eleve.leschartreux.net")}>
            e.gorini@eleve.leschartreux.net
          </MagneticButton>
          <MagneticButton intent="ghost" onClick={() => (window.location.href = "tel:+33769835778")}>
            07 69 83 57 78
          </MagneticButton>
          <MagneticButton onClick={() => (window.location.href = "#accueil")}>
            Lyon, 69001 — France
          </MagneticButton>
          <a
            href="/portfolio/pdfs/CV.pdf"
            download
            className="relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200 dark:bg-slate-800/60 dark:text-white dark:hover:bg-slate-700/60"
          >
            Télécharger mon CV
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto mt-8 max-w-6xl px-4 pb-12 text-slate-500 dark:text-slate-400">
      <p className="text-xs">© 2026 — Portfolio d'Ethan Gorini.</p>
    </footer>
  );
}
