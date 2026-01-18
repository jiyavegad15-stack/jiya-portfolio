import React, { useRef, useEffect, useState } from "react";
import { 
  Zap, Instagram, Linkedin, ArrowRight, Eye, 
  Sparkles, X, Aperture, BookOpen, Menu, 
  ChevronLeft, ChevronRight, Maximize2 
} from "lucide-react";

// ---- RESPONSIVE HOOKS ----
const useViewport = () => {
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isLandscape: false,
    isExtraSmall: false,
  });

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setViewport({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        isLandscape: width > height,
        isExtraSmall: width < 400,
      });
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  return viewport;
};

// ---- COLOR PALETTE ----
const Palette = {
  BG: "#FDFCF8",
  TEXT_MAIN: "#1B2A2F",
  TEXT_MUTED: "#6C757D",
  TEXT_LIGHT: "#8A9EA6",
  ACCENT: "#D66E53",
  LINE: "rgba(27, 42, 47, 0.1)",
  WHITE: "#FFFFFF",
  DARK_BG: "#0F1A1E",
};

// ---- HELPER FOR RESPONSIVE VALUES ----
const getResponsiveValue = (mobile, tablet, desktop, viewport) => {
  if (viewport.isMobile) return mobile;
  if (viewport.isTablet) return tablet;
  return desktop;
};

// ---- IMAGE IMPORT FUNCTION ----
const importAll = (r) => {
  let images = {};
  r.keys().forEach((key) => {
    const path = key.replace("./", "");
    const [folder, filename] = path.split("/");
    if (!images[folder]) images[folder] = [];
    images[folder].push({
      path: r(key),
      name: filename,
      number: parseInt(filename.match(/(\d+)/)?.[0] || "0")
    });
  });
  return images;
};

// Import images
let collectionImages = {};
try {
  collectionImages = importAll(require.context("../assets/portfolio", true, /\.(jpg|jpeg|png|webp)$/));
  Object.keys(collectionImages).forEach(folder => {
    collectionImages[folder].sort((a, b) => a.number - b.number);
    collectionImages[folder] = collectionImages[folder].map(img => img.path);
  });
} catch (error) {
  // Placeholder images
  collectionImages = {
    "1X": Array(4).fill("https://images.unsplash.com/photo-1539109132382-381bb3f1c2b3?auto=format&fit=crop&w=800&q=80"),
    "2X": Array(4).fill("https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"),
    "3X": Array(4).fill("https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80"),
    "4X": Array(4).fill("https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80")
  };
};

const getCollectionImages = (collectionId) => {
  const collectionKey = `${collectionId}X`;
  return collectionImages[collectionKey] || collectionImages["1X"] || [];
};

// ---- WORK DATA ----
const Work = [
  { 
    id: 1, 
    name: "Chittah", 
    type: "CONCEPTUAL COUTURE", 
    description: "Chittah project investigates raw emotions and primal instincts, translating psychological depth into bold silhouettes, textures, and expressive garment forms narratives.", 
    tags: ["Raw Emotion", "Primal Instinct", "Expressive Forms", "Conceptual Couture", "Art-Led Fashion"], 
    image: getCollectionImages(1)[0],
    collectionPath: "1X",
    year: "2025",
    status: "Featured"
  },
  { 
    id: 2, 
    name: "Herdesher", 
    type: "CONCEPTUAL STORYTELLING",
    tags: ["Feminist Narrative", "Speculative Fashion", "Sustainable Systems", "Power & Hierarchy", "Fantasy Aesthetics"],
    description: "Herdesher presents a cohesive collection merging fantasy, feminism, sustainability, and speculative storytelling through fashion narratives design systems power hierarchy.",
    image: getCollectionImages(2)[0],
    collectionPath: "2X",
    year: "2024",
    status: "Active"
  },
  { 
    id: 3, 
    name: "Mycelium Fantasy", 
    type: "BIO-INSPIRED FANTASY", 
    description: "Mycelium Fantasy presents a cohesive fungal fashion world inspired by Helvella vespertina, merging biology, fantasy, sustainability, and craft.",
    tags: ["Mycelium Forms", "Fantasy Worldbuilding", "Organic Textures", "Eco-Futurism", "Conceptual Craft"], 
    image: getCollectionImages(3)[0],
    collectionPath: "3X",
    year: "2024",
    status: "Limited"
  },
  { 
    id: 4, 
    name: "Additional Work", 
    type: "CURRICULUM WORK", 
    description: "Developed ready-to-wear designs alongside embroidery explorations and a craft cluster project, translating traditional skills into refined, contemporary fashion outcomes.", 
    tags: ["Leather", "Accessories", "Handmade"], 
    image: getCollectionImages(4)[0],
    collectionPath: "4X",
    year: "2021 - 2025",
    status: "Limited"
  },
];

