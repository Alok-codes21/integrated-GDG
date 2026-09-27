import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import schemeService from "../services/schemeService";

function ProfileReassessment() {
    const navigate = useNavigate();
    const location = useLocation();

    const eventName = location.state?.event || "Annual Household Income or Livelihood Changed";
    const adjustedIncome = location.state?.income || "140000";
    const formattedIncome = Number(adjustedIncome).toLocaleString("en-IN");

    const [savedSchemes, setSavedSchemes] = useState(() => schemeService.getSavedSchemeIds());
    const [toastMessage, setToastMessage] = useState("");

    function handleToggleSave(schemeId, schemeName) {
        const updated = schemeService.toggleSaveScheme(schemeId);
        setSavedSchemes(updated);
        const isNowSaved = updated.includes(schemeId);
        setToastMessage(isNowSaved ? `Saved "${schemeName}" to My Schemes` : `Removed "${schemeName}"`);
        setTimeout(() => setToastMessage(""), 3000);
    }

    function handleAddAll() {
        const ids = ["scheme-sanjay-gandhi", "scheme-antyodaya-aay", "scheme-drought-relief"];
        ids.forEach(id => {
            if (!savedSchemes.includes(id)) {
                schemeService.toggleSaveScheme(id);
            }
        });
        setSavedSchemes(schemeService.getSavedSchemeIds());
        setToastMessage("All 3 newly eligible schemes saved to My Schemes!");
        setTimeout(() => setToastMessage(""), 3500);
    }

    return (
        <div className="portal-page">

            {/* SIDEBAR */}
            <aside className="portal-sidebar">

                <div className="portal-brand">
                    <div className="brand-symbol">S</div>
                    <div>
                        <strong>Sahayak AI</strong>
                        <span>Civic Entitlement Suite</span>
                    </div>
                </div>

                <div className="sidebar-section">
                    <p>CITIZEN WORKSPACE</p>

                    <button onClick={() => navigate("/dashboard")}>
                        <span>▦</span>
                        Overview Dashboard
                    </button>

                    <button onClick={() => navigate("/ai-conversation")}>
                        <span>▱</span>
                        AI Profile Conversation
                    </button>

                    <button onClick={() => navigate("/schemes")}>
                        <span>⌕</span>
                        Explore Schemes
                    </button>

                    <button onClick={() => navigate("/my-schemes")}>
                        <span>♧</span>
                        My Schemes & Saved
                    </button>

                    <button onClick={() => navigate("/applications")}>
                        <span>✓</span>
                        Application Tracker
                    </button>

                    <button onClick={() => navigate("/documents")}>
                        <span>▤</span>
                        Document Vault
                    </button>

                    <button className="active" onClick={() => navigate("/life-events")}>
                        <span>⌁</span>
                        Life Event Re-check
                    </button>

                    <button onClick={() => navigate("/dashboard")}>
                        <span>⚙</span>
                        Settings & Privacy
                    </button>
                </div>

                <div className="sidebar-disclaimer">
                    <strong>⚖</strong>
                    <span>
                        Statutory Governance
                        <br />
                        Facilitation note verified under the National e-Governance Framework. Official gazette standards strictly enforced.
                    </span>
                </div>

            </aside>


            {/* MAIN */}
            <main className="portal-main">

                {/* TOP BAR */}
                <header className="portal-topbar">

                    <div className="topbar-left">
                        <span className="aadhaar-status">
                            ● Government Facilitation Portal
                        </span>
                    </div>

                    <div className="topbar-right">
                        <div className="portal-language-top">
                            <button className="active">English</button>
                            <button>हिन्दी</button>
                            <button>मराठी</button>
                        </div>

                        <button className="notification-button" title="Alerts">
                            ♧
                        </button>

                        <div className="citizen-mini-profile">
                            <div>
                                <strong>Rahul Kumar</strong>
                                <span>Nashik, MH</span>
                            </div>
                            <div className="mini-avatar">
                                RK
                            </div>
                        </div>
                    </div>

                </header>


                {/* TOAST MESSAGE */}
                {toastMessage && (
                    <div style={{
                        background: "#065f46",
                        color: "#ffffff",
                        padding: "10px 16px",
                        borderRadius: "6px",
                        marginBottom: "16px",
                        fontSize: "13px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <span>✓ {toastMessage}</span>
                        <button onClick={() => setToastMessage("")} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>×</button>
                    </div>
                )}


                {/* HEADER */}
                <section className="reassessment-header">

                    <div>
                        <div className="reassessment-breadcrumb">
                            <span style={{ cursor: "pointer" }} onClick={() => navigate("/life-events")}>
                                Life Events
                            </span>
                            <span>›</span>
                            Re-evaluation Report
                            <span>›</span>
                            REF: LE-2026-8821
                        </div>

                        <h1>
                            Your profile has been re-assessed
                        </h1>

                        <p>
                            Based on your recorded event &quot;{eventName}&quot; with updated household income (adjusted to ₹{formattedIncome}/year), Sahayak verified 450+ official gazette standards across state and central databases.
                        </p>
                    </div>

                    <button className="download-dossier" onClick={() => window.print()}>
                        ♧ Download Dossier (PDF)
                    </button>

                </section>


                {/* RESULT BANNER */}
                <section className="reassessment-result">

                    <div className="result-icon">
                        ✓
                    </div>

                    <div className="result-message">
                        <div>
                            <span className="new-opportunity-pill">
                                ✓ 3 New Welfare Opportunities Identified
                            </span>
                            <small>
                                Gazette Match v4.2
                            </small>
                        </div>

                        <p>
                            Good news, Rahul Kumar. No existing benefits were invalidated or reduced. Your lowered household income threshold satisfies 2 state pensions and unlocks agricultural distress relief.
                        </p>
                    </div>

                    <div className="audit-security">
                        <strong>AUDIT SECURITY</strong>
                        <span>
                            ✓ 100% Uncompromised Records
                        </span>
                    </div>

                </section>


                {/* AUDIT JOURNEY */}
                <section className="change-journey">

                    <div className="section-eyebrow">
                        AUDIT PATHWAY
                    </div>

                    <h2>
                        The Journey of Your Change
                    </h2>

                    <div className="journey-grid">

                        <article className="journey-card">
                            <div className="journey-step">
                                Step 01
                            </div>
                            <span className="journey-date">
                                08 Oct 2026
                            </span>
                            <h3>Previous Profile</h3>
                            <p>
                                Age 65, Farmer (Nashik)
                                <br />
                                Household income:
                                <br />
                                ₹1,80,000/year
                            </p>
                            <small>◉ Baseline Record</small>
                        </article>

                        <article className="journey-card">
                            <div className="journey-step orange">
                                Step 02
                            </div>
                            <span className="journey-date">
                                Updated Record
                            </span>
                            <h3>Life Event Logged</h3>
                            <p>
                                Drought & seasonal yield loss reduced annual earnings to ₹{formattedIncome}.
                            </p>
                            <small>→ 14 Oct 2026 Adjustment</small>
                        </article>

                        <article className="journey-card">
                            <div className="journey-step blue">
                                Step 03
                            </div>
                            <span className="journey-date">
                                14 Oct 2026
                            </span>
                            <h3>Rule Engine Re-check</h3>
                            <p>
                                Central Gazette and Maharashtra State welfare criteria re-scanned instantly.
                            </p>
                            <small>◉ 450+ Statutory Rules</small>
                        </article>

                        <article className="journey-card active">
                            <div className="journey-step">
                                Step 04
                            </div>
                            <span className="journey-date">
                                Active State
                            </span>
                            <h3>New Eligibility</h3>
                            <p>
                                Priority household & pension thresholds successfully satisfied.
                            </p>
                            <small>◉ Criteria Met</small>
                        </article>

                    </div>

                </section>


                {/* NEW SCHEMES */}
                <section className="new-entitlements">

                    <div className="new-entitlements-header">
                        <div>
                            <div className="section-eyebrow">
                                ELIGIBLE ENTITLEMENTS
                            </div>
                            <h2>Newly Relevant Welfare Schemes</h2>
                        </div>
                        <span>Showing 3 verified state & central programs</span>
                    </div>


                    {/* SCHEME 1 */}
                    <article className="reassessment-scheme-card">
                        <div className="reassessment-scheme-top">
                            <span>
                                SOCIAL JUSTICE AND SPECIAL ASSISTANCE DEPARTMENT • GOVT. OF MAHARASHTRA
                            </span>
                            <strong className="newly-eligible">
                                ✓ Newly Eligible (Income &lt; ₹1,50,000)
                            </strong>
                        </div>

                        <h3>Sanjay Gandhi Niradhar Anudan Yojana</h3>
                        <p>
                            Provides unconditional monthly financial assistance to destitute senior citizens, handicapped individuals, and similarly marginal farmers facing economic distress.
                        </p>

                        <div className="scheme-stat-strip">
                            <div>
                                <span>Monthly Financial Benefit</span>
                                <strong>₹1,500 / month</strong>
                            </div>
                            <div>
                                <span>Disbursement Mode</span>
                                <strong>Direct DBT Transfer</strong>
                            </div>
                            <div>
                                <span>Processing Authority</span>
                                <strong>Tahsildar Office, Nashik</strong>
                            </div>
                        </div>

                        <div className="why-you-match">
                            <strong>WHY YOU MATCH</strong>
                            <span>✓ Age 65+ satisfied</span>
                            <span>✓ Maharashtra domicile active</span>
                            <span>✓ Household income ₹{formattedIncome} is below ₹1.5L cap</span>
                        </div>

                        <div className="reassessment-card-footer">
                            <button
                                className="dark-action"
                                onClick={() => navigate("/scheme-report")}
                            >
                                View Scheme Details
                            </button>

                            <button
                                className="light-action"
                                onClick={() => handleToggleSave("scheme-sanjay-gandhi", "Sanjay Gandhi Niradhar Anudan Yojana")}
                            >
                                {savedSchemes.includes("scheme-sanjay-gandhi") ? "✓ Saved in My Schemes" : "Save to My Schemes"}
                            </button>

                            <small>Gazette Notification: G.R. No. SJSA-2024/719</small>
                        </div>
                    </article>


                    {/* SCHEME 2 */}
                    <article className="reassessment-scheme-card">
                        <div className="reassessment-scheme-top">
                            <span>
                                FOOD, CIVIL SUPPLIES & CONSUMER PROTECTION DEPARTMENT
                            </span>
                            <strong className="newly-eligible">
                                ✓ Newly Eligible
                            </strong>
                        </div>

                        <h3>
                            Antyodaya Anna Yojana (AAY) & Priority Household Ration Subsidy
                        </h3>
                        <p>
                            National Food Security entitlement providing staple foodgrains at highly subsidized prices through designated Fair Price Shops (FPS) for rural households facing reduced farm yields.
                        </p>

                        <div className="scheme-stat-strip">
                            <div>
                                <span>Statutory Food Allowance</span>
                                <strong>35 kg / month</strong>
                            </div>
                            <div>
                                <span>Subsidized Pricing</span>
                                <strong>₹2/kg Wheat, ₹3/kg Rice</strong>
                            </div>
                            <div>
                                <span>Issuing Authority</span>
                                <strong>District Supply Officer</strong>
                            </div>
                        </div>

                        <div className="why-you-match">
                            <strong>WHY YOU MATCH</strong>
                            <span>✓ Priority household criteria satisfied</span>
                            <span>✓ Rural marginal cultivator classification</span>
                            <span>✓ Ration Card portability active via One Nation One Ration</span>
                        </div>

                        <div className="reassessment-card-footer">
                            <button
                                className="dark-action"
                                onClick={() => navigate("/scheme-report")}
                            >
                                View Scheme Details
                            </button>

                            <button
                                className="light-action"
                                onClick={() => handleToggleSave("scheme-antyodaya-aay", "Antyodaya Anna Yojana (AAY)")}
                            >
                                {savedSchemes.includes("scheme-antyodaya-aay") ? "✓ Saved in My Schemes" : "Save to My Schemes"}
                            </button>

                            <small>NFSA Statutory Gazette Ref: G.S.R. 518(E)</small>
                        </div>
                    </article>


                    {/* SCHEME 3 */}
                    <article className="reassessment-scheme-card drought-card">
                        <div className="reassessment-scheme-top">
                            <span>
                                REVENUE & FOREST DEPARTMENT • GOVT. OF MAHARASHTRA
                            </span>
                            <strong className="additional-info">
                                ⚠ Potentially Relevant • Additional Info Needed
                            </strong>
                        </div>

                        <h3>
                            Maharashtra Drought & Crop Loss Relief Subsidy
                        </h3>
                        <p>
                            State disaster management relief package for smallholder cultivators suffering over 33% yield destruction due to seasonal monsoon failure and dry spells.
                        </p>

                        <div className="scheme-stat-strip">
                            <div>
                                <span>Compensation Range</span>
                                <strong>Up to ₹13,600 / hectare</strong>
                            </div>
                            <div>
                                <span>Coverage Scope</span>
                                <strong>Kharif Season Crop Loss</strong>
                            </div>
                            <div>
                                <span>Action Required</span>
                                <strong>Talathi Panchanama Verification</strong>
                            </div>
                        </div>

                        <div className="missing-requirement">
                            <strong>MISSING REQUIREMENT</strong>
                            <p>▣ Talathi Panchanama / E-Pik Pahani Record Needed</p>
                            <span>
                                Upload your digital crop survey report from the Maharashtra E-Pik Pahani app or obtain a signed inspection note from the local circle officer for verification.
                            </span>
                        </div>

                        <div className="reassessment-card-footer">
                            <button
                                className="orange-action"
                                onClick={() => navigate("/documents")}
                            >
                                Complete Information
                            </button>

                            <button
                                className="light-action"
                                onClick={() => handleToggleSave("scheme-drought-relief", "Maharashtra Drought & Crop Loss Relief")}
                            >
                                {savedSchemes.includes("scheme-drought-relief") ? "✓ Saved in My Schemes" : "Save to My Schemes"}
                            </button>

                            <small>Govt Resolution: RA-2026/04-194</small>
                        </div>
                    </article>

                </section>


                {/* EXISTING APPLICATIONS */}
                <section className="existing-applications">

                    <div className="section-eyebrow">
                        ✓ STATUTORY STABILITY
                    </div>

                    <h2>
                        Your Existing Applications (Unaffected)
                    </h2>

                    <p>
                        The life event change has been reviewed against all active registrations. None of your ongoing benefits or pending disbursements have been paused or altered.
                    </p>

                    <div className="existing-application-grid">

                        <article>
                            <div className="existing-card-header">
                                <strong>PM-KISAN Samman Nidhi</strong>
                                <span>● Active</span>
                            </div>
                            <p>
                                Installment 17 scheduled for direct Aadhaar-linked credit. No documentary amendment required for this central program.
                            </p>
                            <small>Registered ID: MH-NASH-004912</small>
                            <small>Next: ₹2,000 in Dec</small>
                        </article>

                        <article>
                            <div className="existing-card-header">
                                <strong>Shravanbal Seva State Pension</strong>
                                <span>● In Process</span>
                            </div>
                            <p>
                                Your application remains fully valid at Level 2 Circle Officer. Your lower income declaration confirms stronger compliance.
                            </p>
                            <small>Application: APP-772185</small>
                            <small>Audit Status: Cleared</small>
                        </article>

                    </div>

                </section>


                {/* LOCAL HELP */}
                <section className="local-assistance">

                    <div className="local-assistance-content">
                        <div className="section-eyebrow">
                            ◉ LOCAL GRAM PANCHAYAT FACILITATION
                        </div>

                        <h2>Need in-person assistance with these documents?</h2>
                        <p>
                            Your nearest Village Level Entrepreneur (VLE) at the Nashik Common Service Centre (CSC) can physically attest your updated income certificate and upload your crop loss panchanama.
                        </p>

                        <div className="assistance-details">
                            <span>◉ Devali Gram Kendra (12.4 km)</span>
                            <a
                                href="tel:18001208040"
                                style={{ color: "inherit", textDecoration: "none" }}
                            >
                                ☎ 1800-120-8040 Free Helpline
                            </a>
                        </div>
                    </div>

                    <div className="assistance-image">
                        <div>
                            👨‍🌾
                        </div>
                    </div>

                </section>


                {/* BOTTOM ACTIONS */}
                <section className="reassessment-bottom-actions">

                    <button
                        className="return-dashboard"
                        onClick={() => navigate("/dashboard")}
                    >
                        ← Return to Citizen Dashboard
                    </button>

                    <div>
                        <button
                            className="add-all-button"
                            onClick={handleAddAll}
                        >
                            ♧ Add All 3 to My Schemes
                        </button>

                        <button
                            className="begin-applications-button"
                            onClick={() => navigate("/applications")}
                        >
                            ▷ Begin Applications
                        </button>
                    </div>

                </section>

            </main>
        </div>
    );
}

export default ProfileReassessment;