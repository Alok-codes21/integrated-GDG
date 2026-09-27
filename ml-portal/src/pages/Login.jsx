import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import authService from "../services/authService";

function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        mobile: "9822449120",
        password: "••••••••"
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        if (error) setError("");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        // Mobile validation (10 digits)
        const cleanMobile = form.mobile.replace(/\D/g, "");
        if (cleanMobile.length !== 10) {
            setError("Please enter a valid 10-digit Indian mobile number.");
            return;
        }

        if (!form.password || form.password.length < 4) {
            setError("Please enter your account password (at least 4 characters).");
            return;
        }

        setLoading(true);
        try {
            await authService.login({ mobile: cleanMobile, password: form.password });
            // Seamless transition to Profile Setup or Dashboard
            navigate("/dashboard");
        } catch {
            setError("Unable to authenticate. Using offline prototype session.");
            setTimeout(() => navigate("/dashboard"), 1000);
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
                    <span className="small-label">CITIZEN ACCESS</span>
                    <h1>Welcome back.</h1>
                    <p>
                        Sign in to continue your welfare discovery,
                        eligibility and document journey.
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

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Registered Mobile Number</label>
                        <input
                            type="tel"
                            name="mobile"
                            value={form.mobile}
                            onChange={handleChange}
                            placeholder="Enter 10-digit mobile number"
                            maxLength="13"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <div className="label-row">
                            <label>Password</label>
                            <Link to="/forgot-password">
                                Forgot password?
                            </Link>
                        </div>

                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="primary-button full-width"
                        disabled={loading}
                    >
                        {loading ? "Verifying Credentials..." : "Sign in →"}
                    </button>
                </form>

                <div className="auth-divider">
                    <span>OR</span>
                </div>

                <button
                    type="button"
                    className="secondary-button full-width"
                    onClick={() => navigate("/profile-setup")}
                >
                    Continue without registration
                </button>

                <p className="auth-bottom">
                    New to Sahayak?{" "}
                    <Link to="/signup">Create an account</Link>
                </p>

                <div className="auth-security">
                    🔒 Your information is stored in an encrypted citizen vault.
                </div>
            </div>
        </div>
    );
}

export default Login;