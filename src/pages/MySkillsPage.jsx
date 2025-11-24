import React, { useState, useEffect } from "react";
import { Zap, Github, Linkedin, Scissors, Paintbrush } from "lucide-react";

// --- 1. THEME & MOCK DATA ---
const ColorPalette = {
    IVORY: "#FFFFF0",
    CHARCOAL: "#4A4A48",
    SAGE_GREEN: "#9CAF88",
    DUSTY_ROSE: "#C4A69F",
    PALE_GRAY: "#D8D8D8",
    WARM_BEIGE: "#D7C7B6",
};

const DarkTheme = {
    body: ColorPalette.CHARCOAL,
    text: ColorPalette.IVORY,
    accent: ColorPalette.DUSTY_ROSE,
};

// --- 2. CSS Keyframes ---
const tiltKeyframes = `
@keyframes tilt {
    0%, 100% {
        transform: rotateX(0deg) rotateY(0deg);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    }
    50% {
        transform: rotateX(1deg) rotateY(1deg);
        box-shadow: 0 20px 50px ${DarkTheme.accent}55;
    }
}

/* Mobile Responsive Styles */
@media (max-width: 768px) {
    .skills-box-mobile {
        padding: 6rem 1rem 2rem 1rem !important;
        gap: 2rem !important;
    }
    
    .cards-wrapper-mobile {
        flex-direction: column !important;
        gap: 2rem !important;
        align-items: center !important;
    }
    
    .card-mobile {
        max-width: 100% !important;
        min-height: auto !important;
        padding: 2rem 1.5rem !important;
        margin-bottom: 0 !important;
    }
    
    .logo-mobile {
        left: 1.5rem !important;
        top: 1.5rem !important;
        font-size: 1.5rem !important;
    }
    
    .social-icons-mobile {
        right: 1.5rem !important;
        top: 1.5rem !important;
        gap: 0.8rem !important;
    }
    
    .social-icon-mobile {
        width: 20px !important;
        height: 20px !important;
    }
    
    .power-button-mobile {
        top: 0.8rem !important;
        width: 45px !important;
        height: 45px !important;
    }
    
    .big-title-mobile {
        display: none !important;
    }
    
    .card-title-mobile {
        font-size: 1.5rem !important;
    }
    
    .card-icon-mobile {
        width: 30px !important;
        height: 30px !important;
    }
}

@media (max-width: 480px) {
    .skills-box-mobile {
        padding: 5rem 1rem 1.5rem 1rem !important;
    }
    
    .card-mobile {
        padding: 1.5rem 1rem !important;
    }
    
    .logo-mobile {
        left: 1rem !important;
        top: 1rem !important;
    }
    
    .social-icons-mobile {
        right: 1rem !important;
        top: 1rem !important;
    }
    
    .card-title-mobile {
        font-size: 1.3rem !important;
    }
    
    .description-mobile {
        font-size: 0.9rem !important;
        line-height: 1.5 !important;
    }
}

@media (max-width: 320px) {
    .skills-box-mobile {
        padding: 4rem 0.5rem 1rem 0.5rem !important;
    }
    
    .card-mobile {
        padding: 1rem 0.8rem !important;
    }
    
    .card-title-mobile {
        font-size: 1.2rem !important;
    }
    
    .list-mobile {
        margin-left: 1rem !important;
        font-size: 0.8rem !important;
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
    .skills-box {
        background: #000 !important;
        color: #fff !important;
    }
    
    .card {
        border: 2px solid #fff !important;
        background: #111 !important;
    }
    
    .card-hover {
        background: #fff !important;
        color: #000 !important;
    }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
    .card-hover:active {
        transform: scale(0.98) !important;
    }
}

/* Orientation support */
@media (orientation: landscape) and (max-height: 500px) {
    .skills-box-mobile {
        padding: 4rem 1rem 1rem 1rem !important;
    }
    
    .card-mobile {
        min-height: 400px !important;
        padding: 1.5rem !important;
    }
}
`;

