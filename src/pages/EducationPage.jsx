import React, { useState, useEffect } from "react";
import { Zap, Github, Linkedin, Award, BookOpen, GraduationCap, Calendar, MapPin, Sparkles, ChevronDown } from "lucide-react";

// 🎨 COLOR PALETTE
const Theme = {
    DARK_TEAL: "#244855",
    WARM_RED: "#E64833",
    MUDDY_BROWN: "#874F41",
    MUTED_AQUA: "#90AEAD",
    SOFT_BEIGE: "#FBE9D0",
    CREAM_WHITE: "#FFFDF8"
};

// 🌿 NEW ANIMATIONS
const animationsCSS = `
@keyframes slideInStagger {
  0% { 
    opacity: 0; 
    transform: translateX(-100px) rotate(-5deg); 
    clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
  }
  100% { 
    opacity: 1; 
    transform: translateX(0) rotate(0deg);
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
}

@keyframes cardReveal {
  0% { 
    opacity: 0;
    transform: translateY(60px) scale(0.95);
    filter: blur(10px);
  }
  100% { 
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes floatGentle {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-5px) rotate(0.5deg); }
  66% { transform: translateY(3px) rotate(-0.5deg); }
}

@keyframes textGlow {
  0%, 100% { text-shadow: 0 0 20px transparent; }
  50% { text-shadow: 0 0 20px ${Theme.WARM_RED}40; }
}

@keyframes borderFlow {
  0% { border-color: ${Theme.MUTED_AQUA}30; }
  25% { border-color: ${Theme.WARM_RED}40; }
  50% { border-color: ${Theme.MUDDY_BROWN}30; }
  75% { border-color: ${Theme.MUTED_AQUA}30; }
  100% { border-color: ${Theme.MUTED_AQUA}30; }
}

/* Responsive CSS */
@media (max-width: 768px) {
  .education-layout {
    grid-template-columns: 1fr !important;
    gap: 0 !important;
  }
  
  .left-panel, .right-panel {
    padding: 5rem 1.5rem 2rem 1.5rem !important;
  }
  
  .main-heading {
    font-size: clamp(2.5rem, 10vw, 4rem) !important;
    text-align: center !important;
  }
  
  .sub-heading {
    text-align: center !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }
  
  .timeline {
    padding-left: 2rem !important;
  }
  
  .education-card {
    padding: 2rem 1.5rem !important;
    margin-bottom: 2rem !important;
  }
  
  .detail-grid {
    grid-template-columns: 1fr !important;
    gap: 1rem !important;
  }
  
  .institution-header {
    flex-direction: column !important;
    gap: 1rem !important;
    align-items: flex-start !important;
  }
  
  .focus-chips {
    justify-content: center !important;
  }
  
  /* Fixed elements mobile */
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
  
  .scroll-indicator {
    display: none !important;
  }
  
  /* Hide floating shapes on mobile */
  .floating-shape {
    display: none !important;
  }
}

@media (max-width: 480px) {
  .left-panel, .right-panel {
    padding: 4rem 1rem 2rem 1rem !important;
  }
  
  .education-card {
    padding: 1.5rem 1rem !important;
    border-radius: 20px !important;
  }
  
  .achievements-carousel {
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
  
  .timeline {
    padding-left: 1.5rem !important;
  }
  
  .timeline-dot {
    left: -2.5rem !important;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .education-layout {
    grid-template-columns: 1fr 1fr !important;
  }
  
  .left-panel {
    padding: 6rem 2rem 3rem 3rem !important;
  }
  
  .right-panel {
    padding: 4rem 2rem 3rem 2rem !important;
  }
  
  .main-heading {
    font-size: clamp(3rem, 6vw, 4rem) !important;
  }
}

@media (min-width: 1440px) {
  .left-panel {
    padding: 8rem 5rem 4rem 7rem !important;
  }
  
  .right-panel {
    padding: 6rem 5rem 4rem 5rem !important;
  }
}

/* High zoom level support */
@media (max-width: 320px) {
  .education-card {
    margin-bottom: 1.5rem !important;
  }
  
  .detail-item {
    padding: 0.6rem 1rem !important;
  }
  
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
  .education-box {
    background: #000 !important;
  }
  
  .education-card {
    border: 2px solid #fff !important;
    background: #111 !important;
  }
}

/* Orientation support */
@media (orientation: landscape) and (max-height: 500px) {
  .education-box {
    min-height: 120vh !important;
  }
  
  .main-heading {
    font-size: 2.5rem !important;
  }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  .hover-lift:active {
    transform: translateY(-2px) scale(1.02);
  }
  
  .card-hover:active {
    transform: translateY(-5px) scale(1.01);
  }
}
`;

