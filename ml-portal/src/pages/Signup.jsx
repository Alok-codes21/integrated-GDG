import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import authService from "../services/authService";

function Signup() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        mobile: "",
        password: "",
        confirmPassword: ""
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

        if (!form.name.trim()) {
            setError("Please enter your full name as recorded on official documents.");
            return;
        }

        const cleanMobile = form.mobile.replace(/\D/g, "");
        if (cleanMobile.length !== 10) {
            setError("Please enter a valid 10-digit Indian mobile number.");
            return;
        }

        if (form.password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match. Please verify.");
            return;
        }

        setLoading(true);
        try {
            await authService.register({
                name: form.name.trim(),
                mobile: cleanMobile,
                password: form.password
            });
            // Transition directly into profile setup
            navigate("/profile-setup");
        } catch {
            setError("Registration failed. Using offline prototype session.");
            setTimeout(() => navigate("/profile-setup"), 1000);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card auth-card-wide">
                <div className="auth-brand">
                    <div className="brand-symbol">S</div>
                    <div>
                        <strong>Sahayak AI</strong>
                        <span>Citizen Welfare Portal</span>
                    </div>
                </div>

                <div className="auth-heading">
                    <span className="small-label">NEW CITIZEN ONBOARDING</span>
                    <h1>Create your account.</h1>
                    <p>
                        Set up your citizen account to securely save your
                        profile, documents and welfare matches.
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
                        <label>Full Name (as on Aadhaar)</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="e.g. Rahul Kumar"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Mobile Number (for OTP & DBT updates)</label>
                        <input
                            type="tel"
                            name="mobile"
                            value={form.mobile}
                            onChange={handleChange}
                            placeholder="10-digit mobile number"
                            maxLength="13"
                            required
                        />
                    </div>

                    <div className="auth-two-column">
                        <div className="form-group">
                            <label>Create Password</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Min 6 characters"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                placeholder="Re-type password"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="primary-button full-width"
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Create account →"}
                    </button>
                </form>

                <p className="auth-bottom">
                    Already have an account?{" "}
                    <Link to="/login">Sign in</Link>
                </p>

                <div className="auth-security">
                    🔒 Protected under the Digital Personal Data Protection (DPDP) Act 2023.
                </div>
            </div>
        </div>
    );
}

export default Signup;