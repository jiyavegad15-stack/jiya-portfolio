import React, { useState, useEffect, useRef } from "react";
import { 
  Award, 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  MapPin, 
  Sparkles, 
  ChevronDown, 
  Home, 
  User, 
  Briefcase, 
  FileText,
  ArrowLeft,
  ExternalLink,
  Star,
  Target,
  Feather,
  Layers,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

// 🎨 EXTENDED REFINED PALETTE
const Theme = {
    BG: "#FDFCF8",         // Warm Alabaster
    BG_SECONDARY: "rgba(214, 110, 83, 0.05)", // Terracotta tint
    TEXT_MAIN: "#1B2A2F",  // Charcoal / Deep Green
    TEXT_MUTED: "#6C757D", // Muted Grey
    ACCENT: "#D66E53",     // Terracotta
    ACCENT_LIGHT: "#E89A87",
    LINE: "rgba(27, 42, 47, 0.1)",
    WHITE: "#FFFFFF",
    SHADOW: "rgba(27, 42, 47, 0.08)"
};

// 📱 RESPONSIVE BREAKPOINTS
const Breakpoints = {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1280
};

// 🎬 ANIMATIONS & GLOBAL STYLES
const GlobalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    background: ${Theme.BG};
    overflow-x: hidden;
}

/* Fluid Typography */
@media (max-width: ${Breakpoints.MOBILE}px) {
    html { font-size: 14px; }
}

/* Animations */
@keyframes floatIn {
    0% { 
        opacity: 0; 
        transform: translateY(40px) scale(0.95); 
    }
    100% { 
        opacity: 1; 
        transform: translateY(0) scale(1); 
    }
}

@keyframes lineDraw {
    0% { 
        width: 0; 
        background-position: 0% 50%; 
    }
    100% { 
        width: 100%; 
        background-position: 100% 50%; 
    }
}

@keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
}

@keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
}

/* Card Hover Effects */
.education-card {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
}

.education-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${Theme.ACCENT}, transparent);
    animation: shimmer 2s infinite;
}

.education-card:hover {
    transform: translateY(-12px) scale(1.02);
    border-color: ${Theme.ACCENT} !important;
    box-shadow: 
        0 25px 50px rgba(214, 110, 83, 0.1),
        0 15px 35px rgba(27, 42, 47, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.education-card:hover::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
        transparent, 
        ${Theme.ACCENT}, 
        ${Theme.ACCENT_LIGHT}, 
        ${Theme.ACCENT}, 
        transparent);
    animation: gradientShift 3s ease infinite;
}

/* Timeline Line */
.timeline-line {
    position: absolute;
    left: 50%;
    top: 0;
    width: 1px;
    height: 100%;
    background: linear-gradient(to bottom, 
        transparent, 
        ${Theme.ACCENT} 20%, 
        ${Theme.ACCENT} 80%, 
        transparent);
    transform: translateX(-50%);
    animation: lineDraw 2s ease-out forwards;
}

@media (max-width: ${Breakpoints.MOBILE}px) {
    .timeline-line { 
        left: 30px; 
        transform: none;
    }
}

/* Achievement Card Hover */
.achievement-card {
    transition: all 0.4s ease;
    position: relative;
}

.achievement-card:hover {
    transform: translateY(-8px);
    background: ${Theme.WHITE} !important;
    box-shadow: 0 20px 40px rgba(214, 110, 83, 0.1);
}

.achievement-card::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: ${Theme.ACCENT};
    transition: width 0.3s ease;
}

.achievement-card:hover::after {
    width: 60px;
}

/* Scroll Indicator */
.scroll-indicator {
    animation: pulse 2s ease-in-out infinite;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: ${Theme.BG};
}

