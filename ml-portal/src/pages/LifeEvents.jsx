import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import lifeEventService from "../services/lifeEventService";

function LifeEvents() {
    const navigate = useNavigate();

    const [milestones, setMilestones] = useState([]);

    const events = [
        {
            icon: "♙",
            title: "Turned 60 or 65",
            description:
                "Milestone age thresholds for state pensions, public transit concessions, Ayushman Bharat expansions, and assistive healthcare grants."
        },
        {
            icon: "▣",
            title: "Income or Livelihood Changed",
            description:
                "Crop yield variations, informal daily wage shifts, or job transitions affecting BPL, Antyodaya, or EWS welfare eligibility tiers."
        },
        {
            icon: "♢",
            title: "Health or Medical Transition",
            description:
                "Chronic illness diagnosis, planned surgical need, critical treatment support, or assistive senior care equipment grants."
        },
        {
            icon: "♧",
            title: "Family & Household Changes",
            description:
                "Marriage, newborn addition, or bereavement in the immediate family impacting NFSA ration quotas and family welfare ceilings."
        },
        {
            icon: "♢",
            title: "Farmland & Agriculture",
            description:
                "New agricultural lease agreement, land succession, drip irrigation adoption, or unseasonal crop loss assessment reports."
        },
        {
            icon: "⌂",
            title: "Education & Skill Training",
            description:
                "Child or dependent enrolling in college, polytechnic entry, vocational ITI certification, or central merit-cum-means scholarship eligibility."
        },
        {
            icon: "⌂",
            title: "Residential Relocation",
            description:
                "Relocation between Gram Panchayat villages, movement to municipal corporations, or interstate portability via One Nation One Ration."
        },
        {
            icon: "♿",
            title: "Disability Certificate Issued",
            description:
                "Official UDID generation or civil surgeon certification of special needs (40%+ threshold) triggering Divyangjan entitlements."
        },
        {
            icon: "▤",
            title: "Other Life Transition",
            description:
                "Custom circumstance, local natural calamity declaration, or newly declared central gazette notification for specialized cohorts."
        }
    ];

    useEffect(() => {
        async function loadEvents() {
            try {
                const data = await lifeEventService.getLifeEvents();
                setMilestones(data);
            } catch (err) {
                console.error("Failed to load life events:", err);
            }
        }
        loadEvents();
    }, []);

    function selectEvent(event) {
        navigate("/life-event-form", {
            state: {
                event: event.title
            }
        });
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

                    <button className="active">
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


                {/* PAGE HEADER */}
                <section className="life-events-header">

                    <div>
                        <div className="life-events-breadcrumb">
                            Citizen Entitlement Engine
                            <span>›</span>
                            Life Events Hub
                        </div>

                        <div className="life-event-status">
                            ● Automated Eligibility Re-check Enabled
                        </div>

                        <h1>
                            Life changes can change your
                            <br />
                            government benefits
                        </h1>

                        <p>
                            Tell Sahayak when something important changes in your life or household. We&apos;ll automatically reassess your eligibility across 450+ central and state schemes without requiring you to start over.
                        </p>
                    </div>

                    <button
                        className="record-life-event-button"
                        onClick={() => navigate("/life-event-form")}
                    >
                        <span>+</span>
                        Record a new life event
                    </button>

                </section>


                {/* PRESERVED DOSSIER */}
                <section className="preserved-dossier">

                    <div className="dossier-icon">
                        ✓
                    </div>

                    <div className="dossier-content">
                        <div className="dossier-title">
                            <strong>Preserved Dossier Architecture</strong>
                            <span>DPDP Act 2023 Compliant</span>
                        </div>

                        <p>
                            Statutory welfare criteria shift with milestones such as age thresholds (60 or 65), landholding succession, wage adjustments, or medical diagnosis. Previous records remain entirely intact; existing authenticated documents will automatically bind to newly unlocked schemes.
                        </p>
                    </div>

                    <div className="zero-data-badge">
                        ◉ Zero Data Re-entry Required
                    </div>

                </section>


                {/* RECORDED MILESTONES */}
                <section className="recorded-milestones">

                    <div className="section-heading-row">
                        <div>
                            <div className="section-kicker">
                                LIFE EVENT HISTORY
                            </div>
                            <h2>Your Recorded Milestones</h2>
                            <p>
                                Recent life updates and their automated re-evaluation statuses
                            </p>
                        </div>

                        <span className="records-count">
                            {milestones.length > 0 ? milestones.length : 2} records active
                        </span>
                    </div>

                    <div className="milestone-grid">

                        {/* MILESTONE 1 */}
                        <article className="milestone-card">
                            <div className="milestone-top">
                                <span className="milestone-tag">
                                    SENIOR CITIZEN THRESHOLD
                                </span>
                                <span>Logged 14 Oct 2026</span>
                            </div>

                            <h3>Turned 65 (Senior Citizen Milestone)</h3>
                            <p>
                                Statutory age transition reclassified Rahul Kumar under central and Maharashtra state senior welfare mandates.
                            </p>

                            <div className="milestone-result">
                                <strong>✓ Re-evaluation Complete</strong>
                                <span>
                                    3 New Schemes Unlocked: Shravanbal Yojana, Rashtriya Vayoshri, and Indira Gandhi National Old Age Pension.
                                </span>
                            </div>

                            <div className="milestone-footer">
                                <span>◉ Aadhaar DOB verified</span>
                                <button
                                    onClick={() =>
                                        navigate("/profile-reassessment", {
                                            state: {
                                                event: "Turned 65 (Senior Citizen Milestone)",
                                                date: "2026-10",
                                                income: "140000"
                                            }
                                        })
                                    }
                                >
                                    View Assessment
                                </button>
                            </div>
                        </article>


                        {/* MILESTONE 2 */}
                        <article className="milestone-card">
                            <div className="milestone-top">
                                <span className="milestone-tag">
                                    AGRARIAN LAND REGISTRY
                                </span>
                                <span>Logged 02 Aug 2026</span>
                            </div>

                            <h3>Land Record Updated (2.5 Acres Rainfed)</h3>
                            <p>
                                Partition mutation finalized in Nashik District revenue sub-circle, confirming marginal smallholder categorization.
                            </p>

                            <div className="milestone-result">
                                <strong>✓ Verified with Satbara 7/12</strong>
                                <span>
                                    Direct PM-KISAN database sync active. Subsidized drip irrigation entitlement unlocked.
                                </span>
                            </div>

                            <div className="milestone-footer">
                                <span>◉ MahaBhulekh synced</span>
                                <button
                                    onClick={() =>
                                        navigate("/profile-reassessment", {
                                            state: {
                                                event: "Land Record Updated (2.5 Acres Rainfed)",
                                                date: "2026-08",
                                                income: "180000"
                                            }
                                        })
                                    }
                                >
                                    View Assessment
                                </button>
                            </div>
                        </article>

                    </div>

                </section>


                {/* EVENT SELECTOR */}
                <section className="event-selector">

                    <div className="section-heading-row">
                        <div>
                            <div className="section-kicker">
                                QUICK EVENT REPORTING
                            </div>
                            <h2>What has changed recently?</h2>
                            <p>
                                Select a life change to review potential impact on your family&apos;s civic entitlements.
                            </p>
                        </div>
                    </div>

                    <div className="life-event-grid">
                        {events.map((event) => (
                            <article
                                className="life-event-card"
                                key={event.title}
                                onClick={() => selectEvent(event)}
                            >
                                <div className="life-event-icon">
                                    {event.icon}
                                </div>
                                <h3>{event.title}</h3>
                                <p>{event.description}</p>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        selectEvent(event);
                                    }}
                                >
                                    Select this event <span>→</span>
                                </button>
                            </article>
                        ))}
                    </div>

                </section>


                {/* VOICE ASSISTANT */}
                <section className="voice-guidance-card">
                    <div className="voice-guidance-icon">
                        ♧
                    </div>
                    <div>
                        <strong>Unsure which event applies to you?</strong>
                        <span>
                            Speak with the Sahayak voice assistant in Marathi, Hindi, or English to describe your situation simply.
                        </span>
                    </div>

                    <button onClick={() => navigate("/ai-conversation")}>
                        ♫ Start Voice Guidance
                    </button>
                </section>


                {/* PRIVACY */}
                <section className="life-event-privacy">
                    <span>◯</span>
                    <p>
                        <strong>Statutory Privacy Assurance:</strong> Your life event updates are solely used to compute statutory eligibility rules. Under the Digital Personal Data Protection (DPDP) Act 2023, data remains encrypted within your local civic vault and is never shared across third-party departments without explicit one-time citizen consent.
                    </p>
                </section>

            </main>
        </div>
    );
}

export default LifeEvents;