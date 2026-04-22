import { useState, useEffect, useCallback } from "react";
import PageBanner from "../components/PageBanner";
import "../styles/Grievance.scss";

const CATEGORIES = [
    "RTI Related",
    "Service Related",
    "Infrastructure",
    "Staff Behaviour",
    "Corruption / Misconduct",
    "Delay in Action",
    "Other",
];

function Grievance() {
    const [form, setForm] = useState({
        name: "",
        mobile: "",
        email: "",
        address: "",
        pincode: "",
        category: "",
        subject: "",
        grievanceText: "",
        attachment: null,
        captchaInput: "",
    });
    const [captchaCode, setCaptchaCode] = useState("");
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [fileName, setFileName] = useState("No file chosen");

    const generateCaptcha = useCallback(() => {
        const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let code = "";
        for (let i = 0; i < 6; i++) {
            code += chars[Math.floor(Math.random() * chars.length)];
        }
        setCaptchaCode(code);
    }, []);

    useEffect(() => {
        generateCaptcha();
    }, [generateCaptcha]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleMobileChange = (e) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 10);
        setForm((prev) => ({ ...prev, mobile: value }));
        if (errors.mobile) setErrors((prev) => ({ ...prev, mobile: "" }));
    };

    const handlePincodeChange = (e) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 6);
        setForm((prev) => ({ ...prev, pincode: value }));
        if (errors.pincode) setErrors((prev) => ({ ...prev, pincode: "" }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm((prev) => ({ ...prev, attachment: file }));
            setFileName(file.name);
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = "Full name is required.";
        if (!/^\d{10}$/.test(form.mobile)) newErrors.mobile = "Enter a valid 10-digit mobile number.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Enter a valid email address.";
        if (!form.address.trim()) newErrors.address = "Address is required.";
        if (!/^\d{6}$/.test(form.pincode)) newErrors.pincode = "Enter a valid 6-digit pincode.";
        if (!form.category) newErrors.category = "Please select a category.";
        if (!form.subject.trim()) newErrors.subject = "Grievance subject is required.";
        if (form.grievanceText.trim().length < 20) newErrors.grievanceText = "Please describe the issue in at least 20 characters.";
        if (form.captchaInput !== captchaCode) {
            newErrors.captchaInput = "Incorrect CAPTCHA. Please try again.";
            generateCaptcha();
            setForm((prev) => ({ ...prev, captchaInput: "" }));
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setSubmitted(true);
        }, 1800);
    };

    const handleReset = () => {
        setForm({
            name: "", mobile: "", email: "", address: "", pincode: "",
            category: "", subject: "", grievanceText: "", attachment: null, captchaInput: "",
        });
        setFileName("No file chosen");
        setErrors({});
        setSubmitted(false);
        generateCaptcha();
    };

    return (
        <div className="grievance-page">
            <PageBanner
                title="Public"
                highlightWord="Grievance"
                subtitle="Submit your grievance and we will respond within the stipulated time"
                breadcrumbLabel="Grievance"
            />

            <section className="grievance-section">
                <div className="container">

                    {/* Info strip */}
                    <div className="grievance-info-strip">
                        <div className="info-item">
                            <i className="bi bi-clock-history"></i>
                            <span>Response within <strong>30 days</strong></span>
                        </div>
                        <div className="info-item">
                            <i className="bi bi-shield-check"></i>
                            <span>Confidential &amp; Secure</span>
                        </div>
                        <div className="info-item">
                            <i className="bi bi-envelope-check"></i>
                            <span>Acknowledgement via Email</span>
                        </div>
                        <div className="info-item">
                            <i className="bi bi-headset"></i>
                            <span>Helpline: <strong>1800-180-9999</strong></span>
                        </div>
                    </div>

                    {submitted ? (
                        <div className="grievance-success animate-fade-in">
                            <div className="success-icon">
                                <i className="bi bi-check-circle-fill"></i>
                            </div>
                            <h3>Grievance Submitted Successfully</h3>
                            <p>
                                Your grievance has been registered. You will receive a confirmation and
                                tracking number at your registered email address shortly.
                            </p>
                            <div className="ref-box">
                                <span>Reference No.</span>
                                <strong>NCB/GRV/{new Date().getFullYear()}/{Math.floor(100000 + Math.random() * 900000)}</strong>
                            </div>
                            <button className="grievance-btn mt-4" onClick={handleReset}>
                                <i className="bi bi-plus-circle me-2"></i>Submit Another Grievance
                            </button>
                        </div>
                    ) : (
                        <div className="grievance-card">
                            <div className="grievance-card-header">
                                <i className="bi bi-megaphone-fill"></i>
                                <div>
                                    <h4>Grievance Submission Form</h4>
                                    <p>Fields marked with <span className="req-star">*</span> are mandatory.</p>
                                </div>
                            </div>

                            <form className="grievance-form" onSubmit={handleSubmit} noValidate>
                                <div className="row g-4">
                                    {/* ── LEFT COLUMN ── */}
                                    <div className="col-lg-6">
                                        {/* Name */}
                                        <div className="gf-group">
                                            <label htmlFor="gf-name">
                                                Name <span className="req-star">*</span>
                                            </label>
                                            <div className={`gf-input-wrap ${errors.name ? "has-error" : ""}`}>
                                                <i className="bi bi-person gf-icon"></i>
                                                <input
                                                    id="gf-name"
                                                    type="text"
                                                    name="name"
                                                    value={form.name}
                                                    onChange={handleChange}
                                                    placeholder="Enter your full name."
                                                />
                                            </div>
                                            {errors.name && <span className="gf-error">{errors.name}</span>}
                                        </div>

                                        {/* Mobile */}
                                        <div className="gf-group">
                                            <label htmlFor="gf-mobile">
                                                Mobile <span className="req-star">*</span>
                                            </label>
                                            <div className={`gf-input-wrap ${errors.mobile ? "has-error" : ""}`}>
                                                <i className="bi bi-phone gf-icon"></i>
                                                <input
                                                    id="gf-mobile"
                                                    type="text"
                                                    name="mobile"
                                                    value={form.mobile}
                                                    onChange={handleMobileChange}
                                                    placeholder="Enter a 10-digit mobile number (digits only)."
                                                    maxLength={10}
                                                />
                                            </div>
                                            {errors.mobile && <span className="gf-error">{errors.mobile}</span>}
                                        </div>

                                        {/* Email */}
                                        <div className="gf-group">
                                            <label htmlFor="gf-email">
                                                Email <span className="req-star">*</span>
                                            </label>
                                            <div className={`gf-input-wrap ${errors.email ? "has-error" : ""}`}>
                                                <i className="bi bi-envelope gf-icon"></i>
                                                <input
                                                    id="gf-email"
                                                    type="email"
                                                    name="email"
                                                    value={form.email}
                                                    onChange={handleChange}
                                                    placeholder="Enter your email address for follow-up."
                                                />
                                            </div>
                                            {errors.email && <span className="gf-error">{errors.email}</span>}
                                        </div>

                                        {/* Address */}
                                        <div className="gf-group">
                                            <label htmlFor="gf-address">
                                                Address <span className="req-star">*</span>
                                            </label>
                                            <div className={`gf-input-wrap ${errors.address ? "has-error" : ""}`}>
                                                <i className="bi bi-geo-alt gf-icon"></i>
                                                <input
                                                    id="gf-address"
                                                    type="text"
                                                    name="address"
                                                    value={form.address}
                                                    onChange={handleChange}
                                                    placeholder="Enter your complete address (house/street, city, state)."
                                                />
                                            </div>
                                            {errors.address && <span className="gf-error">{errors.address}</span>}
                                        </div>

                                        {/* Pincode */}
                                        <div className="gf-group">
                                            <label htmlFor="gf-pincode">
                                                Pincode <span className="req-star">*</span>
                                            </label>
                                            <div className={`gf-input-wrap ${errors.pincode ? "has-error" : ""}`}>
                                                <i className="bi bi-pin-map gf-icon"></i>
                                                <input
                                                    id="gf-pincode"
                                                    type="text"
                                                    name="pincode"
                                                    value={form.pincode}
                                                    onChange={handlePincodeChange}
                                                    placeholder="Enter your 6-digit pincode (digits only)."
                                                    maxLength={6}
                                                />
                                            </div>
                                            {errors.pincode && <span className="gf-error">{errors.pincode}</span>}
                                        </div>
                                    </div>

                                    {/* ── RIGHT COLUMN ── */}
                                    <div className="col-lg-6">
                                        {/* Category */}
                                        <div className="gf-group">
                                            <label htmlFor="gf-category">
                                                Select Category <span className="req-star">*</span>
                                            </label>
                                            <div className={`gf-input-wrap gf-select-wrap ${errors.category ? "has-error" : ""}`}>
                                                <i className="bi bi-tag gf-icon"></i>
                                                <select
                                                    id="gf-category"
                                                    name="category"
                                                    value={form.category}
                                                    onChange={handleChange}
                                                    className="gf-select"
                                                >
                                                    <option value="">-- Select a category --</option>
                                                    {CATEGORIES.map((cat) => (
                                                        <option key={cat} value={cat}>{cat}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            {errors.category && <span className="gf-error">{errors.category}</span>}
                                        </div>

                                        {/* Subject */}
                                        <div className="gf-group">
                                            <label htmlFor="gf-subject">
                                                Grievance Subject <span className="req-star">*</span>
                                            </label>
                                            <div className={`gf-input-wrap ${errors.subject ? "has-error" : ""}`}>
                                                <i className="bi bi-pencil gf-icon"></i>
                                                <input
                                                    id="gf-subject"
                                                    type="text"
                                                    name="subject"
                                                    value={form.subject}
                                                    onChange={handleChange}
                                                    placeholder="Enter a short subject for your grievance."
                                                />
                                            </div>
                                            {errors.subject && <span className="gf-error">{errors.subject}</span>}
                                        </div>

                                        {/* Grievance Text */}
                                        <div className="gf-group">
                                            <label htmlFor="gf-text">
                                                Grievance Text <span className="req-star">*</span>
                                            </label>
                                            <div className={`gf-input-wrap gf-textarea-wrap ${errors.grievanceText ? "has-error" : ""}`}>
                                                <textarea
                                                    id="gf-text"
                                                    name="grievanceText"
                                                    rows={5}
                                                    value={form.grievanceText}
                                                    onChange={handleChange}
                                                    placeholder="Describe the issue clearly (what happened and where)."
                                                />
                                            </div>
                                            {errors.grievanceText && <span className="gf-error">{errors.grievanceText}</span>}
                                        </div>

                                        {/* Attachment */}
                                        <div className="gf-group">
                                            <label>Upload Attachment <span className="gf-optional">(optional)</span></label>
                                            <div className="gf-file-wrap">
                                                <label htmlFor="gf-file" className="gf-file-btn">
                                                    <i className="bi bi-paperclip me-1"></i> Choose file
                                                </label>
                                                <input
                                                    id="gf-file"
                                                    type="file"
                                                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                                    onChange={handleFileChange}
                                                    className="gf-file-hidden"
                                                />
                                                <span className="gf-file-name">{fileName}</span>
                                            </div>
                                            <p className="gf-hint">Accepted: PDF, JPG, PNG, DOC (max 5 MB)</p>
                                        </div>

                                        {/* Captcha */}
                                        <div className="gf-group">
                                            <label>
                                                Enter Captcha <span className="req-star">*</span>
                                            </label>
                                            <div className={`gf-captcha-row ${errors.captchaInput ? "has-error" : ""}`}>
                                                <div className="gf-captcha-display">
                                                    {captchaCode}
                                                    <div className="gf-captcha-overlay"></div>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="gf-captcha-refresh"
                                                    onClick={generateCaptcha}
                                                    title="Refresh CAPTCHA"
                                                >
                                                    <i className="bi bi-arrow-clockwise"></i>
                                                </button>
                                                <div className="gf-input-wrap flex-grow-1 m-0">
                                                    <input
                                                        type="text"
                                                        name="captchaInput"
                                                        value={form.captchaInput}
                                                        onChange={handleChange}
                                                        placeholder="Type character"
                                                    />
                                                </div>
                                            </div>
                                            {errors.captchaInput && <span className="gf-error">{errors.captchaInput}</span>}
                                        </div>
                                    </div>
                                </div>

                                {/* Submit row */}
                                <div className="grievance-form-footer">
                                    <p className="gf-notice">
                                        <i className="bi bi-info-circle me-1"></i>
                                        By submitting, you confirm that the information provided is accurate to the best of your knowledge.
                                    </p>
                                    <button type="submit" className="grievance-btn" disabled={isLoading}>
                                        {isLoading ? (
                                            <><span className="spinner-border spinner-border-sm me-2"></span>Submitting...</>
                                        ) : (
                                            <><i className="bi bi-send me-2"></i>Submit Form</>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Grievance;
