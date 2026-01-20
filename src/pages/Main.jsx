import React, { useState, useEffect } from "react";
import {
  Instagram,
  Linkedin,
  Mail,
  ArrowUpRight,
  X,
  Menu,
} from "lucide-react";
import EntryAnimation from "../components/EntryAnimation";
import profileImage from "../assets/profile3.png";

const Theme = {
  Canvas: "#FDFCF8",
  Ink: "#1B2A2F",
  Muted: "#6C757D",
  Accent: "#D66E53",
  Void: "#0F1A1E",
  Glass: "rgba(255, 255, 255, 0.03)",
  Border: "rgba(27, 42, 47, 0.08)",
};

const useScreenSize = () => {
  const [size, setSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    isMobile: typeof window !== "undefined" ? window.innerWidth < 768 : false,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        isMobile: window.innerWidth < 768,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
};

const ElegantPortfolio = () => {
  const { width, isMobile } = useScreenSize();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: "01", title: "About", link: "#about" },
    { id: "02", title: "Portfolio", link: "#portfolio" },
    { id: "03", title: "Experience", link: "#work" },
    { id: "04", title: "Skills", link: "#skills" },
    { id: "05", title: "Education", link: "#education" },
    { id: "06", title: "CV", link: "#cv" },
    { id: "07", title: "Contact", link: "#contact" },
  ];

  return (
    <main
      style={{
        display: "grid",
        gridTemplateColumns: !isMobile && isOpen ? "1fr 1fr" : "1fr",
        minHeight: "100svh",
        width: "100%",
        background: isOpen ? Theme.Canvas : Theme.Void,
        transition: "all 0.9s cubic-bezier(0.7, 0, 0.3, 1)",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Inter:wght@300;400;600&display=swap');
        
        .nav-link {
          text-decoration: none;
          color: ${Theme.Ink};
          display: flex;
          align-items: center;
          padding: 1.2vh 0;
          border-bottom: 1px solid ${Theme.Border};
          transition: all 0.4s ease;
          opacity: 0;
          transform: translateY(20px);
        }

        .menu-open .nav-link {
          opacity: 1;
          transform: translateY(0);
        }

        .nav-link:hover {
          padding-left: 1.5rem;
          color: ${Theme.Accent};
        }

        .social-icon {
          color: inherit;
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .social-icon:hover {
          transform: translateY(-3px);
          color: ${Theme.Accent};
        }

        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.15s; }
        .stagger-3 { transition-delay: 0.2s; }
        .stagger-4 { transition-delay: 0.25s; }
        .stagger-5 { transition-delay: 0.3s; }
        .stagger-6 { transition-delay: 0.35s; }
        .stagger-7 { transition-delay: 0.4s; }
      `}</style>

      <section
        className={isOpen ? "menu-open" : ""}
        style={{
          padding: isMobile ? "12vh 8vw" : "0 10vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          zIndex: 20,
          color: isOpen ? Theme.Ink : "white",
          transition: "color 0.6s ease",
        }}
      >
        {!isOpen ? (
          <div style={{ animation: "fadeIn 1s ease forwards" }}>
            <p
              style={{
                letterSpacing: "0.5em",
                fontSize: "0.75rem",
                marginBottom: "2rem",
                opacity: 0.5,
                fontWeight: 600,
              }}
            >
              FASHION DESIGNER
            </p>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(4rem, 16vw, 12rem)",
                lineHeight: 0.8,
                margin: 0,
                letterSpacing: "-0.03em",
              }}
            >
              Jiya
              <br />
              <span
                style={{
                  fontStyle: "italic",
                  fontWeight: "400",
                  color: Theme.Accent,
                }}
              >
                Vegad
              </span>
            </h1>
          </div>
        ) : (
          <div style={{ width: "100%", maxWidth: "500px" }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                marginBottom: "3rem",
              }}
            >
              Menu<span style={{ color: Theme.Accent }}>.</span>
            </h2>

            <nav style={{ display: "flex", flexDirection: "column" }}>
              {navItems.map((item, index) => (
                <a
                  key={item.id}
                  href={item.link}
                  className={`nav-link stagger-${index + 1}`}
                >
                  <span
                    style={{
                      fontSize: "0.7rem",
                      color: Theme.Accent,
                      width: "40px",
                      fontWeight: "600",
                    }}
                  >
                    {item.id}
                  </span>
                  <span
                    style={{
                      fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
                      fontWeight: "400",
                    }}
                  >
                    {item.title}
                  </span>
                  <ArrowUpRight
                    size={20}
                    style={{ marginLeft: "auto", opacity: 0.3 }}
                  />
                </a>
              ))}
            </nav>

            <div
              style={{
                marginTop: "4rem",
                display: "flex",
                gap: "2rem",
                alignItems: "center",
              }}
            >
              <a
                href="https://www.instagram.com/jiya_vegad"
                target="_blank"
                className="social-icon"
              >
                <Instagram size={22} />
              </a>
              <a
                href="https://www.linkedin.com/in/jiya-vegad"
                target="_blank"
                className="social-icon"
              >
                <Linkedin size={22} />
              </a>
              <a href="mailto:Jiyavegad15@gmail.com" className="social-icon">
                <Mail size={22} />
              </a>
            </div>
          </div>
        )}
      </section>

      {!isMobile && (
        <section
          style={{
            height: "100vh",
            width: "100%",
            position: "relative",
            background: Theme.Void,
            overflow: "hidden",
            transform: isOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.9s cubic-bezier(0.7, 0, 0.3, 1)",
          }}
        >
          <img
            src={profileImage}
            alt="Jiya Vegad"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "contrast(1.1) brightness(0.9)",
              transform: isOpen ? "scale(1)" : "scale(1.2)",
              transition: "transform 1.5s ease",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(15,26,30,0.2), transparent)",
            }}
          />
        </section>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          top: isMobile && isOpen ? "30px" : "50%",
          right: isMobile && isOpen ? "30px" : "50px",
          transform: isMobile && isOpen ? "none" : "translateY(-50%)",
          width: "clamp(60px, 7vw, 80px)",
          height: "clamp(60px, 7vw, 80px)",
          borderRadius: "50%",
          backgroundColor: isOpen ? Theme.Accent : "white",
          color: isOpen ? "white" : Theme.Ink,
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          boxShadow: isOpen
            ? "0 15px 35px rgba(214, 110, 83, 0.4)"
            : "0 15px 35px rgba(0,0,0,0.2)",
          transition: "all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {isOpen ? <X size={30} /> : <Menu size={30} />}
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