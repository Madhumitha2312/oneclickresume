import { ResumeData } from "@/context/ResumeContext";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import React from "react";

export const ModernTemplate = React.forwardRef<HTMLDivElement, { resume: ResumeData }>(
  ({ resume }, ref) => (
    <div ref={ref} className="rounded-xl border border-border shadow-elevated overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Header with gradient */}
      <div className="gradient-hero px-8 py-8 sm:px-12 text-primary-foreground">
        <h1 className="text-3xl font-bold font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>{resume.name}</h1>
        {resume.title && <p className="mt-1 text-lg opacity-90">{resume.title}</p>}
        <div className="mt-4 flex flex-wrap gap-4 text-sm opacity-80">
          {resume.email && <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{resume.email}</span>}
          {resume.phone && <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" />{resume.phone}</span>}
          {resume.location && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{resume.location}</span>}
          {resume.linkedin && <span className="flex items-center gap-1"><Linkedin className="h-3.5 w-3.5" />{resume.linkedin}</span>}
          {resume.github && <span className="flex items-center gap-1"><Github className="h-3.5 w-3.5" />{resume.github}</span>}
        </div>
      </div>

      <div className="bg-card p-8 sm:p-12 space-y-6">
        {resume.summary && (
          <div>
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-primary border-b border-border pb-1" style={{ fontFamily: "'Inter', sans-serif" }}>About Me</h2>
            <p className="text-sm leading-relaxed text-foreground/80">{resume.summary}</p>
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-3">
          <div className="sm:col-span-2 space-y-6">
            {resume.experience.some(e => e.company) && (
              <div>
                <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-primary border-b border-border pb-1" style={{ fontFamily: "'Inter', sans-serif" }}>Experience</h2>
                <div className="space-y-4">
                  {resume.experience.filter(e => e.company).map((exp, i) => (
                    <div key={i} className="border-l-2 border-primary/30 pl-4">
                      <h3 className="text-sm font-semibold text-foreground">{exp.role}</h3>
                      <p className="text-xs font-medium text-primary">{exp.company} · {exp.duration}</p>
                      {exp.description && <p className="mt-1 text-sm text-foreground/70">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {resume.projects.some(p => p.name) && (
              <div>
                <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-primary border-b border-border pb-1" style={{ fontFamily: "'Inter', sans-serif" }}>Projects</h2>
                <div className="space-y-3">
                  {resume.projects.filter(p => p.name).map((proj, i) => (
                    <div key={i} className="border-l-2 border-accent/30 pl-4">
                      <h3 className="text-sm font-semibold text-foreground">{proj.name}</h3>
                      {proj.description && <p className="text-sm text-foreground/70">{proj.description}</p>}
                      {proj.tech && <p className="mt-0.5 text-xs text-accent">{proj.tech}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {resume.skills.length > 0 && (
              <div>
                <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-primary border-b border-border pb-1" style={{ fontFamily: "'Inter', sans-serif" }}>Skills</h2>
                <div className="flex flex-wrap gap-1.5">
                  {resume.skills.map((s, i) => (
                    <span key={i} className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{s}</span>
                  ))}
                </div>
              </div>
            )}

            {resume.education.some(e => e.institution) && (
              <div>
                <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-primary border-b border-border pb-1" style={{ fontFamily: "'Inter', sans-serif" }}>Education</h2>
                <div className="space-y-2">
                  {resume.education.filter(e => e.institution).map((edu, i) => (
                    <div key={i}>
                      <h3 className="text-sm font-semibold text-foreground">{edu.institution}</h3>
                      <p className="text-xs text-muted-foreground">{edu.degree} · {edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {resume.certifications?.some(c => c.name) && (
              <div>
                <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-primary border-b border-border pb-1" style={{ fontFamily: "'Inter', sans-serif" }}>Certifications</h2>
                <div className="space-y-2">
                  {resume.certifications.filter(c => c.name).map((cert, i) => (
                    <div key={i}>
                      <h3 className="text-sm font-semibold text-foreground">{cert.name}</h3>
                      <p className="text-xs text-muted-foreground">{cert.issuer} · {cert.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
);
ModernTemplate.displayName = "ModernTemplate";