// 🎓 MODERN STYLES
const EducationStyles = {
    Box: {
        backgroundColor: Theme.DARK_TEAL,
        width: "100%",
        minHeight: "100vh",
        color: Theme.SOFT_BEIGE,
        position: "relative",
        overflowX: "hidden",
        fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
        background: `linear-gradient(-45deg, ${Theme.DARK_TEAL}, #1a3a47, #2d5366, ${Theme.DARK_TEAL})`,
        backgroundSize: "400% 400%",
        animation: "gradientShift 15s ease infinite",
    },

    // Responsive Layout Container
    LayoutContainer: {
        display: "grid",
        gridTemplateColumns: "1fr 1.2fr",
        gap: "0",
        minHeight: "100vh",
        position: "relative",
    },

    // Left Panel - Timeline Style
    LeftPanel: {
        padding: "8rem 4rem 4rem 6rem",
        position: "relative",
        zIndex: 2,
    },

    // Right Panel - Content Focus
    RightPanel: {
        background: `linear-gradient(135deg, 
            rgba(251, 233, 208, 0.03) 0%,
            rgba(144, 174, 173, 0.02) 100%)`,
        backdropFilter: "blur(40px)",
        padding: "6rem 4rem 4rem 4rem",
        position: "relative",
        borderLeft: `1px solid ${Theme.MUTED_AQUA}15`,
    },

    // Vertical Timeline
    Timeline: {
        position: "relative",
        paddingLeft: "3rem",
    },

    TimelineItem: (delay) => ({
        position: "relative",
        marginBottom: "4rem",
        animation: `slideInStagger 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s both`,
    }),

    TimelineDot: {
        position: "absolute",
        left: "-3rem",
        top: "0.5rem",
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${Theme.WARM_RED}, ${Theme.MUDDY_BROWN})`,
        border: `3px solid ${Theme.DARK_TEAL}`,
        boxShadow: `0 0 0 2px ${Theme.WARM_RED}60`,
    },

    // Header Styles
    MainHeading: {
        fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
        fontWeight: "800",
        background: `linear-gradient(135deg, ${Theme.SOFT_BEIGE} 0%, ${Theme.MUTED_AQUA} 100%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        marginBottom: "1rem",
        lineHeight: "1.1",
        letterSpacing: "-0.02em",
        animation: "textGlow 3s ease-in-out infinite",
    },

    SubHeading: {
        fontSize: "clamp(1rem, 3vw, 1.3rem)",
        color: Theme.MUTED_AQUA,
        fontWeight: "300",
        letterSpacing: "0.5px",
        marginBottom: "4rem",
        maxWidth: "400px",
        lineHeight: "1.6",
    },

    // Card Styles
    EducationCard: {
        background: `linear-gradient(145deg,
            rgba(251, 233, 208, 0.08) 0%,
            rgba(144, 174, 173, 0.04) 50%,
            rgba(135, 79, 65, 0.02) 100%)`,
        backdropFilter: "blur(20px)",
        borderRadius: "28px",
        padding: "3rem",
        marginBottom: "2.5rem",
        border: `1px solid ${Theme.MUTED_AQUA}20`,
        boxShadow: `
            0 25px 60px rgba(36, 72, 85, 0.3),
            inset 0 1px 0 rgba(251, 233, 208, 0.1),
            inset 0 0 20px rgba(251, 233, 208, 0.02)
        `,
        position: "relative",
        overflow: "hidden",
        animation: "cardReveal 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both",
        animationDelay: "0.6s",
    },

    InstitutionHeader: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: "2rem",
    },

    InstitutionName: {
        fontSize: "clamp(1.4rem, 4vw, 1.8rem)",
        fontWeight: "700",
        color: Theme.SOFT_BEIGE,
        marginBottom: "0.8rem",
        lineHeight: "1.3",
    },

    DegreeTitle: {
        fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
        fontWeight: "600",
        color: Theme.WARM_RED,
        marginBottom: "1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
    },

    DetailGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1.5rem",
        marginBottom: "2rem",
    },

    DetailItem: {
        display: "flex",
        alignItems: "center",
        gap: "0.8rem",
        color: Theme.MUTED_AQUA,
        fontSize: "clamp(0.9rem, 2vw, 1rem)",
        padding: "0.8rem 1.2rem",
        background: "rgba(36, 72, 85, 0.3)",
        borderRadius: "12px",
        border: `1px solid ${Theme.MUTED_AQUA}15`,
    },

    FocusChip: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.6rem 1.2rem",
        background: `linear-gradient(135deg, ${Theme.MUDDY_BROWN}20, ${Theme.WARM_RED}15)`,
        borderRadius: "20px",
        border: `1px solid ${Theme.WARM_RED}25`,
        color: Theme.WARM_RED,
        fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
        fontWeight: "500",
        margin: "0.3rem",
        animation: "floatGentle 4s ease-in-out infinite",
    },

    // Achievements Carousel
    AchievementsCarousel: {
        background: `linear-gradient(135deg, 
            rgba(135, 79, 65, 0.1) 0%, 
            rgba(144, 174, 173, 0.05) 100%)`,
        backdropFilter: "blur(15px)",
        borderRadius: "20px",
        padding: "2.5rem",
        border: `1px solid ${Theme.MUTED_AQUA}20`,
        marginTop: "3rem",
        animation: "borderFlow 8s ease-in-out infinite",
    },

    CarouselTitle: {
        fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
        fontWeight: "600",
        color: Theme.WARM_RED,
        marginBottom: "2rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
    },

    AchievementItem: (index) => ({
        display: "flex",
        alignItems: "flex-start",
        gap: "1rem",
        marginBottom: "1.5rem",
        padding: "1.2rem",
        background: "rgba(251, 233, 208, 0.05)",
        borderRadius: "16px",
        border: `1px solid ${Theme.MUTED_AQUA}15`,
        animation: `cardReveal 0.8s ease-out ${0.8 + index * 0.1}s both`,
    }),

    // Fixed Elements
    Logo: {
        position: "fixed",
        top: "3rem",
        left: "4rem",
        zIndex: 100,
        fontSize: "clamp(1.8rem, 4vw, 2.2rem)",
        fontWeight: "800",
        color: Theme.SOFT_BEIGE,
        display: "flex",
        alignItems: "center",
        gap: "12px",
        fontFamily: "'Inter', sans-serif",
        letterSpacing: "-0.02em",
    },

    SocialIcons: {
        position: "fixed",
        top: "3rem",
        right: "4rem",
        display: "flex",
        gap: "1rem",
        zIndex: 100,
    },

    SocialIcon: {
        width: "44px",
        height: "44px",
        borderRadius: "12px",
        background: "rgba(251, 233, 208, 0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(10px)",
        border: `1px solid ${Theme.SOFT_BEIGE}20`,
        transition: "all 0.3s ease",
        cursor: "pointer",
        color: Theme.SOFT_BEIGE,
    },

    PowerButton: {
        position: "fixed",
        top: "1.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        width: "52px",
        height: "52px",
        borderRadius: "16px",
        background: `linear-gradient(135deg, ${Theme.WARM_RED} 0%, ${Theme.MUDDY_BROWN} 100%)`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textDecoration: "none",
        boxShadow: `0 8px 25px ${Theme.WARM_RED}30`,
        zIndex: 100,
        transition: "all 0.3s ease",
    },

    // Background Elements
    FloatingShape: (size, color, top, left, rotation, delay) => ({
        position: "absolute",
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${color}08, ${color}03)`,
        backdropFilter: "blur(40px)",
        borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
        top,
        left,
        transform: `rotate(${rotation}deg)`,
        animation: `floatGentle 6s ease-in-out infinite ${delay}s`,
        zIndex: 0,
    }),
};

// 🎓 COMPONENTS
const LogoComponent = () => (
    <div style={EducationStyles.Logo} className="logo-mobile">
        <div style={{
            width: "12px",
            height: "12px",
            borderRadius: "3px",
            background: `linear-gradient(135deg, ${Theme.WARM_RED}, ${Theme.MUDDY_BROWN})`,
            transform: "rotate(45deg)",
        }}></div>
        JV
    </div>
);

const SocialIcons = () => (
    <div style={EducationStyles.SocialIcons} className="social-icons-mobile">
        <div style={EducationStyles.SocialIcon} className="hover-lift social-icon-mobile">
            <Github size={20} />
        </div>
        <div style={EducationStyles.SocialIcon} className="hover-lift social-icon-mobile">
            <Linkedin size={20} />
        </div>
    </div>
);

const PowerButton = () => (
    <a href="/Main2" style={EducationStyles.PowerButton} className="hover-lift power-button-mobile">
        <Zap size={24} style={{ color: Theme.CREAM_WHITE }} />
    </a>
);

const DetailItem = ({ icon: Icon, text }) => (
    <div style={EducationStyles.DetailItem}>
        <Icon size={16} />
        <span>{text}</span>
    </div>
);

const FocusChip = ({ text }) => (
    <div style={EducationStyles.FocusChip}>
        <Sparkles size={14} />
        {text}
    </div>
);

const AchievementItem = ({ icon: Icon, text, index }) => (
    <div style={EducationStyles.AchievementItem(index)}>
        <div style={{
            width: "20px",
            height: "20px",
            borderRadius: "6px",
            background: `linear-gradient(135deg, ${Theme.WARM_RED}20, ${Theme.MUTED_AQUA}25)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            marginTop: "2px",
            border: `1px solid ${Theme.WARM_RED}30`,
        }}>
            <Icon size={12} color={Theme.WARM_RED} />
        </div>
        <span style={{ 
            lineHeight: "1.5", 
            opacity: 0.9, 
            flex: 1,
            fontSize: "clamp(0.9rem, 2vw, 1rem)"
        }}>{text}</span>
    </div>
);

