import React, { useState, useEffect } from "react";
import {
  Scissors,
  Paintbrush,
  Palette,
  TrendingUp,
  ArrowLeft,
  Sparkles,
  Target,
  Layers,
  Camera,
  Ruler,
  Zap,
  Palette as ColorPaletteIcon,
} from "lucide-react";

/**
 * REFINED SOPHISTICATED THEME SYSTEM
 */
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
};

/**
 * SKILLS DATA (UNCHANGED CONTENT)
 */
const skillsData = [
  {
    id: 1,
    index: "01",
    title: "Design Knowledge",
    subtitle: "Core Fashion Expertise",
    icon: Palette,
    description:
      "A strong foundation in fashion design principles, combining technical accuracy with creative exploration and contemporary relevance.",
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
    description:
      "Proficient in industry-relevant digital tools used for design development, visualization, and workflow organization.",
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
    subtitle: "Professional & Interpersonal Strengths",
    icon: Layers,
    description:
      "Strong collaborative and problem-solving abilities developed through academic projects and real-world industry exposure.",
    expertise: [
      { name: "Team Communication", level: 92 },
      { name: "Problem Solving", level: 90 },
      { name: "Time Management", level: 85 },
      { name: "Adaptability", level: 88 },
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
    description:
      "Recognized for creative excellence and competitive performance across institutional and national platforms.",
    expertise: [
      { name: "1st Prize – Face Painting (FDDI)", level: 100 },
      { name: "2nd Prize – Fashion Show (NIFT Spectrum, 2023)", level: 95 },
      { name: "2nd Prize – National Gujarati Drawing Competition", level: 90 },
    ],
    color: Theme.CHARCOAL,
    lightColor: "rgba(26, 26, 24, 0.08)",
  },
];

const SkillsPage = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      setScrollProgress((scrolled / maxScroll) * 100);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div style={styles.container}>
      {/* Subtle gradient background */}
      <div style={{
        position: "fixed",
        inset: 0,
        background: `linear-gradient(135deg, ${Theme.BG} 0%, ${Theme.IVORY} 100%)`,
        zIndex: -2,
      }} />
      
      {/* Animated grid overlay */}
      <div style={{
        position: "fixed",
        inset: 0,
        backgroundImage: `linear-gradient(${Theme.BORDER} 1px, transparent 1px),
                         linear-gradient(90deg, ${Theme.BORDER} 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        opacity: 0.2,
        zIndex: -1,
        transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
        transition: "transform 0.3s ease-out",
      }} />

      {/* Progress bar */}
      <div style={styles.progressBar}>
        <div
          style={{
            ...styles.progressFill,
            width: `${scrollProgress}%`,
            boxShadow: Theme.ACCENT_GLOW,
          }}
        />
      </div>

      {/* Navigation */}
      <nav style={styles.navigation}>
        <div style={styles.navLeft}>
          <div style={styles.brandMark}>
            <Zap size={14} color={Theme.SAGE} />
            <span style={styles.brandText}>JV</span>
          </div>
          <div style={styles.navDivider} />
          <span style={styles.navTag}>Skills Matrix</span>
        </div>
        <button
          style={{
            ...styles.backButton,
            transform: activeCard === null ? "translateX(0)" : "translateX(-4px)",
          }}
          onClick={() => (window.location.href = "#/main2")}
        >
          <ArrowLeft size={16} />
          <span>Return</span>
        </button>
      </nav>

      {/* Hero Section */}
      <header style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>
            <Sparkles size={12} color={Theme.SAGE} />
            <span>Editorial Expertise</span>
          </div>
          <h1 style={styles.heroTitle}>
            Design
            <br />
            <span style={styles.heroTitleItalic}>Discipline.</span>
          </h1>
          <p style={styles.heroSubtitle}>
            A curated overview of skills that balance creative intuition with
            technical precision.
          </p>
        </div>
      </header>

      {/* Skills Grid */}
      <main style={styles.main}>
        <div style={styles.skillsGrid}>
          {skillsData.map((skill) => (
            <div
              key={skill.id}
              style={{
                ...styles.skillCard,
                transform: activeCard === skill.id ? "translateY(-8px)" : "translateY(0)",
                boxShadow: activeCard === skill.id ? Theme.SHADOW_ELEVATED : Theme.SHADOW_SOFT,
                borderColor: activeCard === skill.id ? skill.color : Theme.BORDER,
              }}
              onMouseEnter={() => setActiveCard(skill.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Card accent */}
              <div style={{
                ...styles.cardAccent,
                background: `linear-gradient(90deg, ${skill.color}00 0%, ${skill.color}30 100%)`,
                opacity: activeCard === skill.id ? 1 : 0,
              }} />

              {/* Card number */}
              <div style={{
                ...styles.cardNumber,
                color: activeCard === skill.id ? skill.color : Theme.LIGHT_STONE,
              }}>
                {skill.index}
              </div>

              {/* Card header */}
              <div style={styles.cardHeader}>
                <div
                  style={{
                    ...styles.iconBackground,
                    backgroundColor: activeCard === skill.id ? skill.color : skill.lightColor,
                    transform: activeCard === skill.id ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  <skill.icon 
                    size={24} 
                    color={activeCard === skill.id ? Theme.PAPER : skill.color} 
                  />
                </div>
                <div>
                  <h3 style={styles.skillTitle}>{skill.title}</h3>
                  <p style={styles.skillSubtitle}>{skill.subtitle}</p>
                </div>
              </div>

              {/* Description */}
              <p style={styles.cardDescription}>{skill.description}</p>

              {/* Expertise section */}
              <div style={styles.expertiseSection}>
                {skill.expertise.map((item, idx) => (
                  <div key={idx} style={styles.expertiseItem}>
                    <div style={styles.expertiseHeader}>
                      <span style={styles.expertiseName}>{item.name}</span>
                      <span style={{
                        ...styles.expertiseLevel,
                        color: activeCard === skill.id ? skill.color : Theme.STONE,
                      }}>
                        {item.level}%
                      </span>
                    </div>
                    <div style={styles.progressContainer}>
                      <div
                        style={{
                          ...styles.progressBarInner,
                          width: `${item.level}%`,
                          backgroundColor: skill.color,
                          boxShadow: activeCard === skill.id ? `0 0 12px ${skill.color}40` : "none",
                          transform: activeCard === skill.id ? "scaleY(1.2)" : "scaleY(1)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Subtle indicator line */}
              <div style={styles.indicatorLine}>
                <div
                  style={{
                    ...styles.indicatorFill,
                    width: activeCard === skill.id ? "100%" : "0%",
                    backgroundColor: skill.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <span style={styles.footerText}>Jiya Vegad © 2025</span>
          <div style={styles.footerDivider} />
          <span style={styles.footerText}>Skills Matrix v1.0</span>
        </div>
      </footer>
    </div>
  );
};

/* REFINED STYLES OBJECT */
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "transparent",
    position: "relative",
    overflowX: "hidden",
  },

  progressBar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "2px",
    backgroundColor: Theme.BORDER,
    zIndex: 100,
  },

  progressFill: {
    height: "100%",
    backgroundColor: Theme.SAGE,
    transition: "width 0.2s ease-out",
  },

  navigation: {
    position: "fixed",
    top: 0,
    width: "100%",
    padding: "1.75rem 3rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backdropFilter: "blur(12px)",
    backgroundColor: "rgba(252, 250, 245, 0.85)",
    borderBottom: `1px solid ${Theme.BORDER}`,
    zIndex: 50,
  },

  navLeft: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },

  brandMark: {
    display: "flex",
    alignItems: "center",
    gap: "0.375rem",
    padding: "0.5rem 0.75rem",
    backgroundColor: Theme.LIGHT_SAGE,
    borderRadius: "12px",
    border: `1px solid ${Theme.BORDER}`,
  },

  brandText: {
    fontWeight: 600,
    fontSize: "0.875rem",
    letterSpacing: "0.5px",
    color: Theme.CHARCOAL,
  },

  navDivider: {
    width: "1px",
    height: "16px",
    backgroundColor: Theme.BORDER,
  },

  navTag: {
    fontSize: "0.75rem",
    color: Theme.STONE,
    letterSpacing: "0.5px",
    fontWeight: 500,
  },

  backButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    background: "none",
    border: `1px solid ${Theme.BORDER}`,
    padding: "0.625rem 1.25rem",
    borderRadius: "100px",
    cursor: "pointer",
    color: Theme.CHARCOAL,
    fontSize: "0.875rem",
    fontWeight: 500,
    transition: "all 0.3s ease",
  },

  hero: {
    padding: "12rem 3rem 6rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },

  heroContent: {
    maxWidth: "600px",
  },

  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem 1rem",
    backgroundColor: Theme.LIGHT_SAGE,
    border: `1px solid ${Theme.BORDER}`,
    borderRadius: "100px",
    marginBottom: "2.5rem",
    fontSize: "0.75rem",
    fontWeight: 500,
    color: Theme.SAGE,
    letterSpacing: "0.5px",
  },

  heroTitle: {
    fontSize: "clamp(3.5rem, 8vw, 6rem)",
    fontFamily: "'Playfair Display', serif",
    fontWeight: 400,
    lineHeight: 1.1,
    marginBottom: "1.5rem",
    color: Theme.CHARCOAL,
    letterSpacing: "-0.02em",
  },

  heroTitleItalic: {
    fontStyle: "italic",
    fontWeight: 300,
    color: Theme.SAGE,
  },

  heroSubtitle: {
    color: Theme.STONE,
    fontSize: "1.125rem",
    lineHeight: 1.6,
    maxWidth: "500px",
    fontWeight: 400,
  },

  main: {
    padding: "0 3rem 8rem",
    maxWidth: "1400px",
    margin: "0 auto",
  },

  skillsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "2rem",
    alignItems: "start",
  },

  skillCard: {
    backgroundColor: Theme.PAPER,
    padding: "2.5rem",
    border: `1px solid ${Theme.BORDER}`,
    borderRadius: "20px",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    height: "100%",
    minHeight: "480px",
  },

  cardAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "120px",
    transition: "opacity 0.4s ease",
  },

  cardNumber: {
    position: "absolute",
    top: "2rem",
    right: "2rem",
    fontSize: "4rem",
    fontFamily: "'Playfair Display', serif",
    fontWeight: 300,
    lineHeight: 1,
    opacity: 0.15,
    transition: "all 0.4s ease",
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "1.25rem",
    marginBottom: "2rem",
  },

  iconBackground: {
    width: "56px",
    height: "56px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    flexShrink: 0,
  },

  skillTitle: {
    fontSize: "1.75rem",
    fontFamily: "'Playfair Display', serif",
    fontWeight: 500,
    color: Theme.CHARCOAL,
    marginBottom: "0.25rem",
    lineHeight: 1.2,
  },

  skillSubtitle: {
    fontSize: "0.875rem",
    color: Theme.STONE,
    fontWeight: 500,
    letterSpacing: "0.5px",
  },

  cardDescription: {
    marginBottom: "3rem",
    color: Theme.STONE,
    lineHeight: 1.7,
    fontSize: "0.95rem",
  },

  expertiseSection: {
    marginTop: "auto",
  },

  expertiseItem: {
    marginBottom: "1.5rem",
  },

  expertiseHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.5rem",
  },

  expertiseName: {
    fontSize: "0.875rem",
    fontWeight: 500,
    color: Theme.CHARCOAL,
  },

  expertiseLevel: {
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.5px",
    transition: "color 0.3s ease",
  },

  progressContainer: {
    height: "4px",
    backgroundColor: Theme.BORDER,
    borderRadius: "2px",
    overflow: "hidden",
  },

  progressBarInner: {
    height: "100%",
    borderRadius: "2px",
    transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
  },

  indicatorLine: {
    position: "absolute",
    bottom: 0,
    left: "2.5rem",
    right: "2.5rem",
    height: "1px",
    backgroundColor: Theme.BORDER,
  },

  indicatorFill: {
    height: "100%",
    transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
  },

  footer: {
    padding: "2rem 3rem",
    borderTop: `1px solid ${Theme.BORDER}`,
    backgroundColor: Theme.PAPER,
  },

  footerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    fontSize: "0.75rem",
    color: Theme.STONE,
  },

  footerDivider: {
    width: "4px",
    height: "4px",
    borderRadius: "50%",
    backgroundColor: Theme.BORDER,
  },

  footerText: {
    fontWeight: 500,
    letterSpacing: "0.5px",
  },
};

export default SkillsPage;