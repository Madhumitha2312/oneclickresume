import { createContext, useContext, useState, ReactNode } from "react";

export interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  summary: string;
  education: { institution: string; degree: string; year: string }[];
  skills: string[];
  projects: { name: string; description: string; tech: string }[];
  experience: { company: string; role: string; duration: string; description: string }[];
}

const defaultResume: ResumeData = {
  name: "",
  title: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  summary: "",
  education: [{ institution: "", degree: "", year: "" }],
  skills: [],
  projects: [{ name: "", description: "", tech: "" }],
  experience: [{ company: "", role: "", duration: "", description: "" }],
};

export const sampleResume: ResumeData = {
  name: "Alex Morgan",
  title: "Full-Stack Software Engineer",
  email: "alex.morgan@email.com",
  phone: "+1 (555) 234-5678",
  location: "San Francisco, CA",
  linkedin: "linkedin.com/in/alexmorgan",
  summary: "Passionate full-stack engineer with 5+ years of experience building scalable web applications. Skilled in React, Node.js, and cloud infrastructure with a focus on clean architecture and user experience.",
  education: [
    { institution: "Stanford University", degree: "B.S. Computer Science", year: "2019" },
    { institution: "MIT Online", degree: "Certificate in Machine Learning", year: "2021" },
  ],
  skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "PostgreSQL", "Docker", "GraphQL", "Figma", "Git"],
  projects: [
    { name: "TaskFlow", description: "A real-time project management tool with Kanban boards and team collaboration features. Serves 2,000+ active users.", tech: "React, Node.js, WebSockets" },
    { name: "DataViz Pro", description: "Interactive data visualization dashboard for business analytics with drag-and-drop chart builder.", tech: "D3.js, Python, FastAPI" },
  ],
  experience: [
    { company: "Stripe", role: "Senior Software Engineer", duration: "2022 – Present", description: "Led the development of payment processing features serving millions of transactions. Improved API response time by 40%." },
    { company: "Figma", role: "Software Engineer", duration: "2019 – 2022", description: "Built collaborative design tools and real-time multiplayer features. Contributed to the plugin ecosystem used by 100K+ designers." },
  ],
};

interface ResumeContextType {
  resume: ResumeData;
  setResume: (data: ResumeData) => void;
  updateField: <K extends keyof ResumeData>(key: K, value: ResumeData[K]) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [resume, setResume] = useState<ResumeData>(defaultResume);

  const updateField = <K extends keyof ResumeData>(key: K, value: ResumeData[K]) => {
    setResume((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <ResumeContext.Provider value={{ resume, setResume, updateField }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used within ResumeProvider");
  return ctx;
};
