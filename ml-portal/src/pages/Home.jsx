import { Link } from "react-router-dom";
import Logo from "../components/Logo";

function Home() {
  return (
    <div className="home-page">

      {/* =========================
          NAVIGATION
      ========================= */}

      <header className="home-navbar">
        <div className="home-navbar-inner">

          <Link to="/" className="home-logo-link">
            <Logo />
          </Link>

          <nav className="home-nav">

            <a href="#how-it-works">
              How it works
            </a>

            <a href="#features">
              Features
            </a>

            <a href="#about">
              About
            </a>

          </nav>

          <div className="home-nav-actions">

            <Link
              to="/login"
              className="home-login"
            >
              Log in
            </Link>

            <Link
              to="/dashboard"
              className="home-start"
            >
              Get started
            </Link>

          </div>

        </div>
      </header>


      {/* =========================
          HERO
      ========================= */}

      <main>

        <section className="hero-section">

          <div className="hero-content">

            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              AI-powered welfare assistance
            </div>

            <h1>
              Government welfare,
              <span> made easier.</span>
            </h1>

            <p className="hero-description">
              Sahayak AI understands your situation, finds potentially
              relevant government schemes, explains why they match,
              and guides you through what to do next.
            </p>

            <div className="hero-actions">

              <Link
                to="/dashboard"
                className="hero-primary-button"
              >
                Find schemes for me
                <span>→</span>
              </Link>

              <a
                href="#how-it-works"
                className="hero-secondary-button"
              >
                See how it works
              </a>

            </div>

            <div className="hero-note">
              <span>🔒</span>
              Your information stays under your control.
            </div>

          </div>


          {/* HERO INTERACTION CARD */}

          <div className="hero-assistant">

            <div className="assistant-window">

              <div className="assistant-window-header">

                <div className="assistant-title">

                  <div className="assistant-icon">
                    S
                  </div>

                  <div>
                    <strong>Sahayak AI</strong>
                    <span>Your welfare guide</span>
                  </div>

                </div>

                <div className="assistant-status">
                  <span></span>
                  Online
                </div>

              </div>


              <div className="assistant-conversation">

                <div className="assistant-message">
                  <span className="message-avatar">
                    S
                  </span>

                  <div className="message-bubble assistant-bubble">
                    Tell me a little about yourself.
                    I'll help you discover schemes
                    that may be relevant to you.
                  </div>
                </div>


                <div className="assistant-message user-message">

                  <div className="message-bubble user-bubble">
                    I am 65 years old, a farmer from
                    Maharashtra and my family income
                    is around ₹1.8 lakh.
                  </div>

                </div>


                <div className="assistant-message">

                  <span className="message-avatar">
                    S
                  </span>

                  <div className="message-bubble assistant-bubble">

                    <div className="message-processing">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>

                    <p>
                      I found some information that
                      may help you.
                    </p>

                  </div>

                </div>

              </div>


              <Link
                to="/ai-conversation"
                className="assistant-input"
                style={{ display: "flex", textDecoration: "none" }}
              >
                <span>
                  Tell Sahayak about your situation...
                </span>

                <button type="button">
                  →
                </button>
              </Link>

            </div>

          </div>

        </section>


        {/* =========================
            TRUST / POSITIONING
        ========================= */}

        <section className="trust-section">

          <p>
            From discovering a scheme to knowing
            what you need next.
          </p>

          <div className="trust-items">

            <span>Understand</span>
            <i>→</i>

            <span>Verify</span>
            <i>→</i>

            <span>Explain</span>
            <i>→</i>

            <span>Prepare</span>
            <i>→</i>

            <span>Act</span>
            <i>→</i>

            <span>Re-check</span>

          </div>

        </section>


        {/* =========================
            HOW IT WORKS
        ========================= */}

        <section
          className="how-section"
          id="how-it-works"
        >

          <div className="home-section-heading">

            <span>
              HOW IT WORKS
            </span>

            <h2>
              From your situation
              to your next step.
            </h2>

            <p>
              You don't need to understand complicated
              scheme rules. Sahayak helps turn your
              situation into a clear welfare journey.
            </p>

          </div>


          <div className="journey-grid">

            <div className="journey-card">

              <div className="journey-number">
                01
              </div>

              <div className="journey-icon">
                💬
              </div>

              <h3>
                Tell us your situation
              </h3>

              <p>
                Type or speak naturally about your
                age, location, occupation, income
                and other important details.
              </p>

            </div>


            <div className="journey-card">

              <div className="journey-number">
                02
              </div>

              <div className="journey-icon">
                🧠
              </div>

              <h3>
                Sahayak understands
              </h3>

              <p>
                AI extracts the important information
                and builds a structured citizen profile.
              </p>

            </div>


            <div className="journey-card">

              <div className="journey-number">
                03
              </div>

              <div className="journey-icon">
                🔎
              </div>

              <h3>
                Find relevant schemes
              </h3>

              <p>
                Potentially relevant schemes are
                matched against your profile.
              </p>

            </div>


            <div className="journey-card">

              <div className="journey-number">
                04
              </div>

              <div className="journey-icon">
                ✓
              </div>

              <h3>
                Understand why
              </h3>

              <p>
                See the eligibility criteria behind
                each potential match instead of
                receiving an unexplained answer.
              </p>

            </div>


            <div className="journey-card">

              <div className="journey-number">
                05
              </div>

              <div className="journey-icon">
                📄
              </div>

              <h3>
                Prepare your documents
              </h3>

              <p>
                Identify which required documents
                you already have and which ones
                may still be missing.
              </p>

            </div>


            <div className="journey-card">

              <div className="journey-number">
                06
              </div>

              <div className="journey-icon">
                → 
              </div>

              <h3>
                Know what to do next
              </h3>

              <p>
                Get a clear action plan and access
                the official scheme information.
              </p>

            </div>

          </div>

        </section>


        {/* =========================
            FEATURES
        ========================= */}

        <section
          className="features-section"
          id="features"
        >

          <div className="home-section-heading">

            <span>
              WHAT MAKES SAHAYAK DIFFERENT
            </span>

            <h2>
              More than just a
              scheme search.
            </h2>

            <p>
              Sahayak combines personalized matching,
              explainable eligibility, document intelligence
              and multilingual interaction.
            </p>

          </div>


          <div className="feature-grid">

            <div className="feature-card feature-large">

              <div className="feature-card-content">

                <div className="feature-label">
                  01 · PERSONALIZED MATCHING
                </div>

                <h3>
                  Schemes based on
                  <span> your situation.</span>
                </h3>

                <p>
                  Sahayak considers information such as
                  age, income, location, occupation, family
                  size and other relevant eligibility factors.
                </p>

              </div>

              <div className="profile-preview">

                <div className="profile-preview-row">
                  <span>Age</span>
                  <strong>65 years</strong>
                </div>

                <div className="profile-preview-row">
                  <span>Occupation</span>
                  <strong>Farmer</strong>
                </div>

                <div className="profile-preview-row">
                  <span>Location</span>
                  <strong>Maharashtra</strong>
                </div>

                <div className="profile-preview-row">
                  <span>Annual income</span>
                  <strong>₹1.8 lakh</strong>
                </div>

              </div>

            </div>


            <div className="feature-card">

              <div className="feature-label">
                02 · EXPLAINABLE AI
              </div>

              <h3>
                Know exactly
                <span> why it matches.</span>
              </h3>

              <p>
                See the relevant criteria behind
                a potential match.
              </p>

              <div className="eligibility-mini">

                <div>
                  <span>✓</span>
                  Age requirement
                </div>

                <div>
                  <span>✓</span>
                  State requirement
                </div>

                <div>
                  <span>✓</span>
                  Income requirement
                </div>

              </div>

            </div>


            <div className="feature-card">

              <div className="feature-label">
                03 · DOCUMENT GAP ANALYSIS
              </div>

              <h3>
                Know what
                <span> you're missing.</span>
              </h3>

              <p>
                Check required documents before
                you begin an application.
              </p>

              <div className="document-mini">

                <div>
                  <span className="doc-check">✓</span>
                  Aadhaar
                </div>

                <div>
                  <span className="doc-check">✓</span>
                  Residence Proof
                </div>

                <div>
                  <span className="doc-warning">!</span>
                  Income Certificate
                </div>

              </div>

            </div>


            <div className="feature-card">

              <div className="feature-label">
                04 · MULTILINGUAL
              </div>

              <h3>
                Ask in the way
                <span> you're comfortable.</span>
              </h3>

              <p>
                Interact using natural language,
                including Hindi and English.
              </p>

              <div className="language-mini">
                <span>हिन्दी</span>
                <span>English</span>
                <span>Voice</span>
              </div>

            </div>


            <div className="feature-card feature-life-event">

              <div className="feature-label">
                05 · LIFE-EVENT ENGINE
              </div>

              <h3>
                Your circumstances change.
                <span> Sahayak checks again.</span>
              </h3>

              <p>
                Turning 60, starting college, losing a job
                or another important life event can trigger
                a new assessment of relevant opportunities.
              </p>

              <div className="life-event-flow">

                <div>
                  <strong>Life event</strong>
                  <span>Changed circumstances</span>
                </div>

                <span className="life-arrow">
                  →
                </span>

                <div>
                  <strong>Re-evaluate</strong>
                  <span>New possibilities</span>
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =========================
            FINAL CTA
        ========================= */}

        <section className="home-cta">

          <div>

            <span>
              THE RIGHT SCHEME.
              THE RIGHT PERSON.
              THE RIGHT TIME.
            </span>

            <h2>
              Let Sahayak help you
              find what may be available.
            </h2>

            <p>
              Start with your situation.
              We'll help you understand the possibilities.
            </p>

          </div>

          <Link
            to="/dashboard"
            className="cta-button"
          >
            Start with Sahayak
            <span>→</span>
          </Link>

        </section>


        {/* =========================
            FOOTER
        ========================= */}

        <footer
          className="home-footer"
          id="about"
        >

          <div className="footer-brand">

            <Logo />

            <p>
              Your AI-powered guide to
              government welfare schemes.
            </p>

          </div>

          <div className="footer-links">

            <div>
              <strong>Explore</strong>
              <Link to="/dashboard">
                Dashboard
              </Link>
              <Link to="/schemes">
                Schemes
              </Link>
              <Link to="/ai-conversation">
                Ask Sahayak
              </Link>
            </div>

            <div>
              <strong>Important</strong>
              <span>
                AI guidance is not an official
                government approval or guarantee.
              </span>
              <span>
                Always verify current requirements
                with the official scheme source.
              </span>
            </div>

          </div>

        </footer>

      </main>

    </div>
  );
}

export default Home;