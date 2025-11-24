import React from "react";
import { Zap, Github, Linkedin, ExternalLink } from "lucide-react";

// --- 1. THEME ---
const Palette = {
    IVORY: "#FFFFF0",
    CHARCOAL: "#4A4A48",
    SAGE_GREEN: "#9CAF88",
    DUSTY_ROSE: "#C4A69F",
    PALE_GRAY: "#D8D8D8",
    WARM_BEIGE: "#D7C7B6",
};

const DarkTheme = {
    body: Palette.CHARCOAL,
    text: Palette.IVORY,
    accent: Palette.SAGE_GREEN,
};

// Placeholder images
const PROJECT_IMAGES = {
    img1: "project1.jpg",
    img2: "project2.jpg",
    img3: "project3.jpg",
    img4: "project4.jpg",
    img5: "project5.jpg",
    img6: "project6.jpg",
};

const Projects = [
    { id: 1, name: "Urban Utility Line: Chroma", description: "Modular, sustainable casual wear...", tags: ["Sustainability", "Casual Wear"], github: "#", link: "#", image: PROJECT_IMAGES.img1 },
    { id: 2, name: "Conceptual Couture: Earthbound", description: "High-fashion collection inspired...", tags: ["Couture", "Textiles"], github: "#", link: "#", image: PROJECT_IMAGES.img2 },
    { id: 3, name: "Accessories Capsule: Echo", description: "Metallic goods with sharp silhouettes.", tags: ["Accessories", "Minimalism"], github: "#", link: "#", image: PROJECT_IMAGES.img3 },
    { id: 4, name: "RTW Collection: Silhouettes FW25", description: "Oversized proportions and fluid movement.", tags: ["RTW", "Commercial"], github: "#", link: "#", image: PROJECT_IMAGES.img4 },
    { id: 5, name: "Digital Fashion Mockup: Metaverse", description: "3D garment renderings for digital fashion.", tags: ["Digital", "3D Modeling"], github: "#", link: "#", image: PROJECT_IMAGES.img5 },
    { id: 6, name: "Craft Research: Indian Dyes", description: "Traditional Indian dyeing research.", tags: ["Research", "Craft"], github: "#", link: "#", image: PROJECT_IMAGES.img6 },
];

// --- UI COMPONENTS ---
const LogoComponent = () => (
    <div style={{ position: "fixed", left: "3rem", top: "2rem", fontSize: "2rem", fontWeight: 700, color: DarkTheme.text }}>
        JV
    </div>
);

const SocialIcons = () => (
    <div style={{ position: "fixed", right: "3rem", top: "2rem", display: "flex", gap: "1rem", zIndex: 50 }}>
        <Github size={24} color={DarkTheme.text} />
        <Linkedin size={24} color={DarkTheme.text} />
    </div>
);

/* --- UPDATED POWER BUTTON (goes to main2) --- */
const PowerButton = () => (
    <a href="jiya-portfolio/#/main2" style={PortfolioStyles.PowerButton}>
        <Zap size={30} style={{ color: DarkTheme.body }} />
    </a>
);

const ParticleComponent = () => (
    <div style={{ position: "fixed", inset: 0, opacity: 0.08 }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.3), transparent 40%)" }}></div>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 90% 80%, rgba(255,255,255,0.3), transparent 40%)" }}></div>
    </div>
);

// Project Card Component
const ProjectComponent = ({ project, index }) => {
    const { name, description, tags } = project;
    const [isHovered, setIsHovered] = React.useState(false);

    // Placeholder image
    const placeholder = `https://placehold.co/400x250/${Palette.DUSTY_ROSE.substring(1)}/${DarkTheme.body.substring(1)}?text=${encodeURIComponent(name)}`;

    return (
        <div
            style={{
                ...ProjectCardStyles.Container,
                transform: isHovered ? "translateY(-10px) scale(1.02)" : "translateY(0) scale(1)",
                borderColor: isHovered ? DarkTheme.accent : DarkTheme.text,
                boxShadow: isHovered ? `0 20px 50px ${Palette.SAGE_GREEN}50` : "0 10px 30px rgba(0,0,0,0.4)",
                animation: `fadeIn 0.8s ease-out ${index * 0.1}s forwards`,
                opacity: 0,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <style>
                {`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(50px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                `}
            </style>

            {/* Image */}
            <div style={ProjectCardStyles.ImageWrapper}>
                <img src={placeholder} alt={name} style={ProjectCardStyles.Image} />
            </div>

            <h2 style={ProjectCardStyles.Title}>{name}</h2>
            <p style={ProjectCardStyles.Description}>{description}</p>

            <div style={ProjectCardStyles.TagContainer}>
                {tags.map((tag, i) => (
                    <span key={i} style={ProjectCardStyles.Tag}>{tag}</span>
                ))}
            </div>
        </div>
    );
};

// Project Card Styles
const ProjectCardStyles = {
    Container: {
        borderRadius: "12px",
        border: "2px solid",
        padding: "1.5rem",
        paddingTop: 0,
        display: "flex",
        flexDirection: "column",
        backgroundColor: DarkTheme.body,
        color: DarkTheme.text,
        cursor: "pointer",
        transition: "0.4s",
    },
    ImageWrapper: {
        height: "250px",
        width: "calc(100% + 3rem)",
        margin: "-2px -1.5rem 1.5rem -1.5rem",
        overflow: "hidden",
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
    },
    Image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    Title: {
        fontSize: "1.5rem",
        fontWeight: "700",
        fontFamily: "serif",
        color: DarkTheme.accent,
        marginBottom: "0.5rem",
    },
    Description: {
        fontSize: "1rem",
        marginBottom: "1rem",
        lineHeight: "1.6",
    },
    TagContainer: {
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
        marginTop: "auto",
    },
    Tag: {
        fontSize: "0.75rem",
        padding: "0.3rem 0.6rem",
        borderRadius: "4px",
        backgroundColor: DarkTheme.accent,
        color: DarkTheme.body,
    },
};

// Page Styles
const PortfolioStyles = {
    Container: {
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: DarkTheme.body,
        padding: "6rem 5rem",
        fontFamily: "sans-serif",
        position: "relative",
    },
    Grid: {
        display: "grid",
        gap: "3rem",
        gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    },
    PowerButton: {
        position: "fixed",
        top: "1rem",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: DarkTheme.text,
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textDecoration: "none",
        zIndex: 999,
    },
};

// Main Page Component
const PortfolioPage = () => {
    return (
        <div style={PortfolioStyles.Container}>
            <LogoComponent />
            <PowerButton />
            <SocialIcons />
            <ParticleComponent />

            <div style={PortfolioStyles.Grid}>
                {Projects.map((project, i) => (
                    <ProjectComponent key={project.id} project={project} index={i} />
                ))}
            </div>

            <h1 style={{ position: "absolute", top: "4rem", left: "4rem", fontSize: "18vh", opacity: 0.08, fontWeight: 900, color: DarkTheme.text }}>
                PROJECTS
            </h1>
        </div>
    );
};

export default PortfolioPage;
