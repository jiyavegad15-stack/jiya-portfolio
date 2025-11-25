[file name]: image.png
[file content begin]
Home    About    Scroll to explore    Work    CV


[file content end]

import React from "react";
import { Link } from "react-router-dom";
import { Zap, Github, Instagram, Linkedin, Sparkles, Palette, Scissors, Heart, ArrowRight, BookOpen, MapPin, Home, User, Briefcase, FileText } from "lucide-react";
import ConceptSketch from "../components/ConceptSketch";

// 🎨 REFINED COLOR PALETTE
const Theme = {
    DARK_TEAL: "#244855",
    WARM_RED: "#E64833",
    MUDDY_BROWN: "#874F41",
    MUTED_AQUA: "#90AEAD",
    SOFT_BEIGE: "#FBE9D0",
    CREAM_WHITE: "#FFFDF8"
};

// 🌿 ELEGANT ANIMATIONS
const animationsCSS = `
@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInLeft {
  0% { opacity: 0; transform: translateX(-40px); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes fadeInRight {
  0% { opacity: 0; transform: translateX(40px); }
  100% { opacity: 1; transform: translateX(0); }
}

@keyframes gentlePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
.animate-fadeInLeft { animation: fadeInLeft 0.8s ease-out forwards; }
.animate-fadeInRight { animation: fadeInRight 0.8s ease-out forwards; }
.animate-pulse { animation: gentlePulse 3s ease-in-out infinite; }
`;

// 🌿 PREMIUM STYLES
const AboutStyles = {
    Box: {
        backgroundColor: Theme.DARK_TEAL,
        width: "100vw",
        minHeight: "100vh",
        color: Theme.SOFT_BEIGE,
        position: "relative",
        overflowX: "hidden",
        overflowY: "auto",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        background: `linear-gradient(135deg, ${Theme.DARK_TEAL} 0%, #1a3a47 100%)`,
        paddingBottom: "100px", // Added padding for bottom navbar
    },

    BackgroundElements: {
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
    },

    FloatingOrb: (size, color, top, left, opacity) => ({
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color}${opacity} 0%, transparent 70%)`,
        filter: "blur(40px)",
        top,
        left,
    }),

    ContentArea: {
        width: "52vw",
        position: "relative",
        left: "10%",
        zIndex: 2,
        paddingTop: "12%",
        paddingBottom: "6rem",
    },

    MainContentBox: {
        width: "100%",
        padding: "4rem 4.5rem",
        marginBottom: "3rem",
        borderLeft: `4px solid ${Theme.WARM_RED}`,
        background: `linear-gradient(135deg, 
            rgba(251, 233, 208, 0.08) 0%, 
            rgba(144, 174, 173, 0.05) 50%,
            rgba(135, 79, 65, 0.03) 100%)`,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderRadius: "24px",
        boxShadow: `
            0 25px 50px rgba(36, 72, 85, 0.3),
            inset 0 1px 0 rgba(251, 233, 208, 0.1),
            inset 0 0 0 1px rgba(251, 233, 208, 0.05)
        `,
        lineHeight: 1.7,
        fontSize: "1.15rem",
        position: "relative",
        overflow: "hidden",
    },

    InterestsContentBox: {
        width: "90%",
        padding: "3rem 3.5rem",
        border: `1.5px solid ${Theme.MUTED_AQUA}25`,
        background: `linear-gradient(135deg, 
            rgba(135, 79, 65, 0.08) 0%, 
            rgba(144, 174, 173, 0.06) 100%)`,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "20px",
        boxShadow: "0 20px 40px rgba(36, 72, 85, 0.25)",
        lineHeight: 1.65,
        fontSize: "1.05rem",
        position: "relative",
    },

    Heading: {
        fontSize: "3.5rem",
        fontWeight: 700,
        marginBottom: "2.5rem",
        color: Theme.SOFT_BEIGE,
        letterSpacing: "0.5px",
        fontFamily: "'Georgia', serif",
        background: `linear-gradient(135deg, ${Theme.SOFT_BEIGE} 0%, ${Theme.MUTED_AQUA} 100%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        lineHeight: "1.2",
    },

    SubHeading: {
        fontSize: "1.8rem",
        fontWeight: 600,
        marginTop: "3rem",
        marginBottom: "1.5rem",
        color: Theme.WARM_RED,
        display: "flex",
        alignItems: "center",
        gap: "16px",
        fontFamily: "'Georgia', serif",
    },

    Logo: {
        position: "fixed",
        top: "3rem",
        left: "4rem",
        zIndex: 50,
        fontSize: "2.4rem",
        fontWeight: "700",
        color: Theme.SOFT_BEIGE,
        display: "flex",
        alignItems: "center",
        gap: "14px",
        fontFamily: "'Georgia', serif",
        textDecoration: "none",
    },

    SocialIcons: {
        position: "fixed",
        top: "3rem",
        right: "4rem",
        display: "flex",
        gap: "1rem",
        zIndex: 50,
    },

    SocialIcon: {
        width: "46px",
        height: "46px",
        borderRadius: "50%",
        background: "rgba(251, 233, 208, 0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(12px)",
        border: `1.5px solid ${Theme.SOFT_BEIGE}20`,
        transition: "all 0.3s ease",
        cursor: "pointer",
        color: Theme.SOFT_BEIGE,
        textDecoration: "none",
    },

    PowerButton: {
        position: "fixed",
        top: "1.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${Theme.WARM_RED} 0%, ${Theme.MUDDY_BROWN} 100%)`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textDecoration: "none",
        boxShadow: `0 8px 30px ${Theme.WARM_RED}30`,
        zIndex: 60,
        transition: "all 0.3s ease",
    },

    BigTitle: {
        position: "fixed",
        top: "10%",
        left: "8%",
        fontSize: "15vh",
        fontWeight: "900",
        letterSpacing: "4px",
        opacity: 0.03,
        color: Theme.SOFT_BEIGE,
        pointerEvents: "none",
        zIndex: 0,
        fontFamily: "'Georgia', serif",
    },

    // 🌟 NEW BOTTOM NAVBAR STYLES
    BottomNavbar: {
        position: "fixed",
        bottom: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        gap: "2rem",
        padding: "1rem 2.5rem",
        background: "rgba(36, 72, 85, 0.7)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: "30px",
        border: `1px solid ${Theme.MUTED_AQUA}25`,
        boxShadow: "0 20px 40px rgba(36, 72, 85, 0.4)",
        zIndex: 100,
    },

    NavItem: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "0.8rem 1.5rem",
        borderRadius: "25px",
        color: Theme.SOFT_BEIGE,
        textDecoration: "none",
        fontSize: "1rem",
        fontWeight: "500",
        transition: "all 0.3s ease",
        fontFamily: "'Georgia', serif",
        position: "relative",
        overflow: "hidden",
    },

    ActiveNavItem: {
        background: `linear-gradient(135deg, ${Theme.WARM_RED}20, ${Theme.MUTED_AQUA}15)`,
        border: `1px solid ${Theme.WARM_RED}30`,
        color: Theme.WARM_RED,
    },
};

