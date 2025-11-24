import React, { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * GalleryModal
 * Props:
 *  - images: array of image imports/URLs (required)
 *  - title: string (project title)
 *  - onClose: function to call when modal should close
 */

export default function GalleryModal({ images = [], title = "Collection", onClose = () => {} }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") {
        if (lightboxOpen) setLightboxOpen(false);
        else onClose();
      } else if (e.key === "ArrowRight" && lightboxOpen) {
        next();
      } else if (e.key === "ArrowLeft" && lightboxOpen) {
        prev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, activeIndex, images]);

  const openLightboxAt = (idx) => {
    setActiveIndex(idx);
    setLightboxOpen(true);
  };

  const next = () => setActiveIndex((i) => (i + 1) % images.length);
  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);

  // click outside lightbox image to close
  const onBackdropClick = (e) => {
    if (e.target.dataset.modal === "backdrop") {
      if (lightboxOpen) setLightboxOpen(false);
      else onClose();
    }
  };

  // Responsive styles
  const styles = {
    backdrop: {
      position: "fixed",
      inset: 0,
      background: "rgba(10, 16, 18, 0.6)",
      backdropFilter: "blur(6px)",
      zIndex: 2000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: isMobile ? "1rem" : "3rem",
      boxSizing: "border-box",
      animation: "gm-fadeIn 280ms ease both",
    },
    modal: {
      width: isMobile ? "calc(100vw - 2rem)" : "min(1200px, 96vw)",
      maxHeight: isMobile ? "calc(100vh - 2rem)" : "92vh",
      background: "rgba(255,255,255,0.02)",
      borderRadius: isMobile ? "12px" : "14px",
      overflow: "hidden",
      boxShadow: "0 40px 120px rgba(10,16,18,0.6)",
      position: "relative",
      transformOrigin: "center center",
      animation: "gm-scaleIn 320ms cubic-bezier(.2,.9,.2,1) both",
      display: "flex",
      flexDirection: "column",
    },
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: isMobile ? "16px 20px" : "20px 28px",
      borderBottom: "1px solid rgba(255,255,255,0.03)",
      color: "#fff",
      fontFamily: "Georgia, serif",
      background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(10,16,18,0.02))",
    },
    title: {
      fontSize: isMobile ? "0.95rem" : "1.05rem",
      fontWeight: 700,
      letterSpacing: "0.6px",
      maxWidth: isMobile ? "calc(100% - 60px)" : "auto",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    closeBtn: {
      background: "transparent",
      border: "none",
      color: "#fff",
      cursor: "pointer",
      padding: 8,
      borderRadius: 8,
      minWidth: "44px",
      minHeight: "44px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    body: {
      padding: isMobile ? "16px" : "24px",
      overflow: "auto",
      flex: 1,
    },
    grid: {
      display: "grid",
      gridTemplateColumns: isMobile 
        ? "repeat(auto-fit, minmax(140px, 1fr))" 
        : "repeat(auto-fit, minmax(200px, 1fr))",
      gap: isMobile ? "12px" : "18px",
      alignItems: "stretch",
    },
    thumbWrap: {
      position: "relative",
      width: "100%",
      paddingBottom: "125%", // portrait-preferred thumbnail (4:5)
      overflow: "hidden",
      borderRadius: isMobile ? "8px" : "12px",
      boxShadow: "0 10px 30px rgba(10,16,18,0.45)",
      cursor: "pointer",
      background: "linear-gradient(180deg, rgba(255,255,255,0.01), rgba(0,0,0,0.04))",
    },
    thumbImg: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 450ms cubic-bezier(.2,.9,.2,1), filter 450ms",
      transformOrigin: "center center",
      filter: "grayscale(20%) contrast(0.95)",
    },
    thumbOverlay: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      padding: isMobile ? "8px" : "12px",
      background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.35) 100%)",
      color: "#fff",
      fontSize: isMobile ? "0.75rem" : "0.85rem",
      fontWeight: 700,
      letterSpacing: "0.4px",
    },

    // Lightbox
    lightbox: {
      position: "fixed",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 3000,
      background: "linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.85))",
      padding: isMobile ? "1rem" : "3rem",
      boxSizing: "border-box",
      animation: "gm-fadeIn 240ms ease both",
    },
    lightboxInner: {
      maxWidth: "1200px",
      width: isMobile ? "calc(100vw - 2rem)" : "min(1100px, 94vw)",
      maxHeight: isMobile ? "calc(100vh - 2rem)" : "88vh",
      borderRadius: isMobile ? "8px" : "12px",
      overflow: "hidden",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    lightboxImg: {
      maxWidth: "100%",
      maxHeight: isMobile ? "calc(100vh - 4rem)" : "86vh",
      objectFit: "contain",
      borderRadius: isMobile ? "4px" : "6px",
      transition: "transform 300ms ease",
      boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
    },
    navBtn: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      background: "rgba(255,255,255,0.06)",
      border: "none",
      padding: isMobile ? "8px" : "12px",
      borderRadius: isMobile ? "6px" : "10px",
      cursor: "pointer",
      color: "#fff",
      minWidth: "44px",
      minHeight: "44px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    navLeft: { left: isMobile ? "8px" : "16px" },
    navRight: { right: isMobile ? "8px" : "16px" },

    footer: {
      padding: isMobile ? "14px 20px" : "18px 28px",
      borderTop: "1px solid rgba(255,255,255,0.03)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "#fff",
      fontFamily: "Georgia, serif",
      gap: "12px",
      flexWrap: isMobile ? "wrap" : "nowrap",
    },
    counter: {
      fontSize: isMobile ? "0.8rem" : "0.9rem",
      opacity: 0.9,
      textAlign: isMobile ? "center" : "left",
      flex: isMobile ? "1 1 100%" : "auto",
      order: isMobile ? 2 : 1,
    },
    imageCount: {
      fontSize: isMobile ? "0.85rem" : "0.95rem",
      opacity: 0.9,
      order: isMobile ? 1 : 2,
    }
  };

  return (
    <div
      data-modal="backdrop"
      onClick={onBackdropClick}
      style={styles.backdrop}
      aria-modal="true"
      role="dialog"
      aria-label={`${title} gallery`}
    >
      <div style={styles.modal}>
        <div style={styles.header}>
          <div style={styles.title}>{title} — Gallery</div>
          <button 
            aria-label="Close gallery" 
            onClick={onClose} 
            style={styles.closeBtn}
          >
            <X size={isMobile ? 16 : 18} />
          </button>
        </div>

        <div style={styles.body}>
          <div style={styles.grid}>
            {images.map((src, idx) => (
              <div
                key={idx}
                style={styles.thumbWrap}
                onClick={() => openLightboxAt(idx)}
                onKeyDown={(e) => e.key === "Enter" && openLightboxAt(idx)}
                role="button"
                tabIndex={0}
                aria-label={`Open image ${idx + 1}`}
                title="View image"
              >
                <img
                  src={src}
                  alt={`${title} ${idx + 1}`}
                  style={styles.thumbImg}
                  onMouseEnter={(e) => !isMobile && (e.currentTarget.style.transform = "scale(1.06)")}
                  onMouseLeave={(e) => !isMobile && (e.currentTarget.style.transform = "scale(1)")}
                  onTouchStart={(e) => isMobile && (e.currentTarget.style.transform = "scale(1.06)")}
                  onTouchEnd={(e) => isMobile && (e.currentTarget.style.transform = "scale(1)")}
                  loading="lazy"
                />
                <div style={styles.thumbOverlay}>{idx + 1}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.footer}>
          <div style={styles.imageCount}>{images.length} images</div>
          <div style={styles.counter}>
            {isMobile ? "Tap image to open • Pinch to zoom" : "Press Esc to close • Click an image to open"}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div data-modal="backdrop" onClick={onBackdropClick} style={styles.lightbox}>
          <div style={styles.lightboxInner}>
            <button
              aria-label="Previous"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              style={{ ...styles.navBtn, ...styles.navLeft }}
            >
              <ChevronLeft size={isMobile ? 18 : 20} />
            </button>

            <img
              src={images[activeIndex]}
              alt={`${title} ${activeIndex + 1}`}
              style={styles.lightboxImg}
              onClick={(e) => e.stopPropagation()}
            />

            <button
              aria-label="Next"
              onClick={(e) => { e.stopPropagation(); next(); }}
              style={{ ...styles.navBtn, ...styles.navRight }}
            >
              <ChevronRight size={isMobile ? 18 : 20} />
            </button>
          </div>
        </div>
      )}

      {/* Enhanced CSS with responsive breakpoints */}
      <style>{`
        @keyframes gm-fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gm-scaleIn {
          0% { opacity: 0; transform: scale(0.96); }
          100% { opacity: 1; transform: scale(1); }
        }

        /* Mobile optimizations */
        @media (max-width: 480px) {
          .gallery-modal {
            padding: 0.5rem !important;
          }
          
          .gallery-grid {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)) !important;
            gap: 10px !important;
          }
          
          .lightbox-nav {
            padding: 6px !important;
            min-width: 40px !important;
            min-height: 40px !important;
          }
        }

        @media (max-width: 320px) {
          .gallery-grid {
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)) !important;
            gap: 8px !important;
          }
          
          .thumb-overlay {
            font-size: 0.7rem !important;
            padding: 6px !important;
          }
        }

        /* High zoom level support */
        @media (max-width: 240px) {
          .gallery-grid {
            grid-template-columns: 1fr !important;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .thumb-wrap:active {
            transform: scale(0.98);
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
          .modal-header, .modal-footer {
            border-color: #fff !important;
            background: #000 !important;
          }
          
          .thumb-wrap {
            border: 1px solid #fff !important;
          }
        }

        /* Orientation support */
        @media (orientation: landscape) and (max-height: 500px) {
          .gallery-modal {
            max-height: 98vh !important;
          }
          
          .gallery-body {
            max-height: 60vh !important;
          }
        }
      `}</style>
    </div>
  );
}