// /src/pages/ProjectPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// ---- THEME ----
const Theme = {
    body: "#4A4A48",
    text: "#FFFFF0",
    accent1: "#9CAF88",
    accent2: "#C4A69F",
    accent3: "#D7C7B6",
};

// ---- PROJECT DATA (EDIT IMAGES HERE) ----
const PROJECTS = {
    1: {
        title: "Chittah : Journey Beyond Illusion",
        description: `
Chittah is a conceptual fashion narrative exploring the subconscious mind.
Through serpentine silhouettes, sacred symbols, and psychological metaphors,
the collection moves through phases of confusion, illusion, entanglement, awakening,
and transcendence. Each garment visualizes a moment of self-realization — from The Trap, 
to Immobiliz, to Shedding, and finally, The State of Selflessness.
        `,
        images: [
            "/assets/projects/chittah1.jpg",
            "/assets/projects/chittah2.jpg",
            "/assets/projects/chittah3.jpg",
            "/assets/projects/chittah4.jpg",
        ],
    },

    2: {
        title: "HER DESHER — The Red One",
        description: `
HER DESHER imagines a Martian civilization where a queen rules an underground
society inspired by ant hierarchies. The garments merge alien textures with
androgynous silhouettes — swelling forms, cavern-inspired sleeves, and
exoskeleton-like structures. The red palette reflects Martian soil, while
deep blues represent cosmic introspection.
        `,
        images: [
            "/assets/projects/her1.jpg",
            "/assets/projects/her2.jpg",
            "/assets/projects/her3.jpg",
        ],
    },

    3: {
        title: "MIMOSA — Internship Collection",
        description: `
MIMOSA is a handcrafted womenswear project featuring soft tailoring,
3D floral appliqué, thread-paint embroidery, and layered petals. Pastel tones
and delicate textures reflect elegance and femininity. The project includes
runway preparation, fittings, backstage work, and social media styling.
        `,
        images: [
            "/assets/projects/mimosa1.jpg",
            "/assets/projects/mimosa2.jpg",
            "/assets/projects/mimosa3.jpg",
        ],
    },
};

// ---- PAGE STYLES ----
const styles = {
    page: {
        backgroundColor: Theme.body,
        minHeight: "100vh",
        padding: "5rem 4rem",
        color: Theme.text,
        fontFamily: "serif",
    },
    back: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        color: Theme.text,
        textDecoration: "none",
        marginBottom: "2rem",
        fontSize: "1.1rem",
    },
    title: {
        fontSize: "3rem",
        fontWeight: "700",
        marginBottom: "1rem",
        color: Theme.accent2,
    },
    desc: {
        fontSize: "1.2rem",
        lineHeight: "1.7",
        maxWidth: "900px",
        whiteSpace: "pre-line",
        marginBottom: "2rem",
    },
    gallery: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "1.5rem",
        marginTop: "2rem",
    },
    img: {
        width: "100%",
        height: "auto",
        borderRadius: "10px",
        objectFit: "cover",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
        transition: "transform 0.3s ease",
    },
};

// ---- MAIN COMPONENT ----
const ProjectPage = () => {
    const { id } = useParams();

    const project = PROJECTS[id];

    if (!project) {
        return (
            <div style={{ ...styles.page, textAlign: "center", paddingTop: "10rem" }}>
                <h1 style={{ fontSize: "3rem" }}>Project Not Found</h1>
                <Link to="/work" style={{ ...styles.back, marginTop: "2rem" }}>
                    <ArrowLeft size={20} />
                    Back to Work
                </Link>
            </div>
        );
    }

    return (
        <div style={styles.page}>
            {/* Back Button */}
            <Link to="/work" style={styles.back}>
                <ArrowLeft size={20} />
                Back to Work
            </Link>

            {/* Title */}
            <h1 style={styles.title}>{project.title}</h1>

            {/* Description */}
            <p style={styles.desc}>{project.description}</p>

            {/* Image Gallery */}
            <div style={styles.gallery}>
                {project.images.map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        alt={`${project.title} ${i + 1}`}
                        style={styles.img}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProjectPage;