// --- 3. RESPONSIVE STYLES ---
const SkillsStyles = {
    Box: {
        backgroundColor: DarkTheme.body,
        width: "100%",
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "sans-serif",
        overflowY: "auto",
        padding: "8rem 2rem 4rem 2rem",
        gap: "3rem",
        boxSizing: "border-box",
    },

    FixedElement: {
        position: "fixed",
        zIndex: 50,
        color: DarkTheme.text,
    },

    Logo: {
        top: "2rem",
        left: "3rem",
        fontSize: "clamp(1.5rem, 3vw, 2rem)",
        fontWeight: 700,
        fontFamily: "serif",
    },

    SocialIcons: {
        top: "2rem",
        right: "3rem",
        display: "flex",
        gap: "1rem",
    },

    PowerButton: {
        position: "fixed",
        top: "1rem",
        left: "50%",
        transform: "translateX(-50%)",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        backgroundColor: DarkTheme.text,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textDecoration: "none",
        zIndex: 60,
        minWidth: "44px",
        minHeight: "44px",
    },

    CardsWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "4rem",
        width: "100%",
        maxWidth: "1200px",
        flexWrap: "wrap",
    },

    Card: {
        width: "100%",
        maxWidth: "450px",
        minHeight: "550px",
        padding: "2.5rem",
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: DarkTheme.text,
        color: DarkTheme.text,
        backgroundColor: DarkTheme.body,
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "all 0.4s ease-in-out",
        cursor: "pointer",
        transformStyle: "preserve-3d",
        boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        animation: "tilt 4s ease-in-out infinite",
        boxSizing: "border-box",
    },

    CardHover: {
        backgroundColor: DarkTheme.text,
        color: DarkTheme.body,
        borderColor: DarkTheme.accent,
        boxShadow: `0 20px 50px ${DarkTheme.accent}80`,
    },

    Title: {
        display: "flex",
        alignItems: "center",
        fontSize: "clamp(1.5rem, 3vw, 2rem)",
        fontWeight: 700,
        marginBottom: "1rem",
        color: DarkTheme.accent,
    },

    TitleIcon: {
        marginRight: "1rem",
        width: "clamp(30px, 5vw, 40px)",
        height: "clamp(30px, 5vw, 40px)",
        transition: "fill 0.3s ease",
    },

    Description: {
        fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
        lineHeight: 1.6,
        paddingBottom: "1rem",
        flexGrow: 1,
    },

    Strong: {
        textTransform: "uppercase",
        fontWeight: 700,
        color: DarkTheme.accent,
    },

    List: {
        marginTop: "1rem",
        marginLeft: "2rem",
        listStyleType: "disc",
        fontSize: "clamp(0.8rem, 1.5vw, 0.9rem)",
        lineHeight: 1.5,
    },
};

// --- MOCK COMPONENTS ---
const BigTitle = ({ text, top, right }) => (
    <h1 style={{ 
        ...BigTitleStyles.Text, 
        top, 
        right,
        fontSize: "clamp(8rem, 15vw, 18vh)"
    }} className="big-title-mobile">
        {text}
    </h1>
);

const BigTitleStyles = {
    Text: {
        position: "absolute",
        opacity: 0.1,
        color: DarkTheme.text,
        zIndex: 0,
        fontWeight: "900",
        pointerEvents: "none",
    },
};

const LogoComponent = () => (
    <div style={{ ...SkillsStyles.FixedElement, ...SkillsStyles.Logo }} className="logo-mobile">
        JV
    </div>
);

const SocialIcons = () => (
    <div style={{ ...SkillsStyles.FixedElement, ...SkillsStyles.SocialIcons }} className="social-icons-mobile">
        <Github size={24} className="social-icon-mobile" />
        <Linkedin size={24} className="social-icon-mobile" />
    </div>
);

