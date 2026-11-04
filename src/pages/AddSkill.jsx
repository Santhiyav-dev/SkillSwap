
import { useState } from "react";
import "./AddSkill.css";

function AddSkill() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    experience: "",
    exchange: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existingSkills =
      JSON.parse(localStorage.getItem("skills")) || [];

    const newSkill = {
      id: Date.now(),
      ...formData,
    };

    localStorage.setItem(
      "skills",
      JSON.stringify([...existingSkills, newSkill])
    );

    setMessage("Your skill has been added successfully!");

    setFormData({
      title: "",
      category: "",
      description: "",
      experience: "",
      exchange: "",
    });
  };

  return (
    <div className="add-skill-container">
      <div className="add-skill-card">
        <h1>Offer a Skill</h1>
        <p>Share your knowledge and help others learn something new.</p>

        {message && <div className="success-message">{message}</div>}

        <form onSubmit={handleSubmit}>
          <label>Skill Name</label>
          <input
            type="text"
            name="title"
            placeholder="Example: Web Development"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Programming">Programming</option>
            <option value="Design">Design</option>
            <option value="Languages">Languages</option>
            <option value="Music">Music</option>
            <option value="Business">Business</option>
            <option value="Other">Other</option>
          </select>

          <label>Description</label>
          <textarea
            name="description"
            placeholder="Describe the skill you want to teach..."
            value={formData.description}
            onChange={handleChange}
            required
          />

          <label>Experience Level</label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
          >
            <option value="">Select Experience</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>

          <label>Skill You Want to Learn in Exchange</label>
          <input
            type="text"
            name="exchange"
            placeholder="Example: UI/UX Design"
            value={formData.exchange}
            onChange={handleChange}
          />

          <button type="submit">Publish Skill</button>
        </form>
      </div>
    </div>
  );
}

export default AddSkill;
