import { ResumeData } from "@/context/ResumeContext";
import React from "react";

export const MinimalTemplate = React.forwardRef<HTMLDivElement, { resume: ResumeData }>(
  ({ resume }, ref) => (
    <div ref={ref} className="bg-card p-8 sm:p-12 rounded-xl border border-border shadow-elevated" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Minimal clean header */}
      <div className="text-center pb-6 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground tracking-tight" style={{ fontFamily: "'Inter', sans-serif" }}>{resume.name}</h1>
        {resume.title && <p className="mt-1 text-sm text-muted-foreground">{resume.title}</p>}
        <div className="mt-3 flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
          {[resume.email, resume.phone, resume.location, resume.linkedin, resume.github].filter(Boolean).map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      {resume.summary && (
        <div className="mt-6">
          <p className="text-sm leading-relaxed text-foreground/80 text-center max-w-2xl mx-auto">{resume.summary}</p>
        </div>
      )}

      {resume.experience.some(e => e.company) && (
        <div className="mt-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>Experience</h2>
          <div className="space-y-4">
            {resume.experience.filter(e => e.company).map((exp, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-24 flex-shrink-0 text-xs text-muted-foreground pt-0.5">{exp.duration}</div>
                <div>
                  <h3 className="text-sm font-medium text-foreground">{exp.role} at {exp.company}</h3>
                  {exp.description && <p className="mt-1 text-sm text-foreground/60">{exp.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {resume.projects.some(p => p.name) && (
        <div className="mt-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>Projects</h2>
          <div className="space-y-3">
            {resume.projects.filter(p => p.name).map((proj, i) => (
              <div key={i}>
                <h3 className="text-sm font-medium text-foreground">{proj.name}</h3>
                {proj.description && <p className="text-sm text-foreground/60">{proj.description}</p>}
                {proj.tech && <p className="text-xs text-muted-foreground mt-0.5">{proj.tech}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        {resume.education.some(e => e.institution) && (
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>Education</h2>
            <div className="space-y-2">
              {resume.education.filter(e => e.institution).map((edu, i) => (
                <div key={i}>
                  <p className="text-sm font-medium text-foreground">{edu.degree}</p>
                  <p className="text-xs text-muted-foreground">{edu.institution} · {edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {resume.skills.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>Skills</h2>
            <p className="text-sm text-foreground/70">{resume.skills.join(" · ")}</p>
          </div>
        )}
      </div>

      {resume.certifications?.some(c => c.name) && (
        <div className="mt-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>Certifications</h2>
          <div className="space-y-1">
            {resume.certifications.filter(c => c.name).map((cert, i) => (
              <p key={i} className="text-sm text-foreground/70">{cert.name} — {cert.issuer} ({cert.year})</p>
            ))}
          </div>
        </div>
      )}
    </div>
  )
);
MinimalTemplate.displayName = "MinimalTemplate";