const PowerButton = () => (
    <a href="/#/main2" style={SkillsStyles.PowerButton} className="power-button-mobile" aria-label="Home">
        <Zap size={30} style={{ color: DarkTheme.body }} />
    </a>
);

// Particle background
const ParticleComponent = () => (
    <div style={{ position: "fixed", inset: 0, opacity: 0.08, pointerEvents: "none" }}>
        <div
            style={{
                position: "absolute",
                inset: 0,
                background:
                    "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.35), transparent 40%)",
            }}
        ></div>
        <div
            style={{
                position: "absolute",
                inset: 0,
                background:
                    "radial-gradient(circle at 90% 80%, rgba(255,255,255,0.35), transparent 40%)",
            }}
        ></div>
    </div>
);

// --- SKILLS CARD ---
const SkillsCard = ({ title, icon: Icon, mainText, skills }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const cardStyle = {
        ...SkillsStyles.Card,
        ...(isHovered && !isMobile ? SkillsStyles.CardHover : {}),
        transform: isHovered && !isMobile
            ? "rotateX(1deg) rotateY(1deg) scale(1.03)"
            : "rotateX(0deg) rotateY(0deg) scale(1)",
    };

    const finalCardStyle = isMobile
        ? { 
            ...cardStyle, 
            maxWidth: "100%", 
            marginBottom: "0",
            minHeight: "auto",
            animation: "none"
          }
        : cardStyle;

    return (
        <div
            style={finalCardStyle}
            className="card-mobile card-hover"
            onMouseEnter={() => !isMobile && setIsHovered(true)}
            onMouseLeave={() => !isMobile && setIsHovered(false)}
            onTouchStart={() => isMobile && setIsHovered(true)}
            onTouchEnd={() => isMobile && setTimeout(() => setIsHovered(false), 150)}
        >
            <h2 style={{ 
                ...SkillsStyles.Title, 
                color: isHovered ? DarkTheme.body : DarkTheme.accent 
            }} className="card-title-mobile">
                <Icon style={{ 
                    ...SkillsStyles.TitleIcon,
                    width: isMobile ? "30px" : "40px",
                    height: isMobile ? "30px" : "40px"
                }} className="card-icon-mobile" />
                {title}
            </h2>

            <p style={SkillsStyles.Description} className="description-mobile">
                {mainText}
            </p>

            <div style={SkillsStyles.Description} className="description-mobile">
                <strong style={SkillsStyles.Strong}>Skills</strong>
                <ul style={SkillsStyles.List} className="list-mobile">
                    {skills.map((skill, idx) => (
                        <li key={idx}>{skill}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

// --- MAIN PAGE ---
const MySkillsPage = () => {
    const fashionDesign = {
        title: "Fashion Designer",
        icon: Scissors,
        mainText:
            "I create expressive, meaningful fashion blending comfort, culture and modern craftsmanship.",
        skills: [
            "Illustration & Sketching",
            "Pattern Making & Draping",
            "Garment Construction",
            "Surface Embellishment",
            "Textile Knowledge",
            "Moodboard Creation & Curation",
        ],
    };

    const creativeSkills = {
        title: "Creative Direction",
        icon: Paintbrush,
        mainText:
            "Visual storytelling, brand identity creation, and strategic presentation across digital and editorial platforms.",
        skills: [
            "Trend Forecasting",
            "Editorial Design & Layout",
            "Styling & Merchandising",
            "Digital Content Creation",
            "Visual Branding Strategy",
        ],
    };

    return (
        <div style={SkillsStyles.Box} className="skills-box-mobile">
            <style>{tiltKeyframes}</style>

            <LogoComponent />
            <SocialIcons />
            <PowerButton />
            <ParticleComponent />

            <div style={SkillsStyles.CardsWrapper} className="cards-wrapper-mobile">
                <SkillsCard {...fashionDesign} />
                <SkillsCard {...creativeSkills} />
            </div>

            <BigTitle text="SKILLS" top="82%" right="30%" />
        </div>
    );
};

export default MySkillsPage;