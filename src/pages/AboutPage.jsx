import React, { useEffect, useRef, useState } from "react";
import { 
    Sparkles, ArrowRight, Mail, Instagram, Linkedin, 
    Activity, PersonStanding, Headphones, Plane, Menu, X 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import ProfilePic from "../assets/profile3.png";

const Theme = {
    bg: "#FBF9F7",
    surface: "#F4F1EE",
    primary: "#1A1A1A",
    accent: "#D97D6E",
    muted: "#7C7671",
    border: "rgba(26, 26, 26, 0.06)",
    glass: "rgba(251, 249, 247, 0.85)",
};

const GlobalStyles = () => (
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400;0,500&family=Inter:wght@300;400;600&display=swap');

        :root {
            --ease: cubic-bezier(0.23, 1, 0.32, 1);
            --t-slow: 1.4s var(--ease);
            --t-med: 0.8s var(--ease);
        }

        * { 
            box-sizing: border-box; 
            margin: 0; 
            padding: 0;
            -webkit-font-smoothing: antialiased;
        }

        body {
            background-color: ${Theme.bg};
            color: ${Theme.primary};
            font-family: 'Lora', serif;
            overflow-x: hidden;
            selection-background: ${Theme.accent};
            selection-color: white;
        }

        .reveal {
            opacity: 0;
            transform: translateY(40px);
            transition: opacity var(--t-slow), transform var(--t-slow);
        }

        .reveal.visible {
            opacity: 1;
            transform: translateY(0);
        }

        .image-stage {
            position: relative;
            width: 100%;
            max-width: 500px;
            aspect-ratio: 0.85;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .orbit {
            position: absolute;
            width: 110%;
            height: 110%;
            border: 1px solid ${Theme.border};
            border-radius: 50%;
            animation: rotate 20s linear infinite;
        }

        .orbit::after {
            content: '';
            position: absolute;
            top: -5px;
            left: 50%;
            width: 10px;
            height: 10px;
            background: ${Theme.accent};
            border-radius: 50%;
        }

        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        .floating-element {
            position: absolute;
            background: white;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.05);
            font-family: 'Inter', sans-serif;
            font-size: 0.7rem;
            font-weight: 600;
            letter-spacing: 1px;
            text-transform: uppercase;
            z-index: 10;
            animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0) rotate(-2deg); }
            50% { transform: translateY(-15px) rotate(2deg); }
        }

        .arch-frame img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
            transition: transform 1s var(--ease);
        }


        .arch-frame {
            filter: drop-shadow(0 20px 40px rgba(0,0,0,0.12));
        }


        .arch-frame:hover img {
            transform: scale(1.05);
        }

        .nav-item {
            text-decoration: none;
            color: ${Theme.muted};
            font-family: 'Inter', sans-serif;
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            transition: 0.4s;
            padding: 0.5rem 0;
        }

        .nav-item:hover, .nav-item.active {
            color: ${Theme.primary};
        }

        .nav-item.active::after {
            content: '';
            display: block;
            width: 100%;
            height: 1px;
            background: ${Theme.accent};
            margin-top: 4px;
        }

        .interest-card {
            background: white;
            padding: 4rem 2rem;
            border: 1px solid ${Theme.border};
            transition: var(--t-med);
            text-align: center;
        }

        .interest-card:hover {
            border-color: transparent;
            box-shadow: 0 40px 80px -15px rgba(0,0,0,0.04);
            transform: translateY(-12px);
        }

        .cta-button {
            padding: 1.4rem 3.5rem;
            background: ${Theme.primary};
            color: white;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 1.2rem;
            font-family: 'Inter', sans-serif;
            font-size: 0.8rem;
            font-weight: 600;
            letter-spacing: 2px;
            transition: 0.5s var(--ease);
            border: 1px solid ${Theme.primary};
        }

        .cta-button:hover {
            background: transparent;
            color: ${Theme.primary};
            transform: scale(1.05);
        }

        @media (max-width: 1024px) {
            .hero-container { grid-template-columns: 1fr !important; text-align: center; gap: 6rem !important; }
            .hero-text { order: 2; display: flex; flex-direction: column; align-items: center; }
            .hero-visual { order: 1; }
        }
    `}</style>
);

const Reveal = ({ children, delay = 0, className = "" }) => {
    const ref = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    if (entry.target) entry.target.classList.add("visible");
                }, delay);
            }
        }, { threshold: 0.1 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [delay]);
    return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
};

const Navbar = () => {
    const { pathname } = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navs = [
        { name: "Home", path: "/main2" },
        { name: "About", path: "/about" },
        { name: "Portfolio", path: "/portfolio" },
        { name: "Experience", path: "/work" },
        { name: "Skills", path: "/skills" },
        { name: "Education", path: "/education" },
        { name: "CV", path: "/cv" },
        { name: "Contact", path: "/contact" }
    ];

    return (
        <nav style={{
            position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000,
            background: scrolled ? Theme.glass : "transparent",
            backdropFilter: scrolled ? "blur(15px)" : "none",
            borderBottom: scrolled ? `1px solid ${Theme.border}` : "none",
            transition: "0.4s ease"
        }}>
            <div style={{
                maxWidth: "1600px", margin: "0 auto", padding: "0 5%", height: "100px",
                display: "flex", justifyContent: "space-between", alignItems: "center"
            }}>
                <Link to="/main2" style={{
                    fontFamily: "Playfair Display", fontSize: "1.8rem", fontWeight: 700,
                    color: Theme.primary, textDecoration: "none", letterSpacing: "-1px"
                }}>JIYA</Link>

                <div style={{ display: "none", gap: "2.5rem" }} className="desktop-links">
                    <style>{`@media (min-width: 1100px) { .desktop-links { display: flex !important; } }`}</style>
                    {navs.map(n => (
                        <Link key={n.name} to={n.path} className={`nav-item ${pathname === n.path ? 'active' : ''}`}>
                            {n.name}
                        </Link>
                    ))}
                </div>

                <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
                    <a href="https://instagram.com/jiya_vegad" target="_blank" rel="noreferrer" style={{ color: Theme.primary }}>
                        <Instagram size={20} strokeWidth={1.5} />
                    </a>
                    <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: Theme.primary }}>
                        <style>{`@media (min-width: 1100px) { .mobile-btn { display: none; } }`}</style>
                        <div className="mobile-btn">{mobileOpen ? <X size={28} /> : <Menu size={28} />}</div>
                    </button>
                </div>
            </div>

            {mobileOpen && (
                <div style={{
                    position: "fixed", top: "100px", left: 0, width: "100%", height: "100vh",
                    background: Theme.bg, zIndex: 999, padding: "10%", display: "flex", flexDirection: "column", gap: "2rem"
                }}>
                    {navs.map((n, i) => (
                        <Reveal key={n.name} delay={i * 60}>
                            <Link to={n.path} onClick={() => setMobileOpen(false)} style={{
                                textDecoration: "none", color: Theme.primary, fontSize: "2.5rem", fontFamily: "Playfair Display"
                            }}>{n.name}</Link>
                        </Reveal>
                    ))}
                </div>
            )}
        </nav>
    );
};

const App = () => {
    return (
        <div style={{ width: "100%" }}>
            <GlobalStyles />
            <Navbar />

            <section style={{ 
                padding: "180px 5% 120px", maxWidth: "1500px", margin: "0 auto", 
                minHeight: "100vh", display: "flex", alignItems: "center"
            }}>
                <div className="hero-container" style={{
                    display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "10%", alignItems: "center", width: "100%"
                }}>
                    <div className="hero-text">
                        <Reveal>
                            <div style={{ display: "flex", alignItems: "center", gap: 20, color: Theme.accent, marginBottom: "2.5rem" }}>
                                <div style={{ height: 1, width: 50, background: Theme.accent }} />
                                <span style={{ fontFamily: "Inter", fontSize: "0.75rem", letterSpacing: 5, fontWeight: 600, textTransform: "uppercase" }}>
                                    Designer & Storyteller
                                </span>
                            </div>
                        </Reveal>

                        <Reveal delay={200}>
                            <h1 style={{
                                fontSize: "clamp(3.5rem, 8vw, 7rem)", color: Theme.primary, 
                                fontFamily: "Playfair Display", lineHeight: 0.95, marginBottom: "3rem", letterSpacing: "-0.03em"
                            }}>
                                Weaving <br />
                                <em style={{ color: Theme.accent, fontStyle: "italic", fontWeight: 400 }}>Fantasy</em> <br />
                                <span style={{ fontSize: "0.8em" }}>into Every Thread.</span>
                            </h1>
                        </Reveal>

                        <Reveal delay={400}>
                            <p style={{ 
                                maxWidth: "520px", fontSize: "clamp(1.1rem, 2vw, 1.25rem)", color: Theme.muted, 
                                lineHeight: 1.8, marginBottom: "4.5rem", fontWeight: 400
                            }}>
                                A creative fashion designer drawn to fantasy-driven storytelling
                                and sustainable design. Travel, music, and dance keep my
                                ideas fresh and expressive.
                            </p>
                        </Reveal>

                        <Reveal delay={600}>
                            <Link to="/work" className="cta-button">
                                EXPLORE WORK <ArrowRight size={20} />
                            </Link>
                        </Reveal>
                    </div>

                    <div className="hero-visual" style={{ display: "flex", justifyContent: "center" }}>
                        <Reveal delay={300}>
                            <div className="image-stage">
                                <div className="orbit" />
                                <div className="floating-element" style={{ top: "10%", right: "-10%" }}>Fantasy</div>
                                <div className="floating-element" style={{ bottom: "20%", left: "-15%", animationDelay: "1s" }}>Sustainable</div>
                                <div className="arch-frame">
                                    <img 
                                        src={ProfilePic} 
                                        alt="Jiya" 
                                    />
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section style={{ background: Theme.surface, padding: "clamp(6rem, 15vh, 12rem) 5%" }}>
                <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
                    <Reveal>
                        <div style={{ textAlign: "center", marginBottom: "8rem" }}>
                            <h2 style={{
                                fontFamily: "Playfair Display", fontSize: "clamp(3.5rem, 7vw, 6rem)",
                                color: Theme.primary, marginBottom: "1rem"
                            }}>Interests</h2>
                            <div style={{ width: 60, height: 2, background: Theme.accent, margin: "0 auto" }} />
                        </div>
                    </Reveal>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "2rem"
                    }}>
                        {[
                            { icon: <Activity/>, title: "Move & Play", text: "A few favourite sports — just for fun and vitality." },
                            { icon: <PersonStanding/>, title: "Dance", text: "Movement as a form of soulful self-expression." },
                            { icon: <Headphones/>, title: "Music", text: "Curated playlists for every creative mood and flow." },
                            { icon: <Plane/>, title: "Travel", text: "Discovering new textures and global heritage stories." }
                        ].map((item, idx) => (
                            <Reveal key={idx} delay={idx * 150}>
                                <div className="interest-card">
                                    <div style={{ color: Theme.accent, marginBottom: "2.5rem" }}>
                                        {React.cloneElement(item.icon, { size: 40, strokeWidth: 1 })}
                                    </div>
                                    <h3 style={{ fontSize: "1.6rem", marginBottom: "1.2rem" }}>{item.title}</h3>
                                    <p style={{ color: Theme.muted, lineHeight: 1.7, fontSize: "0.95rem" }}>{item.text}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <footer style={{
                background: Theme.primary, color: "white",
                padding: "clamp(8rem, 20vh, 15rem) 5% 5rem", textAlign: "center"
            }}>
                <Reveal>
                    <div style={{ marginBottom: "4rem" }}>
                        <Mail size={40} strokeWidth={1} style={{ color: Theme.accent, marginBottom: "2rem" }} />
                        <h2 style={{ 
                            fontFamily: "Playfair Display", fontSize: "clamp(2.5rem, 6vw, 5rem)",
                            maxWidth: "900px", margin: "0 auto", lineHeight: 1.1, fontWeight: 400
                        }}>
                            Let’s weave something <br />
                            <em style={{ color: Theme.accent, fontStyle: "italic" }}>extraordinary</em>.
                        </h2>
                    </div>

                    <a href="mailto:Jiyavegad15@gmail.com" className="cta-button" style={{ 
                        background: Theme.accent, border: "none" 
                    }}>
                        SEND A MESSAGE
                    </a>

                    <div style={{ marginTop: "10rem", paddingTop: "4rem", borderTop: "1px solid rgba(255,255,255,0.05)", 
                        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem" 
                    }}>
                        <p style={{ fontFamily: "Inter", fontSize: "0.7rem", letterSpacing: 2, opacity: 0.5 }}>© JIYA — DESIGNER PORTFOLIO</p>
                        <div style={{ display: "flex", gap: "2rem" }}>
                            <Instagram size={18} />
                            <Linkedin size={18} />
                            <Sparkles size={18} />
                        </div>
                    </div>
                </Reveal>
            </footer>
        </div>
    );
};

export default App;