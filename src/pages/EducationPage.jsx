import React, { useState, useEffect } from "react";
import {
  Award,
  GraduationCap,
  MapPin,
  Sparkles,
  ArrowLeft,
  Target,
  Layers,
  MousePointer2,
} from "lucide-react";
import { Link } from "react-router-dom";

// 🎨 DESIGN SYSTEM
const Theme = {
  BG: "#FDFCF8",
  BG_SECONDARY: "#F7F5F0",
  TEXT_MAIN: "#1B2A2F",
  TEXT_MUTED: "#7A868A",
  ACCENT: "#D66E53",
  ACCENT_SOFT: "rgba(214, 110, 83, 0.12)",
  LINE: "rgba(27, 42, 47, 0.08)",
  WHITE: "#FFFFFF",
};

const GlobalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,900;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

html { scroll-behavior: smooth; }
body {
  background: ${Theme.BG};
  color: ${Theme.TEXT_MAIN};
  font-family: 'Montserrat', sans-serif;
}

.edu-card {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid ${Theme.LINE};
  background: ${Theme.WHITE};
}

.edu-card:hover {
  transform: translateY(-10px);
  border-color: ${Theme.ACCENT};
  box-shadow: 0 30px 60px rgba(214, 110, 83, 0.08);
}

.skill-pill {
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.skill-pill:hover {
  background: ${Theme.WHITE};
  border-color: ${Theme.ACCENT};
  transform: scale(1.05);
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.floating { animation: float 4s ease-in-out infinite; }
`;

const EducationPage = () => {
  const educationData = [
    {
      year: "2021 – 2025",
      institution: "Footwear Design & Development Institute",
      degree: "Bachelor of Design",
      spec: "Fashion Technology",
      location: "Kolkata, WB",
      description:
        "Merging industrial precision with avant-garde aesthetics. Focusing on the future of footwear through sustainable material research and 3D prototyping.",
      icon: <Layers size={22} />,
      highlights: [
        "Sustainable Design",
        "Digital Patterning",
        "Material Innovation",
      ],
    },
    {
      year: "2019 – 2021",
      institution: "S.J. DAV Public School",
      degree: "Higher Secondary",
      spec: "Science Stream",
      location: "Chaibasa, JHK",
      description:
        "A foundation built on physics and geometry. This period defined my analytical approach to structural design and spatial composition.",
      icon: <Target size={22} />,
      highlights: [
        "Advanced Mathematics",
        "Structural Physics",
        "Visual Arts",
      ],
    },
  ];

  return (
    <div style={{ backgroundColor: Theme.BG, overflowX: "hidden" }}>
      <style>{GlobalStyles}</style>

      {/* BACK NAV */}
      <Link to="/main2" style={navStyles.backBtn}>
        <ArrowLeft size={20} />
      </Link>

      {/* HERO */}
      <section style={heroStyles.container}>
        <div style={heroStyles.content}>
          <span style={heroStyles.badge}>Academic Portfolio</span>
          <h1 style={heroStyles.title}>
            Intellectual <br />
            <span style={{ fontStyle: "italic", fontWeight: 400 }}>
              Curriculum
            </span>
          </h1>
          <p style={heroStyles.subtitle}>
            A journey of discipline and creative evolution. Mapping the
            milestones of my formal training and technical mastery.
          </p>
          <div
            className="floating"
            style={{ marginTop: "3rem", color: Theme.ACCENT }}
          >
            <MousePointer2 size={32} strokeWidth={1} />
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section style={sectionStyles.container}>
        <div style={timelineStyles.line}></div>

        {educationData.map((edu, idx) => (
          <div key={idx} style={timelineStyles.wrapper}>
            <div style={timelineStyles.dot}></div>

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
                <span>
                  {edu.degree} — <i>{edu.spec}</i>
                </span>
              </div>

              <p style={timelineStyles.desc}>{edu.description}</p>

              <div style={timelineStyles.tagCloud}>
                {edu.highlights.map((tag) => (
                  <span
                    key={tag}
                    className="skill-pill"
                    style={timelineStyles.tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* SKILLS */}
      <section
        style={{ padding: "6rem 10%", background: Theme.BG_SECONDARY }}
      >
        <h3 style={sectionStyles.title}>Core Proficiencies</h3>

        <div style={skillStyles.grid}>
          {[
            "3D Modeling",
            "Pattern Engineering",
            "Sustainable Systems",
            "Textile Science",
          ].map((skill) => (
            <div key={skill} style={skillStyles.item}>
              <Sparkles size={18} style={{ color: Theme.ACCENT }} />
              <span style={{ fontWeight: 500, letterSpacing: "1px" }}>
                {skill}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* FLOAT NAV */}
      <nav style={navStyles.bottomNav}>
        <button onClick={() => window.scrollTo(0, 0)} style={navStyles.navItem}>
          <GraduationCap size={18} />
          <span>Education</span>
        </button>

        <div
          style={{ width: "1px", height: "20px", background: Theme.LINE }}
        ></div>

        <button style={navStyles.navItem}>
          <Award size={18} />
          <span>Honors</span>
        </button>
      </nav>
    </div>
  );
};

/* ---------------- STYLES ---------------- */

const heroStyles = {
  container: {
    height: "90vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "0 1.5rem",
  },
  content: { maxWidth: "800px" },
  badge: {
    textTransform: "uppercase",
    letterSpacing: "5px",
    fontSize: "0.75rem",
    color: Theme.ACCENT,
    fontWeight: 600,
    marginBottom: "1.5rem",
    display: "block",
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(3rem, 10vw, 6rem)",
    lineHeight: 1,
    marginBottom: "2rem",
  },
  subtitle: {
    fontSize: "1.1rem",
    lineHeight: 1.8,
    color: Theme.TEXT_MUTED,
    fontWeight: 300,
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
    background: `linear-gradient(${Theme.BG}, ${Theme.LINE}, ${Theme.BG})`,
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    marginBottom: "8rem",
  },
  dot: {
    position: "absolute",
    left: "50%",
    top: "40px",
    width: "12px",
    height: "12px",
    background: Theme.ACCENT,
    borderRadius: "50%",
    transform: "translateX(-50%)",
    border: `4px solid ${Theme.BG}`,
  },
  card: {
    maxWidth: "600px",
    padding: "3rem",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
  },
  year: {
    color: Theme.ACCENT,
    fontWeight: 600,
    fontSize: "0.8rem",
    letterSpacing: "2px",
  },
  loc: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "0.75rem",
    color: Theme.TEXT_MUTED,
  },
  inst: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "2rem",
    marginBottom: "0.5rem",
  },
  degree: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "0.9rem",
    marginBottom: "2rem",
    color: Theme.TEXT_MUTED,
  },
  desc: {
    lineHeight: 1.8,
    fontSize: "0.95rem",
    marginBottom: "2rem",
    color: Theme.TEXT_MUTED,
  },
  tagCloud: { display: "flex", gap: "10px", flexWrap: "wrap" },
  tag: {
    padding: "6px 12px",
    background: Theme.BG_SECONDARY,
    fontSize: "0.7rem",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
};

const skillStyles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "2rem",
    marginTop: "3rem",
  },
  item: {
    padding: "2rem",
    border: `1px solid ${Theme.LINE}`,
    textAlign: "center",
  },
};

const sectionStyles = {
  container: { position: "relative", padding: "10vh 1.5rem" },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "2.5rem",
    textAlign: "center",
  },
};

const navStyles = {
  backBtn: {
    position: "fixed",
    top: "2rem",
    left: "2rem",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: Theme.WHITE,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    color: Theme.TEXT_MAIN,
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    zIndex: 100,
  },
  bottomNav: {
    position: "fixed",
    bottom: "2rem",
    left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(27, 42, 47, 0.95)",
    padding: "12px 24px",
    borderRadius: "100px",
    display: "flex",
    gap: "20px",
    zIndex: 1000,
    backdropFilter: "blur(10px)",
  },
  navItem: {
    background: "none",
    border: "none",
    color: "white",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.75rem",
    cursor: "pointer",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
};

export default EducationPage;
