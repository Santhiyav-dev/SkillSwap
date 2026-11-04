import { useState } from "react";
import { Link } from "react-router-dom";
import { DEFAULT_SKILLS, readStorage, STORAGE_KEYS, writeStorage } from "../data/skills";
import "./Favourites.css";

function Favourites() {
  const [favourites, setFavourites] = useState(() => {
    const savedSkills = readStorage(STORAGE_KEYS.favourites, DEFAULT_SKILLS.slice(0, 2));
    return Array.isArray(savedSkills)
      ? savedSkills.filter((skill) => skill && typeof skill === "object")
      : [];
  });
  const [search, setSearch] = useState("");

  const removeFavourite = (id) => {
    const updated = favourites.filter((skill) => skill.id !== id);
    setFavourites(updated);
    writeStorage(STORAGE_KEYS.favourites, updated);
  };

  const filteredFavourites = favourites.filter((skill) =>
    (typeof skill.title === "string" ? skill.title : "").toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <div className="favourites-page">
      <div className="page-header">
        <div>
          <h1>Favourites</h1>
          <p>Keep a shortlist of skills and people you want to revisit when you are ready to learn.</p>
        </div>
      </div>

      {favourites.length === 0 ? (
        <div className="empty-state">
          <h2>No saved favourites</h2>
          <p>Start exploring and save the skills that resonate with your learning goals.</p>
          <Link to="/explore" className="primary-btn">
            Explore skills
          </Link>
        </div>
      ) : (
        <>
          <div className="favourites-count">{favourites.length} saved skill(s)</div>
          <label className="favourites-search">
            <span>Search saved skills</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by skill name"
            />
          </label>

          {filteredFavourites.length === 0 ? (
            <div className="empty-state">
              <h2>No matching favourites</h2>
              <p>Try a different search, or save more skills from Explore.</p>
            </div>
          ) : (
            <div className="favourites-grid">
              {filteredFavourites.map((skill) => (
                <article className="favourite-card" key={skill.id}>
                  <div className="favourite-card-top">
                    <span className="favourite-tag">{skill.category}</span>
                    <span className="favourite-heart">♥</span>
                  </div>

                  <div className="favourite-skill-row">
                    <span className="favourite-icon">{skill.icon}</span>
                    <span className="favourite-level">{skill.experience}</span>
                  </div>

                  <h2>{skill.title}</h2>
                  <p>{skill.description}</p>

                  <div className="favourite-meta">
                    <p>
                      <strong>Provider:</strong> {skill.provider}
                    </p>
                    <p>
                      <strong>Wants to learn:</strong> {skill.exchange || "Not specified"}
                    </p>
                  </div>

                  <div className="card-actions">
                    <Link to={`/skill/${skill.id}`} className="ghost-btn">
                      View
                    </Link>
                    <button type="button" className="danger-btn" onClick={() => removeFavourite(skill.id)}>
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Favourites;
