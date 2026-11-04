import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  DEFAULT_SKILLS,
  readStorage,
  STORAGE_KEYS,
  writeStorage,
} from "../data/skills";
import "./Explore.css";

function Explore() {
  const [skills] = useState(() => {
    const storedSkills = readStorage(STORAGE_KEYS.skills, DEFAULT_SKILLS);
    return Array.isArray(storedSkills)
      ? storedSkills.filter((skill) => skill && typeof skill === "object")
      : DEFAULT_SKILLS;
  });
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [experience, setExperience] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [favourites, setFavourites] = useState(() => readStorage(STORAGE_KEYS.favourites, []));

  const categories = ["All", ...new Set(skills.map((skill) => skill.category).filter(Boolean))];

  const filteredSkills = useMemo(() => {
    const nextSkills = skills.filter((skill) => {
      const matchesSearch = skill.title.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || skill.category === category;
      const matchesExperience = experience === "All" || skill.experience === experience;
      return matchesSearch && matchesCategory && matchesExperience;
    });

    switch (sortBy) {
      case "latest":
        return [...nextSkills].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "name":
        return [...nextSkills].sort((a, b) => a.title.localeCompare(b.title));
      case "experience":
        return [...nextSkills].sort((a, b) => {
          const levels = { Beginner: 1, Intermediate: 2, Advanced: 3, Expert: 4 };
          return (levels[b.experience] || 0) - (levels[a.experience] || 0);
        });
      default:
        return [...nextSkills].sort((a, b) => Number(b.featured) - Number(a.featured));
    }
  }, [category, experience, search, skills, sortBy]);

  const toggleFavourite = (skill) => {
    const exists = favourites.some((item) => item.id === skill.id);
    const updated = exists
      ? favourites.filter((item) => item.id !== skill.id)
      : [...favourites, skill];

    setFavourites(updated);
    writeStorage(STORAGE_KEYS.favourites, updated);
  };

  return (
    <div className="explore-page">
      <div className="page-header">
        <div>
          <h1>Explore skills</h1>
          <p>Find practical learning opportunities and connect with people who can guide your next step.</p>
        </div>
      </div>

      <div className="explore-panel">
        <div className="toolbar">
          <label className="search-box">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by skill name"
              aria-label="Search skills"
            />
          </label>

          <label className="filter-box">
            <span>Category</span>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="filter-box">
            <span>Level</span>
            <select value={experience} onChange={(event) => setExperience(event.target.value)}>
              <option value="All">All levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </label>

          <label className="filter-box">
            <span>Sort by</span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="featured">Featured</option>
              <option value="latest">Recently added</option>
              <option value="name">Name</option>
              <option value="experience">Experience</option>
            </select>
          </label>
        </div>

        <div className="results-strip">
          <h2>Available skills</h2>
          <span>{filteredSkills.length} result(s)</span>
        </div>

        {filteredSkills.length === 0 ? (
          <div className="empty-state">
            <h2>No matching skills</h2>
            <p>Try another search or add a new skill to the community.</p>
            <Link to="/add-skill" className="primary-btn">
              Offer a skill
            </Link>
          </div>
        ) : (
          <div className="explore-grid">
            {filteredSkills.map((skill) => {
              const isFavourite = favourites.some((item) => item.id === skill.id);

              return (
                <article className="explore-card" key={skill.id}>
                  <div className="explore-top">
                    <span className="category-pill">{skill.category}</span>
                    <button
                      type="button"
                      className={`favourite-btn ${isFavourite ? "active" : ""}`}
                      aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
                      onClick={() => toggleFavourite(skill)}
                    >
                      {isFavourite ? "♥" : "♡"}
                    </button>
                  </div>

                  <div className="skill-header-row">
                    <span className="skill-emoji">{skill.icon}</span>
                    <span className="level-badge">{skill.experience}</span>
                  </div>

                  <h3>{skill.title}</h3>
                  <p>{skill.description}</p>

                  <div className="meta-row">
                    <strong>Provider:</strong>
                    <span>{skill.provider}</span>
                  </div>

                  <div className="meta-row">
                    <strong>Wants to learn:</strong>
                    <span>{skill.exchange || "Not specified"}</span>
                  </div>

                  <Link to={`/skill/${skill.id}`} className="view-link">
                    View skill
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Explore;
