import React, { useEffect } from "react";
import { X } from "lucide-react";

/**
 * ProjectDetailsModal
 * Props:
 *  - title: project title
 *  - description: long text description
 *  - images: array of images (for hero + moodboard)
 *  - onClose: function
 */

export default function ProjectDetailsModal({
  title = "Project Title",
  description = "",
  images = [],
  onClose = () => {}
}) {

  // Prevent page scroll
  useEffect(() => {
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = old);
  }, []);

  // Close on ESC
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const styles = {
    overlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(10,16,18,0.6)",
      backdropFilter: "blur(8px)",
      zIndex: 3000,
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      overflowY: "auto",
      padding: "4rem 2rem",
      boxSizing: "border-box",
      animation: "pd-fadeIn 300ms ease both",
    },

    modal: {
      width: "min(900px, 95vw)",
      background: "rgba(255,255,255,0.06)",
      borderRadius: "18px",
      backdropFilter: "blur(14px)",
      boxShadow: "0 40px 120px rgba(10,16,18,0.7)",
      color: "#fff",
      overflow: "hidden",
      animation: "pd-scaleIn 420ms cubic-bezier(.2,.9,.2,1) both",
      fontFamily: "Georgia, serif",
    },

    header: {
      padding: "28px 36px",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "rgba(0,0,0,0.15)",
    },

    title: {
      fontSize: "1.8rem",
      fontWeight: 700,
      letterSpacing: "1px",
      textTransform: "uppercase",
    },

    closeBtn: {
      background: "transparent",
      border: "none",
      color: "#fff",
      cursor: "pointer",
      padding: 8,
      borderRadius: 6,
    },

    hero: {
      width: "100%",
      height: "420px",
      overflow: "hidden",
    },

    heroImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      filter: "brightness(0.85) contrast(1.05)",
      transition: "transform 0.8s ease",
    },

    body: {
      padding: "36px 36px 46px 36px",
      lineHeight: 1.65,
      fontSize: "1.05rem",
      fontWeight: 400,
      opacity: 0.95,
      whiteSpace: "pre-line",
    },

    sectionTitle: {
      marginTop: "2.8rem",
      marginBottom: "1rem",
      fontSize: "1.3rem",
      fontWeight: 700,
      letterSpacing: "0.5px",
      textTransform: "uppercase",
      opacity: 0.85,
    },

    miniGallery: {
      marginTop: "2.5rem",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "18px",
    },

    miniImgWrap: {
      width: "100%",
      paddingBottom: "135%",
      overflow: "hidden",
      borderRadius: "12px",
      background: "rgba(255,255,255,0.04)",
      boxShadow: "0 10px 40px rgba(10,16,18,0.4)",
    },

    miniImg: {
      position: "absolute",
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },

    tagsWrap: {
      marginTop: "2.5rem",
      display: "flex",
      flexWrap: "wrap",
      gap: "12px",
    },

    tag: {
      padding: "10px 18px",
      borderRadius: "20px",
      background: "rgba(255,255,255,0.1)",
      border: "1px solid rgba(255,255,255,0.15)",
      fontSize: "0.85rem",
      letterSpacing: "0.5px",
      color: "#fff",
    }
  };

  // Tags auto-generated from title
  const tags = title.split(" ").map(w => w.replace(/[^a-z]/gi, "")).filter(Boolean);

  return (
    <div style={styles.overlay}>

      <div style={styles.modal}>

        {/* HEADER */}
        <div style={styles.header}>
          <div style={styles.title}>{title}</div>

          <button onClick={onClose} style={styles.closeBtn} aria-label="Close details">
            <X size={22} />
          </button>
        </div>

        {/* HERO IMAGE */}
        {images.length > 0 && (
          <div style={styles.hero}>
            <img 
              src={images[0]} 
              style={styles.heroImg} 
              alt={title + " hero"}
            />
          </div>
        )}

        {/* BODY DESCRIPTION */}
        <div style={styles.body}>

          {description}

          {/* MINI GALLERY SECTION */}
          {images.length > 1 && (
            <>
              <div style={styles.sectionTitle}>Collection Mood</div>
              <div style={styles.miniGallery}>
                {images.slice(1).map((img, i) => (
                  <div key={i} style={styles.miniImgWrap}>
                    <img src={img} style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }} alt={title + " mood " + (i + 1)} />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* TAGS */}
          <div style={styles.sectionTitle}>Keywords</div>
          <div style={styles.tagsWrap}>
            {tags.map((tag, i) => (
              <div key={i} style={styles.tag}>{tag}</div>
            ))}
          </div>

        </div>

      </div>

      {/* Animations */}
      <style>{`
        @keyframes pd-fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pd-scaleIn {
          0% { opacity: 0; transform: scale(0.94); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>

    </div>
  );
}
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

/**
 * ProjectDetailsModal
 * Props:
 *  - title: project title
 *  - description: long text description
 *  - images: array of images (for hero + moodboard)
 *  - onClose: function
 */

export default function ProjectDetailsModal({
  title = "Project Title",
  description = "",
  images = [],
  onClose = () => {}
}) {
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

  // Prevent page scroll
  useEffect(() => {
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = old);
  }, []);

  // Close on ESC
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const styles = {
    overlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(10,16,18,0.6)",
      backdropFilter: "blur(8px)",
      zIndex: 3000,
      display: "flex",
      justifyContent: "center",
      alignItems: isMobile ? "flex-start" : "center",
      overflowY: "auto",
      padding: isMobile ? "1rem" : "4rem 2rem",
      boxSizing: "border-box",
      animation: "pd-fadeIn 300ms ease both",
    },

    modal: {
      width: isMobile ? "calc(100vw - 2rem)" : "min(900px, 95vw)",
      background: "rgba(255,255,255,0.06)",
      borderRadius: isMobile ? "12px" : "18px",
      backdropFilter: "blur(14px)",
      boxShadow: "0 40px 120px rgba(10,16,18,0.7)",
      color: "#fff",
      overflow: "hidden",
      animation: "pd-scaleIn 420ms cubic-bezier(.2,.9,.2,1) both",
      fontFamily: "Georgia, serif",
      maxHeight: isMobile ? "calc(100vh - 2rem)" : "90vh",
      overflowY: "auto",
    },

    header: {
      padding: isMobile ? "20px 24px" : "28px 36px",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "rgba(0,0,0,0.15)",
    },

    title: {
      fontSize: isMobile ? "1.3rem" : "1.8rem",
      fontWeight: 700,
      letterSpacing: "1px",
      textTransform: "uppercase",
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
      borderRadius: 6,
      minWidth: "44px",
      minHeight: "44px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },

    hero: {
      width: "100%",
      height: isMobile ? "250px" : "420px",
      overflow: "hidden",
    },

    heroImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      filter: "brightness(0.85) contrast(1.05)",
      transition: "transform 0.8s ease",
    },

    body: {
      padding: isMobile ? "24px 24px 32px 24px" : "36px 36px 46px 36px",
      lineHeight: 1.65,
      fontSize: isMobile ? "0.95rem" : "1.05rem",
      fontWeight: 400,
      opacity: 0.95,
      whiteSpace: "pre-line",
    },

    sectionTitle: {
      marginTop: isMobile ? "2rem" : "2.8rem",
      marginBottom: "1rem",
      fontSize: isMobile ? "1.1rem" : "1.3rem",
      fontWeight: 700,
      letterSpacing: "0.5px",
      textTransform: "uppercase",
      opacity: 0.85,
    },

    miniGallery: {
      marginTop: isMobile ? "1.5rem" : "2.5rem",
      display: "grid",
      gridTemplateColumns: isMobile ? 
        "repeat(auto-fit, minmax(120px, 1fr))" : 
        "repeat(auto-fit, minmax(180px, 1fr))",
      gap: isMobile ? "12px" : "18px",
    },

    miniImgWrap: {
      width: "100%",
      paddingBottom: "135%",
      overflow: "hidden",
      borderRadius: isMobile ? "8px" : "12px",
      background: "rgba(255,255,255,0.04)",
      boxShadow: "0 10px 40px rgba(10,16,18,0.4)",
      position: "relative",
    },

    miniImg: {
      position: "absolute",
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },

    tagsWrap: {
      marginTop: isMobile ? "1.5rem" : "2.5rem",
      display: "flex",
      flexWrap: "wrap",
      gap: isMobile ? "8px" : "12px",
    },

    tag: {
      padding: isMobile ? "8px 14px" : "10px 18px",
      borderRadius: "20px",
      background: "rgba(255,255,255,0.1)",
      border: "1px solid rgba(255,255,255,0.15)",
      fontSize: isMobile ? "0.75rem" : "0.85rem",
      letterSpacing: "0.5px",
      color: "#fff",
    }
  };

  // Tags auto-generated from title
  const tags = title.split(" ").map(w => w.replace(/[^a-z]/gi, "")).filter(Boolean);

  return (
    <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>

      <div style={styles.modal}>

        {/* HEADER */}
        <div style={styles.header}>
          <div style={styles.title}>{title}</div>

          <button 
            onClick={onClose} 
            style={styles.closeBtn} 
            aria-label="Close details"
            className="close-btn-mobile"
          >
            <X size={isMobile ? 18 : 22} />
          </button>
        </div>

        {/* HERO IMAGE */}
        {images.length > 0 && (
          <div style={styles.hero} className="hero-image-mobile">
            <img 
              src={images[0]} 
              style={styles.heroImg} 
              alt={title + " hero"}
              onError={(e) => {
                e.target.style.display = 'none';
                console.log('Hero image failed to load');
              }}
            />
          </div>
        )}

        {/* BODY DESCRIPTION */}
        <div style={styles.body} className="modal-body-mobile">

          {description}

          {/* MINI GALLERY SECTION */}
          {images.length > 1 && (
            <>
              <div style={styles.sectionTitle} className="section-title-mobile">Collection Mood</div>
              <div style={styles.miniGallery} className="mini-gallery-mobile">
                {images.slice(1).map((img, i) => (
                  <div key={i} style={styles.miniImgWrap} className="mini-img-wrap-mobile">
                    <img 
                      src={img} 
                      style={styles.miniImg}
                      alt={title + " mood " + (i + 1)}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        console.log('Gallery image failed to load');
                      }}
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* TAGS */}
          {tags.length > 0 && (
            <>
              <div style={styles.sectionTitle} className="section-title-mobile">Keywords</div>
              <div style={styles.tagsWrap} className="tags-wrap-mobile">
                {tags.map((tag, i) => (
                  <div key={i} style={styles.tag} className="tag-mobile">{tag}</div>
                ))}
              </div>
            </>
          )}

        </div>

      </div>

      {/* Enhanced Responsive CSS */}
      <style>{`
        @keyframes pd-fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pd-scaleIn {
          0% { opacity: 0; transform: scale(0.94); }
          100% { opacity: 1; transform: scale(1); }
        }

        /* Mobile Responsive Styles */
        @media (max-width: 480px) {
          .modal-body-mobile {
            padding: 20px 20px 28px 20px !important;
          }
          
          .hero-image-mobile {
            height: 200px !important;
          }
          
          .mini-gallery-mobile {
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)) !important;
            gap: 10px !important;
          }
          
          .mini-img-wrap-mobile {
            border-radius: 6px !important;
          }
          
          .tags-wrap-mobile {
            gap: 6px !important;
          }
          
          .tag-mobile {
            padding: 6px 12px !important;
            font-size: 0.7rem !important;
          }
          
          .section-title-mobile {
            font-size: 1rem !important;
            margin-top: 1.5rem !important;
          }
        }

        @media (max-width: 320px) {
          .modal-body-mobile {
            padding: 16px 16px 24px 16px !important;
          }
          
          .hero-image-mobile {
            height: 180px !important;
          }
          
          .mini-gallery-mobile {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px !important;
          }
          
          .tag-mobile {
            padding: 5px 10px !important;
            font-size: 0.65rem !important;
          }
        }

        /* High zoom level support */
        @media (max-width: 240px) {
          .modal-body-mobile {
            padding: 12px 12px 20px 12px !important;
            font-size: 0.85rem !important;
          }
          
          .hero-image-mobile {
            height: 150px !important;
          }
          
          .mini-gallery-mobile {
            grid-template-columns: 1fr !important;
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
          .modal {
            background: #000 !important;
            border: 2px solid #fff !important;
          }
          
          .tag {
            border: 2px solid #fff !important;
            background: #111 !important;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) and (pointer: coarse) {
          .close-btn-mobile:active {
            transform: scale(0.9);
          }
        }

        /* Orientation support */
        @media (orientation: landscape) and (max-height: 500px) {
          .modal {
            max-height: 98vh !important;
          }
          
          .hero-image-mobile {
            height: 200px !important;
          }
          
          .modal-body-mobile {
            padding: 20px !important;
          }
        }

        /* Scrollbar styling for modal */
        .modal::-webkit-scrollbar {
          width: 6px;
        }
        
        .modal::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
        }
        
        .modal::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.3);
          border-radius: 3px;
        }
        
        .modal::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.5);
        }
      `}</style>

    </div>
  );
}