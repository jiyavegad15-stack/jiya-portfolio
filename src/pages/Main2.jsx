import React, { useState, useEffect } from "react";
import {
  Zap,
  Linkedin,
  Instagram,
  Mail,
  Palette,
  Scissors,
} from "lucide-react";
import profileImage from "../assets/profile.jpg";

/* ---------- COLOR PALETTE ---------- */
const ColorPalette = {
  SOFT_BEIGE: "#FBE9D0",
  DARK_TEAL: "#244855",
  MUDDY_BROWN: "#874F41",
  MUTED_AQUA: "#90AEAD",
};

/* ---------- SOCIAL MEDIA LINKS ---------- */
const SocialLinks = {
  LINKEDIN: "https://linkedin.com/in/yourusername",
  INSTAGRAM: "https://instagram.com/yourusername",
  EMAIL: "mailto:your.email@domain.com"
};

/* ---------- RESPONSIVE STYLES ---------- */
const Styles = {
  MainContainer: {
    height: "100vh",
    width: "100vw",
    background: `linear-gradient(135deg, ${ColorPalette.SOFT_BEIGE} 0%, ${ColorPalette.MUTED_AQUA}40 100%)`,
    overflow: "hidden",
    fontFamily: "'Georgia','Times New Roman', serif",
    position: "relative",
    color: ColorPalette.DARK_TEAL,
  },

  Logo: {
    position: "fixed",
    top: "3rem",
    left: "4rem",
    zIndex: 50,
    fontWeight: "bold",
    fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
    color: ColorPalette.DARK_TEAL,
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },

  SocialIconsContainer: {
    position: "fixed",
    top: "3rem",
    right: "4rem",
    display: "flex",
    gap: "1.2rem",
    zIndex: 50,
  },

  SocialIcon: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: "rgba(36,72,85,0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(10px)",
    border: `1px solid ${ColorPalette.DARK_TEAL}40`,
    cursor: "pointer",
    transition: "all 0.3s ease",
    color: ColorPalette.DARK_TEAL,
    textDecoration: "none",
  },

  RightImageContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "55vw",
    height: "100vh",
    overflow: "hidden",
    zIndex: 5,
  },

  RightImage: (open) => ({
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: open ? "brightness(1)" : "brightness(0.6) grayscale(40%)",
    transition: "1.5s ease",
  }),

  DarkReveal: (open) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: open ? "50%" : "0%",
    height: "100%",
    background: `linear-gradient(135deg, ${ColorPalette.SOFT_BEIGE}, ${ColorPalette.MUDDY_BROWN}50)`,
    zIndex: 10,
    transition: "1.2s cubic-bezier(0.7,0,0.3,1)",
  }),

  PowerBtn: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "clamp(100px, 20vw, 140px)",
    height: "clamp(100px, 20vw, 140px)",
    borderRadius: "50%",
    background: "rgba(36,72,85,0.08)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    zIndex: 30,
    border: `2px solid ${ColorPalette.MUDDY_BROWN}50`,
    backdropFilter: "blur(20px)",
    animation: "pulse 3s infinite",
    transition: "all 0.3s ease",
  },

  PowerIcon: {
    width: "clamp(40px, 8vw, 60px)",
    height: "clamp(40px, 8vw, 60px)",
    color: ColorPalette.MUDDY_BROWN,
    transition: "all 0.3s ease",
  },

  PowerOffBtn: {
    position: "fixed",
    top: "3.5rem",
    right: "15rem",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "rgba(36,72,85,0.08)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    zIndex: 40,
    border: `1px solid ${ColorPalette.DARK_TEAL}40`,
    backdropFilter: "blur(10px)",
    transition: "all 0.3s ease",
  },

  IntroContent: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "50vw",
    height: "100%",
    padding: "7rem 5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: ColorPalette.DARK_TEAL,
    zIndex: 20,
  },

  Heading: {
    fontSize: "clamp(2.5rem, 8vw, 5rem)",
    fontWeight: "bold",
    marginBottom: "2rem",
    background: `linear-gradient(135deg, ${ColorPalette.DARK_TEAL}, ${ColorPalette.MUTED_AQUA})`,
    WebkitBackgroundClip: "text",
    color: "transparent",
    backgroundClip: "text",
    lineHeight: "1.1",
  },

  IntroText: {
    maxWidth: "40rem",
    fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
    lineHeight: "1.7",
    opacity: 0.95,
    marginBottom: "3rem",
  },

  Highlight: {
    color: ColorPalette.MUDDY_BROWN,
    fontWeight: 600,
  },

  TagContainer: {
    display: "flex",
    gap: "2rem",
    flexWrap: "wrap",
  },

  Tag: {
    border: `1px solid ${ColorPalette.DARK_TEAL}30`,
    padding: "clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem)",
    borderRadius: "50px",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    background: "rgba(255,255,255,0.6)",
    backdropFilter: "blur(10px)",
    transition: "all 0.3s ease",
    fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
  },

  NavLinks: (open) => ({
    position: "absolute",
    bottom: "5rem",
    left: open ? "5rem" : "50%",
    transform: open ? "none" : "translateX(-50%)",
    display: "flex",
    gap: "4rem",
    transition: "all 0.8s cubic-bezier(0.7,0,0.3,1)",
    zIndex: 30,
  }),

  NavLink: (open) => ({
    fontSize: open ? "clamp(1.5rem, 3vw, 2rem)" : "clamp(2rem, 5vw, 2.8rem)",
    textDecoration: "none",
    fontWeight: "700",
    color: ColorPalette.DARK_TEAL,
    transition: "all 0.5s ease",
    background: open ? "transparent" : `linear-gradient(135deg, ${ColorPalette.DARK_TEAL}, ${ColorPalette.MUTED_AQUA})`,
    WebkitBackgroundClip: open ? "none" : "text",
    WebkitTextFillColor: open ? "inherit" : "transparent",
    backgroundClip: open ? "none" : "text",
    padding: open ? "0" : "clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem)",
    borderRadius: open ? "0" : "50px",
    border: open ? "none" : `2px solid ${ColorPalette.DARK_TEAL}20`,
  }),

  SideElements: (open) => ({
    position: "fixed",
    top: "calc(50% + 2rem)",
    right: open ? "3rem" : "4rem",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    transition: "all 0.5s ease",
    zIndex: 30,
  }),

  SideLink: {
    writingMode: "vertical-rl",
    textOrientation: "mixed",
    color: ColorPalette.DARK_TEAL,
    fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
    padding: "1rem",
    textDecoration: "none",
    borderRadius: "25px",
    border: `1px solid ${ColorPalette.DARK_TEAL}30`,
    background: "rgba(36,72,85,0.06)",
    transition: "all 0.3s ease",
  },
};