// 🌿 ENHANCED UI COMPONENTS
const LogoComponent = () => (
    <Link to="/" style={AboutStyles.Logo}>
        <div style={{
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${Theme.WARM_RED}, ${Theme.MUDDY_BROWN})`,
            boxShadow: `0 0 25px ${Theme.WARM_RED}40`,
        }}></div>
        JV
    </Link>
);

const SocialIcons = () => (
    <div style={AboutStyles.SocialIcons}>
        <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={AboutStyles.SocialIcon} 
            className="social-hover"
        >
            <Instagram size={22} />
        </a>
        <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={AboutStyles.SocialIcon} 
            className="social-hover"
        >
            <Linkedin size={22} />
        </a>
    </div>
);

const PowerButton = () => (
    <Link to="/main2" style={AboutStyles.PowerButton} className="power-hover">
        <Zap size={26} style={{ color: Theme.CREAM_WHITE }} />
    </Link>
);

const BackgroundElements = () => (
    <div style={AboutStyles.BackgroundElements}>
        <div style={AboutStyles.FloatingOrb("400px", Theme.WARM_RED, "15%", "10%", "08")} />
        <div style={AboutStyles.FloatingOrb("500px", Theme.MUTED_AQUA, "60%", "80%", "06")} />
        <div style={AboutStyles.FloatingOrb("300px", Theme.MUDDY_BROWN, "75%", "15%", "05")} />
    </div>
);

const BigTitle = () => (
    <h1 style={AboutStyles.BigTitle}>
        ABOUT
    </h1>
);

// 🌟 NEW BOTTOM NAVBAR COMPONENT
const BottomNavbar = () => (
    <nav style={AboutStyles.BottomNavbar}>
        <Link 
            to="/main2" 
            style={{
                ...AboutStyles.NavItem,
                ...AboutStyles.ActiveNavItem
            }}
            className="nav-hover"
        >
            <Home size={18} />
            Home
        </Link>
        
        <Link 
            to="/about" 
            style={AboutStyles.NavItem}
            className="nav-hover"
        >
            <User size={18} />
            About
        </Link>
        
        <Link 
            to="/work" 
            style={AboutStyles.NavItem}
            className="nav-hover"
        >
            <Briefcase size={18} />
            Work
        </Link>
        
        <Link 
            to="/cv" 
            style={AboutStyles.NavItem}
            className="nav-hover"
        >
            <FileText size={18} />
            CV
        </Link>
    </nav>
);

const IconBullet = ({ icon: Icon, text }) => (
    <li style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "16px",
        marginBottom: "16px",
        padding: "12px 0",
    }}>
        <div style={{
            width: "28px",
            height: "28px",
            borderRadius: "8px",
            background: `linear-gradient(135deg, ${Theme.WARM_RED}20, ${Theme.MUTED_AQUA}25)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginTop: "2px",
            border: `1px solid ${Theme.WARM_RED}30`,
        }}>
            <Icon size={16} color={Theme.WARM_RED} />
        </div>
        <span style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>{text}</span>
    </li>
);

