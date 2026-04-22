import { useState, useEffect, useCallback, useRef } from "react";
import "../styles/Home.scss";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS modules
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);

// Importing slider images
import slider1 from "../assets/slider/slider1.jpg";
import slider2 from "../assets/slider/slider2.png";
import slider3 from "../assets/slider/slider3.jpg";
import slider4 from "../assets/slider/apexncord.jpg";
import dgProfile from "../assets/profile.jpeg";

// Importing Gallery Images
import g1 from "../assets/gallary-img/10trainee-bsf.jpeg";
import g2 from "../assets/gallary-img/11apppa-51batch.jpeg";
import g3 from "../assets/gallary-img/12induction-training-si.jpeg";
import g4 from "../assets/gallary-img/1mou-ncb-capt-bprd.jpeg";
import g5 from "../assets/gallary-img/2mou-ncb-bprdcapt.jpeg";
import g6 from "../assets/gallary-img/3mou-ncb-capt.jpeg";
import g7 from "../assets/gallary-img/3ncbdg.jpeg";
import g8 from "../assets/gallary-img/4antf.jpeg";
import g9 from "../assets/gallary-img/4ncbadg.jpeg";
import g10 from "../assets/gallary-img/5martime.jpeg";
import g11 from "../assets/gallary-img/8trainee-bsf.jpeg";
import g12 from "../assets/gallary-img/9trainee-iis.jpeg";

// Portal Logos
import manasLogo from "../assets/link-img/MANAS_LogoE.jpeg";
import pmnrfLogo from "../assets/link-img/PMNRF.png";
import dataGovLogo from "../assets/link-img/data-gov.png";
import goLogo from "../assets/link-img/go.png";
import iigLogo from "../assets/link-img/iig.png";
import indiaGovLogo from "../assets/link-img/india-gov.png";
import myGovLogo from "../assets/link-img/mygov.png";
import nidaanLogo from "../assets/link-img/niddan.png";
import swachhLogo from "../assets/link-img/swach-bharat.png";
import ncbLogo from "../assets/logo.svg";

// Wanted Criminals Profiles
import c1 from "../assets/criminal/c1.png";
import c2 from "../assets/criminal/c2.png";
import c3 from "../assets/criminal/c3.png";


const slides = [
    {
        id: 1,
        image: slider1,
        title: "Securing the Nation from Narcotics",
        description: "The Narcotics Control Bureau is committed to a drug-free India through persistent enforcement and awareness."
    },
    {
        id: 2,
        image: slider2,
        title: "Modern Intelligence & Enforcement",
        description: "Utilizing state-of-the-art technology and intelligence networks to dismantle global drug trafficking rings."
    },
    {
        id: 3,
        image: slider3,
        title: "Awareness & Community Engagement",
        description: "Empowering the youth and communities to resist drug abuse through nationwide educational programs."
    },
    {
        id: 4,
        image: slider4,
        title: "Strategic Cooperation & NCORD",
        description: "Strengthening the institutional mechanism for multi-agency coordination in drug law enforcement."
    }
];

