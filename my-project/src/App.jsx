import { useState, useEffect, useRef } from "react";

/* ─── DATA ──────────────────────────────────────────────────────────────── */
const DATA = {
  name: "Raazdeep",
  title: "SDE Intern Candidate",
  bio: "CS undergrad passionate about building scalable full-stack products. I turn ideas into shipping code using the MERN stack.",
  email: "royraazdeep2005@gmail.com",
  links: { github: "https://github.com/royraazdeep", linkedin: "https://www.linkedin.com/in/royraazdeep/", twitter: "", resume: "https://drive.google.com/drive/folders/1pwT0t_nRTRib8qIPoGy2HmCcaZuTeznN?usp=sharing" },

  skills: [
    { name: "React.js",    pct: 90, color: "#61dafb" },
    { name: "Node.js",     pct: 82, color: "#84cc16" },
    { name: "MongoDB",     pct: 76, color: "#4ade80" },
    { name: "Express.js",  pct: 80, color: "#f97316" },
    { name: "JavaScript",  pct: 93, color: "#facc15" },
    { name: "TypeScript",  pct: 71, color: "#60a5fa" },
    { name: "Tailwind CSS",pct: 88, color: "#38bdf8" },
    { name: "Git & GitHub",pct: 86, color: "#e2e8f0" },
  ],

  projects: [
    {
      title: "TaskFlow",
      emoji: "🗂️",
      desc: "Real-time project management app with drag-and-drop boards, JWT auth, and Socket.io collaboration.",
      stack: ["React", "Node.js", "MongoDB", "Socket.io"],
      accent: "#00f5a0",
    },
    {
      title: "EDUSphere",
      emoji: "🛒",
      desc: "Full-featured e-commerce platform with Stripe payments, admin dashboard, and Cloudinary image uploads.",
      stack: ["MERN", "Redux", "Stripe", "Cloudinary"],
      accent: "#f472b6",
    },
    {
      title: "VSCAN",
      emoji: "🔗",
      desc: "Developer social network with posts, profiles, GitHub integration, and a RESTful API.",
      stack: ["React", "Express", "MongoDB", "REST API"],
      accent: "#a78bfa",
    },
  ],

  experience: [
    {
      role: "Open Source Contributor",
      org: "GitHub",
      period: "2023 – Present",
      desc: "Bug fixes and features across several JS/React open source projects.",
      icon: "🐙",
    },
    {
      role: "Freelance Developer",
      org: "Self-employed",
      period: "2023 – 2024",
      desc: "Delivered 3 full-stack web apps for local clients using the MERN stack.",
      icon: "💻",
    },
    {
      role: "CS Undergraduate",
      org: "Your University",
      period: "2022 – Present",
      desc: "Relevant coursework: DSA, OS, DBMS, Computer Networks, Web Development.",
      icon: "🎓",
    },
  ],
};

/* ─── HOOKS ─────────────────────────────────────────────────────────────── */
function useInView(threshold = 0.18) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

/* ─── TINY COMPONENTS ────────────────────────────────────────────────────── */
const Tag = ({ label, color }) => (
  <span style={{
    background: `${color}18`, color, border: `1px solid ${color}44`,
    borderRadius: 6, padding: "2px 10px", fontSize: 12,
    fontFamily: "'DM Mono', monospace", letterSpacing: "0.02em",
  }}>{label}</span>
);

const SectionHead = ({ eyebrow, title }) => (
  <div style={{ marginBottom: "3rem" }}>
    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: "0.18em", color: "#00f5a0", textTransform: "uppercase", marginBottom: 8 }}>
      ── {eyebrow}
    </p>
    <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.8rem,4vw,2.8rem)", color: "#f1f5f9", letterSpacing: "-1px" }}>{title}</h2>
  </div>
);