const HighlightText = ({ children }) => (
    <strong style={{
        color: Theme.WARM_RED,
        background: `linear-gradient(135deg, ${Theme.WARM_RED}, ${Theme.MUDDY_BROWN})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        fontWeight: "600",
    }}>
        {children}
    </strong>
);

// 🌿 PREMIUM ABOUT PAGE
const AboutPage = () => {
    return (
        <div style={AboutStyles.Box}>
            <style>{animationsCSS}</style>

            {/* Enhanced Hover Effects */}
            <style>
                {`
                    .social-hover:hover {
                        transform: translateY(-2px);
                        background: rgba(251, 233, 208, 0.15);
                        border-color: ${Theme.WARM_RED}40;
                        box-shadow: 0 8px 25px rgba(230, 72, 51, 0.2);
                    }

                    .power-hover:hover {
                        transform: translateX(-50%) scale(1.05);
                        box-shadow: 0 12px 35px ${Theme.WARM_RED}40;
                    }

                    .content-hover:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 30px 60px rgba(36, 72, 85, 0.4);
                    }

                    .nav-hover:hover {
                        transform: translateY(-2px);
                        background: rgba(251, 233, 208, 0.1);
                        border: 1px solid ${Theme.MUTED_AQUA}30;
                        box-shadow: 0 8px 20px rgba(144, 174, 173, 0.2);
                    }

                    /* Fallback for browsers that don't support backdrop-filter */
                    @supports not (backdrop-filter: blur(12px)) {
                        .backdrop-fallback {
                            background: rgba(36, 72, 85, 0.95);
                        }
                    }
                `}
            </style>

            <BackgroundElements />
            <LogoComponent />
            <SocialIcons />
            <PowerButton />
            <BigTitle />

            {/* Right side Concept Sketch */}
            <ConceptSketch />

            {/* Main Content Containers */}
            <div style={AboutStyles.ContentArea}>
                
                {/* 1. Main Bio and Philosophy Box */}
                <div style={AboutStyles.MainContentBox} className="content-hover">
                    {/* Decorative Top Line */}
                    <div style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "1px",
                        background: `linear-gradient(90deg, transparent, ${Theme.WARM_RED}50, transparent)`,
                    }}></div>
                    
                    <h2 style={AboutStyles.Heading}>About Me</h2>

                    <p style={{ fontSize: "1.25rem", marginBottom: "2rem", opacity: 0.95, lineHeight: "1.8" }}>
                        I'm <HighlightText>Jiya Vegad</HighlightText>, a designer who weaves emotion, culture, 
                        and modern silhouettes into expressive fashion that tells compelling stories through fabric and form.
                    </p>

                    <p style={{ marginBottom: "2rem", opacity: 0.9, lineHeight: "1.8" }}>
                        My work explores identity, movement, and transformation through rich earth tones, 
                        sculptural lines, and artisanal techniques that bridge <HighlightText>traditional craftsmanship</HighlightText> 
                        with <HighlightText>contemporary design</HighlightText> sensibilities.
                    </p>
                    
                    <h3 style={AboutStyles.SubHeading}>
                        <Palette size={28} />
                        Design Philosophy
                    </h3>
                    
                    <ul style={{ marginLeft: "0.5rem", marginTop: "1rem", padding: 0, listStyle: "none" }}>
                        <IconBullet icon={Sparkles} text="Concept-based couture that tells emotional stories and explores human experiences" />
                        <IconBullet icon={Scissors} text="Craft-inspired silhouettes with modern sensibilities and sustainable practices" />
                        <IconBullet icon={BookOpen} text="Sustainable textile reinterpretation and innovation through traditional techniques" />
                    </ul>

                    {/* Philosophy Quote */}
                    <div style={{ 
                        marginTop: "3rem", 
                        padding: "2rem",
                        background: `linear-gradient(135deg, ${Theme.MUDDY_BROWN}12, ${Theme.WARM_RED}08)`,
                        borderRadius: "16px",
                        border: `1px solid ${Theme.MUTED_AQUA}25`,
                        fontStyle: "italic",
                        position: "relative",
                    }}>
                        <Heart size={24} style={{ 
                            position: "absolute", 
                            top: "-12px", 
                            left: "24px", 
                            color: Theme.WARM_RED,
                            background: Theme.DARK_TEAL,
                            padding: "6px",
                            borderRadius: "50%",
                        }} />
                        <p style={{ 
                            fontSize: "1.2rem", 
                            lineHeight: "1.7", 
                            margin: 0,
                            opacity: 0.95,
                        }}>
                            "True fashion is <HighlightText>emotion woven into form</HighlightText> — 
                            where every stitch carries intention, every silhouette tells a story, 
                            and every garment becomes a canvas for personal expression."
                        </p>
                    </div>
                </div>

                {/* 2. Personal Interests Card */}
                <div style={AboutStyles.InterestsContentBox} className="content-hover">
                    <h3 style={AboutStyles.SubHeading}>
                        <Sparkles size={24} />
                        Personal Interests
                    </h3>
                    
                    <ul style={{ marginLeft: "0.5rem", padding: 0, listStyle: "none" }}>
                        <IconBullet icon={MapPin} text="Exploring architectural geometry and urban textures in Mumbai's diverse neighborhoods" />
                        <IconBullet icon={Heart} text="Collecting vintage silk scarves and traditional embroidery samples from various cultures" />
                        <IconBullet icon={Sparkles} text="Digital illustration and 3D modeling for fashion visualization and concept development" />
                    </ul>

                    {/* Inspiration Note */}
                    <div style={{
                        marginTop: "2.5rem",
                        padding: "1.5rem",
                        background: `linear-gradient(135deg, ${Theme.MUTED_AQUA}10, transparent)`,
                        borderRadius: "12px",
                        border: `1px solid ${Theme.MUTED_AQUA}25`,
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "0.5rem" }}>
                            <ArrowRight size={18} color={Theme.MUTED_AQUA} />
                            <span style={{ fontWeight: "600", color: Theme.MUTED_AQUA }}>Current Inspiration</span>
                        </div>
                        <p style={{ fontSize: "1rem", opacity: 0.85, margin: 0, fontStyle: "italic" }}>
                            "Finding inspiration in the intersection of traditional crafts and digital innovation, 
                            where heritage techniques meet contemporary design thinking."
                        </p>
                    </div>
                </div>
            </div>

            {/* 🌟 NEW BOTTOM NAVBAR */}
            <BottomNavbar />

            {/* Elegant Scroll Indicator */}
            <div style={{
                position: "fixed",
                bottom: "7rem", // Adjusted position to account for navbar
                left: "50%",
                transform: "translateX(-50%)",
                color: Theme.MUTED_AQUA,
                fontSize: "1rem",
                opacity: 0.8,
                zIndex: 50,
                display: "flex",
                alignItems: "center",
                gap: "12px",
                background: "rgba(36, 72, 85, 0.6)",
                padding: "12px 24px",
                borderRadius: "25px",
                backdropFilter: "blur(12px)",
                border: `1px solid ${Theme.MUTED_AQUA}25`,
            }}>
                <span style={{ fontWeight: "500" }}>Scroll to explore</span>
                <div style={{ 
                    animation: "gentlePulse 2s ease-in-out infinite",
                    display: "flex",
                    alignItems: "center",
                }}>
                    <ArrowRight size={18} style={{ transform: "rotate(90deg)" }} />
                </div>
            </div>
        </div>
    );
};

export default AboutPage;