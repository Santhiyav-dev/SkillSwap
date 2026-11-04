import { useState } from "react";
import { readStorage, STORAGE_KEYS, writeStorage } from "../data/skills";
import "./AddSkill.css";

const categoryIcons = {
  Programming: "💻",
  Design: "🎨",
  Business: "📈",
  Communication: "🗣️",
  Creative: "🎬",
  Languages: "🌍",
  Music: "🎵",
  Other: "✨",
};

function AddSkill() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    experience: "",
    exchange: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedTitle = formData.title.trim();
    const trimmedDescription = formData.description.trim();

    if (!trimmedTitle || !formData.category || !trimmedDescription || !formData.experience) {
      setError("Please complete all required fields before publishing.");
      setMessage("");
      return;
    }

    const existingSkills = readStorage(STORAGE_KEYS.skills, []);
    const profile = readStorage(STORAGE_KEYS.profile, { name: "Student" });

    const newSkill = {
      id: Date.now(),
      title: trimmedTitle,
      category: formData.category,
      description: trimmedDescription,
      experience: formData.experience,
      exchange: formData.exchange.trim(),
      provider: profile.name || "Student",
      icon: categoryIcons[formData.category] || "✨",
      featured: false,
      createdAt: new Date().toISOString(),
    };

    writeStorage(STORAGE_KEYS.skills, [...existingSkills, newSkill]);

    setMessage("Your skill has been added successfully.");
    setError("");
    setFormData({
      title: "",
      category: "",
      description: "",
      experience: "",
      exchange: "",
    });
  };

  return (
    <div className="add-skill-page">
      <div className="page-header">
        <div>
          <h1>Offer a skill</h1>
          <p>Share your expertise and help someone take their next step in learning.</p>
        </div>
      </div>

      <div className="add-skill-card">
        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="skill-form">
          <div className="form-grid">
            <label>
              <span>Skill name</span>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Example: Frontend mentoring"
              />
            </label>

            <label>
              <span>Category</span>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="">Select category</option>
                <option value="Programming">Programming</option>
                <option value="Design">Design</option>
                <option value="Business">Business</option>
                <option value="Communication">Communication</option>
                <option value="Creative">Creative</option>
                <option value="Languages">Languages</option>
                <option value="Music">Music</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>

          <label>
            <span>Description</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what you can teach and how you can help others learn."
            />
          </label>

          <div className="form-grid">
            <label>
              <span>Experience level</span>
              <select name="experience" value={formData.experience} onChange={handleChange}>
                <option value="">Select level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </label>

            <label>
              <span>Skill you want to learn</span>
              <input
                type="text"
                name="exchange"
                value={formData.exchange}
                onChange={handleChange}
                placeholder="Example: UX writing"
              />
            </label>
          </div>

          <button type="submit" className="primary-btn form-submit">
            Publish skill
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddSkill;
