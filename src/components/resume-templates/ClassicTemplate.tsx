import { ResumeData } from "@/context/ResumeContext";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import React from "react";

export const ClassicTemplate = React.forwardRef<HTMLDivElement, { resume: ResumeData }>(
  ({ resume }, ref) => (
    <div ref={ref} className="bg-card p-8 sm:p-12 rounded-xl border border-border shadow-elevated" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-bold text-foreground font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>{resume.name}</h1>
        {resume.title && <p className="mt-1 text-lg text-primary font-medium">{resume.title}</p>}
        <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
          {resume.email && <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{resume.email}</span>}
          {resume.phone && <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" />{resume.phone}</span>}
          {resume.location && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{resume.location}</span>}
          {resume.linkedin && <span className="flex items-center gap-1"><Linkedin className="h-3.5 w-3.5" />{resume.linkedin}</span>}
          {resume.github && <span className="flex items-center gap-1"><Github className="h-3.5 w-3.5" />{resume.github}</span>}
        </div>
      </div>

      {resume.summary && (
        <div className="mt-6">
          <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-primary" style={{ fontFamily: "'Inter', sans-serif" }}>Summary</h2>
          <p className="text-sm leading-relaxed text-foreground/80">{resume.summary}</p>
        </div>
      )}

      {resume.experience.some(e => e.company) && (
        <div className="mt-6">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-primary" style={{ fontFamily: "'Inter', sans-serif" }}>Experience</h2>
          <div className="space-y-4">
            {resume.experience.filter(e => e.company).map((exp, i) => (
              <div key={i}>
                <div className="flex flex-wrap items-baseline justify-between">
                  <h3 className="text-sm font-semibold text-foreground">{exp.role}</h3>
                  <span className="text-xs text-muted-foreground">{exp.duration}</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground">{exp.company}</p>
                {exp.description && <p className="mt-1 text-sm text-foreground/70">{exp.description}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {resume.projects.some(p => p.name) && (
        <div className="mt-6">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-primary" style={{ fontFamily: "'Inter', sans-serif" }}>Projects</h2>
          <div className="space-y-3">
            {resume.projects.filter(p => p.name).map((proj, i) => (
              <div key={i}>
                <h3 className="text-sm font-semibold text-foreground">{proj.name}</h3>
                {proj.description && <p className="text-sm text-foreground/70">{proj.description}</p>}
                {proj.tech && <p className="mt-0.5 text-xs text-primary">{proj.tech}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {resume.education.some(e => e.institution) && (
        <div className="mt-6">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-primary" style={{ fontFamily: "'Inter', sans-serif" }}>Education</h2>
          <div className="space-y-2">
            {resume.education.filter(e => e.institution).map((edu, i) => (
              <div key={i} className="flex flex-wrap items-baseline justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{edu.institution}</h3>
                  <p className="text-sm text-muted-foreground">{edu.degree}</p>
                </div>
                <span className="text-xs text-muted-foreground">{edu.year}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {resume.certifications?.some(c => c.name) && (
        <div className="mt-6">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-primary" style={{ fontFamily: "'Inter', sans-serif" }}>Certifications</h2>
          <div className="space-y-2">
            {resume.certifications.filter(c => c.name).map((cert, i) => (
              <div key={i} className="flex flex-wrap items-baseline justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                </div>
                <span className="text-xs text-muted-foreground">{cert.year}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {resume.skills.length > 0 && (
        <div className="mt-6">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-primary" style={{ fontFamily: "'Inter', sans-serif" }}>Skills</h2>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((s, i) => (
              <span key={i} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">{s}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
);
ClassicTemplate.displayName = "ClassicTemplate";
