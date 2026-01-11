import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Sparkles, ArrowRight, Mail, Instagram, Linkedin,
    Activity, Scissors
} from "lucide-react";

import ProfilePic from "../assets/profile3.png";

// 🎨 DESIGN SYSTEM
const Theme = {
    bg: "#FFFEFB",
    dark: "#1A3A47",
    red: "#F16D55",
    text: "#2C3E50",
    secondary: "#E8C07D",
    mutedAqua: "#A9C4C3",
    glass: "rgba(255, 255, 255, 0.7)",
    glassBorder: "rgba(255, 255, 255, 0.8)",
    accent: "#D4AF37"
};

// 🌟 GLOBAL STYLES
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Playfair+Display:wght@400;700&family=Lora:wght@400;500&display=swap');

html { scroll-behavior: smooth; }
body {
    background-color: ${Theme.bg};
    color: ${Theme.text};
    margin: 0;
    cursor: none;
    overflow-x: hidden;
}

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-thumb { background: ${Theme.dark}30; border-radius: 10px; }

/* Cursor */
.cursor-dot, .cursor-outline {
    position: fixed;
    pointer-events: none;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
}
.cursor-dot { width: 8px; height: 8px; background: ${Theme.red}; }
.cursor-outline {
    width: 40px;
    height: 40px;
    border: 1px solid ${Theme.dark}40;
    transition: 0.3s ease;
}

/* Reveal */
.reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: 1s cubic-bezier(0.215, 0.61, 0.355, 1);
}
.reveal.visible {
    opacity: 1;
    transform: translateY(0);
}

