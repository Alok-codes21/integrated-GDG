import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SchemeReport() {
    const navigate = useNavigate();

    const [modalInfo, setModalInfo] = useState(null);
    const [dependents, setDependents] = useState([
        {
            initials: "AK",
            name: "Amit Kumar",
            relation: "Son",
            age: 23,
            education: "Diploma Holder",
            checked: false,
            eligible: true,
            statusText: "Eligible (Age 18-35 satisfied)"
        },
        {
            initials: "PK",
            name: "Pooja Kumar",
            relation: "Daughter",
            age: 20,
            education: "Apprentice",
            checked: false,
            eligible: true,
            statusText: "Eligible (Age 18-35 satisfied)"
        }
    ]);
    const [showAddDependent, setShowAddDependent] = useState(false);
    const [newDepName, setNewDepName] = useState("");
    const [newDepRelation, setNewDepRelation] = useState("Son");
    const [newDepAge, setNewDepAge] = useState("");

    const criteria = [
        {
            name: "Applicant Age Limit",
            rule: "Must be between 18 and 35 years at time of registration",
            data: "65 years",
            detail: "Senior Citizen bracket",
            status: "Does not meet age criteria",
            type: "fail"
        },
        {
            name: "Residency Status",
            rule: "Citizen of India (Any State or Union Territory)",
            data: "Maharashtra, India",
            detail: "Verified via Aadhaar",
            status: "Meets requirement",
            type: "pass"
        },
        {
            name: "Minimum Education",
            rule: "Secondary Certificate or ITI trade equivalent",
            data: "Secondary Certificate",
            detail: "Self-declared record",
            status: "Meets requirement",
            type: "pass"
        },
        {
            name: "Prior Enterprise Ownership",
            rule: "Must not own registered GST manufacturing or enterprise",
            data: "No commercial GST",
            detail: "Agricultural profile only",
            status: "Meets requirement",
            type: "pass"
        }
    ];

    function handleCheckDependent(depIndex) {
        const dep = dependents[depIndex];
        setModalInfo({
            title: `PM-YSY Eligibility Assessment for ${dep.name}`,
            body: (
                <div>
                    <div style={{ background: "#ecfdf5", border: "1px solid #6ee7b7", padding: "14px", borderRadius: "6px", marginBottom: "16px" }}>
                        <strong style={{ color: "#065f46", display: "block", marginBottom: "4px" }}>
                            ✓ Statutorily Eligible for PM Yuva Sambal Yojana
                        </strong>
                        <p style={{ margin: 0, color: "#047857", fontSize: "14px" }}>
                            Age {dep.age} strictly complies with the gazetted 18–35 bracket. Qualification ({dep.education}) satisfies technical apprenticeship standards.
                        </p>
                    </div>
                    <ul style={{ margin: "0 0 16px 20px", color: "#334155", fontSize: "14px", lineHeight: "1.6" }}>
                        <li><strong>Monthly Stipend:</strong> ₹8,000 / month during 12-month enterprise incubation</li>
                        <li><strong>Subsidized Tool Kit Grant:</strong> Up to ₹15,000 one-time direct credit</li>
                        <li><strong>Beneficiary Aadhaar:</strong> Linked via Ration Card unit #RC-MH-2024</li>
                    </ul>
                    <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                        Would you like to initiate an application under {dep.name}&apos;s name?
                    </p>
                </div>
            ),
            actionLabel: `Start Application for ${dep.name}`,
            onAction: () => {
                setModalInfo(null);
                navigate("/applications");
            }
        });

        // Mark as checked
        const updated = [...dependents];
        updated[depIndex].checked = true;
        setDependents(updated);
    }

    function handleAddDependentSubmit(e) {
        e.preventDefault();
        if (!newDepName.trim() || !newDepAge) return;
        const initials = newDepName.trim().split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) || "DP";
        const ageNum = parseInt(newDepAge, 10);
        const eligible = ageNum >= 18 && ageNum <= 35;
        setDependents([
            ...dependents,
            {
                initials,
                name: newDepName.trim(),
                relation: newDepRelation,
                age: ageNum,
                education: "Self-declared",
                checked: false,
                eligible,
                statusText: eligible ? "Eligible (Age 18-35)" : "Ineligible (Outside age limit)"
            }
        ]);
        setNewDepName("");
        setNewDepAge("");
        setShowAddDependent(false);
    }

    function handleReportDiscrepancy() {
        setModalInfo({
            title: "Report Age or Profile Discrepancy",
            body: (
                <div>
                    <p style={{ fontSize: "14px", color: "#334155", lineHeight: "1.6" }}>
                        Rahul Kumar&apos;s date of birth in our records is sourced directly from UIDAI / Aadhaar seeding (Age: 65 years).
                    </p>
                    <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "12px", borderRadius: "6px", marginBottom: "14px" }}>
                        <strong style={{ display: "block", color: "#0f172a", fontSize: "13px", marginBottom: "4px" }}>
                            To request an official correction:
                        </strong>
                        <ol style={{ margin: 0, paddingLeft: "18px", fontSize: "13px", color: "#475569", lineHeight: "1.6" }}>
                            <li>Visit your nearest Maha e-Seva Kendra or CSC Center in Nashik.</li>
                            <li>Carry original School Leaving Certificate or Municipal Birth Certificate.</li>
                            <li>Once updated in UIDAI, tap &quot;Re-sync Aadhaar&quot; in Sahayak Dashboard.</li>
                        </ol>
                    </div>
                    <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                        District Support Desk: <strong>1800-120-8040</strong> (Toll Free, 9 AM - 6 PM)
                    </p>
                </div>
            ),
            actionLabel: "Understood",
            onAction: () => setModalInfo(null)
        });
    }

    return (
        <div className="scheme-report-page">

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

                <div className="sidebar-label">CITIZEN OPERATIONS</div>

                <nav className="dashboard-nav">
                    <button className="dashboard-nav-item" onClick={() => navigate("/dashboard")}>
                        ▦ <span>Overview Dashboard</span>
                    </button>
                    <button className="dashboard-nav-item" onClick={() => navigate("/ai-conversation")}>
                        ▱ <span>AI Profile Conversation</span>
                    </button>
                    <button className="dashboard-nav-item active" onClick={() => navigate("/schemes")}>
                        ⚙ <span>Eligible Schemes</span>
                        <b>8</b>
                    </button>
                    <button className="dashboard-nav-item" onClick={() => navigate("/documents")}>
                        ▧ <span>Document Vault</span>
                        <b>3/5 Ready</b>
                    </button>
                    <button className="dashboard-nav-item" onClick={() => navigate("/life-events")}>
                        ◇ <span>Life Event Re-check</span>
                    </button>
                    <button className="dashboard-nav-item" onClick={() => navigate("/applications")}>
                        ☷ <span>Application Checklist</span>
                    </button>
                </nav>

                <div className="sidebar-label account-label">ACCOUNT & INTEGRITY</div>

                <nav className="dashboard-nav">
                    <button className="dashboard-nav-item" onClick={() => navigate("/my-schemes")}>
                        ♙ <span>My Profile & Saved</span>
                    </button>
                    <button
                        className="dashboard-nav-item"
                        onClick={() => {
                            setModalInfo({
                                title: "Settings & Privacy",
                                body: (
                                    <div>
                                        <p style={{ fontSize: "14px", color: "#334155" }}>
                                            Your citizen records are protected under the <strong>Digital Personal Data Protection (DPDP) Act 2023</strong>.
                                        </p>
                                        <p style={{ fontSize: "13px", color: "#64748b" }}>
                                            Data encryption: AES-256 local enclave. Aadhaar tokens are hashed and never shared with commercial entities.
                                        </p>
                                    </div>
                                ),
                                actionLabel: "Close",
                                onAction: () => setModalInfo(null)
                            });
                        }}
                    >
                        ♧ <span>Settings & Privacy</span>
                    </button>
                </nav>

                <div className="sidebar-disclaimer">
                    <strong>ⓘ</strong>
                    <span>Disbursements decided by central/state ministries.</span>
                </div>
            </aside>

            {/* MAIN */}
            <main className="scheme-report-main">

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
                        <button className="notification-button" title="Notifications">
                            ♧
                        </button>
                        <div className="citizen-mini">
                            <div>
                                <strong>Rahul Kumar</strong>
                                <span>Nashik, MH</span>
                            </div>
                            <div className="avatar">RK</div>
                        </div>
                    </div>
                </header>

                {/* BACK + STATUS */}
                <div className="report-toolbar">
                    <button onClick={() => navigate("/schemes")}>
                        ← Back to all schemes
                    </button>
                    <span>/</span>
                    <strong>Evaluation Report</strong>
                    <div className="report-status">
                        ⓘ Statutory Criteria Not Matched
                        <span>Gazette SD-2024/09</span>
                    </div>
                </div>

                {/* SCHEME HEADER */}
                <section className="scheme-report-header">
                    <div className="scheme-title-area">
                        <span className="ministry-label">
                            ♜ MINISTRY OF SKILL DEVELOPMENT AND ENTREPRENEURSHIP · CENTRAL GOVERNMENT
                        </span>
                        <h1>
                            Pradhan Mantri Yuva Sambal Yojana (PM-YSY)
                        </h1>
                        <p>
                            Based on official gazette guidelines, your profile does not meet the mandatory age eligibility threshold. The statutory framework strictly targets early-career applicants.
                        </p>
                    </div>

                    <div className="evaluation-reference">
                        <span>EVALUATION REFERENCE</span>
                        <strong>Citizen ID: **** 4912</strong>
                        <small>● Assessed: 24 Oct 2024</small>
                    </div>
                </section>

                {/* TWO COLUMN */}
                <section className="report-content">

                    {/* LEFT */}
                    <div className="report-left">

                        {/* CRITERIA */}
                        <div className="criteria-card">
                            <div className="criteria-heading">
                                <div>
                                    <h2>Eligibility Criteria Breakdown</h2>
                                    <p>Evaluation against official notification No. SD-2024/09-MSDE</p>
                                </div>
                                <span>☷</span>
                            </div>

                            <div className="criteria-table-head">
                                <span>REQUIREMENT</span>
                                <span>YOUR PROFILE DATA</span>
                                <span>OFFICIAL ASSESSMENT</span>
                            </div>

                            {criteria.map((item) => (
                                <div className="criteria-row" key={item.name}>
                                    <div>
                                        <strong>{item.name}</strong>
                                        <small>{item.rule}</small>
                                    </div>
                                    <div>
                                        <strong>{item.data}</strong>
                                        <small>{item.detail}</small>
                                    </div>
                                    <div>
                                        <span className={item.type === "fail" ? "assessment fail" : "assessment pass"}>
                                            {item.type === "fail" ? "×" : "✓"} {item.status}
                                        </span>
                                    </div>
                                </div>
                            ))}

                            <div className="criteria-footer">
                                <span>◉</span>
                                <p>Assessment engine ran against statutory rules updated 12 October 2024.</p>
                                <strong>3 of 4 Criteria Satisfied</strong>
                            </div>
                        </div>

                        {/* WHY NOT MATCHING */}
                        <div className="why-not-card">
                            <div className="why-heading">
                                <span>⚖</span>
                                <div>
                                    <h2>Why this scheme was marked as not matching</h2>
                                    <p>
                                        The Pradhan Mantri Yuva Sambal Yojana is strictly legislated for youth demographic empowerment aged 18 to 35 to facilitate first-generation enterprise incubation and trade apprenticeships.
                                    </p>
                                </div>
                            </div>

                            <div className="household-guidance">
                                <span>♟</span>
                                <p>
                                    <strong>Household Guidance:</strong> If you are reviewing this scheme on behalf of an eligible household member (such as a son or daughter aged 18–35), you can easily assess or initiate an application under their specific profile.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT */}
                    <aside className="report-right">

                        {/* ALTERNATIVES */}
                        <div className="next-schemes-card">
                            <div className="next-schemes-heading">
                                <div>
                                    <span>EMPOWERING NEXT STEPS</span>
                                    <h2>Schemes suited for your demographic</h2>
                                </div>
                                <b>
                                    8 <small>Matched</small>
                                </b>
                            </div>

                            <p className="next-intro">
                                We found multiple high-impact welfare programs directly calibrated for senior farmers in Maharashtra:
                            </p>

                            <div
                                className="matched-scheme"
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate("/schemes")}
                            >
                                <div>
                                    <strong>Senior Citizen Support & Pension (Shravanbal)</strong>
                                    <span>◉</span>
                                </div>
                                <p>Monthly social security assistance for Maharashtra citizens aged 65 years and above.</p>
                                <div className="scheme-tags">
                                    <span>Age 65+ Matched</span>
                                    <b>₹1,500 / month</b>
                                </div>
                            </div>

                            <div
                                className="matched-scheme"
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate("/schemes")}
                            >
                                <div>
                                    <strong>Rashtriya Vayoshri Yojana (RVY)</strong>
                                    <span>◉</span>
                                </div>
                                <p>Assisted living devices and physical aids for eligible senior citizens in rural areas.</p>
                                <div className="scheme-tags">
                                    <span>Age 60+ Matched</span>
                                    <b>100% Subsidized</b>
                                </div>
                            </div>

                            <div
                                className="matched-scheme"
                                style={{ cursor: "pointer" }}
                                onClick={() => navigate("/schemes")}
                            >
                                <div>
                                    <strong>PM-KISAN Samman Nidhi</strong>
                                    <span>◉</span>
                                </div>
                                <p>Direct income support of ₹6,000 per year for farmer families holding cultivable land.</p>
                                <div className="scheme-tags">
                                    <span>Landowner Matched</span>
                                    <b>₹6,000 / year</b>
                                </div>
                            </div>

                            <button className="view-all-schemes" onClick={() => navigate("/schemes")}>
                                View all 8 matching schemes <span>→</span>
                            </button>
                        </div>

                        {/* FAMILY MEMBER */}
                        <div className="family-member-card">
                            <div className="family-heading">
                                <span>♙</span>
                                <div>
                                    <h2>Applying for a family member?</h2>
                                    <p>
                                        You have {dependents.length + 2} family members recorded in your ration card registry. Younger household members can claim Yuva Sambal entitlements.
                                    </p>
                                </div>
                            </div>

                            {dependents.map((dep, idx) => (
                                <div className="family-person" key={dep.name}>
                                    <span>{dep.initials}</span>
                                    <div>
                                        <strong>{dep.name}</strong>
                                        <small>{dep.relation} · Age {dep.age} · {dep.education}</small>
                                    </div>
                                    <button
                                        onClick={() => handleCheckDependent(idx)}
                                        style={dep.checked ? { background: "#ecfdf5", color: "#047857", borderColor: "#a7f3d0" } : {}}
                                    >
                                        {dep.checked ? "✓ Checked" : "Check PM-YSY"}
                                    </button>
                                </div>
                            ))}

                            <button className="add-dependent" onClick={() => setShowAddDependent(!showAddDependent)}>
                                {showAddDependent ? "✕ Cancel" : "＋ Add new dependent profile"}
                            </button>

                            {showAddDependent && (
                                <form onSubmit={handleAddDependentSubmit} style={{ marginTop: "12px", padding: "12px", background: "#f8fafc", borderRadius: "6px", border: "1px solid #cbd5e1" }}>
                                    <div style={{ marginBottom: "8px" }}>
                                        <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px" }}>Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={newDepName}
                                            onChange={(e) => setNewDepName(e.target.value)}
                                            placeholder="e.g. Ramesh Kumar"
                                            style={{ width: "100%", padding: "6px 8px", fontSize: "13px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
                                        />
                                    </div>
                                    <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                                        <div style={{ flex: 1 }}>
                                            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px" }}>Relationship</label>
                                            <select
                                                value={newDepRelation}
                                                onChange={(e) => setNewDepRelation(e.target.value)}
                                                style={{ width: "100%", padding: "6px", fontSize: "13px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
                                            >
                                                <option>Son</option>
                                                <option>Daughter</option>
                                                <option>Spouse</option>
                                                <option>Grandchild</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                        <div style={{ width: "80px" }}>
                                            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px" }}>Age</label>
                                            <input
                                                type="number"
                                                required
                                                min="0"
                                                max="120"
                                                value={newDepAge}
                                                onChange={(e) => setNewDepAge(e.target.value)}
                                                placeholder="Age"
                                                style={{ width: "100%", padding: "6px", fontSize: "13px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        style={{ width: "100%", padding: "8px", background: "#0f2f4c", color: "white", border: "none", borderRadius: "4px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
                                    >
                                        Save Dependent to Vault
                                    </button>
                                </form>
                            )}
                        </div>

                    </aside>

                </section>

                {/* FOOTER */}
                <footer className="report-footer">
                    <div className="gazette-reference">
                        <span>▧</span>
                        <div>
                            <small>Official Gazette<br />Reference:</small>
                            <strong>
                                <a
                                    href="https://msde.gov.in"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: "inherit", textDecoration: "none" }}
                                >
                                    msde.gov.in/notifications/yuva-sambal-2024 ↗
                                </a>
                            </strong>
                        </div>
                    </div>

                    <div className="report-footer-actions">
                        <button onClick={handleReportDiscrepancy}>
                            ⚑ Report age discrepancy
                        </button>
                        <button onClick={() => navigate("/schemes")}>
                            ▦ Return to Explore Schemes
                        </button>
                    </div>
                </footer>

            </main>

            {/* GENERIC MODAL */}
            {modalInfo && (
                <div
                    className="document-modal-overlay"
                    onClick={() => setModalInfo(null)}
                    style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}
                >
                    <div
                        className="document-upload-modal"
                        onClick={(e) => e.stopPropagation()}
                        style={{ background: "#ffffff", maxWidth: "480px", width: "90%", padding: "24px", borderRadius: "8px", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    >
                        <button
                            className="modal-close"
                            onClick={() => setModalInfo(null)}
                            style={{ float: "right", background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#64748b" }}
                        >
                            ×
                        </button>
                        <h2 style={{ fontSize: "18px", color: "#0f172a", marginTop: 0, marginBottom: "16px" }}>{modalInfo.title}</h2>
                        {modalInfo.body}
                        <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                            <button
                                onClick={() => setModalInfo(null)}
                                style={{ padding: "8px 14px", border: "1px solid #cbd5e1", background: "#f8fafc", borderRadius: "4px", fontSize: "13px", cursor: "pointer" }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={modalInfo.onAction}
                                style={{ padding: "8px 16px", background: "#0f2f4c", color: "white", border: "none", borderRadius: "4px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
                            >
                                {modalInfo.actionLabel}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default SchemeReport;