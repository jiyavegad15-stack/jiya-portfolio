import React, { useState, useEffect } from "react";
import { Zap, Github, Linkedin, Palette, Scissors, Ruler, Sparkles, Heart, ArrowRight, ChevronDown, Lightbulb, FileText, Target, CheckCircle, Home, User, Briefcase, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

// 🎨 COLOR PALETTE
const Theme = {
    DARK_TEAL: "#244855",
    WARM_RED: "#E64833",
    MUDDY_BROWN: "#874F41",
    MUTED_AQUA: "#90AEAD",
    SOFT_BEIGE: "#FBE9D0",
    CREAM_WHITE: "#FFFDF8"
};

// 🌟 ANIMATIONS
const animationsCSS = `
@keyframes floatInStagger {
  0% {
    opacity: 0;
    transform: translateY(60px) scale(0.9);
    filter: blur(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@keyframes slideInFromLeft {
  0% {
    opacity: 0;
    transform: translateX(-80px) rotate(-2deg);
  }
  100% {
    opacity: 1;
    transform: translateX(0) rotate(0deg);
  }
}

@keyframes slideInFromRight {
  0% {
    opacity: 0;
    transform: translateX(80px) rotate(2deg);
  }
  100% {
    opacity: 1;
    transform: translateX(0) rotate(0deg);
  }
}

@keyframes gradientFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes gentlePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes borderGlow {
  0%, 100% { border-color: #90AEAD30; box-shadow: 0 0 20px transparent; }
  50% { border-color: #E6483340; box-shadow: 0 0 30px #E6483320; }
}

@keyframes textShimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.animate-floatIn { animation: floatInStagger 1s ease-out forwards; }
.animate-slideLeft { animation: slideInFromLeft 1s ease-out forwards; }
.animate-slideRight { animation: slideInFromRight 1s ease-out forwards; }
.animate-pulse { animation: gentlePulse 3s ease-in-out infinite; }

/* Navigation Styles */
.nav-hover:hover {
    background: rgba(255,255,255,0.08);
    box-shadow: 0 8px 20px rgba(36,72,85,0.3);
    color: ${Theme.WARM_RED};
    transform: translateY(-2px);
}

.social-hover:hover {
    transform: translateY(-2px);
    background: rgba(36, 72, 85, 0.15);
    border-color: ${Theme.WARM_RED}40;
    box-shadow: 0 8px 25px rgba(230, 72, 51, 0.2);
}

.power-hover:hover {
    transform: translateX(-50%) scale(1.05);
    box-shadow: 0 12px 35px ${Theme.WARM_RED}40;
}

.step-hover:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 
        0 35px 70px rgba(36, 72, 85, 0.25),
        inset 0 1px 0 rgba(255, 255, 255, 0.9);
    border-color: ${Theme.WARM_RED}30;
}

/* Mobile Responsive Styles */
@media (max-width: 768px) {
  .process-container-mobile {
    padding: 6rem 1rem 7rem 1rem !important;
  }
  
  .content-wrapper-mobile {
    padding: 0 !important;
  }
  
  .header-section-mobile {
    margin-bottom: 3rem !important;
    padding: 0 1rem !important;
  }
  
  .main-heading-mobile {
    font-size: clamp(2.5rem, 8vw, 4rem) !important;
    margin-bottom: 1rem !important;
  }
  
  .sub-heading-mobile {
    font-size: clamp(1rem, 3vw, 1.2rem) !important;
    max-width: 100% !important;
  }
  
  .process-timeline-mobile {
    grid-template-columns: 1fr !important;
    gap: 2rem !important;
  }
  
  .process-step-mobile {
    padding: 2rem 1.5rem !important;
    margin: 0 1rem !important;
    animation: floatInStagger 1s ease-out forwards !important;
  }
  
  .step-header-mobile {
    flex-direction: column !important;
    gap: 1rem !important;
    align-items: flex-start !important;
  }
  
  .step-title-mobile {
    font-size: clamp(1.5rem, 4vw, 2rem) !important;
    text-align: left !important;
  }
  
  .step-number-mobile {
    width: 50px !important;
    height: 50px !important;
    font-size: 1.2rem !important;
  }
  
  .step-icon-mobile {
    margin-left: 0 !important;
    align-self: flex-start !important;
  }
  
  .step-description-mobile {
    font-size: clamp(0.95rem, 2.5vw, 1.1rem) !important;
    line-height: 1.6 !important;
  }
  
  .step-features-mobile {
    gap: 0.6rem !important;
  }
  
  .feature-chip-mobile {
    padding: 0.5rem 1rem !important;
    font-size: 0.8rem !important;
  }
  
  .step-quote-mobile {
    padding: 1rem 1.5rem !important;
  }
  
  /* Fixed Elements Mobile */
  .logo-mobile {
    left: 1.5rem !important;
    top: 1.5rem !important;
    font-size: 1.8rem !important;
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
  
  .power-button-mobile {
    top: 1rem !important;
    width: 45px !important;
    height: 45px !important;
  }
  
  .scroll-indicator-mobile {
    display: none !important;
  }
  
  /* Hide floating shapes on mobile */
  .floating-shape-mobile {
    display: none !important;
  }

  /* Bottom Navbar Mobile */
  .bottom-navbar-mobile {
    padding: 0.8rem 1rem !important;
    gap: 0.5rem !important;
  }
  
  .nav-item-mobile {
    min-width: auto !important;
    padding: 0.5rem 0.8rem !important;
    font-size: 0.8rem !important;
  }
}

@media (max-width: 480px) {
  .process-container-mobile {
    padding: 5rem 0.5rem 6rem 0.5rem !important;
  }
  
  .process-step-mobile {
    padding: 1.5rem 1rem !important;
    margin: 0 0.5rem !important;
  }
  
  .step-header-mobile {
    gap: 0.8rem !important;
  }
  
  .step-number-mobile {
    width: 45px !important;
    height: 45px !important;
  }
  
  .logo-mobile {
    left: 1rem !important;
    top: 1rem !important;
  }
  
  .social-icons-mobile {
    right: 1rem !important;
    top: 1rem !important;
  }
  
  .feature-chip-mobile {
    padding: 0.4rem 0.8rem !important;
    font-size: 0.75rem !important;
  }

  .bottom-navbar-mobile {
    padding: 0.6rem 0.8rem !important;
    gap: 0.3rem !important;
  }
  
  .nav-item-mobile {
    padding: 0.4rem 0.6rem !important;
    font-size: 0.75rem !important;
    gap: 0.3rem !important;
  }
}

@media (max-width: 320px) {
  .process-step-mobile {
    padding: 1rem 0.8rem !important;
    margin: 0 0.3rem !important;
  }
  
  .step-title-mobile {
    font-size: 1.3rem !important;
  }
  
  .step-description-mobile {
    font-size: 0.9rem !important;
  }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  .step-hover:active {
    transform: scale(0.98) !important;
  }
  
  .social-hover:active, .power-hover:active, .nav-hover:active {
    transform: scale(0.95) !important;
  }
}
`;

// 🎨 PREMIUM STYLES
const ProcessStyles = {
    Container: {
        minHeight: "100vh",
        background: `linear-gradient(-45deg, ${Theme.SOFT_BEIGE}, ${Theme.CREAM_WHITE}, #f5e6d0, ${Theme.SOFT_BEIGE})`,
        backgroundSize: "400% 400%",
        animation: "gradientFlow 15s ease infinite",
        color: Theme.DARK_TEAL,
        fontFamily: "'Georgia', 'Times New Roman', serif",
        position: "relative",
        overflow: "hidden",
        paddingBottom: "100px", // Added padding for bottom navbar
    },

    BackgroundElements: {
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
    },

    FloatingShape: (size, color, top, left, rotation, delay) => ({
        position: "absolute",
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${color}15, ${color}08)`,
        borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
        top,
        left,
        transform: `rotate(${rotation}deg)`,
        animation: `gentlePulse 8s ease-in-out infinite ${delay}s`,
        opacity: 0.6,
    }),

    ContentWrapper: {
        position: "relative",
        zIndex: 2,
        padding: "8rem 6rem 6rem",
        maxWidth: "1400px",
        margin: "0 auto",
        boxSizing: "border-box",
    },

    HeaderSection: {
        textAlign: "center",
        marginBottom: "6rem",
        animation: "floatInStagger 1s ease-out 0.3s both",
    },

    MainHeading: {
        fontSize: "clamp(2.5rem, 8vw, 5rem)",
        fontWeight: "700",
        background: `linear-gradient(135deg, ${Theme.DARK_TEAL}, ${Theme.MUDDY_BROWN})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        marginBottom: "1.5rem",
        lineHeight: "1.1",
        letterSpacing: "-0.02em",
    },

    SubHeading: {
        fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
        color: Theme.MUDDY_BROWN,
        opacity: 0.8,
        fontWeight: "300",
        maxWidth: "600px",
        margin: "0 auto",
        lineHeight: "1.6",
    },

    // Process Timeline
    ProcessTimeline: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
        gap: "3rem",
        position: "relative",
    },

    ProcessStep: (index, delay) => ({
        background: `linear-gradient(145deg, 
            rgba(255, 255, 255, 0.9) 0%,
            rgba(251, 233, 208, 0.7) 50%,
            rgba(255, 253, 248, 0.9) 100%)`,
        backdropFilter: "blur(20px)",
        borderRadius: "28px",
        padding: "3.5rem",
        border: `2px solid ${Theme.DARK_TEAL}15`,
        boxShadow: `
            0 25px 60px rgba(36, 72, 85, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.8),
            inset 0 0 30px rgba(251, 233, 208, 0.3)
        `,
        position: "relative",
        overflow: "hidden",
        animation: index % 2 === 0 ? 
            `slideInFromLeft 1s ease-out ${delay}s both` :
            `slideInFromRight 1s ease-out ${delay}s both`,
        transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        minHeight: "450px",
    }),

    StepHeader: {
        display: "flex",
        alignItems: "center",
        gap: "1.5rem",
        marginBottom: "2rem",
    },

    StepNumber: {
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${Theme.WARM_RED}, ${Theme.MUDDY_BROWN})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: Theme.CREAM_WHITE,
        fontSize: "1.5rem",
        fontWeight: "700",
        boxShadow: `0 8px 25px ${Theme.WARM_RED}40`,
        flexShrink: 0,
    },

    StepTitle: {
        fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
        fontWeight: "600",
        color: Theme.DARK_TEAL,
        margin: 0,
        lineHeight: "1.2",
    },

    StepIcon: {
        marginLeft: "auto",
        opacity: 0.8,
    },

    StepDescription: {
        fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)",
        lineHeight: "1.8",
        color: Theme.DARK_TEAL,
        opacity: 0.9,
        marginBottom: "2rem",
    },

    StepFeatures: {
        display: "flex",
        flexWrap: "wrap",
        gap: "0.8rem",
        marginBottom: "2rem",
    },

    FeatureChip: {
        padding: "0.6rem 1.2rem",
        background: `linear-gradient(135deg, ${Theme.MUTED_AQUA}20, ${Theme.WARM_RED}15)`,
        borderRadius: "20px",
        border: `1px solid ${Theme.MUTED_AQUA}30`,
        color: Theme.DARK_TEAL,
        fontSize: "clamp(0.8rem, 1.5vw, 0.9rem)",
        fontWeight: "500",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
    },

    StepQuote: {
        background: `linear-gradient(135deg, ${Theme.MUDDY_BROWN}08, ${Theme.WARM_RED}05)`,
        padding: "1.5rem 2rem",
        borderRadius: "16px",
        border: `1px solid ${Theme.MUDDY_BROWN}20`,
        fontStyle: "italic",
        position: "relative",
    },

    QuoteIcon: {
        position: "absolute",
        top: "-10px",
        left: "20px",
        background: Theme.SOFT_BEIGE,
        padding: "5px",
        borderRadius: "50%",
    },

    // Fixed Elements
    Logo: {
        position: "fixed",
        top: "3rem",
        left: "4rem",
        zIndex: 100,
        fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
        fontWeight: "700",
        color: Theme.DARK_TEAL,
        display: "flex",
        alignItems: "center",
        gap: "14px",
        fontFamily: "'Georgia', serif",
        animation: "slideInFromLeft 1s ease both",
    },

    SocialIcons: {
        position: "fixed",
        top: "3rem",
        right: "4rem",
        display: "flex",
        gap: "1rem",
        zIndex: 100,
        animation: "slideInFromRight 1s ease both",
    },

    SocialIcon: {
        width: "46px",
        height: "46px",
        borderRadius: "50%",
        background: "rgba(36, 72, 85, 0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(12px)",
        border: `1.5px solid ${Theme.DARK_TEAL}20`,
        transition: "all 0.3s ease",
        cursor: "pointer",
        color: Theme.DARK_TEAL,
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
        zIndex: 100,
        transition: "all 0.3s ease",
        animation: "floatInStagger 1s ease both",
    },

    // 🌟 BOTTOM NAVBAR STYLES
    BottomNavbar: {
            position: "fixed",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1.2rem",
            padding: "1rem 1.8rem",

            // 🌟 Transparent Glass Blur Background
            background: "rgba(36, 72, 85, 0.25)", // slight tint only
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",

            borderRadius: "40px",
            border: `1px solid ${Theme.MUTED_AQUA}40`, // softened border highlight
            boxShadow: "0 10px 35px rgba(0,0,0,0.25)", // softened shadow
            zIndex: 100,
    },

    NavItem: {
        minWidth: "120px",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        padding: "0.7rem 1.2rem",
        borderRadius: "20px",
        fontSize: "1.05rem",
        fontWeight: "600",
        color: Theme.CREAM_WHITE,
        textDecoration: "none",
        transition: "all 0.3s ease",
        fontFamily: "'Georgia', serif",
        whiteSpace: "nowrap",
    },

    ActiveNavItem: {
        background: `linear-gradient(135deg, ${Theme.WARM_RED}20, ${Theme.MUTED_AQUA}15)`,
        border: `1px solid ${Theme.WARM_RED}30`,
        color: Theme.WARM_RED,
    },
};

