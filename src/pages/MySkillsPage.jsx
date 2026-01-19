import React, { useState, useEffect } from "react";
import {
  Palette,
  TrendingUp,
  Sparkles,
  Target,
  Layers,
  Zap,
  Palette as ColorPaletteIcon,
  Home,
  User,
  Briefcase,
  FolderOpen,
  FileText,
  Mail,
  Menu,
  X,
  Code,
  GraduationCap,
} from "lucide-react";

const Theme = {
  BG: "#FCFAF5",
  PAPER: "#FFFFFF",
  CHARCOAL: "#1A1A18",
  DARK_CHARCOAL: "#121210",
  IVORY: "#F8F7F0",
  STONE: "#7E7E76",
  LIGHT_STONE: "rgba(126, 126, 118, 0.4)",
  SAGE: "#8C9E7A",
  LIGHT_SAGE: "rgba(140, 158, 122, 0.1)",
  CLAY: "#B8958D",
  LIGHT_CLAY: "rgba(184, 149, 141, 0.1)",
  BORDER: "rgba(26, 26, 24, 0.06)",
  SHADOW_SOFT: "0 4px 24px rgba(0, 0, 0, 0.03)",
  SHADOW_ELEVATED: "0 20px 60px rgba(0, 0, 0, 0.06)",
  ACCENT_GLOW: "0 0 40px rgba(140, 158, 122, 0.15)",
  NAV_BG: "rgba(252, 250, 245, 0.95)",
};

const GlobalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,900;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

html { scroll-behavior: smooth; font-size: 16px; }
body {
  background: ${Theme.BG};
  color: ${Theme.CHARCOAL};
  font-family: 'Montserrat', sans-serif;
  overflow-x: hidden;
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
  height: 1px;
  background: ${Theme.SAGE};
  transition: width 0.3s ease;
}

.nav-link:hover::after { width: 100%; }

@media (max-width: 1024px) {
  .desktop-nav { display: none !important; }
  .menu-toggle { display: block !important; }
}

