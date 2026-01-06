import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
    Home, User, Briefcase, FileText, Palette, 
    Heart, MapPin, Scissors, ArrowRight, Star, 
    Sparkles, Mail, Instagram, Linkedin, 
    Award, Globe, Leaf, Zap, Activity,
} from "lucide-react";


// IMPORTANT: Ensure this matches your file path exactly
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

// 🌟 STYLES & GLOBAL ANIMATIONS
const styles = `
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');

html { scroll-behavior: smooth; }
body {
    background-color: ${Theme.bg};
    overflow-x: hidden;
    cursor: none; 
    color: ${Theme.text};
    margin: 0;
}

/* Custom Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: ${Theme.bg}; }
::-webkit-scrollbar-thumb { background: ${Theme.dark}20; border-radius: 10px; }

/* --- CURSOR --- */
.cursor-dot, .cursor-outline {
    position: fixed; top: 0; left: 0;
    transform: translate(-50%, -50%);
    border-radius: 50%; z-index: 9999; pointer-events: none;
}
.cursor-dot { width: 8px; height: 8px; background-color: ${Theme.red}; }
.cursor-outline {
    width: 40px; height: 40px;
    border: 1px solid ${Theme.dark}40;
    transition: width 0.3s, height 0.3s, background-color 0.3s;
}

/* --- NAVIGATION --- */
.nav-pill {
    position: relative;
    padding: 0.6rem 1.4rem;
    border-radius: 30px;
    color: ${Theme.text};
    text-decoration: none;
    font-family: 'Lora', serif;
    font-weight: 500;
    font-size: 0.9rem;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    display: flex; align-items: center; gap: 8px;
}
.nav-pill:hover { color: ${Theme.red}; background: ${Theme.red}08; }
.nav-pill.active {
    background: ${Theme.dark};
    color: white;
    box-shadow: 0 10px 20px rgba(26, 58, 71, 0.2);
}

/* --- HERO COMPONENTS --- */
.hero-stage {
    perspective: 2000px;
    width: 100%; height: 650px;
    position: relative;
    display: flex; justify-content: center; align-items: center;
}
.glass-arch {
    width: 400px; height: 520px;
    background: linear-gradient(160deg, rgba(255,255,255,0.7), rgba(255,255,255,0.2));
    backdrop-filter: blur(15px);
    border: 1px solid white;
    border-radius: 220px 220px 40px 40px;
    box-shadow: 0 40px 80px rgba(0,0,0,0.03);
    position: relative; z-index: 1;
}
.hero-img {
    width: 130%; max-width: 600px;
    position: absolute; bottom: -30px; left: 50%;
    filter: drop-shadow(0 40px 50px rgba(26, 58, 71, 0.3));
    z-index: 5;
    pointer-events: none;
}

/* Grain Overlay */
.grain-overlay {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 1; opacity: 0.25;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E");
}

/* Animations */
.reveal { opacity: 0; transform: translateY(40px); transition: all 1s cubic-bezier(0.215, 0.61, 0.355, 1); }
.reveal.visible { opacity: 1; transform: translateY(0); }

@keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(2deg); }
}

@media (max-width: 1024px) {
    .nav-center { display: none !important; }
    .cursor-dot, .cursor-outline { display: none; }
    body { cursor: auto; }
}
`;

// 🖱️ MOUSE UTILITIES
const CustomCursor = () => {
    const cursorDotRef = useRef(null);
    const cursorOutlineRef = useRef(null);

    useEffect(() => {
        const moveCursor = (e) => {
            const { clientX, clientY } = e;
            if (cursorDotRef.current) {
                cursorDotRef.current.style.left = `${clientX}px`;
                cursorDotRef.current.style.top = `${clientY}px`;
            }
            if (cursorOutlineRef.current) {
                cursorOutlineRef.current.animate(
                    { left: `${clientX}px`, top: `${clientY}px` }, 
                    { duration: 500, fill: "forwards" }
                );
            }
        };
        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, []);

    return (
        <>
            <div ref={cursorDotRef} className="cursor-dot"></div>
            <div ref={cursorOutlineRef} className="cursor-outline"></div>
        </>
    );
};

// 👀 VIEWPORT DETECTION
const Reveal = ({ children, delay = 0 }) => {
    const ref = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add("visible"), delay * 150);
            }
        }, { threshold: 0.1 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [delay]);
    return <div ref={ref} className="reveal">{children}</div>;
};