/* ─── SKILL BAR ──────────────────────────────────────────────────────────── */
function SkillBar({ name, pct, color, delay }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(10px)", transition: `opacity .5s ${delay}ms, transform .5s ${delay}ms` }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: 13, color: "#cbd5e1", fontFamily: "'DM Mono', monospace" }}>{name}</span>
        <span style={{ fontSize: 12, color, fontFamily: "'DM Mono', monospace" }}>{pct}%</span>
      </div>
      <div style={{ height: 5, background: "#1e293b", borderRadius: 99, overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 99, background: `linear-gradient(90deg, ${color}, ${color}88)`,
          width: vis ? `${pct}%` : "0%", transition: `width 1s ease ${delay + 150}ms`,
        }} />
      </div>
    </div>
  );
}

/* ─── PROJECT CARD ───────────────────────────────────────────────────────── */
function ProjectCard({ p, delay }) {
  const [ref, vis] = useInView();
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(28px)",
        transition: `opacity .6s ${delay}ms, transform .6s ${delay}ms, box-shadow .3s, border-color .3s`,
        background: "#0b1726", border: `1px solid ${hov ? p.accent : "#1e293b"}`,
        borderRadius: 16, padding: "1.8rem", cursor: "default",
        boxShadow: hov ? `0 0 40px ${p.accent}20` : "none",
      }}>
      <div style={{ fontSize: 36, marginBottom: 12 }}>{p.emoji}</div>
      <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "#f1f5f9", marginBottom: 8 }}>{p.title}</h3>
      <p style={{ color: "#64748b", fontSize: "0.88rem", lineHeight: 1.65, marginBottom: 16 }}>{p.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
        {p.stack.map(s => <Tag key={s} label={s} color={p.accent} />)}
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        <a href="#" style={{ color: "#94a3b8", fontSize: 13, textDecoration: "none", borderBottom: "1px solid #94a3b8" }}>GitHub ↗</a>
        <a href="#" style={{ color: p.accent, fontSize: 13, textDecoration: "none", borderBottom: `1px solid ${p.accent}` }}>Live ↗</a>
      </div>
    </div>
  );
}

/* ─── EXPERIENCE CARD ────────────────────────────────────────────────────── */
function ExpCard({ e, delay }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{
      display: "flex", gap: 20, marginBottom: 20,
      opacity: vis ? 1 : 0, transform: vis ? "none" : "translateX(-20px)",
      transition: `opacity .6s ${delay}ms, transform .6s ${delay}ms`,
    }}>
      <div style={{ width: 50, height: 50, flexShrink: 0, borderRadius: "50%", background: "#0b1726", border: "1px solid #1e293b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{e.icon}</div>
      <div style={{ background: "#0b1726", border: "1px solid #1e293b", borderRadius: 12, padding: "1rem 1.4rem", flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 6, marginBottom: 4 }}>
          <div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#f1f5f9" }}>{e.role}</h3>
            <span style={{ color: "#00f5a0", fontSize: 13 }}>{e.org}</span>
          </div>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#475569", background: "#1e293b", borderRadius: 6, padding: "2px 10px", height: "fit-content", whiteSpace: "nowrap" }}>{e.period}</span>
        </div>
        <p style={{ color: "#64748b", fontSize: "0.87rem", lineHeight: 1.6 }}>{e.desc}</p>
      </div>
    </div>
  );
}