@media (max-width: 768px) {
  .skills-grid { grid-template-columns: 1fr !important; }
  .hero-title { font-size: clamp(2.5rem, 10vw, 4rem) !important; }
  .nav-container { padding: 1rem 1.5rem !important; }
}
`;

const skillsData = [
  {
    id: 1,
    index: "01",
    title: "Design Knowledge",
    subtitle: "Core Fashion Expertise",
    icon: Palette,
    description: "A strong foundation in fashion design principles, combining technical accuracy with creative exploration.",
    expertise: [
      { name: "Surface Embellishment", level: 90 },
      { name: "Pattern Making", level: 92 },
      { name: "Trend Analysis", level: 88 },
      { name: "Material Exploration", level: 85 },
    ],
    color: Theme.SAGE,
    lightColor: Theme.LIGHT_SAGE,
  },
  {
    id: 2,
    index: "02",
    title: "Software Knowledge",
    subtitle: "Digital Design Tools",
    icon: ColorPaletteIcon,
    description: "Proficient in industry-relevant digital tools used for design development and visualization.",
    expertise: [
      { name: "Procreate", level: 90 },
      { name: "Adobe Illustrator", level: 88 },
      { name: "Microsoft Excel", level: 80 },
    ],
    color: Theme.CLAY,
    lightColor: Theme.LIGHT_CLAY,
  },
  {
    id: 3,
    index: "03",
    title: "Soft Skills",
    subtitle: "Professional Strengths",
    icon: Layers,
    description: "Strong collaborative and problem-solving abilities developed through academic projects.",
    expertise: [
      { name: "Team Communication", level: 92 },
      { name: "Problem Solving", level: 90 },
      { name: "Time Management", level: 85 },
    ],
    color: Theme.STONE,
    lightColor: "rgba(126, 126, 118, 0.1)",
  },
  {
    id: 4,
    index: "04",
    title: "Achievements",
    subtitle: "Awards & Recognition",
    icon: Target,
    description: "Recognized for creative excellence across institutional and national platforms.",
    expertise: [
      { name: "1st Prize – Face Painting", level: 100 },
      { name: "2nd Prize – Fashion Show", level: 95 },
    ],
    color: Theme.CHARCOAL,
    lightColor: "rgba(26, 26, 24, 0.08)",
  },
];

const SkillsPage = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("skills");

  const navItems = [
    { path: "#/main2", label: "Home", icon: <Home size={16} /> },
    { path: "#/about", label: "About", icon: <User size={16} /> },
    { path: "#/portfolio", label: "Portfolio", icon: <FolderOpen size={16} /> },
    { path: "#/work", label: "Experience", icon: <Briefcase size={16} /> },
    { path: "#/skills", label: "Skills", icon: <Code size={16} /> },
    { path: "#/education", label: "Education", icon: <GraduationCap size={16} /> },
    { path: "#/cv", label: "CV", icon: <FileText size={16} /> },
    { path: "#/contact", label: "Contact", icon: <Mail size={16} /> },
  ];

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <style>{GlobalStyles}</style>

      <nav style={navStyles.navbar}>
        <div className="nav-container" style={navStyles.container}>
          <div style={navStyles.brand}>
            <div style={navStyles.brandMark}>
              <Zap size={14} color={Theme.SAGE} />
              <span style={{ fontWeight: 600, fontSize: "0.85rem" }}>JV</span>
            </div>
            <span style={navStyles.brandTag}>Skills Matrix</span>
          </div>

          <div className="desktop-nav" style={navStyles.desktopNav}>
            {navItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className="nav-link"
                style={{
                  ...navStyles.link,
                  color: activeLink === item.label.toLowerCase() ? Theme.SAGE : Theme.CHARCOAL,
                }}
              >
                {item.icon}
                <span className="nav-text">{item.label}</span>
              </a>
            ))}
          </div>

          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={navStyles.menuToggle}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div style={navStyles.mobileMenu}>
            {navItems.map((item) => (
              <a key={item.path} href={item.path} style={navStyles.mobileLink}>
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        )}
      </nav>

      <header style={heroStyles.section}>
        <div style={heroStyles.content}>
          <div style={heroStyles.badge}>
            <Sparkles size={12} />
            <span>Editorial Expertise</span>
          </div>
          <h1 className="hero-title" style={heroStyles.title}>
            Design <br />
            <span style={{ fontStyle: "italic", fontWeight: 300, color: Theme.SAGE }}>Discipline.</span>
          </h1>
          <p style={heroStyles.subtitle}>
            A curated overview of skills that balance creative intuition with technical precision.
          </p>
        </div>
      </header>

      <main style={gridStyles.main}>
        <div className="skills-grid" style={gridStyles.grid}>
          {skillsData.map((skill) => (
            <div
              key={skill.id}
              style={{
                ...gridStyles.card,
                borderColor: activeCard === skill.id ? skill.color : Theme.BORDER,
                transform: activeCard === skill.id ? "translateY(-5px)" : "none",
                boxShadow: activeCard === skill.id ? Theme.SHADOW_ELEVATED : Theme.SHADOW_SOFT,
              }}
              onMouseEnter={() => setActiveCard(skill.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div style={{ ...gridStyles.cardNum, color: skill.color }}>{skill.index}</div>
              <div style={gridStyles.header}>
                <div style={{ ...gridStyles.iconBox, backgroundColor: skill.lightColor }}>
                  <skill.icon size={22} color={skill.color} />
                </div>
                <div>
                  <h3 style={gridStyles.skillTitle}>{skill.title}</h3>
                  <p style={gridStyles.skillSub}>{skill.subtitle}</p>
                </div>
              </div>

              <p style={gridStyles.desc}>{skill.description}</p>

              <div style={gridStyles.expertiseList}>
                {skill.expertise.map((item, idx) => (
                  <div key={idx} style={gridStyles.expItem}>
                    <div style={gridStyles.expInfo}>
                      <span>{item.name}</span>
                      <span>{item.level}%</span>
                    </div>
                    <div style={gridStyles.barBg}>
                      <div
                        style={{
                          ...gridStyles.barFill,
                          width: `${item.level}%`,
                          backgroundColor: skill.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer style={footerStyles.container}>
        <span style={{ letterSpacing: "1px" }}>Jiya Vegad © 2026</span>
      </footer >
    </div>
  );
};

const navStyles = {
  navbar: {
    position: "fixed",
    top: 0,
    width: "100%",
    backgroundColor: Theme.NAV_BG,
    backdropFilter: "blur(10px)",
    borderBottom: `1px solid ${Theme.BORDER}`,
    zIndex: 1000,
  },
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "1rem 5%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: { display: "flex", alignItems: "center", gap: "1rem" },
  brandMark: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    padding: "0.4rem 0.8rem",
    backgroundColor: Theme.LIGHT_SAGE,
    borderRadius: "8px",
  },
  brandTag: { fontSize: "0.7rem", color: Theme.STONE, textTransform: "uppercase", letterSpacing: "1px" },
  desktopNav: { display: "flex", gap: "1.5rem" },
  link: { display: "flex", alignItems: "center", gap: "6px", textDecoration: "none", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase" },
  menuToggle: { display: "none", background: "none", border: "none", cursor: "pointer" },
  mobileMenu: { position: "absolute", top: "100%", left: 0, width: "100%", backgroundColor: Theme.PAPER, padding: "1rem 5%", display: "flex", flexDirection: "column", gap: "1rem", boxShadow: "0 10px 20px rgba(0,0,0,0.05)" },
  mobileLink: { display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: Theme.CHARCOAL, fontSize: "0.9rem", fontWeight: 500, padding: "0.5rem 0" }
};

const heroStyles = {
  section: { padding: "140px 5% 60px", display: "flex", justifyContent: "center", textAlign: "center" },
  content: { maxWidth: "800px" },
  badge: { display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 1rem", backgroundColor: Theme.LIGHT_SAGE, borderRadius: "100px", color: Theme.SAGE, fontSize: "0.7rem", fontWeight: 600, marginBottom: "2rem" },
  title: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem, 8vw, 5.5rem)", lineHeight: 1.1, marginBottom: "1.5rem" },
  subtitle: { color: Theme.STONE, fontSize: "1.1rem", maxWidth: "500px", margin: "0 auto", lineHeight: 1.6 }
};

const gridStyles = {
  main: { padding: "0 5% 100px", maxWidth: "1400px", margin: "0 auto" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" },
  card: { backgroundColor: Theme.PAPER, padding: "2.5rem", borderRadius: "16px", border: "1px solid transparent", position: "relative", transition: "all 0.3s ease", display: "flex", flexDirection: "column" },
  cardNum: { position: "absolute", top: "1.5rem", right: "2.5rem", fontSize: "3rem", opacity: 0.1, fontFamily: "'Playfair Display', serif" },
  header: { display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" },
  iconBox: { width: "48px", height: "48px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" },
  skillTitle: { fontFamily: "'Playfair Display', serif", fontSize: "1.5rem" },
  skillSub: { fontSize: "0.8rem", color: Theme.STONE },
  desc: { fontSize: "0.9rem", color: Theme.STONE, lineHeight: 1.7, marginBottom: "2rem", flexGrow: 1 },
  expertiseList: { display: "flex", flexDirection: "column", gap: "1.2rem" },
  expItem: { display: "flex", flexDirection: "column", gap: "0.5rem" },
  expInfo: { display: "flex", justifyContent: "space-between", fontSize: "0.8rem", fontWeight: 500 },
  barBg: { height: "4px", backgroundColor: Theme.BORDER, borderRadius: "2px", overflow: "hidden" },
  barFill: { height: "100%", transition: "width 1s ease-in-out" }
};

const footerStyles = {
  container: { padding: "40px 5%", textAlign: "center", borderTop: `1px solid ${Theme.BORDER}`, color: Theme.STONE, fontSize: "0.7rem", fontWeight: 500, textTransform: "uppercase" }
};

export default SkillsPage;