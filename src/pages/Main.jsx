import React, { useState, useEffect, useCallback } from "react";
import {
  Instagram,
  Linkedin,
  Mail,
  ChevronRight,
  X,
  Menu,
} from "lucide-react";

import EntryAnimation from "../components/EntryAnimation";
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

/* ---------- VIEWPORT HOOK WITH DEBOUNCE ---------- */
const useViewport = () => {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
    zoomLevel: typeof window !== 'undefined' ? window.devicePixelRatio : 1,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId;
    const onResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSize({ 
          width: window.innerWidth, 
          height: window.innerHeight,
          zoomLevel: window.devicePixelRatio 
        });
      }, 100);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return size;
};

/* ---------- USE RESPONSIVE HOOK ---------- */
const useResponsive = () => {
  const { width, zoomLevel } = useViewport();
  
  // Adjust breakpoints based on zoom level
  const getAdjustedBreakpoint = (baseBreakpoint) => {
    return baseBreakpoint / zoomLevel;
  };

  const isMobile = width < getAdjustedBreakpoint(640);
  const isTablet = width >= getAdjustedBreakpoint(640) && width < getAdjustedBreakpoint(1024);
  const isDesktop = width >= getAdjustedBreakpoint(1024);
  const isLargeDesktop = width >= getAdjustedBreakpoint(1440);
  
  // For extra small devices
  const isExtraSmall = width < getAdjustedBreakpoint(400);
  // For landscape orientation
  const isLandscape = typeof window !== 'undefined' ? window.innerWidth > window.innerHeight : false;
  
  const screen = isMobile ? "mobile" : isTablet ? "tablet" : "desktop";
  
  return {
    width,
    zoomLevel,
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isExtraSmall,
    isLandscape,
    screen
  };
};

