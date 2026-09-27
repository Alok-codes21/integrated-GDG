import { Link } from "react-router-dom";
import { useState } from "react";
import authService from "../services/authService";

function ForgotPassword() {
    const [mobile, setMobile] = useState("");
    const [error, setError] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        const cleanMobile = mobile.replace(/\D/g, "");
        if (cleanMobile.length !== 10) {
            setError("Please enter a valid 10-digit mobile number.");
            return;
        }

        setLoading(true);
        try {
            await authService.forgotPassword(cleanMobile);
            setSent(true);
        } catch {
            setError("Unable to process request. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-brand">
                    <div className="brand-symbol">S</div>
                    <div>
                        <strong>Sahayak AI</strong>
                        <span>Citizen Welfare Portal</span>
                    </div>
                </div>

                <div className="auth-heading">
                    <span className="small-label">ACCOUNT RECOVERY</span>
                    <h1>Reset your password.</h1>
                    <p>
                        Enter your registered mobile number and
                        we'll help you recover your citizen account.
                    </p>
                </div>

                {error && (
                    <div className="auth-error-banner" style={{
                        background: "#fef2f2",
                        border: "1px solid #fecaca",
                        color: "#b91c1c",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        fontSize: "13px",
                        marginBottom: "16px"
                    }}>
                        ⚠ {error}
                    </div>
                )}

                {!sent ? (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Registered Mobile Number</label>
                            <input
                                type="tel"
                                value={mobile}
                                onChange={(e) => {
                                    setMobile(e.target.value);
                                    if (error) setError("");
                                }}
                                placeholder="Enter 10-digit mobile number"
                                maxLength="13"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="primary-button full-width"
                            disabled={loading}
                        >
                            {loading ? "Verifying Record..." : "Send recovery instructions →"}
                        </button>
                    </form>
                ) : (
                    <div className="success-box" style={{
                        background: "#f0fdf4",
                        border: "1px solid #bbf7d0",
                        padding: "20px",
                        borderRadius: "12px",
                        textAlign: "center",
                        marginBottom: "20px"
                    }}>
                        <div className="success-icon" style={{
                            fontSize: "24px",
                            color: "#16a34a",
                            marginBottom: "8px"
                        }}>✓</div>
                        <h3 style={{ color: "#166534", marginBottom: "6px" }}>Demo Instructions Generated</h3>
                        <p style={{ color: "#15803d", fontSize: "14px", lineHeight: "1.5" }}>
                            In a connected production environment, an SMS OTP will be dispatched to <strong>+91 {mobile}</strong>.
                            For this prototype evaluation, you may proceed to sign in directly.
                        </p>
                    </div>
                )}

                <p className="auth-bottom">
                    Remembered your password?{" "}
                    <Link to="/login">Back to sign in</Link>
                </p>

                <div className="auth-security">
                    🔒 Official civic facilitation gateway • Zero commercial data sharing.
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;