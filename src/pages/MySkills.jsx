import { useState } from "react";
import { Link } from "react-router-dom";
import { DEFAULT_SKILLS, readStorage, STORAGE_KEYS, writeStorage } from "../data/skills";
import "./MySkills.css";

function MySkills() {
  const [skills, setSkills] = useState(() => readStorage(STORAGE_KEYS.skills, DEFAULT_SKILLS));
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    category: "",
    description: "",
    experience: "",
    exchange: "",
  });

  const persistSkills = (nextSkills) => {
    setSkills(nextSkills);
    writeStorage(STORAGE_KEYS.skills, nextSkills);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this skill?");
    if (!confirmed) return;

    const updatedSkills = skills.filter((skill) => skill.id !== id);
    persistSkills(updatedSkills);
    if (editingId === id) setEditingId(null);
  };

  const startEditing = (skill) => {
    setEditingId(skill.id);
    setEditForm({
      title: skill.title,
      category: skill.category,
      description: skill.description,
      experience: skill.experience,
      exchange: skill.exchange || "",
    });
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditForm((current) => ({ ...current, [name]: value }));
  };

  const saveEdit = (id) => {
    const trimmedTitle = editForm.title.trim();
    const trimmedDescription = editForm.description.trim();

    if (!trimmedTitle || !trimmedDescription || !editForm.category || !editForm.experience) {
      return;
    }

    const updatedSkills = skills.map((skill) =>
      skill.id === id
        ? {
            ...skill,
            title: trimmedTitle,
            category: editForm.category,
            description: trimmedDescription,
            experience: editForm.experience,
            exchange: editForm.exchange.trim(),
          }
        : skill,
    );

    persistSkills(updatedSkills);
    setEditingId(null);
  };

  return (
    <div className="my-skills-page">
      <div className="page-header">
        <div>
          <h1>My skills</h1>
          <p>Manage the skills you offer and keep your learning profile current.</p>
        </div>
      </div>

      {skills.length === 0 ? (
        <div className="empty-state">
          <h2>No skills shared yet</h2>
          <p>Start sharing your knowledge with the community.</p>
          <Link to="/add-skill" className="primary-btn">
            Offer a skill
          </Link>
        </div>
      ) : (
        <div className="skills-grid">
          {skills.map((skill) => {
            const isEditing = editingId === skill.id;

            return (
              <article className="skill-manager-card" key={skill.id}>
                {isEditing ? (
                  <div className="inline-form">
                    <input
                      name="title"
                      value={editForm.title}
                      onChange={handleEditChange}
                      placeholder="Skill title"
                    />
                    <select name="category" value={editForm.category} onChange={handleEditChange}>
                      <option value="">Category</option>
                      <option value="Programming">Programming</option>
                      <option value="Design">Design</option>
                      <option value="Business">Business</option>
                      <option value="Communication">Communication</option>
                      <option value="Creative">Creative</option>
                      <option value="Languages">Languages</option>
                      <option value="Music">Music</option>
                      <option value="Other">Other</option>
                    </select>
                    <textarea
                      name="description"
                      value={editForm.description}
                      onChange={handleEditChange}
                      placeholder="Description"
                    />
                    <select name="experience" value={editForm.experience} onChange={handleEditChange}>
                      <option value="">Experience</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>
                    <input
                      name="exchange"
                      value={editForm.exchange}
                      onChange={handleEditChange}
                      placeholder="Skill you want to learn"
                    />
                    <div className="inline-actions">
                      <button type="button" className="primary-btn" onClick={() => saveEdit(skill.id)}>
                        Save
                      </button>
                      <button type="button" className="ghost-btn" onClick={() => setEditingId(null)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="manager-top">
                      <span className="manager-tag">{skill.category}</span>
                      <span className="manager-icon">{skill.icon}</span>
                    </div>

                    <h2>{skill.title}</h2>
                    <p>{skill.description}</p>

                    <div className="manager-meta">
                      <p>
                        <strong>Experience:</strong> {skill.experience}
                      </p>
                      <p>
                        <strong>Wants to learn:</strong> {skill.exchange || "Not specified"}
                      </p>
                    </div>

                    <div className="card-actions">
                      <button type="button" className="ghost-btn" onClick={() => startEditing(skill)}>
                        Edit
                      </button>
                      <button type="button" className="danger-btn" onClick={() => handleDelete(skill.id)}>
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MySkills;
