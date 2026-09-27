import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ProfileSetup from "./pages/ProfileSetup";
import Dashboard from "./pages/Dashboard";
import AIConversation from "./pages/AIConversation";
import NoMatch from "./pages/NoMatch";
import IncompleteProfile from "./pages/IncompleteProfile";
import SchemeReport from "./pages/SchemeReport";
import Schemes from "./pages/Schemes";
import MySchemes from "./pages/MySchemes";
import Applications from "./pages/Applications";
import Documents from "./pages/Documents";
import DocumentVerification from "./pages/DocumentVerification";
import ProfileReassessment from "./pages/ProfileReassessment";
import LifeEvents from "./pages/LifeEvents";
import LifeEventForm from "./pages/LifeEventForm";
import AICopilot from "./components/AICopilot";

function App() {
  return (
    <>
      <AICopilot />
      <Routes>
        {/* 2. Public Home / Welfare Discovery (Page 2 of PDF) */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />

      {/* Authentication screens */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* 1. Basic Profile & Household (Page 1 of PDF) */}
      <Route path="/profile-setup" element={<ProfileSetup />} />

      {/* 3. Overview Dashboard (Page 3 of PDF) */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* 4. AI Profile Conversation (Page 4 of PDF) */}
      <Route path="/ai-conversation" element={<AIConversation />} />

      {/* 5. No Close Match (Page 5 of PDF) */}
      <Route path="/no-match" element={<NoMatch />} />

      {/* 6. Incomplete Profile / Eligibility (Page 6 of PDF) */}
      <Route path="/incomplete-profile" element={<IncompleteProfile />} />

      {/* 7. Scheme Evaluation Report (Page 7 of PDF) */}
      <Route path="/scheme-report" element={<SchemeReport />} />
      <Route path="/scheme-details" element={<Navigate to="/scheme-report" replace />} />

      {/* 8. Explore Government Schemes (Page 8 of PDF) */}
      <Route path="/schemes" element={<Schemes />} />

      {/* 9. My Schemes (Page 9 of PDF) */}
      <Route path="/my-schemes" element={<MySchemes />} />
      <Route path="/profile" element={<Navigate to="/my-schemes" replace />} />

      {/* 10. Application Tracker (Page 10 of PDF) */}
      <Route path="/applications" element={<Applications />} />

      {/* 11. Document Vault (Page 11 of PDF) */}
      <Route path="/documents" element={<Documents />} />

      {/* 12. Document Verification / OCR (Page 12 of PDF) */}
      <Route path="/document-verification" element={<DocumentVerification />} />

      {/* 13. Profile Re-assessment (Page 13 of PDF) */}
      <Route path="/profile-reassessment" element={<ProfileReassessment />} />

      {/* 14. Life Event Hub (Page 14 of PDF) */}
      <Route path="/life-events" element={<LifeEvents />} />

      {/* 15. Life Event Form (Page 15 of PDF) */}
      <Route path="/life-event-form" element={<LifeEventForm />} />

      {/* Fallback wildcard route placed at the end */}
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;