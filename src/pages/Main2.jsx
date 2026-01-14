import React, { useState, useEffect } from "react";
import {
  Instagram,
  Linkedin,
  Mail,
  ChevronRight,
  X,
  Menu,
} from "lucide-react";

import profileImage from "../assets/profile3.png";

/* ---------- COLOR PALETTE ---------- */
const Colors = {
  BG: "#FDFCF8",
  TEXT_MAIN: "#1B2A2F",
  TEXT_MUTED: "#6C757D",
  TEXT_LIGHT: "#8A9EA6",
  ACCENT: "#D66E53",
  LINE: "rgba(27, 42, 47, 0.1)",
  WHITE: "#FFFFFF",
  DARK_BG: "#0F1A1E",
};

/* ---------- VIEWPORT HOOK ---------- */
const useViewport = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const onResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return size;
};

/* ---------- GLOBAL STYLES ---------- */
const GlobalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

body {
  margin: 0;
  background: ${Colors.BG};
  overflow: hidden;
}

.reveal {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.9s ease forwards;
}

.reveal-delay-1 { animation-delay: 0.2s; }
.reveal-delay-2 { animation-delay: 0.4s; }
.reveal-delay-3 { animation-delay: 0.6s; }

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.nav-item {
  position: relative;
  transition: transform 0.3s ease;
}

.nav-item:hover {
  transform: translateX(10px);
}

