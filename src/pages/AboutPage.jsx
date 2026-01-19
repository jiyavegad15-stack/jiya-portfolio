import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Sparkles, ArrowRight, Mail, Instagram, Linkedin,
    Activity, PersonStanding, Headphones, Plane, Menu, X
} from "lucide-react";

import ProfilePic from "../assets/profile3.png";

const Theme = {
    bg: "#FFFEFB",
    dark: "#1A3A47",
    red: "#F16D55",
    text: "#2C3E50",
    secondary: "#E8C07D",
    glass: "rgba(255, 255, 255, 0.75)",
};

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lora:wght@400;500&display=swap');

:root {
    --container-max: 1440px;
    --section-spacing: clamp(4rem, 12vh, 10rem);
    --transition-main: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

* { 
    box-sizing: border-box; 
    -webkit-font-smoothing: antialiased;
}

html { 
    scroll-behavior: smooth;
    font-size: 16px; /* Base for rem units */
}

body {
    background-color: ${Theme.bg};
    color: ${Theme.text};
    margin: 0;
    font-family: 'Lora', serif;
    overflow-x: hidden;
    width: 100%;
}

/* Custom Cursor - Hidden on Touch Devices */
.cursor-dot, .cursor-outline {
    position: fixed;
    pointer-events: none;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
}
.cursor-dot { width: 6px; height: 6px; background: ${Theme.red}; }
.cursor-outline {
    width: 34px;
    height: 34px;
    border: 1px solid ${Theme.red}60;
    transition: transform 0.1s ease-out;
}

@media (pointer: coarse) {
    .cursor-dot, .cursor-outline { display: none; }
}

.reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: var(--transition-main);
}
.reveal.visible {
    opacity: 1;
    transform: translateY(0);
}

.hero-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 500px), 1fr));
    gap: clamp(2rem, 5vw, 5rem);
    align-items: center;
    min-height: calc(100vh - 80px);
}

.hero-stage {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.glass-arch {
    width: min(100%, 450px);
    aspect-ratio: 1 / 1.25;
    background: linear-gradient(135deg, ${Theme.secondary}15, #fff);
    backdrop-filter: blur(10px);
    border-radius: 50% 50% 10% 10% / 40% 40% 10% 10%;
    border: 1px solid white;
    box-shadow: 0 30px 60px rgba(0,0,0,0.05);
}

.hero-img {
    position: absolute;
    bottom: 0;
    width: min(110%, 500px);
    height: auto;
    filter: drop-shadow(0 20px 30px rgba(0,0,0,0.1));
    z-index: 2;
}

.interest-card {
    background: white;
    padding: 2.5rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border: 1px solid rgba(0,0,0,0.03);
    transition: var(--transition-main);
}

.interest-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.04);
}

/* Responsive Overrides */
@media (max-width: 1024px) {
    .hero-grid { text-align: center; }
    .hero-stage { order: -1; padding-bottom: 3rem; }
    .hero-content { display: flex; flex-direction: column; align-items: center; }
}

