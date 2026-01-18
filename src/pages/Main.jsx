import React, { useState, useEffect } from "react";
import {
  Instagram,
  Linkedin,
  Mail,
  X,
  Menu,
  ArrowUpRight,
} from "lucide-react";

import EntryAnimation from "../components/EntryAnimation";
import profileImage from "../assets/profile3.png";

const Theme = {
  Canvas: "#FDFCF8",      
  Ink: "#1B2A2F",         
  Muted: "#6C757D",    
  Accent: "#D66E53",      
  Void: "#0F1A1E",        
  Border: "rgba(27, 42, 47, 0.1)",
};

const useScreenSize = () => {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    ...dimensions,
    isMobile: dimensions.width < 768,
    isTablet: dimensions.width >= 768 && dimensions.width < 1100,
    isDesktop: dimensions.width >= 1100,
  };
};

const ElegantPortfolio = () => {
  const { isMobile, isDesktop } = useScreenSize();
  const [isOpen, setIsOpen] = useState(false);

  const layoutStyle = {
    display: "grid",
    gridTemplateColumns: (isDesktop && isOpen) ? "1.1fr 0.9fr" : "100%",
    minHeight: "100svh", 
    width: "100%",
    background: isOpen ? Theme.Canvas : Theme.Void,
    transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Inter', sans-serif",
  };

  const contentPadding = isMobile ? "10vh 7vw" : "5vh 10vw";

  return (
    <main style={layoutStyle}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Inter:wght@300;400;600&display=swap');
        
        .reveal-content {
          animation: slideUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .nav-item {
          text-decoration: none;
          color: inherit;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: clamp(0.8rem, 2vh, 1.2rem) 0;
          border-bottom: 1px solid ${Theme.Border};
          transition: 0.2s ease;
        }

        .nav-item:hover {
          padding-left: 1rem;
          color: ${Theme.Accent};
        }

        .profile-mask {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(20%);
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .toggle-btn:hover {
            transform: translate(-50%, -50%) scale(1.05) !important;
        }
      `}</style>

      {/* LEFT CONTENT SECTION */}
      <section style={{
        padding: contentPadding,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        zIndex: 10,
        color: isOpen ? Theme.Ink : "white",
        transition: "color 0.5s ease"
      }}>
        
        {!isOpen ? (
          <div className="reveal-content">
            <p style={{ letterSpacing: "0.4em", fontSize: "0.7rem", marginBottom: "1.5rem", opacity: 0.6 }}>
              FASHION DESIGNER
            </p>
            <h1 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: "clamp(3.5rem, 14vw, 10rem)", 
              lineHeight: 0.85, 
              margin: 0 
            }}>
              Jiya<br />
              <span style={{ fontStyle: "italic", fontWeight: "400", color: Theme.Accent }}>Vegad</span>
            </h1>
          </div>
        ) : (
          <div className="reveal-content" style={{ width: "100%", maxWidth: "550px" }}>
            <h2 style={{ 
              fontFamily: "'Playfair Display', serif", 
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)", 
              marginBottom: "1.5rem" 
            }}>
              Explore<span style={{color: Theme.Accent}}>.</span>
            </h2>
            
            <nav style={{ display: "flex", flexDirection: "column" }}>
              {[
                { id: "01", title: "About", link: "#about" },
                { id: "02", title: "Portfolio", link: "#portfolio" },
                { id: "03", title: "Experience", link: "#work" },
                { id: "04", title: "Skills", link: "#skills" },
                { id: "05", title: "Education", link: "#education" },
                { id: "06", title: "Curriculum Vitae", link: "#cv" },
                { id: "07", title: "Contact", link: "#contact" }
              ].map((item) => (
                <a key={item.id} href={item.link} className="nav-item">
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ 
                      fontSize: "0.65rem", 
                      color: Theme.Accent, 
                      marginRight: "1.2rem",
                      fontWeight: "600" 
                    }}>{item.id}</span> 
                    <span style={{ fontWeight: "400" }}>{item.title}</span>
                  </span>
                  <ArrowUpRight size={18} opacity={0.4} />
                </a>
              ))}
            </nav>

            <div style={{ marginTop: "2.5rem", display: "flex", gap: "1.5rem", opacity: 0.7 }}>
              <Instagram size={20} style={{ cursor: "pointer" }} />
              <Linkedin size={20} style={{ cursor: "pointer" }} />
              <Mail size={20} style={{ cursor: "pointer" }} />
            </div>
          </div>
        )}
      </section>

      {/* RIGHT VISUAL PANEL */}
      {isDesktop && isOpen && (
        <section style={{
          height: "100%",
          width: "100%",
          overflow: "hidden",
          animation: "slideUp 1.5s ease",
          background: Theme.Void
        }}>
          <img 
            src={profileImage} 
            alt="Jiya Vegad Profile" 
            className="profile-mask"
          />
        </section>
      )}

      {/* --- ANIMATED TOGGLE BUTTON --- */}
      <button 
        className="toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
        style={{
          position: "fixed",
          // Moves from center (50%) to top-right corner
          top: isOpen ? (isMobile ? "40px" : "50px") : "50%",
          left: isOpen ? (isMobile ? "calc(100% - 40px)" : "calc(100% - 60px)") : "50%",
          
          transform: "translate(-50%, -50%)",
          width: "clamp(65px, 8vw, 90px)",
          height: "clamp(65px, 8vw, 90px)",
          borderRadius: "50%",
          backgroundColor: isOpen ? Theme.Accent : "white",
          color: isOpen ? "white" : Theme.Ink,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: isOpen 
            ? "0 10px 30px rgba(214, 110, 83, 0.3)" 
            : "0 20px 40px rgba(0,0,0,0.3)",
          zIndex: 1000,
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
      >
        {isOpen ? <X size={32} /> : <Menu size={32} />}
      </button>
    </main>
  );
};

export default function Main() {
  return (
    <EntryAnimation>
      <ElegantPortfolio />
    </EntryAnimation>
  );
}