::-webkit-scrollbar-thumb {
    background: linear-gradient(to bottom, ${Theme.ACCENT}, ${Theme.ACCENT_LIGHT});
    border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
    background: ${Theme.ACCENT};
}
`;

const Styles = {
    // Main Container
    Container: {
        backgroundColor: Theme.BG,
        minHeight: "100vh",
        minHeight: "100dvh", // Dynamic viewport height
        width: "100vw",
        color: Theme.TEXT_MAIN,
        fontFamily: "'Montserrat', sans-serif",
        position: "relative",
        overflowX: "hidden"
    },

    // Back Button
    BackButton: (screenWidth) => ({
        position: "fixed",
        top: screenWidth < Breakpoints.MOBILE ? "1.5rem" : "2.5rem",
        left: screenWidth < Breakpoints.MOBILE ? "1.5rem" : "3rem",
        zIndex: 1000,
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(10px)",
        border: `1px solid ${Theme.LINE}`,
        borderRadius: "50%",
        width: screenWidth < Breakpoints.MOBILE ? "44px" : "50px",
        height: screenWidth < Breakpoints.MOBILE ? "44px" : "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.3s ease",
        textDecoration: "none",
        "&:hover": {
            transform: "translateX(-4px)",
            background: Theme.WHITE,
            boxShadow: `0 10px 30px ${Theme.SHADOW}`
        }
    }),

    // Hero Section
    HeroSection: (screenWidth) => ({
        padding: screenWidth < Breakpoints.MOBILE ? "8rem 1.5rem 4rem" : "12rem 10% 6rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        animation: "floatIn 1s ease forwards"
    }),

    HeroBackground: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "100%",
        background: `linear-gradient(135deg, ${Theme.BG} 0%, rgba(214, 110, 83, 0.03) 100%)`,
        zIndex: -1
    },

    MainHeading: (screenWidth) => ({
        fontFamily: "'Playfair Display', serif",
        fontSize: screenWidth < Breakpoints.MOBILE ? "clamp(2.5rem, 12vw, 3.5rem)" : "clamp(3.5rem, 8vw, 5.5rem)",
        fontWeight: "600",
        margin: "0 0 1rem 0",
        lineHeight: "1.1",
        background: `linear-gradient(135deg, ${Theme.TEXT_MAIN} 0%, ${Theme.ACCENT} 100%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text"
    }),

    SubHeading: (screenWidth) => ({
        fontSize: screenWidth < Breakpoints.MOBILE ? "0.75rem" : "0.85rem",
        textTransform: "uppercase",
        letterSpacing: screenWidth < Breakpoints.MOBILE ? "3px" : "4px",
        color: Theme.ACCENT,
        fontWeight: "500",
        marginBottom: screenWidth < Breakpoints.MOBILE ? "1.5rem" : "2rem",
        display: "inline-block",
        padding: "0.5rem 1.5rem",
        border: `1px solid rgba(214, 110, 83, 0.2)`,
        borderRadius: "100px",
        background: "rgba(255, 255, 255, 0.5)"
    }),

    HeroDescription: (screenWidth) => ({
        maxWidth: screenWidth < Breakpoints.MOBILE ? "100%" : "600px",
        margin: "2rem auto 0",
        fontSize: screenWidth < Breakpoints.MOBILE ? "1rem" : "1.1rem",
        lineHeight: "1.8",
        color: Theme.TEXT_MUTED,
        fontWeight: "300"
    }),

    // Timeline Container
    TimelineContainer: (screenWidth) => ({
        position: "relative",
        maxWidth: screenWidth < Breakpoints.DESKTOP ? "100%" : "1400px",
        margin: "0 auto",
        padding: screenWidth < Breakpoints.MOBILE ? "2rem 1.5rem" : "4rem 2rem",
        overflow: "hidden"
    }),

    // Card Wrapper
    CardWrapper: (isRight, screenWidth) => ({
        display: "flex",
        justifyContent: screenWidth < Breakpoints.MOBILE ? "flex-start" : (isRight ? "flex-end" : "flex-start"),
        width: "100%",
        marginBottom: screenWidth < Breakpoints.MOBILE ? "4rem" : "6rem",
        paddingLeft: screenWidth < Breakpoints.MOBILE ? "60px" : "0",
        position: "relative",
        animation: "floatIn 0.8s ease forwards",
        animationDelay: "calc(var(--index) * 0.2s)"
    }),

    // Education Card
    EducationCard: (screenWidth) => ({
        width: screenWidth < Breakpoints.MOBILE ? "100%" : "46%",
        padding: screenWidth < Breakpoints.MOBILE ? "2rem" : "3rem",
        background: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(10px)",
        border: `1px solid ${Theme.LINE}`,
        borderRadius: "0px",
        position: "relative",
        zIndex: 2
    }),

    // Timeline Dot
    Dot: (screenWidth) => ({
        position: "absolute",
        left: screenWidth < Breakpoints.MOBILE ? "30px" : "50%",
        top: screenWidth < Breakpoints.MOBILE ? "50px" : "40px",
        width: screenWidth < Breakpoints.MOBILE ? "14px" : "16px",
        height: screenWidth < Breakpoints.MOBILE ? "14px" : "16px",
        background: `radial-gradient(circle, ${Theme.ACCENT} 30%, ${Theme.ACCENT_LIGHT} 100%)`,
        borderRadius: "50%",
        transform: screenWidth < Breakpoints.MOBILE ? "none" : "translateX(-50%)",
        zIndex: 10,
        boxShadow: `0 0 0 4px rgba(214, 110, 83, 0.1)`,
        animation: "pulse 2s ease-in-out infinite"
    }),

    // Date Styling
    DateText: (screenWidth) => ({
        fontFamily: "'Montserrat', sans-serif",
        fontSize: screenWidth < Breakpoints.MOBILE ? "0.65rem" : "0.7rem",
        letterSpacing: screenWidth < Breakpoints.MOBILE ? "2px" : "3px",
        color: Theme.ACCENT,
        marginBottom: "1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "8px"
    }),

    // Institution Name
    InstitutionName: (screenWidth) => ({
        fontFamily: "'Playfair Display', serif",
        fontSize: screenWidth < Breakpoints.MOBILE ? "1.5rem" : "1.8rem",
        fontWeight: "600",
        marginBottom: "0.5rem",
        lineHeight: "1.2"
    }),

    // Degree Title
    DegreeTitle: (screenWidth) => ({
        fontSize: screenWidth < Breakpoints.MOBILE ? "0.85rem" : "0.9rem",
        color: Theme.TEXT_MUTED,
        fontWeight: "400",
        marginBottom: screenWidth < Breakpoints.MOBILE ? "1.5rem" : "2rem",
        display: "flex",
        alignItems: "center",
        gap: "10px"
    }),

    // Achievements Section
    AchievementsSection: (screenWidth) => ({
        padding: screenWidth < Breakpoints.MOBILE ? "3rem 1.5rem" : "6rem 10%",
        background: `linear-gradient(180deg, ${Theme.BG} 0%, ${Theme.BG_SECONDARY} 100%)`,
        position: "relative",
        overflow: "hidden"
    }),

    AchievementsGrid: (screenWidth) => ({
        display: "grid",
        gridTemplateColumns: screenWidth < Breakpoints.MOBILE ? "1fr" : 
                           screenWidth < Breakpoints.TABLET ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
        gap: screenWidth < Breakpoints.MOBILE ? "1.5rem" : "2rem",
        maxWidth: "1200px",
        margin: "0 auto"
    }),

    AchievementCard: (screenWidth) => ({
        padding: screenWidth < Breakpoints.MOBILE ? "2rem" : "2.5rem",
        background: Theme.WHITE,
        border: `1px solid ${Theme.LINE}`,
        borderRadius: "0px",
        textAlign: "center",
        position: "relative"
    }),

    // Skills Section
    SkillsSection: (screenWidth) => ({
        padding: screenWidth < Breakpoints.MOBILE ? "3rem 1.5rem" : "6rem 10%",
        background: Theme.BG
    }),

    SkillsGrid: (screenWidth) => ({
        display: "grid",
        gridTemplateColumns: screenWidth < Breakpoints.MOBILE ? "1fr" : 
                           screenWidth < Breakpoints.TABLET ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
        gap: screenWidth < Breakpoints.MOBILE ? "1.5rem" : "2rem",
        maxWidth: "1200px",
        margin: "3rem auto 0"
    }),

    SkillItem: {
        textAlign: "center",
        padding: "1.5rem",
        border: `1px solid ${Theme.LINE}`,
        background: "rgba(255, 255, 255, 0.5)"
    },

    // Bottom Navigation
    BottomNavbar: (screenWidth) => ({
        position: "fixed",
        bottom: screenWidth < Breakpoints.MOBILE ? "1.5rem" : "2.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        gap: screenWidth < Breakpoints.MOBILE ? "1.5rem" : "2.5rem",
        padding: screenWidth < Breakpoints.MOBILE ? "0.75rem 1.5rem" : "1rem 2.5rem",
        background: "rgba(255, 255, 255, 0.92)",
        backdropFilter: "blur(20px)",
        borderRadius: "100px",
        border: `1px solid ${Theme.LINE}`,
        zIndex: 1000,
        boxShadow: "0 20px 60px rgba(0,0,0,0.08)"
    }),

    NavLink: (screenWidth) => ({
        textDecoration: "none",
        color: Theme.TEXT_MUTED,
        fontSize: screenWidth < Breakpoints.MOBILE ? "0.6rem" : "0.65rem",
        fontWeight: "600",
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
        transition: "all 0.3s ease",
        padding: "0.5rem",
        borderRadius: "8px",
        "&:hover": {
            color: Theme.ACCENT,
            background: "rgba(214, 110, 83, 0.05)"
        }
    }),

    ActiveNavLink: (screenWidth) => ({
        color: Theme.ACCENT,
        background: "rgba(214, 110, 83, 0.08)",
        transform: "translateY(-2px)"
    }),

    // Scroll Indicator
    ScrollIndicator: (screenWidth) => ({
        position: "absolute",
        bottom: screenWidth < Breakpoints.MOBILE ? "1rem" : "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        color: Theme.ACCENT,
        fontSize: "0.7rem",
        letterSpacing: "2px",
        opacity: 0.7,
        animation: "pulse 2s ease-in-out infinite"
    }),

    // Section Title
    SectionTitle: (screenWidth) => ({
        fontFamily: "'Playfair Display', serif",
        fontSize: screenWidth < Breakpoints.MOBILE ? "2rem" : "2.8rem",
        textAlign: "center",
        marginBottom: screenWidth < Breakpoints.MOBILE ? "2rem" : "3rem",
        position: "relative",
        "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-1rem",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60px",
            height: "1px",
            background: Theme.ACCENT
        }
    })
};