@media (max-width: 480px) {
    .hero-img { width: 100%; }
}
`;

const CustomCursor = () => {
    const dot = useRef(null);
    const outline = useRef(null);

    useEffect(() => {
        const move = e => {
            if (dot.current && outline.current) {
                dot.current.style.left = `${e.clientX}px`;
                dot.current.style.top = `${e.clientY}px`;
                outline.current.style.left = `${e.clientX}px`;
                outline.current.style.top = `${e.clientY}px`;
            }
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);

    return (
        <>
            <div ref={dot} className="cursor-dot" />
            <div ref={outline} className="cursor-outline" />
        </>
    );
};

const Reveal = ({ children, delay = 0 }) => {
    const ref = useRef(null);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add("visible"), delay * 100);
            }
        }, { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [delay]);
    return <div ref={ref} className="reveal">{children}</div>;
};

const Navbar = () => {
    const { pathname } = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    
    const items = [
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
            position: "sticky", top: 0, zIndex: 1000,
            background: "rgba(255,255,251,0.9)", backdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(0,0,0,0.05)"
        }}>
            <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 5%", height: "80px"
            }}>
                <Link to="/main2" style={{
                    fontFamily: "Playfair Display", fontSize: "1.5rem",
                    color: Theme.dark, textDecoration: "none", fontWeight: 700
                }}>JIYA</Link>

                {/* Desktop Menu */}
                <div style={{ display: "none", gap: "0.5rem" }} className="desktop-nav">
                    <style>{`@media (min-width: 850px) { .desktop-nav { display: flex !important; } }`}</style>
                    {items.map(i => (
                        <Link key={i.name} to={i.path} style={{
                            padding: "0.5rem 1.2rem", borderRadius: 20,
                            textDecoration: "none", fontSize: "0.9rem",
                            color: pathname === i.path ? "#fff" : Theme.text,
                            background: pathname === i.path ? Theme.dark : "transparent",
                            transition: "0.3s"
                        }}>
                            {i.name}
                        </Link>
                    ))}
                </div>

                    <div style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}>
                        <a
                            href="https://www.instagram.com/jiya_vegad"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            style={{ display: "flex", alignItems: "center", color: "inherit" }}
                        >
                            <Instagram size={18} className="social-icon" />
                        </a>

                        <button 
                            onClick={() => setIsOpen(!isOpen)}
                            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                            className="mobile-toggle"
                        >
                            <style>{`@media (min-width: 850px) { .mobile-toggle { display: none; } }`}</style>
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

            </div>

            {/* Mobile Sidebar */}
            {isOpen && (
                <div style={{
                    position: "absolute", top: "100%", left: 0, width: "100%",
                    background: "#fff", padding: "2rem", borderBottom: `1px solid ${Theme.dark}10`,
                    display: "flex", flexDirection: "column", gap: "1.5rem", zIndex: 999
                }}>
                    {items.map(i => (
                        <Link key={i.name} to={i.path} onClick={() => setIsOpen(false)} style={{
                            textDecoration: "none", color: Theme.dark, fontSize: "1.2rem", fontWeight: 500
                        }}>
                            {i.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
};

const AboutPage = () => {
    return (
        <div style={{ width: "100%" }}>
            <style>{styles}</style>
            <CustomCursor />
            <Navbar />

            <section style={{ 
                padding: "0 5%", maxWidth: "var(--container-max)", 
                margin: "0 auto", overflow: "hidden" 
            }}>
                <div className="hero-grid">
                    <div className="hero-content">
                        <Reveal>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, color: Theme.red, marginBottom: "1.5rem" }}>
                                <div style={{ height: 1, width: 40, background: Theme.red }} />
                                <span style={{ letterSpacing: 3, fontWeight: 700, fontSize: "0.7rem", textTransform: "uppercase" }}>
                                    Designer & Storyteller
                                </span>
                            </div>
                        </Reveal>

                        <Reveal delay={1}>
                            <h1 style={{
                                fontSize: "clamp(2.5rem, 8vw, 5rem)",
                                fontFamily: "Playfair Display",
                                color: Theme.dark, lineHeight: 1.1, margin: "0 0 2rem"
                            }}>
                                Weaving <em style={{ color: Theme.red, fontStyle: "italic", fontWeight: 400 }}>Fantasy</em><br />
                                into Every Thread.
                            </h1>
                        </Reveal>

                        <Reveal delay={2}>
                            <p style={{ 
                                maxWidth: 540, lineHeight: 1.8, fontSize: "clamp(1rem, 2vw, 1.1rem)", 
                                color: "#555", marginBottom: "3rem" 
                            }}>
                                A creative fashion designer drawn to fantasy-driven storytelling
                                and sustainable design. Travel, music, and dance keep my
                                ideas fresh and expressive.
                            </p>
                        </Reveal>

                        <Reveal delay={3}>
                            <Link to="/work" style={{
                                padding: "1.2rem 3rem", background: Theme.dark,
                                color: "#fff", borderRadius: 2, textDecoration: "none",
                                display: "inline-flex", alignItems: "center", gap: 12,
                                fontWeight: 500, letterSpacing: 1, transition: "0.3s"
                            }}>
                                EXPLORE WORK <ArrowRight size={18} />
                            </Link>
                        </Reveal>
                    </div>

                    <div className="hero-stage">
                        <div className="glass-arch" />
                        <img src={ProfilePic} alt="Jiya" className="hero-img" />
                    </div>
                </div>
            </section>

            <section style={{ background: "#FDFCF9", padding: "var(--section-spacing) 5%" }}>
                <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                    <Reveal>
                        <h2 style={{
                            fontFamily: "Dancing Script", fontSize: "clamp(3.5rem, 10vw, 6rem)",
                            color: Theme.red, margin: "0 0 4rem", textAlign: "center"
                        }}>Interests</h2>
                    </Reveal>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))",
                        gap: "2rem"
                    }}>
                        {[
                            { icon: <Activity/>, title: "Move & Play", text: "A few favourite sports — just for fun and vitality." },
                            { icon: <PersonStanding/>, title: "Dance", text: "Movement as a form of soulful self-expression." },
                            { icon: <Headphones/>, title: "Music", text: "Curated playlists for every creative mood and flow." },
                            { icon: <Plane/>, title: "Travel", text: "Discovering new textures and global heritage stories." }
                        ].map((i, k) => (
                            <Reveal key={k} delay={k}>
                                <div className="interest-card">
                                    <div style={{ color: Theme.red, marginBottom: "1.5rem" }}>
                                        {React.cloneElement(i.icon, { size: 32, strokeWidth: 1.5 })}
                                    </div>
                                    <h3 style={{ fontFamily: "Playfair Display", fontSize: "1.5rem", marginBottom: "1rem" }}>{i.title}</h3>
                                    <p style={{ color: "#666", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>{i.text}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <footer style={{
                background: Theme.dark, color: "#fff",
                textAlign: "center", padding: "var(--section-spacing) 5%"
            }}>
                <Reveal>
                    <Mail size={40} color={Theme.secondary} style={{ marginBottom: "1.5rem" }} />
                    <h2 style={{ 
                        fontFamily: "Playfair Display", fontSize: "clamp(1.8rem, 5vw, 3rem)",
                        maxWidth: 750, margin: "0 auto 3rem", fontWeight: 400
                    }}>
                        Let’s weave something <em style={{ color: Theme.secondary }}>extraordinary</em>.
                    </h2>
                    <a href="mailto:Jiyavegad15@gmail.com" style={{
                        padding: "1.2rem 3.5rem", background: Theme.red,
                        color: "#fff", textDecoration: "none", fontWeight: 600,
                        borderRadius: 4, transition: "0.3s", display: "inline-block"
                    }}>
                        Send a Message
                    </a>
                </Reveal>
            </footer>
        </div>
    );
};

export default AboutPage;