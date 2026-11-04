
function SkillCard({ skill }) {
  return (
    <div className="skill-card">
      <div className="skill-icon">{skill.icon}</div>

      <span className="skill-category">{skill.category}</span>

      <h3>{skill.skill}</h3>

      <p>{skill.description}</p>

      <div className="student-info">
        <div className="student-avatar">
          {skill.name.charAt(0)}
        </div>

        <div>
          <strong>{skill.name}</strong>
          <small>{skill.level} Level</small>
        </div>
      </div>

      <button className="request-btn">
        Request to Learn →
      </button>
    </div>
  );
}

export default SkillCard;
