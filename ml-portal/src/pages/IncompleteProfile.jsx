import { useState } from "react";
import { useNavigate } from "react-router-dom";

function IncompleteProfile() {
    const navigate = useNavigate();

    const [income, setIncome] = useState("180000");

    const brackets = [
        "Below ₹1,00,000",
        "₹1,00,000 - ₹2,00,000",
        "₹2,00,000 - ₹5,00,000",
        "Above ₹5,00,000"
    ];

    const schemes = [
        {
            number: "1.",
            title: "Maharashtra Shravanbal State Pension",
            amount: "₹1,500/month",
            text: "Requires verified annual income < ₹2,00,000",
            type: "income"
        },
        {
            number: "2.",
            title: "Sanjay Gandhi Niradhar Anudan Yojana",
            amount: "₹1,500/month",
            text: "Requires BPL or verified income declaration under limit",
            type: "income"
        },
        {
            number: "3.",
            title: "PM Krishi Sinchayee Yojana",
            amount: "Up to 55% Subsidy",
            text: "Drip Irrigation Subsidy (needs landholding and income verification)",
            type: "subsidy"
        },
        {
            number: "4.",
            title: "Rashtriya Vayoshri Yojana",
            amount: "Assistive Kit",
            text: "Physical assistive devices for senior citizens under income ceiling",
            type: "kit"
        },
        {
            number: "5.",
            title: "BPL Ration Card Food Subsidy",
            amount: "Grain Allowance",
            text: "Orange/Yellow card entitlement calibration based on annual sum",
            type: "grain"
        }
    ];

    function selectBracket(bracket) {
        if (bracket.includes("1,00,000 - 2,00,000")) {
            setIncome("180000");
        } else if (bracket.includes("Below")) {
            setIncome("80000");
        } else if (bracket.includes("2,00,000 - 5,00,000")) {
            setIncome("300000");
        } else {
            setIncome("600000");
        }
    }

    return (
        <div className="incomplete-profile-page">

            {/* SIDEBAR */}

            <aside className="dashboard-sidebar">

                <div className="sidebar-brand">
                    <div className="sidebar-logo">S</div>

                    <div>
                        <strong>Sahayak AI</strong>
                        <span>Citizen Welfare Portal</span>
                    </div>
                </div>

                <div className="portal-language">
                    <span>Portal Language:</span>
                    <button className="active">EN</button>
                    <button>हि</button>
                    <button>म</button>
                </div>

                <div className="sidebar-label">
                    CITIZEN OPERATIONS
                </div>

                <nav className="dashboard-nav">

                    <button
                        className="dashboard-nav-item"
                        onClick={() => navigate("/dashboard")}
                    >
                        ▦
                        <span>Overview Dashboard</span>
                    </button>

                    <button
                        className="dashboard-nav-item"
                        onClick={() => navigate("/ai-conversation")}
                    >
                        ▱
                        <span>AI Profile Conversation</span>
                    </button>

                    <button className="dashboard-nav-item active">
                        ◉
                        <span>Eligible Schemes</span>
                        <b>8</b>
                    </button>

                    <button
                        className="dashboard-nav-item"
                        onClick={() => navigate("/documents")}
                    >
                        ▧
                        <span>Document Vault</span>
                        <b>3/5 Ready</b>
                    </button>

                    <button
                        className="dashboard-nav-item"
                        onClick={() => navigate("/life-events")}
                    >
                        ◇
                        <span>Life Event Re-check</span>
                    </button>

                    <button
                        className="dashboard-nav-item"
                        onClick={() => navigate("/applications")}
                    >
                        ☷
                        <span>Application Checklist</span>
                    </button>

                </nav>

                <div className="sidebar-label account-label">
                    ACCOUNT & INTEGRITY
                </div>

                <nav className="dashboard-nav">

                    <button
                        className="dashboard-nav-item"
                        onClick={() => navigate("/my-schemes")}
                    >
                        ♙
                        <span>My Profile & Saved</span>
                    </button>

                    <button className="dashboard-nav-item">
                        ♧
                        <span>Settings & Privacy</span>
                    </button>

                </nav>

                <div className="sidebar-disclaimer">
                    <strong>ⓘ</strong>
                    <span>
                        Disbursements decided by
                        central/state ministries.
                    </span>
                </div>

            </aside>


            {/* MAIN */}

            <main className="incomplete-main">

                <header className="dashboard-topbar">

                    <div className="aadhaar-status">
                        <span className="green-dot"></span>

                        <strong>AADHAAR CONNECTED</strong>

                        <span>Citizen ID: **** 4912</span>
                    </div>

                    <div className="topbar-actions">

                        <span className="govt-badge">
                            ◉ Official Govt Facilitation Portal
                        </span>

                        <button className="notification-button">
                            ♧
                        </button>

                        <div className="citizen-mini">

                            <div>
                                <strong>Rahul Kumar</strong>
                                <span>Nashik, MH</span>
                            </div>

                            <div className="avatar">
                                RK
                            </div>

                        </div>

                    </div>

                </header>


                {/* HEADING */}

                <section className="incomplete-heading">

                    <div>

                        <div className="assessment-label">
                            SCHEMES ASSESSMENT
                            <span>
                                ● Status: Incomplete Profile
                                Verification
                            </span>
                        </div>

                        <h1>
                            We need a little more information
                            to check your eligibility
                        </h1>

                        <p>
                            Some schemes have strict statutory income
                            caps and landholding thresholds. Adding
                            this data unlocks 5 additional welfare
                            programs for your family.
                        </p>

                    </div>

                    <div className="evaluation-rate">

                        <span>EVALUATION RATE</span>

                        <strong>62%</strong>

                        <small>Computed</small>

                        <b>☷</b>

                    </div>

                </section>


                {/* CONTENT */}

                <section className="incomplete-grid">

                    {/* LEFT */}

                    <div className="incomplete-left">

                        <div className="missing-parameter-card">

                            <div className="missing-card-heading">

                                <div className="warning-icon">
                                    !
                                </div>

                                <div>
                                    <span>
                                        PRIORITY MISSING PARAMETER
                                    </span>

                                    <h2>
                                        Annual Family Income
                                    </h2>
                                </div>

                                <b>
                                    High Impact
                                </b>

                            </div>

                            <p className="scheme-warning">
                                Schemes like the Maharashtra Shravanbal
                                State Pension and Ayushman Bharat PM-JAY
                                have statutory ceiling thresholds
                                (e.g. income under ₹2,00,000/year).
                                Without this figure, we cannot confirm
                                whether you qualify.
                            </p>


                            <div className="income-input-card">

                                <div className="income-label-row">

                                    <label>
                                        Approximate Annual Household
                                        Income
                                        <small>
                                            from all sources
                                        </small>
                                    </label>

                                    <span>
                                        Statutory Ceiling Check
                                    </span>

                                </div>

                                <div className="income-input">

                                    <span>₹</span>

                                    <input
                                        type="number"
                                        value={income}
                                        onChange={(e) =>
                                            setIncome(e.target.value)
                                        }
                                    />

                                    <button>?</button>

                                </div>

                                <p className="income-note">
                                    ⓘ Include income from farming,
                                    pension, and daily wages. Used
                                    purely for scheme rule matching.
                                </p>


                                <div className="bracket-label">
                                    QUICK BRACKET SELECTOR
                                </div>

                                <div className="brackets">

                                    {brackets.map((bracket) => {

                                        const active =
                                            (bracket.includes(
                                                "1,00,000 - ₹2,00,000"
                                            ) ||
                                                bracket.includes(
                                                    "1,00,000 - 2,00,000"
                                                )) &&
                                            income === "180000";

                                        return (
                                            <button
                                                key={bracket}
                                                className={
                                                    active
                                                        ? "active"
                                                        : ""
                                                }
                                                onClick={() =>
                                                    selectBracket(
                                                        bracket
                                                    )
                                                }
                                            >
                                                {bracket}
                                            </button>
                                        );
                                    })}

                                </div>

                            </div>


                            <div className="save-income-row">

                                <button
                                    type="button"
                                    onClick={async () => {
                                        try {
                                            await profileService.updateProfile({ annualIncome: parseInt(income, 10) || 180000 });
                                        } catch (err) {
                                            console.error(err);
                                        }
                                        navigate("/scheme-report");
                                    }}
                                >
                                    ↻
                                    Save and recalculate eligibility
                                </button>

                                <button
                                    type="button"
                                    onClick={() => navigate("/schemes")}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        textAlign: "left",
                                        font: "inherit",
                                        color: "inherit",
                                        padding: 0
                                    }}
                                >
                                    Continue without saving
                                    <small style={{ display: "block", color: "#64748b" }}>
                                        some schemes remain locked
                                    </small>
                                </button>

                            </div>

                        </div>


                        <div className="income-help-card">

                            <div>?</div>

                            <section>

                                <h3>
                                    Unsure about your exact family
                                    income?
                                </h3>

                                <p>
                                    State rules typically evaluate gross
                                    family income from your Tehsildar-issued
                                    Income Certificate or Ration card tier
                                    (Orange/Yellow). Enter your best
                                    estimate now; you can verify it via
                                    DigiLocker anytime.
                                </p>

                                <button
                                    type="button"
                                    onClick={() => window.open("https://mahadbt.maharashtra.gov.in", "_blank")}
                                >
                                    View Maharashtra Income Guidelines ↗
                                </button>

                            </section>

                        </div>

                    </div>


                    {/* RIGHT */}

                    <aside className="eligibility-side">

                        <div className="verified-profile-card">

                            <div className="verified-heading">

                                <h2>
                                    ♧ Verified profile
                                    <br />
                                    snapshot
                                </h2>

                                <span>
                                    Citizen: Rahul K.
                                </span>

                            </div>


                            <div className="verified-row">
                                <span>✓</span>
                                <strong>
                                    Age: 65 Years (Senior Citizen)
                                </strong>
                                <b>Verified</b>
                            </div>

                            <div className="verified-row">
                                <span>✓</span>
                                <strong>
                                    State: Maharashtra
                                </strong>
                                <b>Verified</b>
                            </div>

                            <div className="verified-row">
                                <span>✓</span>
                                <strong>
                                    District: Nashik
                                </strong>
                                <b>Verified</b>
                            </div>

                            <div className="verified-row">
                                <span>✓</span>
                                <strong>
                                    Occupation: Small / Marginal Farmer
                                </strong>
                                <b>Verified</b>
                            </div>

                            <div className="verified-row action-needed">
                                <span>△</span>
                                <strong>
                                    Annual Family Income
                                </strong>
                                <b>Action Needed</b>
                            </div>

                            <div className="verified-row optional">
                                <span>□</span>
                                <strong>
                                    Land Record (7/12 Extract)
                                </strong>
                                <b>Optional</b>
                            </div>

                        </div>


                        <div className="waiting-schemes-card">

                            <div className="waiting-heading">

                                <h2>
                                    🔐 5 Schemes awaiting this
                                    information
                                </h2>

                                <span>Pending</span>

                            </div>


                            {schemes.map((scheme) => (

                                <div
                                    className="waiting-scheme"
                                    key={scheme.number}
                                >

                                    <div className="waiting-title">

                                        <strong>
                                            {scheme.number}{" "}
                                            {scheme.title}
                                        </strong>

                                        <span className={scheme.type}>
                                            {scheme.amount}
                                        </span>

                                    </div>

                                    <p>
                                        {scheme.text}
                                    </p>

                                </div>

                            ))}


                            <div className="auto-evaluation-note">
                                ⚡ These schemes will be automatically
                                re-evaluated the moment you provide the
                                required range.
                            </div>

                        </div>

                    </aside>

                </section>


                {/* PRIVACY */}

                <footer className="data-integrity-footer">

                    <div className="integrity-icon">
                        ◉
                    </div>

                    <div>

                        <strong>
                            Data Integrity Guarantee
                        </strong>

                        <p>
                            Sahayak stores your details only in your
                            secure local session or linked DigiLocker
                            profile. We never share raw financial data
                            with third-party advertisers or commercial
                            entities. Statutory data matching complies
                            strictly with the Digital Personal Data
                            Protection (DPDP) Act.
                        </p>

                    </div>

                    <span>
                        DPDP 2023 Compliant
                    </span>

                </footer>

            </main>

        </div>
    );
}

export default IncompleteProfile;