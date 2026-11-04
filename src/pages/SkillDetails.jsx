import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  DEFAULT_SKILLS,
  getCurrentUser,
  getRequestsSentBy,
  readStorage,
  STORAGE_KEYS,
  createLearningRequest,
} from "../data/skills";
import "./SkillDetails.css";

function SkillDetails() {
  const { id } = useParams();
  const storedSkills = readStorage(STORAGE_KEYS.skills, DEFAULT_SKILLS);
  const skills = Array.isArray(storedSkills) ? storedSkills : DEFAULT_SKILLS;
  const skill = skills.find((item) => String(item.id) === id);
  const currentUser = getCurrentUser();

  const [message, setMessage] = useState("");
  const [hasPendingRequest, setHasPendingRequest] = useState(() =>
    skill
      ? getRequestsSentBy(currentUser.id).some(
          (request) => String(request.skillId) === String(skill.id) && request.status === "Pending",
        )
      : false,
  );
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!skill) return;

    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      setError("Please add a short message before submitting.");
      setSuccess("");
      return;
    }

    try {
      const result = createLearningRequest(skill, trimmedMessage);
      if (!result.ok) {
        setError(result.error);
        setSuccess("");
        return;
      }

      setMessage("");
      setHasPendingRequest(true);
      setError("");
      setSuccess("Your learning request has been submitted successfully.");
    } catch {
      setError("Your request could not be saved. Please try again.");
      setSuccess("");
    }
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

          <div className="request-form">
            <label>
              <span>Requesting as</span>
              <input value={currentUser.name} readOnly aria-readonly="true" />
            </label>

            {hasPendingRequest ? (
              <p className="request-success">You already have a pending request for this skill.</p>
            ) : (
              <form onSubmit={handleSubmit} className="request-form">
                <label>
                  <span>Your message</span>
                  <textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Hi! I’d love to learn this skill with you."
                    required
                  />
                </label>

                <button type="submit" className="primary-btn">
                  Send request
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillDetails;
