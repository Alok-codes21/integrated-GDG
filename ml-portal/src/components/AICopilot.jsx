import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AICopilot() {
    const navigate = useNavigate();
    const location = useLocation();
    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [visible, setVisible] = useState(false);

    // Don't show on AI Conversation page as it has its own voice interface
    if (location.pathname === "/ai-conversation") return null;

    const startListening = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Voice navigation not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-IN";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            setListening(true);
            setVisible(true);
            setTranscript("Listening for a command (e.g., 'Go to documents', 'Show schemes')...");
        };

        recognition.onresult = (event) => {
            const speech = event.results[0][0].transcript.toLowerCase();
            setTranscript(`Heard: "${speech}"`);
            
            setTimeout(() => {
                if (speech.includes("dark")) {
                    document.body.classList.add("dark-theme");
                    setTranscript("Dark theme activated.");
                } else if (speech.includes("light")) {
                    document.body.classList.remove("dark-theme");
                    setTranscript("Light theme activated.");
                } else if (speech.includes("upload") && speech.includes("document")) {
                    navigate("/document-verification");
                } else if (speech.includes("saved") && speech.includes("scheme")) {
                    navigate("/my-schemes");
                } else if (speech.includes("my scheme")) {
                    navigate("/my-schemes");
                } else if (speech.includes("document") || speech.includes("vault")) {
                    navigate("/documents");
                } else if (speech.includes("scheme") || speech.includes("explore")) {
                    navigate("/schemes");
                } else if (speech.includes("dashboard") || speech.includes("home")) {
                    navigate("/dashboard");
                } else if (speech.includes("application") || speech.includes("status")) {
                    navigate("/applications");
                } else if (speech.includes("conversation") || speech.includes("chat")) {
                    navigate("/ai-conversation");
                } else if (speech.includes("log out") || speech.includes("sign out")) {
                    navigate("/login");
                } else {
                    setTranscript("Command not recognized. Try 'Turn on dark mode' or 'Upload document'.");
                    setTimeout(() => setVisible(false), 2500);
                    return;
                }
                
                // Keep the success message visible slightly longer before hiding
                setTimeout(() => setVisible(false), 2000);
            }, 1500);
        };

        recognition.onerror = () => {
            setListening(false);
            setTranscript("Error listening to command.");
            setTimeout(() => setVisible(false), 2000);
        };

        recognition.onend = () => {
            setListening(false);
        };

        recognition.start();
    };

    return (
        <>
            {/* Floating Voice Navigation Button */}
            <button
                onClick={startListening}
                style={{
                    position: "fixed",
                    bottom: "30px",
                    right: "30px",
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: listening ? "#dc2626" : "#2563eb",
                    color: "white",
                    border: "none",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                    cursor: "pointer",
                    zIndex: 9999,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    transition: "all 0.3s ease"
                }}
                title="Voice Navigation Copilot"
            >
                {listening ? "🎙" : "🤖"}
            </button>

            {/* Status Overlay */}
            {visible && (
                <div style={{
                    position: "fixed",
                    bottom: "100px",
                    right: "30px",
                    background: "white",
                    padding: "15px 20px",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                    zIndex: 9998,
                    border: "1px solid #e2e8f0",
                    maxWidth: "250px",
                    animation: "fadeIn 0.3s ease",
                    color: "#0f172a",
                    fontWeight: "500",
                    fontSize: "14px"
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                        <span style={{ fontSize: "18px" }}>✦</span>
                        <strong style={{ color: "#2563eb" }}>AI Copilot</strong>
                    </div>
                    {transcript}
                </div>
            )}
        </>
    );
}
