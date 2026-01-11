import React from 'react';

// 🎨 REFINED COLOR PALETTE (Copied from App.js)
const Theme = {
    DARK_TEAL: "#244855",
    WARM_RED: "#E64833",
    MUDDY_BROWN: "#874F41",
    MUTED_AQUA: "#90AEAD",
    SOFT_BEIGE: "#FBE9D0",
    CREAM_WHITE: "#FFFDF8"
};

const ConceptSketch = () => {
    // 🌿 CSS Animations for the Sketch
    const sketchCSS = `
        @keyframes subtleGlow {
            0%, 100% { box-shadow: 0 0 10px ${Theme.WARM_RED}30; }
            50% { box-shadow: 0 0 25px ${Theme.WARM_RED}60, 0 0 5px ${Theme.SOFT_BEIGE}40; }
        }
        @keyframes sway {
            0%, 100% { transform: translateX(-50%) translate(0, 0) rotate(0deg); }
            33% { transform: translateX(-50%) translate(-2px, 5px) rotate(0.5deg); }
            66% { transform: translateX(-50%) translate(2px, -3px) rotate(-0.5deg); }
        }
        @keyframes pulseBorder {
            0%, 100% { border-color: ${Theme.MUTED_AQUA}40; }
            50% { border-color: ${Theme.WARM_RED}60; }
        }
    `;

    const sketch = {
        wrapper: {
            position: "absolute",
            top: "15%",
            right: "5%",
            height: "72vh",
            width: "32vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 5,
            pointerEvents: "none",
            opacity: 0.85,
            transition: "all 0.5s ease",
            // Apply a subtle color filter to match the mood
            filter: "grayscale(0.1) contrast(1.1)", 
        },

        figure: {
            position: "relative",
            width: "240px",
            height: "540px",
            animation: "sway 18s ease-in-out infinite",
            transformOrigin: '50% 90%', // Sway from the base
        },

        // Head + Hair (Updated to match image aspect and colors)
        head: {
            width: "58px",
            height: "65px",
            background: Theme.SOFT_BEIGE, // Use portfolio palette
            position: "absolute",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            borderRadius: "45% 45% 35% 35%",
            border: `2px solid ${Theme.MUTED_AQUA}40`,
            boxShadow: `0 0 15px ${Theme.MUTED_AQUA}30`,
        },

        hair: {
            position: "absolute",
            top: "0",
            left: "50%",
            width: "120px",
            height: "170px",
            transform: "translateX(-50%)",
            borderRadius: "45% 45% 55% 55%",
            // Darker, richer tone for hair
            background: `linear-gradient(180deg, ${Theme.MUDDY_BROWN}AA, ${Theme.MUDDY_BROWN}20)`,
            boxShadow: `0 0 20px ${Theme.MUDDY_BROWN}40`,
            filter: 'blur(0.5px)',
            clipPath: 'polygon(50% 0, 100% 30%, 100% 100%, 0 100%, 0 30%)', // Sweeping shape
        },

        glasses: {
            position: "absolute",
            top: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "75px",
            height: "25px",
            border: `2px solid ${Theme.SOFT_BEIGE}80`, // Light frame
            borderRadius: "15px / 10px",
            opacity: 0.8,
            zIndex: 10,
            animation: "pulseBorder 4s infinite alternate",
        },

        // Body / Sweater Volume (Using portfolio colors for the garment)
        upperBody: {
            position: "absolute",
            top: "75px",
            left: "50%",
            width: "160px", // Wider, sweater-like volume
            height: "200px",
            transform: "translateX(-50%)",
            // Dark teal/aqua gradient for the sweater
            background: `linear-gradient(180deg, ${Theme.DARK_TEAL}90, ${Theme.MUTED_AQUA}40)`,
            borderRadius: "30% 30% 20% 20%",
            border: `2px solid ${Theme.MUTED_AQUA}30`,
            backdropFilter: "blur(4px)",
        },

        // Phone hand (Raised right hand - selfie pose)
        armRight: {
            position: "absolute",
            top: "110px",
            right: "-20px",
            width: "100px",
            height: "180px",
            transform: "rotate(-18deg)",
            borderRight: `4px solid ${Theme.MUTED_AQUA}60`, // Defined arm line
            borderRadius: "40px",
            opacity: 0.8,
        },

        phone: {
            position: "absolute",
            top: "22px",
            right: "0px",
            width: "55px",
            height: "110px",
            borderRadius: "12px",
            background: `linear-gradient(135deg, ${Theme.WARM_RED}30, ${Theme.MUDDY_BROWN}30)`,
            border: `2px solid ${Theme.WARM_RED}60`,
            backdropFilter: "blur(2px)",
            animation: "subtleGlow 6s infinite alternate", // Highlight the creation tool
        },

        // Left hand (More relaxed)
        armLeft: {
            position: "absolute",
            top: "135px",
            left: "-28px",
            width: "70px",
            height: "180px",
            transform: "rotate(18deg)",
            borderLeft: `2px solid ${Theme.MUTED_AQUA}40`,
            borderRadius: "30px",
            opacity: 0.5,
        },

        // Ground fade (Stylized base)
        lowerFade: {
            position: "absolute",
            bottom: "-50px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "250px",
            height: "150px",
            background:
                `radial-gradient(circle, ${Theme.DARK_TEAL}90, rgba(0,0,0,0))`,
            filter: "blur(15px)",
            opacity: 0.7,
        },
    };

    return (
        <div className="hidden lg:block" style={sketch.wrapper}>
            <style>{sketchCSS}</style>
            <div style={sketch.figure}>
                <div style={sketch.hair}></div>
                <div style={sketch.head}></div>
                <div style={sketch.glasses}></div>

                <div style={sketch.upperBody}></div>

                {/* Right Arm and Phone - grouped */}
                <div style={sketch.armRight}>
                    <div style={sketch.phone}></div>
                </div>

                <div style={sketch.armLeft}></div>

                <div style={sketch.lowerFade}></div>
            </div>
        </div>
    );
};

export default ConceptSketch;