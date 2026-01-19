import React, { useState, useEffect } from "react";
import {
  Award,
  GraduationCap,
  MapPin,
  Target,
  Layers,
  MousePointer2,
  Home,
  User,
  Briefcase,
  FolderOpen,
  FileText,
  Mail,
  Menu,
  X,
  Code,
} from "lucide-react";
import { Link } from "react-router-dom";

const Theme = {
  BG: "#FDFCF8",
  BG_SECONDARY: "#F7F5F0",
  TEXT_MAIN: "#1B2A2F",
  TEXT_MUTED: "#7A868A",
  ACCENT: "#D66E53",
  ACCENT_SOFT: "rgba(214, 110, 83, 0.12)",
  LINE: "rgba(27, 42, 47, 0.08)",
  WHITE: "#FFFFFF",
  NAV_BG: "rgba(253, 252, 248, 0.95)",
};

const GlobalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,900;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

html { scroll-behavior: smooth; font-size: 16px; }
body {
  background: ${Theme.BG};
  color: ${Theme.TEXT_MAIN};
  font-family: 'Montserrat', sans-serif;
  overflow-x: hidden;
}

.edu-card {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid ${Theme.LINE};
  background: ${Theme.WHITE};
  width: 100%;
}

.edu-card:hover {
  transform: translateY(-5px);
  border-color: ${Theme.ACCENT};
  box-shadow: 0 20px 40px rgba(214, 110, 83, 0.08);
}