.nav-item::before {
  content: "";
  position: absolute;
  left: -20px;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  background: ${Colors.ACCENT};
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nav-item:hover::before {
  opacity: 1;
}

.slide-in-right {
  animation: slideInRight 1s cubic-bezier(0.77, 0, 0.175, 1) forwards;
}

@keyframes slideInRight {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
`;

/* ---------- COMPONENT ---------- */
export default function ElegantPortfolio() {
  const { width } = useViewport();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;
  const screen = isMobile ? "mobile" : isTablet ? "tablet" : "desktop";

  const [isOpen, setIsOpen] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoad(false), 500);
    return () => clearTimeout(timer);
  }, []);

  /* ---------- STYLES ---------- */
  const Styles = {
    Container: {
      minHeight: "100svh",
      width: "100%",
      position: "relative",
      fontFamily: "'Montserrat', sans-serif",
      color: Colors.TEXT_MAIN,
      overflow: "hidden",
      background: isOpen ? Colors.BG : Colors.DARK_BG,
      transition: "background 0.8s cubic-bezier(0.77,0,0.175,1)",
    },

    LeftPanel: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: isOpen ? (screen === "desktop" ? "50%" : "100%") : "100%",
      maxWidth: isOpen && screen === "desktop" ? "720px" : "100%",
      padding: isOpen
        ? screen === "mobile"
          ? "2rem"
          : "clamp(2.5rem, 5vw, 5rem)"
        : "clamp(1.5rem, 4vw, 3rem)",
      background: isOpen ? Colors.BG : "transparent",
      zIndex: 20,
      display: "flex",
      flexDirection: "column",
      justifyContent: isOpen ? "space-between" : "center",
      transition: "all 1s cubic-bezier(0.77,0,0.175,1)",
    },

    HeroText: {
      position: "relative",
      marginBottom: isOpen ? 0 : "4rem", // ✅ increased space below name
    },

    NamePreReveal: {
      fontFamily: "'Playfair Display', serif",
      fontSize: "clamp(3rem, 10vw, 8rem)",
      lineHeight: 0.9,
      fontWeight: 700,
      margin: 0,
    },

    NameJiya: {
      color: Colors.WHITE,
      display: "block",
    },

    NameVegad: {
      color: Colors.TEXT_LIGHT,
      display: "block",
      marginLeft: isDesktop ? "4rem" : "2rem",
    },

    NameRevealed: {
      fontFamily: "'Playfair Display', serif",
      fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
      lineHeight: 1.05,
      fontWeight: 600,
      color: Colors.TEXT_MAIN,
    },

    Subtitle: {
      letterSpacing: "4px",
      textTransform: "uppercase",
      fontSize: "0.8rem",
      color: isOpen ? Colors.ACCENT : Colors.TEXT_LIGHT,
      marginTop: "1.5rem",   // ✅ spacing from name
      marginBottom: "2.5rem",
      opacity: isOpen ? 1 : 0.7,
      transition: "all 0.8s ease",
    },

    BodyText: {
      maxWidth: "420px",
      fontSize: "clamp(0.95rem, 2.5vw, 1rem)",
      lineHeight: 1.8,
      color: Colors.TEXT_MUTED,
      borderLeft: `2px solid ${Colors.ACCENT}`,
      paddingLeft: "1.5rem",
      marginBottom: "3rem",
    },

    NavMenu: {
      display: "flex",
      flexDirection: "column",
      gap: "clamp(1rem, 2vw, 1.5rem)",
      marginTop: "auto",
    },

    NavLink: {
      fontFamily: "'Playfair Display', serif",
      fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
      color: Colors.TEXT_MAIN,
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0.5rem 0",
      borderBottom: `1px solid ${Colors.LINE}`,
    },

    NavLabel: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },

    NavNum: {
      fontSize: "0.9rem",
      color: Colors.ACCENT,
      fontWeight: 500,
      minWidth: "30px",
    },

    Socials: {
      display: "flex",
      gap: "1.5rem",
      marginTop: "2rem",
      paddingTop: "1.5rem",
      borderTop: `1px solid ${Colors.LINE}`,
    },

    SocialIcon: {
      color: Colors.TEXT_MUTED,
      cursor: "pointer",
      transition: "color 0.3s ease",
    },

    RightPanel: {
      position: "absolute",
      right: 0,
      top: 0,
      bottom: 0,
      width: isOpen && screen === "desktop" ? "50%" : "0%",
      overflow: "hidden",
      transition: "width 1s cubic-bezier(0.77,0,0.175,1)",
    },

    ImageContainer: {
      width: "100%",
      height: "100%",
      opacity: isOpen ? 1 : 0,
      transition: "opacity 0.8s ease 0.3s",
    },

    HeroImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transform: isOpen ? "scale(1)" : "scale(1.1)",
      transition: "transform 1.2s cubic-bezier(0.77,0,0.175,1)",
    },

    Toggle: {
      position: "absolute",
      top: isOpen ? "2.5rem" : "50%",
      right: isOpen ? "calc(50% - 25px)" : "50%",
      transform: "translate(50%, -50%)",
      width: "56px",
      height: "56px",
      borderRadius: "50%",
      background: isOpen ? Colors.ACCENT : Colors.WHITE,
      border: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 50,
      cursor: "pointer",
      boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
      transition: "all 0.8s cubic-bezier(0.77,0,0.175,1)",
    },

    MenuButton: {
      position: "absolute",
      top: "2rem",
      right: "2rem",
      background: "none",
      border: "none",
      color: Colors.WHITE,
      cursor: "pointer",
      zIndex: 30,
      display: isMobile && !isOpen ? "block" : "none",
    },
  };

  return (
    <div style={Styles.Container}>
      <style>{GlobalStyles}</style>

      {!isOpen && isMobile && (
        <button style={Styles.MenuButton} onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </button>
      )}

      <div style={Styles.LeftPanel} className={isOpen && !isInitialLoad ? "slide-in-right" : ""}>
        {isOpen ? (
          <>
            <div>
              <h1 style={Styles.NameRevealed} className="reveal">
                Jiya Vegad.
              </h1>
              <div style={Styles.Subtitle} className="reveal reveal-delay-1">
                Fashion Designer · 2025
              </div>
              <p style={Styles.BodyText} className="reveal reveal-delay-2">
                Merging artisanal craft with digital innovation. Exploring
                structure, emotion, and modern silhouettes through sustainable
                design practices.
              </p>
            </div>

            <nav style={Styles.NavMenu}>
              {[
                ["01", "Portfolio", "#/portfolio"],
                ["02", "Experience", "#/work"],
                ["03", "About", "#/about"],
                ["04", "Contact", "#/contact"],
              ].map(([num, label, link]) => (
                <a
                  key={label}
                  href={link}
                  className="nav-item reveal"
                  style={Styles.NavLink}
                >
                  <div style={Styles.NavLabel}>
                    <span style={Styles.NavNum}>{num}</span>
                    <span>{label}</span>
                  </div>
                  <ChevronRight size={20} color={Colors.TEXT_MUTED} />
                </a>
              ))}
            </nav>


            <div style={Styles.Socials} className="reveal reveal-delay-3">
              <Instagram size={20} style={Styles.SocialIcon} />
              <Linkedin size={20} style={Styles.SocialIcon} />
              <Mail size={20} style={Styles.SocialIcon} />
            </div>
          </>
        ) : (
          <div style={Styles.HeroText}>
            <h1 style={Styles.NamePreReveal}>
              <span style={Styles.NameJiya}>Jiya</span>
              <span style={Styles.NameVegad}>Vegad</span>
            </h1>
            <div style={Styles.Subtitle}>Fashion Design Portfolio 2025</div>
          </div>
        )}
      </div>

      <div style={Styles.RightPanel}>
        <div style={Styles.ImageContainer}>
          <img src={profileImage} alt="Jiya Vegad" style={Styles.HeroImage} />
        </div>
      </div>

      <button style={Styles.Toggle} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={28} color={Colors.WHITE} /> : <ChevronRight size={28} />}
      </button>
    </div>
  );
}
