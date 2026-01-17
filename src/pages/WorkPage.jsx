import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  Zap,
  Instagram,
  Linkedin,
  ArrowRight,
  Eye,
  Sparkles,
  X,
  Aperture,
  BookOpen,
  Menu,
  Home,
  User,
  Code,
  Briefcase,
  FileText,
  Mail,
  FileCheck
} from "lucide-react";

const ColorPalette = {
    DARK_TEAL: "#244855",
    WARM_RED: "#E64833",
    MUDDY_BROWN: "#874F41",
    MUTED_AQUA: "#90AEAD",
    SOFT_BEIGE: "#FBE9D0",
    CREAM_WHITE: "#FFFDF8"
};

const Theme = {
    background: ColorPalette.SOFT_BEIGE,
    cardBg: ColorPalette.CREAM_WHITE,
    accent: ColorPalette.MUDDY_BROWN,
    secondary: ColorPalette.MUDDY_BROWN,
    tertiary: ColorPalette.MUTED_AQUA,
    text: ColorPalette.DARK_TEAL,
    dark: ColorPalette.DARK_TEAL,
    red: ColorPalette.WARM_RED
};

const NavigationBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('work');

    const navItems = [
        { id: 'home', label: 'Home', icon: Home, href: '/jiya-portfolio/#/main2' },
        { id: 'about', label: 'About', icon: User, href: '/jiya-portfolio/#about' },
        { id: 'skills', label: 'Skills', icon: Code, href: '/jiya-portfolio/#skills' },
        { id: 'work', label: 'Experience', icon: Briefcase, href: '/jiya-portfolio/#work' },
        { id: 'cv', label: 'CV', icon: FileCheck, href: '/jiya-portfolio/#cv' },
        { id: 'portfolio', label: 'Portfolio', icon: Aperture, href: '/jiya-portfolio/#portfolio' },
        { id: 'education', label: 'Education', icon: BookOpen, href: '/jiya-portfolio/#education' },
        { id: 'contact', label: 'Contact', icon: Mail, href: '/jiya-portfolio/#contact' }

    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavClick = (itemId, href) => {
        setActiveSection(itemId);
        setIsMenuOpen(false);
        
        if (href.startsWith('/')) {
            window.location.href = href;
        } else {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <>
            {/* Navigation Bar */}
            <nav style={NavStyles.navbar}>
                <div style={NavStyles.navContainer}>
                    {/* Logo */}
                    <div style={NavStyles.logo}>
                        <div style={NavStyles.logoIcon}>✦</div>
                        <span style={NavStyles.logoText}>JV</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div style={NavStyles.navItems}>
                        {navItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <a
                                    key={item.id}
                                    href={item.href}
                                    style={{
                                        ...NavStyles.navItem,
                                        ...(activeSection === item.id ? NavStyles.navItemActive : {})
                                    }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavClick(item.id, item.href);
                                    }}
                                    className="nav-item"
                                >
                                    <IconComponent size={16} />
                                    <span>{item.label}</span>
                                </a>
                            );
                        })}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        style={NavStyles.menuButton}
                        onClick={toggleMenu}
                        className="menu-button"
                        aria-label="Toggle menu"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div style={NavStyles.mobileOverlay}>
                    <div style={NavStyles.mobileMenu}>
                        <div style={NavStyles.mobileHeader}>
                            <div style={NavStyles.logo}>
                                <div style={NavStyles.logoIcon}>✦</div>
                                <span style={NavStyles.logoText}>JV</span>
                            </div>
                            <button
                                style={NavStyles.closeButton}
                                onClick={toggleMenu}
                                aria-label="Close menu"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        
                        <div style={NavStyles.mobileNavItems}>
                            {navItems.map((item) => {
                                const IconComponent = item.icon;
                                return (
                                    <a
                                        key={item.id}
                                        href={item.href}
                                        style={{
                                            ...NavStyles.mobileNavItem,
                                            ...(activeSection === item.id ? NavStyles.mobileNavItemActive : {})
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavClick(item.id, item.href);
                                        }}
                                        className="mobile-nav-item"
                                    >
                                        <IconComponent size={20} />
                                        <span>{item.label}</span>
                                    </a>
                                );
                            })}
                        </div>

                        {/* Social Icons in Mobile Menu */}
                        <div style={NavStyles.mobileSocial}>
                            <a href="#" style={NavStyles.socialIcon} aria-label="Instagram">
                                <Instagram size={20} />
                            </a>
                            <a href="#" style={NavStyles.socialIcon} aria-label="LinkedIn">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const NavStyles = {
    navbar: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: `${Theme.cardBg}e6`,
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${Theme.dark}10`,
        boxShadow: `0 2px 30px ${Theme.dark}08`,
    },
    navContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        maxWidth: '1400px',
        margin: '0 auto',
    },
    
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: "'Playfair Display', serif",
    },
    logoIcon: {
        fontSize: '1.2rem',
        color: Theme.red,
        animation: 'logoPulse 2s ease-in-out infinite',
    },
    logoText: {
        fontSize: '1.5rem',
        fontWeight: 800,
        color: Theme.dark,
        letterSpacing: '1px',
    },
    navItems: {
        display: 'flex',
        gap: '2rem',
        alignItems: 'center',
    },
    navItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '0.5rem 1rem',
        borderRadius: '25px',
        textDecoration: 'none',
        color: Theme.text,
        fontSize: '0.9rem',
        fontWeight: '500',
        transition: 'all 0.3s ease',
        fontFamily: "'Lora', serif",
        minHeight: '44px',
        minWidth: '44px',
        justifyContent: 'center',
    },
    navItemActive: {
        background: `linear-gradient(135deg, ${Theme.accent}, ${Theme.secondary})`,
        color: Theme.cardBg,
        boxShadow: `0 4px 15px ${Theme.accent}40`,
    },
    menuButton: {
        display: 'none',
        background: 'transparent',
        border: 'none',
        color: Theme.dark,
        cursor: 'pointer',
        padding: '8px',
        borderRadius: '8px',
        transition: 'all 0.3s ease',
        minHeight: '44px',
        minWidth: '44px',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mobileOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `${Theme.dark}e6`,
        backdropFilter: 'blur(20px)',
        zIndex: 999,
        animation: 'fadeIn 0.3s ease-out both',
    },
    mobileMenu: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        background: Theme.cardBg,
        borderBottom: `1px solid ${Theme.dark}10`,
        boxShadow: `0 5px 40px ${Theme.dark}20`,
        animation: 'slideDown 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
    },
    mobileHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        borderBottom: `1px solid ${Theme.dark}10`,
    },
    closeButton: {
        background: 'transparent',
        border: 'none',
        color: Theme.dark,
        cursor: 'pointer',
        padding: '8px',
        borderRadius: '8px',
        transition: 'all 0.3s ease',
        minHeight: '44px',
        minWidth: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mobileNavItems: {
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem 0',
    },
    mobileNavItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '1rem 2rem',
        textDecoration: 'none',
        color: Theme.text,
        fontSize: '1rem',
        fontWeight: '500',
        transition: 'all 0.3s ease',
        fontFamily: "'Lora', serif",
        minHeight: '44px',
    },
    mobileNavItemActive: {
        background: `linear-gradient(135deg, ${Theme.accent}15, ${Theme.secondary}10)`,
        color: Theme.accent,
        borderRight: `3px solid ${Theme.accent}`,
    },
    mobileSocial: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        padding: '1.5rem 2rem',
        borderTop: `1px solid ${Theme.dark}10`,
    },
    socialIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: `${Theme.dark}10`,
        color: Theme.dark,
        textDecoration: 'none',
        transition: 'all 0.3s ease',
    },
};

const BASE_PLACEHOLDER_URL = "https://placehold.co";

const FontStyles = `
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:wght@400;500;600;700;800&display=swap');

@keyframes slideDown {
    from {
        transform: translateY(-100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}
`;

const collectionImages = {};

function importAll(r) {
  r.keys().forEach((key) => {
    const path = key.replace("./", ""); 
    const [folder] = path.split("/");  
    if (!collectionImages[folder]) collectionImages[folder] = [];
    collectionImages[folder].push(r(key));
  });
}

try {
  importAll(require.context("../assets/projects", true, /\.(jpg|jpeg|png)$/));
} catch (error) {
  console.log("Images not found, using placeholders for Instagram Pages");
}

Object.keys(collectionImages).forEach(folder => {
  collectionImages[folder].sort((a, b) => {
    const getNum = (file) => parseInt(file.split("/").pop().split(".")[0]);
    return getNum(a) - getNum(b);
  });
});


const getCollectionImages = (projectId) => {
  const images = collectionImages[`${projectId}X`] || [];
  
  if (images.length === 0) {
    return [
      `${BASE_PLACEHOLDER_URL}/600x800/${Theme.dark.substring(1)}/${Theme.cardBg.substring(1)}?text=Collection+${projectId}+1`,
      `${BASE_PLACEHOLDER_URL}/600x800/${Theme.dark.substring(1)}/${Theme.cardBg.substring(1)}?text=Collection+${projectId}+2`,
      `${BASE_PLACEHOLDER_URL}/600x800/${Theme.dark.substring(1)}/${Theme.cardBg.substring(1)}?text=Collection+${projectId}+3`
    ];
  }
  
  return images;
};

const Work = [
    {
        id: 1,
        name: "Amit Agarwal",
        description: "Gained hands-on industry experience at Amit Aggarwal, assisting pret and couture teams in design development, material research, sampling processes, surface exploration, and coordination with artisans.",
        tags: ["Research", "Exploration", "Coordination"],
        Instagram: "#",
        link: "#",
        image: getCollectionImages(1)[0],
        collectionPath: "1X",
    },
    {
        id: 2,
        name: "Sayantan Sarkar",
        description: "Gained hands-on experience under Sayantan Sarkar, assisting in design development, surface detailing, sampling, and construction for collections showcased at Khadi Festival and Bharat Tex",
        tags: ["Textile", "Reserach", "Execuation"],
        Instagram: "#",
        link: "#",
        image: getCollectionImages(2)[0],
        collectionPath: "2X",
    },
    {
        id: 3,
        name: "TOIE",
        description: "At TOIE, a startup brand, contributed to end-to-end early product development, market analysis, promotional planning, and operational groundwork required to build the brand identity.",
        tags: ["Techpacks", "Designing", "Brand Research"],
        Instagram: "#",
        link: "#",
        image: getCollectionImages(3)[0],
        collectionPath: "3X",
    }
];

const getCardDimensions = () => {
    const width = window.innerWidth;
    
    if (width < 480) { 
        return { width: 'calc(100vw - 2rem)', height: '420px', marginRight: '0', marginBottom: '1.5rem' };
    } else if (width < 768) {
        return { width: 'calc(100vw - 2rem)', height: '450px', marginRight: '0', marginBottom: '1.5rem' };
    } else if (width < 1024) { 
        return { width: '320px', height: '420px', marginRight: '2rem', marginBottom: '0' };
    } else {
        return { width: '420px', height: '450px', marginRight: '4rem', marginBottom: '0', padding: '6rem' };
    }
};

const ImageGalleryModal = ({ project, onClose }) => {
    if (!project) return null;

    const images = getCollectionImages(project.id);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [zoomedImage, setZoomedImage] = useState(null);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'Escape') {
                if (zoomedImage) setZoomedImage(null);
                else onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentImageIndex, zoomedImage]);

    return (
        <>
            <ModalBase onClose={onClose} isGallery={true}>
                <div style={ModalStyles.galleryHeader}>
                    <BookOpen size={36} color={Theme.red} />
                    <div style={ModalStyles.galleryTitleSection}>
                        <h2 style={ModalStyles.galleryTitle}>{project.name}</h2>
                        <p style={ModalStyles.gallerySubtitle}>Collection: {project.collectionPath}</p>
                    </div>
                </div>

                <div style={ModalStyles.galleryContainer}>
                
                    <div style={ModalStyles.mainImageViewer}>
                        <button 
                            style={ModalStyles.navButton}
                            onClick={prevImage}
                            className="gallery-nav-button"
                            aria-label="Previous image"
                        >
                            <ArrowRight size={24} style={{ transform: "rotate(180deg)" }} />
                        </button>

                        <div style={ModalStyles.mainImageContainer}>
                            <img
                                src={images[currentImageIndex]}
                                alt={`${project.name} Garment ${currentImageIndex + 1}`}
                                style={ModalStyles.mainImage}
                                className="gallery-main-image"
                                onClick={() => setZoomedImage(images[currentImageIndex])}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = `${BASE_PLACEHOLDER_URL}/600x800/cccccc/333333?text=Image+Missing`;
                                }}
                                loading="lazy"
                            />

                            <div style={ModalStyles.imageCounter}>
                                {currentImageIndex + 1} / {images.length}
                            </div>
                        </div>

                        <button 
                            style={ModalStyles.navButton}
                            onClick={nextImage}
                            className="gallery-nav-button"
                            aria-label="Next image"
                        >
                            <ArrowRight size={24} />
                        </button>
                    </div>

                    {images.length > 1 && (
                        <div style={ModalStyles.thumbnailStrip}>
                            {images.map((src, index) => (
                                <div
                                    key={index}
                                    style={{
                                        ...ModalStyles.thumbnail,
                                        ...(index === currentImageIndex ? ModalStyles.thumbnailActive : {})
                                    }}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className="gallery-thumbnail"
                                    aria-label={`View image ${index + 1}`}
                                >
                                    <img
                                        src={src}
                                        alt={`Thumbnail ${index + 1}`}
                                        style={ModalStyles.thumbnailImage}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = `${BASE_PLACEHOLDER_URL}/80x100/cccccc/333333?text=Thumb+${index + 1}`;
                                        }}
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div style={ModalStyles.galleryDescription}>
                    <h3 style={ModalStyles.descriptionTitle}>Collection Details</h3>
                    <p style={ModalStyles.descriptionText}>{project.description}</p>
                    <div style={ModalStyles.galleryTags}>
                        {project.tags.map((tag, index) => (
                            <span key={index} style={ModalStyles.galleryTag}>{tag}</span>
                        ))}
                    </div>
                </div>

                <p style={ModalStyles.galleryNote}>
                    *Images shown are artistic concepts/placeholders representing the collection's garments.
                </p>
            </ModalBase>

            {zoomedImage && (
                <div style={zoomModal.overlay} onClick={() => setZoomedImage(null)}>
                    <img 
                        src={zoomedImage} 
                        style={zoomModal.image} 
                        alt="Zoomed view"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `${BASE_PLACEHOLDER_URL}/800x1000/cccccc/333333?text=Zoom+Image+Missing`;
                        }}
                    />
                </div>
            )}
        </>
    );
};

const ModalBase = ({ children, onClose, isGallery = false }) => (
    <div style={ModalStyles.overlay} onClick={onClose}>
        <div 
            style={{
                ...ModalStyles.modalContainer,
                ...(isGallery ? ModalStyles.galleryModalContainer : {})
            }}
            onClick={(e) => e.stopPropagation()}
            className="modal-container"
            role="dialog"
            aria-modal="true"
        >
            <button 
                style={ModalStyles.closeButton} 
                onClick={onClose}
                aria-label="Close modal"
            >
                <X size={24} color={isGallery ? Theme.cardBg : Theme.text} />
            </button>
            {children}
        </div>
    </div>
);

const Card = ({ data, index, onExplore, onViewCollection }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [dimensions, setDimensions] = useState(getCardDimensions());
    const cardRef = useRef(null);
    const isMobile = window.innerWidth < 768;

    useEffect(() => {
        const handleResize = () => {
            setDimensions(getCardDimensions());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!isMobile && isHovered && cardRef.current) {
            cardRef.current.style.transform = `translateY(-30px) scale(1.06) rotateY(${index % 2 === 0 ? '4deg' : '-4deg'})`;
            cardRef.current.style.zIndex = 100;
        } else if (cardRef.current) {
            cardRef.current.style.transform = `translateY(0) scale(1) rotateY(0deg)`;
            cardRef.current.style.zIndex = 1;
        }
    }, [isHovered, index, isMobile]);

    const handleInteraction = () => {
        if (isMobile) {
            setIsHovered(!isHovered);
        }
    };

    return (
        <div
            ref={cardRef}
            style={{
                ...CardStyles.base,
                width: dimensions.width,
                height: dimensions.height,
                marginRight: dimensions.marginRight,
                marginBottom: dimensions.marginBottom,
                animation: `cardReveal 1s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.2}s both`,
            }}
            onMouseEnter={() => !isMobile && setIsHovered(true)}
            onMouseLeave={() => !isMobile && setIsHovered(false)}
            onClick={handleInteraction}
            className="fashion-card"
            role="article"
            aria-label={`Project: ${data.name}`}
        >
            <div style={CardStyles.imageContainer}>
                <img 
                    src={data.image} 
                    alt={data.name}
                    style={{
                        ...CardStyles.image,
                        filter: isHovered ? 'grayscale(0%) brightness(1.1) contrast(1.1)' : 'grayscale(30%) brightness(0.95)',
                        transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                    }}
                    onError={(e) => { 
                        e.target.onerror = null; 
                        e.target.src = `${BASE_PLACEHOLDER_URL}/400x500/${Theme.dark.substring(1)}/${Theme.cardBg.substring(1)}?text=Image+Missing`; 
                    }}
                    loading="lazy"
                />
                
                <div style={CardStyles.gradientOverlay} />
                <div style={{
                    ...CardStyles.colorOverlay,
                    background: `linear-gradient(45deg, ${Theme.accent}20, ${Theme.tertiary}30)`
                }} />

                <div style={CardStyles.premiumBadge}>
                    <Sparkles size={12} />
                    <span>FEATURED</span>
                </div>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onViewCollection(data.id);
                    }}
                    style={{
                        ...CardStyles.viewButton,
                        opacity: isHovered || isMobile ? 1 : 0,
                        transform: (isHovered || isMobile) ? 'translateY(0) rotate(0deg)' : 'translateY(20px) rotate(5deg)'
                    }}
                    className="view-collection-button"
                    aria-label={`View ${data.name} collection`}
                >
                    <Eye size={18} />
                    <span style={{ fontFamily: "'Lora', serif", fontWeight: '500' }}>View Collection</span>
                </button>

                <div style={CardStyles.cornerAccentTL} />
                <div style={CardStyles.cornerAccentBR} />
            </div>

            <div style={CardStyles.content}>
                <div style={CardStyles.contentInner}>
                    <h3 style={CardStyles.title}>{data.name}</h3>
                    <p style={CardStyles.description}>{data.description.split('. ')[0]}.</p>

                    <div style={CardStyles.tags}>
                        {data.tags.map((tag, i) => (
                            <span 
                                key={i}
                                style={{
                                    ...CardStyles.tag,
                                    background: `${Theme.accent}15`,
                                    color: Theme.accent,
                                    animation: isHovered ? `tagSlideIn 0.5s ease ${i * 0.1}s both` : 'none'
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div style={CardStyles.actions}>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                onExplore(data.id);
                            }}
                            style={isHovered ? CardStyles.primaryButtonHover : CardStyles.primaryButton}
                            className="explore-button"
                            aria-label={`Explore ${data.name} project`}
                        >
                            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: '600' }}>
                                Explore Project
                            </span>
                            <div style={CardStyles.buttonIcon} className="button-icon">
                                <ArrowRight size={16} />
                            </div>
                        </button>
                        <a 
                            href={data.Instagram}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                ...CardStyles.secondaryButton,
                                transform: isHovered ? 'rotate(360deg)' : 'rotate(0deg)'
                            }}
                            className="secondary-button-icon"
                            aria-label="View Instagram repository"
                        >
                            <Instagram size={16} />
                        </a>
                    </div>
                </div>
            </div>

            <div style={{
                ...CardStyles.glow,
                opacity: isHovered ? 0.8 : 0,
                background: `radial-gradient(circle at center, ${Theme.accent}40 0%, transparent 70%)`
            }} />
        </div>
    );
};

const CardStyles = {
    base: {
        borderRadius: '25px',
        backgroundColor: Theme.cardBg,
        color: Theme.text,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: `
            0 20px 40px rgba(36, 72, 85, 0.3),
            0 0 0 1px rgba(251, 233, 208, 0.2)
        `,
        transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        opacity: 0,
        transform: 'translateY(60px) scale(0.9) rotateX(10deg)',
        cursor: 'pointer',
        flexShrink: 0,
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        aspectRatio: '4 / 3',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    gradientOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(135deg, ${Theme.background}20 0%, transparent 50%, ${Theme.accent}15 100%)`,
    },
    colorOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        mixBlendMode: 'overlay',
    },
    premiumBadge: {
        position: 'absolute',
        top: '15px',
        left: '15px',
        background: `linear-gradient(45deg, ${Theme.accent}, ${Theme.secondary})`,
        color: Theme.cardBg,
        padding: '6px 12px',
        borderRadius: '15px',
        fontSize: '0.7rem',
        fontWeight: '700',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        boxShadow: `0 4px 15px ${Theme.accent}40`,
        zIndex: 2,
        fontFamily: "'Lora', serif",
    },
    viewButton: {
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: Theme.cardBg,
        color: Theme.text,
        padding: '10px 20px',
        borderRadius: '25px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '0.9rem',
        fontWeight: '600',
        transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        backdropFilter: 'blur(10px)',
        border: `2px solid ${Theme.text}50`,
        zIndex: 2,
        cursor: 'pointer',
        boxShadow: `0 8px 15px rgba(36, 72, 85, 0.2)`,
        minHeight: '44px',
        minWidth: '44px',
    },
    cornerAccentTL: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '60px',
        height: '60px',
        background: `radial-gradient(circle at 0% 0%, ${Theme.accent} 0%, transparent 60%)`,
        borderRadius: '25px 0 0 0',
        opacity: 0.8,
    },
    cornerAccentBR: {
        position: 'absolute',
        bottom: '0',
        right: '0',
        width: '60px',
        height: '60px',
        background: `radial-gradient(circle at 100% 100%, ${Theme.tertiary} 0%, transparent 60%)`,
        borderRadius: '0 0 25px 0',
        opacity: 0.6,
    },
    content: {
        padding: '0',
        height: '45%',
        position: 'relative',
    },
    contentInner: {
        padding: '20px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: '1.4rem',
        fontWeight: '700',
        marginBottom: '12px',
        color: Theme.text,
        lineHeight: '1.2',
        fontFamily: "'Playfair Display', serif",
        background: `linear-gradient(135deg, ${Theme.dark}, ${Theme.secondary})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
    },
    description: {
        fontSize: '0.9rem',
        lineHeight: '1.5',
        color: Theme.text,
        opacity: 0.85,
        marginBottom: '15px',
        flexGrow: 1,
        fontFamily: "'Lora', serif",
    },
    tags: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginBottom: '20px',
        minHeight: '32px',
    },
    tag: {
        padding: '6px 12px',
        borderRadius: '15px',
        fontSize: '0.7rem',
        fontWeight: '600',
        border: `1px solid ${Theme.accent}30`, 
        color: Theme.accent,
        opacity: 0,
        transform: 'translateY(10px)',
        transition: 'all 0.3s ease',
        fontFamily: "'Lora', serif",
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    primaryButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 20px',
        background: `linear-gradient(135deg, ${Theme.accent}, ${Theme.secondary})`,
        color: Theme.cardBg,
        borderRadius: '25px',
        textDecoration: 'none',
        fontWeight: '700',
        fontSize: '0.9rem',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        border: `none`,
        cursor: 'pointer',
        minHeight: '44px',
        minWidth: '44px',
    },
    primaryButtonHover: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 20px',
        background: `linear-gradient(135deg, ${Theme.red}, ${Theme.accent})`,
        color: Theme.cardBg,
        borderRadius: '25px',
        textDecoration: 'none',
        fontWeight: '700',
        fontSize: '0.9rem',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        border: `none`,
        transform: 'translateY(-3px)',
        boxShadow: `0 10px 30px ${Theme.red}60`,
        cursor: 'pointer',
        minHeight: '44px',
        minWidth: '44px',
    },
    buttonIcon: {
        transition: 'transform 0.3s ease',
    },
    secondaryButton: {
        padding: '12px',
        backgroundColor: `${Theme.secondary}10`,
        color: Theme.secondary,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        textDecoration: 'none',
        border: `1px solid ${Theme.secondary}20`,
        boxShadow: `0 2px 10px ${Theme.secondary}20`,
        minHeight: '44px',
        minWidth: '44px',
    },
    glow: {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        borderRadius: '25px',
        transition: 'opacity 0.6s ease',
        pointerEvents: 'none',
        zIndex: -1,
        filter: 'blur(20px)',
    },
};

const ModalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: `${Theme.dark}e0`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(12px)',
        animation: 'fadeIn 0.3s ease-out both',
        padding: '20px',
    },
    modalContainer: {
        background: Theme.cardBg,
        borderRadius: '25px', 
        padding: '40px', 
        maxWidth: '90vw',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: `0 25px 80px rgba(0, 0, 0, 0.6)`,
        color: Theme.text,
        animation: 'zoomIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
        minWidth: '300px',
    },
    galleryModalContainer: {
        maxWidth: '1200px',
        width: '95%',
        background: `linear-gradient(135deg, ${Theme.DARK_TEAL} 0%, #1a3a47 100%)`,
        color: Theme.cardBg,
        boxShadow: `0 40px 120px rgba(0, 0, 0, 0.9), inset 0 0 15px ${Theme.red}40`, 
        borderRadius: '25px',
        padding: '40px 30px',
    },
    closeButton: {
        position: 'absolute',
        top: '15px',
        right: '15px',
        background: `${Theme.cardBg}20`,
        border: 'none',
        cursor: 'pointer',
        padding: '8px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        zIndex: 10,
        backdropFilter: 'blur(10px)',
        minHeight: '44px',
        minWidth: '44px',
    },
    galleryHeader: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '16px',
        marginBottom: '30px',
        paddingBottom: '20px',
        borderBottom: `1px solid ${Theme.MUTED_AQUA}40`,
    },
    galleryTitleSection: {
        flex: 1,
    },
    galleryTitle: {
        fontSize: '2rem',
        fontWeight: 700,
        color: Theme.cardBg,
        fontFamily: "'Playfair Display', serif",
        margin: '0 0 8px 0',
        lineHeight: '1.2',
    },
    gallerySubtitle: {
        fontSize: '1rem',
        color: Theme.MUTED_AQUA,
        margin: 0,
        opacity: 0.8,
        fontFamily: "'Lora', serif",
    },
    galleryContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        marginBottom: '30px',
    },
    mainImageViewer: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        justifyContent: 'center',
    },
    navButton: {
        background: `${Theme.cardBg}20`,
        border: `2px solid ${Theme.cardBg}30`,
        color: Theme.cardBg,
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        backdropFilter: 'blur(10px)',
        flexShrink: 0,
        minHeight: '44px',
        minWidth: '44px',
    },
    mainImageContainer: {
        position: 'relative',
        flex: 1,
        maxWidth: '700px',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: `0 20px 50px rgba(0, 0, 0, 0.5)`,
    },
    mainImage: {
        width: '100%',
        height: 'auto',
        maxHeight: '80vh',
        objectFit: 'contain',
        display: 'block',
        borderRadius: '12px',
    },
    imageCounter: {
        position: 'absolute',
        bottom: '15px',
        right: '15px',
        background: `${Theme.dark}90`,
        color: Theme.cardBg,
        padding: '8px 16px',
        borderRadius: '20px',
        fontSize: '0.9rem',
        fontWeight: '600',
        backdropFilter: 'blur(10px)',
        fontFamily: "'Lora', serif",
    },
    thumbnailStrip: {
        display: 'flex',
        gap: '15px',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '20px 0',
    },
    thumbnail: {
        width: '80px',
        height: '100px',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: `2px solid transparent`,
        opacity: 0.7,
    },
    thumbnailActive: {
        border: `2px solid ${Theme.red}`,
        opacity: 1,
        transform: 'scale(1.1)',
    },
    thumbnailImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    galleryDescription: {
        background: `${Theme.cardBg}10`,
        borderRadius: '20px',
        padding: '25px',
        marginBottom: '20px',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${Theme.cardBg}20`,
    },
    descriptionTitle: {
        fontSize: '1.3rem',
        fontWeight: 700,
        color: Theme.cardBg,
        margin: '0 0 15px 0',
        fontFamily: "'Playfair Display', serif",
    },
    descriptionText: {
        fontSize: '1rem',
        lineHeight: '1.6',
        color: Theme.MUTED_AQUA,
        margin: '0 0 20px 0',
        fontFamily: "'Lora', serif",
    },
    galleryTags: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
    },
    galleryTag: {
        padding: '8px 16px',
        borderRadius: '20px',
        background: `linear-gradient(45deg, ${Theme.red}, ${Theme.MUDDY_BROWN})`,
        color: Theme.cardBg,
        fontSize: '0.8rem',
        fontWeight: 600,
        fontFamily: "'Lora', serif",
    },
    galleryNote: {
        fontSize: '0.8rem',
        color: Theme.MUTED_AQUA,
        opacity: 0.7,
        fontStyle: 'italic',
        textAlign: 'center',
        margin: 0,
        fontFamily: "'Lora', serif",
    },
    detailHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginBottom: '24px',
        borderBottom: `2px solid ${Theme.tertiary}50`,
        paddingBottom: '16px',
    },
    detailTitle: {
        fontSize: '2rem',
        fontWeight: 800,
        color: Theme.dark,
        fontFamily: "'Playfair Display', serif",
        margin: 0,
    },
    detailDescription: {
        fontSize: '1.1rem',
        lineHeight: '1.6',
        color: Theme.text,
        marginBottom: '24px',
        fontFamily: "'Lora', serif",
    },
    detailTags: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '24px',
    },
    detailTagItem: {
        padding: '10px 20px',
        borderRadius: '25px',
        background: `linear-gradient(45deg, ${Theme.accent}, ${Theme.secondary})`,
        color: Theme.cardBg,
        fontSize: '1rem',
        fontWeight: 700,
        boxShadow: `0 4px 10px ${Theme.accent}30`,
        fontFamily: "'Lora', serif",
    },
    exploreLink: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '12px 24px',
        background: `linear-gradient(135deg, ${Theme.accent}, ${Theme.secondary})`,
        color: Theme.cardBg,
        borderRadius: '25px',
        textDecoration: 'none',
        fontWeight: 700,
        fontSize: '1rem',
        transition: 'all 0.3s ease',
        minHeight: '44px',
        fontFamily: "'Playfair Display', serif",
    },
};

const FixedStyles = {
    powerButton: {
        position: "fixed",
        top: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 60,
        textDecoration: 'none',
        animation: 'fadeInUp 1s ease-out 0.3s both',
    },
    powerButtonInner: {
        width: "50px",
        height: "50px",
        backgroundColor: Theme.red,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: Theme.cardBg,
        transition: 'all 0.3s ease',
        position: 'relative',
        zIndex: 2,
        boxShadow: `0 8px 30px ${Theme.red}70`,
    },
    bigTitle: {
        position: "absolute",
        fontSize: "20vh",
        fontWeight: 900,
        opacity: 0.04,
        color: Theme.dark,
        pointerEvents: "none",
        zIndex: 0,
        fontFamily: "'Playfair Display', serif",
        textShadow: `2px 2px 4px ${Theme.accent}20`,
    },
    scrollInstruction: {
        position: "fixed",
        bottom: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        color: Theme.dark,
        fontSize: '0.9rem',
        opacity: 0.9,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontFamily: "'Lora', serif",
        background: `${Theme.cardBg}90`,
        padding: '12px 24px',
        borderRadius: '25px',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${Theme.dark}20`,
        boxShadow: `0 4px 15px ${Theme.dark}10`,
    },
    scrollArrow: {
        animation: 'bounce 2s infinite',
        color: Theme.accent,
    },
};