/* ---------- COMPONENTS ---------- */
const IntroContent = () => (
  <div style={Styles.IntroContent} className="intro-content-mobile">
    <h1 style={Styles.Heading}>
      Jiya<br />Vegad
    </h1>
    <p style={Styles.IntroText}>
      I am a <span style={Styles.Highlight}>minimalist fashion designer</span>{" "}
      specializing in expressive, narrative-driven garments that merge{" "}
      <span style={Styles.Highlight}>storytelling, emotion and craft</span> to create 
      fashion that feels both personal and powerful.
    </p>
    <div style={Styles.TagContainer} className="tag-container-mobile">
      <div style={Styles.Tag} className="tag-hover tag-mobile">
        <Palette size={20} color={ColorPalette.MUDDY_BROWN} />
        Conceptual Design
      </div>

      <div style={Styles.Tag} className="tag-hover tag-mobile">
        <Scissors size={20} color={ColorPalette.MUDDY_BROWN} />
        Artisanal Craft
      </div>
    </div>
  </div>
);

const LogoComponent = () => (
  <div style={Styles.Logo} className="logo-mobile">
    <div
      style={{
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        background: ColorPalette.MUDDY_BROWN,
        boxShadow: `0 0 20px ${ColorPalette.MUDDY_BROWN}`,
      }}
    />
    JV
  </div>
);

const SocialIcons = () => (
  <div style={Styles.SocialIconsContainer} className="social-icons-mobile">
    <a 
      href={SocialLinks.LINKEDIN} 
      target="_blank" 
      rel="noopener noreferrer"
      style={Styles.SocialIcon}
      className="social-hover social-icon-mobile"
      aria-label="LinkedIn"
    >
      <Linkedin size={20} />
    </a>
    <a 
      href={SocialLinks.INSTAGRAM} 
      target="_blank" 
      rel="noopener noreferrer"
      style={Styles.SocialIcon}
      className="social-hover social-icon-mobile"
      aria-label="Instagram"
    >
      <Instagram size={20} />
    </a>
    <a 
      href={SocialLinks.EMAIL}
      style={Styles.SocialIcon}
      className="social-hover social-icon-mobile"
      aria-label="Email"
    >
      <Mail size={20} />
    </a>
  </div>
);

