import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import lifeEventService from "../services/lifeEventService";
import profileService from "../services/profileService";

function LifeEventForm() {
    const navigate = useNavigate();
    const location = useLocation();

    const selectedEvent =
        location.state?.event || "Annual Household Income or Livelihood Changed";

    const [income, setIncome] = useState("140000");
    const [eventDate, setEventDate] = useState("2026-09");
    const [reason, setReason] = useState("Agricultural / seasonal income loss");
    const [documentStatus, setDocumentStatus] = useState("ready");
    const [description, setDescription] = useState(
        "Due to unseasonal dry spells in Nashik rural, our farm yield dropped significantly this season, reducing annual earnings."
    );
    const [submitting, setSubmitting] = useState(false);
    const [isDictating, setIsDictating] = useState(false);

    async function handleRecheck() {
        setSubmitting(true);
        try {
            const incomeNum = parseInt(income, 10) || 140000;
            await lifeEventService.createLifeEvent({
                category: selectedEvent,
                date: eventDate,
                income: incomeNum,
                reason,
                description,
                documentStatus,
                status: "evaluated"
            });

            // Update user profile income
            await profileService.updateProfile({
                income: incomeNum
            });

            navigate("/profile-reassessment", {
                state: {
                    event: selectedEvent,
                    income: income,
                    date: eventDate,
                    reason: reason
                }
            });
        } catch (err) {
            console.error("Failed to recheck life event:", err);
            setSubmitting(false);
        }
    }

    function handleSaveDraft() {
        navigate("/life-events");
    }

    function handleToggleDictate() {
        if (!isDictating) {
            setIsDictating(true);
            setTimeout(() => {
                setDescription(prev => prev + " Seasonal rainfall was 40% below average in Sinnar block.");
                setIsDictating(false);
            }, 1800);
        }
    }

    return (
        <div className="life-form-layout">

            {/* SIDEBAR */}
            <aside className="life-form-sidebar">

                <div className="life-form-brand">
                    <div className="life-form-logo">S</div>
                    <div>
                        <strong>Sahayak AI</strong>
                        <span>CITIZEN ENTITLEMENT ENGINE</span>
                    </div>
                </div>

                <div className="life-form-sidebar-title">
                    CITIZEN WORKSPACE
                </div>

                <nav className="life-form-nav">
                    <button onClick={() => navigate("/dashboard")}>
                        <span>⌂</span>
                        Overview Dashboard
                    </button>

                    <button onClick={() => navigate("/ai-conversation")}>
                        <span>◉</span>
                        AI Profile Conversation
                    </button>

                    <button onClick={() => navigate("/schemes")}>
                        <span>⌕</span>
                        Explore Schemes
                    </button>

                    <button onClick={() => navigate("/my-schemes")}>
                        <span>♡</span>
                        My Schemes & Saved
                    </button>

                    <button onClick={() => navigate("/applications")}>
                        <span>▣</span>
                        Application Tracker
                    </button>

                    <button onClick={() => navigate("/documents")}>
                        <span>▤</span>
                        Document Vault
                    </button>

                    <button
                        className="active"
                        onClick={() => navigate("/life-events")}
                    >
                        <span>◌</span>
                        Life Event Re-check
                    </button>

                    <button onClick={() => navigate("/dashboard")}>
                        <span>⚙</span>
                        Settings & Privacy
                    </button>
                </nav>

                <div className="life-form-sidebar-note">
                    <strong>⚖ Statutory Governance</strong>
                    <p>
                        Facilitation mode verified under the National Governance Framework. Official gazette standards strictly enforced.
                    </p>
                </div>

            </aside>


            {/* MAIN */}
            <main className="life-form-main">

                {/* TOP BAR */}
                <header className="life-form-topbar">

                    <div className="topbar-official">
                        <span className="topbar-emblem">◆</span>
                        <span>Government Facilitation Portal</span>
                    </div>

                    <div className="topbar-right">
                        <div className="language-switch">
                            <button className="selected">English</button>
                            <button>हि</button>
                            <button>मर</button>
                        </div>

                        <span className="notification" title="Alerts">♧</span>

                        <div className="citizen-mini">
                            <div>
                                <strong>Rahul Kumar</strong>
                                <span>Nashik, MH</span>
                            </div>
                            <div className="citizen-avatar">
                                RK
                            </div>
                        </div>
                    </div>

                </header>


                {/* PAGE CONTENT */}
                <div className="life-form-content">

                    <div className="life-form-breadcrumb">
                        <button onClick={() => navigate("/life-events")}>
                            ← Back to Life Events
                        </button>
                        <span>/</span>
                        <span>Record Life Event</span>
                    </div>

                    <div className="life-form-intro">
                        <span className="life-form-eyebrow">
                            ENTITLEMENT RECALIBRATION
                        </span>
                        <h1>
                            What has changed in your circumstances?
                        </h1>
                        <p>
                            Updating your life event will guide Sahayak&apos;s statutory rule engine to recalculate applicable state and central subsidies without affecting your existing active welfare applications.
                        </p>
                    </div>

                    {/* SELECTED EVENT */}
                    <section className="selected-event-card">
                        <div className="selected-event-heading">
                            <div className="selected-event-icon">
                                ↘
                            </div>
                            <div>
                                <span>
                                    INCOME & LIVELIHOOD • PRIMARY DETERMINANT
                                </span>
                                <h2>{selectedEvent}</h2>
                            </div>

                            <button
                                onClick={() => navigate("/life-events")}
                                className="change-event-button"
                            >
                                ⚙ Change selected event
                            </button>
                        </div>

                        <div className="government-framework">
                            <strong>
                                ◉ Government Classification Framework
                            </strong>
                            <p>
                                Government welfare schemes categorize families by annual income classes (e.g. BPL under ₹1,00,000, EWS under ₹2,50,000, Marginal farmer under ₹1,80,000). Updating this metric provides deterministic legal matches across MahaDBT and central portals.
                            </p>
                        </div>
                    </section>


                    {/* FORM */}
                    <section className="life-event-form-card">

                        {/* 1 */}
                        <div className="life-question">
                            <label>
                                1. When did this change occur?
                                <span>*</span>
                            </label>
                            <p>
                                Approximate date or fiscal month of transition for audit log and retrospective benefit matching.
                            </p>
                            <input
                                type="month"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                            />
                        </div>


                        {/* 2 */}
                        <div className="life-question">
                            <label>
                                2. New Approximate Annual Household Income
                                <span>*</span>
                            </label>
                            <p>
                                Calculated from all combined sources across household members (farming, seasonal labor, allied trades).
                            </p>

                            <div className="income-input">
                                <span>₹</span>
                                <input
                                    type="number"
                                    value={income}
                                    onChange={(e) => setIncome(e.target.value)}
                                />
                                <small>/ year</small>
                            </div>

                            <div className="income-slabs">
                                <button
                                    type="button"
                                    className={Number(income) < 100000 ? "selected" : ""}
                                    onClick={() => setIncome("80000")}
                                >
                                    <strong>Below ₹1,00,000</strong>
                                    <span>Antyodaya / Priority</span>
                                </button>

                                <button
                                    type="button"
                                    className={Number(income) >= 100000 && Number(income) < 150000 ? "selected" : ""}
                                    onClick={() => setIncome("140000")}
                                >
                                    <strong>₹1.0L – ₹1.5L</strong>
                                    <span>BPL / Small Holder</span>
                                </button>

                                <button
                                    type="button"
                                    className={Number(income) >= 150000 && Number(income) <= 250000 ? "selected" : ""}
                                    onClick={() => setIncome("200000")}
                                >
                                    <strong>₹1.5L – ₹2.5L</strong>
                                    <span>FWS / Standard Slab</span>
                                </button>

                                <button
                                    type="button"
                                    className={Number(income) > 250000 ? "selected" : ""}
                                    onClick={() => setIncome("300000")}
                                >
                                    <strong>Above ₹2,50,000</strong>
                                    <span>General Tier</span>
                                </button>
                            </div>
                        </div>


                        {/* 3 */}
                        <div className="life-question">
                            <label>
                                3. Reason or Nature of Change
                                <span>*</span>
                            </label>
                            <p>
                                Helps Sahayak tag natural calamity benefits, MGNREGA distress provisions, or pension entitlements.
                            </p>

                            <div className="reason-grid">
                                <button
                                    type="button"
                                    className={reason === "Agricultural / seasonal income loss" ? "selected" : ""}
                                    onClick={() => setReason("Agricultural / seasonal income loss")}
                                >
                                    <span className="radio"></span>
                                    <div>
                                        <strong>Drop in agricultural crop yield / drought impact</strong>
                                        <small>Loss of rainfed harvests, unseasonal rainfall, or pest damage</small>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    className={reason === "Retirement / cessation of active wage labor" ? "selected" : ""}
                                    onClick={() => setReason("Retirement / cessation of active wage labor")}
                                >
                                    <span className="radio"></span>
                                    <div>
                                        <strong>Retirement / cessation of active wage labor</strong>
                                        <small>Attainment of senior citizen status or physical infirmity</small>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    className={reason === "Family member moved or changed earning status" ? "selected" : ""}
                                    onClick={() => setReason("Family member moved or changed earning status")}
                                >
                                    <span className="radio"></span>
                                    <div>
                                        <strong>Family member moved or changed earning status</strong>
                                        <small>Marriage, out-migration, or restructuring of ration card unit</small>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    className={reason === "Other seasonal adjustment" ? "selected" : ""}
                                    onClick={() => setReason("Other seasonal adjustment")}
                                >
                                    <span className="radio"></span>
                                    <div>
                                        <strong>Other seasonal adjustment</strong>
                                        <small>Informal gig-work decline, business loss, or temporary slowdown</small>
                                    </div>
                                </button>
                            </div>
                        </div>


                        {/* 4 */}
                        <div className="life-question">
                            <div className="question-heading-row">
                                <div>
                                    <label>
                                        4. Tell us a little more in plain words
                                        <span className="optional">(Optional)</span>
                                    </label>
                                    <p>
                                        Provide contextual facts to assist our legal engine in identifying localized district gazette notices.
                                    </p>
                                </div>
                                <span className="multilingual-label">
                                    Multilingual AI Assist Enabled
                                </span>
                            </div>

                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                maxLength={500}
                                rows="4"
                            />

                            <div className="textarea-footer">
                                <button
                                    type="button"
                                    onClick={handleToggleDictate}
                                    style={isDictating ? { color: "#dc2626", fontWeight: "600" } : {}}
                                >
                                    {isDictating ? "🔴 Listening... (Marathi/Hindi/English)" : "🎙 Tap to dictate in Marathi, Hindi, or English"}
                                </button>
                                <span>{description.length} / 500 chars</span>
                            </div>
                        </div>


                        {/* 5 */}
                        <div className="life-question">
                            <label>
                                5. Supporting Document Status
                            </label>

                            <div className="document-status-grid">
                                <button
                                    type="button"
                                    className={documentStatus === "ready" ? "selected" : ""}
                                    onClick={() => setDocumentStatus("ready")}
                                >
                                    <span className="radio"></span>
                                    <div>
                                        <strong>I have an updated certificate or self-declaration ready</strong>
                                        <small>Tahsildar Income Certificate or Gram Sevak attested statement ready in DigiLocker</small>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    className={documentStatus === "later" ? "selected" : ""}
                                    onClick={() => setDocumentStatus("later")}
                                >
                                    <span className="radio"></span>
                                    <div>
                                        <strong>I will upload or obtain this later</strong>
                                        <small>Sahayak will generate guidance on where and how to obtain verified certificate</small>
                                    </div>
                                </button>
                            </div>
                        </div>

                    </section>


                    {/* WHAT HAPPENS */}
                    <section className="recheck-explanation">
                        <h2>
                            ◉ What happens when you click &quot;Re-check my options&quot;?
                        </h2>
                        <p>
                            Our civic rules evaluator respects strict personal data protection policies. Here is exactly what our rule engine executes:
                        </p>

                        <div className="recheck-grid">
                            <div>
                                <span>1</span>
                                <div>
                                    <strong>Vault Security</strong>
                                    <p>Your stored demographic profile updates securely in your local DigiLocker-linked citizen vault.</p>
                                </div>
                            </div>

                            <div>
                                <span>2</span>
                                <div>
                                    <strong>Gazette Querying</strong>
                                    <p>Sahayak queries gazette criteria for Maharashtra state and Central Government social welfare registries.</p>
                                </div>
                            </div>

                            <div>
                                <span>3</span>
                                <div>
                                    <strong>Entitlement Assessment</strong>
                                    <p>An assessment report highlights newly unlocked opportunities and updated documentation criteria.</p>
                                </div>
                            </div>

                            <div>
                                <span>4</span>
                                <div>
                                    <strong>Preservation of Status</strong>
                                    <p>Your existing approved, sanctioned, or pending welfare applications remain completely untouched.</p>
                                </div>
                            </div>
                        </div>
                    </section>


                    {/* ELIGIBILITY SHIFT */}
                    <section className="eligibility-shift">
                        <div className="eligibility-circle">
                            <strong>72%</strong>
                        </div>
                        <div className="eligibility-text">
                            <strong>Projected Eligibility Shift</strong>
                            <p>
                                Transitioning to ₹1.0L–₹1.5L annual bracket unlocks an estimated 4 additional state welfare programs.
                            </p>
                        </div>
                        <span className="slab-badge">
                            ✓ Slab Validated
                        </span>
                    </section>


                    {/* ACTIONS */}
                    <div className="life-form-actions">
                        <button
                            className="recheck-button"
                            disabled={submitting}
                            onClick={handleRecheck}
                        >
                            {submitting ? "Evaluating 450+ Statutory Rules..." : "▣ Re-check my options & evaluate schemes"}
                        </button>

                        <button
                            className="save-draft-button"
                            onClick={handleSaveDraft}
                        >
                            Save draft & return
                        </button>

                        <button
                            className="cancel-button"
                            onClick={() => navigate("/life-events")}
                        >
                            Cancel
                        </button>
                    </div>

                </div>

            </main>

        </div>
    );
}

export default LifeEventForm;