.skill-pill {
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.nav-link {
  position: relative;
  transition: all 0.3s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: ${Theme.ACCENT};
  transition: width 0.3s ease;
}

.nav-link:hover::after { width: 100%; }

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.floating { animation: float 4s ease-in-out infinite; }

@media (max-width: 1024px) {
  .desktop-only { display: none !important; }
  .mobile-toggle-btn { display: block !important; }
}

@media (max-width: 768px) {
  .timeline-line { left: 20px !important; }
  .timeline-dot { left: 20px !important; }
  .timeline-wrapper { justify-content: flex-start !important; padding-left: 45px !important; }
  .edu-card { padding: 1.5rem !important; }
  .hero-title { fontSize: clamp(2.5rem, 8vw, 4rem) !important; }
}
`;

const EducationPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("education");

  const navItems = [
    { path: "/main2", label: "Home", icon: <Home size={16} /> },
    { path: "/about", label: "About", icon: <User size={16} /> },
    { path: "/portfolio", label: "Portfolio", icon: <FolderOpen size={16} /> },
    { path: "/work", label: "Experience", icon: <Briefcase size={16} /> },
    { path: "/skills", label: "Skills", icon: <Code size={16} /> },
    { path: "/education", label: "Education", icon: <GraduationCap size={16} /> },
    { path: "/cv", label: "CV", icon: <FileText size={16} /> },
    { path: "/contact", label: "Contact", icon: <Mail size={16} /> },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('.mobile-menu') && !e.target.closest('.menu-toggle')) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  const educationData = [
    {
      year: "2021 – 2025",
      institution: "Footwear Design & Development Institute",
      degree: "Bachelor of Design",
      spec: "Fashion Technology — 9.05 CGPA",
      location: "Kolkata, WB",
      description: "Merging industrial precision with avant-garde aesthetics. Focusing on the future of footwear through sustainable material research and 3D prototyping.",
      icon: <Layers size={22} />,
      highlights: ["Sustainable Design", "Digital Patterning", "Material Innovation"],
    },
    {
      year: "2018 – 2020",
      institution: "S.J. DAV Public School",
      degree: "Higher Secondary",
      spec: "Commerce Stream",
      location: "Chaibasa, JH",
      description: "A foundation built on economics and quantitative analysis. This period defined my strategic approach to fashion market dynamics and cost-effective design.",
      icon: <Target size={22} />,
      highlights: ["Economics", "Business Studies", "Accountancy"],
    },
  ];

  return (
    <div style={{ backgroundColor: Theme.BG, minHeight: "100vh" }}>
      <style>{GlobalStyles}</style>

      <nav style={navStyles.navbar}>
        <div style={navStyles.navContainer}>
          <Link to="/jiya-portfolio#/main2" style={navStyles.brand}>
            <GraduationCap size={24} style={{ color: Theme.ACCENT }} />
            <span style={navStyles.brandText}>Portfolio</span>
          </Link>

          <div className="desktop-only" style={navStyles.desktopNav}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="nav-link"
                style={{
                  ...navStyles.navLink,
                  color: activeLink === item.label.toLowerCase() ? Theme.ACCENT : Theme.TEXT_MAIN,
                }}
                onClick={() => setActiveLink(item.label.toLowerCase())}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <button
            className="menu-toggle mobile-toggle-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={navStyles.menuToggle}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu" style={navStyles.mobileMenu}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  ...navStyles.mobileLink,
                  color: activeLink === item.label.toLowerCase() ? Theme.ACCENT : Theme.TEXT_MAIN,
                }}
                onClick={() => {
                  setActiveLink(item.label.toLowerCase());
                  setIsMenuOpen(false);
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </nav>

      <section style={heroStyles.container}>
        <div style={heroStyles.content}>
          <span style={heroStyles.badge}>Academic Portfolio</span>
          <h1 className="hero-title" style={heroStyles.title}>
            Academic <br />
            <span style={{ fontStyle: "italic", fontWeight: 400 }}>Journey</span>
          </h1>
          <p style={heroStyles.subtitle}>
            A journey of discipline and creative evolution. Mapping the milestones of my formal training and technical mastery.
          </p>
          <div className="floating" style={{ marginTop: "2rem", color: Theme.ACCENT }}>
            <MousePointer2 size={32} strokeWidth={1} />
          </div>
        </div>
      </section>

      <section style={sectionStyles.container}>
        <div className="timeline-line" style={timelineStyles.line}></div>
        {educationData.map((edu, idx) => (
          <div key={idx} className="timeline-wrapper" style={timelineStyles.wrapper}>
            <div className="timeline-dot" style={timelineStyles.dot}></div>
            <div className="edu-card" style={timelineStyles.card}>
              <div style={timelineStyles.header}>
                <span style={timelineStyles.year}>{edu.year}</span>
                <div style={timelineStyles.loc}>
                  <MapPin size={12} /> {edu.location}
                </div>
              </div>
              <h2 style={timelineStyles.inst}>{edu.institution}</h2>
              <div style={timelineStyles.degree}>
                {edu.icon}
                <span>{edu.degree} — <i style={{ opacity: 0.8 }}>{edu.spec}</i></span>
              </div>
              <p style={timelineStyles.desc}>{edu.description}</p>
              <div style={timelineStyles.tagCloud}>
                {edu.highlights.map((tag) => (
                  <span key={tag} className="skill-pill" style={timelineStyles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      <nav className="desktop-only" style={navStyles.bottomNav}>
        <button onClick={() => window.scrollTo(0, 0)} style={navStyles.navItem}>
          <GraduationCap size={18} />
          <span>Education</span>
        </button>
        <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.2)" }}></div>
        <button style={navStyles.navItem}>
          <Award size={18} />
          <span>Honors</span>
        </button>
      </nav>
    </div>
  );
};

const navStyles = {
  navbar: {
    position: "fixed",
    top: 0,
    width: "100%",
    background: Theme.NAV_BG,
    backdropFilter: "blur(10px)",
    borderBottom: `1px solid ${Theme.LINE}`,
    zIndex: 1000,
  },
  navContainer: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0.75rem 5%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none",
    color: Theme.TEXT_MAIN,
    fontWeight: 600,
  },
  brandText: { fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.2rem" },
  desktopNav: { display: "flex", gap: "1.5rem" },
  navLink: { display: "flex", alignItems: "center", gap: "6px" },
  menuToggle: { display: "none", background: "none", border: "none", cursor: "pointer", color: Theme.TEXT_MAIN },
  mobileMenu: {
    position: "absolute",
    top: "100%",
    left: 0,
    width: "100%",
    background: Theme.WHITE,
    padding: "1rem 5%",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
  },
  mobileLink: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    textDecoration: "none",
    padding: "1rem",
    fontSize: "0.9rem",
    fontWeight: 500,
    borderBottom: `1px solid ${Theme.LINE}`,
  },
  bottomNav: {
    position: "fixed",
    bottom: "2rem",
    left: "50%",
    transform: "translateX(-50%)",
    background: Theme.TEXT_MAIN,
    padding: "10px 24px",
    borderRadius: "100px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    zIndex: 900,
  },
  navItem: {
    background: "none",
    border: "none",
    color: Theme.WHITE,
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.7rem",
    cursor: "pointer",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
};

const heroStyles = {
  container: {
    minHeight: "70vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "120px 5% 60px",
  },
  content: { maxWidth: "800px", width: "100%" },
  badge: {
    textTransform: "uppercase",
    letterSpacing: "4px",
    fontSize: "0.7rem",
    color: Theme.ACCENT,
    fontWeight: 700,
    marginBottom: "1rem",
    display: "block",
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(2.8rem, 10vw, 5.5rem)",
    lineHeight: 1.1,
    marginBottom: "1.5rem",
  },
  subtitle: {
    fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
    lineHeight: 1.6,
    color: Theme.TEXT_MUTED,
    maxWidth: "500px",
    margin: "0 auto",
  },
};

const timelineStyles = {
  line: {
    position: "absolute",
    left: "50%",
    width: "1px",
    height: "100%",
    background: `linear-gradient(to bottom, transparent, ${Theme.LINE} 10%, ${Theme.LINE} 90%, transparent)`,
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    marginBottom: "6rem",
    width: "100%",
  },
  dot: {
    position: "absolute",
    left: "50%",
    top: "35px",
    width: "14px",
    height: "14px",
    background: Theme.ACCENT,
    borderRadius: "50%",
    transform: "translateX(-50%)",
    border: `3px solid ${Theme.BG}`,
    zIndex: 2,
  },
  card: {
    maxWidth: "650px",
    padding: "2.5rem",
    borderRadius: "4px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.2rem",
    flexWrap: "wrap",
    gap: "10px",
  },
  year: { color: Theme.ACCENT, fontWeight: 700, fontSize: "0.85rem", letterSpacing: "1px" },
  loc: { display: "flex", alignItems: "center", gap: "5px", fontSize: "0.75rem", color: Theme.TEXT_MUTED },
  inst: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.5rem, 4vw, 2rem)", marginBottom: "0.5rem" },
  degree: { display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem", marginBottom: "1.5rem", color: Theme.TEXT_MUTED },
  desc: { lineHeight: 1.7, fontSize: "0.95rem", marginBottom: "1.5rem", color: Theme.TEXT_MUTED },
  tagCloud: { display: "flex", gap: "8px", flexWrap: "wrap" },
  tag: { padding: "5px 12px", background: Theme.BG_SECONDARY, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "1px" },
};

const sectionStyles = {
  container: { position: "relative", padding: "4rem 5% 10rem" },
};

export default EducationPage;