// ---- GLOBAL STYLES ----
const GlobalStyles = (viewport) => `
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap');

* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

body {
  margin: 0;
  padding: 0;
  background: ${Palette.BG};
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  font-family: 'Playfair Display', serif;
}

/* Responsive base font size */
html {
  font-size: ${viewport.isExtraSmall ? '14px' : 
              viewport.isMobile ? '14px' : 
              viewport.isTablet ? '15px' : '16px'};
}

@media (min-width: 1600px) {
  html {
    font-size: 18px;
  }
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: ${Palette.BG};
}
::-webkit-scrollbar-thumb {
  background: ${Palette.TEXT_LIGHT}60;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: ${Palette.ACCENT};
}

/* Selection */
::selection {
  background-color: ${Palette.ACCENT}40;
  color: ${Palette.TEXT_MAIN};
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  button, a {
    min-height: 44px;
    min-width: 44px;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Animations */
.reveal-text {
  animation: fadeInUp 1s ease both;
}

.image-hover-trigger:hover img {
  transform: scale(1.05);
}

.image-hover-trigger:hover .view-badge {
  transform: translate(-50%, -50%) scale(1);
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Print styles */
@media print {
  .gallery-modal {
    display: none !important;
  }
}
`;

// ---- ENHANCED GALLERY MODAL ----
const GalleryModal = ({ project, onClose, viewport }) => {
  if (!project) return null;

  const images = getCollectionImages(project.id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStart, setTouchStart] = useState(null);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;
    
    if (distance > 50) nextImage();
    if (distance < -50) prevImage();
    setTouchStart(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isZoomed) setIsZoomed(false);
        else onClose();
      }
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isZoomed]);

  // Responsive modal styles based on viewport
  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 26, 30, 0.98)',
      backdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: viewport.isMobile ? '10px' : '20px',
      animation: 'fadeIn 0.4s ease',
      overflowY: 'auto',
    },
    
    modal: {
      width: '100%',
      maxWidth: viewport.isMobile ? '100%' : 
                viewport.isTablet ? '95%' : '1400px',
      height: viewport.isMobile ? '95vh' : '90vh',
      maxHeight: viewport.isMobile ? '100%' : '900px',
      backgroundColor: Palette.BG,
      borderRadius: viewport.isMobile ? '0' : '24px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      animation: 'slideUp 0.5s ease',
      boxShadow: '0 50px 100px rgba(0,0,0,0.3)',
      position: 'relative',
    },
    
    // Header
    header: {
      padding: viewport.isMobile ? '16px' : '24px 32px',
      borderBottom: `1px solid ${Palette.LINE}`,
      backgroundColor: Palette.WHITE,
      flexShrink: 0,
      position: 'relative',
    },
    
    // Floating Close Button for easier access
    floatingCloseButton: {
      position: 'absolute',
      top: viewport.isMobile ? '10px' : '20px',
      right: viewport.isMobile ? '10px' : '20px',
      width: viewport.isMobile ? '36px' : '44px',
      height: viewport.isMobile ? '36px' : '44px',
      borderRadius: '50%',
      backgroundColor: Palette.ACCENT,
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: Palette.WHITE,
      zIndex: 100,
      boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
      transition: 'all 0.3s ease',
    },
    
    headerContent: {
      display: 'flex',
      flexDirection: viewport.isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: viewport.isMobile ? 'flex-start' : 'center',
      gap: viewport.isMobile ? '12px' : '20px',
    },
    
    branding: {
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
    },
    
    brandIcon: {
      width: '40px',
      height: '40px',
      borderRadius: '12px',
      backgroundColor: `${Palette.ACCENT}15`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    },
    
    title: {
      fontSize: viewport.isMobile ? '1.5rem' : 
                viewport.isTablet ? '1.75rem' : '2rem',
      fontWeight: '800',
      color: Palette.TEXT_MAIN,
      margin: '0 0 4px 0',
      fontFamily: "'Playfair Display', serif",
      lineHeight: '1.2',
    },
    
    meta: {
      display: 'flex',
      alignItems: 'center',
      gap: viewport.isMobile ? '8px' : '12px',
      flexWrap: 'wrap',
    },
    
    metaItem: {
      fontSize: viewport.isMobile ? '0.8rem' : '0.875rem',
      color: Palette.TEXT_LIGHT,
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    
    statusBadge: (status) => ({
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '700',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      backgroundColor: status === 'Featured' ? `${Palette.ACCENT}20` : 
                      status === 'Active' ? '#4CAF5020' : 
                      '#9C27B020',
      color: status === 'Featured' ? Palette.ACCENT : 
             status === 'Active' ? '#4CAF50' : 
             '#9C27B0',
    }),
    
    controls: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flexShrink: 0,
      width: viewport.isMobile ? '100%' : 'auto',
      justifyContent: viewport.isMobile ? 'space-between' : 'flex-end',
    },
    
    // Content Grid
    contentGrid: {
      display: 'grid',
      gridTemplateColumns: viewport.isMobile || viewport.isTablet ? '1fr' : '60% 40%',
      gridTemplateRows: viewport.isMobile ? 'auto 1fr' : '1fr',
      flex: 1,
      overflow: 'hidden',
    },
    
    // Gallery Column
    galleryColumn: {
      display: 'flex',
      flexDirection: 'column',
      padding: viewport.isMobile ? '16px' : '32px',
      borderRight: viewport.isMobile || viewport.isTablet ? 'none' : `1px solid ${Palette.LINE}`,
      borderBottom: viewport.isMobile || viewport.isTablet ? `1px solid ${Palette.LINE}` : 'none',
      overflow: 'hidden',
      height: viewport.isMobile ? '50vh' : 'auto',
    },
    
    imageWrapper: {
      position: 'relative',
      borderRadius: '16px',
      overflow: 'hidden',
      backgroundColor: Palette.DARK_BG,
      height: viewport.isMobile ? '250px' : 
              viewport.isTablet ? '300px' : '400px',
      cursor: 'pointer',
      flex: 1,
    },
    
    mainImage: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      backgroundColor: Palette.DARK_BG,
      display: 'block',
    },
    
    navButton: {
      width: viewport.isMobile ? '40px' : '48px',
      height: viewport.isMobile ? '40px' : '48px',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.9)',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
      color: Palette.TEXT_MAIN,
      pointerEvents: 'auto',
    },
    
    thumbnail: {
      width: viewport.isMobile ? '60px' : '80px',
      height: viewport.isMobile ? '45px' : '60px',
      borderRadius: '8px',
      overflow: 'hidden',
      cursor: 'pointer',
      flexShrink: 0,
      position: 'relative',
    },
    
    // Details Column
    detailsColumn: {
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      height: viewport.isMobile ? 'calc(50vh - 100px)' : 'auto',
    },
    
    detailsContent: {
      padding: viewport.isMobile ? '20px' : '32px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      overflowY: 'auto',
      height: '100%',
    },
    
    description: {
      fontSize: viewport.isMobile ? '0.9rem' : '1rem',
      lineHeight: '1.8',
      color: Palette.TEXT_MUTED,
      margin: 0,
    },
    
    tagChip: {
      padding: viewport.isMobile ? '6px 12px' : '8px 16px',
      borderRadius: '20px',
      fontSize: viewport.isMobile ? '0.8rem' : '0.875rem',
      background: `${Palette.ACCENT}15`,
      color: Palette.TEXT_MAIN,
    },
    
    // Mobile specific
    mobileCloseButton: {
      display: viewport.isMobile ? 'flex' : 'none',
      width: '100%',
      padding: '16px',
      backgroundColor: Palette.ACCENT,
      color: Palette.WHITE,
      border: 'none',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      marginTop: 'auto',
    },
    
    // Zoom view
    zoomImage: {
      maxWidth: '90%',
      maxHeight: viewport.isMobile ? '70%' : '80%',
      objectFit: 'contain',
    },
    
    zoomNavButton: {
      width: viewport.isMobile ? '48px' : '64px',
      height: viewport.isMobile ? '48px' : '64px',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      color: Palette.WHITE,
    },
  };

  return (
    <>
      <div style={modalStyles.overlay} onClick={() => !isZoomed && onClose()}>
        <div 
          style={modalStyles.modal}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Floating Close Button - Easy access on any screen */}
          <button
            onClick={onClose}
            style={modalStyles.floatingCloseButton}
            aria-label="Close gallery"
            title="Close"
          >
            <X size={viewport.isMobile ? 20 : 24} />
          </button>

          {/* Header */}
          <div style={modalStyles.header}>
            <div style={modalStyles.headerContent}>
              <div style={modalStyles.branding}>
                <div style={modalStyles.brandIcon}>
                  <Aperture size={20} />
                </div>
                <div>
                  <h2 style={modalStyles.title}>{project.name}</h2>
                  <div style={modalStyles.meta}>
                    <span style={modalStyles.metaItem}>
                      <Sparkles size={14} /> {project.type}
                    </span>
                    <span style={modalStyles.metaItem}>•</span>
                    <span style={modalStyles.metaItem}>{project.year}</span>
                    <span style={modalStyles.metaItem}>•</span>
                    <span style={modalStyles.statusBadge(project.status)}>
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div style={modalStyles.controls}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ 
                    fontFamily: "'Playfair Display', serif", 
                    fontSize: viewport.isMobile ? '1rem' : '1.2rem',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    border: `1px solid ${Palette.LINE}`
                  }}>
                    {String(currentIndex + 1).padStart(2, '0')}/{String(images.length).padStart(2, '0')}
                  </div>
                  
                  {!viewport.isMobile && (
                    <button
                      onClick={() => setIsZoomed(true)}
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        border: `1px solid ${Palette.LINE}`,
                        background: Palette.WHITE,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                      title="Fullscreen"
                      aria-label="Fullscreen view"
                    >
                      <Maximize2 size={20} />
                    </button>
                  )}
                  
                  {/* Desktop Close Button (secondary option) */}
                  {!viewport.isMobile && (
                    <button
                      onClick={onClose}
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        border: `1px solid ${Palette.LINE}`,
                        background: Palette.WHITE,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                      title="Close"
                      aria-label="Close gallery"
                    >
                      <X size={24} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div style={modalStyles.contentGrid}>
            {/* Gallery */}
            <div style={modalStyles.galleryColumn}>
              <div style={modalStyles.imageWrapper}>
                <img
                  src={images[currentIndex]}
                  alt={`${project.name} - Image ${currentIndex + 1}`}
                  style={modalStyles.mainImage}
                  onClick={() => setIsZoomed(true)}
                />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 20px',
                  pointerEvents: 'none',
                }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    style={modalStyles.navButton}
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    style={modalStyles.navButton}
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
              
              {/* Thumbnails */}
              <div style={{ paddingTop: '16px', overflowX: 'auto' }}>
                <div style={{ display: 'flex', gap: '12px', padding: '4px 0' }}>
                  {images.map((src, index) => (
                    <div
                      key={index}
                      style={{
                        ...modalStyles.thumbnail,
                        border: `2px solid ${index === currentIndex ? Palette.ACCENT : 'transparent'}`,
                        opacity: index === currentIndex ? 1 : 0.7
                      }}
                      onClick={() => setCurrentIndex(index)}
                      title={`Image ${index + 1}`}
                    >
                      <img 
                        src={src} 
                        alt={`Thumbnail ${index + 1}`} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      {/* Thumbnail number indicator */}
                      <div style={{
                        position: 'absolute',
                        bottom: '4px',
                        right: '4px',
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        color: Palette.WHITE,
                        fontSize: '10px',
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                      }}>
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Details */}
            <div style={modalStyles.detailsColumn}>
              <div style={modalStyles.detailsContent}>
                {/* Description */}
                <div style={{
                  backgroundColor: Palette.WHITE,
                  borderRadius: '16px',
                  padding: '20px',
                  border: `1px solid ${Palette.LINE}`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <BookOpen size={24} color={Palette.ACCENT} />
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', margin: 0 }}>Collection Story</h3>
                  </div>
                  <p style={modalStyles.description}>
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div style={{
                  backgroundColor: Palette.WHITE,
                  borderRadius: '16px',
                  padding: '20px',
                  border: `1px solid ${Palette.LINE}`,
                }}>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '700', margin: '0 0 16px 0' }}>Key Tags</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {project.tags.map((tag, i) => (
                      <span key={i} style={modalStyles.tagChip}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div style={{
                  border: `1px solid ${Palette.LINE}`,
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    backgroundColor: Palette.BG,
                    borderBottom: `1px solid ${Palette.LINE}`,
                  }}>
                    <span style={{ padding: '12px 16px', fontSize: '0.75rem', fontWeight: '700', textAlign: 'center' }}>YEAR</span>
                    <span style={{ padding: '12px 16px', fontSize: '0.75rem', fontWeight: '700', textAlign: 'center' }}>IMAGES</span>
                    <span style={{ padding: '12px 16px', fontSize: '0.75rem', fontWeight: '700', textAlign: 'center' }}>STATUS</span>
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    backgroundColor: Palette.WHITE,
                  }}>
                    <span style={{ padding: '16px', textAlign: 'center' }}>{project.year}</span>
                    <span style={{ padding: '16px', textAlign: 'center' }}>{images.length}</span>
                    <span style={{ padding: '16px', textAlign: 'center' }}>
                      <span style={modalStyles.statusBadge(project.status)}>
                        {project.status}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Mobile Close Button (additional option) */}
                <button
                  onClick={onClose}
                  style={modalStyles.mobileCloseButton}
                  aria-label="Close gallery"
                >
                  Close Gallery <X size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zoom View */}
      {isZoomed && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 26, 30, 0.98)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2001,
        }}>
          {/* Zoom Close Button */}
          <button
            onClick={() => setIsZoomed(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: Palette.WHITE,
              zIndex: 10,
            }}
            aria-label="Exit fullscreen"
          >
            <X size={24} />
          </button>
          
          <img
            src={images[currentIndex]}
            alt={`Fullscreen view - ${project.name}`}
            style={modalStyles.zoomImage}
          />
          
          <div style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '20px',
            zIndex: 10,
          }}>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              style={modalStyles.zoomNavButton}
              aria-label="Previous image"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              style={modalStyles.zoomNavButton}
              aria-label="Next image"
            >
              <ChevronRight size={32} />
            </button>
          </div>

          {/* Counter in zoom view */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            fontSize: '1rem',
            color: Palette.WHITE,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '8px 16px',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            zIndex: 10,
          }}>
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
};

