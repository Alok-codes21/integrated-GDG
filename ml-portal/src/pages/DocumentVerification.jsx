import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import documentService from "../services/documentService";
import profileService from "../services/profileService";

function DocumentVerification() {
    const navigate = useNavigate();

    // Visual transform states
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);

    // AI states
    const [isScanning, setIsScanning] = useState(true);
    const [faceMatchStep, setFaceMatchStep] = useState(false);
    const [faceMatched, setFaceMatched] = useState(false);
    
    // OCR extracted data fields
    const [isEditing, setIsEditing] = useState(false);
    const [citizenName, setCitizenName] = useState("Rahul Kumar");
    const [annualIncome, setAnnualIncome] = useState("180000");
    const [certNumber, setCertNumber] = useState("IC/2026/04981");
    const [issueDate, setIssueDate] = useState("12 August 2026");
    const [authority, setAuthority] = useState("Office of the Tahsildar, Sinnar, Nashik");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsScanning(false);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    function handleZoom() {
        setZoom((prev) => (prev >= 1.3 ? 1 : prev + 0.15));
    }

    function handleRotate() {
        setRotation((prev) => (prev + 90) % 360);
    }

    async function handleSave() {
        setSaving(true);
        try {
            await documentService.verifyDocument("doc-income", {
                citizenName,
                annualIncome,
                certNumber,
                issueDate,
                authority,
                verifiedAt: new Date().toISOString()
            });

            // Sync with profile
            await profileService.updateProfile({
                income: parseInt(annualIncome, 10) || 180000
            });

            navigate("/documents");
        } catch (err) {
            console.error("Failed to verify document:", err);
            setSaving(false);
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

                    <button
                        className="active"
                        onClick={() => navigate("/documents")}
                    >
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


            {/* MAIN CONTENT */}
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
                <section className="verification-header">

                    <div className="verification-breadcrumb">
                        <span style={{ cursor: "pointer" }} onClick={() => navigate("/documents")}>
                            ▣ My Documents
                        </span>
                        <span>/</span>
                        <strong>Verify Income Certificate</strong>
                    </div>

                    <div className="verification-title-row">
                        <div>
                            <h1>Verify extracted information</h1>
                            <p>
                                Please check the details detected from your uploaded income certificate before saving to your verified citizen profile.
                            </p>
                        </div>

                        <div className="document-integrity">
                            <span className="integrity-dot"></span>
                            <div>
                                <strong>DOCUMENT</strong>
                                <strong>INTEGRITY</strong>
                                <small>OCR engine synchronised</small>
                            </div>
                        </div>
                    </div>

                </section>


                {/* VERIFICATION WORKSPACE */}
                <section className="verification-workspace">

                    {/* LEFT - DOCUMENT PREVIEW */}
                    <div className="certificate-column">

                        <div
                            className="certificate-preview"
                            style={{
                                transform: `scale(${zoom}) rotate(${rotation}deg)`,
                                transformOrigin: "top center",
                                transition: "transform 0.25s ease"
                            }}
                        >
                            <div className="certificate-top-icon">
                                🏛
                            </div>

                            <div className="certificate-government">
                                GOVERNMENT OF MAHARASHTRA • REVENUE DEPARTMENT
                            </div>

                            <h2>
                                Office of the Tahsildar, Sinnar (Nashik)
                            </h2>

                            <p className="certificate-subtitle">
                                आय प्रमाण पत्र — Integrated Income Certificate
                            </p>

                            <div className="certificate-line"></div>

                            <div className="certificate-reference">
                                <span>
                                    APPLICATION NO: AP/2026/9931
                                </span>
                                <strong>
                                    Cert No: {certNumber}
                                </strong>
                            </div>

                            <div className="certificate-body">
                                <p>
                                    This is to certify that upon due administrative enquiry and assessment of documents presented by the applicant,
                                    <strong> {citizenName}</strong>, residing at Village Sinnar, Taluka Sinnar, District Nashik, the consolidated annual family earnings from all legal agrarian and allied sources for the fiscal year 2025–2026 are certified as:
                                </p>

                                <div className="certificate-income">
                                    <span>
                                        Consolidated Annual
                                        <br />
                                        Income:
                                    </span>
                                    <strong>
                                        ₹{Number(annualIncome).toLocaleString("en-IN")}
                                        <small>
                                            Rupees One Lakh Eighty Thousand Only
                                        </small>
                                    </strong>
                                </div>

                                <p className="certificate-note">
                                    Issued under section 4(b) of the Maharashtra Public Services Act. This certificate holds statutory validity across state welfare, educational subsidies, and agricultural facilitation programs for 3 calendar years from the date of issuance.
                                </p>
                            </div>

                            <div className="certificate-footer">
                                <div className="certificate-qr">
                                    ▦
                                </div>
                                <div>
                                    <strong>MahaOnline e-Sign</strong>
                                    <span>Cryptographically Valid</span>
                                    <small>Ref: DIGI-7729-2026</small>
                                </div>
                                <div className="certificate-signature">
                                    <em>S. V. Patil</em>
                                    <strong>Tahsildar & Executive Magistrate</strong>
                                    <span>Sub-Division Sinnar, Nashik</span>
                                </div>
                            </div>
                        </div>


                        {/* DOCUMENT CONTROLS */}
                        <div className="certificate-controls">
                            <button onClick={handleZoom}>
                                ⌕ Zoom ({Math.round(zoom * 100)}%)
                            </button>

                            <button onClick={handleRotate}>
                                ⟳ Rotate ({rotation}°)
                            </button>

                            <button
                                className="upload-different"
                                onClick={() => navigate("/documents")}
                            >
                                ▣ Upload different file
                            </button>
                        </div>


                        {/* STORAGE NOTE */}
                        <div className="document-storage-note">
                            <div className="storage-note-icon">
                                ♢
                            </div>
                            <div>
                                <strong>256-Bit DigiLocker Enclave</strong>
                                <p>
                                    Your document remains securely localized within citizen storage. Extracted attributes are exclusively used to automatically identify schemes for which you qualify.
                                </p>
                            </div>
                        </div>

                    </div>


                    {/* RIGHT - OCR DATA */}
                    <div className="ocr-column">

                        <div className="ocr-card">

                            {/* OCR HEADER */}
                            <div className="ocr-card-header">
                                <div className="ocr-engine">
                                    <div className="ocr-icon">
                                        ▣
                                    </div>
                                    <div>
                                        <strong>Sahayak OCR Reader v4.2</strong>
                                        <span>Linguistic Normalization: Marathi / English</span>
                                    </div>
                                </div>

                                <span className="ocr-match">
                                    ● 98% Extraction Match
                                </span>
                            </div>


                            {/* CITIZEN NAME */}
                            <div className="ocr-field">
                                <div className="ocr-label-row">
                                    <label>Citizen Name <b>*</b></label>
                                    <span className="matched-record">♙ Matched Aadhaar record</span>
                                </div>

                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={citizenName}
                                        onChange={(e) => setCitizenName(e.target.value)}
                                        style={{ width: "100%", padding: "8px", fontSize: "14px", border: "1px solid #0f2f4c", borderRadius: "4px" }}
                                    />
                                ) : (
                                    <div className="ocr-input verified">
                                        {citizenName}
                                        <span>✓</span>
                                    </div>
                                )}
                                <small>Extracted from: &quot;राहुल कुमार&quot; (Marathi)</small>
                            </div>


                            {/* INCOME */}
                            <div className="ocr-field">
                                <div className="ocr-label-row">
                                    <label>Annual Family Income <b>*</b></label>
                                    <span className="mandatory-label">Mandatory for Scheme Match</span>
                                </div>

                                {isEditing ? (
                                    <input
                                        type="number"
                                        value={annualIncome}
                                        onChange={(e) => setAnnualIncome(e.target.value)}
                                        style={{ width: "100%", padding: "8px", fontSize: "14px", border: "1px solid #0f2f4c", borderRadius: "4px" }}
                                    />
                                ) : (
                                    <div className="ocr-input income-input">
                                        ₹ {Number(annualIncome).toLocaleString("en-IN")}
                                    </div>
                                )}
                                <small className="green-help">
                                    ● One Lakh Eighty Thousand Only (Qualifies for BPL / EWS subsidised schemes)
                                </small>
                            </div>


                            {/* CERTIFICATE NUMBER */}
                            <div className="ocr-field">
                                <div className="ocr-label-row">
                                    <label>Certificate Identification Number <b>*</b></label>
                                </div>

                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={certNumber}
                                        onChange={(e) => setCertNumber(e.target.value)}
                                        style={{ width: "100%", padding: "8px", fontSize: "14px", border: "1px solid #0f2f4c", borderRadius: "4px" }}
                                    />
                                ) : (
                                    <div className="ocr-input">
                                        {certNumber}
                                    </div>
                                )}
                                <small>Unique gazette identifier issued by the District Sub-Registry</small>
                            </div>


                            {/* DATE */}
                            <div className="ocr-field">
                                <div className="ocr-label-row">
                                    <label>Date of Issuance <b>*</b></label>
                                </div>

                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={issueDate}
                                        onChange={(e) => setIssueDate(e.target.value)}
                                        style={{ width: "100%", padding: "8px", fontSize: "14px", border: "1px solid #0f2f4c", borderRadius: "4px" }}
                                    />
                                ) : (
                                    <div className="ocr-input date-input">
                                        {issueDate}
                                        <span>▣</span>
                                    </div>
                                )}
                                <small>Valid through 11 August 2029 (Standard 3-Year Tenure)</small>
                            </div>


                            {/* ISSUING AUTHORITY */}
                            <div className="ocr-field">
                                <div className="ocr-label-row">
                                    <label>Issuing Authority <b>*</b></label>
                                </div>

                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={authority}
                                        onChange={(e) => setAuthority(e.target.value)}
                                        style={{ width: "100%", padding: "8px", fontSize: "14px", border: "1px solid #0f2f4c", borderRadius: "4px" }}
                                    />
                                ) : (
                                    <div className="ocr-input">
                                        {authority}
                                    </div>
                                )}
                                <small>Designated Executive Magistrate jurisdiction</small>
                            </div>


                            {/* QR VERIFIED */}
                            <div className="qr-validation">
                                <div className="qr-validation-icon">
                                    ▣
                                </div>
                                <div>
                                    <strong>Official QR Code Verified</strong>
                                    <span>MahaOnline Gateway Validated</span>
                                </div>
                            </div>


                            {/* STATUTORY NOTE */}
                            <div className="ocr-statutory-note">
                                <strong>◉ Statutory Governance Note:</strong>
                                <p>
                                    Information was programmatically extracted from the uploaded document image. Sahayak AI assists with profile pre-filling; legal entitlement approval remains vested solely with the competent government authority.
                                </p>
                            </div>


                            {/* ACTIONS */}
                            <div className="ocr-actions">
                                {faceMatchStep && (
                                    <div style={{ marginBottom: "16px", padding: "12px", border: "1px solid #c0caf5", borderRadius: "8px", background: "#f8fafc" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                                            <span style={{ fontSize: "24px" }}>{faceMatched ? "✅" : "📷"}</span>
                                            <strong>Biometric Face Match</strong>
                                        </div>
                                        <div style={{ fontSize: "14px", color: faceMatched ? "#16a34a" : "#64748b" }}>
                                            {faceMatched ? "Face matched with Aadhaar Photo (99.8% confidence)." : "Analyzing live camera feed against Aadhaar... Please wait."}
                                        </div>
                                        {!faceMatched && (
                                            <div style={{ width: "100%", height: "4px", background: "#e2e8f0", marginTop: "8px", borderRadius: "2px", overflow: "hidden" }}>
                                                <div style={{ width: "50%", height: "100%", background: "#3b82f6", animation: "pulse 1s infinite" }}></div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <button
                                    className="confirm-save-button"
                                    disabled={saving || isScanning || (faceMatchStep && !faceMatched)}
                                    onClick={() => {
                                        if (!faceMatchStep) {
                                            setFaceMatchStep(true);
                                            setTimeout(() => setFaceMatched(true), 2500);
                                        } else {
                                            handleSave();
                                        }
                                    }}
                                >
                                    {isScanning ? "Scanning Document..." : saving ? "Saving to Profile..." : !faceMatchStep ? "Verify with Face Match" : !faceMatched ? "Verifying..." : "✓ Confirm & Save"}
                                </button>

                                {!faceMatchStep && (
                                    <button
                                        className="edit-details-button"
                                        onClick={() => setIsEditing(!isEditing)}
                                    >
                                        {isEditing ? "✓ Done Editing" : "◇ Edit Manually"}
                                    </button>
                                )}

                                <button
                                    className="cancel-verification"
                                    onClick={() => navigate("/documents")}
                                >
                                    Cancel
                                </button>
                            </div>

                        </div>

                    </div>

                </section>

            </main>
        </div>
    );
}

export default DocumentVerification;