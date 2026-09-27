function SectionHeader({
  eyebrow,
  title,
  description,
  action
}) {
  return (
    <div className="section-header">
      <div className="section-header-content">

        {eyebrow && (
          <span className="section-eyebrow">
            {eyebrow}
          </span>
        )}

        <h2>{title}</h2>

        {description && (
          <p>{description}</p>
        )}

      </div>

      {action && (
        <div className="section-header-action">
          {action}
        </div>
      )}
    </div>
  );
}

export default SectionHeader;