function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isTickerPaused, setIsTickerPaused] = useState(false);

    const [activeOfferTab, setActiveOfferTab] = useState("Legal Judgments");
    const [isNewsPlaying, setIsNewsPlaying] = useState(true);
    const [isPressPlaying, setIsPressPlaying] = useState(true);
    const [isActivityPlaying, setIsActivityPlaying] = useState(true);

    // Hover states for scrolling boxes
    const [isNewsHovered, setIsNewsHovered] = useState(false);
    const [isPressHovered, setIsPressHovered] = useState(false);
    const [isActivityHovered, setIsActivityHovered] = useState(false);

    // Refs for scroll containers
    const newsScrollRef = useRef(null);
    const pressScrollRef = useRef(null);
    const activityScrollRef = useRef(null);
    const portalsScrollRef = useRef(null);
    const socialScrollRef = useRef(null);

    // Dynamic refs for real-time hover status in animation loops
    const newsHoverRef = useRef(false);
    const pressHoverRef = useRef(false);
    const activityHoverRef = useRef(false);

    // Draggable Portals Slider Logic
    const [isPortalsDragging, setIsPortalsDragging] = useState(false);
    const [isPortalsHovered, setIsPortalsHovered] = useState(false);
    const [isPortalsPlaying, setIsPortalsPlaying] = useState(true);
    const [portalsStartX, setPortalsStartX] = useState(0);
    const [portalsScrollLeft, setPortalsScrollLeft] = useState(0);

    // Enforcement Dashboard Data
    const drugArrestData = {
        labels: ['Heroin', 'Cocaine', 'Opium', 'Ganja', 'Synthetic Drugs'],
        datasets: [
            {
                label: 'Arrests',
                data: [1250, 450, 890, 3200, 780],
                backgroundColor: 'rgba(67, 56, 202, 0.7)',
                borderColor: 'rgba(67, 56, 202, 1)',
                borderWidth: 1,
                borderRadius: 8,
            },
        ],
    };

    const personTypeData = {
        labels: ['Dealers', 'Users', 'Smugglers', 'Couriers'],
        datasets: [
            {
                data: [45, 30, 15, 10],
                backgroundColor: [
                    '#4338ca',
                    '#06b6d4',
                    '#f59e0b',
                    '#ef4444',
                ],
                borderWidth: 0,
            },
        ],
    };

    const wantedCriminals = [
        {
            id: 1,
            photo: c1,
            name: "Rahul 'Python' Sharma",
            crime: "Drug Trafficking",
            location: "Mumbai, Maharashtra",
            reward: "₹ 10,00,000",
            status: "High Alert"
        },
        {
            id: 2,
            photo: c2,
            name: "Zoya Ibrahim",
            crime: "Narcotics Mfg",
            location: "Indore, Madhya Pradesh",
            reward: "₹ 5,00,000",
            status: "Wanted"
        },
        {
            id: 3,
            photo: c3,
            name: "Vikram 'Ghost' Singh",
            crime: "Border Smuggling",
            location: "Amritsar, Punjab",
            reward: "₹ 7,50,000",
            status: "Fugitive"
        }
    ];

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    font: { family: "'Inter', sans-serif", size: 12 }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                padding: 12,
                bodyFont: { family: "'Inter', sans-serif" },
                titleFont: { family: "'Outfit', sans-serif" }
            }
        },
        maintainAspectRatio: false,
    };

    const handleExternalLink = (e, url) => {
        e.preventDefault();
        const confirmExit = window.confirm("You are being redirected to an external website. Do you want to continue?");
        if (confirmExit) {
            window.open(url, "_blank", "noopener,noreferrer");
        }
    };

    const handlePortalsMouseDown = (e) => {
        setIsPortalsDragging(true);
        setPortalsStartX(e.pageX - portalsScrollRef.current.offsetLeft);
        setPortalsScrollLeft(portalsScrollRef.current.scrollLeft);
    };

    const handlePortalsMouseMove = (e) => {
        if (!isPortalsDragging) return;
        e.preventDefault();
        const x = e.pageX - portalsScrollRef.current.offsetLeft;
        const walk = (x - portalsStartX) * 2; // Drag speed multiplier
        portalsScrollRef.current.scrollLeft = portalsScrollLeft - walk;
    };

    const stopPortalsDragging = () => {
        setIsPortalsDragging(false);
    };

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, []);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        document.title = "Home | Narcotics Control Bureau, Government of India";
    }, []);

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(nextSlide, 5000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, nextSlide]);


    // JS Scroll Animation Effect
    useEffect(() => {
        let animationFrameId;
        const scrollStep = 1.5; // Optimized for a clear, fluid sliding effect that is reliable across browsers

        const performScroll = () => {
            const boxes = [
                { ref: newsScrollRef, playing: isNewsPlaying, hovered: newsHoverRef.current },
                { ref: pressScrollRef, playing: isPressPlaying, hovered: pressHoverRef.current },
                { ref: activityScrollRef, playing: isActivityPlaying, hovered: activityHoverRef.current }
            ];

            boxes.forEach(box => {
                const container = box.ref.current;
                if (container && box.playing && !box.hovered) {
                    const scrollHeight = container.scrollHeight;
                    const clientHeight = container.clientHeight;

                    if (scrollHeight > clientHeight + 5) {
                        container.scrollTop += 0.8;

                        if (container.scrollTop >= (scrollHeight / 2)) {
                            container.scrollTop = 0;
                        }
                    }
                }
            });

            // Horizontal scroll for portals
            if (portalsScrollRef.current && !isPortalsDragging && !isPortalsHovered && isPortalsPlaying) {
                const container = portalsScrollRef.current;
                container.scrollLeft += 0.8; // Portals speed
                if (container.scrollLeft >= container.scrollWidth / 2) {
                    container.scrollLeft = 0;
                }
            }

            animationFrameId = requestAnimationFrame(performScroll);
        };

        animationFrameId = requestAnimationFrame(performScroll);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isNewsPlaying, isPressPlaying, isActivityPlaying, isPortalsHovered, isPortalsDragging, isPortalsPlaying]);

    // GALLERY CAROUSEL LOGIC
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [isGalleryPlaying, setIsGalleryPlaying] = useState(true);
    const galleryImages = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12];

    const nextGallery = useCallback(() => {
        setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
    }, [galleryImages.length]);

    const prevGallery = () => {
        setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    useEffect(() => {
        let interval;
        if (isGalleryPlaying) {
            interval = setInterval(nextGallery, 3000);
        }
        return () => clearInterval(interval);
    }, [isGalleryPlaying, nextGallery]);

    const togglePlay = () => setIsPlaying(!isPlaying);

    const handleSocialPrev = () => {
        if (socialScrollRef.current) {
            const card = socialScrollRef.current.querySelector('.social-card');
            const cardWidth = card.getBoundingClientRect().width + 20; // card width + gap
            socialScrollRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        }
    };

    const handleSocialNext = () => {
        if (socialScrollRef.current) {
            const card = socialScrollRef.current.querySelector('.social-card');
            const cardWidth = card.getBoundingClientRect().width + 20; // card width + gap
            socialScrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
    };

    return (
        <div className="home-container">
            {/* Hero Slider Section */}
            <section className="hero-slider" aria-label="Hero Image Slider">
                <div className="slider-track"
                    style={{ "--current-slide": currentIndex }} >
                    {slides.map((slide) => (
                        <div key={slide.id} className="slide">
                            {/* Blurred Background Layer to fill space */}
                            <div className="slide-bg-blur">
                                <img src={slide.image} alt="" aria-hidden="true" />
                            </div>
                            <div className="slide-image-container">
                                <img src={slide.image} alt={slide.title} className="foreground-img" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Slider Navigation Controls - Matching Screenshot (Black blocks) */}
                <button
                    className="slider-control prev-btn"
                    onClick={prevSlide}
                    aria-label="Previous Slide" >
                    <i className="bi bi-chevron-left"></i>
                </button>
                <button
                    className="slider-control next-btn"
                    onClick={nextSlide}
                    aria-label="Next Slide" >
                    <i className="bi bi-chevron-right"></i>
                </button>

                {/* Dot Indicators & Play/Pause - Positioned Right bottom as in screenshot */}
                <div className="slider-utility-row">
                    <div className="slider-dots">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                className={`dot ${index === currentIndex ? "active" : ""}`}
                                onClick={() => setCurrentIndex(index)}
                                aria-label={`Go to slide ${index + 1}`}
                                aria-current={index === currentIndex ? "true" : "false"}
                            />
                        ))}
                    </div>
                    <button className={`slider-play-pause ${isPlaying ? "playing" : "paused"}`}
                        onClick={togglePlay}
                        aria-label={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
                    >
                        {isPlaying ? <i className="bi bi-pause-fill"></i> : <i className="bi bi-play-fill"></i>}
                    </button>
                </div>
            </section>

            {/* Announcement Ticker Section - MeitY / CDAC Style */}
            <section className="meity-announcement-ticker">
                <div className="container ticker-flex">
                    <div className="ticker-label">
                        Announcements
                    </div>
                    <div className="ticker-scroll-field">
                        <div className={`ticker-track ${isTickerPaused ? "paused" : ""}`}>
                            <p><strong>Latest Update:</strong> Submission of Expression of Interest (EoI) for Transfer of Technology (ToT) under the <strong>Ministry of Electronics and Information Technology</strong> programs. <span className="sep">|</span> <strong>Narcotics Control Bureau:</strong> Commitment to a <strong>Drug-Free India</strong> through multi-agency coordination (NCORD). <span className="sep">|</span> <strong>Help Desk Numbers:</strong> 011-26761000, 26761144.</p>
                        </div>
                    </div>
                    <button className="ticker-action-btn" aria-label={isTickerPaused ? "Play" : "Pause"} onClick={() => setIsTickerPaused(!isTickerPaused)}>
                        {isTickerPaused ? <i className="bi bi-play-fill"></i> : <i className="bi bi-pause-fill"></i>}
                    </button>
                </div>
            </section>

            {/* Redesigned DG Message Section - Atmospheric Shield (No Box/No Shadow) */}
            <section className="dg-message-portal-section-new">
                <div className="container dg-portal-flex-new">
                    {/* Unique Shield-Shaped Image Frame */}
                    <div className="dg-image-column-new">
                        <div className="dg-shield-frame">
                            <img src={dgProfile} alt="Shri Anurag Garg" />
                            <div className="dg-shield-border"></div>
                        </div>
                    </div>

                    <div className="dg-text-column-new">
                        <div className="dg-badge-modern">
                            <i className="bi bi-shield-check"></i> DIRECTOR GENERAL'S MESSAGE
                        </div>

                        <div className="dg-quote-wrapper-new">
                            <i className="bi bi-quote quote-icon-elegant"></i>
                            <h2 className="dg-quote-text-new">
                                "The Narcotics Control Bureau is the guardian of our nation's future, protecting youth and families from the scourge of drugs through intelligence and coordination."
                            </h2>
                            
                            <div className="dg-portal-footer-flex">
                                <div className="dg-signature-new">
                                    <div className="dg-name-signature-font">
                                        Shri Anurag Garg, IPS
                                    </div>
                                    <div className="dg-designation-new">
                                        DIRECTOR GENERAL | NCB INDIA
                                    </div>
                                </div>

                                <button className="dg-read-more-flat-link">
                                    READ FULL MESSAGE <i className="bi bi-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Live Enforcement Intelligence Dashboard */}
            <section className="ncb-live-enforcement-section">
                <div className="container">
                    <div className="perfect-section-header">
                        <span className="live-pulse-dot"></span>
                        <h2 className="gateway-title">Live <span>Enforcement Analytics</span></h2>
                    </div>

                    {/* Dashboard Layout Container */}
                    <div className="dashboard-flex-layout">
                        {/* Left Side: KPI Stats Column */}
                        <div className="enforcement-kpi-sidebar">
                            <div className="kpi-stat-card has-blue-glow">
                                <div className="kpi-icon-box blue">
                                    <i className="bi bi-box-seam"></i>
                                </div>
                                <div className="kpi-info">
                                    <span className="kpi-label">Total Seizures</span>
                                    <h3 className="kpi-value">14,285 <small>KG</small></h3>
                                    <div className="kpi-trend up"><i className="bi bi-arrow-up-right"></i> +12%</div>
                                </div>
                            </div>

                            <div className="kpi-stat-card has-indigo-glow">
                                <div className="kpi-icon-box indigo">
                                    <i className="bi bi-file-earmark-medical"></i>
                                </div>
                                <div className="kpi-info">
                                    <span className="kpi-label">Cases Registered</span>
                                    <h3 className="kpi-value">2,840</h3>
                                    <div className="kpi-trend up"><i className="bi bi-arrow-up-right"></i> +8%</div>
                                </div>
                            </div>

                            <div className="kpi-stat-card has-cyan-glow">
                                <div className="kpi-icon-box cyan">
                                    <i className="bi bi-people"></i>
                                </div>
                                <div className="kpi-info">
                                    <span className="kpi-label">Total Arrests</span>
                                    <h3 className="kpi-value">5,192</h3>
                                    <div className="kpi-trend up"><i className="bi bi-arrow-up-right"></i> +15%</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Charts Grid */}
                        <div className="enforcement-charts-main">
                            <div className="chart-panel-card">
                                <div className="chart-header">
                                    <h3>Drug-wise Arrest Statistics</h3>
                                    <p>Vertical analysis of arrests categorized by primary substance type.</p>
                                </div>
                                <div className="chart-body">
                                    <Bar data={drugArrestData} options={chartOptions} />
                                </div>
                            </div>

                            <div className="chart-panel-card">
                                <div className="chart-header">
                                    <h3>Classification of Arrests</h3>
                                    <p>Percentage distribution by role in trafficking ecosystem.</p>
                                </div>
                                <div className="chart-body">
                                    <Doughnut data={personTypeData} options={chartOptions} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>




            <section className="about-meity-section" id="about-us">
                <div className="container">
                    <div className="perfect-section-header">
                        <h2 className="gateway-title">
                            <i className="bi bi-diagram-3-fill meity-icon"></i>
                            About <span>Narcotics Control Bureau</span>
                        </h2>
                    </div>

                    <div className="about-meity-grid">
                        {/* Left Column: About Info & Quick Links */}
                        <div className="about-meity-left">

                        <div className="meity-description">
                            <p>
                                The Narcotics Control Bureau (NCB), under <strong>Ministry of Home Affairs</strong>, is the nodal agency responsible for coordinating drug law enforcement throughout the country. It is rooted in <strong>Article 47</strong> of the Indian Constitution, directing the State to endeavour to bring about prohibition of the consumption of intoxicating drugs injurious to health.
                            </p>
                            <p>
                                As the Central Authority, NCB dismantles illicit networks and coordinates with international conventions including the 1961 Single Convention on Narcotic Drugs and the 1971 Convention on Psychotropic Substances.
                            </p>
                        </div>

                        <div className="meity-quick-boxes">
                            <div className="meity-box">
                                <i className="bi bi-people-fill"></i>
                                <span>Our Team</span>
                            </div>
                            <div className="meity-box">
                                <i className="bi bi-grid-3x3-gap-fill"></i>
                                <span>Legislative Policy</span>
                            </div>
                            <div className="meity-box">
                                <i className="bi bi-bar-chart-fill"></i>
                                <span>Our Performance</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Key Motto Card */}
                    <div className="about-meity-right">
                        <div className="meity-profile-card">
                            <div className="profile-img-box">
                                <div className="placeholder-emblem">
                                    <i className="bi bi-shield-check"></i>
                                </div>
                            </div>
                            <div className="profile-info">
                                <span className="profile-name">Zero Tolerance</span>
                                <span className="profile-designation">DRUG-FREE INDIA</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


            {/* Key Offerings & What's New Section - MeitY / CDAC Exact Design */}
            <section className="key-offerings-news-section">
                <div className="container">
                    <div className="row offerings-news-grid">
                        {/* Left Side: Key Offerings with Tabs */}
                        <div className="col-lg-8 mb-4 mb-lg-0">
                            <div className="key-offerings-column">
                                <div className="offering-header-flex">
                                    <i className="bi bi-clipboard2-check offering-main-icon"></i>
                                    <h2>Key Offerings</h2>
                                </div>

                                <div className="offerings-tab-container">
                                    <div className="offerings-tabs-wrapper">
                                        <div className="offerings-tabs-row">
                                            <button className={`offer-tab ${activeOfferTab === "Legal Judgments" ? "active" : ""}`} onClick={() => setActiveOfferTab("Legal Judgments")}>
                                                <i className="bi bi-gavel"></i> Legal Judgments
                                            </button>
                                            <button className={`offer-tab ${activeOfferTab === "Most Wanted" ? "active" : ""}`} onClick={() => setActiveOfferTab("Most Wanted")}>
                                                <i className="bi bi-person-badge"></i> Most Wanted
                                            </button>
                                            <button className={`offer-tab ${activeOfferTab === "Community Outreach" ? "active" : ""}`} onClick={() => setActiveOfferTab("Community Outreach")}>
                                                <i className="bi bi-people"></i> Community Outreach
                                            </button>
                                        </div>
                                        <div className={`tab-indicator-active pos-${activeOfferTab.toLowerCase().replace(' ', '-')}`}></div>
                                    </div>

                                    <div className="offerings-tab-content-wrapper" key={activeOfferTab}>
                                        <div className="offerings-tab-content">
                                        {activeOfferTab === "Legal Judgments" && (
                                            <div className="legal-table-tab-container">

                                                
                                                <div className="table-responsive-wrapper">
                                                    <table className="legal-minimal-table">
                                                        <thead>
                                                            <tr>
                                                                <th>CASE TITLE</th>
                                                                <th>COURT</th>
                                                                <th>DATE</th>
                                                                <th className="text-center">VIEW JUDGMENT</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className="case-title">Cybercrime Investigation Case</td>
                                                                <td>Supreme Court</td>
                                                                <td>12-Mar-2026</td>
                                                                <td className="text-center"><button className="table-view-btn"><i className="bi bi-file-earmark-text"></i> View</button></td>
                                                            </tr>
                                                            <tr>
                                                                <td className="case-title">Digital Privacy Rights Case</td>
                                                                <td>Delhi HC</td>
                                                                <td>05-Mar-2026</td>
                                                                <td className="text-center"><button className="table-view-btn"><i className="bi bi-file-earmark-text"></i> View</button></td>
                                                            </tr>
                                                            <tr>
                                                                <td className="case-title">Drug Trafficking Case</td>
                                                                <td>Punjab HC</td>
                                                                <td>01-Mar-2026</td>
                                                                <td className="text-center"><button className="table-view-btn"><i className="bi bi-file-earmark-text"></i> View</button></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>


                                            </div>
                                        )}
                                        {activeOfferTab === "Most Wanted" && (
                                            <div className="tab-detailed-container wanted-tab-v2">

                                                <div className="table-responsive-wrapper">
                                                    <table className="wanted-list-table legal-minimal-table">
                                                        <thead>
                                                            <tr>
                                                                <th>PROFILE</th>
                                                                <th>NAME</th>
                                                                <th>OFFENCE</th>
                                                                <th>LAST KNOWN STATE</th>
                                                                <th className="text-center">REWARD</th>
                                                                <th className="text-center">ACTION</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {wantedCriminals.map((criminal) => (
                                                                <tr key={criminal.id}>
                                                                    <td style={{ width: '80px' }}>
                                                                        <div className="criminal-pfp">
                                                                            <img src={criminal.photo} alt={criminal.name} />
                                                                            <span className={`status-tag ${criminal.status.toLowerCase().replace(' ', '-')}`}></span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="criminal-name-cell">
                                                                        <strong>{criminal.name}</strong>
                                                                        <span className={`badge-status ${criminal.status.toLowerCase().replace(' ', '-')}`}>{criminal.status}</span>
                                                                    </td>
                                                                    <td><span className="crime-label-mini">{criminal.crime}</span></td>
                                                                    <td className="location-text-v2">
                                                                        <i className="bi bi-geo-alt-fill"></i> {criminal.location}
                                                                    </td>
                                                                    <td className="text-center reward-text-v2">{criminal.reward}</td>
                                                                    <td className="text-center">
                                                                        <button className="wanted-icon-btn" aria-label={`View details for ${criminal.name}`}>
                                                                            <i className="bi bi-eye-fill"></i>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>
                                        )}
                                        {activeOfferTab === "Community Outreach" && (
                                            <ul className="offering-list">
                                                <li><span>Anti Drug Awareness Program at New Delhi HQ</span> <i className="bi bi-chevron-right"></i></li>
                                                <li><span>Youth Campaign: Say No to Drugs, Say Yes to Life</span> <i className="bi bi-chevron-right"></i></li>
                                                <li><span>School Seminar on Substance Abuse Prevention</span> <i className="bi bi-chevron-right"></i></li>
                                                <li><span>NGO Collaboration: Community Support Systems</span> <i className="bi bi-chevron-right"></i></li>
                                                <li><span>Public Outreach: Narcotics Awareness Drive 2026</span> <i className="bi bi-chevron-right"></i></li>
                                            </ul>
                                        )}
                                        </div>
                                    </div>
                                </div>
                                <div className="offerings-footer">
                                    <button className="meity-view-more-btn">VIEW MORE <i className="bi bi-chevron-right"></i></button>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: What's New Box */}
                        <div className="col-lg-4">
                            <div className="whats-new-column">
                                <div className="offering-header-flex">
                                    <i className="bi bi-stars offering-main-icon"></i>
                                    <h2>What's New</h2>
                                    <button className="play-pause-header-btn ms-auto" onClick={() => setIsNewsPlaying(!isNewsPlaying)} title={isNewsPlaying ? "Pause" : "Play"} aria-label={isNewsPlaying ? "Pause News" : "Play News"}>
                                        {isNewsPlaying ? <i className="bi bi-pause-fill"></i> : <i className="bi bi-play-fill"></i>}
                                    </button>
                                </div>

                                <div className="whats-new-dark-box"
                                    onMouseEnter={() => { newsHoverRef.current = true; setIsNewsHovered(true); }}
                                    onMouseLeave={() => { newsHoverRef.current = false; setIsNewsHovered(false); }}>
                                    <div className="update-scroll-container" ref={newsScrollRef}>
                                        <ul className="whats-new-list">
                                            {[
                                                { title: "Training program on darknet investigation concludes at NCB Academy.", isAlert: false },
                                                { title: "MOU signed with Coast Guard for enhanced maritime surveillance.", isAlert: false },
                                                { title: "Warning regarding new psychoactive substances detected in market.", isAlert: true },
                                                { title: "Reporting of suspicious activities across various states.", isAlert: false },
                                                { title: "Financial Assistance for Drug Law Enforcement Mechanism 2025.", isAlert: false },
                                                { title: "Major achievements of NCB for the month of February, 2025.", isAlert: false },
                                                { title: "Advisory: Stay safe from online medicine fraud and illegal pharmacies.", isAlert: true },
                                                { title: "Director General chairs high-level review meeting on border security.", isAlert: false },
                                                { title: "New recruitment notice for Intelligence Officers released.", isAlert: false },
                                                { title: "NCB Academy announces advanced course on digital forensics.", isAlert: false },
                                                { title: "Special operation 'Clean Sweep' results in major drug bust.", isAlert: false },
                                                { title: "Public alert: Rise in synthetic drug trafficking via darknet.", isAlert: true }
                                            ].concat([
                                                { title: "Training program on darknet investigation concludes at NCB Academy.", isAlert: false },
                                                { title: "MOU signed with Coast Guard for enhanced maritime surveillance.", isAlert: false },
                                                { title: "Warning regarding new psychoactive substances detected in market.", isAlert: true },
                                                { title: "Reporting of suspicious activities across various states.", isAlert: false },
                                                { title: "Financial Assistance for Drug Law Enforcement Mechanism 2025.", isAlert: false },
                                                { title: "Major achievements of NCB for the month of February, 2025.", isAlert: false },
                                                { title: "Advisory: Stay safe from online medicine fraud and illegal pharmacies.", isAlert: true },
                                                { title: "Director General chairs high-level review meeting on border security.", isAlert: false },
                                                { title: "New recruitment notice for Intelligence Officers released.", isAlert: false },
                                                { title: "NCB Academy announces advanced course on digital forensics.", isAlert: false },
                                                { title: "Special operation 'Clean Sweep' results in major drug bust.", isAlert: false },
                                                { title: "Public alert: Rise in synthetic drug trafficking via darknet.", isAlert: true }
                                            ]).map((item, i) => (
                                                <li key={i}>
                                                    <div className="list-item-with-dot">
                                                        {item.isAlert ? <span className="red-dot-indicator"></span> : <span className="blue-dot-placeholder"></span>}
                                                        <span>{item.title}</span>
                                                    </div>
                                                    <i className="bi bi-chevron-right"></i>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="offerings-footer">
                                    <button className="meity-view-more-btn">VIEW MORE <i className="bi bi-chevron-right"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Social Media Section */}
            <section className="social-media-section">
                <div className="container">
                    <div className="perfect-section-header">
                        <span className="live-pulse-dot"></span>
                        <h2 className="gateway-title">Social <span>Media</span></h2>
                        <div className="social-nav-controls">
                            <button className="social-nav-btn prev" onClick={handleSocialPrev} aria-label="Previous social card">
                                <i className="bi bi-chevron-left"></i>
                            </button>
                            <button className="social-nav-btn next" onClick={handleSocialNext} aria-label="Next social card">
                                <i className="bi bi-chevron-right"></i>
                            </button>
                        </div>
                    </div>

                    <div className="social-viewport">
                        <div className="social-grid" ref={socialScrollRef}>
                            {/* Column 1: X (Twitter) */}
                            <div className="social-card x-card">
                                <div className="social-card-header">
                                    <h3>X</h3>
                                </div>
                                <div className="social-card-body">
                                    <iframe
                                        className="social-iframe"
                                        src="https://syndication.twitter.com/srv/timeline-profile/screen-name/narcoticsbureau"
                                        title="X/Twitter Feed"
                                    ></iframe>
                                    <div className="embed-placeholder">
                                        <i className="bi bi-twitter-x"></i>
                                        <p>Follow @narcoticsbureau</p>
                                        <a href="https://x.com/narcoticsbureau" target="_blank" rel="noopener noreferrer" className="visit-social-btn">VIEW ON X</a>
                                    </div>
                                </div>
                            </div>

                            {/* Column 2: Youtube */}
                            <div className="social-card youtube-card">
                                <div className="social-card-header">
                                    <h3>Youtube</h3>
                                </div>
                                <div className="social-card-body">
                                    <iframe
                                        className="social-iframe"
                                        src="https://www.youtube.com/embed/7V-Xv_Y0E6o?si=_2z_L4e_o8e_o8e_"
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    ></iframe>
                                    <div className="embed-placeholder">
                                        <i className="bi bi-youtube"></i>
                                        <p>NCB Official Channel</p>
                                        <a href="https://www.youtube.com/channel/UCb3-9pF4m0BbLpW-yfR1Ipg" target="_blank" rel="noopener noreferrer" className="visit-social-btn">WATCH VIDEOS</a>
                                    </div>
                                </div>
                            </div>

                            {/* Column 3: Facebook */}
                            <div className="social-card facebook-card">
                                <div className="social-card-header">
                                    <h3>Facebook</h3>
                                </div>
                                <div className="social-card-body">
                                    <iframe
                                        className="social-iframe"
                                        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fnarcoticscontrolbureauindia&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=false&appId"
                                        title="Facebook Feed"
                                    ></iframe>
                                    <div className="embed-placeholder">
                                        <i className="bi bi-facebook"></i>
                                        <p>Connect on Facebook</p>
                                        <a href="https://www.facebook.com/narcoticscontrolbureauindia" target="_blank" rel="noopener noreferrer" className="visit-social-btn">VISIT PAGE</a>
                                    </div>
                                </div>
                            </div>

                            {/* Column 4: Instagram */}
                            <div className="social-card instagram-card">
                                <div className="social-card-header">
                                    <h3>Instagram</h3>
                                </div>
                                <div className="social-card-body instagram-mock-body">
                                    <div className="insta-profile-header">
                                        <div className="insta-avatar">
                                            <img src="/logo.svg" alt="NCB" />
                                        </div>
                                        <div className="insta-user-info">
                                            <div className="insta-username">india.ncb <i className="bi bi-patch-check-fill"></i></div>
                                            <div className="insta-followers">Social Awareness</div>
                                        </div>
                                        <a href="https://www.instagram.com/india.ncb" target="_blank" rel="noopener noreferrer" className="insta-view-profile-link">View profile</a>
                                    </div>
                                    <div className="insta-post-preview">
                                        <img src="https://images.unsplash.com/photo-1541873676947-9dc60f748d90?q=80&w=1000&auto=format&fit=crop" alt="NCB Activity" />
                                        <div className="insta-type-icon"><i className="bi bi-display"></i></div>
                                    </div>
                                    <div className="insta-card-footer">
                                        <p><strong>india.ncb</strong> Mission Spandan: Spreading awareness against drug abuse across schools... <span className="more-link">more</span></p>
                                        <a href="https://www.instagram.com/india.ncb" target="_blank" rel="noopener noreferrer" className="insta-action-btn">VIEW ON INSTAGRAM</a>
                                    </div>
                                    <div className="embed-placeholder">
                                        <i className="bi bi-instagram"></i>
                                        <p>Official Instagram Feed</p>
                                        <a href="https://www.instagram.com/india.ncb" target="_blank" rel="noopener noreferrer" className="visit-social-btn">VIEW PROFILE</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* Photo Gallery Carousel Section */}
            <section className="photo-gallery-carousel-section">
                <div className="container">
                    <div className="perfect-section-header">
                        <span className="live-pulse-dot"></span>
                        <h2 className="gateway-title">Media <span>Gallery</span></h2>
                        <div className="gallery-controls">
                            <button className="gallery-nav-btn prev" onClick={prevGallery} aria-label="Previous image"><i className="bi bi-chevron-left"></i></button>
                            <button className="gallery-stop-btn" onClick={() => setIsGalleryPlaying(!isGalleryPlaying)} aria-label={isGalleryPlaying ? "Pause Gallery" : "Play Gallery"}>
                                {isGalleryPlaying ? <i className="bi bi-pause-fill"></i> : <i className="bi bi-play-fill"></i>}
                            </button>
                            <button className="gallery-nav-btn next" onClick={nextGallery} aria-label="Next image"><i className="bi bi-chevron-right"></i></button>
                        </div>
                    </div>

                    <div className="gallery-slider-viewport">
                        <div className="gallery-slider-track"
                            style={{ transform: `translateX(-${galleryIndex * (100 / (window.innerWidth > 992 ? 4 : 2))}%)` }}>
                            {galleryImages.concat(galleryImages.slice(0, 5)).map((img, i) => (
                                <div key={i} className="gallery-slide-item">
                                    <div className="gallery-img-wrapper">
                                        <img src={img} alt={`Gallery ${i + 1}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>







            {/* Important Portals Slider - Matching Screenshot */}
            <section className="portals-slider-section">
                <div className="container">
                    <div className="perfect-section-header">
                        <span className="live-pulse-dot"></span>
                        <h2 className="gateway-title">Important <span>Websites</span></h2>
                        <div className="gallery-controls">
                             <button 
                                className="gallery-stop-btn"
                                onClick={() => setIsPortalsPlaying(!isPortalsPlaying)}
                                aria-label={isPortalsPlaying ? "Pause Portals Slider" : "Play Portals Slider"}
                            >
                                {isPortalsPlaying ? <i className="bi bi-pause-fill"></i> : <i className="bi bi-play-fill"></i>}
                            </button>
                        </div>
                    </div>

                    <div className="portals-viewport"
                        ref={portalsScrollRef}
                        onMouseEnter={() => setIsPortalsHovered(true)}
                        onMouseLeave={() => {
                            setIsPortalsHovered(false);
                            stopPortalsDragging();
                        }}
                        onMouseDown={handlePortalsMouseDown}
                        onMouseMove={handlePortalsMouseMove}
                        onMouseUp={stopPortalsDragging}
                        onTouchStart={(e) => {
                            setIsPortalsDragging(true);
                            setPortalsStartX(e.touches[0].pageX - portalsScrollRef.current.offsetLeft);
                            setPortalsScrollLeft(portalsScrollRef.current.scrollLeft);
                        }}
                        onTouchMove={(e) => {
                            if (!isPortalsDragging) return;
                            const x = e.touches[0].pageX - portalsScrollRef.current.offsetLeft;
                            const walk = (x - portalsStartX) * 2;
                            portalsScrollRef.current.scrollLeft = portalsScrollLeft - walk;
                        }}
                        onTouchEnd={stopPortalsDragging}
                    >
                        <div className="portals-track">
                            {[
                                { name: "NIDAAN", url: "https://nidaan.ncb.gov.in/", logo: nidaanLogo },
                                { name: "MANAS", url: "https://www.narcoordindia.gov.in/", logo: manasLogo },
                                { name: "Swachh Bharat", url: "https://swachhbharatmission.gov.in/", logo: swachhLogo },
                                { name: "PMNRF", url: "https://pmnrf.gov.in/", logo: pmnrfLogo },
                                { name: "Data portal", url: "https://data.gov.in/", logo: dataGovLogo },
                                { name: "MyGov", url: "https://www.mygov.in/", logo: myGovLogo },
                                { name: "India.gov.in", url: "https://www.india.gov.in/", logo: indiaGovLogo },
                                { name: "G-20", url: "http://goidirectory.nic.in/", logo: goLogo },
                                { name: "IIG", url: "https://iig.gov.in/", logo: iigLogo },
                                { name: "NCB", url: "https://ncb.gov.in/", logo: ncbLogo }
                            ].concat([
                                { name: "NIDAAN", url: "https://nidaan.ncb.gov.in/", logo: nidaanLogo },
                                { name: "MANAS", url: "https://www.narcoordindia.gov.in/", logo: manasLogo },
                                { name: "Swachh Bharat", url: "https://swachhbharatmission.gov.in/", logo: swachhLogo },
                                { name: "PMNRF", url: "https://pmnrf.gov.in/", logo: pmnrfLogo },
                                { name: "Data portal", url: "https://data.gov.in/", logo: dataGovLogo },
                                { name: "MyGov", url: "https://www.mygov.in/", logo: myGovLogo },
                                { name: "India.gov.in", url: "https://www.india.gov.in/", logo: indiaGovLogo },
                                { name: "G-20", url: "http://goidirectory.nic.in/", logo: goLogo },
                                { name: "IIG", url: "https://iig.gov.in/", logo: iigLogo },
                                { name: "NCB", url: "https://ncb.gov.in/", logo: ncbLogo }
                            ]).map((portal, i) => (
                                <a
                                    href={portal.url}
                                    key={i}
                                    className="portal-logo-item"
                                    onClick={(e) => handleExternalLink(e, portal.url)}
                                    aria-label={`Visit ${portal.name} Website (Link opens in new tab)`}
                                >
                                    <div className="logo-white-bg">
                                        <img src={portal.logo} alt={portal.name} draggable="false" />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section >



        </div >
    );
}

export default Home;