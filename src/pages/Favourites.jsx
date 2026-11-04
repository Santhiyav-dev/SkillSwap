
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Favourites.css";

function getFavourites() {
  try {
    return JSON.parse(localStorage.getItem("favourites")) || [];
  } catch {
    return [];
  }
}

function Favourites() {
  const [favourites, setFavourites] = useState(getFavourites);

  const removeFavourite = (id) => {
    const updated = favourites.filter(
      (skill) => skill.id !== id
    );

    setFavourites(updated);

    localStorage.setItem(
      "favourites",
      JSON.stringify(updated)
    );
  };

  return (
    <div className="favourites-container">
      <div className="favourites-header">
        <h1>My Favourites ❤️</h1>
        <p>Your favourite skills are saved here.</p>
      </div>

      {favourites.length === 0 ? (
        <div className="empty-favourites">
          <div className="empty-heart">🤍</div>
          <h2>No Favourite Skills Yet!</h2>
          <p>
            Explore skills and add your favourite ones here.
          </p>

          <Link to="/explore" className="explore-link">
            Explore Skills →
          </Link>
        </div>
      ) : (
        <>
          <div className="favourites-count">
            {favourites.length} Favourite Skills
          </div>

          <div className="favourites-grid">
            {favourites.map((skill) => (
              <div className="favourite-card" key={skill.id}>
                <div className="favourite-card-top">
                  <span className="favourite-category">
                    {skill.category}
                  </span>

                  <span className="heart-icon">❤️</span>
                </div>

                <h2>{skill.title}</h2>

                <p>{skill.description}</p>

                <div className="favourite-details">
                  <p>
                    <strong>Experience:</strong>{" "}
                    {skill.experience}
                  </p>

                  <p>
                    <strong>Wants to Learn:</strong>{" "}
                    {skill.exchange || "Not specified"}
                  </p>
                </div>

                <button
                  className="remove-favourite-btn"
                  onClick={() => removeFavourite(skill.id)}
                >
                  Remove Favourite
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Favourites;
