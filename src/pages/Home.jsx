import { Link } from "react-router-dom";
import { DEFAULT_SKILLS, readStorage, STORAGE_KEYS } from "../data/skills";
import "./Home.css";

function Home() {
  const skills = readStorage(STORAGE_KEYS.skills, DEFAULT_SKILLS);
  const requests = readStorage(STORAGE_KEYS.requests, []);

  const featuredSkills = [...skills]
    .filter((skill) => skill.featured)
    .slice(0, 3);

  const recentSkills = [...skills]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  const acceptedCount = requests.filter((request) => request.status === "Accepted").length;
  const learnersCount = Math.max(
    new Set(requests.map((request) => request.learnerName).filter(Boolean)).size + 12,
    18,
  );

  const stats = [
    { label: "Skills available", value: `${skills.length}+` },
    { label: "Learners", value: `${learnersCount}+` },
    { label: "Exchanges", value: `${acceptedCount + 12}+` },
  ];

  return (
    <div className="home-page">
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">Welcome back, Student</span>
          <h1>Share skills. Learn faster. Grow together.</h1>
          <p>
            SkillSwap connects learners with mentors, makers, creators, and curious minds who want to
            exchange knowledge in a supportive and practical way.
          </p>

          <div className="hero-actions">
            <Link to="/explore" className="primary-btn">
              Explore Skills
            </Link>
            <Link to="/add-skill" className="secondary-btn">
              Offer a Skill
            </Link>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-badge">
            <span>Live community</span>
            <strong>{skills.length} skills</strong>
          </div>
          <div className="orbit-card orbit-one">
            <span>🏆</span>
            <small>Mentor network</small>
          </div>
          <div className="orbit-card orbit-two">
            <span>📚</span>
            <small>Growth path</small>
          </div>
          <div className="hero-logo-wrap">
            <img src="/logo.svg" alt="SkillSwap logo" />
          </div>
        </div>
      </section>

      <section className="stats-grid">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="content-section">
        <div className="section-title">
          <h2>Featured skills</h2>
          <Link to="/explore" className="section-link">
            View all
          </Link>
        </div>

        {featuredSkills.length > 0 ? (
          <div className="card-grid three-up">
            {featuredSkills.map((skill) => (
              <article className="skill-card" key={skill.id}>
                <div className="skill-card-top">
                  <span className="skill-icon">{skill.icon}</span>
                  <span className="tag">{skill.category}</span>
                </div>
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
                <div className="skill-meta">
                  <span>{skill.provider}</span>
                  <span>{skill.experience}</span>
                </div>
                <Link to={`/skill/${skill.id}`} className="learn-more-link">
                  View skill
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>No featured skills yet</h2>
            <p>Start sharing a new skill to populate your dashboard.</p>
            <Link to="/add-skill" className="primary-btn">
              Add a skill
            </Link>
          </div>
        )}
      </section>

      <section className="content-section split-section">
        <div className="panel-box">
          <div className="section-title compact">
            <h3>Recently added</h3>
            <Link to="/explore" className="section-link">
              Browse
            </Link>
          </div>

          <div className="mini-list">
            {recentSkills.length > 0 ? (
              recentSkills.map((skill) => (
                <div key={skill.id} className="mini-item">
                  <span className="mini-icon">{skill.icon}</span>
                  <div>
                    <strong>{skill.title}</strong>
                    <small>{skill.category}</small>
                  </div>
                </div>
              ))
            ) : (
              <p className="muted">No recent skills yet.</p>
            )}
          </div>
        </div>

        <div className="panel-box">
          <div className="section-title compact">
            <h3>Activity overview</h3>
          </div>

          <div className="overview-grid">
            <div>
              <span className="overview-label">Pending</span>
              <strong>{requests.filter((request) => request.status === "Pending").length}</strong>
            </div>
            <div>
              <span className="overview-label">Accepted</span>
              <strong>{acceptedCount}</strong>
            </div>
            <div>
              <span className="overview-label">Saved</span>
              <strong>{readStorage(STORAGE_KEYS.favourites, []).length}</strong>
            </div>
            <div>
              <span className="overview-label">Profile</span>
              <strong>Complete</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="bottom-banner">
        <div>
          <span className="eyebrow">Ready to contribute?</span>
          <h2>Turn your expertise into a meaningful exchange.</h2>
        </div>
        <Link to="/add-skill" className="primary-btn">
          Share your skill
        </Link>
      </section>
    </div>
  );
}

export default Home;
