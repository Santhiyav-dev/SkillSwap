export const STORAGE_KEYS = {
  skills: "skills",
  favourites: "favourites",
  requests: "requests",
  profile: "profile",
};

export const DEFAULT_SKILLS = [
  {
    id: 1,
    title: "React Development",
    category: "Programming",
    experience: "Intermediate",
    exchange: "Python",
    description:
      "I can teach React basics, state management, reusable components, and modern frontend patterns.",
    icon: "⚛️",
    provider: "Arun Kumar",
    location: "Coimbatore",
    featured: true,
    createdAt: "2025-03-15T10:00:00.000Z",
  },
  {
    id: 2,
    title: "UI/UX Design",
    category: "Design",
    experience: "Advanced",
    exchange: "Web Development",
    description:
      "I help students design clear interfaces, wireframes, and polished mobile-first experiences.",
    icon: "🎨",
    provider: "Priya",
    location: "Chennai",
    featured: true,
    createdAt: "2025-04-18T09:00:00.000Z",
  },
  {
    id: 3,
    title: "Python Programming",
    category: "Programming",
    experience: "Intermediate",
    exchange: "React",
    description:
      "I teach Python fundamentals, logic building, debugging, and practical automation scripts.",
    icon: "🐍",
    provider: "Rahul",
    location: "Bengaluru",
    featured: true,
    createdAt: "2025-05-02T12:30:00.000Z",
  },
  {
    id: 4,
    title: "Public Speaking",
    category: "Communication",
    experience: "Advanced",
    exchange: "UI Design",
    description:
      "Build confidence in presentations, storytelling, and effective communication for interviews.",
    icon: "🎤",
    provider: "Sneha",
    location: "Hyderabad",
    featured: false,
    createdAt: "2025-05-21T18:15:00.000Z",
  },
  {
    id: 5,
    title: "Photography",
    category: "Creative",
    experience: "Beginner",
    exchange: "Video Editing",
    description:
      "Learn composition, framing, natural light techniques, and mobile photography essentials.",
    icon: "📸",
    provider: "Karthik",
    location: "Madurai",
    featured: false,
    createdAt: "2025-06-08T08:45:00.000Z",
  },
  {
    id: 6,
    title: "Video Editing",
    category: "Creative",
    experience: "Intermediate",
    exchange: "Photography",
    description:
      "I can help you create smooth transitions, reels, and storytelling edits with beginner tools.",
    icon: "🎬",
    provider: "Divya",
    location: "Trichy",
    featured: false,
    createdAt: "2025-06-26T15:45:00.000Z",
  },
  {
    id: 7,
    title: "Data Structures",
    category: "Programming",
    experience: "Advanced",
    exchange: "JavaScript",
    description:
      "Prepare for interviews with arrays, trees, graphs, recursion, and optimization strategies.",
    icon: "🧠",
    provider: "Aisha",
    location: "Pune",
    featured: true,
    createdAt: "2025-07-03T11:00:00.000Z",
  },
  {
    id: 8,
    title: "Business Communication",
    category: "Business",
    experience: "Intermediate",
    exchange: "Design Thinking",
    description:
      "Improve business writing, speaking, and stakeholder communication for real-world collaboration.",
    icon: "📈",
    provider: "Noah",
    location: "Velachery",
    featured: false,
    createdAt: "2025-07-14T09:20:00.000Z",
  },
];

export const DEFAULT_PROFILE = {
  name: "Student",
  email: "student@skillswap.io",
  bio: "Learning by teaching and building meaningful connections through practical skills.",
  interests: "React, Design, Product Thinking",
  avatar: "",
  role: "Student",
};

export const DEFAULT_REQUESTS = [
  {
    id: 1,
    skillId: 2,
    skillTitle: "UI/UX Design",
    learnerName: "Arjun",
    message: "I would love to learn interface design fundamentals and prototyping.",
    status: "Pending",
    createdAt: "2025-07-01T08:00:00.000Z",
  },
  {
    id: 2,
    skillId: 3,
    skillTitle: "Python Programming",
    learnerName: "Meera",
    message: "Can we set up a beginner-friendly session for Python projects?",
    status: "Accepted",
    createdAt: "2025-07-08T10:00:00.000Z",
  },
  {
    id: 3,
    skillId: 1,
    skillTitle: "React Development",
    learnerName: "Vikram",
    message: "I want to learn React from scratch and build a portfolio project.",
    status: "Rejected",
    createdAt: "2025-07-12T09:00:00.000Z",
  },
];

export function readStorage(key, fallback = []) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function ensureDemoData() {
  if (!readStorage(STORAGE_KEYS.skills, null)) {
    writeStorage(STORAGE_KEYS.skills, DEFAULT_SKILLS);
  }

  if (!readStorage(STORAGE_KEYS.profile, null)) {
    writeStorage(STORAGE_KEYS.profile, DEFAULT_PROFILE);
  }

  if (!readStorage(STORAGE_KEYS.favourites, null)) {
    writeStorage(STORAGE_KEYS.favourites, [DEFAULT_SKILLS[0], DEFAULT_SKILLS[2]]);
  }

  if (!readStorage(STORAGE_KEYS.requests, null)) {
    writeStorage(STORAGE_KEYS.requests, DEFAULT_REQUESTS);
  }
}

export default DEFAULT_SKILLS;
