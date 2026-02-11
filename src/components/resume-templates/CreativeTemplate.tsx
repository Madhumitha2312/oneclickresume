import { ResumeData } from "@/context/ResumeContext";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import React from "react";

export const CreativeTemplate = React.forwardRef<HTMLDivElement, { resume: ResumeData }>(
  ({ resume }, ref) => (
    <div ref={ref} className="rounded-xl border border-border shadow-elevated overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="grid sm:grid-cols-[280px_1fr]">
        {/* Left sidebar */}
        <div className="bg-foreground text-background p-8 space-y-6">
          <div>
            <div className="w-20 h-20 rounded-full gradient-hero flex items-center justify-center text-2xl font-bold text-primary-foreground mb-4">
              {resume.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </div>
            <h1 className="text-xl font-bold" style={{ fontFamily: "'Inter', sans-serif" }}>{resume.name}</h1>
            {resume.title && <p className="text-sm opacity-70 mt-1">{resume.title}</p>}
          </div>

          <div className="space-y-2 text-sm opacity-80">
            {resume.email && <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" />{resume.email}</div>}
            {resume.phone && <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" />{resume.phone}</div>}
            {resume.location && <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />{resume.location}</div>}
            {resume.linkedin && <div className="flex items-center gap-2"><Linkedin className="h-3.5 w-3.5" />{resume.linkedin}</div>}
            {resume.github && <div className="flex items-center gap-2"><Github className="h-3.5 w-3.5" />{resume.github}</div>}
          </div>

          {resume.skills.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-3 opacity-60" style={{ fontFamily: "'Inter', sans-serif" }}>Skills</h2>
              <div className="flex flex-wrap gap-1.5">
                {resume.skills.map((s, i) => (
                  <span key={i} className="rounded-full border border-background/30 px-2.5 py-0.5 text-xs">{s}</span>
                ))}
              </div>
            </div>
          )}

          {resume.education.some(e => e.institution) && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-3 opacity-60" style={{ fontFamily: "'Inter', sans-serif" }}>Education</h2>
              <div className="space-y-2">
                {resume.education.filter(e => e.institution).map((edu, i) => (
                  <div key={i}>
                    <p className="text-sm font-medium">{edu.degree}</p>
                    <p className="text-xs opacity-60">{edu.institution} · {edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {resume.certifications?.some(c => c.name) && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-3 opacity-60" style={{ fontFamily: "'Inter', sans-serif" }}>Certifications</h2>
              <div className="space-y-2">
                {resume.certifications.filter(c => c.name).map((cert, i) => (
                  <div key={i}>
                    <p className="text-sm font-medium">{cert.name}</p>
                    <p className="text-xs opacity-60">{cert.issuer} · {cert.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right content */}
        <div className="bg-card p-8 space-y-6">
          {resume.summary && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>About</h2>
              <p className="text-sm leading-relaxed text-foreground/80">{resume.summary}</p>
            </div>
          )}

          {resume.experience.some(e => e.company) && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>Experience</h2>
              <div className="space-y-4">
                {resume.experience.filter(e => e.company).map((exp, i) => (
                  <div key={i} className="relative pl-4 before:absolute before:left-0 before:top-1 before:h-2 before:w-2 before:rounded-full before:bg-primary">
                    <div className="flex flex-wrap justify-between">
                      <h3 className="text-sm font-semibold text-foreground">{exp.role}</h3>
                      <span className="text-xs text-muted-foreground">{exp.duration}</span>
                    </div>
                    <p className="text-xs font-medium text-primary">{exp.company}</p>
                    {exp.description && <p className="mt-1 text-sm text-foreground/70">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {resume.projects.some(p => p.name) && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>Projects</h2>
              <div className="space-y-3">
                {resume.projects.filter(p => p.name).map((proj, i) => (
                  <div key={i} className="rounded-lg bg-secondary/50 p-3">
                    <h3 className="text-sm font-semibold text-foreground">{proj.name}</h3>
                    {proj.description && <p className="text-sm text-foreground/70 mt-1">{proj.description}</p>}
                    {proj.tech && <p className="text-xs text-accent mt-1">{proj.tech}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
);
CreativeTemplate.displayName = "CreativeTemplate";
