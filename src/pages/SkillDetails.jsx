import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DEFAULT_SKILLS, readStorage, STORAGE_KEYS, writeStorage } from "../data/skills";
import "./SkillDetails.css";

function SkillDetails() {
  const { id } = useParams();
  const skills = readStorage(STORAGE_KEYS.skills, DEFAULT_SKILLS);
  const skill = skills.find((item) => String(item.id) === id);
  const profile = readStorage(STORAGE_KEYS.profile, { name: "Student" });

  const [message, setMessage] = useState("");
  const [learnerName, setLearnerName] = useState(profile.name || "Student");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!skill) return;

    const trimmedName = learnerName.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedMessage) {
      setError("Please add your name and a short message before submitting.");
      setSuccess("");
      return;
    }

    const requests = readStorage(STORAGE_KEYS.requests, []);
    const duplicateRequest = requests.some(
      (request) =>
        String(request.skillId) === String(skill.id) &&
        request.learnerName.trim().toLowerCase() === trimmedName.toLowerCase(),
    );

    if (duplicateRequest) {
      setError("You already sent a request for this skill.");
      setSuccess("");
      return;
    }

    const newRequest = {
      id: Date.now(),
      skillId: skill.id,
      skillTitle: skill.title,
      learnerName: trimmedName,
      message: trimmedMessage,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    writeStorage(STORAGE_KEYS.requests, [...requests, newRequest]);
    setMessage("");
    setError("");
    setSuccess("Your learning request has been submitted successfully.");
  };

  if (!skill) {
    return (
      <div className="skill-not-found">
        <h2>Skill not found</h2>
        <p>This skill may have been removed or no longer available.</p>
        <Link to="/explore" className="primary-btn">
          Back to explore
        </Link>
      </div>
    );
  }

  return (
    <div className="skill-details-page">
      <Link to="/explore" className="back-link">
        ← Back to explore
      </Link>

      <div className="skill-details-card">
        <div className="details-hero">
          <div>
            <span className="category-badge">{skill.category}</span>
            <h1>{skill.title}</h1>
          </div>
          <div className="provider-pill">By {skill.provider}</div>
        </div>

        <p className="details-description">{skill.description}</p>

        <div className="details-grid">
          <div className="detail-item">
            <span>Experience</span>
            <strong>{skill.experience}</strong>
          </div>
          <div className="detail-item">
            <span>Wants to learn</span>
            <strong>{skill.exchange || "Not specified"}</strong>
          </div>
          <div className="detail-item">
            <span>Location</span>
            <strong>{skill.location || "Remote"}</strong>
          </div>
        </div>

        <div className="request-panel">
          <h2>Request to learn</h2>
          <p>Introduce yourself and share what you want to learn from this exchange.</p>

          {success && <div className="request-success">{success}</div>}
          {error && <div className="request-error">{error}</div>}

          <form onSubmit={handleSubmit} className="request-form">
            <label>
              <span>Your name</span>
              <input value={learnerName} onChange={(event) => setLearnerName(event.target.value)} placeholder="Enter your name" />
            </label>

            <label>
              <span>Your message</span>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Hi! I’d love to learn this skill with you."
              />
            </label>

            <button type="submit" className="primary-btn">
              Send request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SkillDetails;
