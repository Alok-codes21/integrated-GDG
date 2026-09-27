import { useState } from "react";
import { useNavigate } from "react-router-dom";
import schemeService from "../services/schemeService";

function MySchemes() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("Potential matches");
    const [saved, setSaved] = useState(() => schemeService.getSavedSchemeIds());
    const [toastMessage, setToastMessage] = useState("");

    const allSchemes = [
        {
            id: "scheme-shravanbal",
            department: "DEPARTMENT OF SOCIAL JUSTICE & SPECIAL ASSISTANCE • GOVT. OF MAHARASHTRA",
            title: "Senior Citizen Support & Pension Scheme (Shravanbal Yojana)",
            description: "Provides monthly financial assistance to citizens aged 65 and above belonging to vulnerable low-income households. Disbursed directly through Aadhaar-enabled bank accounts.",
            status: "Potentially Relevant",
            statusType: "relevant",
            benefit: "₹1,500 / month",
            benefitText: "Direct treasury deposit",
            documentsTitle: "2 documents remaining",
            documents: "Income Certificate (valid FY26-27), Bank Seeding Verification",
            checked: "Last checked: 14 Oct 2026",
            action: "Continue application preparation",
            category: "Senior Citizens",
            isProgress: true,
            isCompleted: false
        },
        {
            id: "scheme-pmkisan",
            department: "MINISTRY OF AGRICULTURE & FARMERS WELFARE • CENTRAL SECTOR",
            title: "PM-KISAN Samman Nidhi",
            description: "Direct income support to all landholding farmer families across the country to assist agricultural inputs and domestic obligations.",
            status: "Ready to Apply",
            statusType: "ready",
            benefit: "₹6,000 / year",
            benefitText: "Direct benefit transfer (3 tranches)",
            documentsTitle: "All 4 required documents verified in vault",
            documents: "Aadhaar, Land Record (7/12 extract), Bank Passbook, eKYC status valid",
            checked: "Last checked: 12 Oct 2026",
            action: "Open official portal checklist",
            category: "Agriculture",
            isProgress: false,
            isCompleted: true
        },
        {
            id: "scheme-pmayg",
            department: "MINISTRY OF RURAL DEVELOPMENT",
            title: "Pradhan Mantri Awas Yojana (Gramin Housing)",
            description: "Provides direct financial grants for construction of secure, durable pucca houses with hygienic cooking spaces to homeless and rural families living in kutcha dwellings.",
            status: "Needs more information",
            statusType: "warning",
            benefit: "₹1.2 Lakh",
            benefitText: "Financial assistance for housing",
            documentsTitle: "Kutcha house survey verification needed",
            documents: "Answer 2 socio-economic questions to confirm Gram Panchayat prioritization list",
            checked: "Last checked: 08 Oct 2026",
            action: "Complete profile questions",
            category: "Housing & Rural",
            isProgress: false,
            isCompleted: false
        },
        {
            id: "scheme-solar",
            department: "ENERGY DEPARTMENT • GOVT. OF MAHARASHTRA",
            title: "Chief Minister Agriculture Solar Pump Scheme (Saur Krushi Pump)",
            description: "Subsidy up to 90–95% for installation of off-grid solar agricultural water pumps for small and marginal farmers whose conventional electricity connections are pending.",
            status: "In Review",
            statusType: "relevant",
            benefit: "Up to 95% Subsidy",
            benefitText: "Solar pump installation grant",
            documentsTitle: "7/12 Land extract under verification",
            documents: "Land Record (7/12), Electricity bill non-connection certificate",
            checked: "Last checked: 10 Oct 2026",
            action: "Track verification progress",
            category: "Agriculture",
            isProgress: true,
            isCompleted: false
        }
    ];

    function toggleSaved(schemeItem) {
        const id = schemeItem.id || schemeItem.title;
        const updated = schemeService.toggleSaveScheme(id);
        setSaved(updated);
        const isNowSaved = updated.includes(id);
        setToastMessage(isNowSaved ? `Saved "${schemeItem.title}" to My Schemes` : `Removed "${schemeItem.title}" from saved`);
        setTimeout(() => setToastMessage(""), 3000);
    }

    // Filter schemes based on active tab
    const displayedSchemes = allSchemes.filter((scheme) => {
        const id = scheme.id || scheme.title;
        const isSaved = saved.includes(id) || saved.includes(scheme.title);

        if (activeTab === "Saved") {
            return isSaved;
        }
        if (activeTab === "In progress") {
            return scheme.isProgress;
        }
        if (activeTab === "Completed") {
            return scheme.isCompleted;
        }
        // "Potential matches"
        return true;
    });

    const savedCount = allSchemes.filter(s => saved.includes(s.id) || saved.includes(s.title)).length;
    const inProgressCount = allSchemes.filter(s => s.isProgress).length;
    const completedCount = allSchemes.filter(s => s.isCompleted).length;

    const tabs = [
        {
            name: "Potential matches",
            count: 8
        },
        {
            name: "Saved",
            count: savedCount
        },
        {
            name: "In progress",
            count: inProgressCount
        },
        {
            name: "Completed",
            count: completedCount
        }
    ];

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

                    <button className="active">
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


                {/* TOAST */}
                {toastMessage && (
                    <div style={{
                        background: "#0f2f4c",
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
                <section className="my-schemes-header">

                    <div>
                        <div className="my-schemes-breadcrumb">
                            ● CITIZEN PORTFOLIO TRACKER
                        </div>
                        <h1>My Schemes</h1>
                        <p>
                            Track schemes you&apos;re interested in, evaluate your readiness, and organize your applications.
                        </p>
                    </div>

                    <div className="profile-readiness">
                        <div className="readiness-icon">
                            ⚙
                        </div>
                        <div>
                            <strong>85%</strong>
                            <span>Profile Readiness</span>
                        </div>
                    </div>

                </section>


                {/* TABS */}
                <div className="my-schemes-tabs">

                    {tabs.map((tab) => (
                        <button
                            key={tab.name}
                            className={
                                activeTab === tab.name
                                    ? "my-scheme-tab active"
                                    : "my-scheme-tab"
                            }
                            onClick={() => setActiveTab(tab.name)}
                        >
                            {tab.name}
                            <span>{tab.count}</span>
                        </button>
                    ))}

                </div>


                {/* ADVISORY */}
                <section className="application-advisory">

                    <div className="advisory-icon">
                        ⌁
                    </div>

                    <div className="advisory-content">
                        <strong>Application Advisory</strong>
                        <span>
                            You have 3 schemes ready for official application, and 2 schemes awaiting minor document updates.
                        </span>
                    </div>

                    <button onClick={() => navigate("/documents")}>
                        Audit Document Vault
                        <span>→</span>
                    </button>

                </section>


                {/* SCHEME CARDS */}
                {displayedSchemes.length === 0 ? (
                    <div style={{ padding: "40px", textAlign: "center", background: "#f8fafc", borderRadius: "8px", border: "1px dashed #cbd5e1", margin: "24px 0" }}>
                        <div style={{ fontSize: "32px", marginBottom: "8px" }}>♧</div>
                        <h3 style={{ fontSize: "16px", color: "#0f172a", marginBottom: "6px" }}>
                            No schemes in &quot;{activeTab}&quot; tab
                        </h3>
                        <p style={{ color: "#64748b", fontSize: "13px", maxWidth: "420px", margin: "0 auto 16px" }}>
                            {activeTab === "Saved"
                                ? "You have not saved any schemes yet. Browse verified programs and click 'Save for later' to pin them here."
                                : "No items currently match this lifecycle category."}
                        </p>
                        <button
                            onClick={() => navigate("/schemes")}
                            style={{ padding: "8px 16px", background: "#0f2f4c", color: "white", border: "none", borderRadius: "4px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
                        >
                            Explore Available Schemes →
                        </button>
                    </div>
                ) : (
                    <section className="my-schemes-list">
                        {displayedSchemes.map((scheme) => {
                            const id = scheme.id || scheme.title;
                            const isSaved = saved.includes(id) || saved.includes(scheme.title);

                            return (
                                <article
                                    className={`my-scheme-card ${scheme.statusType}`}
                                    key={scheme.title}
                                >
                                    <div className="my-scheme-card-main">
                                        <div className="my-scheme-card-header">
                                            <span className="my-scheme-department">
                                                {scheme.department}
                                            </span>
                                            <span className={`my-scheme-status ${scheme.statusType}`}>
                                                ● {scheme.status}
                                            </span>
                                        </div>

                                        <h2>{scheme.title}</h2>

                                        <p className="my-scheme-description">
                                            {scheme.description}
                                        </p>

                                        <div className="my-scheme-document-status">
                                            <div className="document-status-icon">
                                                {scheme.statusType === "ready" ? "✓" : "▣"}
                                            </div>
                                            <div>
                                                <strong>{scheme.documentsTitle}</strong>
                                                <span>{scheme.documents}</span>
                                            </div>
                                            <small>◷ {scheme.checked}</small>
                                        </div>

                                        <div className="my-scheme-footer">
                                            <button
                                                className="eligibility-link"
                                                onClick={() => navigate("/scheme-report")}
                                            >
                                                ◉ View eligibility criteria
                                            </button>

                                            <button
                                                className={isSaved ? "save-scheme saved" : "save-scheme"}
                                                onClick={() => toggleSaved(scheme)}
                                            >
                                                {isSaved ? "✓ Saved" : "♡ Save for later"}
                                            </button>

                                            <button
                                                className="continue-scheme"
                                                onClick={() => {
                                                    if (scheme.statusType === "warning") {
                                                        navigate("/incomplete-profile");
                                                    } else {
                                                        navigate("/applications");
                                                    }
                                                }}
                                            >
                                                {scheme.action}
                                                <span>→</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* BENEFIT */}
                                    <div className="my-scheme-benefit">
                                        <span>BENEFIT HIGHLIGHT</span>
                                        <strong>{scheme.benefit}</strong>
                                        <small>{scheme.benefitText}</small>
                                    </div>
                                </article>
                            );
                        })}
                    </section>
                )}


                {/* FOOTER NOTE */}
                <section className="my-schemes-footer-note">
                    <span className="footer-note-shield">
                        ◯
                    </span>
                    <span>
                        Sahayak guides your preparation. All statutory approvals are handled directly through official ministry portals.
                    </span>
                    <strong style={{ cursor: "pointer" }} onClick={() => navigate("/schemes")}>
                        Official Gazette Index
                    </strong>
                </section>

            </main>
        </div>
    );
}

export default MySchemes;