const EducationPage = () => {
    const [screenWidth, setScreenWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
    const [activeSection, setActiveSection] = useState('timeline');
    const containerRef = useRef(null);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        handleResize();
        window.addEventListener('resize', handleResize);

        // Intersection Observer for active section
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.5, rootMargin: '-100px 0px -100px 0px' }
        );

        const sections = document.querySelectorAll('section[id]');
        sections.forEach((section) => observer.observe(section));

        return () => {
            window.removeEventListener('resize', handleResize);
            observer.disconnect();
        };
    }, []);

    const educationData = [
        {
            year: "2021 – 2025",
            institution: "Footwear Design & Development Institute",
            degree: "Bachelor of Design (Specialization in Fashion Technology)",
            location: "Kolkata, West Bengal",
            description: "Specializing in the fusion of traditional craftsmanship and digital manufacturing. Exploring the boundaries of wearable art through sustainable materials and innovative design methodologies.",
            icon: <Layers size={20} />,
            highlights: ["Sustainable Design", "Digital Pattern Making", "Material Innovation", "Portfolio Development"],
            side: "left"
        },
        {
            year: "2019 – 2021",
            institution: "S.J. DAV Public School",
            degree: "Higher Secondary Education (Science Stream)",
            location: "Chaibasa, Jharkhand",
            description: "Focusing on the intersections of science and geometry, which later became the structural foundation of my design philosophy. Developed analytical thinking and precision.",
            icon: <Target size={20} />,
            highlights: ["Physics & Mathematics", "Art & Design", "Research Methodology", "Academic Excellence"],
            side: "right"
        }
    ];

    const achievements = [
        { 
            title: "Best Design Concept '23", 
            description: "Awarded for innovative sustainable fashion concept",
            icon: <Award size={24} />,
            year: "2023"
        },
        { 
            title: "Sustainable Excellence", 
            description: "Recognition for eco-friendly material innovation",
            icon: <Feather size={24} />,
            year: "2022"
        },
        { 
            title: "FDDI Merit List", 
            description: "Consistently ranked among top 5% of cohort",
            icon: <Star size={24} />,
            year: "2021-2024"
        },
        { 
            title: "Digital Innovation Award", 
            description: "Excellence in 3D fashion design technology",
            icon: <Zap size={24} />,
            year: "2023"
        }
    ];

    const skills = [
        { name: "Pattern Making", level: "Advanced", icon: "✂️" },
        { name: "3D Design", level: "Proficient", icon: "🖥️" },
        { name: "Material Science", level: "Intermediate", icon: "🔬" },
        { name: "Sustainable Design", level: "Advanced", icon: "🌱" },
        { name: "Portfolio Development", level: "Expert", icon: "📁" },
        { name: "Digital Rendering", level: "Proficient", icon: "🎨" },
        { name: "Textile Technology", level: "Intermediate", icon: "🧵" },
        { name: "Fashion Illustration", level: "Expert", icon: "✏️" }
    ];

    const handleSmoothScroll = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div ref={containerRef} style={Styles.Container}>
            <style>{GlobalStyles}</style>

            {/* Back to Home */}
            <Link to="/main2" style={Styles.BackButton(screenWidth)} aria-label="Back to Home">
                <ArrowLeft size={screenWidth < Breakpoints.MOBILE ? 18 : 20} />
            </Link>

            {/* Hero Section */}
            <section id="hero" style={Styles.HeroSection(screenWidth)}>
                <div style={Styles.HeroBackground}></div>
                <span style={Styles.SubHeading(screenWidth)}>Academic Journey</span>
                <h1 style={Styles.MainHeading(screenWidth)}>Curriculum Vitae</h1>
                <p style={Styles.HeroDescription(screenWidth)}>
                    A meticulously documented voyage through formal education, specialized training, 
                    and continuous learning that shapes my design philosophy and technical expertise.
                </p>
                
                {/* Scroll Indicator */}
                <div style={Styles.ScrollIndicator(screenWidth)} className="scroll-indicator">
                    <ChevronDown size={20} />
                    <span>EXPLORE</span>
                </div>
            </section>

            {/* Timeline Section */}
            <section id="timeline" style={Styles.TimelineContainer(screenWidth)}>
                <div className="timeline-line"></div>
                
                {educationData.map((item, index) => (
                    <div 
                        key={index} 
                        style={{
                            ...Styles.CardWrapper(item.side === "right", screenWidth),
                            "--index": index
                        }}
                    >
                        <div style={Styles.Dot(screenWidth)}></div>
                        
                        <div style={Styles.EducationCard(screenWidth)} className="education-card">
                            <div style={Styles.DateText(screenWidth)}>
                                <Calendar size={14} />
                                {item.year}
                            </div>
                            
                            <h2 style={Styles.InstitutionName(screenWidth)}>{item.institution}</h2>
                            
                            <div style={Styles.DegreeTitle(screenWidth)}>
                                {item.icon}
                                <span>{item.degree}</span>
                            </div>
                            
                            <p style={{ 
                                lineHeight: '1.8', 
                                color: Theme.TEXT_MUTED, 
                                fontSize: screenWidth < Breakpoints.MOBILE ? '0.9rem' : '1rem',
                                marginBottom: '2rem'
                            }}>
                                {item.description}
                            </p>
                            
                            {/* Highlights */}
                            <div style={{ 
                                display: 'flex', 
                                flexWrap: 'wrap', 
                                gap: '0.5rem',
                                marginBottom: '2rem'
                            }}>
                                {item.highlights.map((highlight, i) => (
                                    <span key={i} style={{
                                        fontSize: '0.7rem',
                                        padding: '0.4rem 0.8rem',
                                        background: 'rgba(214, 110, 83, 0.1)',
                                        color: Theme.ACCENT,
                                        borderRadius: '4px',
                                        letterSpacing: '0.5px'
                                    }}>
                                        {highlight}
                                    </span>
                                ))}
                            </div>
                            
                            {/* Location */}
                            <div style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '8px', 
                                color: Theme.ACCENT, 
                                fontSize: '0.7rem', 
                                letterSpacing: '1px',
                                borderTop: `1px solid ${Theme.LINE}`,
                                paddingTop: '1.5rem'
                            }}>
                                <MapPin size={12} />
                                {item.location}
                                <ExternalLink size={10} style={{ marginLeft: 'auto' }} />
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* Achievements Section */}
            <section id="achievements" style={Styles.AchievementsSection(screenWidth)}>
                <h3 style={Styles.SectionTitle(screenWidth)}>Distinctions & Honors</h3>
                <div style={Styles.AchievementsGrid(screenWidth)}>
                    {achievements.map((achievement, index) => (
                        <div 
                            key={index} 
                            style={Styles.AchievementCard(screenWidth)} 
                            className="achievement-card"
                        >
                            <div style={{ 
                                marginBottom: '1.5rem',
                                color: Theme.ACCENT,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '60px',
                                height: '60px',
                                background: 'rgba(214, 110, 83, 0.1)',
                                borderRadius: '50%',
                                margin: '0 auto'
                            }}>
                                {achievement.icon}
                            </div>
                            <h4 style={{ 
                                fontFamily: "'Playfair Display', serif",
                                fontSize: '1.2rem',
                                marginBottom: '0.5rem'
                            }}>
                                {achievement.title}
                            </h4>
                            <p style={{ 
                                fontSize: '0.8rem', 
                                color: Theme.TEXT_MUTED,
                                marginBottom: '0.5rem'
                            }}>
                                {achievement.description}
                            </p>
                            <span style={{ 
                                fontSize: '0.7rem', 
                                color: Theme.ACCENT,
                                letterSpacing: '1px'
                            }}>
                                {achievement.year}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" style={Styles.SkillsSection(screenWidth)}>
                <h3 style={Styles.SectionTitle(screenWidth)}>Core Competencies</h3>
                <div style={Styles.SkillsGrid(screenWidth)}>
                    {skills.map((skill, index) => (
                        <div key={index} style={Styles.SkillItem}>
                            <div style={{ 
                                fontSize: '1.5rem',
                                marginBottom: '1rem'
                            }}>
                                {skill.icon}
                            </div>
                            <h4 style={{ 
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: '1rem',
                                fontWeight: '600',
                                marginBottom: '0.5rem'
                            }}>
                                {skill.name}
                            </h4>
                            <span style={{ 
                                fontSize: '0.75rem', 
                                color: Theme.ACCENT,
                                letterSpacing: '1px'
                            }}>
                                {skill.level}
                            </span>
                            <div style={{
                                height: '2px',
                                background: Theme.LINE,
                                marginTop: '0.5rem',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    height: '100%',
                                    width: skill.level === 'Expert' ? '100%' : 
                                          skill.level === 'Advanced' ? '85%' :
                                          skill.level === 'Proficient' ? '70%' : '50%',
                                    background: Theme.ACCENT
                                }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Bottom Navigation */}
            <nav style={Styles.BottomNavbar(screenWidth)}>
                <a 
                    href="#timeline" 
                    style={{
                        ...Styles.NavLink(screenWidth),
                        ...(activeSection === 'timeline' || activeSection === 'hero' ? Styles.ActiveNavLink(screenWidth) : {})
                    }}
                    onClick={(e) => { e.preventDefault(); handleSmoothScroll('timeline'); }}
                >
                    <BookOpen size={16} />
                    <span>Timeline</span>
                </a>
                <a 
                    href="#achievements" 
                    style={{
                        ...Styles.NavLink(screenWidth),
                        ...(activeSection === 'achievements' ? Styles.ActiveNavLink(screenWidth) : {})
                    }}
                    onClick={(e) => { e.preventDefault(); handleSmoothScroll('achievements'); }}
                >
                    <Award size={16} />
                    <span>Awards</span>
                </a>
                <a 
                    href="#skills" 
                    style={{
                        ...Styles.NavLink(screenWidth),
                        ...(activeSection === 'skills' ? Styles.ActiveNavLink(screenWidth) : {})
                    }}
                    onClick={(e) => { e.preventDefault(); handleSmoothScroll('skills'); }}
                >
                    <Sparkles size={16} />
                    <span>Skills</span>
                </a>
            </nav>
        </div>
    );
};

export default EducationPage;