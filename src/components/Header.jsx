import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

import "../styles/Navbar.scss";

function Header() {
    const [language, setLanguage] = useState("English");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAccessibilityOpen, setIsAccessibilityOpen] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem("ncb-theme") || "default");
    const [isMediaOpen, setIsMediaOpen] = useState(false);
    const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const [isActsOpen, setIsActsOpen] = useState(false);
    const [isInternationalOpen, setIsInternationalOpen] = useState(false);
    const [isSubResourcesOpen, setIsSubResourcesOpen] = useState(false);
    const [isHandBookOpen, setIsHandBookOpen] = useState(false);
    const location = useLocation();
 
    // Effect to handle mobile sidebar and accessibility scroll lock
    useEffect(() => {
        if (isMenuOpen || isAccessibilityOpen) {
            document.body.classList.add("sidebar-open");
        } else {
            document.body.classList.remove("sidebar-open");
        }
        // Cleanup if component unmounts
        return () => document.body.classList.remove("sidebar-open");
    }, [isMenuOpen, isAccessibilityOpen]);


    // Effect to apply theme
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("ncb-theme", theme);
    }, [theme]);

    const isMediaActive = () => {
        const mediaRoutes = [
            "/media",
            "/media/awareness-videos",
            "/media/photo-gallery",
            "/media/video-gallery",
            "/media/visitor-photos",
            "/media/officer-visits",
            "/publication",
            "/awareness/spandan",
            "/awareness/cbse-mou",
            "/media/annual-reports"
        ];
        return mediaRoutes.some(path => location.pathname === path);
    };

    const isAboutActive = () => {
        const aboutRoutes = ["/about", "/organization", "/ncb-history", "/legislations", "/coordination", "/vigilance", "/bilateral-agreements", "/mou", "/motto-mission-vision"];
        return aboutRoutes.some(path => location.pathname === path);
    };


    const toggleAccessibility = () => {
        setIsAccessibilityOpen(!isAccessibilityOpen);
    };

    const skipToContent = (e) => {
        e.preventDefault();
        const mainContent = document.getElementById("main-content");
        if (mainContent) {
            mainContent.tabIndex = -1;
            mainContent.focus();
            mainContent.scrollIntoView({ behavior: 'smooth' });
        }
        setIsAccessibilityOpen(false);
    };

    const toggleScreenReader = () => {
        // Mock functionality for screen reader access
        alert("Screen Reader Access enabled. You can now use your preferred screen reader software.");
        setIsAccessibilityOpen(false);
    };

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "English" ? "Hindi" : "English"));
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) {
            resetAccordions();
        }
    };

    const resetAccordions = () => {
        setIsAboutOpen(false);
        setIsMediaOpen(false);
        setIsDirectoryOpen(false);
        setIsMoreOpen(false);
        setIsActsOpen(false);
        setIsInternationalOpen(false);
        setIsSubResourcesOpen(false);
        setIsHandBookOpen(false);
    };

    const toggleActsAccordion = (e) => {
        if (window.innerWidth <= 992) {
            e.stopPropagation();
            e.preventDefault();
            setIsActsOpen(!isActsOpen);
        }
    };

    const toggleInternationalAccordion = (e) => {
        if (window.innerWidth <= 992) {
            e.stopPropagation();
            e.preventDefault();
            setIsInternationalOpen(!isInternationalOpen);
        }
    };

    const toggleSubResourcesAccordion = (e) => {
        if (window.innerWidth <= 992) {
            e.stopPropagation();
            e.preventDefault();
            setIsSubResourcesOpen(!isSubResourcesOpen);
        }
    };

    const toggleMoreAccordion = (e) => {
        if (window.innerWidth <= 992) {
            e.preventDefault();
            const targetState = !isMoreOpen;
            resetAccordions();
            setIsMoreOpen(targetState);
        }
    };

    const toggleMediaAccordion = (e) => {
        if (window.innerWidth <= 992) {
            e.preventDefault();
            const targetState = !isMediaOpen;
            resetAccordions();
            setIsMediaOpen(targetState);
        }
    };

    const toggleDirectoryAccordion = (e) => {
        if (window.innerWidth <= 992) {
            e.preventDefault();
            const targetState = !isDirectoryOpen;
            resetAccordions();
            setIsDirectoryOpen(targetState);
        }
    };

    const toggleAboutAccordion = (e) => {
        if (window.innerWidth <= 992) {
            e.preventDefault();
            const targetState = !isAboutOpen;
            resetAccordions();
            setIsAboutOpen(targetState);
        }
    };

    const toggleHandBookAccordion = (e) => {
        if (window.innerWidth <= 992) {
            e.stopPropagation();
            e.preventDefault();
            setIsHandBookOpen(!isHandBookOpen);
        }
    };

    return (
        <>
        <header className="gov-header">
            {/* Absolute Top Level: Overlay */}
            {isMenuOpen && <div className="side-overlay active" onClick={toggleMenu}></div>}

            {/* Main Branding Section */}
            <div className="header-main-branding">
                <div className="container branding-container">
                    <div className="branding-left">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Emblem of India" className="gov-emblem" />
                        <img src="/logo.svg" alt="NCB Logo" className="ncb-logo-small" />
                        <div className="brand-text-col">
                            <span className="brand-gov-text">Government of India</span>
                            <h1 className="brand-org-name">Narcotics Control Bureau</h1>
                            <span className="brand-org-hindi">नारकोटिक्स कंट्रोल ब्यूरो</span>
                        </div>
                    </div>
 
                    <div className="branding-right">
                        <div className="search-wrapper-modern">
                            <div className="search-pill">
                                <input type="text" placeholder="Search..." className="search-input-field" aria-label="Search website" />
                                <button className="search-submit-btn" aria-label="Submit Search"><i className="bi bi-search"></i></button>
                            </div>
                        </div>
                        <div className="campaign-logos">
                            <img src="/digital_india.svg" alt="Digital India" className="digital-logo" />
                        </div>
                        <div className="utility-icons-group">
                            <button className={`utility-icon-btn lang-toggle ${language.toLowerCase()}-mode`} aria-label="Language Toggle" onClick={toggleLanguage}>
                                <div className="lang-roll-container">
                                    <span className="lang-pair hindi"><span className="lang-label">हिंदी</span></span>
                                    <span className="lang-pair english"><span className="lang-label">English</span></span>
                                </div>
                            </button>
                            <div className="v-divider"></div>
                            <Link to="/login" className="utility-icon-btn user-login-btn" aria-label="Internal User Login Portal">
                                <i className="bi bi-person-circle"></i>
                            </Link>
                            <div className="v-divider"></div>
                            <button className="utility-icon-btn Accessibility-icon" aria-label="Accessibility" onClick={toggleAccessibility}>
                                <i className="bi bi-universal-access-circle"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
 
            {/* Bottom Navigation Row - Desktop position remains here */}
            <div className={`header-nav-wrapper ${isMenuOpen ? "sidebar-active" : ""}`}>
                <div className="container nav-container-flex">
                    <button className="hamburger-btn" onClick={toggleMenu} aria-label="Toggle Menu">
                        <div className={`hamburger-icon ${isMenuOpen ? "active" : ""}`}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>
 
                    <nav className={`main-nav ${isMenuOpen ? "show-sidebar" : ""}`}>
                        {/* Sidebar Header with Logo and Close Button (Mobile ONLY) */}
                        <div className="sidebar-header">
                            <div className="sidebar-brand">
                                <img src="/logo.svg" alt="NCB Logo" className="sidebar-logo" />
                                <div className="sidebar-brand-text">
                                    <span className="side-org-name">NCB</span>
                                </div>
                            </div>
                            <button className="close-sidebar-btn" onClick={toggleMenu} aria-label="Close Menu">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
 
                        <div className="nav-links">
                            <div>
                                <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setIsMenuOpen(false)}>
                                    HOME
                                </NavLink>
                            </div>
                            <div className={`nav-dropdown-li ${isAboutOpen ? "accordion-open" : ""}`}>
                                <NavLink to="/about" className={`nav-item ${isAboutActive() ? "active" : ""}`} onClick={toggleAboutAccordion}>
                                    WHO WE ARE <span className="dropdown-arrow">▾</span>
                                </NavLink>
                                <div className="dropdown-menu">
                                    <div><NavLink to="/about" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>About NCB</NavLink></div>
                                    <div><NavLink to="/historical-background" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Historical Background</NavLink></div>
                                    <div><NavLink to="/motto-mission-vision" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Mission, Vision & Motto</NavLink></div>
                                    <div><NavLink to="/organization" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Organizational Chart</NavLink></div>
                                    <div><NavLink to="/office-locator" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Zonal/Regional Office Locator</NavLink></div>
                                </div>
                            </div>
 
                            <div className={`nav-dropdown-li ${isMediaOpen ? "accordion-open" : ""}`}>
                                <NavLink to="/media" className={`nav-item ${isMediaActive() ? "active" : ""}`} onClick={toggleMediaAccordion}>
                                    MEDIA, NEWS & EVENTS <span className="dropdown-arrow">▾</span>
                                </NavLink>
                                <div className="dropdown-menu">
                                    <div><NavLink to="/media/latest-news" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Latest News & Events</NavLink></div>
                                    <div><NavLink to="/media/photo-gallery" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Photo Gallery</NavLink></div>
                                    <div><NavLink to="/media/video-gallery" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Video Gallery</NavLink></div>
                                    <div><NavLink to="/media/press-release" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Press Releases</NavLink></div>
                                    <div><NavLink to="/media/former-head" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Former NCB Heads</NavLink></div>
                                </div>
                            </div>
 
                            <div className={`nav-dropdown-li ${isDirectoryOpen ? "accordion-open" : ""}`}>
                                <NavLink to="/career" className="nav-item d-flex justify-content-between align-items-center" onClick={toggleDirectoryAccordion}>
                                    CAREERS <span className="dropdown-arrow">▾</span>
                                </NavLink>
                                <div className="dropdown-menu">
                                    <div><NavLink to="/career/vacancies" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Current Vacancies</NavLink></div>
                                    <div><NavLink to="/recruitment-rules" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Recruitment Rules</NavLink></div>
                                    <div><NavLink to="/employee-corner" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Employee Corner</NavLink></div>
                                </div>
                            </div>
 
                            <div>
                                <NavLink to="/contact" className="nav-item" onClick={() => setIsMenuOpen(false)}>
                                    CONTACT US
                                </NavLink>
                            </div>
 
                            <div>
                                <NavLink to="/e-pledge" className="nav-item" onClick={() => setIsMenuOpen(false)}>
                                    E-PLEDGE
                                </NavLink>
                            </div>
 
                            <div>
                                <NavLink to="/scam-alert" className="nav-item" onClick={() => setIsMenuOpen(false)}>
                                    SCAM ALERT
                                </NavLink>
                            </div>
 
                            <div className={`nav-dropdown-li ${isMoreOpen ? "accordion-open" : ""}`}>
                                <button className="nav-item border-0 bg-transparent text-uppercase" onClick={toggleMoreAccordion}>
                                    MORE <span className="dropdown-arrow">▾</span>
                                </button>
                                <div className="dropdown-menu">
                                    <div className={`nested-dropdown-li ${isActsOpen ? "nested-open" : ""}`}>
                                        <button className="dropdown-item d-flex justify-content-between align-items-center w-100 border-0 bg-transparent text-start" onClick={toggleActsAccordion}>
                                            ACTS & RULES <span className="dropdown-arrow">▾</span>
                                        </button>
                                        <div className="nested-menu">
                                            <div className="menu-group-label px-3 py-1 small fw-bold text-muted">Indian Legislations</div>
                                            <div><NavLink to="/acts/ndps-1985" className="dropdown-item small-text" onClick={() => setIsMenuOpen(false)}>NDPS Act, 1985</NavLink></div>
                                            <div><NavLink to="/rules/ndps-1985" className="dropdown-item small-text" onClick={() => setIsMenuOpen(false)}>NDPS Rules, 1985</NavLink></div>
                                            <div><NavLink to="/acts/pit-ndps-1988" className="dropdown-item small-text" onClick={() => setIsMenuOpen(false)}>PIT NDPS Act, 1988</NavLink></div>
                                            <div><NavLink to="/acts/rcs-2013" className="dropdown-item small-text" onClick={() => setIsMenuOpen(false)}>RCS Order, 2013 and Amendments</NavLink></div>
                                            <div className="menu-group-label px-3 py-1 small fw-bold text-muted mt-2">International Conventions</div>
                                            <div><NavLink to="/acts/convention-1961" className="dropdown-item small-text" onClick={() => setIsMenuOpen(false)}>Single Convention 1961</NavLink></div>
                                            <div><NavLink to="/acts/convention-1971" className="dropdown-item small-text" onClick={() => setIsMenuOpen(false)}>Psychotropic Substances 1971</NavLink></div>
                                            <div><NavLink to="/acts/vienna-1988" className="dropdown-item small-text" onClick={() => setIsMenuOpen(false)}>Vienna Convention (1988)</NavLink></div>
                                        </div>
                                    </div>
                                    <div className={`nested-dropdown-li ${isInternationalOpen ? "nested-open" : ""}`}>
                                        <button className="dropdown-item d-flex justify-content-between align-items-center w-100 border-0 bg-transparent text-start" onClick={toggleInternationalAccordion}>
                                            INTERNATIONAL COOPERATION <span className="dropdown-arrow">▾</span>
                                        </button>
                                        <div className="nested-menu">
                                            <div><NavLink to="/international/bilateral" className="dropdown-item small-text" onClick={() => setIsMenuOpen(false)}>Bilateral Agreements</NavLink></div>
                                            <div><NavLink to="/international/extradition" className="dropdown-item small-text" onClick={() => setIsMenuOpen(false)}>Extradition Treaties</NavLink></div>
                                            <div><NavLink to="/international/mous" className="dropdown-item small-text" onClick={() => setIsMenuOpen(false)}>MoUs with Foreign Agencies</NavLink></div>
                                            <div><NavLink to="/international/mlats" className="dropdown-item small-text" onClick={() => setIsMenuOpen(false)}>MLATs</NavLink></div>
                                            <div><NavLink to="/international/liaison" className="dropdown-item small-text" onClick={() => setIsMenuOpen(false)}>Collaborative Programs</NavLink></div>
                                        </div>
                                    </div>
                                    <div className={`nested-dropdown-li ${isSubResourcesOpen ? "nested-open" : ""}`}>
                                        <button className="dropdown-item d-flex justify-content-between align-items-center w-100 border-0 bg-transparent text-start" onClick={toggleSubResourcesAccordion}>
                                            RESOURCES <span className="dropdown-arrow">▾</span>
                                        </button>
                                        <div className="nested-menu">
                                            <div><NavLink to="/resources/seizure-reports" className="dropdown-item small-text" onClick={() => setIsMenuOpen(false)}>Drug Seizure Reports</NavLink></div>
                                            <div><NavLink to="/resources/disposal-reports" className="dropdown-item small-text" onClick={() => setIsMenuOpen(false)}>Disposal Reports</NavLink></div>
                                            <div><NavLink to="/media/annual-reports" className="dropdown-item small-text" onClick={() => setIsMenuOpen(false)}>Annual Reports</NavLink></div>
                                            <div className={`nested-dropdown-li ${isHandBookOpen ? "nested-open" : ""}`}>
                                                <button className="dropdown-item d-flex justify-content-between align-items-center w-100 border-0 bg-transparent text-start" onClick={toggleHandBookAccordion}>
                                                    DLEA Handbooks <span className="dropdown-arrow">▾</span>
                                                </button>
                                                <div className="nested-menu">
                                                    <div><NavLink to="/dlea/handbook-en" className="dropdown-item x-small-text" onClick={() => setIsMenuOpen(false)}>Field Officer's Hand Book (EN)</NavLink></div>
                                                    <div><NavLink to="/dlea/handbook-hi" className="dropdown-item x-small-text" onClick={() => setIsMenuOpen(false)}>Field Officer's Hand Book (HI)</NavLink></div>
                                                </div>
                                            </div>
                                            <div className="menu-group-label px-3 py-1 small fw-bold text-muted mt-2">Useful Links</div>
                                            <div><a href="https://socialjustice.gov.in/" target="_blank" rel="noopener noreferrer" className="dropdown-item small-text">MoSJE</a></div>
                                            <div><a href="https://ncord.gov.in/" target="_blank" rel="noopener noreferrer" className="dropdown-item small-text">NCORD</a></div>
                                            <div><a href="https://main.mohfw.gov.in/" target="_blank" rel="noopener noreferrer" className="dropdown-item small-text">MoHFW</a></div>
                                            <div><a href="https://www.unodc.org/" target="_blank" rel="noopener noreferrer" className="dropdown-item small-text">UNODC</a></div>
                                        </div>
                                    </div>
                                    <div><NavLink to="/directory/officers-staff" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Directory</NavLink></div>
                                    <div><NavLink to="/faq" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>FAQs</NavLink></div>
                                    <div><NavLink to="/sitemap" className="dropdown-item" onClick={() => setIsMenuOpen(false)}>Sitemap</NavLink></div>
                                </div>
                            </div>
 
                            <div className="nav-action-li">
                                <a href="https://ncbmanas.gov.in/" target="_blank" rel="noopener noreferrer" className="submit-tip-nav-btn external-link-nav">
                                    <span className="btn-icon">📢</span>
                                    SUBMIT TIP
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>

        {/* Accessibility Sidebar (Moved outside header to break out of backdrop-filter CSS containing block) */}
        <div className={`accessibility-sidebar ${isAccessibilityOpen ? "active" : ""}`}>
            <div className="access-header">
                <h3>Accessibility Options</h3>
                <button className="close-access-btn" onClick={() => setIsAccessibilityOpen(false)} aria-label="Close Accessibility Panel">
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>
            <div className="access-body">
                <div className="access-group">
                    <label>Navigation</label>
                    <button onClick={skipToContent} className="access-btn">
                        <i className="bi bi-arrow-down-square"></i> Skip to Main Content
                    </button>
                    <button onClick={toggleScreenReader} className="access-btn">
                        <i className="bi bi-volume-up"></i> Screen Reader Access
                    </button>
                </div>

                {location.pathname === "/" && (
                    <div className="access-group">
                        <label>Theme Settings</label>
                        <div className="theme-options">
                            <div
                                className={`theme-swatch default ${theme === "default" ? "active" : ""}`}
                                onClick={() => setTheme("default")}
                                aria-label="Switch to NCB Blue Theme"
                            >
                                <div className="swatch-color"></div>
                                <span>Blue (Default)</span>
                            </div>
                            <div
                                className={`theme-swatch secondary ${theme === "secondary" ? "active" : ""}`}
                                onClick={() => setTheme("secondary")}
                                aria-label="Switch to NCB Teal Theme"
                            >
                                <div className="swatch-color"></div>
                                <span>Teal Theme</span>
                            </div>
                        </div>
                    </div>
                )}

                <div className="access-footer-note">
                    <p>These settings will be saved for your next visit.</p>
                </div>
            </div>
        </div>
        {isAccessibilityOpen && <div className="side-overlay active" onClick={() => setIsAccessibilityOpen(false)}></div>}
        </>
    );
}

export default Header;