const Main2 = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={Styles.MainContainer}>
      <style>{`
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
          50% { transform: translate(-50%, -50%) scale(1.05); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
        }

        .social-hover:hover {
          transform: translateY(-2px);
          background: rgba(36, 72, 85, 0.15);
          border-color: ${ColorPalette.MUDDY_BROWN}50;
          box-shadow: 0 8px 25px rgba(135, 79, 65, 0.2);
        }

        .power-hover:hover {
          transform: translate(-50%, -50%) scale(1.08);
          border-color: ${ColorPalette.MUDDY_BROWN}70;
          box-shadow: 0 0 40px rgba(135, 79, 65, 0.3);
        }

        .power-off-hover:hover {
          transform: scale(1.1);
          background: rgba(36, 72, 85, 0.15);
          border-color: ${ColorPalette.MUDDY_BROWN}50;
        }

        .tag-hover:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.8);
          border-color: ${ColorPalette.MUDDY_BROWN}40;
          box-shadow: 0 8px 20px rgba(36, 72, 85, 0.1);
        }

        .nav-hover:hover {
          transform: translateY(-2px);
          color: ${ColorPalette.MUDDY_BROWN};
        }

        .side-hover:hover {
          transform: translateX(-5px);
          background: rgba(36, 72, 85, 0.1);
          border-color: ${ColorPalette.MUDDY_BROWN}40;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .logo-mobile {
            left: 1.5rem !important;
            top: 1.5rem !important;
          }
          
          .social-icons-mobile {
            right: 1.5rem !important;
            top: 1.5rem !important;
            gap: 0.8rem !important;
          }
          
          .social-icon-mobile {
            width: 40px !important;
            height: 40px !important;
          }
          
          .intro-content-mobile {
            padding: 4rem 2rem !important;
            width: 100vw !important;
            text-align: center !important;
          }
          
          .nav-links-mobile {
            bottom: 2rem !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            gap: 2rem !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
          }
          
          .side-elements-mobile {
            display: none !important;
          }
          
          .power-off-mobile {
            right: 1.5rem !important;
            top: 1rem !important;
          }
          
          .right-image-mobile {
            width: 100vw !important;
          }
          
          .dark-reveal-mobile {
            width: ${open ? '100%' : '0%'} !important;
            background: linear-gradient(135deg, ${ColorPalette.SOFT_BEIGE}, ${ColorPalette.MUDDY_BROWN}30) !important;
          }

          .tag-container-mobile {
            justify-content: center !important;
            gap: 1rem !important;
          }
        }

        @media (max-width: 480px) {
          .intro-content-mobile {
            padding: 3rem 1.5rem !important;
          }
          
          .tag-container-mobile {
            gap: 0.8rem !important;
          }
          
          .nav-links-mobile {
            gap: 1.5rem !important;
          }
          
          .logo-mobile {
            left: 1rem !important;
            top: 1rem !important;
          }
          
          .social-icons-mobile {
            right: 1rem !important;
            top: 1rem !important;
          }
        }

        @media (max-width: 320px) {
          .intro-content-mobile {
            padding: 2rem 1rem !important;
          }
          
          .tag-mobile {
            padding: 0.6rem 1rem !important;
            font-size: 0.8rem !important;
          }
          
          .nav-links-mobile {
            gap: 1rem !important;
          }
        }

        /* High zoom level support */
        @media (max-width: 240px) {
          body {
            font-size: 14px;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }

        /* High contrast support */
        @media (prefers-contrast: high) {
          .main-container {
            background: #000 !important;
            color: #fff !important;
          }
          
          .social-icon, .tag, .side-link {
            border: 2px solid #fff !important;
            background: #111 !important;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .social-hover:active,
          .power-hover:active,
          .tag-hover:active,
          .nav-hover:active,
          .side-hover:active {
            transform: scale(0.95);
          }
        }

        /* Orientation support */
        @media (orientation: landscape) and (max-height: 500px) {
          .intro-content-mobile {
            padding: 2rem !important;
          }
          
          .nav-links-mobile {
            bottom: 1rem !important;
          }
        }
      `}</style>

      <div style={Styles.RightImageContainer} className="right-image-mobile">
        <img 
          src={profileImage} 
          alt="Jiya Vegad - Fashion Designer" 
          style={Styles.RightImage(open)} 
          onError={(e) => {
            e.target.style.display = 'none';
            console.log('Profile image failed to load');
          }}
        />
      </div>

      <LogoComponent />
      <SocialIcons />
      <div style={Styles.DarkReveal(open)} className="dark-reveal-mobile" />

      {open && <IntroContent />}

      {!open ? (
        <button 
          style={Styles.PowerBtn} 
          onClick={() => setOpen(true)}
          className="power-hover"
          aria-label="Open portfolio"
        >
          <Zap style={Styles.PowerIcon} />
        </button>
      ) : (
        <button 
          style={Styles.PowerOffBtn} 
          onClick={() => setOpen(false)}
          className="power-off-hover power-off-mobile"
          aria-label="Close portfolio"
        >
          <Zap size={24} color={ColorPalette.MUDDY_BROWN} />
        </button>
      )}

      <div style={Styles.NavLinks(open)} className="nav-links-mobile">
        <a href="/jiya-portfolio/#/about" style={Styles.NavLink(open)} className="nav-hover">
          About
        </a>
        <a href="/jiya-portfolio/#/work" style={Styles.NavLink(open)} className="nav-hover">
          Portfolio
        </a>
        <a href="/jiya-portfolio/#/education" style={Styles.NavLink(open)} className="nav-hover">
          Education
        </a>
      </div>

      {/* Side links - Hidden on mobile */}
      {!isMobile && (
        <div style={Styles.SideElements(open)} className="side-elements-mobile">
          <a href="/jiya-portfolio/#/cv" style={Styles.SideLink} className="side-hover">
            Curriculum Vitae
          </a>
          <a href="/jiya-portfolio/#/process" style={Styles.SideLink} className="side-hover">
            Design Philosophy
          </a>
        </div>
      )}
    </div>
  );
};

export default Main2;