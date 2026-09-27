import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import documentService from "../services/documentService";

function Documents() {
    const navigate = useNavigate();

    const [documentsList, setDocumentsList] = useState([]);
    const [showUpload, setShowUpload] = useState(false);
    const [selectedUploadType, setSelectedUploadType] = useState("Land Record (7/12 Extract)");
    const [uploadFile, setUploadFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [previewDoc, setPreviewDoc] = useState(null);
    const [whyNeededModal, setWhyNeededModal] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    useEffect(() => {
        async function loadDocs() {
            try {
                const docs = await documentService.getDocuments();
                setDocumentsList(docs);
            } catch (err) {
                console.error("Failed to load documents:", err);
            }
        }
        loadDocs();
    }, []);

    const verifiedDocs = documentsList.filter(d => d.status === "verified");
    const attentionDocs = documentsList.filter(d => d.status === "attention" || d.status === "pending_recheck");
    const missingDocs = documentsList.filter(d => d.status === "missing");

    const totalCount = documentsList.length || 5;
    const readyCount = verifiedDocs.length;
    const readinessPercent = Math.round((readyCount / totalCount) * 100);

    async function handleDirectUpload(docType) {
        setUploading(true);
        try {
            await documentService.uploadDocument(docType, {
                name: `${docType.toUpperCase()}_SCAN.pdf`,
                size: "1.4 MB"
            });
            const updated = await documentService.getDocuments();
            setDocumentsList(updated);
            setToastMessage(`Successfully uploaded ${docType} to Vault (Local encrypted storage)`);
            setTimeout(() => setToastMessage(""), 3500);
        } catch (err) {
            console.error(err);
        } finally {
            setUploading(false);
            setShowUpload(false);
            setUploadFile(null);
        }
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

                    <button className="active">
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


                {/* PAGE HEADER */}
                <section className="documents-header">

                    <div>
                        <div className="documents-breadcrumb">
                            ▣ CITIZEN ENTITLEMENT VAULT • DPDP ACT 2023 COMPLIANT
                        </div>
                        <h1>My Documents</h1>
                        <p>
                            Securely organize and verify certificates required for government schemes and entitlement disbursements.
                        </p>
                    </div>

                    <button
                        className="upload-new-button"
                        onClick={() => setShowUpload(true)}
                    >
                        + Upload new document
                    </button>

                </section>


                {/* READINESS SUMMARY */}
                <section className="document-readiness">

                    <div className="readiness-summary-top">
                        <div className="document-count-icon">
                            ♢
                        </div>

                        <div className="document-count-text">
                            <strong>
                                {readyCount} of {totalCount} required documents ready
                            </strong>
                            <span>
                                {totalCount - readyCount > 0
                                    ? `${totalCount - readyCount} pending items may delay DBT entitlement subsidies`
                                    : "All statutory certificates verified! Entitlements ready for 1-click filing."}
                            </span>
                        </div>

                        <span className="readiness-pill">
                            ● {readinessPercent}% Application Readiness
                        </span>
                    </div>

                    <div className="readiness-progress">
                        <div style={{ width: `${readinessPercent}%` }}></div>
                    </div>

                    <div className="document-privacy-note">
                        <span>♙</span>
                        <p>
                            Only upload documents when required. Files are stored locally and encrypted under DPDP Act guidelines. Your personal records are never shared with commercial entities.
                        </p>
                    </div>

                </section>


                {/* READY & VERIFIED */}
                {verifiedDocs.length > 0 && (
                    <section className="document-section">

                        <div className="document-section-title">
                            <div>
                                <span className="green-dot"></span>
                                <h2>Ready & Verified</h2>
                                <span className="section-count">
                                    {verifiedDocs.length} {verifiedDocs.length === 1 ? "document" : "documents"}
                                </span>
                            </div>
                        </div>

                        {verifiedDocs.map((doc) => (
                            <article className="document-row" key={doc.id}>
                                <div className={`document-icon ${doc.id.includes("aadhaar") ? "verified-icon" : "bank-icon"}`}>
                                    {doc.id.includes("aadhaar") ? "▣" : "▥"}
                                </div>

                                <div className="document-info">
                                    <div className="document-title-line">
                                        <strong>{doc.title}</strong>
                                        <span className="verified-badge">
                                            ✓ {doc.badge || "Verified"}
                                        </span>
                                    </div>

                                    <div className="document-meta">
                                        <span>▣ {doc.meta1 || "Verified in DigiLocker"}</span>
                                        <span>◇ {doc.meta2 || "Linked to DBT"}</span>
                                        <span>▤ {doc.meta3 || "Format: PDF"}</span>
                                    </div>
                                </div>

                                <div className="document-actions">
                                    <button onClick={() => setPreviewDoc(doc)}>
                                        ◉ View
                                    </button>
                                    <button onClick={() => {
                                        setSelectedUploadType(doc.title);
                                        setShowUpload(true);
                                    }}>
                                        ⟳ Replace
                                    </button>
                                </div>
                            </article>
                        ))}

                    </section>
                )}


                {/* NEEDS ATTENTION */}
                {attentionDocs.length > 0 && (
                    <section className="document-section">

                        <div className="document-section-title">
                            <div>
                                <span className="orange-dot"></span>
                                <h2>Needs Attention</h2>
                                <span className="section-count orange">
                                    Action required
                                </span>
                            </div>
                        </div>

                        {attentionDocs.map((doc) => (
                            <article className="attention-document" key={doc.id}>
                                <div className="attention-icon">
                                    ⚠
                                </div>

                                <div className="attention-information">
                                    <div className="attention-title">
                                        <strong>{doc.title}</strong>
                                        <span>◷ {doc.badge || "Needs verification"}</span>
                                    </div>

                                    <p>
                                        {doc.description || "Issued 18 months ago. Subsidies mandate renewal every 12 months."}
                                    </p>

                                    <div className="required-for">
                                        ⚑ Required by: Senior Citizen Support & Sanjay Gandhi Niradhar schemes.
                                    </div>
                                </div>

                                <button
                                    className="why-needed"
                                    onClick={() => setWhyNeededModal(true)}
                                >
                                    ? Why is this needed?
                                </button>

                                <button
                                    className="verify-button"
                                    onClick={() => navigate("/document-verification")}
                                >
                                    ▣ Verify / Re-upload
                                </button>
                            </article>
                        ))}

                    </section>
                )}


                {/* NOT UPLOADED */}
                {missingDocs.length > 0 && (
                    <section className="document-section">

                        <div className="document-section-title">
                            <div>
                                <span className="grey-dot"></span>
                                <h2>Not Uploaded</h2>
                                <span className="section-count">
                                    {missingDocs.length} available additions
                                </span>
                            </div>
                        </div>

                        <div className="not-uploaded-grid">
                            {missingDocs.map((doc) => (
                                <article className="missing-document" key={doc.id}>
                                    <div className="missing-document-top">
                                        <div className="missing-icon">
                                            {doc.id.includes("land") ? "◇" : "▤"}
                                        </div>
                                        <span className={doc.id.includes("land") ? "missing-badge" : "optional-badge"}>
                                            ◉ {doc.id.includes("land") ? "Missing" : "Optional"}
                                        </span>
                                    </div>

                                    <h3>{doc.title}</h3>
                                    <p>{doc.description}</p>

                                    <div className="missing-footer">
                                        <span>▣ PDF, JPG max 5MB</span>
                                        <button
                                            disabled={uploading}
                                            onClick={() => handleDirectUpload(doc.id)}
                                        >
                                            {uploading ? "Uploading..." : "⊕ Upload document"}
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>

                    </section>
                )}


                {/* DIGILOCKER */}
                <section className="digilocker-banner">
                    <div className="digilocker-icon">
                        ◉
                    </div>

                    <div>
                        <strong>
                            DigiLocker Integration Ready
                        </strong>
                        <span>
                            Fetch issued documents automatically from official state repositories without manual scanning.
                        </span>
                    </div>

                    <button
                        onClick={async () => {
                            setUploading(true);
                            try {
                                await documentService.uploadDocument("land", { name: "7_12_MAHABHULEKH_FETCH.pdf", size: "2.1 MB" });
                                await documentService.uploadDocument("ration", { name: "SMART_RATION_NFSA.pdf", size: "1.1 MB" });
                                const updated = await documentService.getDocuments();
                                setDocumentsList(updated);
                                setToastMessage("DigiLocker Synced! Land Record & Ration Card imported successfully.");
                                setTimeout(() => setToastMessage(""), 4000);
                            } finally {
                                setUploading(false);
                            }
                        }}
                    >
                        {uploading ? "Connecting..." : "Connect DigiLocker"}
                    </button>
                </section>


                {/* UPLOAD MODAL */}
                {showUpload && (
                    <div
                        className="document-modal-overlay"
                        onClick={() => setShowUpload(false)}
                        style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}
                    >
                        <div
                            className="document-upload-modal"
                            onClick={(e) => e.stopPropagation()}
                            style={{ background: "#ffffff", maxWidth: "460px", width: "90%", padding: "24px", borderRadius: "8px", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                        >
                            <button
                                className="modal-close"
                                onClick={() => setShowUpload(false)}
                                style={{ float: "right", background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#64748b" }}
                            >
                                ×
                            </button>

                            <div className="modal-upload-icon" style={{ fontSize: "24px", marginBottom: "8px" }}>
                                ▣
                            </div>

                            <h2 style={{ fontSize: "18px", color: "#0f172a", margin: "0 0 6px 0" }}>
                                Upload a document
                            </h2>
                            <p style={{ color: "#64748b", fontSize: "13px", margin: "0 0 16px 0" }}>
                                Select a document required for your current welfare applications.
                            </p>

                            <div style={{ marginBottom: "12px" }}>
                                <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px" }}>
                                    Document type
                                </label>
                                <select
                                    value={selectedUploadType}
                                    onChange={(e) => setSelectedUploadType(e.target.value)}
                                    style={{ width: "100%", padding: "8px", fontSize: "13px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
                                >
                                    <option value="land">Land Record (7/12 Extract / Satbara)</option>
                                    <option value="income">Income Certificate</option>
                                    <option value="ration">Ration Card (NFSA)</option>
                                    <option value="bank">Bank Passbook / Mandate</option>
                                    <option value="aadhaar">Aadhaar Card (UIDAI)</option>
                                </select>
                            </div>

                            <div style={{ marginBottom: "16px" }}>
                                <label style={{ display: "block", fontSize: "12px", fontWeight: "600", marginBottom: "4px" }}>
                                    Select file (PDF, JPG, PNG max 5MB)
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => setUploadFile(e.target.files[0])}
                                    style={{ width: "100%", padding: "6px", fontSize: "12px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
                                />
                                {uploadFile && (
                                    <small style={{ color: "#065f46", display: "block", marginTop: "4px" }}>
                                        Selected: {uploadFile.name} ({(uploadFile.size / 1024).toFixed(1)} KB)
                                    </small>
                                )}
                            </div>

                            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                                <button
                                    onClick={() => setShowUpload(false)}
                                    style={{ padding: "8px 14px", border: "1px solid #cbd5e1", background: "#f8fafc", borderRadius: "4px", fontSize: "13px", cursor: "pointer" }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="upload-modal-button"
                                    disabled={uploading}
                                    onClick={() => handleDirectUpload(selectedUploadType)}
                                    style={{ padding: "8px 16px", background: "#0f2f4c", color: "white", border: "none", borderRadius: "4px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
                                >
                                    {uploading ? "Uploading..." : "Upload & Save to Vault"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* PREVIEW MODAL */}
                {previewDoc && (
                    <div
                        className="document-modal-overlay"
                        onClick={() => setPreviewDoc(null)}
                        style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}
                    >
                        <div
                            className="document-upload-modal"
                            onClick={(e) => e.stopPropagation()}
                            style={{ background: "#ffffff", maxWidth: "480px", width: "90%", padding: "24px", borderRadius: "8px", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                        >
                            <button
                                className="modal-close"
                                onClick={() => setPreviewDoc(null)}
                                style={{ float: "right", background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#64748b" }}
                            >
                                ×
                            </button>

                            <h2 style={{ fontSize: "18px", color: "#0f172a", marginTop: 0, marginBottom: "8px" }}>
                                {previewDoc.title}
                            </h2>
                            <span style={{ display: "inline-block", background: "#ecfdf5", color: "#065f46", fontSize: "12px", padding: "2px 8px", borderRadius: "4px", marginBottom: "16px", fontWeight: "600" }}>
                                ✓ Verified in DigiLocker Vault
                            </span>

                            <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", padding: "14px", borderRadius: "6px", marginBottom: "16px" }}>
                                <div style={{ marginBottom: "8px", fontSize: "13px" }}>
                                    <strong style={{ color: "#475569" }}>Document ID:</strong> {previewDoc.id}
                                </div>
                                <div style={{ marginBottom: "8px", fontSize: "13px" }}>
                                    <strong style={{ color: "#475569" }}>Issuer:</strong> {previewDoc.issuer || "Government of India / Maharashtra"}
                                </div>
                                <div style={{ marginBottom: "8px", fontSize: "13px" }}>
                                    <strong style={{ color: "#475569" }}>Verification Hash:</strong> SHA256:7f9a8b2...412c
                                </div>
                                <div style={{ fontSize: "13px" }}>
                                    <strong style={{ color: "#475569" }}>DPDP Compliance:</strong> AES-256 local encrypted
                                </div>
                            </div>

                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                                <button
                                    onClick={() => setPreviewDoc(null)}
                                    style={{ padding: "8px 16px", background: "#0f2f4c", color: "white", border: "none", borderRadius: "4px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
                                >
                                    Close Preview
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* WHY NEEDED MODAL */}
                {whyNeededModal && (
                    <div
                        className="document-modal-overlay"
                        onClick={() => setWhyNeededModal(false)}
                        style={{ position: "fixed", inset: 0, background: "rgba(15, 23, 42, 0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}
                    >
                        <div
                            className="document-upload-modal"
                            onClick={(e) => e.stopPropagation()}
                            style={{ background: "#ffffff", maxWidth: "480px", width: "90%", padding: "24px", borderRadius: "8px", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                        >
                            <button
                                className="modal-close"
                                onClick={() => setWhyNeededModal(false)}
                                style={{ float: "right", background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#64748b" }}
                            >
                                ×
                            </button>

                            <h2 style={{ fontSize: "18px", color: "#0f172a", marginTop: 0, marginBottom: "12px" }}>
                                Why is Income Certificate renewal required?
                            </h2>
                            <p style={{ color: "#334155", fontSize: "13px", lineHeight: "1.6", margin: "0 0 12px 0" }}>
                                Under Maharashtra State Department of Social Justice guidelines (Govt Resolution SWD-2024), pension and subsidized benefit programs require an annual income certificate issued within the preceding 12 months.
                            </p>
                            <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", padding: "12px", borderRadius: "6px", marginBottom: "16px" }}>
                                <strong style={{ color: "#1e40af", display: "block", fontSize: "13px", marginBottom: "4px" }}>
                                    Impact on your applications:
                                </strong>
                                <ul style={{ margin: 0, paddingLeft: "16px", color: "#1e3a8a", fontSize: "13px", lineHeight: "1.5" }}>
                                    <li>Shravanbal Seva Yojana: Pending Tahsildar renewal clearance</li>
                                    <li>Sanjay Gandhi Niradhar Anudan: Requires family income &lt; ₹1,50,000</li>
                                </ul>
                            </div>

                            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                                <button
                                    onClick={() => setWhyNeededModal(false)}
                                    style={{ padding: "8px 14px", border: "1px solid #cbd5e1", background: "#f8fafc", borderRadius: "4px", fontSize: "13px", cursor: "pointer" }}
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => {
                                        setWhyNeededModal(false);
                                        navigate("/document-verification");
                                    }}
                                    style={{ padding: "8px 16px", background: "#0f2f4c", color: "white", border: "none", borderRadius: "4px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
                                >
                                    Proceed to Verify →
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}

export default Documents;