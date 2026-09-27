import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import schemeService from "../services/schemeService";

function Schemes() {
    const navigate = useNavigate();
    const location = useLocation();

    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState(() => {
        return location.state?.category || "All";
    });
    const [saved, setSaved] = useState(() => schemeService.getSavedSchemeIds());
    const [sortBy, setSortBy] = useState("Relevance to profile");
    const [activeFilters, setActiveFilters] = useState([
        { id: "occupation", label: "Occupation: Farmer (Marginal)" },
        { id: "age", label: "Age: 60+ (Senior)" },
        { id: "income", label: "Income: Under ₹2 Lakhs" }
    ]);
    const [schemesList, setSchemesList] = useState([]);
    const [loading, setLoading] = useState(true);

    const categories = [
        "All",
        "Agriculture",
        "Senior Citizens",
        "Healthcare & Disability",
        "Housing & Rural",
        "Women & Children"
    ];

    useEffect(() => {
        async function loadSchemes() {
            setLoading(true);
            try {
                const data = await schemeService.getSchemes();
                setSchemesList(data);
            } catch (err) {
                console.error("Failed to load schemes:", err);
            } finally {
                setLoading(false);
            }
        }
        loadSchemes();
    }, []);

    function toggleSaved(schemeItem) {
        const id = schemeItem.id || schemeItem.title;
        const updated = schemeService.toggleSaveScheme(id);
        setSaved(updated);
    }

    function removeFilter(filterId) {
        setActiveFilters(activeFilters.filter(f => f.id !== filterId));
    }

    function resetFilters() {
        setActiveFilters([]);
        setActiveCategory("All");
        setSearch("");
    }

    const filteredSchemes = schemesList.filter((scheme) => {
        const matchesCategory =
            activeCategory === "All" ||
            scheme.category === activeCategory;

        const searchText = search.toLowerCase();

        const matchesSearch =
            !search ||
            scheme.title.toLowerCase().includes(searchText) ||
            scheme.description.toLowerCase().includes(searchText) ||
            (scheme.tags && scheme.tags.join(" ").toLowerCase().includes(searchText));

        return matchesCategory && matchesSearch;
    }).sort((a, b) => {
        if (sortBy === "Highest benefit") {
            // Simple heuristic sorting by benefit number
            return (b.benefit || "").localeCompare(a.benefit || "");
        }
        if (sortBy === "Newest schemes") {
            return (b.id || "").localeCompare(a.id || "");
        }
        // Default relevance
        return 0;
    });

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

                    <button className="active">
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
                            ● AADHAAR CONNECTED
                        </span>
                        <span className="citizen-id">
                            Citizen ID: **** 4912
                        </span>
                    </div>

                    <div className="topbar-right">
                        <span className="official-badge">
                            ● Official Govt Facilitation Portal
                        </span>

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


                {/* PAGE INTRO */}
                <section className="schemes-page-header">

                    <div>
                        <div className="schemes-breadcrumb">
                            ♧ WELFARE DIRECTORY • CENTRAL & STATE SCHEMES
                        </div>
                        <h1>Explore government schemes</h1>
                        <p>
                            Browse schemes by category or find direct fiscal support tailored to your civic standing.
                        </p>
                    </div>

                    <div className="profile-evaluation-strip" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                            <div className="evaluation-check">
                                ✓
                            </div>
                            <div>
                                <strong>Evaluating Rahul Kumar</strong>
                                <span>65 yrs • Farmer • Nashik, MH</span>
                                <small>8 schemes perfectly match your profile</small>
                            </div>
                        </div>
                        <button 
                            onClick={async () => {
                                setLoading(true);
                                try {
                                    const data = await schemeService.getSchemes();
                                    setSchemesList(data);
                                } catch (err) {
                                    console.error("Failed to refresh:", err);
                                } finally {
                                    setLoading(false);
                                }
                            }}
                            style={{ padding: '8px 16px', background: 'transparent', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                            ↻ Refresh Matches
                        </button>
                    </div>

                    {/* AI GENERATED SUMMARY */}
                    <div style={{
                        marginTop: "24px",
                        background: "linear-gradient(145deg, #f8fafc, #eff6ff)",
                        padding: "16px 20px",
                        borderRadius: "8px",
                        borderLeft: "4px solid #8b5cf6",
                        boxShadow: "0 2px 8px rgba(139, 92, 246, 0.15)"
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                            <span style={{ fontSize: "18px", color: "#8b5cf6" }}>✦</span>
                            <strong style={{ color: "#4c1d95" }}>Sahayak AI Generated Summary</strong>
                        </div>
                        <p style={{ color: "#334155", fontSize: "14px", lineHeight: "1.6", margin: 0 }}>
                            Based on your profile, I have found <strong>8 matching schemes</strong>. The most critical one is the <strong>PM-KISAN Samman Nidhi</strong>, which offers ₹6,000 annually. Since you are a senior citizen, you also qualify for <strong>Shravanbal Seva State Pension</strong>. I recommend uploading your pending Income Certificate to unlock 2 more state-level subsidies.
                        </p>
                    </div>

                </section>

                {/* SEARCH */}
                <section className="scheme-search-area">

                    <div className="scheme-search-box">
                        <span>⌕</span>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by scheme name, benefit, or category (e.g. pension, solar, kisan)"
                        />
                        {search && (
                            <button
                                onClick={() => setSearch("")}
                                style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", fontSize: "14px" }}
                            >
                                ×
                            </button>
                        )}
                    </div>

                    <button className="location-filter" onClick={() => setActiveCategory("All")}>
                        ◉ Maharashtra & All-India
                    </button>

                    <button
                        className="filter-button"
                        onClick={() => {
                            if (activeFilters.length === 0) {
                                setActiveFilters([
                                    { id: "occupation", label: "Occupation: Farmer (Marginal)" },
                                    { id: "age", label: "Age: 60+ (Senior)" },
                                    { id: "income", label: "Income: Under ₹2 Lakhs" }
                                ]);
                            } else {
                                setActiveFilters([]);
                            }
                        }}
                    >
                        ☷ Filters
                        <span>{activeFilters.length} active</span>
                    </button>

                </section>


                {/* ACTIVE FILTERS */}
                {activeFilters.length > 0 && (
                    <div className="active-filters">
                        <span>Active criteria:</span>

                        {activeFilters.map((f) => (
                            <button key={f.id} onClick={() => removeFilter(f.id)}>
                                {f.label} ×
                            </button>
                        ))}

                        <button className="reset-filters" onClick={resetFilters}>
                            Reset all filters
                        </button>
                    </div>
                )}


                {/* CATEGORY CHIPS */}
                <div className="scheme-category-list">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={
                                activeCategory === category
                                    ? "category-chip active"
                                    : "category-chip"
                            }
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                            {category === "All" && <span>{schemesList.length}+</span>}
                            {category === "Agriculture" && <span>114</span>}
                            {category === "Senior Citizens" && <span>48</span>}
                            {category === "Healthcare & Disability" && <span>63</span>}
                            {category === "Housing & Rural" && <span>52</span>}
                            {category === "Women & Children" && <span>38</span>}
                        </button>
                    ))}
                </div>


                {/* RESULTS HEADER */}
                <div className="scheme-results-header">
                    <div>
                        <h2>Showing {filteredSchemes.length} verified schemes</h2>
                        <span>{activeCategory !== "All" ? `Category: ${activeCategory}` : "All Departments"}</span>
                    </div>

                    <div className="scheme-sort">
                        <label>Sort by:</label>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option>Relevance to profile</option>
                            <option>Highest benefit</option>
                            <option>Newest schemes</option>
                        </select>
                    </div>
                </div>


                {/* SCHEME CARDS */}
                {loading ? (
                    <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
                        Loading verified government schemes...
                    </div>
                ) : filteredSchemes.length === 0 ? (
                    <div style={{ padding: "48px 24px", textAlign: "center", background: "#f8fafc", borderRadius: "8px", border: "1px dashed #cbd5e1", margin: "20px 0" }}>
                        <div style={{ fontSize: "36px", marginBottom: "12px" }}>⌕</div>
                        <h3 style={{ fontSize: "18px", color: "#0f172a", marginBottom: "8px" }}>No matching schemes found</h3>
                        <p style={{ color: "#64748b", maxWidth: "460px", margin: "0 auto 18px", fontSize: "14px" }}>
                            We couldn&apos;t find schemes matching &quot;{search}&quot; under &quot;{activeCategory}&quot;. You can explore why a scheme didn&apos;t match or view official gazette criteria.
                        </p>
                        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                            <button
                                onClick={resetFilters}
                                style={{ padding: "8px 16px", background: "#0f2f4c", color: "white", border: "none", borderRadius: "4px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
                            >
                                Reset Search & Filters
                            </button>
                            <button
                                onClick={() => navigate("/no-match")}
                                style={{ padding: "8px 16px", background: "#ffffff", color: "#0f2f4c", border: "1px solid #cbd5e1", borderRadius: "4px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
                            >
                                Why schemes didn&apos;t match →
                            </button>
                        </div>
                    </div>
                ) : (
                    <section className="scheme-list">
                        {filteredSchemes.map((scheme) => {
                            const schemeId = scheme.id || scheme.title;
                            const isSaved = saved.includes(schemeId) || saved.includes(scheme.title);

                            return (
                                <article
                                    className={`explore-scheme-card ${scheme.statusType || "relevant"}`}
                                    key={scheme.title}
                                >
                                    <div className="scheme-card-top">
                                        <span className="scheme-department">
                                            {scheme.department}
                                        </span>
                                        <span className={`scheme-status ${scheme.statusType || "relevant"}`}>
                                            {scheme.status}
                                        </span>
                                    </div>

                                    <div className="scheme-card-heading">
                                        <h3>{scheme.title}</h3>
                                        <p>{scheme.description}</p>
                                    </div>

                                    <div className="scheme-tags">
                                        {scheme.tags && scheme.tags.map((tag) => (
                                            <span key={tag}>{tag}</span>
                                        ))}
                                    </div>

                                    <div className="scheme-benefit">
                                        {scheme.benefit}
                                    </div>

                                    {scheme.rationale && scheme.rationale.length > 0 && (
                                        <div className="match-rationale">
                                            <strong>CITIZEN MATCH ENGINE RATIONALE:</strong>
                                            <div className="rationale-items">
                                                {scheme.rationale.map((reason, index) => (
                                                    <span
                                                        className={
                                                            scheme.warning && index === scheme.rationale.length - 1
                                                                ? "rationale-warning"
                                                                : ""
                                                        }
                                                        key={reason}
                                                    >
                                                        {scheme.warning && index === scheme.rationale.length - 1
                                                            ? "⚠"
                                                            : "✓"}{" "}
                                                        {reason}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="scheme-card-footer">
                                        <div className="scheme-card-actions">
                                            <button
                                                className="scheme-view-button"
                                                onClick={() => {
                                                    if (scheme.statusType === "potential") {
                                                        navigate("/incomplete-profile");
                                                    } else {
                                                        navigate("/scheme-report");
                                                    }
                                                }}
                                            >
                                                {scheme.button || "View scheme details"}
                                            </button>

                                            <button
                                                className={isSaved ? "save-scheme-button saved" : "save-scheme-button"}
                                                onClick={() => toggleSaved(scheme)}
                                            >
                                                {isSaved ? "✓ Saved" : "♡ Save for later"}
                                            </button>
                                        </div>

                                        <a
                                            href={scheme.officialUrl || "https://myscheme.gov.in"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="official-source"
                                            style={{ textDecoration: "none" }}
                                        >
                                            Official source ↗
                                        </a>
                                    </div>
                                </article>
                            );
                        })}
                    </section>
                )}

                {/* OFFICIAL NOTE */}
                <section className="scheme-official-note">
                    <div className="official-note-icon">
                        ◉
                    </div>
                    <div>
                        <strong>Official Civic Entitlement Verification Note</strong>
                        <p>
                            Sahayak AI is an assistive digital public service. Official eligibility criteria and approvals are administered solely by respective government departments. Matching outcomes are evaluated against recorded land and civil documentation in state data exchanges.
                        </p>
                    </div>
                </section>

            </main>
        </div>
    );
}

export default Schemes;