// 🎨 COMPONENTS
const LogoComponent = () => (
    <div style={ProcessStyles.Logo} className="logo-mobile">
        <div style={{
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${Theme.WARM_RED}, ${Theme.MUDDY_BROWN})`,
            boxShadow: `0 0 25px ${Theme.WARM_RED}40`,
        }}></div>
        JV
    </div>
);

const SocialIcons = () => (
    <div style={ProcessStyles.SocialIcons} className="social-icons-mobile">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={ProcessStyles.SocialIcon} className="social-hover social-icon-mobile">
            <Github size={22} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={ProcessStyles.SocialIcon} className="social-hover social-icon-mobile">
            <Linkedin size={22} />
        </a>
    </div>
);

const PowerButton = () => (
    <a href="/" style={ProcessStyles.PowerButton} className="power-hover power-button-mobile" aria-label="Home">
        <Zap size={26} style={{ color: Theme.CREAM_WHITE }} />
    </a>
);

const BottomNavbar = () => (
    <nav style={ProcessStyles.BottomNavbar} className="bottom-navbar-mobile">
        <Link 
            to="/main2" 
            style={ProcessStyles.NavItem}
            className="nav-hover nav-item-mobile"
        >
            <Home size={18} />
            Home
        </Link>
        
        <Link 
            to="/education" 
            style={ProcessStyles.NavItem}
            className="nav-hover nav-item-mobile"
        >
            <User size={18} />
            Education
        </Link>
        
        <Link 
            to="/work" 
            style={ProcessStyles.NavItem}
            className="nav-hover nav-item-mobile"
        >
            <Briefcase size={18} />
            Portfolio
        </Link>
        
        <Link 
            to="/cv" 
            style={ProcessStyles.NavItem}
            className="nav-hover nav-item-mobile"
        >
            <BookOpen size={18} />
            CV
        </Link>

        <Link 
            to="/process" 
            style={{
                ...ProcessStyles.NavItem,
                ...ProcessStyles.ActiveNavItem
            }}
            className="nav-hover nav-item-mobile"
        >
            <Palette size={18} />
            Design Process
        </Link>
    </nav>
);

const BackgroundElements = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (isMobile) return null;

    return (
        <div style={ProcessStyles.BackgroundElements}>
            <div style={ProcessStyles.FloatingShape("400px", Theme.WARM_RED, "10%", "5%", 45, 0)} className="floating-shape-mobile" />
            <div style={ProcessStyles.FloatingShape("300px", Theme.MUTED_AQUA, "70%", "10%", -20, 2)} className="floating-shape-mobile" />
            <div style={ProcessStyles.FloatingShape("500px", Theme.MUDDY_BROWN, "20%", "80%", 15, 1)} className="floating-shape-mobile" />
            <div style={ProcessStyles.FloatingShape("350px", Theme.DARK_TEAL, "80%", "75%", -30, 3)} className="floating-shape-mobile" />
        </div>
    );
};

const ProcessStep = ({ number, title, icon: Icon, description, features, quote, delay }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div 
            style={ProcessStyles.ProcessStep(number - 1, isMobile ? 0.3 : delay)} 
            className="step-hover process-step-mobile"
        >
            <div style={ProcessStyles.StepHeader} className="step-header-mobile">
                <div style={ProcessStyles.StepNumber} className="step-number-mobile">{number}</div>
                <h3 style={ProcessStyles.StepTitle} className="step-title-mobile">{title}</h3>
                <div style={ProcessStyles.StepIcon} className="step-icon-mobile">
                    <Icon size={isMobile ? 28 : 32} color={Theme.MUDDY_BROWN} />
                </div>
            </div>
            
            <p style={ProcessStyles.StepDescription} className="step-description-mobile">{description}</p>
            
            {features && (
                <div style={ProcessStyles.StepFeatures} className="step-features-mobile">
                    {features.map((feature, index) => (
                        <div key={index} style={ProcessStyles.FeatureChip} className="feature-chip-mobile">
                            <CheckCircle size={14} />
                            {feature}
                        </div>
                    ))}
                </div>
            )}
            
            {quote && (
                <div style={ProcessStyles.StepQuote} className="step-quote-mobile">
                    <Sparkles size={16} style={ProcessStyles.QuoteIcon} color={Theme.WARM_RED} />
                    <p style={{ margin: 0, fontSize: "clamp(0.9rem, 1.5vw, 1rem)", lineHeight: "1.6", opacity: 0.8 }}>
                        {quote}
                    </p>
                </div>
            )}
        </div>
    );
};

// 🎨 MAIN COMPONENT
export default function ProcessPage() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const processSteps = [
        {
            number: 1,
            title: "Concept & Inspiration",
            icon: Lightbulb,
            description: "Every project begins with deep exploration of themes, emotions, and narratives—forming comprehensive mood boards, initial sketches, and compelling story directions that capture the essence of the collection.",
            features: ["Mood Board Creation", "Theme Development", "Story Narrative", "Visual Research"],
            quote: "Where emotion meets imagination, fashion finds its voice.",
            delay: 0.3
        },
        {
            number: 2,
            title: "Material Exploration",
            icon: Palette,
            description: "Fabrics, textures, and colors are meticulously selected with intention to support and enhance the story behind each garment, considering sustainability and tactile experience.",
            features: ["Fabric Sourcing", "Color Theory", "Texture Studies", "Sustainable Materials"],
            quote: "The right material can whisper a story before a single stitch is made.",
            delay: 0.5
        },
        {
            number: 3,
            title: "Sketching & Draping",
            icon: FileText,
            description: "Ideas evolve through iterative sketching and experimental draping techniques, refining silhouettes and structural elements to achieve perfect balance and movement.",
            features: ["Technical Drawing", "Silhouette Studies", "Draping Techniques", "Form Exploration"],
            quote: "In the dance of fabric and form, design finds its rhythm.",
            delay: 0.7
        },
        {
            number: 4,
            title: "Pattern Making",
            icon: Ruler,
            description: "Precision pattern drafting transforms creative concepts into functional, wearable designs through mathematical precision and artistic intuition.",
            features: ["Pattern Drafting", "Fit Analysis", "Technical Specifications", "Prototype Development"],
            quote: "Where art meets mathematics, wearable poetry is born.",
            delay: 0.9
        },
        {
            number: 5,
            title: "Construction & Finishing",
            icon: Scissors,
            description: "Final garments are meticulously assembled with exceptional attention to detail, craftsmanship, and storytelling through every seam and finish.",
            features: ["Sewing Techniques", "Quality Control", "Finishing Details", "Final Fittings"],
            quote: "Every stitch carries intention, every detail tells a story.",
            delay: 1.1
        },
        {
            number: 6,
            title: "Presentation & Reflection",
            icon: Target,
            description: "Completed pieces are presented through professional photography and styling, followed by reflective analysis to inform and inspire future creative journeys.",
            features: ["Photoshoot Planning", "Styling Direction", "Portfolio Curation", "Creative Reflection"],
            quote: "The end of one collection is the beginning of the next creative journey.",
            delay: 1.3
        }
    ];

    return (
        <div style={ProcessStyles.Container} className="process-container-mobile">
            <style>{animationsCSS}</style>

            <BackgroundElements />
            <LogoComponent />
            <SocialIcons />
            <PowerButton />
            <BottomNavbar />

            <div style={ProcessStyles.ContentWrapper} className="content-wrapper-mobile">
                {/* Header Section */}
                <div style={ProcessStyles.HeaderSection} className="header-section-mobile">
                    <h1 style={ProcessStyles.MainHeading} className="main-heading-mobile">
                        Design Process
                    </h1>
                    <p style={ProcessStyles.SubHeading} className="sub-heading-mobile">
                        A journey from initial inspiration to final creation—each step meticulously crafted 
                        to transform emotions into wearable art that tells compelling stories.
                    </p>
                </div>

                {/* Process Timeline */}
                <div style={ProcessStyles.ProcessTimeline} className="process-timeline-mobile">
                    {processSteps.map((step, index) => (
                        <ProcessStep key={index} {...step} />
                    ))}
                </div>
            </div>

            {/* Scroll Indicator - Hidden on mobile */}
            {!isMobile && (
                <div style={{
                    position: "fixed",
                    bottom: "6rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: Theme.MUDDY_BROWN,
                    fontSize: "1rem",
                    opacity: 0.8,
                    zIndex: 50,
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    background: "rgba(255, 255, 255, 0.8)",
                    padding: "12px 24px",
                    borderRadius: "25px",
                    backdropFilter: "blur(12px)",
                    border: `1px solid ${Theme.MUDDY_BROWN}20`,
                    animation: "gentlePulse 3s ease-in-out infinite",
                }} className="scroll-indicator-mobile">
                    <span style={{ fontWeight: "500" }}>Design Journey</span>
                    <ArrowRight size={18} style={{ transform: "rotate(90deg)" }} />
                </div>
            )}
        </div>
    );
}