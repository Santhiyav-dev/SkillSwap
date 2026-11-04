
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Explore.css";

function getSavedData(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

function Explore() {
  const [skills] = useState(() => getSavedData("skills"));
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [favourites, setFavourites] = useState(() =>
    getSavedData("favourites")
  );

  const toggleFavourite = (skill) => {
    const exists = favourites.some(
      (item) => item.id === skill.id
    );

    const updated = exists
      ? favourites.filter((item) => item.id !== skill.id)
      : [...favourites, skill];

    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  };

  const categories = [
    "All",
    ...new Set(
      skills.map((skill) => skill.category).filter(Boolean)
    ),
  ];

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = skill.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || skill.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="explore-container">
      <div className="explore-header">
        <h1>Explore Skills 🔍</h1>
        <p>
          Discover new skills, connect with people and
          start learning today.
        </p>
      </div>

      <div className="explore-controls">
        <input
          type="text"
          placeholder="Search skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="explore-results">
        <h2>Available Skills</h2>
        <p>{filteredSkills.length} skills found</p>
      </div>

      {filteredSkills.length === 0 ? (
        <div className="no-skills">
          <h2>No Skills Found 😕</h2>
          <p>
            Try another search or add a new skill to the community.
          </p>
          <Link to="/add-skill">+ Offer a Skill</Link>
        </div>
      ) : (
        <div className="explore-grid">
          {filteredSkills.map((skill) => {
            const isFavourite = favourites.some(
              (item) => item.id === skill.id
            );

            return (
              <div className="explore-card" key={skill.id}>
                <div className="explore-card-top">
                  <span className="category-badge">
                    {skill.category}
                  </span>

                  <button
                    className="favourite-btn"
                    onClick={() => toggleFavourite(skill)}
                    aria-label={
                      isFavourite
                        ? "Remove from favourites"
                        : "Add to favourites"
                    }
                  >
                    {isFavourite ? "❤️" : "🤍"}
                  </button>
                </div>

                <h3>{skill.title}</h3>
                <p>{skill.description}</p>

                <div className="explore-experience">
                  <strong>Experience:</strong>{" "}
                  {skill.experience}
                </div>

                <div className="exchange-info">
                  <strong>Wants to Learn:</strong>{" "}
                  {skill.exchange || "Not specified"}
                </div>

                <Link
                  to={`/skill/${skill.id}`}
                  className="view-skill-btn"
                >
                  View Skill →
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Explore;