/* ─── CONTACT FORM ───────────────────────────────────────────────────────── */
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch (_) {}
    setLoading(false);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  const inputStyle = {
    width: "100%", background: "#0b1726", border: "1px solid #1e293b",
    borderRadius: 10, padding: "0.85rem 1.1rem", color: "#e2e8f0",
    fontSize: "0.92rem", fontFamily: "'DM Sans', sans-serif", outline: "none",
    transition: "border-color .2s", boxSizing: "border-box",
  };

  if (sent) return (
    <div style={{ background: "#052a1a", border: "1px solid #00f5a0", borderRadius: 12, padding: "1.5rem", textAlign: "center", color: "#00f5a0", fontFamily: "'DM Mono', monospace", fontSize: 14 }}>
      ✓ Message sent! I'll reply soon.
    </div>
  );

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {[["Name", "text", "name"], ["Email", "email", "email"]].map(([ph, tp, k]) => (
          <input key={k} type={tp} placeholder={ph} required value={form[k]}
            onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))}
            style={inputStyle}
            onFocus={e => e.target.style.borderColor = "#00f5a0"}
            onBlur={e => e.target.style.borderColor = "#1e293b"}
          />
        ))}
      </div>
      <textarea placeholder="Message" required rows={5} value={form.message}
        onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
        style={{ ...inputStyle, resize: "vertical" }}
        onFocus={e => e.target.style.borderColor = "#00f5a0"}
        onBlur={e => e.target.style.borderColor = "#1e293b"}
      />
      <button type="submit" disabled={loading} style={{
        background: loading ? "#1e293b" : "linear-gradient(135deg,#00f5a0,#00d4ff)",
        color: loading ? "#64748b" : "#060d1a", border: "none", borderRadius: 10,
        padding: "0.9rem", fontFamily: "'Syne', sans-serif", fontWeight: 700,
        fontSize: "0.95rem", cursor: loading ? "not-allowed" : "pointer", transition: "opacity .2s",
      }}>
        {loading ? "Sending…" : "Send Message →"}
      </button>
    </form>
  );
}