/* ---------- GLOBAL STYLES ---------- */
const GlobalStyles = (isExtraSmall) => `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Montserrat:wght@300;400;500;600&display=swap');

* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

body {
  margin: 0;
  background: ${Colors.BG};
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

html {
  font-size: ${isExtraSmall ? '14px' : '16px'};
}

@media (min-resolution: 2dppx) {
  html {
    font-size: ${isExtraSmall ? '15px' : '17px'};
  }
}

@media (max-width: 400px) {
  html {
    font-size: 14px;
  }
}

@media (min-width: 2000px) {
  html {
    font-size: 18px;
  }
}

.reveal {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.9s ease forwards;
}

.reveal-delay-1 {
  animation-delay: 0.2s;
}

.reveal-delay-2 {
  animation-delay: 0.4s;
}

.reveal-delay-3 {
  animation-delay: 0.6s;
}

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

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  .nav-item:hover {
    transform: none;
  }
  
  .nav-item:hover::before {
    opacity: 0;
  }
  
  button, a {
    min-height: 44px;
    min-width: 44px;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  body {
    --text-main: #000000;
    --accent: #B33A1A;
  }
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .reveal,
  .slide-in-right,
  .nav-item,
  button {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;

/* ---------- COMPONENT ---------- */
const ElegantPortfolio = () => {
  const { 
    isMobile, 
    isTablet, 
    isDesktop, 
    isLargeDesktop,
    isExtraSmall,
    isLandscape,
    screen,
    width,
    zoomLevel
  } = useResponsive();

  const [isOpen, setIsOpen] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Handle click outside on mobile to close menu
  const handleBackdropClick = useCallback((e) => {
    if (isMobile && isOpen && e.target.id === 'mobile-backdrop') {
      setIsOpen(false);
    }
  }, [isMobile, isOpen]);

  // Dynamic font sizes based on screen width and zoom
  const getResponsiveValue = (mobile, tablet, desktop, largeDesktop = desktop) => {
    if (isMobile) return mobile;
    if (isTablet) return tablet;
    if (isLargeDesktop) return largeDesktop;
    return desktop;
  };

  /* ---------- STYLES ---------- */
  const Styles = {
    Container: {
      minHeight: "100svh",
      minHeight: "100vh",
      width: "100vw",
      maxWidth: "100vw",
      position: "relative",
      fontFamily: "'Montserrat', sans-serif",
      color: Colors.TEXT_MAIN,
      overflowX: "hidden",
      overflowY: isOpen ? "auto" : "hidden",
      background: isOpen ? Colors.BG : Colors.DARK_BG,
      transition: "background 0.8s cubic-bezier(0.77,0,0.175,1)",
      WebkitOverflowScrolling: 'touch',
    },

    // Left Panel (Content Panel)
    LeftPanel: {
      position: isMobile && isOpen ? "relative" : "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: isOpen 
        ? (screen === "desktop" || isLandscape) 
          ? getResponsiveValue("100%", "50%", "50%", "45%")
          : "100%"
        : "100%",
      maxWidth: isOpen ? "100%" : "100%",
      padding: isOpen
        ? getResponsiveValue(
            isExtraSmall ? "1.5rem" : "2rem",
            "clamp(2rem, 4vw, 4rem)",
            "clamp(2.5rem, 5vw, 5rem)",
            "clamp(3rem, 6vw, 6rem)"
          )
        : getResponsiveValue(
            "1.5rem",
            "clamp(1.5rem, 3vw, 3rem)",
            "clamp(2rem, 4vw, 4rem)"
          ),
      background: isOpen ? Colors.BG : "transparent",
      zIndex: 20,
      display: "flex",
      flexDirection: "column",
      justifyContent: isOpen ? "space-between" : "center",
      transition: "all 1s cubic-bezier(0.77,0,0.175,1)",
      overflowY: isMobile && isOpen ? "auto" : "visible",
    },

    HeroText: {
      position: "relative",
      marginBottom: isOpen ? 0 : getResponsiveValue("3rem", "4rem", "4rem"),
    },

    NamePreReveal: {
      fontFamily: "'Playfair Display', serif",
      fontSize: getResponsiveValue(
        isExtraSmall ? "2.5rem" : "clamp(2.8rem, 12vw, 5rem)",
        "clamp(4rem, 12vw, 6rem)",
        "clamp(5rem, 10vw, 8rem)",
        "clamp(6rem, 12vw, 10rem)"
      ),
      lineHeight: 0.9,
      fontWeight: 700,
      margin: 0,
      transition: "all 0.8s cubic-bezier(0.77,0,0.175,1)",
      wordBreak: "break-word",
      overflowWrap: "break-word",
    },

    NameJiya: {
      color: Colors.WHITE,
      display: "block",
    },

    NameVegad: {
      color: Colors.TEXT_LIGHT,
      display: "block",
      marginTop:"1.5rem",
      marginLeft: getResponsiveValue(
        isExtraSmall ? "1rem" : "1.5rem",
        "3rem",
        "4rem",
        "6rem"
      ),
    },

    NameRevealed: {
      fontFamily: "'Playfair Display', serif",
      fontSize: getResponsiveValue(
        isExtraSmall ? "2rem" : "clamp(2rem, 8vw, 3rem)",
        "clamp(2.5rem, 6vw, 3.5rem)",
        "clamp(3rem, 6vw, 4.5rem)",
        "clamp(3.5rem, 7vw, 5rem)"
      ),
      lineHeight: 1.05,
      fontWeight: 600,
      color: Colors.TEXT_MAIN,
      marginBottom: "0.5rem",
      wordBreak: "break-word",
    },

    Subtitle: {
      letterSpacing: getResponsiveValue("2px", "3px", "4px"),
      textTransform: "uppercase",
      fontSize: getResponsiveValue("0.75rem", "0.8rem", "0.8rem"),
      color: isOpen ? Colors.ACCENT : Colors.TEXT_LIGHT,
      marginBottom: getResponsiveValue("1.5rem", "2rem", "2rem"),
      opacity: isOpen ? 1 : 0.7,
      transition: "all 0.8s ease",
      marginTop: getResponsiveValue("1rem", "1.5rem", "2.5rem"),
    },

    BodyText: {
      maxWidth: getResponsiveValue("100%", "420px", "420px", "500px"),
      fontSize: getResponsiveValue(
        isExtraSmall ? "0.85rem" : "0.9rem",
        "0.95rem",
        "1rem",
        "1.1rem"
      ),
      lineHeight: getResponsiveValue(1.7, 1.8, 1.8),
      color: Colors.TEXT_MUTED,
      borderLeft: `2px solid ${Colors.ACCENT}`,
      paddingLeft: getResponsiveValue("1rem", "1.5rem", "1.5rem"),
      marginBottom: getResponsiveValue("2rem", "3rem", "3rem"),
      overflowWrap: "break-word",
    },

    NavMenu: {
      display: "flex",
      flexDirection: "column",
      gap: getResponsiveValue(
        isExtraSmall ? "0.75rem" : "1rem",
        "1.25rem",
        "1.5rem"
      ),
      marginTop: "auto",
      marginBottom: getResponsiveValue("2rem", "0", "0"),
    },

    NavLink: {
      fontFamily: "'Playfair Display', serif",
      fontSize: getResponsiveValue(
        isExtraSmall ? "1.2rem" : "clamp(1.2rem, 5vw, 1.8rem)",
        "clamp(1.4rem, 3vw, 2rem)",
        "clamp(1.6rem, 4vw, 2.2rem)",
        "clamp(1.8rem, 4vw, 2.5rem)"
      ),
      color: Colors.TEXT_MAIN,
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: getResponsiveValue("0.4rem 0", "0.5rem 0", "0.5rem 0"),
      borderBottom: `1px solid ${Colors.LINE}`,
      minHeight: getResponsiveValue("44px", "auto", "auto"),
    },

    NavLabel: {
      display: "flex",
      alignItems: "center",
      gap: getResponsiveValue("0.75rem", "1rem", "1rem"),
    },

    NavNum: {
      fontSize: getResponsiveValue("0.8rem", "0.85rem", "0.9rem"),
      color: Colors.ACCENT,
      fontWeight: 500,
      minWidth: getResponsiveValue("25px", "30px", "30px"),
    },

    Socials: {
      display: "flex",
      gap: getResponsiveValue("1rem", "1.5rem", "1.5rem"),
      marginTop: getResponsiveValue("1.5rem", "2rem", "2rem"),
      paddingTop: getResponsiveValue("1rem", "1.5rem", "1.5rem"),
      borderTop: `1px solid ${Colors.LINE}`,
    },

    SocialIcon: {
      color: Colors.TEXT_MUTED,
      transition: "all 0.3s ease",
      cursor: "pointer",
      minWidth: "44px",
      minHeight: "44px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    RightPanel: {
      position: isMobile && isOpen ? "relative" : "absolute",
      right: 0,
      top: 0,
      bottom: 0,
      width: isOpen 
        ? (screen === "desktop" || isLandscape) 
          ? getResponsiveValue("0%", "50%", "50%", "55%")
          : "0%"
        : "0%",
      height: isMobile && isOpen ? "50vh" : "100%",
      overflow: "hidden",
      transition: "width 1s cubic-bezier(0.77,0,0.175,1), height 1s cubic-bezier(0.77,0,0.175,1)",
    },

    ImageContainer: {
      width: "100%",
      height: "100%",
      position: "relative",
      opacity: isOpen ? 1 : 0,
      transition: "opacity 0.8s ease 0.3s",
    },

    HeroImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
      transform: isOpen ? "scale(1)" : "scale(1.1)",
      transition: "all 1.2s cubic-bezier(0.77,0,0.175,1)",
    },

    Toggle: {
      position: isMobile && isOpen ? "fixed" : "absolute",
      top: isMobile 
        ? (isOpen ? "1.5rem" : "auto") 
        : (isOpen ? getResponsiveValue("2rem", "2.5rem", "2.5rem") : "50%"),
      bottom: isMobile && !isOpen ? "2rem" : "auto",
      right: isMobile 
        ? (isOpen ? "1.5rem" : "50%")
        : (isOpen ? getResponsiveValue("auto", "calc(50% - 25px)", "calc(50% - 25px)") : "50%"),
      left: isMobile 
        ? "auto" 
        : (isOpen ? "auto" : "50%"),
      transform: isMobile && !isOpen ? "translateX(-50%)" : "translate(0, 0)",
      width: getResponsiveValue("44px", "50px", "60px"),
      height: getResponsiveValue("44px", "50px", "60px"),
      borderRadius: "50%",
      background: isOpen ? Colors.ACCENT : Colors.WHITE,
      border: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 50,
      cursor: "pointer",
      transition: "all 0.8s cubic-bezier(0.77,0,0.175,1)",
      boxShadow: isOpen 
        ? "0 4px 20px rgba(214, 110, 83, 0.3)"
        : "0 10px 40px rgba(0,0,0,0.25)",
      touchAction: "manipulation",
    },

    MenuButton: {
      position: "absolute",
      top: getResponsiveValue("1.5rem", "2rem", "2rem"),
      right: getResponsiveValue("1.5rem", "2rem", "2rem"),
      background: "none",
      border: "none",
      color: Colors.WHITE,
      cursor: "pointer",
      zIndex: 30,
      padding: "0.5rem",
      display: isMobile && !isOpen ? "block" : "none",
      minWidth: "44px",
      minHeight: "44px",
      touchAction: "manipulation",
    },

    MobileBackdrop: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.5)",
      zIndex: 15,
      display: isMobile && isOpen ? "block" : "none",
    },
  };

  return (
    <div style={Styles.Container}>
      <style>{GlobalStyles(isExtraSmall)}</style>

      <div 
        id="mobile-backdrop"
        style={Styles.MobileBackdrop}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {!isOpen && isMobile && (
        <button 
          style={Styles.MenuButton} 
          onClick={() => setIsOpen(true)}
          className="reveal"
          aria-label="Open menu"
        >
          <Menu size={28} />
        </button>
      )}

      
      <div 
        style={Styles.LeftPanel} 
        className={isOpen && !isInitialLoad ? "slide-in-right" : ""}
        role="main"
        aria-label={isOpen ? "Portfolio content" : "Hero section"}
      >
        {isOpen ? (
          <>
            <div>
              <h1 style={Styles.NameRevealed} className="reveal">
                Jiya Vegad.
              </h1>
              <div style={Styles.Subtitle} className="reveal reveal-delay-1">
                Fashion Designer
              </div>
              <p style={Styles.BodyText} className="reveal reveal-delay-2">
                Merging artisanal craft with digital innovation. Exploring
                structure, emotion, and modern silhouettes through sustainable
                design practices.
              </p>
            </div>

            <nav style={Styles.NavMenu} aria-label="Main navigation">
              {[
                ["01", "Portfolio", "#/portfolio"],
                ["02", "Experience", "#/work"],
                ["03", "About", "#/about"],
                ["04", "Contact", "#/contact"],
                ["05", "Curriculum Vitae", "#/cv"],
                ["06", "Education", "#/education"],
              ].map(([num, label, link], index) => (
                <a
                  key={label}
                  href={link}
                  className="nav-item reveal"
                  style={Styles.NavLink}
                  aria-label={`Navigate to ${label}`}
                >
                  <div style={Styles.NavLabel}>
                    <span style={Styles.NavNum}>{num}</span>
                    <span>{label}</span>
                  </div>
                  <ChevronRight 
                    size={getResponsiveValue(18, 20, 20)} 
                    color={Colors.TEXT_MUTED} 
                    aria-hidden="true"
                  />
                </a>
              ))}
            </nav>

            <div style={Styles.Socials} className="reveal reveal-delay-3" aria-label="Social links">
              <Instagram 
                size={20} 
                style={Styles.SocialIcon}
                aria-label="Instagram profile"
                onMouseEnter={(e) => e.currentTarget.style.color = Colors.ACCENT}
                onMouseLeave={(e) => e.currentTarget.style.color = Colors.TEXT_MUTED}
                onFocus={(e) => e.currentTarget.style.color = Colors.ACCENT}
                onBlur={(e) => e.currentTarget.style.color = Colors.TEXT_MUTED}
              />
              <Linkedin 
                size={20} 
                style={Styles.SocialIcon}
                aria-label="LinkedIn profile"
                onMouseEnter={(e) => e.currentTarget.style.color = Colors.ACCENT}
                onMouseLeave={(e) => e.currentTarget.style.color = Colors.TEXT_MUTED}
                onFocus={(e) => e.currentTarget.style.color = Colors.ACCENT}
                onBlur={(e) => e.currentTarget.style.color = Colors.TEXT_MUTED}
              />
              <Mail 
                size={20} 
                style={Styles.SocialIcon}
                aria-label="Email contact"
                onMouseEnter={(e) => e.currentTarget.style.color = Colors.ACCENT}
                onMouseLeave={(e) => e.currentTarget.style.color = Colors.TEXT_MUTED}
                onFocus={(e) => e.currentTarget.style.color = Colors.ACCENT}
                onBlur={(e) => e.currentTarget.style.color = Colors.TEXT_MUTED}
              />
            </div>
          </>
        ) : (
          
          <div style={Styles.HeroText}>
            <h1 style={Styles.NamePreReveal} aria-label="Jiya Vegad">
              <span style={Styles.NameJiya}>Jiya</span>
              <span style={Styles.NameVegad}>Vegad</span>
            </h1>
            <div style={Styles.Subtitle} aria-label="Fashion Design Portfolio">
              Fashion Design Portfolio
            </div>
          </div>
        )}
      </div>

      <div style={Styles.RightPanel} aria-hidden={!isOpen}>
        <div style={Styles.ImageContainer}>
          <img 
            src={profileImage} 
            alt="Jiya Vegad" 
            style={Styles.HeroImage}
            loading="eager"
          />
        </div>
      </div>

      <button 
        style={Styles.Toggle} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open portfolio"}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X size={getResponsiveValue(24, 28, 28)} color={Colors.WHITE} aria-hidden="true" />
        ) : (
          <ChevronRight size={getResponsiveValue(24, 28, 28)} color={Colors.TEXT_MAIN} aria-hidden="true" />
        )}
      </button>
    </div>
  );
};


export default function Main() {
  return (
    <EntryAnimation>
      <ElegantPortfolio />
    </EntryAnimation>
  );
}