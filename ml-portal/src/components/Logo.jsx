function Logo({ light = false }) {
  return (
    <div className={`logo ${light ? "logo-light" : ""}`}>
      <div className="logo-mark">
        S
      </div>

      <div className="logo-text">
        <strong>Sahayak</strong>
        <span>AI</span>
      </div>
    </div>
  );
}

export default Logo;
