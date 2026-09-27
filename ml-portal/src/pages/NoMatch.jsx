import { useNavigate } from "react-router-dom";

function NoMatch() {
    const navigate = useNavigate();

    const categories = [
        {
            icon: "🚜",
            title: "Agriculture & Mechanization",
            count: "114 schemes",
            text: "Subsidies for farm tools, solar pumps, seed kits, drip irrigation, and Kisan..."
        },
        {
            icon: "♙",
            title: "Senior Citizen Pensions & Health",
            count: "48 schemes",
            text: "Monthly support, Ayushman Bharat senior entitlement, Rashtriya Vayoshri..."
        },
        {
            icon: "♧",
            title: "Skill Development & Rural Livelihood",
            count: "38 schemes",
            text: "Krishi Vigyan Kendra training, PMKVY certifications, artisan toolkits, and..."
        }
    ];

    return (
        <div className="no-match-page">

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

                    <button
                        className="dashboard-nav-item active"
                        onClick={() => navigate("/schemes")}
                    >
                        ⚙
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

            <main className="no-match-main">

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


                {/* SEARCH */}

                <section className="scheme-search-area">

                    <div className="scheme-search">

                        <span>⌕</span>

                        <input
                            value="drone subsidy aerospace training"
                            readOnly
                        />

                        <button>⊗</button>

                    </div>

                    <div className="active-criteria">

                        <span>ACTIVE CRITERIA:</span>

                        <button>
                            ◉ Maharashtra ×
                        </button>

                        <button>
                            ⚑ Farmer ×
                        </button>

                        <button>
                            ♙ Senior ×
                        </button>

                    </div>

                </section>


                {/* NO MATCH */}

                <section className="no-match-card">

                    <div className="no-match-icon">
                        ⌕
                        <small>×</small>
                    </div>

                    <h1>
                        We couldn't find a close match for{" "}
                        <em>
                            "drone subsidy aerospace training"
                        </em>
                    </h1>

                    <p>
                        We searched 450+ verified Central and
                        Maharashtra State welfare schemes, but found
                        no published guidelines matching these
                        specific terms. Try adjusting your search or
                        explore by category.
                    </p>

                    <div className="no-match-actions">

                        <button
                            className="primary-button"
                            onClick={() => navigate("/schemes")}
                        >
                            ↻
                            Clear search & reset filters
                        </button>

                        <button
                            className="secondary-button"
                            onClick={() => navigate("/schemes")}
                        >
                            ♧
                            Explore all 9 welfare categories
                        </button>

                    </div>

                </section>


                {/* SMART ASSIST */}

                <section className="smart-assist">

                    <div className="smart-icon">
                        ♧
                    </div>

                    <div className="smart-text">

                        <span>
                            SMART CITIZEN ASSIST
                            <b>Linguistic Normalization</b>
                        </span>

                        <strong>
                            Or tell Sahayak about your situation
                            in plain language
                        </strong>

                        <p>
                            Government schemes often use complex
                            statutory terminology (e.g.
                            <i>
                                "Sub-Mission on Agricultural
                                Mechanization (SMAM)"
                            </i>
                            instead of "drone grant"). Describe your
                            need and Sahayak will identify relevant
                            official gazettes.
                        </p>

                    </div>

                    <button
                        onClick={() =>
                            navigate("/ai-conversation")
                        }
                    >
                        🎙 Talk to Sahayak
                    </button>

                </section>


                {/* CATEGORIES */}

                <section className="popular-categories">

                    <div className="categories-heading">

                        <div>
                            <h2>
                                Browse Popular Verified Categories
                            </h2>

                            <p>
                                Central Gazette and Maharashtra State
                                Department listings
                            </p>
                        </div>

                        <span>
                            Updated 2 days ago
                        </span>

                    </div>


                    <div className="category-grid">

                        {categories.map((category) => (

                            <button
                                type="button"
                                className="category-card"
                                key={category.title}
                                onClick={() => {
                                    const cat = category.title.includes("Agriculture")
                                        ? "Agriculture"
                                        : category.title.includes("Senior")
                                            ? "Senior Citizens"
                                            : "All";
                                    navigate("/schemes", { state: { category: cat } });
                                }}
                            >

                                <div className="category-top">

                                    <span className="category-icon">
                                        {category.icon}
                                    </span>

                                    <b>
                                        {category.count}
                                    </b>

                                </div>

                                <h3>
                                    {category.title}
                                </h3>

                                <p>
                                    {category.text}
                                </p>

                                <div className="category-bottom">
                                    <span>
                                        {category.title.includes(
                                            "Agriculture"
                                        )
                                            ? "Includes Kisan Drone Scheme"
                                            : category.title.includes(
                                                "Senior"
                                            )
                                                ? "Direct DBT Benefits"
                                                : "Vocational & Technical"}
                                    </span>

                                    <strong>→</strong>
                                </div>

                            </button>

                        ))}

                    </div>

                </section>


                {/* GAZETTE */}

                <section className="gazette-notification">

                    <span className="gazette-icon">
                        ⚖
                    </span>

                    <p>
                        If you believe a newly notified government
                        gazette is missing, you can submit an official
                        notification link for indexing.
                    </p>

                    <button
                        type="button"
                        onClick={() => {
                            const url = window.prompt("Enter official gazette notification URL or reference number:");
                            if (url) {
                                alert("Gazette reference queued for verification with Central e-Gazette indexing pipeline.");
                            }
                        }}
                    >
                        ▣ Submit Gazette Notification
                    </button>

                </section>

            </main>

        </div>
    );
}

export default NoMatch;