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

const REQUEST_STATUSES = new Set(["Pending", "Accepted", "Rejected", "Cancelled"]);

function createId(prefix) {
  const uuid = globalThis.crypto?.randomUUID?.();
  return `${prefix}-${uuid || `${Date.now()}-${Math.random().toString(36).slice(2)}`}`;
}

function legacyId(prefix, value) {
  return `${prefix}:${encodeURIComponent(String(value || "unknown").trim().toLowerCase())}`;
}

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

export function getCurrentUser() {
  const storedProfile = readStorage(STORAGE_KEYS.profile, DEFAULT_PROFILE);
  const profile =
    storedProfile && typeof storedProfile === "object" && !Array.isArray(storedProfile)
      ? storedProfile
      : { ...DEFAULT_PROFILE };
  const user = {
    ...DEFAULT_PROFILE,
    ...profile,
    id: typeof profile.id === "string" && profile.id.trim() ? profile.id : createId("user"),
    name: typeof profile.name === "string" && profile.name.trim() ? profile.name.trim() : DEFAULT_PROFILE.name,
  };

  if (user.id !== profile.id || user.name !== profile.name) {
    writeStorage(STORAGE_KEYS.profile, user);
  }

  return user;
}

function resolveSkillOwnerId(skill, currentUser) {
  if (typeof skill.ownerId === "string" && skill.ownerId.trim()) return skill.ownerId;
  if (typeof skill.providerId === "string" && skill.providerId.trim()) return skill.providerId;

  const providerName = typeof skill.provider === "string" ? skill.provider.trim() : "";
  if (providerName && providerName.toLowerCase() === currentUser.name.toLowerCase()) {
    return currentUser.id;
  }

  return legacyId("legacy-provider", providerName || `skill-${skill.id}`);
}

function normalizeRequests(requests, skills, currentUser) {
  const skillsById = new Map(skills.map((skill) => [String(skill.id), skill]));

  return requests.filter((request) => request && typeof request === "object").map((request) => {
    const skill = skillsById.get(String(request.skillId));
    const requestId = request.id ?? createId("legacy-request");
    const status = REQUEST_STATUSES.has(request.status) ? request.status : "Pending";
    const senderName =
      typeof request.senderName === "string" && request.senderName.trim()
        ? request.senderName.trim()
        : typeof request.learnerName === "string" && request.learnerName.trim()
          ? request.learnerName.trim()
          : "Learner";
    const receiverName =
      typeof request.receiverName === "string" && request.receiverName.trim()
        ? request.receiverName.trim()
        : skill?.provider || "Skill owner";
    const receiverId =
      typeof request.receiverId === "string" && request.receiverId.trim()
        ? request.receiverId
        : skill
          ? resolveSkillOwnerId(skill, currentUser)
          : legacyId("legacy-request-owner", requestId);
    const createdAt =
      typeof request.createdAt === "string" && !Number.isNaN(Date.parse(request.createdAt))
        ? request.createdAt
        : new Date(0).toISOString();

    return {
      ...request,
      id: requestId,
      senderId:
        typeof request.senderId === "string" && request.senderId.trim()
          ? request.senderId
          : legacyId("legacy-request-sender", requestId),
      senderName,
      receiverId,
      receiverName,
      skillId: request.skillId ?? skill?.id ?? null,
      skillTitle:
        typeof request.skillTitle === "string" && request.skillTitle.trim()
          ? request.skillTitle
          : skill?.title || "Unavailable skill",
      message: typeof request.message === "string" ? request.message : "",
      status,
      createdAt,
    };
  });
}

export function getRequestRecords() {
  const currentUser = getCurrentUser();
  const storedSkills = readStorage(STORAGE_KEYS.skills, DEFAULT_SKILLS);
  const skills = (Array.isArray(storedSkills) ? storedSkills : DEFAULT_SKILLS)
    .filter((skill) => skill && typeof skill === "object")
    .map((skill) => ({
      ...skill,
      ownerId: resolveSkillOwnerId(skill, currentUser),
      provider: skill.provider || currentUser.name,
    }));
  const storedRequests = readStorage(STORAGE_KEYS.requests, DEFAULT_REQUESTS);
  const requests = normalizeRequests(
    Array.isArray(storedRequests) ? storedRequests : [],
    skills,
    currentUser,
  );

  if (JSON.stringify(storedSkills) !== JSON.stringify(skills)) {
    writeStorage(STORAGE_KEYS.skills, skills);
  }
  if (JSON.stringify(storedRequests) !== JSON.stringify(requests)) {
    writeStorage(STORAGE_KEYS.requests, requests);
  }
  return requests;
}

export function getRequestsSentBy(userId) {
  return getRequestRecords().filter((request) => request.senderId === userId);
}

export function getRequestsReceivedBy(userId) {
  return getRequestRecords().filter(
    (request) => request.receiverId === userId && request.status !== "Cancelled",
  );
}

export function getSkillsOwnedBy(userId) {
  getRequestRecords();
  const skills = readStorage(STORAGE_KEYS.skills, []);
  return (Array.isArray(skills) ? skills : []).filter((skill) => skill?.ownerId === userId);
}

export function createLearningRequest(skill, message) {
  const currentUser = getCurrentUser();
  const requests = getRequestRecords();
  const receiverId = resolveSkillOwnerId(skill, currentUser);

  if (receiverId === currentUser.id) {
    return { ok: false, error: "You cannot request to learn your own skill." };
  }

  if (
    requests.some(
      (request) =>
        request.senderId === currentUser.id &&
        String(request.skillId) === String(skill.id) &&
        request.status === "Pending",
    )
  ) {
    return { ok: false, error: "You already have a pending request for this skill." };
  }

  const request = {
    id: createId("request"),
    senderId: currentUser.id,
    senderName: currentUser.name,
    receiverId,
    receiverName: skill.provider || "Skill owner",
    skillId: skill.id,
    skillTitle: skill.title,
    message: message.trim(),
    status: "Pending",
    createdAt: new Date().toISOString(),
  };

  writeStorage(STORAGE_KEYS.requests, [...requests, request]);
  return { ok: true, request };
}

export function updateRequestStatus(requestId, userId, nextStatus) {
  if (!["Accepted", "Rejected", "Cancelled"].includes(nextStatus)) {
    return { ok: false, error: "This request status change is not supported." };
  }

  const requests = getRequestRecords();
  const request = requests.find((item) => String(item.id) === String(requestId));
  if (!request) return { ok: false, error: "This request could not be found." };

  const isSenderCancellation = nextStatus === "Cancelled" && request.senderId === userId;
  const isOwnerResponse =
    ["Accepted", "Rejected"].includes(nextStatus) && request.receiverId === userId;
  if (!isSenderCancellation && !isOwnerResponse) {
    return { ok: false, error: "You are not allowed to update this request." };
  }
  if (request.status !== "Pending") {
    return { ok: false, error: "Only pending requests can be updated." };
  }

  const updatedRequests = requests.map((item) =>
    String(item.id) === String(requestId) ? { ...item, status: nextStatus } : item,
  );
  writeStorage(STORAGE_KEYS.requests, updatedRequests);
  return { ok: true, requests: updatedRequests };
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

  getCurrentUser();
  getRequestRecords();
}

export default DEFAULT_SKILLS;