// 🧭 HEADER
const Navbar = () => {
    const location = useLocation();
    const navItems = [
        { name: 'Home', path: '/main2' },
        { name: 'About', path: '/about' },
        { name: 'Work', path: '/work' },
        { name: 'Process', path: '/process' },
    ];

    return (
        <nav style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
            background: 'rgba(255, 254, 251, 0.85)', backdropFilter: 'blur(12px)',
            borderBottom: `1px solid rgba(26, 58, 71, 0.05)`
        }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/main2" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: Theme.dark, textDecoration: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '35px', height: '35px', background: Theme.red, borderRadius: '50%', display: 'grid', placeItems: 'center' }}>
                        <Star fill="white" color="white" size={18} />
                    </div>
                    <span>JIYA</span>
                </Link>

                <div className="nav-center" style={{ display: 'flex', gap: '0.5rem', background: 'rgba(26, 58, 71, 0.03)', padding: '5px', borderRadius: '40px' }}>
                    {navItems.map((item) => (
                        <Link key={item.name} to={item.path} className={`nav-pill ${location.pathname === item.path ? 'active' : ''}`}>
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
                    <a href="#" style={{ color: Theme.dark }}><Instagram size={18}/></a>
                    <a href="#" style={{ color: Theme.dark }}><Linkedin size={18}/></a>
                </div>
            </div>
        </nav>
    );
};

// 🏞️ MAIN COMPONENT
const AboutPage = () => {
    const heroRef = useRef(null);
    const imageRef = useRef(null);
    const glassRef = useRef(null);

    // Parallax logic
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!heroRef.current) return;
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth - 0.5) * 2;
            const y = (clientY / window.innerHeight - 0.5) * 2;

            requestAnimationFrame(() => {
                if(imageRef.current) imageRef.current.style.transform = `translateX(-50%) translate3d(${x * -20}px, ${y * -20}px, 0)`;
                if(glassRef.current) glassRef.current.style.transform = `rotateY(${x * 5}deg) rotateX(${y * -5}deg)`;
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div style={{ backgroundColor: Theme.bg, minHeight: "100vh", position: "relative" }}>
            <style>{styles}</style>
            <div className="grain-overlay"></div>
            <CustomCursor />
            <Navbar />

            {/* --- HERO SECTION --- */}
            <section style={{ maxWidth: "1400px", margin: "0 auto", padding: "140px 2rem 80px", position: "relative", zIndex: 2 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "4rem", alignItems: "center" }} className="hero-grid">
                    
                    <div style={{ zIndex: 10 }}>
                        <Reveal>
                            <span style={{ color: Theme.red, fontWeight: 700, letterSpacing: "2px", fontSize: "0.8rem", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem" }}>
                                <Sparkles size={16} /> Haute Couture & Sustainability
                            </span>
                        </Reveal>
                        
                        <Reveal delay={1}>
                            <h1 style={{ fontSize: "clamp(3rem, 6vw, 5.2rem)", fontFamily: "'Playfair Display', serif", lineHeight: "1.1", color: Theme.dark, marginBottom: "2rem" }}>
                                Weaving <span style={{ fontStyle: "italic", fontWeight: 400, color: Theme.red }}>Fantasy</span> <br/>
                                into Every Thread.
                            </h1>
                        </Reveal>

                        <Reveal delay={2}>
                            <p style={{ fontSize: "1.15rem", lineHeight: "1.8", color: Theme.text, opacity: 0.85, maxWidth: "580px", marginBottom: "3rem", fontFamily: "'Lora', serif" }}>
                                A creative fashion designer drawn to fantasy-driven storytelling and sustainable design. 
                                I experiment, learn, and create through hands-on processes, while travel, music, dance, 
                                and sports keep my mind open, balanced, and inspired to develop innovative design solutions.

                            </p>
                        </Reveal>

                        <Reveal delay={3}>
                            <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
                                <Link to="/work" style={{ 
                                    padding: "1.2rem 2.8rem", background: Theme.dark, color: "white", 
                                    textDecoration: "none", borderRadius: "50px", fontWeight: "500",
                                    display: "flex", alignItems: "center", gap: "12px", transition: "0.3s",
                                    boxShadow: `0 15px 30px ${Theme.dark}30`
                                }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-5px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
                                    Explore Work <ArrowRight size={18} />
                                </Link>
                                <a href="mailto:hello@jiya.com" style={{ color: Theme.dark, textDecoration: "none", fontWeight: "600", borderBottom: `2px solid ${Theme.red}` }}>
                                    Get in touch
                                </a>
                            </div>
                        </Reveal>
                    </div>

                    <div className="hero-stage" ref={heroRef}>
                        {/* Glow Effect */}
                        <div style={{ position: "absolute", width: "500px", height: "500px", background: `radial-gradient(circle, ${Theme.secondary}30, transparent 70%)`, borderRadius: "50%", filter: "blur(60px)", zIndex: 0 }}></div>
                        
                        <div ref={glassRef} className="glass-arch"></div>
                        
                        <img ref={imageRef} src={ProfilePic} alt="Jiya" className="hero-img" />
                        
                        {/* Floating Interactive Badges */}
                        <div style={{ position: "absolute", top: "20%", right: "-5%", background: "white", padding: "12px 20px", borderRadius: "100px", boxShadow: "0 15px 35px rgba(0,0,0,0.08)", zIndex: 12, animation: "float 6s infinite ease-in-out", display: "flex", alignItems: "center", gap: "10px" }}>
                            <Leaf size={16} color="#4CAF50" /> <span style={{ fontWeight: 600, fontSize: "0.85rem" }}>Sustainable Art</span>
                        </div>
                        <div style={{ position: "absolute", bottom: "20%", left: "-10%", background: "white", padding: "12px 20px", borderRadius: "100px", boxShadow: "0 15px 35px rgba(0,0,0,0.08)", zIndex: 12, animation: "float 5s infinite ease-in-out reverse", display: "flex", alignItems: "center", gap: "10px" }}>
                            <Zap size={16} color={Theme.red} /> <span style={{ fontWeight: 600, fontSize: "0.85rem" }}>Slow Fashion</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- STATS BAR --- */}
            {/* <div style={{ background: Theme.dark, color: "white", padding: "5rem 2rem", position: "relative", zIndex: 2 }}>
                <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", textAlign: "center", gap: "3rem" }}>
                    {[
                        { icon: <Award />, label: "Exhibitions", val: "14+" },
                        { icon: <Globe />, label: "Global Stockists", val: "08" },
                        { icon: <Heart />, label: "Artisan Partners", val: "25+" },
                    ].map((stat, i) => (
                        <Reveal key={i} delay={i}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                                <div style={{ color: Theme.secondary }}>{stat.icon}</div>
                                <div style={{ fontSize: "2.5rem", fontWeight: "700", fontFamily: "'Playfair Display'" }}>{stat.val}</div>
                                <div style={{ opacity: 0.6, textTransform: "uppercase", letterSpacing: "1px", fontSize: "0.8rem" }}>{stat.label}</div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div> */}

            {/* --- PHILOSOPHY --- */}
            <section style={{ maxWidth: "1200px", margin: "100px auto", padding: "0 2rem", position: "relative", zIndex: 2 }}>
                <div style={{ textAlign: "center", marginBottom: "5rem" }}>
                    <Reveal>
                        <span style={{ fontFamily: "'Dancing Script', cursive", fontSize: "6rem", color: Theme.red }}>Intrest</span>
                        {/* <h2 style={{ fontSize: "3.5rem", fontFamily: "'Playfair Display', serif", color: Theme.dark, marginTop: "0.5rem" }}>Ethical Craftsmanship</h2> */}
                    </Reveal>
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem" }}>
                    {[
                        { 
                            icon: <Activity size={32} />, 
                            title: "Move & Play", 
                            text: "Loves staying active with a few favorite sports — not all of them, just the fun ones!" 
                            },
                            { 
                            icon: <Scissors size={32} />, 
                            title: "Dance It Out", 
                            text: "Dances like nobody’s watching (even when they totally are)." 
                            },
                            { 
                            icon: <Sparkles size={32} />, 
                            title: "Music on Repeat", 
                            text: "Always has a song playing — playlists for every mood and moment." 
                            },
                            { 
                            icon: <Scissors size={32} />, 
                            title: "Wander Often", 
                            text: "Loves traveling for new places, good food, and stories worth remembering." 
                        },

                    ].map((item, index) => (
                        <Reveal delay={index} key={index}>
                            <div 
                                style={{ 
                                    padding: "3.5rem 2.5rem", background: "#fff", border: "1px solid rgba(0,0,0,0.05)", 
                                    borderRadius: "4px", transition: "0.4s cubic-bezier(0.165, 0.84, 0.44, 1)" 
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.borderColor = Theme.secondary;
                                    e.currentTarget.style.transform = "translateY(-12px)";
                                    e.currentTarget.style.boxShadow = "0 30px 60px rgba(0,0,0,0.05)";
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.05)";
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.boxShadow = "none";
                                }}
                            >
                                <div style={{ color: Theme.red, marginBottom: "1.5rem" }}>{item.icon}</div>
                                <h3 style={{ fontSize: "1.6rem", marginBottom: "1.2rem", fontFamily: "'Playfair Display', serif", color: Theme.dark }}>{item.title}</h3>
                                <p style={{ lineHeight: "1.8", color: Theme.text, opacity: 0.7 }}>{item.text}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* --- FOOTER CTA --- */}
            <footer style={{ 
                background: `linear-gradient(rgba(16, 37, 45, 0.95), rgba(16, 37, 45, 0.95)), url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 86c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`, 
                color: "white", padding: "120px 2rem", textAlign: "center", position: "relative", zIndex: 2 
            }}>
                <Reveal>
                    <Mail size={40} color={Theme.secondary} style={{ marginBottom: "2rem" }} />
                    <h2 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", fontFamily: "'Playfair Display'", marginBottom: "2rem", maxWidth: "800px", margin: "0 auto 2rem" }}>
                        Let’s weave something <span style={{ fontStyle: "italic", color: Theme.secondary }}>extraordinary</span>.
                    </h2>
                    <a href="mailto:jiya@example.com" style={{ 
                        display: "inline-block", padding: "1.4rem 4rem", background: Theme.red, 
                        color: "white", textDecoration: "none", fontSize: "1.1rem", fontWeight: "600",
                        borderRadius: "2px", transition: "0.3s", boxShadow: `0 15px 35px ${Theme.red}40`
                    }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                        Send a Message
                    </a>
                </Reveal>
            </footer>

            {/* Mobile Responsive Helper Style */}
            <style>{`
                @media(max-width: 900px){ 
                    .hero-grid { grid-template-columns: 1fr !important; text-align: center; } 
                    .hero-grid > div { display: flex; flex-direction: column; align-items: center; }
                    .hero-stage { height: 450px; margin-top: 50px; }
                    .glass-arch { width: 280px; height: 380px; }
                }
            `}</style>
        </div>
    );
};

export default AboutPage;