const zoomModal = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.85)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2000,
        cursor: "zoom-out",
        backdropFilter: "blur(5px)"
    },
    image: {
        maxWidth: "90%",
        maxHeight: "90%",
        borderRadius: "12px",
        objectFit: "contain",
        boxShadow: "0 0 25px rgba(0,0,0,0.5)"
    }
};

const fullCSS = FontStyles + `
@keyframes cardReveal {
    0% {
        opacity: 0;
        transform: translateY(60px) scale(0.9) rotateX(10deg);
    }
    100% {
        opacity: 1;
        transform: translateY(0) scale(1) rotateX(0deg);
    }
}
@keyframes logoPulse {
    0%, 100% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.1);
        opacity: 0.8;
    }
}
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-6px);
    }
    60% {
        transform: translateY(-3px);
    }
}
@keyframes tagSlideIn {
    0% {
        opacity: 0;
        transform: translateY(10px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
@keyframes zoomIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}
@keyframes smoothScroll {
    0% { transform: translateX(var(--scroll-start)); }
    100% { transform: translateX(var(--scroll-end)); }
}

/* Enhanced Hover Effects */
.fashion-card:hover .button-icon {
    transform: translateX(6px) rotate(5deg);
}
.fashion-card:hover .explore-button {
    box-shadow: 0 8px 25px ${Theme.red}60;
}
.fashion-card:hover .secondary-button-icon {
    background-color: ${Theme.secondary}20;
    color: ${Theme.red};
}
.view-collection-button:hover {
    background-color: ${Theme.dark} !important;
    color: ${Theme.cardBg} !important;
    border-color: ${Theme.dark} !important;
    box-shadow: 0 10px 20px rgba(36, 72, 85, 0.4);
}
.gallery-nav-button:hover {
    background-color: ${Theme.cardBg}40 !important;
    transform: scale(1.1);
}
.gallery-thumbnail:hover {
    opacity: 1 !important;
    transform: scale(1.05);
}

/* Navigation Hover Effects */
.nav-item:hover {
    background-color: ${Theme.dark}10;
    transform: translateY(-2px);
}
.menu-button:hover {
    background-color: ${Theme.dark}10;
}
.close-button:hover {
    background-color: ${Theme.dark}10;
}
.mobile-nav-item:hover {
    background-color: ${Theme.dark}08;
}
.social-icon:hover {
    background-color: ${Theme.dark}20;
    transform: translateY(-2px);
}

.power-button-hover:hover .power-button-inner {
    transform: scale(1.1);
    box-shadow: 0 12px 40px ${Theme.red}90;
}

/* Smooth Scroll Container */
.horizontal-scroll-container {
    transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: transform;
}

/* COMPREHENSIVE MOBILE RESPONSIVENESS */
@media (max-width: 768px) {
    #work-box {
        padding-top: 6rem !important;
        height: auto !important;
        min-height: 100vh;
    }
    
    .horizontal-scroll-container {
        position: relative !important;
        transform: none !important;
        flex-direction: column;
        top: 0 !important;
        left: 0 !important;
        height: auto !important;
        margin-left: 0 !important;
        padding: 0 1rem;
        align-items: center;
        gap: 1.5rem;
    }
    
    .fashion-card {
        width: calc(100vw - 2rem) !important;
        margin-right: 0 !important;
        margin-bottom: 1.5rem !important;
        height: 450px !important;
        transform: none !important;
        transition: none !important;
        opacity: 1 !important;
        box-shadow: 0 10px 30px rgba(36, 72, 85, 0.3) !important;
    }
    
    .fashion-card:hover {
        transform: none !important;
        box-shadow: 0 15px 40px rgba(36, 72, 85, 0.5) !important;
    }
    
    .fashion-card:nth-child(n) { 
        animation: none !important; 
    }
    
    .big-title { 
        display: none !important; 
    }
    
    .scroll-instruction { 
        display: none !important; 
    }
    
    /* Navigation Mobile Styles */
    .nav-container {
        padding: 1rem !important;
    }
    
    .nav-items {
        display: none !important;
    }
    
    .menu-button {
        display: flex !important;
    }
    
    .mobile-menu {
        padding: 1rem !important;
    }
    
    .mobile-nav-item {
        padding: 1rem 1.5rem !important;
    }
    
    /* Mobile Gallery Styles */
    .gallery-container {
        gap: 20px !important;
    }
    
    .main-image-viewer {
        flex-direction: column;
        gap: 15px !important;
    }
    
    .nav-button {
        width: 45px !important;
        height: 45px !important;
    }
    
    .main-image-container {
        order: -1;
    }
    
    .main-image {
        height: 400px !important;
    }
    
    .thumbnail-strip {
        gap: 10px !important;
        padding: 15px 0 !important;
    }
    
    .thumbnail {
        width: 60px !important;
        height: 75px !important;
    }
    
    .modal-container { 
        padding: 30px 20px !important; 
        margin: 10px !important; 
        max-width: 95vw !important;
        max-height: 95vh !important;
    }
    
    .gallery-title {
        font-size: 1.5rem !important;
    }
    
    .gallery-subtitle {
        font-size: 0.9rem !important;
    }
    
    .power-button {
        top: 1.5rem !important;
    }
    
    .power-button-inner {
        width: 45px;
        height: 45px;
    }
}

/* Extra Small Mobile Devices */
@media (max-width: 480px) {
    .fashion-card {
        height: 420px !important;
    }
    
    .card-content-inner {
        padding: 15px !important;
    }
    
    .card-title {
        font-size: 1.2rem !important;
    }
    
    .card-description {
        font-size: 0.8rem !important;
    }
    
    .main-image {
        height: 300px !important;
    }
    
    .thumbnail {
        width: 50px !important;
        height: 65px !important;
    }
    
    .gallery-title {
        font-size: 1.3rem !important;
    }
    
    .nav-container { 
        padding: 1rem !important; 
    }
    
    .mobile-header {
        padding: 1rem 1.5rem !important;
    }
    
    .social-icon {
        width: 38px;
        height: 38px;
    }
}

/* High Zoom Level Support */
@media (max-width: 320px) {
    .fashion-card {
        height: 400px !important;
    }
    
    body {
        font-size: 14px;
    }
    
    .modal-container {
        padding: 20px 15px !important;
    }
}

/* Tablet Responsiveness */
@media (min-width: 769px) and (max-width: 1024px) {
    .fashion-card {
        width: 320px !important;
        height: 520px !important;
        margin-right: 2rem !important;
    }
    
    .horizontal-scroll-container {
        left: 5rem !important;
    }
    
    .main-image {
        height: 450px !important;
    }
}

/* Large Desktop Screens */
@media (min-width: 1440px) {
    .fashion-card {
        width: 400px !important;
        height: 540px !important;
    }
}

/* Touch Device Optimizations */
@media (hover: none) and (pointer: coarse) {
    .fashion-card:hover {
        transform: none !important;
    }
    
    .fashion-card:active {
        transform: scale(0.98) !important;
    }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

/* High Contrast Support */
@media (prefers-contrast: high) {
    .fashion-card {
        border: 2px solid ${Theme.dark};
    }
    
    .modal-container {
        border: 2px solid ${Theme.dark};
    }
}

/* Orientation Support */
@media (orientation: landscape) and (max-height: 500px) {
    .fashion-card {
        height: 350px !important;
    }
    
    .modal-container {
        max-height: 85vh !important;
    }
    
    .main-image {
        max-height: 60vh !important;
    }
}
`;

