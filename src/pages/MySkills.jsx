
import { useState } from "react";
import { Link } from "react-router-dom";
import "./MySkills.css";

function getSavedSkills() {
  try {
    return JSON.parse(localStorage.getItem("skills")) || [];
  } catch {
    return [];
  }
}

function MySkills() {
  const [skills, setSkills] = useState(getSavedSkills);

  const handleDelete = (id) => {
    const updatedSkills = skills.filter(
      (skill) => skill.id !== id
    );

    setSkills(updatedSkills);

    localStorage.setItem(
      "skills",
      JSON.stringify(updatedSkills)
    );
  };

  return (
    <div className="my-skills-container">
      <div className="my-skills-header">
        <h1>My Skills 💡</h1>
        <p>
          Manage the skills you have shared with the community.
        </p>
      </div>

      {skills.length === 0 ? (
        <div className="empty-skills">
          <h2>No Skills Added Yet!</h2>
          <p>Start sharing your knowledge with others.</p>
          <Link to="/add-skill">+ Offer a Skill</Link>
        </div>
      ) : (
        <div className="my-skills-grid">
          {skills.map((skill) => (
            <div className="my-skill-card" key={skill.id}>
              <span className="skill-category">
                {skill.category}
              </span>

              <h2>{skill.title}</h2>
              <p>{skill.description}</p>

              <div className="skill-details">
                <p>
                  <strong>Experience:</strong>{" "}
                  {skill.experience}
                </p>

                <p>
                  <strong>Want to Learn:</strong>{" "}
                  {skill.exchange || "Not specified"}
                </p>
              </div>

              <button
                className="delete-skill-btn"
                onClick={() => handleDelete(skill.id)}
              >
                Delete Skill
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MySkills;
