import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import applicationService from "../services/applicationService";

function Applications() {
    const navigate = useNavigate();

    const [checklistModalOpen, setChecklistModalOpen] = useState(false);
    const [reminderModalOpen, setReminderModalOpen] = useState(false);
    const [paymentHistoryOpen, setPaymentHistoryOpen] = useState(false);
    const [checklistItems, setChecklistItems] = useState([]);
    const [reminderSuccess, setReminderSuccess] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    useEffect(() => {
        async function loadApp() {
            try {
                const app = await applicationService.getApplicationById("app-shravanbal");
                if (app && app.checklist) {
                    setChecklistItems(app.checklist);
                } else {
                    setChecklistItems([
                        { id: "chk-1", label: "Original Aadhaar Card (physical plastic card)", checked: true },
                        { id: "chk-2", label: "Original Income Certificate (IC/2026/04981) from Tahsildar", checked: true },
                        { id: "chk-3", label: "Bank Passbook photocopy showing IFSC & account number", checked: true },
                        { id: "chk-4", label: "Two recent passport-sized photographs", checked: false },
                        { id: "chk-5", label: "Age proof affidavit / Form VIII signed by Gazetted Officer", checked: false }
                    ]);
                }
            } catch (err) {
                console.error("Failed to load application checklist:", err);
            }
        }
        loadApp();
    }, []);

    function handleToggleChecklist(itemId) {
        const updated = checklistItems.map((item) => {
            if (item.id === itemId) {
                return { ...item, checked: !item.checked };
            }
            return item;
        });
        setChecklistItems(updated);
        applicationService.toggleChecklistItem("app-shravanbal", itemId);
    }

    function handleScheduleReminder(e) {
        e.preventDefault();
        setReminderSuccess(true);
        setToastMessage("Reminder scheduled for SMS & WhatsApp: 23 Oct 2026, 9:00 AM");
        setTimeout(() => {
            setReminderModalOpen(false);
            setReminderSuccess(false);
            setTimeout(() => setToastMessage(""), 4000);
        }, 1200);
    }

    const checkedCount = checklistItems.filter(i => i.checked).length;

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

                    <button className="active">
                        <span>✓</span>
                        Application Tracker
                    </button>

                    <button onClick={() => navigate("/documents")}>
                        <span>▤</span>
                        Document Vault
                    </button>

                    <button onClick={() => navigate("/life-events")}>
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


                {/* TOAST NOTIFICATION */}
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


                {/* PAGE HEADING */}
                <section className="applications-header">

                    <div>
                        <div className="application-breadcrumb">
                            ♢ Official Direct-Benefit Lifecycle
                        </div>
                        <h1>Your Applications</h1>
                        <p>
                            Step-by-step progress tracking for your civic welfare submissions.
                        </p>
                    </div>

                    <div className="application-sync">
                        Synced with State Hub
                        <span>●</span>
                    </div>

                </section>


                {/* OFFICIAL CHANNEL PROTOCOL */}
                <section className="official-channel">
                    <div className="channel-icon">
                        ◎
                    </div>

                    <div>
                        <div className="channel-heading">
                            <strong>Official Channel Protocol</strong>
                            <span>Statutory Safe</span>
                        </div>

                        <p>
                            Application handled through official government channels. Sahayak assists with documentation and readiness, but official status is verified via state department records.
                        </p>
                    </div>
                </section>


                {/* MAIN APPLICATION */}
                <section className="application-card">

                    <div className="application-card-header">
                        <div>
                            <div className="application-department">
                                SOCIAL JUSTICE & SPECIAL ASSISTANCE DEPT
                            </div>

                            <span className="waiting-badge">
                                ◉ Waiting for you
                            </span>

                            <h2>
                                Senior Citizen Support & Pension
                                <br />
                                (Shravanbal Yojana)
                            </h2>

                            <div className="application-meta">
                                <span># Ref: MH-SWD-2026-88412</span>
                                <span>♜ Nashik District Collectorate</span>
                                <span>▣ Initiated 06 Oct 2026</span>
                            </div>
                        </div>

                        <div className="sanction-benefit">
                            <small>SANCTION BENEFIT</small>
                            <strong>₹1,500</strong>
                            <span>/ month</span>
                        </div>
                    </div>


                    {/* TIMELINE */}
                    <div className="application-timeline">

                        {/* STEP 1 */}
                        <div className="timeline-step completed">
                            <div className="timeline-marker">✓</div>
                            <div className="timeline-content">
                                <div className="timeline-heading">
                                    <strong>Step 1: Profile Reviewed</strong>
                                    <span>Completed 08 Oct 2026</span>
                                </div>
                                <p>
                                    All baseline demographic, age threshold, and family income criteria verified.
                                </p>
                            </div>
                        </div>

                        {/* STEP 2 */}
                        <div className="timeline-step completed">
                            <div className="timeline-marker">✓</div>
                            <div className="timeline-content">
                                <div className="timeline-heading">
                                    <strong>Step 2: Documents Prepared</strong>
                                    <span>Completed 10 Oct 2026</span>
                                </div>
                                <p>
                                    Aadhaar card, age certificate (Form VIII), and residential proof attached via DigiLocker.
                                </p>
                            </div>
                        </div>

                        {/* STEP 3 */}
                        <div className="timeline-step completed">
                            <div className="timeline-marker">✓</div>
                            <div className="timeline-content">
                                <div className="timeline-heading">
                                    <strong>Step 3: Official Portal Opened</strong>
                                    <span>Completed 12 Oct 2026</span>
                                </div>
                                <p>
                                    Payload successfully redirected to MahaDBT administrative staging environment.
                                </p>
                            </div>
                        </div>

                        {/* STEP 4 CURRENT */}
                        <div className="timeline-step current">
                            <div className="timeline-marker">◉</div>
                            <div className="timeline-content current-content">
                                <div className="current-topline">
                                    <div>
                                        <span className="action-required">ACTION REQUIRED</span>
                                        <strong>Step 4: Physical Biometric & Tehsil Verification</strong>
                                    </div>
                                    <span className="deadline">24 Oct 2026 (in 5 days)</span>
                                </div>

                                <p>
                                    Scheduled in-person verification with Naib Tehsildar Desk. Scheduled at <strong>Nashik Tehsil Office, Counter 4</strong> on 24 Oct 2026, 11:30 AM.
                                </p>

                                <div className="verification-details">
                                    <div>
                                        <small>VENUE</small>
                                        <strong>⌖ Old Agra Rd, Nashik</strong>
                                    </div>
                                    <div>
                                        <small>VERIFICATION OFFICER</small>
                                        <strong>▣ Desk 04 (Shri S. Patil)</strong>
                                    </div>
                                    <div>
                                        <small>MANDATORY PHYSICAL DOCS</small>
                                        <strong>▤ {checkedCount}/{checklistItems.length} Forms Ready</strong>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* STEP 5 */}
                        <div className="timeline-step upcoming">
                            <div className="timeline-marker">⌛</div>
                            <div className="timeline-content">
                                <div className="timeline-heading">
                                    <strong>Step 5: Statutory Sanction & Treasury Disbursement</strong>
                                    <span>Upcoming Stage</span>
                                </div>
                                <p>
                                    Pending official Tehsil clearance and signature from District Social Welfare Officer.
                                </p>
                            </div>
                        </div>

                    </div>


                    {/* APPLICATION FOOTER */}
                    <div className="application-actions">

                        <div className="application-buttons">
                            <button
                                className="primary-button"
                                onClick={() => setChecklistModalOpen(true)}
                            >
                                ☷ View Tehsil Visit checklist ({checkedCount}/{checklistItems.length})
                            </button>

                            <button
                                className="secondary-button"
                                onClick={() => setReminderModalOpen(true)}
                            >
                                ♧ Reschedule reminder
                            </button>
                        </div>

                        <a
                            href="https://mahadbt.maharashtra.gov.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mahadbt-link"
                        >
                            Open MahaDBT record
                            <br />
                            <span>(mahadbt.maharashtra.gov.in)</span>
                            ↗
                        </a>

                    </div>

                </section>


                {/* OTHER TRACKED ELEMENTS */}
                <section className="tracked-section">

                    <div className="tracked-heading">
                        <div>
                            <h2>Other Tracked Entitlements</h2>
                            <p>
                                Secondary schemes currently linked to your Aadhaar-seeded profile.
                            </p>
                        </div>
                        <span>2 Active Records</span>
                    </div>

                    <div className="tracked-grid">

                        {/* PM KISAN */}
                        <article className="tracked-card">
                            <div className="tracked-card-top">
                                <div>
                                    <span className="tracked-department">MINISTRY OF AGRICULTURE</span>
                                    <span className="active-record">● Active</span>
                                </div>
                            </div>

                            <h3>PM-KISAN Samman Nidhi</h3>
                            <p>
                                Direct income assistance of ₹6,000 annually via 3 tripartite installments.
                            </p>

                            <div className="transfer-box">
                                <span>✓ Latest Treasury Transfer</span>
                                <strong>17th Installment credited on 15 Sep 2026</strong>
                            </div>

                            <div className="tracked-footer">
                                <button onClick={() => setPaymentHistoryOpen(true)}>
                                    View payment history ↗
                                </button>
                                <span>Bank: SBI **** 4018</span>
                            </div>
                        </article>


                        {/* MAHATMA JYOTIRAO */}
                        <article className="tracked-card">
                            <div className="tracked-card-top">
                                <div>
                                    <span className="tracked-department">DEPT OF COOPERATION & MARKETING</span>
                                    <span className="draft-record">▣ Draft saved</span>
                                </div>
                            </div>

                            <h3>Mahatma Jyotirao Phule Shetkari Karj Mukti</h3>
                            <p>
                                Crop loan waiver incentive scheme for agricultural loan settlement.
                            </p>

                            <div className="draft-box">
                                <span>LOCAL DRAFT STATUS</span>
                                <strong>Draft saved on device • Land registry 7/12 pending</strong>
                            </div>

                            <div className="tracked-footer">
                                <button
                                    className="continue-draft"
                                    onClick={() => navigate("/documents")}
                                >
                                    Continue draft →
                                </button>
                                <span>Expires in 18 days</span>
                            </div>
                        </article>

                    </div>

                </section>

            </main>

            {/* TEHSIL CHECKLIST MODAL */}
            {checklistModalOpen && (
                <div
                    className="document-modal-overlay"
                    onClick={() => setChecklistModalOpen(false)}
                    style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}
                >
                    <div
                        className="document-upload-modal"
                        onClick={(e) => e.stopPropagation()}
                        style={{ background: "#ffffff", maxWidth: "520px", width: "92%", padding: "24px", borderRadius: "8px", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    >
                        <button
                            className="modal-close"
                            onClick={() => setChecklistModalOpen(false)}
                            style={{ float: "right", background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#64748b" }}
                        >
                            ×
                        </button>

                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                            <span style={{ fontSize: "20px" }}>☷</span>
                            <h2 style={{ fontSize: "18px", color: "#0f172a", margin: 0 }}>
                                Tehsil Visit Physical Checklist
                            </h2>
                        </div>

                        <p style={{ color: "#64748b", fontSize: "13px", margin: "0 0 16px 0" }}>
                            Ensure all physical documents are carried to <strong>Counter 4, Nashik Tehsil Office</strong> on 24 Oct 2026.
                        </p>

                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                            {checklistItems.map((item) => (
                                <label
                                    key={item.id}
                                    style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: "10px",
                                        padding: "10px",
                                        borderRadius: "6px",
                                        background: item.checked ? "#f0fdf4" : "#f8fafc",
                                        border: item.checked ? "1px solid #bbf7d0" : "1px solid #e2e8f0",
                                        cursor: "pointer"
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={item.checked}
                                        onChange={() => handleToggleChecklist(item.id)}
                                        style={{ marginTop: "3px", cursor: "pointer" }}
                                    />
                                    <span style={{
                                        fontSize: "13px",
                                        color: item.checked ? "#166534" : "#334155",
                                        textDecoration: item.checked ? "none" : "none",
                                        fontWeight: item.checked ? "600" : "400"
                                    }}>
                                        {item.label}
                                    </span>
                                </label>
                            ))}
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: "13px", color: "#0f766e", fontWeight: "600" }}>
                                {checkedCount} of {checklistItems.length} items verified
                            </span>
                            <button
                                onClick={() => setChecklistModalOpen(false)}
                                style={{ padding: "8px 16px", background: "#0f2f4c", color: "white", border: "none", borderRadius: "4px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
                            >
                                Done & Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* RESCHEDULE REMINDER MODAL */}
            {reminderModalOpen && (
                <div
                    className="document-modal-overlay"
                    onClick={() => setReminderModalOpen(false)}
                    style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}
                >
                    <div
                        className="document-upload-modal"
                        onClick={(e) => e.stopPropagation()}
                        style={{ background: "#ffffff", maxWidth: "460px", width: "90%", padding: "24px", borderRadius: "8px", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    >
                        <button
                            className="modal-close"
                            onClick={() => setReminderModalOpen(false)}
                            style={{ float: "right", background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#64748b" }}
                        >
                            ×
                        </button>

                        <h2 style={{ fontSize: "18px", color: "#0f172a", marginTop: 0, marginBottom: "8px" }}>
                            Set Appointment Reminder
                        </h2>
                        <p style={{ color: "#64748b", fontSize: "13px", marginBottom: "16px" }}>
                            Receive automated SMS and WhatsApp alerts for your Tehsil biometric appointment.
                        </p>

                        <form onSubmit={handleScheduleReminder}>
                            <div style={{ marginBottom: "12px" }}>
                                <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px" }}>
                                    Send Alert To
                                </label>
                                <input
                                    type="text"
                                    disabled
                                    value="+91 98765 43210 (Rahul Kumar)"
                                    style={{ width: "100%", padding: "8px", fontSize: "13px", background: "#f1f5f9", border: "1px solid #cbd5e1", borderRadius: "4px" }}
                                />
                            </div>

                            <div style={{ marginBottom: "12px" }}>
                                <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px" }}>
                                    Reminder Timing
                                </label>
                                <select style={{ width: "100%", padding: "8px", fontSize: "13px", border: "1px solid #cbd5e1", borderRadius: "4px" }}>
                                    <option>24 hours before (23 Oct, 11:30 AM)</option>
                                    <option>Morning of appointment (24 Oct, 8:00 AM)</option>
                                    <option>2 days before (22 Oct, 10:00 AM)</option>
                                </select>
                            </div>

                            <div style={{ display: "flex", gap: "10px", marginTop: "20px", justifyContent: "flex-end" }}>
                                <button
                                    type="button"
                                    onClick={() => setReminderModalOpen(false)}
                                    style={{ padding: "8px 14px", border: "1px solid #cbd5e1", background: "#f8fafc", borderRadius: "4px", fontSize: "13px", cursor: "pointer" }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    style={{ padding: "8px 16px", background: "#0f2f4c", color: "white", border: "none", borderRadius: "4px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
                                >
                                    {reminderSuccess ? "✓ Scheduled!" : "Confirm Reminder"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* PM-KISAN PAYMENT HISTORY MODAL */}
            {paymentHistoryOpen && (
                <div
                    className="document-modal-overlay"
                    onClick={() => setPaymentHistoryOpen(false)}
                    style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}
                >
                    <div
                        className="document-upload-modal"
                        onClick={(e) => e.stopPropagation()}
                        style={{ background: "#ffffff", maxWidth: "520px", width: "90%", padding: "24px", borderRadius: "8px", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    >
                        <button
                            className="modal-close"
                            onClick={() => setPaymentHistoryOpen(false)}
                            style={{ float: "right", background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#64748b" }}
                        >
                            ×
                        </button>

                        <h2 style={{ fontSize: "18px", color: "#0f172a", marginTop: 0, marginBottom: "4px" }}>
                            PM-KISAN Disbursement History
                        </h2>
                        <span style={{ fontSize: "12px", color: "#64748b", display: "block", marginBottom: "16px" }}>
                            Direct Treasury Credit to SBI Account **** 4018
                        </span>

                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: "6px" }}>
                                <div>
                                    <strong style={{ display: "block", fontSize: "13px", color: "#065f46" }}>17th Installment</strong>
                                    <small style={{ color: "#047857" }}>Credited 15 Sep 2026 • UTR: SBIN-2026-99412</small>
                                </div>
                                <span style={{ fontWeight: "700", color: "#065f46", fontSize: "15px" }}>₹2,000</span>
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px" }}>
                                <div>
                                    <strong style={{ display: "block", fontSize: "13px", color: "#1e293b" }}>16th Installment</strong>
                                    <small style={{ color: "#64748b" }}>Credited 18 May 2026 • UTR: SBIN-2026-38102</small>
                                </div>
                                <span style={{ fontWeight: "700", color: "#1e293b", fontSize: "15px" }}>₹2,000</span>
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px" }}>
                                <div>
                                    <strong style={{ display: "block", fontSize: "13px", color: "#1e293b" }}>15th Installment</strong>
                                    <small style={{ color: "#64748b" }}>Credited 12 Jan 2026 • UTR: SBIN-2026-11849</small>
                                </div>
                                <span style={{ fontWeight: "700", color: "#1e293b", fontSize: "15px" }}>₹2,000</span>
                            </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <button
                                onClick={() => setPaymentHistoryOpen(false)}
                                style={{ padding: "8px 16px", background: "#0f2f4c", color: "white", border: "none", borderRadius: "4px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Applications;