// 🎓 MAIN COMPONENT
const EducationPage = () => {
    const [currentAchievement, setCurrentAchievement] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    const achievements = [
        { icon: Award, text: "Best Design Concept Award - Annual Fashion Exhibition 2023" },
        { icon: Award, text: "Sustainable Design Recognition - Green Fashion Initiative 2022" },
        { icon: Award, text: "Academic Excellence Award - FDDI Kolkata 2022" },
        { icon: Award, text: "Featured Designer - Kolkata Design Week 2023" },
    ];

    const focusAreas = [
        "Apparel Design",
        "Material Science", 
        "Sustainability",
        "Accessory Design",
        "Technical Drawing",
        "Fashion Business"
    ];

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        const interval = setInterval(() => {
            setCurrentAchievement((prev) => (prev + 1) % achievements.length);
        }, 3000);
        
        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    return (
        <div style={EducationStyles.Box} className="education-box">
            <style>{animationsCSS}</style>
            
            {/* Enhanced Hover Effects */}
            <style>
                {`
                    .hover-lift:hover {
                        transform: translateY(-2px) scale(1.02);
                        box-shadow: 0 15px 35px rgba(230, 72, 51, 0.25);
                    }
                    
                    .card-hover:hover {
                        transform: translateY(-5px) scale(1.01);
                        box-shadow: 
                            0 35px 70px rgba(36, 72, 85, 0.4),
                            inset 0 1px 0 rgba(251, 233, 208, 0.2);
                    }
                    
                    @media (hover: none) {
                        .hover-lift:hover, .card-hover:hover {
                            transform: none;
                        }
                    }
                `}
            </style>

            {/* Background Shapes - Hide on mobile */}
            {!isMobile && (
                <>
                    <div style={EducationStyles.FloatingShape("400px", Theme.WARM_RED, "10%", "5%", 45, 0)} className="floating-shape" />
                    <div style={EducationStyles.FloatingShape("300px", Theme.MUTED_AQUA, "70%", "10%", -20, 2)} className="floating-shape" />
                    <div style={EducationStyles.FloatingShape("500px", Theme.MUDDY_BROWN, "20%", "80%", 15, 1)} className="floating-shape" />
                </>
            )}

            <LogoComponent />
            <SocialIcons />
            <PowerButton />

            <div style={EducationStyles.LayoutContainer} className="education-layout">
                
                {/* Left Panel - Timeline */}
                <div style={EducationStyles.LeftPanel} className="left-panel">
                    <h1 style={EducationStyles.MainHeading} className="main-heading">
                        Academic<br />Journey
                    </h1>
                    <p style={EducationStyles.SubHeading} className="sub-heading">
                        From foundational education to specialized design studies, 
                        each step has shaped my creative perspective and technical expertise.
                    </p>

                    <div style={EducationStyles.Timeline} className="timeline">
                        {/* Timeline Item 1 */}
                        <div style={EducationStyles.TimelineItem(0.3)}>
                            <div style={EducationStyles.TimelineDot} className="timeline-dot"></div>
                            <div style={{
                                color: Theme.WARM_RED,
                                fontWeight: "600",
                                fontSize: "clamp(1rem, 2vw, 1.1rem)",
                                marginBottom: "0.5rem",
                            }}>
                                2021 – Present
                            </div>
                            <div style={{
                                color: Theme.SOFT_BEIGE,
                                fontWeight: "700",
                                fontSize: "clamp(1.1rem, 3vw, 1.3rem)",
                            }}>
                                Bachelor of Design
                            </div>
                            <div style={{
                                color: Theme.MUTED_AQUA,
                                fontSize: "clamp(0.9rem, 2vw, 1rem)",
                                marginTop: "0.3rem",
                            }}>
                                FDDI, Kolkata
                            </div>
                        </div>

                        {/* Timeline Item 2 */}
                        <div style={EducationStyles.TimelineItem(0.6)}>
                            <div style={EducationStyles.TimelineDot} className="timeline-dot"></div>
                            <div style={{
                                color: Theme.WARM_RED,
                                fontWeight: "600",
                                fontSize: "clamp(1rem, 2vw, 1.1rem)",
                                marginBottom: "0.5rem",
                            }}>
                                2019 – 2021
                            </div>
                            <div style={{
                                color: Theme.SOFT_BEIGE,
                                fontWeight: "700",
                                fontSize: "clamp(1.1rem, 3vw, 1.3rem)",
                            }}>
                                Higher Secondary
                            </div>
                            <div style={{
                                color: Theme.MUTED_AQUA,
                                fontSize: "clamp(0.9rem, 2vw, 1rem)",
                                marginTop: "0.3rem",
                            }}>
                                S.J. DAV Public School
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Content */}
                <div style={EducationStyles.RightPanel} className="right-panel">
                    
                    {/* FDDI Card */}
                    <div style={EducationStyles.EducationCard} className="card-hover education-card">
                        <div style={EducationStyles.InstitutionHeader} className="institution-header">
                            <div>
                                <h2 style={EducationStyles.InstitutionName}>
                                    Footwear Design & Development Institute
                                </h2>
                                <div style={EducationStyles.DegreeTitle}>
                                    <GraduationCap size={24} />
                                    Bachelor of Design
                                </div>
                            </div>
                            <MapPin size={32} color={Theme.MUTED_AQUA} opacity={0.7} />
                        </div>

                        <div style={EducationStyles.DetailGrid} className="detail-grid">
                            <DetailItem icon={Calendar} text="2021 – Present" />
                            <DetailItem icon={MapPin} text="Kolkata, India" />
                            <DetailItem icon={BookOpen} text="Full-time Program" />
                        </div>

                        <p style={{ 
                            fontSize: "clamp(0.95rem, 2vw, 1.05rem)", 
                            lineHeight: "1.7", 
                            opacity: 0.9, 
                            marginBottom: "2rem",
                            color: Theme.SOFT_BEIGE
                        }}>
                            Comprehensive education in apparel and accessory design with emphasis on 
                            creative expression, technical proficiency, and sustainable fashion practices.
                        </p>

                        <div style={{ marginBottom: "2rem" }}>
                            <div style={{
                                fontSize: "clamp(0.9rem, 2vw, 1rem)",
                                fontWeight: "600",
                                color: Theme.WARM_RED,
                                marginBottom: "1rem",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                            }}>
                                <Sparkles size={16} />
                                Focus Areas
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }} className="focus-chips">
                                {focusAreas.map((area, index) => (
                                    <FocusChip key={index} text={area} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* School Card */}
                    <div 
                      style={{ 
                        ...EducationStyles.EducationCard, 
                        animationDelay: "0.8s" 
                      }} 
                      className="card-hover education-card"
                    >
                        <div style={EducationStyles.InstitutionHeader} className="institution-header">
                            <div>
                                <h2 style={EducationStyles.InstitutionName}>
                                    S.J. DAV Public School
                                </h2>
                                <div style={EducationStyles.DegreeTitle}>
                                    <BookOpen size={24} />
                                    Higher Secondary Education
                                </div>
                            </div>
                            <MapPin size={32} color={Theme.MUTED_AQUA} opacity={0.7} />
                        </div>

                        <div style={EducationStyles.DetailGrid} className="detail-grid">
                            <DetailItem icon={Calendar} text="2019 – 2021" />
                            <DetailItem icon={MapPin} text="Chaibasa, Jharkhand" />
                            <DetailItem icon={BookOpen} text="Science Stream" />
                        </div>

                        <p style={{ 
                            fontSize: "clamp(0.95rem, 2vw, 1.05rem)", 
                            lineHeight: "1.7", 
                            opacity: 0.9,
                            color: Theme.SOFT_BEIGE
                        }}>
                            Foundation years that cultivated creative thinking, analytical skills, 
                            and cultural awareness – establishing the building blocks for design education 
                            and creative problem-solving.
                        </p>
                    </div>

                    {/* Achievements Carousel */}
                    <div style={EducationStyles.AchievementsCarousel} className="achievements-carousel">
                        <h3 style={EducationStyles.CarouselTitle}>
                            <Award size={24} />
                            Academic Recognitions
                        </h3>
                        {achievements.map((achievement, index) => (
                            <AchievementItem
                                key={index}
                                icon={achievement.icon}
                                text={achievement.text}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll Indicator - Hide on mobile */}
            {!isMobile && (
                <div style={{
                    position: "fixed",
                    bottom: "2rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: Theme.MUTED_AQUA,
                    fontSize: "0.9rem",
                    opacity: 0.8,
                    zIndex: 50,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.8rem",
                    background: "rgba(36, 72, 85, 0.7)",
                    padding: "0.8rem 1.5rem",
                    borderRadius: "20px",
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${Theme.MUTED_AQUA}20`,
                    animation: "floatGentle 3s ease-in-out infinite",
                }} className="scroll-indicator">
                    <span>Explore Education</span>
                    <ChevronDown size={16} />
                </div>
            )}
        </div>
    );
};

export default EducationPage;