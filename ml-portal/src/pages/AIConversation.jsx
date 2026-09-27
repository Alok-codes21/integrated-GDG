import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import profileService from "../services/profileService";

function AIConversation() {
    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [language, setLanguage] = useState("English");
    const [isListening, setIsListening] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const [socialCategoryExtracted, setSocialCategoryExtracted] = useState(false);
    const [schemesCount, setSchemesCount] = useState(8);
    const [confidence, setConfidence] = useState(85);

    const [messages, setMessages] = useState([
        {
            type: "ai",
            time: "10:14 AM",
            text:
                "Namaste Rahul ji. I am your Sahayak welfare assistant. Tell me about yourself. For example, your age, where you live, what kind of work you do, and who lives with you."
        },
        {
            type: "user",
            time: "10:15 AM",
            text:
                "I am 65 years old. I live in a village in Maharashtra. I work as a farmer on 2.5 acres of land."
        },
        {
            type: "ai",
            time: "10:15 AM",
            text:
                "Thank you, Rahul ji. I have noted your age, occupation as a cultivator, and your district in Maharashtra. To check your eligibility for state pension and agricultural subsidies, what is your approximate annual family income?"
        },
        {
            type: "user",
            time: "10:16 AM",
            text:
                "Our total family income from farming and daily labor is around ₹1,80,000 per year."
        }
    ]);

    function handleSend(userText) {
        const text = userText || message;
        if (!text.trim()) return;

        const newMsg = {
            type: "user",
            time: "Now",
            text: text.trim()
        };

        setMessages((prev) => [...prev, newMsg]);
        setMessage("");
        setIsThinking(true);
        
        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
        }

        // Call backend ML AI extraction
        api.post('/ai/extract', { text: text.trim() })
            .then((res) => {
                if (res.data?.profile && Object.keys(res.data.profile).length > 0) {
                    profileService.updateProfile(res.data.profile);
                    if (res.data.confidence) setConfidence(Math.max(confidence, res.data.confidence));
                    if (res.data.profile.bpl) {
                        setSocialCategoryExtracted(true);
                        setSchemesCount(prev => Math.max(prev, 11));
                    }
                }
            })
            .catch(() => {});

        setTimeout(() => {
            setIsThinking(false);
            const lower = text.toLowerCase();
            let aiReply = "";

            if (lower.includes("ration") || lower.includes("card") || lower.includes("yes")) {
                setSocialCategoryExtracted(true);
                setSchemesCount(11);
                setConfidence(96);
                aiReply = "Dhanyavaad Rahul ji! I have successfully extracted your Orange Tier Ration Card details. This confirms your household classification under priority welfare ceilings. You are now newly eligible for: 1. Sanjay Gandhi Niradhar Anudan (₹1,500/mo), 2. Antyodaya Anna Yojana (Subsidized foodgrains), and 3. Agri Solar Pump Subsidy. Would you like to view the complete eligibility breakdown?";
            } else if (lower.includes("no") || lower.includes("not sure")) {
                aiReply = "Understood, Rahul ji. Even without a physical ration card readily available, your verified Aadhaar and landholding records (Survey 112/A, Sinnar) qualify you for PM-KISAN, Shravanbal Pension, and Rashtriya Vayoshri Yojana assistive kits. You can update card details anytime.";
            } else {
                aiReply = `Thank you for sharing, Rahul ji. I have analyzed "${text.trim()}" against verified Maharashtra and Central statutory gazettes. Your demographic profile remains eligible for smallholder farmer and senior citizen welfare benefits.`;
            }

            setMessages((prev) => [
                ...prev,
                {
                    type: "ai",
                    time: "Just now",
                    text: aiReply
                }
            ]);

            // ML Feature: Text-to-Speech for AI responses
            if ("speechSynthesis" in window) {
                const utterance = new SpeechSynthesisUtterance(aiReply);
                
                // Map UI language to BCP-47 tags
                const langMap = {
                    "English": "en-IN",
                    "हिन्दी": "hi-IN",
                    "मराठी": "mr-IN"
                };
                utterance.lang = langMap[language] || "en-IN";
                
                // Try to find a female voice or a specific language voice
                const voices = window.speechSynthesis.getVoices();
                const targetVoice = voices.find(v => v.lang === utterance.lang) || voices.find(v => v.name.includes("Female"));
                if (targetVoice) {
                    utterance.voice = targetVoice;
                }
                
                window.speechSynthesis.speak(utterance);
            }
        }, 900);
    }

    function handleVoiceInput() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (!SpeechRecognition) {
            alert("Speech recognition is not supported in this browser. Please use Chrome.");
            return;
        }

        const recognition = new SpeechRecognition();
        
        // Map UI language to BCP-47 tags
        const langMap = {
            "English": "en-IN",
            "हिन्दी": "hi-IN",
            "मराठी": "mr-IN"
        };
        recognition.lang = langMap[language] || "en-IN";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            handleSend(transcript);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    }

    function sendMessage(e) {
        e.preventDefault();
        handleSend();
    }

    return (
        <div className="ai-conversation-page">

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

                    <button className="dashboard-nav-item active">
                        ▱
                        <span>AI Profile Conversation</span>
                    </button>

                    <button
                        className="dashboard-nav-item"
                        onClick={() => navigate("/schemes")}
                    >
                        ◉
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

            <main className="ai-main">

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


                {/* PAGE HEADING */}

                <section className="ai-page-heading">

                    <div>

                        <span className="intake-label">
                            INTAKE MODULE
                            <b>● Direct Citizen Assessment</b>
                        </span>

                        <h1>
                            Let's understand your situation
                        </h1>

                        <p>
                            You can type naturally or use voice.
                            Sahayak extracts only the information
                            necessary for official scheme evaluation.
                        </p>

                    </div>


                    <div className="ai-controls">

                        <div className="language-switcher">

                            <span>Language:</span>

                            {["English", "हिन्दी", "मराठी"].map(
                                (item) => (
                                    <button
                                        key={item}
                                        className={
                                            language === item
                                                ? "active"
                                                : ""
                                        }
                                        onClick={() =>
                                            setLanguage(item)
                                        }
                                    >
                                        {item}
                                    </button>
                                )
                            )}

                        </div>

                        <div className="audio-status">
                            ● Audio narration active
                        </div>

                    </div>

                </section>


                {/* TWO COLUMN AREA */}

                <section className="ai-workspace">

                    {/* CONVERSATION */}

                    <div className="conversation-panel">

                        <div className="conversation-list">

                            {messages.map((item, index) => (

                                <div
                                    key={index}
                                    className={`conversation-message ${
                                        item.type
                                    }`}
                                >

                                    {item.type === "ai" && (
                                        <div className="message-avatar">
                                            ✦
                                        </div>
                                    )}

                                    <div className="message-content">

                                        <div className="message-meta">

                                            <strong>
                                                {item.type === "ai"
                                                    ? "Sahayak Assistant"
                                                    : "Rahul Kumar"}
                                            </strong>

                                            <span>
                                                {item.type === "ai"
                                                    ? "Govt Welfare Guide"
                                                    : ""}
                                            </span>

                                            <time>
                                                {item.time}
                                            </time>

                                        </div>

                                        <div className="message-bubble">
                                            {item.text}
                                        </div>

                                    </div>

                                </div>

                            ))}

                            {isThinking && (
                                <div className="conversation-message ai">
                                    <div className="message-avatar">✦</div>
                                    <div className="message-content">
                                        <div className="message-bubble" style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                                            <span style={{ fontSize: "13px", color: "#64748b" }}>Sahayak is analyzing government gazettes...</span>
                                            <span className="dot-pulse">●</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>


                        {/* QUICK REPLIES */}

                        <div className="quick-replies">

                            <span>
                                SUGGESTED QUICK REPLIES
                            </span>

                            <div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleSend(
                                            "Yes, we have an Orange Ration Card."
                                        )
                                    }
                                >
                                    ◉ Yes, we have one Ration Card
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleSend(
                                            "No ration card available."
                                        )
                                    }
                                >
                                    ○ No ration card
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleSend(
                                            "I am not sure where to check my ration card tier."
                                        )
                                    }
                                >
                                    ⓘ I am not sure where to check
                                </button>

                            </div>

                        </div>


                        {/* MESSAGE INPUT */}

                        <form
                            className="conversation-input"
                            onSubmit={sendMessage}
                        >

                            <textarea
                                value={message}
                                onChange={(e) =>
                                    setMessage(e.target.value)
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                                placeholder="Type your answer or speak naturally (e.g., about ration card, family members)..."
                                rows="3"
                            />

                            <div className="input-bottom">

                                <button
                                    type="button"
                                    className="speak-button"
                                    onClick={handleVoiceInput}
                                    style={isListening ? { background: "#fee2e2", color: "#b91c1c", borderColor: "#f87171" } : {}}
                                >
                                    {isListening ? "🔴 Listening (Speak now in MR / HI / EN)..." : "🎙 Tap to Speak in Marathi / Hindi / English"}
                                </button>

                                <button
                                    type="submit"
                                    className="send-button"
                                    disabled={isThinking || !message.trim()}
                                >
                                    Send
                                    <span>➤</span>
                                </button>

                            </div>

                        </form>

                        <div className="session-footer">
                            <span>
                                🔒 Local session storage active
                            </span>

                            <span>
                                Press Return to submit
                            </span>
                        </div>

                    </div>


                    {/* RIGHT PANEL */}

                    <aside className="ai-right-panel">

                        {/* PROFILE EXTRACTED */}

                        <div className="extracted-card">

                            <div className="extracted-heading">

                                <div>
                                    <span>
                                        PROFILE EXTRACTED IN REAL-TIME
                                    </span>

                                    <p>
                                        ◉ Information verified against
                                        official criteria
                                    </p>
                                </div>

                                <strong>{socialCategoryExtracted ? "6 / 6" : "5 / 6"}<br />{socialCategoryExtracted ? "Complete" : "Filled"}</strong>

                            </div>


                            <div className="extracted-items">

                                <div>
                                    <span>▣</span>

                                    <div>
                                        <label>Age</label>
                                        <strong>
                                            65 Years (Senior Citizen)
                                        </strong>
                                    </div>

                                    <b>✓ Extracted</b>
                                </div>


                                <div>
                                    <span>⌖</span>

                                    <div>
                                        <label>Location</label>
                                        <strong>
                                            Nashik, Maharashtra
                                        </strong>
                                    </div>

                                    <b>✓ Extracted</b>
                                </div>


                                <div>
                                    <span>♧</span>

                                    <div>
                                        <label>Occupation</label>
                                        <strong>
                                            Small & Marginal Farmer
                                        </strong>
                                    </div>

                                    <b>✓ Extracted</b>
                                </div>


                                <div>
                                    <span>◢</span>

                                    <div>
                                        <label>Landholding</label>
                                        <strong>
                                            2.5 Acres (Rainfed
                                            Cultivation)
                                        </strong>
                                    </div>

                                    <b>✓ Extracted</b>
                                </div>


                                <div>
                                    <span>₹</span>

                                    <div>
                                        <label>Annual Family Income</label>
                                        <strong>
                                            ₹1,80,000 / year
                                        </strong>
                                    </div>

                                    <b>✓ Extracted</b>
                                </div>


                                {socialCategoryExtracted ? (
                                    <div style={{ background: "#f0fdf4", borderColor: "#86efac" }}>
                                        <span style={{ color: "#16a34a" }}>✓</span>
                                        <div>
                                            <label>Social Category / Cards</label>
                                            <strong style={{ color: "#166534" }}>
                                                Orange Ration Card (APL)
                                            </strong>
                                        </div>
                                        <b style={{ color: "#16a34a" }}>✓ Extracted</b>
                                    </div>
                                ) : (
                                    <div className="pending-profile">
                                        <span>♧</span>
                                        <div>
                                            <label>Social Category / Cards</label>
                                            <strong>
                                                Awaiting citizen reply...
                                            </strong>
                                        </div>
                                        <b>⚠ Pending</b>
                                    </div>
                                )}

                            </div>


                            <div className="confidence-score">

                                <span>Confidence Score</span>

                                <div>
                                    <span style={{ width: `${confidence}%` }}></span>
                                </div>

                                <strong>{confidence}%</strong>

                            </div>

                        </div>


                        {/* LIVE EVALUATION */}

                        <div className="live-evaluation">

                            <div className="evaluation-top">

                                <span>
                                    REAL-TIME EVALUATION
                                </span>

                                <b>
                                    Live Match Engine
                                </b>

                            </div>

                            <div className="evaluation-number">
                                <strong>{schemesCount}</strong>
                                <span>Potential Schemes {socialCategoryExtracted && "(+3 Newly Unlocked!)"}</span>
                            </div>

                            <p>
                                {socialCategoryExtracted
                                    ? "4 Central Schemes and 7 Maharashtra State Schemes are currently aligned with your profile."
                                    : "4 Central Schemes and 4 Maharashtra State Schemes are currently aligned with your profile."
                                }
                            </p>

                            <div className="mini-scheme">
                                <span>
                                    PM-Kisan Samman Nidhi
                                </span>

                                <strong>₹6,000 / yr</strong>
                            </div>

                            <div className="mini-scheme">
                                <span>
                                    Shravanbal Seva State Pension
                                </span>

                                <strong>₹1,500 / mo</strong>
                            </div>

                            {socialCategoryExtracted && (
                                <div className="mini-scheme" style={{ borderLeft: "3px solid #16a34a" }}>
                                    <span>
                                        Antyodaya Anna Yojana (AAY)
                                    </span>

                                    <strong style={{ color: "#16a34a" }}>35 kg Foodgrain</strong>
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/schemes")
                                }
                            >
                                View {schemesCount} matching schemes
                                <span>→</span>
                            </button>

                        </div>


                        {/* PRIVACY */}

                        <div className="ai-privacy-card">

                            <strong>
                                ◉ Privacy Guarantee
                            </strong>

                            <p>
                                Data encrypted. Stored only on your
                                device/session unless you choose to
                                create a verified DigiLocker link.
                            </p>

                        </div>

                    </aside>

                </section>

            </main>

        </div>
    );
}

export default AIConversation;