import React, { useEffect, useState } from "react";
import { Scissors } from "lucide-react";

const Theme = {
  bg: "#FFFEFB",
  dark: "#142E3A",
  accent: "#C96B5A",
  gold: "#D6B87C",
  text: "#3A4A55"
};

const NAME = "Jiya Vegad";
const TITLE = "Fashion Designer & Creative Director";
const DURATION = 5200;

const EntryAnimation = ({ children }) => {
  const [phase, setPhase] = useState("entering");

  useEffect(() => {
    const exitTimer = setTimeout(() => setPhase("exiting"), DURATION - 1200);
    const removeTimer = setTimeout(() => setPhase("hidden"), DURATION);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (phase === "hidden") return children;

  return (
    <>
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/adeptly');

        .overlay {
          position: fixed;
          inset: 0;
          background: ${Theme.bg};
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          z-index: 9999;
        }

        .overlay.exiting {
          animation: silkReveal 1.4s cubic-bezier(.77,0,.18,1) forwards;
        }

        .ambient {
          position: absolute;
          width: 90vw;
          height: 90vw;
          background: radial-gradient(circle, ${Theme.gold}15, transparent 60%);
          filter: blur(100px);
          animation: pulse 7s ease-in-out infinite alternate;
        }

        .content {
          position: relative;
          z-index: 2;
          text-align: center;
        }

        .name {
          font-family: 'Adeptly', sans-serif;
          font-size: clamp(3.5rem, 7vw, 6rem);
          font-weight: 600;
          color: ${Theme.dark};
          letter-spacing: 0.15em;
          opacity: 0;
          transform: translateY(40px);
          animation: nameFloat 2s cubic-bezier(.22,1,.36,1) forwards 0.6s;
        }

        .thread {
          position: relative;
          width: 340px;
          height: 50px;
          margin: 1.2rem auto;
        }

        .line {
          position: absolute;
          top: 50%;
          left: 50%;
          height: 1.5px;
          width: 0;
          background: linear-gradient(
            90deg,
            transparent,
            ${Theme.accent},
            ${Theme.gold}
          );
          transform: translate(-50%, -50%);
          animation: stitch 1.6s ease forwards 2s;
        }

        .needle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(40deg);
          opacity: 0;
          color: ${Theme.dark};
          animation: needleGlide 1.6s ease forwards 2s;
        }

        .title {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.9rem;
          letter-spacing: 0.45em;
          text-transform: uppercase;
          color: ${Theme.text};
          opacity: 0;
          transform: translateY(20px);
          animation: titleFade 1.2s ease forwards 3.2s;
        }

        @keyframes nameFloat {
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes stitch {
          to { width: 100%; opacity: 0.8; }
        }

        @keyframes needleGlide {
          to { left: 100%; opacity: 0; }
        }

        @keyframes titleFade {
          to { opacity: 0.75; transform: translateY(0); }
        }

        @keyframes pulse {
          from { transform: scale(0.95); }
          to { transform: scale(1.05); }
        }

        @keyframes silkReveal {
          to { clip-path: inset(0 0 100% 0); }
        }
      `}</style>

      <div className={`overlay ${phase === "exiting" ? "exiting" : ""}`}>
        {/* Subtle background glow */}
        <div className="ambient" />

        <div className="content">
          <h1 className="name">{NAME}</h1>

          <div className="thread">
            <div className="line" />
            <div className="needle">
              <Scissors size={22} />
            </div>
          </div>

          <p className="title">{TITLE}</p>
        </div>
      </div>
    </>
  );
};

export default EntryAnimation;