const WorkPage = () => {
    const scrollRef = useRef(null);
    const boxRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    
    const [viewingProject, setViewingProject] = useState(null);
    const [viewingCollection, setViewingCollection] = useState(null);

    const selectedProject = viewingProject ? Work.find(p => p.id === viewingProject) : null;
    const selectedCollection = viewingCollection ? Work.find(p => p.id === viewingCollection) : null;

    const handleExplore = useCallback((id) => {
        setViewingProject(id);
    }, []);

    const handleViewCollection = useCallback((id) => {
        setViewingCollection(id);
    }, []);

    const handleCloseModal = useCallback(() => {
        setViewingProject(null);
        setViewingCollection(null);
    }, []);

    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const calculateTotalContentWidth = useCallback(() => {
        if (isMobile) return 0;
        
        const cardWidth = getCardDimensions().width;
        const marginRight = getCardDimensions().marginRight;
        const totalCardWidth = Work.length * (parseInt(cardWidth) + parseInt(marginRight));
        const viewportWidth = window.innerWidth;
        
        return Math.max(0, totalCardWidth - viewportWidth + 200);
    }, [isMobile]);

    useEffect(() => {
        if (!isMounted) return;

        const handleScroll = () => {
            if (!isMobile && scrollRef.current && boxRef.current) {
                const scrollOffset = window.scrollY;
                const totalScrollableHeight = boxRef.current.offsetHeight - window.innerHeight;
                const maxTransform = calculateTotalContentWidth();

                if (totalScrollableHeight > 0) {
                    const scrollRatio = Math.min(scrollOffset / totalScrollableHeight, 1);
                    const transformX = scrollRatio * maxTransform;
                    
                    scrollRef.current.style.transform = `translateX(-${transformX}px)`;
                }
            }
        };

        if (!isMobile) {
            window.addEventListener("scroll", handleScroll, { passive: true });
            handleScroll();
        }

        return () => {
            if (!isMobile) {
                window.removeEventListener("scroll", handleScroll);
            }
        };
    }, [isMounted, isMobile, calculateTotalContentWidth]);

    useEffect(() => {
        if (isMounted && boxRef.current) {
            if (isMobile) {
                const cardHeight = getCardDimensions().height;
                const marginBottom = '1.5rem';
                const totalHeight = Work.length * (parseInt(cardHeight) + parseInt(marginBottom)) + 200;
                boxRef.current.style.height = `${totalHeight}px`;
            } else {
                const totalContentWidth = calculateTotalContentWidth();
                const newHeight = Math.max(window.innerHeight * 2, totalContentWidth * 0.5 + window.innerHeight);
                boxRef.current.style.height = `${newHeight}px`;
            }
        }
    }, [isMounted, isMobile, calculateTotalContentWidth]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div
            ref={boxRef}
            style={{
                backgroundColor: Theme.background,
                width: "100vw",
                position: "relative",
                overflowX: "hidden",
                paddingTop: "5rem",
                background: `radial-gradient(circle at top left, ${Theme.background} 0%, ${ColorPalette.DARK_TEAL}10 50%, ${Theme.background} 100%)`,
                minHeight: '100vh',
            }}
            id="work-box"
        >
            <style>{fullCSS}</style>

            <NavigationBar />

            <PowerButton />

            {!isMobile && <BigTitle text="WORK" top="12%" right="8%" />}

            {!isMobile && (
                <div style={FixedStyles.scrollInstruction} className="scroll-instruction">
                    <div style={FixedStyles.scrollArrow}>⌄</div>
                    <span>SCROLL TO EXPLORE COLLECTION</span>
                    <div style={FixedStyles.scrollArrow}>⌄</div>
                </div>
            )}

            <div
                ref={scrollRef}
                style={{
                    position: isMobile ? "relative" : "fixed",
                    top: isMobile ? "0" : "22vh",
                    left: isMobile ? "0" : "10rem",
                    display: "flex",
                    height: isMobile ? "auto" : "65vh",
                    alignItems: 'center',
                    willChange: 'transform',
                    transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    flexDirection: isMobile ? "column" : "row",
                }}
                className="horizontal-scroll-container"
            >
                {Work.map((item, index) => (
                    <Card 
                        key={item.id} 
                        data={item} 
                        index={index} 
                        onExplore={handleExplore}
                        onViewCollection={handleViewCollection}
                    />
                ))}
            </div>

            {selectedProject && <ProjectDetailModal project={selectedProject} onClose={handleCloseModal} />}
            {selectedCollection && <ImageGalleryModal project={selectedCollection} onClose={handleCloseModal} />}
        </div>
    );
};

const PowerButton = () => (
    <a href="/jiya-portfolio/#/main2" style={FixedStyles.powerButton} className="power-button-hover animate-fadeInUp" aria-label="Home">
        <div style={FixedStyles.powerButtonInner} className="power-button-inner">
            <Zap size={20} />
        </div>
    </a>
);

const BigTitle = ({ text, top, right }) => (
    <h1 style={{...FixedStyles.bigTitle, top, right}} className="big-title">
        {text}
    </h1>
);

const ProjectDetailModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <ModalBase onClose={onClose}>
            <div style={ModalStyles.detailHeader}>
                <Aperture size={36} color={Theme.red} />
                <h2 style={ModalStyles.detailTitle}>{project.name}</h2>
            </div>
            <p style={ModalStyles.detailDescription}>{project.description}</p>
            
            <div style={ModalStyles.detailTags}>
                {project.tags.map(tag => (
                    <span key={tag} style={ModalStyles.detailTagItem}>{tag}</span>
                ))}
            </div>
        </ModalBase>
    );
};

export default WorkPage;