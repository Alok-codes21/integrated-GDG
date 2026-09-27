import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";

function Navbar() {
  return (
    <header className="navbar">

      <div className="navbar-inner">

        <Link to="/" className="navbar-brand">
          <Logo />
        </Link>

        <nav className="navbar-links">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/schemes"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Schemes
          </NavLink>

          <NavLink
            to="/documents"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Documents
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            My Profile
          </NavLink>

        </nav>

        <div className="navbar-actions">

          <Link
            to="/assistant"
            className="assistant-nav-button"
          >
            <span>✦</span>
            Ask Sahayak
          </Link>

          <Link
            to="/profile"
            className="profile-mini"
            aria-label="Open profile"
          >
            <span>YC</span>
          </Link>

        </div>

      </div>

    </header>
  );
}

export default Navbar;