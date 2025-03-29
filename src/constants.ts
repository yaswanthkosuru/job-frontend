export const API_URL = "http://localhost:8000";
export const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };
};
export const SKILLS = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "C++",
    "HTML/CSS",
    "SQL",
    "AWS",
    "Docker",
    "Git",
    "Agile",
    "Scrum",
    "REST APIs",
    "GraphQL",
    "MongoDB",
    "PostgreSQL",
    "Redis",
    "Kubernetes",
    "CI/CD",
    "Testing",
    "DevOps",
    "Cloud Computing",
    "Machine Learning",
    "Data Science",
    "UI/UX Design",
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "Mobile Development",
    "Game Development",
    "Security",
    "Blockchain",
    "AI/ML",
  ]