/* Hero */
.hero-stage {
    perspective: 2000px;
    height: 650px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.glass-arch {
    width: 400px;
    height: 520px;
    background: linear-gradient(160deg, rgba(255,255,255,0.7), rgba(255,255,255,0.2));
    backdrop-filter: blur(15px);
    border-radius: 220px 220px 40px 40px;
}
.hero-img {
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    width: 130%;
    max-width: 600px;
    filter: drop-shadow(0 40px 50px rgba(26,58,71,0.3));
}

/* Mobile */
@media(max-width:900px){
    body { cursor: auto; }
    .cursor-dot, .cursor-outline { display:none; }
    .hero-stage { height: 450px; }
    .glass-arch { width: 280px; height: 380px; }
}
`;

// 🖱️ Cursor
const CustomCursor = () => {
    const dot = useRef(null);
    const outline = useRef(null);

    useEffect(() => {
        const move = e => {
            dot.current.style.left = `${e.clientX}px`;
            dot.current.style.top = `${e.clientY}px`;
            outline.current.animate(
                { left: `${e.clientX}px`, top: `${e.clientY}px` },
                { duration: 500, fill: "forwards" }
            );
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

// 👀 Reveal
const Reveal = ({ children, delay = 0 }) => {
    const ref = useRef(null);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting)
                setTimeout(() => e.target.classList.add("visible"), delay * 150);
        });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [delay]);
    return <div ref={ref} className="reveal">{children}</div>;
};

// 🧭 Navbar
const Navbar = () => {
    const { pathname } = useLocation();
    const items = [
        { name: "Home", path: "/main2" },
        { name: "About", path: "/about" },
        { name: "Experience", path: "/work" },
        { name: "Process", path: "/process" }
    ];

    return (
        <nav style={{
            position: "fixed",
            top: 0, left: 0, right: 0,
            backdropFilter: "blur(12px)",
            background: "rgba(255,254,251,0.85)",
            zIndex: 1000
        }}>
            <div style={{
                maxWidth: 1400,
                margin: "0 auto",
                padding: "1rem 2rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Link to="/main2" style={{
                    fontFamily: "Playfair Display",
                    fontSize: "1.5rem",
                    color: Theme.dark,
                    textDecoration: "none",
                    fontWeight: 700
                }}>JIYA</Link>

                <div style={{ display: "flex", gap: "1rem" }}>
                    {items.map(i => (
                        <Link key={i.name} to={i.path}
                            style={{
                                padding: "0.6rem 1.4rem",
                                borderRadius: 30,
                                textDecoration: "none",
                                color: pathname === i.path ? "#fff" : Theme.text,
                                background: pathname === i.path ? Theme.dark : "transparent"
                            }}>
                            {i.name}
                        </Link>
                    ))}
                </div>

                <div style={{ display: "flex", gap: "1rem" }}>
                    <Instagram size={18} />
                    <Linkedin size={18} />
                </div>
            </div>
        </nav>
    );
};

// 🏞️ PAGE
const AboutPage = () => {
    const hero = useRef(null);
    const img = useRef(null);
    const glass = useRef(null);

    useEffect(() => {
        const move = e => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            img.current.style.transform =
                `translateX(-50%) translate(${x * -20}px, ${y * -20}px)`;
            glass.current.style.transform =
                `rotateY(${x * 5}deg) rotateX(${y * -5}deg)`;
        };
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);

    return (
        <div>
            <style>{styles}</style>
            <CustomCursor />
            <Navbar />

            {/* HERO */}
            <section style={{ padding: "140px 2rem 80px", maxWidth: 1400, margin: "0 auto" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "4rem" }}>

                    <div>
                        <Reveal>
                            <span style={{ color: Theme.red, letterSpacing: 2, fontWeight: 700 }}>
                                <Sparkles size={14} /> Haute Couture & Sustainability
                            </span>
                        </Reveal>

                        <Reveal delay={1}>
                            <h1 style={{
                                fontSize: "clamp(3rem,6vw,5rem)",
                                fontFamily: "Playfair Display",
                                color: Theme.dark
                            }}>
                                Weaving <em style={{ color: Theme.red }}>Fantasy</em><br />
                                into Every Thread.
                            </h1>
                        </Reveal>

                        <Reveal delay={2}>
                            <p style={{ maxWidth: 580, lineHeight: 1.8 }}>
                                A creative fashion designer drawn to fantasy-driven storytelling
                                and sustainable design. Travel, music, dance and sports keep my
                                ideas fresh and expressive.
                            </p>
                        </Reveal>

                        <Reveal delay={3}>
                            <Link to="/work" style={{
                                padding: "1.2rem 3rem",
                                background: Theme.dark,
                                color: "#fff",
                                borderRadius: 50,
                                textDecoration: "none",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 12
                            }}>
                                Explore Work <ArrowRight size={18} />
                            </Link>
                        </Reveal>
                    </div>

                    <div className="hero-stage" ref={hero}>
                        <div ref={glass} className="glass-arch" />
                        <img ref={img} src={ProfilePic} alt="Jiya" className="hero-img" />
                    </div>
                </div>
            </section>

            {/* INTERESTS */}
            <section style={{ maxWidth: 1200, margin: "100px auto", padding: "0 2rem" }}>
                <Reveal>
                    <span style={{
                        fontFamily: "Dancing Script",
                        fontSize: "5rem",
                        color: Theme.red
                    }}>Interest</span>
                </Reveal>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
                    gap: "2rem",
                    marginTop: "4rem"
                }}>
                    {[
                        { icon: <Activity />, title: "Move & Play", text: "A few favourite sports — just for fun." },
                        { icon: <Scissors />, title: "Dance", text: "Movement as self-expression." },
                        { icon: <Sparkles />, title: "Music", text: "Playlists for every mood." },
                        { icon: <Scissors />, title: "Travel", text: "New places, textures and stories." }
                    ].map((i, k) => (
                        <Reveal key={k} delay={k}>
                            <div style={{
                                background: "#fff",
                                padding: "3rem",
                                border: "1px solid rgba(0,0,0,0.05)"
                            }}>
                                <div style={{ color: Theme.red }}>{i.icon}</div>
                                <h3 style={{ fontFamily: "Playfair Display" }}>{i.title}</h3>
                                <p>{i.text}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* FOOTER */}
            <footer style={{
                background: Theme.dark,
                color: "#fff",
                textAlign: "center",
                padding: "120px 2rem"
            }}>
                <Mail size={40} color={Theme.secondary} />
                <h2 style={{ fontFamily: "Playfair Display", margin: "2rem 0" }}>
                    Let’s weave something <em style={{ color: Theme.secondary }}>extraordinary</em>.
                </h2>
                <a href="mailto:jiya@example.com" style={{
                    padding: "1.2rem 3rem",
                    background: Theme.red,
                    color: "#fff",
                    textDecoration: "none"
                }}>
                    Send a Message
                </a>
            </footer>
        </div>
    );
};

export default AboutPage;
