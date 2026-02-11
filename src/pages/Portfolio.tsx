import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { type ResumeData } from "@/context/ResumeContext";
import { Mail, Phone, MapPin, Linkedin, Github, ExternalLink, Loader2 } from "lucide-react";

const Portfolio = () => {
  const { slug } = useParams<{ slug: string }>();
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from("resumes")
        .select("resume_data")
        .eq("slug", slug)
        .eq("is_public", true)
        .single();

      if (error || !data) {
        setNotFound(true);
      } else {
        setResume(data.resume_data as unknown as ResumeData);
      }
      setLoading(false);
    };
    fetch();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (notFound || !resume) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Portfolio Not Found</h1>
          <p className="mt-2 text-muted-foreground">This portfolio doesn't exist or is private.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-90" />
        <div className="relative container mx-auto px-4 py-20 text-center text-primary-foreground">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center text-3xl font-bold">
              {resume.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </div>
            <h1 className="text-4xl font-bold font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>{resume.name}</h1>
            {resume.title && <p className="mt-2 text-xl opacity-90">{resume.title}</p>}
            <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm opacity-80">
              {resume.location && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{resume.location}</span>}
              {resume.email && <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{resume.email}</span>}
              {resume.linkedin && <span className="flex items-center gap-1"><Linkedin className="h-3.5 w-3.5" />{resume.linkedin}</span>}
              {resume.github && <span className="flex items-center gap-1"><Github className="h-3.5 w-3.5" />{resume.github}</span>}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-4xl px-4 py-12 space-y-12">
        {resume.summary && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="text-2xl font-bold text-foreground mb-4">About Me</h2>
            <p className="text-foreground/80 leading-relaxed">{resume.summary}</p>
          </motion.section>
        )}

        {resume.skills.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <h2 className="text-2xl font-bold text-foreground mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((s, i) => (
                <span key={i} className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">{s}</span>
              ))}
            </div>
          </motion.section>
        )}

        {resume.projects.some(p => p.name) && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-2xl font-bold text-foreground mb-4">Projects</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {resume.projects.filter(p => p.name).map((proj, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-5 shadow-card">
                  <h3 className="font-semibold text-foreground">{proj.name}</h3>
                  {proj.description && <p className="mt-2 text-sm text-foreground/70">{proj.description}</p>}
                  {proj.tech && <p className="mt-2 text-xs text-primary">{proj.tech}</p>}
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {resume.experience.some(e => e.company) && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <h2 className="text-2xl font-bold text-foreground mb-4">Experience</h2>
            <div className="space-y-4">
              {resume.experience.filter(e => e.company).map((exp, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-5 shadow-card">
                  <div className="flex flex-wrap justify-between">
                    <h3 className="font-semibold text-foreground">{exp.role}</h3>
                    <span className="text-sm text-muted-foreground">{exp.duration}</span>
                  </div>
                  <p className="text-sm text-primary">{exp.company}</p>
                  {exp.description && <p className="mt-2 text-sm text-foreground/70">{exp.description}</p>}
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {resume.education.some(e => e.institution) && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="text-2xl font-bold text-foreground mb-4">Education</h2>
            <div className="space-y-3">
              {resume.education.filter(e => e.institution).map((edu, i) => (
                <div key={i} className="flex flex-wrap justify-between rounded-lg border border-border bg-card p-4">
                  <div>
                    <h3 className="font-semibold text-foreground">{edu.institution}</h3>
                    <p className="text-sm text-muted-foreground">{edu.degree}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{edu.year}</span>
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </div>

      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        Built with ResumeAI
      </footer>
    </div>
  );
};

export default Portfolio;
