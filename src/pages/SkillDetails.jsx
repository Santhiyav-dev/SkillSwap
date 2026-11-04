
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./SkillDetails.css";

function getSavedData(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

function SkillDetails() {
  const { id } = useParams();

  const skills = getSavedData("skills");
  const skill = skills.find((item) => String(item.id) === id);

  const profile = (() => {
    try {
      return JSON.parse(localStorage.getItem("profile")) || {};
    } catch {
      return {};
    }
  })();

  const [message, setMessage] = useState("");
  const [learnerName, setLearnerName] = useState(
    profile.name || "Student"
  );
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!skill) return;

    const requests = getSavedData("requests");

    const newRequest = {
      id: Date.now(),
      skillId: skill.id,
      skillTitle: skill.title,
      learnerName,
      message,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "requests",
      JSON.stringify([...requests, newRequest])
    );

    setMessage("");
    setSuccess("Your learning request has been submitted!");
  };

  if (!skill) {
    return (
      <div className="skill-not-found">
        <h2>Skill Not Found 😕</h2>
        <p>This skill may have been deleted.</p>
        <Link to="/explore">Back to Explore Skills</Link>
      </div>
    );
  }

  return (
    <div className="skill-details-container">
      <Link to="/explore" className="back-link">
        ← Back to Explore
      </Link>

      <div className="skill-details-card">
        <span className="details-category">
          {skill.category}
        </span>

        <h1>{skill.title}</h1>

        <p className="details-description">
          {skill.description}
        </p>

        <div className="details-info">
          <p>
            <strong>Experience Level:</strong>{" "}
            {skill.experience}
          </p>

          <p>
            <strong>Wants to Learn:</strong>{" "}
            {skill.exchange || "Not specified"}
          </p>
        </div>

        <div className="request-section">
          <h2>Request to Learn 🤝</h2>
          <p>Send a message to express your interest in learning this skill.</p>

          {success && (
            <div className="request-success">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label>Your Name</label>
            <input
              type="text"
              value={learnerName}
              onChange={(e) => setLearnerName(e.target.value)}
              placeholder="Enter your name"
              required
            />

            <label>Your Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi! I am interested in learning this skill..."
              required
            />

            <button type="submit">
              Send Learning Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SkillDetails;
