
import { useState } from "react";
import "./Profile.css";

function getProfile() {
  try {
    return JSON.parse(localStorage.getItem("profile")) || {
      name: "Student",
      email: "",
      bio: "",
      interests: "",
    };
  } catch {
    return {
      name: "Student",
      email: "",
      bio: "",
      interests: "",
    };
  }
}

function Profile() {
  const [profile, setProfile] = useState(getProfile);
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  const skills = (() => {
    try {
      return JSON.parse(localStorage.getItem("skills")) || [];
    } catch {
      return [];
    }
  })();

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    localStorage.setItem("profile", JSON.stringify(profile));
    setEditing(false);
    setMessage("Profile updated successfully!");

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile 👤</h1>
        <p>Manage your personal information and skills.</p>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">
          {profile.name.charAt(0).toUpperCase()}
        </div>

        {!editing ? (
          <>
            <h2>{profile.name}</h2>
            <p className="profile-email">
              {profile.email || "Add your email"}
            </p>

            <p className="profile-bio">
              {profile.bio || "No bio added yet."}
            </p>

            <p className="profile-interests">
              <strong>Interests:</strong>{" "}
              {profile.interests || "Not specified"}
            </p>

            <button
              className="edit-profile-btn"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form className="profile-form" onSubmit={handleSave}>
            <label>Full Name</label>
            <input
              name="name"
              value={profile.name}
              onChange={handleChange}
              required
            />

            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />

            <label>About Me</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
            />

            <label>My Interests</label>
            <input
              name="interests"
              value={profile.interests}
              onChange={handleChange}
              placeholder="Example: Coding, Design, Music"
            />

            <div className="profile-actions">
              <button type="submit" className="edit-profile-btn">
                Save Profile
              </button>

              <button
                type="button"
                className="cancel-profile-btn"
                onClick={() => {
                  setProfile(getProfile());
                  setEditing(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {message && (
          <p className="profile-success">{message}</p>
        )}
      </div>

      <div className="profile-stats">
        <div className="profile-stat-card">
          <h2>{skills.length}</h2>
          <p>Skills Offered</p>
        </div>

        <div className="profile-stat-card">
          <h2>{profile.interests ? profile.interests.split(",").filter(Boolean).length : 0}</h2>
          <p>Interests Added</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
