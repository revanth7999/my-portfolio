import { useState, useEffect } from "react";
import {
  Mail,
  ExternalLink,
  Download,
  MapPin,
  Menu,
  X,
  Terminal,
  Sun,
  Moon,
} from "lucide-react";

// Github and LinkedIn are brand/logo icons, removed from lucide-react in v1.0 —
// small inline SVGs instead, sized and colored to match the rest of the icon set.
const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 5.02 3.26 9.28 7.77 10.78.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.16.69-3.83-1.34-3.83-1.34-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.16a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.19-1.47 3.15-1.16 3.15-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.65 5.31-5.18 5.59.41.35.77 1.04.77 2.1 0 1.52-.01 2.74-.01 3.11 0 .3.2.66.79.55A11.26 11.26 0 0 0 23.25 11.75C23.25 5.48 18.27.5 12 .5Z" />
  </svg>
);
const LinkedinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.45-2.14 2.94v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
  </svg>
);

const NAV = [
  { id: "about", label: "About Me" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills & Tools" },
];

const PROJECTS = [
  {
    file: "dinemaster.md",
    title: "DineMaster",
    blurb:
      "Full-stack restaurant management platform. JWT auth with refresh tokens, event-driven notifications, and an LLM-backed feature via LangChain4j + Ollama-deployed as a React frontend on GitHub Pages talking to a Dockerized Spring Boot API on Render.",
    detail:
      "Notable fix: traced a production 401 loop to a three-way conflict between @CrossOrigin and global CORS config, SameSite cookie rules on cross-origin requests, and HttpOnly cookies that couldn't be cleared client-side-resolved by expiring the cookie server-side.",
    stack: ["React", "Redux Toolkit", "Spring Boot", "PostgreSQL", "Docker", "JWT", "LangChain4j"],
    links: { code: "#", live: "#" },
  },
  {
    file: "ticket-booking-system.md",
    title: "Ticket Booking System",
    blurb:
      "Microservices-based event ticketing platform built as a core portfolio piece-each service independently Dockerized and deployable on its own.",
    detail: "Focused on service boundaries, containerization, and inter-service communication patterns.",
    stack: ["Microservices", "Spring Boot", "Docker"],
    links: { code: "#", live: "#" },
  },
  {
    file: "home-lab.md",
    title: "Home Lab Infrastructure",
    blurb:
      "Self-hosted platform running on a repurposed Ubuntu machine-my own CI/CD, networking, and monitoring, not a tutorial clone.",
    detail:
      "GitHub Actions self-hosted runner triggers a Docker build + Compose redeploy on push. Tailscale for remote access, Nginx with a PKCS12-keystore SSL cert in front, and a backend health endpoint the frontend polls for live status.",
    stack: ["Docker Compose", "GitHub Actions", "Nginx", "Tailscale", "DevOps"],
    links: { code: "#", live: "#" },
  },
];

const JOURNEY = [
  {
    date: "01/2026 – Present",
    title: "Senior Software Engineer",
    org: "CitiusTech Healthcare Technologies",
    desc:
      "Building scalable healthcare applications with Java, React, Spring, and AWS. Monitoring performance metrics to identify and resolve efficiency issues.",
  },
  {
    date: "12/2021 – 12/2025",
    title: "Software Engineer II",
    org: "Advarra",
    desc:
      "Started on foundational apps like eConsent (React, Spring Boot), then moved onto flagship products OnCore and the Advarra Platform. Designed an event-driven notification workflow with Spring Boot events to decouple business logic from email/in-app delivery. Led the migration from Vagrant VMs to Docker for faster, more consistent dev environments. Built reusable frontend components (CommonSearchPage, CommonLandingPage, Tooltips) used across teams.",
  },
  {
    date: "06/2021 – 12/2021",
    title: "Junior Software Developer",
    org: "Primesoft Inc",
    desc:
      "Built the ePro mobile/iPad app with React Native and Expo, and led an Expo SDK upgrade from v40 to the latest for better performance and platform compatibility.",
  },
  {
    date: "02/2021 – 06/2021",
    title: "Mobile App Developer Intern",
    org: "3Edge Solutions",
    desc: "Trained and worked as a React Native developer building cross-platform mobile apps.",
  },
];

const SKILLS = [
  {
    dir: "frontend/",
    items: ["React", "React Native", "Redux Toolkit", "Backbone.js", "Vite", "Bootstrap", "PrimeReact", "JavaScript"],
  },
  {
    dir: "backend/",
    items: ["Java", "Node", "Spring Boot", "Spring Security", "JPA / Hibernate", "REST APIs", "Swagger / OpenAPI"],
  },
  {
    dir: "data/",
    items: ["PostgreSQL", "MySQL", "Liquibase"],
  },
  {
    dir: "infra/",
    items: ["Docker", "Docker Compose", "AWS", "GitHub Actions", "Nginx", "Tailscale"],
  },
  {
    dir: "other/",
    items: ["JWT Auth", "Event-Driven Architecture", "LangChain4j", "Ollama", "Agile", "Expo"],
  },
];

function useISTClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function SectionLabel({ children }) {
  return (
    <div className="section-label">
      <span className="prompt">$</span> {children}
    </div>
  );
}

export default function Portfolio() {
  const time = useISTClock();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="pf-root" data-theme={theme}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600;700&display=swap');

        /* Vite's default index.css puts body in a centered flexbox with a
           max content width-that's what was squeezing the background.
           Reset it here so the page fills the full viewport width. */
        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100vh;
          text-align: left;
        }
        body {
          display: block !important;
          place-items: unset !important;
        }
        .pf-root { text-align: left; }

        .pf-root {
          --bg: #0a0a0a;
          --bg-rgb: 10, 10, 10;
          --bg-elev: #131313;
          --border: #2a2a28;
          --text: #f0f0ed;
          --text-dim: #8a8a86;
          --text-faint: #565553;
          --accent: #f0f0ed;
          --mono: 'JetBrains Mono', monospace;
          --sans: 'Inter', sans-serif;

          width: 100%;
          background: var(--bg);
          color: var(--text);
          font-family: var(--sans);
          min-height: 100vh;
          line-height: 1.6;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .pf-root[data-theme='light'] {
          --bg: #fbfbf9;
          --bg-rgb: 251, 251, 249;
          --bg-elev: #f2f1ec;
          --border: #d8d7d0;
          --text: #14140f;
          --text-dim: #514f47;
          --text-faint: #85837a;
          --accent: #196b3a;
        }
        .pf-root * { box-sizing: border-box; }
        .pf-root *, .pf-root *::before, .pf-root *::after {
          transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }

        .prompt { color: var(--text-dim); }
        .pf-root[data-theme='light'] .prompt { color: var(--accent); }

        /* header */
        .pf-header {
          position: sticky;
          top: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 32px;
          background: rgba(var(--bg-rgb), 0.85);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--border);
        }
        .pf-root[data-theme='light'] .pf-header {
          box-shadow: 0 1px 0 rgba(20, 20, 15, 0.03);
        }
        .pf-logo {
          font-family: var(--mono);
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 0.02em;
          color: var(--text);
        }
        .pf-logo .tilde { color: var(--text-dim); }
        .pf-nav { display: flex; gap: 28px; }
        .pf-nav button {
          background: none;
          border: none;
          color: var(--text-dim);
          font-family: var(--mono);
          font-size: 12.5px;
          letter-spacing: 0.03em;
          cursor: pointer;
          padding: 4px 0;
          border-bottom: 1px solid transparent;
          transition: color 0.15s, border-color 0.15s;
        }
        .pf-nav button:hover { color: var(--text); border-color: var(--text-dim); }

        .pf-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--mono);
          font-size: 12px;
          color: var(--text-dim);
        }
        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--text);
          animation: pulse 2s infinite;
        }
        .pf-root[data-theme='light'] .dot { background: var(--accent); }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.25; }
        }

        .theme-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          background: none;
          border: 1px solid var(--border);
          color: var(--text);
          cursor: pointer;
        }
        .theme-btn:hover { border-color: var(--text-dim); }

        .menu-btn { display: none; background: none; border: none; color: var(--text); cursor: pointer; }
        .pf-mobile-nav {
          display: none;
          flex-direction: column;
          gap: 2px;
          padding: 8px 32px 20px;
          border-bottom: 1px solid var(--border);
        }
        .pf-mobile-nav.open { display: flex; }
        .pf-mobile-nav button {
          text-align: left;
          background: none;
          border: none;
          color: var(--text-dim);
          font-family: var(--mono);
          font-size: 13px;
          padding: 10px 0;
          border-bottom: 1px solid var(--border);
          cursor: pointer;
        }

        .header-right { display: flex; align-items: center; gap: 16px; }

        @media (max-width: 860px) {
          .pf-nav { display: none; }
          .menu-btn { display: block; }
          .pf-status { display: none; }
        }

        /* hero */
        .hero {
          padding: 120px 32px 90px;
          max-width: 900px;
          margin: 0 auto;
        }
        .hero-eyebrow {
          font-family: var(--mono);
          font-size: 13px;
          color: var(--text-dim);
          margin-bottom: 18px;
        }
        .hero h1 {
          font-family: var(--mono);
          font-size: clamp(34px, 6vw, 58px);
          font-weight: 700;
          line-height: 1.15;
          margin: 0 0 18px;
          letter-spacing: -0.01em;
          color: var(--text);
        }
        .cursor {
          display: inline-block;
          width: 0.5em;
          background: var(--text);
          animation: blink 1s step-end infinite;
        }
        .pf-root[data-theme='light'] .cursor { background: var(--accent); }
        @keyframes blink { 50% { opacity: 0; } }
        .hero p.tagline {
          font-size: 18px;
          color: var(--text-dim);
          max-width: 620px;
          margin: 0 0 28px;
        }
        .hero-meta {
          display: flex;
          gap: 22px;
          flex-wrap: wrap;
          font-family: var(--mono);
          font-size: 12.5px;
          color: var(--text-faint);
        }
        .hero-meta span { display: flex; align-items: center; gap: 6px; }

        /* sections */
        section { padding: 70px 32px; max-width: 900px; margin: 0 auto; border-top: 1px solid var(--border); }
        .section-label {
          font-family: var(--mono);
          font-size: 12.5px;
          color: var(--text-dim);
          text-transform: lowercase;
          margin-bottom: 22px;
          letter-spacing: 0.02em;
        }
        h2.h-title {
          font-family: var(--mono);
          font-size: 26px;
          font-weight: 700;
          margin: 0 0 24px;
          color: var(--text);
        }
        .about-text { font-size: 16px; color: var(--text-dim); max-width: 680px; }
        .about-text strong { color: var(--text); font-weight: 600; }

        /* projects */
        .project-card {
          border: 1px solid var(--border);
          background: var(--bg-elev);
          padding: 26px 28px;
          margin-bottom: 18px;
        }
        .pf-root[data-theme='light'] .project-card,
        .pf-root[data-theme='light'] .resume-box {
          box-shadow: 0 1px 3px rgba(20, 20, 15, 0.04);
        }
        .project-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 6px;
          flex-wrap: wrap;
          gap: 8px;
        }
        .project-file { font-family: var(--mono); font-size: 12px; color: var(--text-faint); }
        .project-title { font-size: 19px; font-weight: 600; margin: 4px 0 10px; color: var(--text); }
        .project-links { display: flex; gap: 14px; }
        .project-links a { color: var(--text-dim); display: flex; align-items: center; gap: 4px; font-family: var(--mono); font-size: 12px; text-decoration: none; }
        .project-links a:hover { color: var(--text); }
        .project-blurb { color: var(--text-dim); font-size: 14.5px; margin-bottom: 10px; }
        .project-detail { color: var(--text-faint); font-size: 13.5px; margin-bottom: 16px; border-left: 2px solid var(--border); padding-left: 12px; }
        .tag-row { display: flex; flex-wrap: wrap; gap: 8px; }
        .tag {
          font-family: var(--mono);
          font-size: 11px;
          color: var(--text-dim);
          border: 1px solid var(--border);
          padding: 4px 9px;
        }

        /* journey */
        .timeline { position: relative; padding-left: 26px; }
        .timeline::before {
          content: '';
          position: absolute;
          left: 5px; top: 6px; bottom: 6px;
          width: 1px;
          background: var(--border);
        }
        .t-item { position: relative; margin-bottom: 34px; }
        .t-item::before {
          content: '';
          position: absolute;
          left: -26px; top: 5px;
          width: 9px; height: 9px;
          border-radius: 50%;
          background: var(--bg);
          border: 1px solid var(--text-dim);
        }
        .t-date { font-family: var(--mono); font-size: 11.5px; color: var(--text-faint); margin-bottom: 4px; }
        .t-title { font-size: 16.5px; font-weight: 600; color: var(--text); }
        .t-org { font-family: var(--mono); font-size: 12.5px; color: var(--text-dim); margin-bottom: 8px; }
        .t-desc { font-size: 14px; color: var(--text-dim); max-width: 600px; }

        /* resume */
        .resume-box {
          border: 1px solid var(--border);
          background: var(--bg-elev);
          padding: 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 24px;
        }
        .resume-stats { display: flex; gap: 32px; flex-wrap: wrap; }
        .stat-num { font-family: var(--mono); font-size: 24px; font-weight: 700; color: var(--text); }
        .stat-label { font-family: var(--mono); font-size: 11px; color: var(--text-dim); }
        .btn {
          font-family: var(--mono);
          font-size: 13px;
          background: var(--text);
          color: var(--bg);
          border: 1px solid var(--text);
          padding: 12px 20px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          text-decoration: none;
          transition: opacity 0.15s;
        }
        .btn:hover { opacity: 0.85; }

        /* contact */
        .contact-grid { display: flex; gap: 16px; flex-wrap: wrap; }
        .contact-card {
          border: 1px solid var(--border);
          padding: 20px 22px;
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
          min-width: 220px;
          text-decoration: none;
          color: var(--text);
          transition: border-color 0.15s;
        }
        .contact-card:hover { border-color: var(--text-dim); }
        .contact-label { font-family: var(--mono); font-size: 11px; color: var(--text-faint); }
        .contact-value { font-size: 14.5px; color: var(--text); }

        /* education */
        .edu-item { margin-bottom: 20px; }
        .edu-degree { font-size: 16px; font-weight: 600; color: var(--text); }
        .edu-school { font-family: var(--mono); font-size: 12.5px; color: var(--text-dim); }
        .edu-year { font-family: var(--mono); font-size: 11.5px; color: var(--text-faint); }

        /* skills */
        .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px; }
        .skill-dir { font-family: var(--mono); font-size: 12.5px; color: var(--text-dim); margin-bottom: 10px; }
        .skill-dir .prompt { color: var(--text-faint); }
        .skill-pills { display: flex; flex-wrap: wrap; gap: 8px; }
        .pill { font-size: 13px; border: 1px solid var(--border); padding: 6px 12px; color: var(--text); }

        footer {
          padding: 40px 32px 60px;
          text-align: center;
          font-family: var(--mono);
          font-size: 11.5px;
          color: var(--text-faint);
          border-top: 1px solid var(--border);
        }
      `}</style>

      {/* header */}
      <header className="pf-header">
        <div className="pf-logo"><span className="tilde">~/</span>revanth</div>
        <nav className="pf-nav">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => scrollTo(n.id)}>{n.label}</button>
          ))}
        </nav>
        <div className="header-right">
          <div className="pf-status">
            <span className="dot" />
            IST {time} · Open to opportunities
          </div>
          <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle color theme">
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button className="menu-btn" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>
      <div className={`pf-mobile-nav ${menuOpen ? "open" : ""}`}>
        {NAV.map((n) => (
          <button key={n.id} onClick={() => scrollTo(n.id)}>{n.label}</button>
        ))}
        <div style={{ paddingTop: 10, fontFamily: "var(--mono)", fontSize: 12, color: "var(--text-faint)" }}>
          IST {time}
        </div>
      </div>

      {/* hero */}
      <section className="hero" style={{ borderTop: "none" }}>
        <div className="hero-eyebrow"><span className="prompt">$</span> whoami</div>
        <h1>Revanth Nagalapuram<span className="cursor">&nbsp;</span></h1>
        <p className="tagline">
          Full-stack engineer-React on the frontend, Java / Spring Boot on the backend.
          I build, ship, and run my own infrastructure, not just the app.
        </p>
        <div className="hero-meta">
          <span><MapPin size={13} /> Chennai / Bengaluru, India</span>
          <span>4+ years experience</span>
          <span>Currently at CitiusTech</span>
        </div>
      </section>

      {/* about */}
      <section id="about">
        <SectionLabel>cat about.md</SectionLabel>
        <h2 className="h-title">About Me</h2>
        <p className="about-text">
          I'm a <strong>full-stack engineer with 4+ years of experience</strong> across React.js
          and Java/Spring Boot, most recently at <strong>CitiusTech</strong>, and before that{" "}
          <strong>Advarra</strong>, where I worked across React, Java, and Backbone.js on
          products spanning eConsent, OnCore, and the Advarra Platform. Earlier in my career I
          built React Native mobile apps at Primesoft and 3Edge. I like owning problems end-to-end-from a Postgres schema
          to the pixel that renders it-which is why my side projects tend to include the
          backend, the auth, and the Docker Compose file, not just the UI. Outside of client work
          I run a personal home lab with my own CI/CD pipeline, reverse proxy, and monitoring
          setup, and I'm currently working through a structured upskilling roadmap covering Java
          internals, Spring Boot internals, and microservices. I'm looking for a mid-level role
          at a smaller, product-led company in Chennai or Bengaluru where ownership is real, not
          just a value on a slide.
        </p>
      </section>

      {/* projects */}
      <section id="projects">
        <SectionLabel>ls projects/</SectionLabel>
        <h2 className="h-title">Projects</h2>
        {PROJECTS.map((p) => (
          <div className="project-card" key={p.title}>
            <div className="project-head">
              <span className="project-file">{p.file}</span>
              <div className="project-links">
                <a href={p.links.code}><GithubIcon size={13} /> code</a>
                <a href={p.links.live}><ExternalLink size={13} /> live</a>
              </div>
            </div>
            <div className="project-title">{p.title}</div>
            <p className="project-blurb">{p.blurb}</p>
            <p className="project-detail">{p.detail}</p>
            <div className="tag-row">
              {p.stack.map((s) => <span className="tag" key={s}>{s}</span>)}
            </div>
          </div>
        ))}
      </section>

      {/* journey */}
      <section id="journey">
        <SectionLabel>log --graph journey</SectionLabel>
        <h2 className="h-title">Journey</h2>
        <div className="timeline">
          {JOURNEY.map((j) => (
            <div className="t-item" key={j.title + j.org}>
              <div className="t-date">{j.date}</div>
              <div className="t-title">{j.title}</div>
              <div className="t-org">{j.org}</div>
              <div className="t-desc">{j.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* resume */}
      <section id="resume">
        <SectionLabel>./resume --export</SectionLabel>
        <h2 className="h-title">Resume</h2>
        <div className="resume-box">
          <div className="resume-stats">
            <div>
              <div className="stat-num">4+</div>
              <div className="stat-label">YEARS EXPERIENCE</div>
            </div>
            <div>
              <div className="stat-num">3</div>
              <div className="stat-label">SHIPPED PROJECTS</div>
            </div>
            <div>
              <div className="stat-num">4</div>
              <div className="stat-label">COMPANIES</div>
            </div>
          </div>
          <a href="/resume.pdf" className="btn" download><Download size={15} /> Download Resume (PDF)</a>
        </div>
      </section>

      {/* contact */}
      <section id="contact">
        <SectionLabel>./contact.sh</SectionLabel>
        <h2 className="h-title">Contact</h2>
        <div className="contact-grid">
          <a className="contact-card" href="mailto:revanthkumar.iris@gmail.com">
            <Mail size={18} />
            <div>
              <div className="contact-label">EMAIL</div>
              <div className="contact-value">revanthkumar.iris@gmail.com</div>
            </div>
          </a>
          <a className="contact-card" href="#">
            <LinkedinIcon size={18} />
            <div>
              <div className="contact-label">LINKEDIN</div>
              <div className="contact-value">linkedin.com/in/[you]</div>
            </div>
          </a>
          <a className="contact-card" href="https://github.com/revanth7999">
            <GithubIcon size={18} />
            <div>
              <div className="contact-label">GITHUB</div>
              <div className="contact-value">github.com/revanth7999</div>
            </div>
          </a>
        </div>
      </section>

      {/* education */}
      <section id="education">
        <SectionLabel>cat education.md</SectionLabel>
        <h2 className="h-title">Education</h2>
        <div className="edu-item">
          <div className="edu-degree">B.Tech, Computer Engineering</div>
          <div className="edu-school">Narayana Engineering College, Gudur</div>
          <div className="edu-year">2020</div>
        </div>
      </section>

      {/* skills */}
      <section id="skills">
        <SectionLabel>tree skills/</SectionLabel>
        <h2 className="h-title">Skills &amp; Tools</h2>
        <div className="skills-grid">
          {SKILLS.map((g) => (
            <div key={g.dir}>
              <div className="skill-dir"><span className="prompt">›</span> {g.dir}</div>
              <div className="skill-pills">
                {g.items.map((i) => <span className="pill" key={i}>{i}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <Terminal size={13} style={{ verticalAlign: "-2px", marginRight: 6 }} />
        Revanth
      </footer>
    </div>
  );
}