// ---- MAIN PORTFOLIO PAGE ----
const PortfolioPage = () => {
  const viewport = useViewport();
  const [activeProject, setActiveProject] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close gallery when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeProject && event.target.classList.contains('modal-overlay')) {
        setActiveProject(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [activeProject]);

  // Responsive page styles
  const pageStyles = {
    pageContainer: {
      backgroundColor: Palette.BG,
      color: Palette.TEXT_MAIN,
      minHeight: "100vh",
      position: 'relative',
      overflowX: 'hidden',
    },
    
    nav: {
      position: "fixed",
      top: 0,
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: viewport.isMobile ? "20px" : "30px 60px",
      zIndex: 100,
      backgroundColor: Palette.BG,
      borderBottom: `1px solid ${Palette.LINE}`,
    },
    
    navBrand: {
      fontSize: viewport.isMobile ? "1.25rem" : "1.5rem",
      fontWeight: "800",
      letterSpacing: "2px",
      color: Palette.TEXT_MAIN,
    },
    
    navLinks: {
      display: viewport.isMobile ? (isMenuOpen ? 'flex' : 'none') : 'flex',
      flexDirection: viewport.isMobile ? 'column' : 'row',
      alignItems: 'center',
      gap: viewport.isMobile ? "20px" : "40px",
      position: viewport.isMobile ? 'absolute' : 'relative',
      top: viewport.isMobile ? '100%' : 'auto',
      left: viewport.isMobile ? 0 : 'auto',
      right: viewport.isMobile ? 0 : 'auto',
      background: viewport.isMobile ? Palette.BG : 'transparent',
      padding: viewport.isMobile ? "20px" : "0",
      borderBottom: viewport.isMobile ? `1px solid ${Palette.LINE}` : 'none',
    },
    
    navLink: {
      textDecoration: "none",
      color: Palette.TEXT_MAIN,
      fontSize: viewport.isMobile ? "0.9rem" : "0.8rem",
      textTransform: "uppercase",
      letterSpacing: "1px",
      fontWeight: "600",
      padding: viewport.isMobile ? "10px 0" : "0",
    },
    
    menuButton: {
      display: viewport.isMobile ? 'block' : 'none',
      background: 'none',
      border: 'none',
      color: Palette.TEXT_MAIN,
      cursor: 'pointer',
      padding: '8px',
    },
    
    main: {
      width: "100%",
      paddingTop: viewport.isMobile ? "80px" : "100px",
    },
    
    section: {
      minHeight: viewport.isMobile ? "auto" : "100vh",
      width: "100%",
      position: "relative",
      borderBottom: `1px solid ${Palette.LINE}`,
      padding: viewport.isMobile ? "40px 20px" : "0 10%",
      display: 'flex',
      alignItems: 'center',
    },
    
    sectionContent: {
      width: "100%",
      display: 'grid',
      gridTemplateColumns: viewport.isMobile ? '1fr' : '1fr 1fr',
      gap: viewport.isMobile ? "40px" : "80px",
      alignItems: "center",
    },
    
    contentWrapper: {
      maxWidth: "100%",
      zIndex: 2,
    },
    
    projectIndex: {
      fontSize: viewport.isMobile ? "0.9rem" : "1rem",
      fontWeight: "700",
      marginBottom: viewport.isMobile ? "15px" : "20px",
      display: "block",
      color: Palette.ACCENT,
    },
    
    projectType: {
      fontSize: viewport.isMobile ? "0.7rem" : "0.75rem",
      color: Palette.TEXT_LIGHT,
      letterSpacing: "2px",
      textTransform: "uppercase",
      display: "block",
      marginBottom: "10px",
    },
    
    projectTitle: {
      fontSize: viewport.isMobile ? "2rem" : 
                 viewport.isTablet ? "2.5rem" : "3.5rem",
      lineHeight: "1.1",
      marginBottom: viewport.isMobile ? "20px" : "25px",
      fontWeight: "700",
    },
    
    projectDesc: {
      fontFamily: "'Lora', serif",
      color: Palette.TEXT_MUTED,
      lineHeight: "1.8",
      fontSize: viewport.isMobile ? "0.9rem" : "1rem",
      marginBottom: viewport.isMobile ? "25px" : "30px",
    },
    
    tagContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      marginBottom: viewport.isMobile ? "30px" : "40px",
    },
    
    tag: {
      fontSize: viewport.isMobile ? "0.75rem" : "0.8rem",
      color: Palette.ACCENT,
      fontWeight: "500",
      fontStyle: "italic",
      padding: "4px 12px",
      backgroundColor: `${Palette.ACCENT}10`,
      borderRadius: "20px",
    },
    
    exploreBtn: {
      background: "transparent",
      border: "none",
      borderBottom: `2px solid ${Palette.TEXT_MAIN}`,
      padding: "10px 0",
      display: "flex",
      alignItems: "center",
      gap: "15px",
      fontSize: viewport.isMobile ? "0.75rem" : "0.8rem",
      fontWeight: "700",
      cursor: "pointer",
      fontFamily: "'Playfair Display', serif",
      color: Palette.TEXT_MAIN,
      minWidth: viewport.isMobile ? "44px" : "auto",
      minHeight: viewport.isMobile ? "44px" : "auto",
      transition: "all 0.3s ease",
    },
    
    imageWrapper: {
      width: "100%",
      height: viewport.isMobile ? "300px" : "400px",
      position: "relative",
    },
    
    imageFrame: {
      width: "100%",
      height: "100%",
      backgroundColor: Palette.DARK_BG,
      borderRadius: "4px",
      overflow: "hidden",
      position: "relative",
      boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
    },
    
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: "0.9",
    },
    
    viewBadge: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%) scale(0)",
      width: viewport.isMobile ? "60px" : "80px",
      height: viewport.isMobile ? "60px" : "80px",
      borderRadius: "50%",
      backgroundColor: Palette.ACCENT,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transition: "transform 0.4s ease",
      zIndex: 5,
    },
    
    sidebarDecor: {
      position: "fixed",
      left: viewport.isMobile ? "20px" : "50px",
      bottom: viewport.isMobile ? "30px" : "60px",
      display: viewport.isMobile ? "none" : "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",
      zIndex: 10,
    },
    
    mobileFooter: {
      display: viewport.isMobile ? 'flex' : 'none',
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: Palette.BG,
      borderTop: `1px solid ${Palette.LINE}`,
      padding: '10px 20px',
      justifyContent: 'space-around',
      zIndex: 90,
    },
    
    socialButton: {
      background: 'none',
      border: 'none',
      color: Palette.TEXT_MAIN,
      padding: '10px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '44px',
      minHeight: '44px',
    },
  };

  const ProjectSection = ({ project, index }) => {
    return (
      <section style={pageStyles.section}>
        <div style={pageStyles.sectionContent}>
          {/* Text Content */}
          <div style={pageStyles.contentWrapper}>
            <div className="reveal-text" style={pageStyles.projectIndex}>
              0{index + 1}
            </div>
            <span style={pageStyles.projectType}>{project.type}</span>
            <h2 style={pageStyles.projectTitle}>{project.name}</h2>
            <p style={pageStyles.projectDesc}>{project.description}</p>
            
            <div style={pageStyles.tagContainer}>
              {project.tags.map(tag => (
                <span key={tag} style={pageStyles.tag}>#{tag}</span>
              ))}
            </div>

            <button 
              style={pageStyles.exploreBtn}
              onClick={() => setActiveProject(project)}
              onMouseEnter={(e) => e.currentTarget.style.borderBottomColor = Palette.ACCENT}
              onMouseLeave={(e) => e.currentTarget.style.borderBottomColor = Palette.TEXT_MAIN}
            >
              EXPLORE CASE STUDY <ArrowRight size={16} />
            </button>
          </div>

          {/* Image */}
          <div style={pageStyles.imageWrapper}>
            <div style={pageStyles.imageFrame} className="image-hover-trigger">
              <img 
                src={project.image} 
                alt={project.name} 
                style={pageStyles.image}
              />
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(to bottom, transparent 60%, ${Palette.DARK_BG}aa 100%)`,
              }} />
              <div className="view-badge" style={pageStyles.viewBadge}>
                <Eye size={20} color={Palette.WHITE} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div style={pageStyles.pageContainer}>
      <style>{GlobalStyles(viewport)}</style>
      
      {/* Navigation */}
      <nav style={pageStyles.nav}>
        <div style={pageStyles.navBrand}>JV <span style={{color: Palette.ACCENT}}>✦</span></div>
        
        <button 
          style={pageStyles.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>
        
        <div style={pageStyles.navLinks}>
          <a href="/jiya-portfolio/#main2" style={pageStyles.navLink}>Home</a>
          <a href="/jiya-portfolio/#about" style={pageStyles.navLink}>About</a>
          <a href="/jiya-portfolio/#work" style={pageStyles.navLink}>Experience</a>
          <a href="/jiya-portfolio/#skills" style={pageStyles.navLink}>Skills</a>
          <a href="/jiya-portfolio/#cv" style={pageStyles.navLink}>CV</a>
          <a href="/jiya-portfolio/#contact" style={pageStyles.navLink}>Contact</a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Zap size={18} fill={Palette.ACCENT} stroke={Palette.ACCENT} />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={pageStyles.main}>
        {Work.map((project, index) => (
          <ProjectSection 
            key={project.id} 
            project={project} 
            index={index}
          />
        ))}
      </main>

      {/* Desktop Sidebar */}
      <div style={pageStyles.sidebarDecor}>
        <div style={{ width: "1px", height: "100px", backgroundColor: Palette.LINE }} />
        <Instagram size={18} color={Palette.TEXT_LIGHT} />
        <Linkedin size={18} color={Palette.TEXT_LIGHT} />
      </div>

      {/* Mobile Footer */}
      <div style={pageStyles.mobileFooter}>
        <button style={pageStyles.socialButton} aria-label="Instagram">
          <Instagram size={20} />
        </button>
        <button style={pageStyles.socialButton} aria-label="LinkedIn">
          <Linkedin size={20} />
        </button>
        <button style={pageStyles.socialButton} aria-label="Home">
          <Zap size={20} />
        </button>
      </div>

      {/* Gallery Modal */}
      {activeProject && (
        <GalleryModal 
          project={activeProject} 
          onClose={() => setActiveProject(null)}
          viewport={viewport}
        />
      )}
    </div>
  );
};

export default PortfolioPage;