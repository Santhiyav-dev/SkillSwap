import { useState } from "react";
import {
  getCurrentUser,
  getRequestsReceivedBy,
  getRequestsSentBy,
  getSkillsOwnedBy,
  STORAGE_KEYS,
  writeStorage,
} from "../data/skills";
import "./Profile.css";

function Profile() {
  const [profile, setProfile] = useState(() => getCurrentUser());
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  const skills = getSkillsOwnedBy(profile.id);
  const requests = [...getRequestsSentBy(profile.id), ...getRequestsReceivedBy(profile.id)];
  const acceptedConnections = requests.filter((request) => request.status === "Accepted").length;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile((current) => ({ ...current, [name]: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setProfile((current) => ({ ...current, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (event) => {
    event.preventDefault();
    writeStorage(STORAGE_KEYS.profile, profile);
    window.dispatchEvent(new Event("skillswap:profile-updated"));
    setEditing(false);
    setMessage("Profile updated successfully.");
    window.setTimeout(() => setMessage(""), 2600);
  };

  return (
    <div className="profile-page">
      <div className="page-header">
        <div>
          <h1>My profile</h1>
          <p>Keep your learning identity crisp, professional, and easy to connect with.</p>
        </div>
      </div>

      <div className="profile-layout">
        <section className="profile-card">
          <div className="profile-avatar-wrap">
            {profile.avatar ? (
              <img src={profile.avatar} alt="Profile avatar" className="profile-avatar" />
            ) : (
              <div className="profile-avatar initial">{(profile.name || "S").charAt(0).toUpperCase()}</div>
            )}
          </div>

          {!editing ? (
            <>
              <h2>{profile.name}</h2>
              <p className="profile-role">{profile.role || "Student"}</p>
              <p className="profile-email">{profile.email || "Add an email address"}</p>
              <p className="profile-bio">{profile.bio || "No bio added yet."}</p>
              <p className="profile-interest">
                <strong>Interests:</strong> {profile.interests || "Not specified"}
              </p>
              <button type="button" className="primary-btn" onClick={() => setEditing(true)}>
                Edit profile
              </button>
            </>
          ) : (
            <form className="profile-form" onSubmit={handleSave}>
              <label>
                <span>Full name</span>
                <input name="name" value={profile.name} onChange={handleChange} required />
              </label>

              <label>
                <span>Email address</span>
                <input type="email" name="email" value={profile.email} onChange={handleChange} />
              </label>

              <label>
                <span>Role</span>
                <input name="role" value={profile.role || "Student"} onChange={handleChange} />
              </label>

              <label>
                <span>Profile picture</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
              </label>

              <label>
                <span>Bio</span>
                <textarea name="bio" value={profile.bio} onChange={handleChange} placeholder="Tell people a little about yourself" />
              </label>

              <label>
                <span>Interests</span>
                <input
                  name="interests"
                  value={profile.interests}
                  onChange={handleChange}
                  placeholder="React, Design, Product Thinking"
                />
              </label>

              <div className="profile-actions">
                <button type="submit" className="primary-btn">
                  Save changes
                </button>
                <button type="button" className="ghost-btn" onClick={() => setEditing(false)}>
                  Cancel
                </button>
              </div>
            </form>
          )}

          {message && <p className="profile-success">{message}</p>}
        </section>

        <aside className="profile-metrics">
          <div className="metric-card">
            <strong>{skills.length}</strong>
            <span>Skills offered</span>
          </div>
          <div className="metric-card">
            <strong>{acceptedConnections}</strong>
            <span>Accepted exchanges</span>
          </div>
          <div className="metric-card">
            <strong>{profile.interests ? profile.interests.split(",").filter(Boolean).length : 0}</strong>
            <span>Interests</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Profile;
