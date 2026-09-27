import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import schemeService from "../services/schemeService";
import documentService from "../services/documentService";

function Dashboard() {
    const navigate = useNavigate();
    const [language, setLanguage] = useState("EN");
    const [savedIds, setSavedIds] = useState(() => schemeService.getSavedSchemeIds());
    const [syncing, setSyncing] = useState(false);
    const [syncMessage, setSyncMessage] = useState("");
    const [smsReminderSet, setSmsReminderSet] = useState(false);
    const [docReadyCount, setDocReadyCount] = useState("3 of 5");

    useEffect(() => {
        async function checkDocs() {
            try {
                const docs = await documentService.getDocuments();
                const verified = docs.filter(d => d.status === "verified").length;
                setDocReadyCount(`${verified} of ${docs.length}`);
            } catch (err) {
                console.error(err);
            }
        }
        checkDocs();
    }, []);

    function handleToggleSave(schemeId) {
        const updated = schemeService.toggleSaveScheme(schemeId);
        setSavedIds(updated);
    }

    function handleResyncAadhaar() {
        setSyncing(true);
        setSyncMessage("Connecting to UIDAI Level-2 Auth Protocol...");
        setTimeout(() => {
            setSyncing(false);
            setSyncMessage("✓ Aadhaar data successfully re-synchronized with Maharashtra DBT Hub!");
            setTimeout(() => setSyncMessage(""), 4000);
        }, 1200);
    }

    const schemes = [
        {
            id: "shravanbal-yojana",
            department:
                "DEPARTMENT OF SOCIAL JUSTICE & SPECIAL ASSISTANCE, GOVT. OF MAHARASHTRA",
            name: "Senior Citizen Support & Subsidy Scheme",
            tags: ["Senior Citizens", "Financial Support", "Direct Treasury Transfer"],
            benefit:
                "₹1,500/month direct pension + assistive device allowance",
            extra: "Annual Cap: ₹18,000 + Devices",
            why:
                "Matches your age (65), Maharashtra residency, and verified family income threshold (< ₹2L per annum).",
            status: "Potential match",
            note: "Read official Gazette GR-402"
        },
        {
            id: "pm-kisan",
            department:
                "MINISTRY OF AGRICULTURE & FARMERS WELFARE, GOVT. OF INDIA",
            name: "PM-KISAN Samman Nidhi (Pradhan Mantri Kisan)",
            tags: ["Agriculture", "Direct Benefit Transfer", "Central Sector"],
            benefit:
                "₹6,00,0 per year in 3 equal installments via DBT",
            extra: "Installment 17 Ready",
            why:
                "Matches small/marginal farmer category and landholding profile (Survey 112/A, Nashik). Requires active Aadhaar-linked NPCI bank mapping.",
            status: "Potential match",
            note: "e-KYC Status: Verified"
        },
        {
            id: "rashtriya-vayoshri",
            department:
                "MINISTRY OF SOCIAL JUSTICE AND EMPOWERMENT",
            name: "Rashtriya Vayoshri Yojana (RVY)",
            tags: ["Healthcare", "Assistive Devices", "Camp Disbursement"],
            benefit:
                "Free physical aids and assisted-living devices for seniors",
            extra: "Includes Hearing & Walking Aids",
            why:
                "Age eligible (Senior Citizen 60+), family income under ₹2,00,000 threshold. Clinical triage required at district medical camp.",
            status: "Potential match",
            note: "Requires Tahsildar Income Cert"
        }
    ];

    return (
        <div className="dashboard-page">

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

                    <button
                        className={language === "EN" ? "active" : ""}
                        onClick={() => setLanguage("EN")}
                    >
                        EN
                    </button>

                    <button
                        className={language === "HI" ? "active" : ""}
                        onClick={() => setLanguage("HI")}
                    >
                        हि
                    </button>

                    <button
                        className={language === "MR" ? "active" : ""}
                        onClick={() => setLanguage("MR")}
                    >
                        म
                    </button>
                </div>

                <div className="sidebar-label">
                    CITIZEN OPERATIONS
                </div>

                <nav className="dashboard-nav">

                    <button className="dashboard-nav-item active">
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

                    <button
                        className="dashboard-nav-item"
                        onClick={() => navigate("/schemes")}
                    >
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
                        <span>My Schemes & Saved</span>
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

            <main className="dashboard-main">

                {/* TOP BAR */}

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


                {/* WELCOME */}

                <section className="dashboard-heading">

                    <div>

                        <span className="district-label">
                            ● CITIZEN WELFARE CONSOLE • DISTRICT:
                            NASHIK (RURAL)
                        </span>

                        <h1>
                            Good morning, Rahul.
                        </h1>

                        <p>
                            Here's what may need your attention today.
                            Last checked: 14 Oct 2026.
                        </p>

                    </div>

                    <div className="heading-buttons">

                        <button
                            type="button"
                            className="light-action"
                            onClick={() => window.print()}
                            title="Print official entitlement briefing"
                        >
                            ▣ Print Briefing Slip
                        </button>

                        <button
                            type="button"
                            className="dark-action"
                            onClick={handleResyncAadhaar}
                            disabled={syncing}
                        >
                            {syncing ? "⟳ Syncing UIDAI..." : "⟳ Re-sync Aadhaar Data"}
                        </button>

                    </div>

                </section>

                {syncMessage && (
                    <div style={{
                        background: "#f0fdf4",
                        border: "1px solid #86efac",
                        color: "#166534",
                        padding: "10px 16px",
                        borderRadius: "8px",
                        fontSize: "14px",
                        marginBottom: "16px",
                        fontWeight: "500"
                    }}>
                        {syncMessage}
                    </div>
                )}


                {/* OFFICIAL NOTICE */}

                <section className="verification-notice">

                    <div className="notice-icon">
                        ⓘ
                    </div>

                    <div className="notice-content">

                        <div>
                            <strong>
                                Official Verification Note
                            </strong>

                            <span>
                                Statutory Disclaimer
                            </span>
                        </div>

                        <p>
                            Sahayak AI provides automated advisory guidance
                            based purely on verified Gazette Notifications
                            and published Central & State guidelines.
                            All final benefit decisions and statutory
                            verifications are executed exclusively via
                            direct authorized government servers
                            (DBT Bharat, Maharashtra, and respective
                            district collectorates).
                        </p>

                    </div>

                    <div className="auth-protocol">
                        <span>AUTH PROTOCOL</span>
                        <strong>UIDAI Level-2 Active</strong>
                    </div>

                </section>


                {/* SUMMARY CARDS */}

                <section className="dashboard-summary">

                    <div className="summary-card">
                        <div className="summary-card-top">
                            <span>POTENTIAL MATCHES</span>
                            <b>◉</b>
                        </div>

                        <strong className="summary-number">8</strong>

                        <p>
                            <b>4</b> Central • <b>4</b> State
                            <br />
                            (Maharashtra)
                        </p>

                        <small>↑ 2 new schemes added this month</small>
                    </div>


                    <div className="summary-card">

                        <div className="summary-card-top">
                            <span>DOCUMENTS NEEDED</span>
                            <b className="orange-badge">
                                Action Needed
                            </b>
                        </div>

                        <strong className="summary-number orange-text">
                            2
                        </strong>

                        <p>
                            Income Certificate & Land
                            <br />
                            7/12 pending
                        </p>

                        <small>
                            Vault Readiness &nbsp; <b>{docReadyCount}</b> Verified
                        </small>

                    </div>


                    <div className="summary-card">

                        <div className="summary-card-top">
                            <span>ACTIONS PENDING</span>
                            <b>▣</b>
                        </div>

                        <strong className="summary-number">
                            1
                        </strong>

                        <p>
                            Application deadline: 30 Nov
                            <br />
                            2026
                        </p>

                        <small>
                            ◷ Senior Grant filing window open
                        </small>

                    </div>


                    <div className="summary-card">

                        <div className="summary-card-top">
                            <span>PROFILE COMPLETENESS</span>
                            <strong>80%</strong>
                        </div>

                        <div className="profile-progress">
                            <span></span>
                        </div>

                        <p>
                            Add land record details for +20%
                        </p>

                        <small>
                            ♧ Tap to complete remaining fields
                        </small>

                    </div>

                </section>


                {/* CONTENT GRID */}

                <section className="dashboard-content-grid">

                    {/* SCHEMES */}

                    <div className="scheme-column">

                        <div className="scheme-section-heading">

                            <div>
                                <h2>
                                    Potentially relevant for you
                                </h2>

                                <p>
                                    Recommended based on verified
                                    parameters: Senior Citizen,
                                    Resident MH, Landowner.
                                </p>
                            </div>

                            <button className="sort-button">
                                Sort:
                                <strong> Highest Impact</strong>
                            </button>

                        </div>


                        {schemes.map((scheme, index) => (

                            <article
                                className="dashboard-scheme-card"
                                key={index}
                            >

                                <div className="scheme-department">
                                    {scheme.department}
                                </div>

                                <div className="scheme-title-row">

                                    <h3>
                                        {scheme.name}
                                    </h3>

                                    <span className="potential-badge">
                                        ● Potential match
                                    </span>

                                </div>

                                <div className="scheme-tags">

                                    {scheme.tags.map((tag) => (
                                        <span key={tag}>
                                            {tag}
                                        </span>
                                    ))}

                                </div>

                                <div className="scheme-benefit">

                                    <strong>
                                        ▣ {scheme.benefit}
                                    </strong>

                                    <span>
                                        {scheme.extra}
                                    </span>

                                </div>

                                <div className="why-match">

                                    <strong>
                                        ♧ Why it matches:
                                    </strong>

                                    <span>
                                        {scheme.why}
                                    </span>

                                </div>

                                <div className="scheme-card-footer">

                                    <button
                                        type="button"
                                        className="view-details"
                                        onClick={() =>
                                            navigate("/scheme-report")
                                        }
                                    >
                                        View details
                                    </button>

                                    <button
                                        type="button"
                                        className={`save-scheme ${savedIds.includes(scheme.id) ? "saved" : ""}`}
                                        onClick={() => handleToggleSave(scheme.id)}
                                        style={savedIds.includes(scheme.id) ? { background: "#eff6ff", borderColor: "#3b82f6", color: "#1d4ed8" } : {}}
                                    >
                                        {savedIds.includes(scheme.id) ? "✓ Saved in My Schemes" : "Save for later"}
                                    </button>

                                    <span className="scheme-note">
                                        {scheme.note}
                                    </span>

                                </div>

                            </article>

                        ))}

                    </div>


                    {/* RIGHT RAIL */}

                    <aside className="dashboard-right-rail">

                        {/* PRIORITY ACTION */}

                        <div className="rail-card priority-card">

                            <div className="rail-card-label">
                                <span>Priority Action</span>
                                <b>♧</b>
                            </div>

                            <h3>
                                Upload Income Certificate
                            </h3>

                            <p>
                                Uploading Tahsildar-approved income
                                proof unlocks eligibility for 2
                                additional schemes (State Farmer
                                Pension + Crop Insurance Rebate).
                            </p>

                            <div className="upload-dropzone">

                                <div>☁</div>

                                <strong>
                                    Drag & drop PDF / JPG
                                </strong>

                                <span>
                                    Max 4MB • DigiLocker Fetch Supported
                                </span>

                            </div>

                            <button
                                className="upload-action"
                                onClick={() =>
                                    navigate("/documents")
                                }
                            >
                                ♧ Upload or Fetch from DigiLocker
                            </button>

                        </div>


                        {/* ML SCHEME PREDICTOR */}

                        <div className="rail-card">
                            <span className="rail-small-label" style={{ color: "#3b82f6", fontWeight: "600" }}>
                                ✦ SCHEME EXPLORER
                            </span>
                            <h3>
                                Explore scheme examples
                            </h3>
                            <p>
                                Compare your self-reported answers with the limited scheme examples. This is not an official approval prediction.
                            </p>
                            <div style={{
                                marginTop: "12px",
                                background: "#eff6ff",
                                padding: "10px",
                                borderRadius: "6px",
                                borderLeft: "3px solid #3b82f6",
                                fontSize: "13px"
                            }}>
                                <strong>Before you apply:</strong><br />
                                • Check the current official scheme rules<br />
                                • Confirm any missing answers yourself<br />
                                • Use the responsible government portal
                            </div>
                            <button
                                type="button"
                                className="rail-secondary"
                                onClick={() => navigate("/schemes")}
                                style={{ marginTop: "16px", borderColor: "#3b82f6", color: "#2563eb" }}
                            >
                                Browse scheme examples ↗
                            </button>
                        </div>


                        {/* CAMP */}

                        <div className="rail-card">

                            <span className="rail-small-label">
                                UPCOMING CAMP
                            </span>

                            <h3>
                                Nashik Tehsil Samaj Kalyan
                                Verification Camp
                            </h3>

                            <p className="camp-date">
                                ▣ 24 Oct 2026 • 09:30 AM – 04:30 PM
                            </p>

                            <p>
                                Tehsil Office Ground, Trimbak Road,
                                Nashik. Bring physical copies of
                                Ration Card, Aadhaar, and 2 passport
                                photos for on-the-spot biometric
                                verification.
                            </p>

                            <button
                                type="button"
                                className="rail-secondary"
                                onClick={() => window.open("https://maps.google.com/?q=Tehsil+Office+Nashik", "_blank")}
                            >
                                ▣ Tehsil Office Camp Zone
                                <strong>Get Route ↗</strong>
                            </button>

                            <button
                                type="button"
                                className="rail-secondary"
                                onClick={() => setSmsReminderSet(true)}
                                style={smsReminderSet ? { color: "#166534", fontWeight: "600" } : {}}
                            >
                                {smsReminderSet ? "✓ SMS Reminder Scheduled for 24 Oct" : "Add Reminder via SMS"}
                            </button>

                        </div>


                        {/* HELPLINES */}

                        <div className="rail-card helpline-card">

                            <span className="rail-small-label">
                                ♧ OFFICIAL HELPLINES
                            </span>

                            <div className="helpline">

                                <div>
                                    <strong>
                                        Maharashtra Govt Citizen Helpline
                                    </strong>

                                    <b>1800-120-8040</b>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => window.open("tel:18001208040")}
                                    title="Call Helpline"
                                >
                                    ☎
                                </button>

                            </div>

                            <div className="helpline">

                                <div>
                                    <strong>
                                        PM-KISAN Central Helpline
                                    </strong>

                                    <b>
                                        155261 / 011-24300606
                                    </b>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => window.open("tel:155261")}
                                    title="Call PM-KISAN Helpline"
                                >
                                    ☎
                                </button>

                            </div>

                            <div className="helpline-footer">
                                Gram Rozgar Sevak: D. Patil
                                <span>• On Duty Today</span>
                            </div>

                        </div>

                    </aside>

                </section>

            </main>

        </div>
    );
}

export default Dashboard;
