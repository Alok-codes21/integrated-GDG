import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profileService from "../services/profileService";

function ProfileSetup() {

    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        age: "65",
        occupation: "Farmer / Cultivator",
        state: "Maharashtra",
        district: "Nashik",
        income: "1.5L - 2.5L",
        seniorCitizen: true,
        farmer: true,
        bpl: false,
        disability: false,
        widow: false
    });

    useEffect(() => {
        async function loadProfile() {
            try {
                const data = await profileService.getProfile();
                if (data) {
                    setProfile((prev) => ({
                        ...prev,
                        age: data.age?.toString() || prev.age,
                        occupation: data.occupation || prev.occupation,
                        state: data.state || prev.state,
                        district: data.district?.replace(" (Rural)", "") || prev.district,
                        income: data.incomeBracket || prev.income,
                        seniorCitizen: data.socialConditions?.seniorCitizen ?? prev.seniorCitizen,
                        farmer: data.socialConditions?.farmer ?? prev.farmer,
                        bpl: data.socialConditions?.bplAayHolder ?? prev.bpl,
                        disability: data.socialConditions?.disability ?? prev.disability,
                        widow: data.socialConditions?.widowSingleParent ?? prev.widow
                    }));
                }
            } catch (err) {
                console.error("Error loading profile:", err);
            }
        }
        loadProfile();
    }, []);

    function updateField(field, value) {
        setProfile((prev) => ({
            ...prev,
            [field]: value
        }));
    }

    function toggleField(field) {
        setProfile((prev) => ({
            ...prev,
            [field]: !prev[field]
        }));
    }

    async function handleContinue() {
        try {
            await profileService.saveProfile({
                age: parseInt(profile.age, 10) || 65,
                occupation: profile.occupation,
                state: profile.state,
                district: profile.district,
                incomeBracket: profile.income,
                socialConditions: {
                    seniorCitizen: profile.seniorCitizen,
                    farmer: profile.farmer,
                    bplAayHolder: profile.bpl,
                    disability: profile.disability,
                    widowSingleParent: profile.widow
                }
            });
        } catch (err) {
            console.error("Failed to save profile:", err);
        }
        navigate("/dashboard");
    }

    return (
        <div className="profile-setup-page">

            {/* TOP BAR */}

            <header className="setup-header">

                <div className="setup-title">

                    <div className="setup-icon">
                        S
                    </div>

                    <div>
                        <span>
                            CITIZEN ENTITLEMENT ENGINE
                            <b> • Step 1 of 4</b>
                        </span>

                        <strong>
                            Basic Profile & Household
                        </strong>
                    </div>

                </div>

                <div className="setup-progress">

                    <span className="active"></span>
                    <span></span>
                    <span></span>
                    <span></span>

                </div>

            </header>


            {/* MAIN */}

            <main className="setup-content">

                <div className="setup-main-column">

                    <div className="public-badge">
                        ◉ Public Access Protocol
                    </div>

                    <h1>
                        Tell us a little about yourself.
                    </h1>

                    <p className="setup-description">
                        Share your background in your own words,
                        or answer a few structured questions below
                        to verify eligibility.
                    </p>


                    {/* AI INPUT */}

                    <section className="setup-card ai-input-card">

                        <div className="card-heading-row">

                            <h3>
                                ♧ I'd rather tell you
                            </h3>

                            <span className="ai-label">
                                AI Guided
                            </span>

                        </div>

                        <div className="voice-input">

                            <p>
                                Example: I'm 65, live in Maharashtra
                                and work as a farmer with 3 acres
                                of rainfed land.
                            </p>

                            <button
                                type="button"
                                className="mic-button"
                                onClick={() => navigate("/ai-conversation")}
                                title="Click to use AI Voice Assistant"
                            >
                                🎙
                            </button>

                        </div>

                        <div className="input-footer">

                            <div className="language-options">

                                <span>Typing in:</span>

                                <button className="language-active">
                                    English
                                </button>

                                <button onClick={() => navigate("/ai-conversation")}>
                                    हिन्दी में बोलें
                                </button>

                                <button onClick={() => navigate("/ai-conversation")}>
                                    मराठी मध्ये
                                </button>

                            </div>

                            <button
                                type="button"
                                className="voice-button"
                                onClick={() => navigate("/ai-conversation")}
                            >
                                Continue with Voice / Text
                                <span>→</span>
                            </button>

                        </div>

                    </section>


                    <div className="or-divider">
                        <span>OR — ANSWER A FEW QUESTIONS</span>
                    </div>


                    {/* CIVIC DETAILS */}

                    <section className="setup-card">

                        <h3 className="card-main-title">
                            ▣ Civic Identity Verification Details
                        </h3>

                        <div className="form-grid">

                            <div className="setup-field">
                                <label>Age of Beneficiary</label>

                                <div className="input-with-suffix">
                                    <input
                                        value={profile.age}
                                        onChange={(e) =>
                                            updateField("age", e.target.value)
                                        }
                                    />

                                    <span>years</span>
                                </div>

                                <small>
                                    Used to evaluate senior and pension
                                    entitlements
                                </small>
                            </div>


                            <div className="setup-field">
                                <label>Occupation / Livelihood</label>

                                <input
                                    value={profile.occupation}
                                    onChange={(e) =>
                                        updateField(
                                            "occupation",
                                            e.target.value
                                        )
                                    }
                                />

                                <small>
                                    Affects central agri-subsidy schemes
                                </small>
                            </div>


                            <div className="setup-field">
                                <label>State of Residence</label>

                                <input
                                    value={profile.state}
                                    onChange={(e) =>
                                        updateField(
                                            "state",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>


                            <div className="setup-field">
                                <label>District</label>

                                <input
                                    value={profile.district}
                                    onChange={(e) =>
                                        updateField(
                                            "district",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                        </div>


                        {/* INCOME */}

                        <div className="income-section">

                            <div className="income-title">

                                <label>
                                    Annual Household Income Range
                                </label>

                                <span>
                                    ₹1,50,000 - ₹2,50,000
                                </span>

                            </div>

                            <div className="income-options">

                                <button
                                    className={
                                        profile.income === "Below 1L"
                                            ? "selected"
                                            : ""
                                    }
                                    onClick={() =>
                                        updateField(
                                            "income",
                                            "Below 1L"
                                        )
                                    }
                                >
                                    Below ₹1 Lakh
                                </button>

                                <button
                                    className={
                                        profile.income === "1.5L - 2.5L"
                                            ? "selected"
                                            : ""
                                    }
                                    onClick={() =>
                                        updateField(
                                            "income",
                                            "1.5L - 2.5L"
                                        )
                                    }
                                >
                                    ₹1.5L - ₹2.5L
                                </button>

                                <button
                                    className={
                                        profile.income === "2.5L - 5L"
                                            ? "selected"
                                            : ""
                                    }
                                    onClick={() =>
                                        updateField(
                                            "income",
                                            "2.5L - 5L"
                                        )
                                    }
                                >
                                    ₹2.5L - ₹5 Lakh
                                </button>

                                <button
                                    className={
                                        profile.income === "Above 5L"
                                            ? "selected"
                                            : ""
                                    }
                                    onClick={() =>
                                        updateField(
                                            "income",
                                            "Above 5L"
                                        )
                                    }
                                >
                                    Above ₹5 Lakh
                                </button>

                            </div>

                        </div>


                        {/* CATEGORIES */}

                        <div className="category-section">

                            <label>
                                Select applicable citizen categories
                                & household conditions:
                            </label>

                            <div className="category-options">

                                <button
                                    className={
                                        profile.seniorCitizen
                                            ? "category-selected"
                                            : ""
                                    }
                                    onClick={() =>
                                        toggleField("seniorCitizen")
                                    }
                                >
                                    <span>
                                        {profile.seniorCitizen
                                            ? "☑"
                                            : "□"}
                                    </span>

                                    Senior Citizen (60+)
                                </button>


                                <button
                                    className={
                                        profile.bpl
                                            ? "category-selected"
                                            : ""
                                    }
                                    onClick={() =>
                                        toggleField("bpl")
                                    }
                                >
                                    <span>
                                        {profile.bpl
                                            ? "☑"
                                            : "□"}
                                    </span>

                                    BPL / AAY Card Holder
                                </button>


                                <button
                                    className={
                                        profile.farmer
                                            ? "category-selected"
                                            : ""
                                    }
                                    onClick={() =>
                                        toggleField("farmer")
                                    }
                                >
                                    <span>
                                        {profile.farmer
                                            ? "☑"
                                            : "□"}
                                    </span>

                                    Small / Marginal Farmer (&lt; 5 acres)
                                </button>


                                <button
                                    className={
                                        profile.disability
                                            ? "category-selected"
                                            : ""
                                    }
                                    onClick={() =>
                                        toggleField("disability")
                                    }
                                >
                                    <span>
                                        {profile.disability
                                            ? "☑"
                                            : "□"}
                                    </span>

                                    Person with Disability
                                    (Divyangjan)
                                </button>


                                <button
                                    className={
                                        profile.widow
                                            ? "category-selected"
                                            : ""
                                    }
                                    onClick={() =>
                                        toggleField("widow")
                                    }
                                >
                                    <span>
                                        {profile.widow
                                            ? "☑"
                                            : "□"}
                                    </span>

                                    Widow / Single Parent
                                </button>

                            </div>

                        </div>

                    </section>

                </div>


                {/* RIGHT PANEL */}

                <aside className="profile-status-panel">

                    <div className="status-heading">

                        <div>
                            <span>REAL-TIME EVALUATION</span>

                            <h3>
                                YOUR PROFILE
                                <br />
                                STATUS
                            </h3>
                        </div>

                        <span className="live-status">
                            ● Updating in real-time
                        </span>

                    </div>


                    <div className="status-list">

                        <div>
                            <span>♙ Age</span>
                            <strong>{profile.age || "65"} yrs ✓</strong>
                        </div>

                        <div>
                            <span>⌖ Location</span>
                            <strong>
                                {profile.district || "Nashik"}, {profile.state || "Maharashtra"} ✓
                            </strong>
                        </div>

                        <div>
                            <span>▣ Occupation</span>
                            <strong>
                                {profile.occupation || "Farmer (Marginal)"} ✓
                            </strong>
                        </div>

                        <div>
                            <span>▤ Income</span>
                            <strong>
                                {profile.income === "1.5L - 2.5L" ? "₹1,80,000 / year" : profile.income} ✓
                            </strong>
                        </div>

                        <div>
                            <span>♙ Household Size</span>
                            <strong>
                                4 members ✓
                            </strong>
                        </div>

                    </div>


                    <div className="eligibility-box">

                        <div className="eligibility-icon">
                            ✦
                        </div>

                        <div>
                            <span>
                                CALCULATED ELIGIBILITY
                            </span>

                            <strong>
                                Estimated 8 welfare schemes
                                match these criteria
                            </strong>

                            <p>
                                Including PM-KISAN, Sanjay Gandhi
                                Niradhar, and Ayushman Bharat PM-JAY.
                            </p>
                        </div>

                    </div>


                    <div className="compliance-box">

                        <strong>
                            ♢ Statutory Compliance Safeguard
                        </strong>

                        <p>
                            Citizen criteria are mapped directly
                            against official gazette categories of
                            Government of India and Maharashtra State
                            social departments.
                        </p>

                    </div>

                </aside>

            </main>


            {/* BOTTOM ACTION BAR */}

            <footer className="setup-footer">

                <div className="privacy-note">
                    🔒 We never sell your data or share it with
                    third parties. Encrypted civic vault.
                </div>

                <div className="footer-actions">

                    <button
                        className="back-button"
                        onClick={() => navigate("/login")}
                    >
                        ← Back
                    </button>

                    <button
                        className="save-button"
                        onClick={handleContinue}
                    >
                        Save & View Matches
                        <span>→</span>
                    </button>

                </div>

            </footer>

        </div>
    );
}

export default ProfileSetup;