import { NavLink } from "react-router-dom";

import "../styles/Footer.scss";

function Footer() {
    return (
        <footer className="footer" id="main-footer">
            <div className="footer-top">
                <div className="container">
                    <div className="row g-lg-5 g-4 justify-content-between">
                        {/* Brand Section (Original + Accessibility + Helpline Requirement) */}
                        <div className="col-12 col-lg-3 d-flex justify-content-center mb-5 mb-lg-0">
                            <div className="footer-brand-center">
                                <img src="/logo.svg" alt="NCB Logo" className="footer-logo-main" />
                                <h2 className="footer-org-name">NARCOTICS CONTROL BUREAU</h2>
                                <p className="footer-motto text-uppercase fw-bold text-white-50 mb-2">Commitment to a Drug Free India.</p>

                                <div className="footer-interactive-group mt-4">
                                    <button className="footer-action-btn" aria-label="Open Accessibility Settings">
                                        <i className="bi bi-universal-access"></i>
                                        <span>Accessibility Settings</span>
                                    </button>

                                    {/* Drug Helpline - Focused & Anchored with Icon */}
                                    <div className="footer-helpline-simple mt-3">
                                        <span className="helpline-label text-white-50">Drug Helpline</span>
                                        <a href="tel:14446" className="helpline-link">
                                            <i className="bi bi-telephone-fill me-2"></i>14446
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About Column (Restored) */}
                        <div className="col-6 col-md-4 col-lg-2 mb-4 mb-lg-0">
                            <h4 className="footer-heading-gold">ABOUT NCB</h4>
                            <ul className="footer-links-list">
                                <li><NavLink to="/about">Profile</NavLink></li>
                                <li><NavLink to="/motto-mission-vision">Mission & Vision</NavLink></li>
                                <li><NavLink to="/organization">Organization Structure</NavLink></li>
                                <li><NavLink to="/ncb-history">NCB History</NavLink></li>
                                <li><NavLink to="/legislations">Legislations</NavLink></li>
                            </ul>
                        </div>

                        {/* Operations Column (Restored) */}
                        <div className="col-6 col-md-4 col-lg-2 mb-4 mb-lg-0">
                            <h4 className="footer-heading-gold">OPERATIONS</h4>
                            <ul className="footer-links-list">
                                <li><NavLink to="/policy-strategy">Policy Strategy</NavLink></li>
                                <li><NavLink to="/drugs-of-abuse">Drugs of Abuse</NavLink></li>
                                <li><NavLink to="/seizures">Important Seizures</NavLink></li>
                                <li><NavLink to="/training">Training</NavLink></li>
                                <li><NavLink to="/statistics">Statistics</NavLink></li>
                            </ul>
                        </div>

                        {/* Quick Links Column (Renamed from Resources + SCAM ALERT added) */}
                        <div className="col-6 col-md-4 col-lg-2 mb-4 mb-lg-0">
                            <h4 className="footer-heading-gold">QUICK LINKS</h4>
                            <ul className="footer-links-list">
                                <li><NavLink to="/rti" className="new-badge">RTI</NavLink></li>
                                <li><NavLink to="/tenders" className="new-badge">Tenders</NavLink></li>
                                <li><NavLink to="/legislations">Policies</NavLink></li>
                                <li><NavLink to="/feedback">Feedback</NavLink></li>
                                <li><NavLink to="/treaties">Treaties</NavLink></li>
                                <li><NavLink to="/e-pledge">E-PLEDGE</NavLink></li>
                                <li><NavLink to="/grievance">Grievance</NavLink></li>
                            </ul>
                        </div>

                        {/* Contact & Social (Clean Modern Layout) */}
                        <div className="col-12 col-md-12 col-lg-3">
                            <h4 className="footer-heading-gold">CONTACT US</h4>
                            <div className="footer-contact-list-clean">
                                <div className="contact-item-simple">
                                    <i className="bi bi-geo-alt"></i>
                                    <span>West Block No. 1, Wing No. 5, R.K. Puram, New Delhi - 110066</span>
                                </div>
                                <div className="contact-item-simple">
                                    <i className="bi bi-envelope"></i>
                                    <a href="mailto:info@ncb.gov.in">info@ncb.gov.in</a>
                                </div>
                            </div>

                            <div className="footer-social-modern mt-3">
                                <a href="https://instagram.com/india.ncb" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Visit NCB Instagram (External Link)"><i className="bi bi-instagram"></i></a>
                                <a href="https://facebook.com/narcoticscontrolbureauindia" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Visit NCB Facebook (External Link)"><i className="bi bi-facebook"></i></a>
                                <a href="https://youtube.com/channel/UCb3-9pF4m0BbLpW-yfR1Ipg" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Visit NCB Youtube Channel (External Link)"><i className="bi bi-youtube"></i></a>
                                <a href="https://x.com/narcoticsbureau" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Visit NCB X (Twitter) Profile (External Link)"><i className="bi bi-twitter-x"></i></a>
                            </div>

                            <div className="footer-action-buttons mt-4">
                                <NavLink to="/scam-alert" className="footer-btn scam-alert-btn">
                                    <i className="bi bi-exclamation-triangle-fill"></i> SCAM ALERT
                                </NavLink>

                                <a href="https://ncbmanas.gov.in/" target="_blank" rel="noopener noreferrer" className="footer-btn manas-btn">
                                    <i className="bi bi-send-check-fill"></i> SUBMIT TIP (MANAS)
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-policy-bar">
                <div className="container">
                    <ul className="policy-links">
                        <li><NavLink to="/accessibility-statement">Accessibility Statement</NavLink></li>
                        <li><NavLink to="/privacy-policy">Privacy Policy</NavLink></li>
                        <li><NavLink to="/hyperlink-policy">Hyperlink Policy</NavLink></li>
                        <li><NavLink to="/copyright-policy">Copyright Policy</NavLink></li>
                        <li><NavLink to="/disclaimer">Disclaimer</NavLink></li>
                        <li><NavLink to="/terms-conditions">Terms & Conditions</NavLink></li>
                        <li><NavLink to="/web-info-manager">Web Information Manager</NavLink></li>
                        <li><NavLink to="/content-review-policy">CRP</NavLink></li>
                        <li><NavLink to="/content-archival-policy">CAP</NavLink></li>
                        <li><NavLink to="/monitoring-plan">Website Monitoring Plan</NavLink></li>
                        <li><NavLink to="/contingency-plan">CMP</NavLink></li>
                        <li><NavLink to="/security-policy">Security Policy</NavLink></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom-bar">
                <div className="container footer-bottom-flex">
                    <div className="bottom-left-info">
                        <p>© 2026 Designed & Maintained by <strong>Narcotics Control Bureau</strong></p>
                        <p>Ministry of Home Affairs, Govt. of India</p>
                    </div>

                    <div className="bottom-right-stats">
                        <div className="stat-item">
                            <span>Total Visitors: <strong>1,24,65,879</strong></span>
                        </div>
                        <div className="stat-sep">|</div>
                        <div className="stat-item">
                            <span>Last Updated Date: <strong>31 March, 2026</strong></span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;