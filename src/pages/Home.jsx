
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const skills = [
    {
      title: "Web Development",
      category: "Programming",
      description: "Learn HTML, CSS, JavaScript and React.",
      icon: "💻",
    },
    {
      title: "UI/UX Design",
      category: "Design",
      description: "Learn to create beautiful user interfaces.",
      icon: "🎨",
    },
    {
      title: "Photography",
      category: "Creative",
      description: "Improve your photography skills.",
      icon: "📸",
    },
  ];

  return (
    <div className="home-container">
      <section className="hero-section">
        <div>
          <h1>Welcome to SkillSwap 🚀</h1>
          <p>
            Share your knowledge, learn new skills and grow
            together with our community.
          </p>

          <div className="hero-buttons">
            <Link to="/explore" className="primary-btn">
              Explore Skills
            </Link>

            <Link to="/add-skill" className="secondary-btn">
              Offer a Skill
            </Link>
          </div>
        </div>

        <div className="hero-icon">🤝</div>
      </section>

      <section className="stats-section">
        <div className="stat-card">
          <h2>120+</h2>
          <p>Available Skills</p>
        </div>

        <div className="stat-card">
          <h2>80+</h2>
          <p>Active Learners</p>
        </div>

        <div className="stat-card">
          <h2>50+</h2>
          <p>Skill Exchanges</p>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-heading">
          <h2>Featured Skills</h2>
          <Link to="/explore">View All →</Link>
        </div>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div className="skill-card" key={index}>
              <div className="skill-icon">{skill.icon}</div>
              <span>{skill.category}</span>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>

              <Link to="/explore" className="learn-btn">
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="bottom-section">
        <h2>Ready to Share Your Skills?</h2>
        <p>Teach something you love and learn something new.</p>

        <Link to="/add-skill" className="primary-btn">
          Start Sharing
        </Link>
      </section>
    </div>
  );
}

export default Home;