/* ─── MAIN APP ───────────────────────────────────────────────────────────── */
export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("about");
  const sections = ["about", "skills", "projects", "experience", "contact"];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveNav(e.target.id); });
    }, { threshold: 0.45 });
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        body{background:#060d1a;color:#e2e8f0;font-family:'DM Sans',sans-serif;overflow-x:hidden}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-track{background:#060d1a}
        ::-webkit-scrollbar-thumb{background:#00f5a0;border-radius:2px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:none}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
        @keyframes spin{to{transform:rotate(360deg)}}
        .hero-anim{animation:fadeUp .9s ease both}
        .float{animation:float 5s ease infinite}
      `}</style>

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav style={{
        position: "fixed", top: 0, width: "100%", zIndex: 100,
        background: scrolled ? "rgba(6,13,26,.92)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled ? "1px solid #1e293b" : "1px solid transparent",
        transition: "all .3s",
      }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "1rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span onClick={() => scrollTo("about")} style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.15rem", color: "#00f5a0", cursor: "pointer" }}>
            {"<"}{DATA.name.split(" ")[0]}{" />"}
          </span>
          <div style={{ display: "flex", gap: "1.8rem" }}>
            {sections.map(s => (
              <span key={s} onClick={() => scrollTo(s)} style={{
                fontFamily: "'DM Mono', monospace", fontSize: 12,
                color: activeNav === s ? "#00f5a0" : "#475569",
                cursor: "pointer", textTransform: "capitalize",
                borderBottom: activeNav === s ? "1px solid #00f5a0" : "1px solid transparent",
                paddingBottom: 2, transition: "all .2s",
              }}>{s}</span>
            ))}
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "8rem 2rem 5rem", position: "relative", overflow: "hidden" }}>
        {/* grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,245,160,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,160,.025) 1px,transparent 1px)", backgroundSize: "72px 72px", pointerEvents: "none" }} />
        {/* glow blob */}
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, background: "radial-gradient(circle, rgba(0,245,160,.07) 0%, transparent 65%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 760, textAlign: "center", position: "relative" }}>
          <div className="float" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#0b1726", border: "1px solid #1e293b", borderRadius: 99, padding: "6px 18px", marginBottom: "2rem" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#00f5a0", animation: "pulse 2s infinite", display: "inline-block" }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#94a3b8" }}>Available for SDE Internships</span>
          </div>

          <h1 className="hero-anim" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 6vw, 4.5rem)",letterSpacing: "-3px", lineHeight: 1.0, color: "#f1f5f9", marginBottom: "1.4rem", animationDelay: ".1s" , textAlign: "center"}}>
            Hi, I'm{" "}
            <span style={{ background: "linear-gradient(130deg,#00f5a0 30%,#00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",  display: "inline-block" }}>{DATA.name}</span>
          </h1>

          <p className="hero-anim" style={{ fontSize: "1.1rem", color: "#64748b", maxWidth: 520, margin: "0 auto 2.4rem", lineHeight: 1.75, animationDelay: ".25s" }}>
            {DATA.bio}
          </p>

          <div className="hero-anim" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", animationDelay: ".4s" }}>
            <button onClick={() => scrollTo("projects")} style={{ background: "linear-gradient(135deg,#00f5a0,#00d4ff)", color: "#060d1a", border: "none", borderRadius: 10, padding: "0.85rem 2rem", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.92rem", cursor: "pointer" }}>
              View Projects →
            </button>
            <button onClick={() => scrollTo("contact")} style={{ background: "transparent", color: "#cbd5e1", border: "1px solid #1e293b", borderRadius: 10, padding: "0.85rem 2rem", fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem", cursor: "pointer" }}>
              Hire Me
            </button>
          </div>

          <div className="hero-anim" style={{ display: "flex", justifyContent: "center", gap: "3.5rem", marginTop: "4rem", animationDelay: ".55s" }}>
            {[["3+", "Projects"], ["10+", "Technologies"], ["Open", "To Work"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "2rem", color: "#00f5a0" }}>{n}</div>
                <div style={{ color: "#475569", fontSize: 13 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────────────── */}
      <section id="skills" style={{ padding: "6rem 2rem", background: "#080f1e" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <SectionHead eyebrow="What I Know" title="Tech Stack" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: "1rem 4rem" }}>
            {DATA.skills.map((s, i) => <SkillBar key={s.name} {...s} delay={i * 70} />)}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────────────────────── */}
      <section id="projects" style={{ padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <SectionHead eyebrow="What I've Built" title="Projects" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.4rem" }}>
            {DATA.projects.map((p, i) => <ProjectCard key={p.title} p={p} delay={i * 110} />)}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ───────────────────────────────────────────────────── */}
      <section id="experience" style={{ padding: "6rem 2rem", background: "#080f1e" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <SectionHead eyebrow="My Journey" title="Experience" />
          <div style={{ position: "relative", paddingLeft: 4 }}>
            <div style={{ position: "absolute", left: 25, top: 0, bottom: 0, width: 1, background: "linear-gradient(180deg,#00f5a0,transparent)" }} />
            {DATA.experience.map((e, i) => <ExpCard key={e.role} e={e} delay={i * 120} />)}
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <section id="contact" style={{ padding: "6rem 2rem 5rem" }}>
        <div style={{ maxWidth: 580, margin: "0 auto" }}>
          <SectionHead eyebrow="Get In Touch" title="Let's Work Together" />
          <p style={{ color: "#64748b", marginBottom: "2rem", lineHeight: 1.7, marginTop: "-1.5rem" }}>
            Actively seeking SDE internship opportunities. Send me a message and I'll respond promptly.
          </p>
          <ContactForm />

          {/* Social links */}
          <div style={{ display: "flex", gap: "1.5rem", marginTop: "2.5rem", justifyContent: "center", flexWrap: "wrap" }}>
            {Object.entries({ "🐙 GitHub": DATA.links.github, "💼 LinkedIn": DATA.links.linkedin, "🐦 Twitter": DATA.links.twitter, "📄 Resume": DATA.links.resume }).map(([label, href]) => (
              <a key={label} href={href}
                style={{ color: "#475569", fontSize: 13, textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#00f5a0"}
                onMouseLeave={e => e.currentTarget.style.color = "#475569"}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid #1e293b", padding: "1.5rem 2rem", textAlign: "center", fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#334155" }}>
        Built with React · © {new Date().getFullYear()} {DATA.name}
      </footer>
    </>
  );
}