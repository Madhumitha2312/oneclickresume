import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useResume } from "@/context/ResumeContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Plus, Trash2, Eye } from "lucide-react";

const steps = ["Contact", "Summary", "Education", "Skills", "Projects", "Experience"];

const ResumeBuilder = () => {
  const { resume, updateField } = useResume();
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const next = () => step < steps.length - 1 && setStep(step + 1);
  const prev = () => step > 0 && setStep(step - 1);

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Home
          </Button>
          <span className="text-sm font-medium text-foreground">Resume Builder</span>
          <Button size="sm" onClick={() => navigate("/preview")}>
            <Eye className="mr-2 h-4 w-4" /> Preview
          </Button>
        </div>
      </nav>

      <div className="container mx-auto max-w-2xl px-4 pt-24 pb-16">
        {/* Step indicator */}
        <div className="mb-8 flex items-center gap-1">
          {steps.map((s, i) => (
            <button
              key={s}
              onClick={() => setStep(i)}
              className={`flex-1 rounded-full py-1.5 text-xs font-medium transition-colors ${
                i === step ? "gradient-hero text-primary-foreground" : i < step ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl border border-border bg-card p-6 shadow-card"
        >
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Contact Details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><Label>Full Name</Label><Input value={resume.name} onChange={(e) => updateField("name", e.target.value)} placeholder="John Doe" /></div>
                <div><Label>Job Title</Label><Input value={resume.title} onChange={(e) => updateField("title", e.target.value)} placeholder="Software Engineer" /></div>
                <div><Label>Email</Label><Input value={resume.email} onChange={(e) => updateField("email", e.target.value)} placeholder="john@email.com" /></div>
                <div><Label>Phone</Label><Input value={resume.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="+1 555 000 0000" /></div>
                <div><Label>Location</Label><Input value={resume.location} onChange={(e) => updateField("location", e.target.value)} placeholder="New York, NY" /></div>
                <div><Label>LinkedIn</Label><Input value={resume.linkedin} onChange={(e) => updateField("linkedin", e.target.value)} placeholder="linkedin.com/in/johndoe" /></div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Professional Summary</h2>
              <Textarea value={resume.summary} onChange={(e) => updateField("summary", e.target.value)} placeholder="Write a brief professional summary..." rows={5} />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Education</h2>
                <Button variant="outline" size="sm" onClick={() => updateField("education", [...resume.education, { institution: "", degree: "", year: "" }])}>
                  <Plus className="mr-1 h-3 w-3" /> Add
                </Button>
              </div>
              {resume.education.map((edu, i) => (
                <div key={i} className="space-y-3 rounded-lg border border-border bg-secondary/30 p-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Education #{i + 1}</span>
                    {resume.education.length > 1 && (
                      <Button variant="ghost" size="sm" onClick={() => updateField("education", resume.education.filter((_, j) => j !== i))}>
                        <Trash2 className="h-3 w-3 text-destructive" />
                      </Button>
                    )}
                  </div>
                  <Input value={edu.institution} onChange={(e) => { const u = [...resume.education]; u[i] = { ...u[i], institution: e.target.value }; updateField("education", u); }} placeholder="University name" />
                  <Input value={edu.degree} onChange={(e) => { const u = [...resume.education]; u[i] = { ...u[i], degree: e.target.value }; updateField("education", u); }} placeholder="Degree" />
                  <Input value={edu.year} onChange={(e) => { const u = [...resume.education]; u[i] = { ...u[i], year: e.target.value }; updateField("education", u); }} placeholder="Year" />
                </div>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Skills</h2>
              <p className="text-sm text-muted-foreground">Enter skills separated by commas</p>
              <Input
                value={resume.skills.join(", ")}
                onChange={(e) => updateField("skills", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
                placeholder="React, TypeScript, Node.js..."
              />
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((s, i) => (
                  <span key={i} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{s}</span>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Projects</h2>
                <Button variant="outline" size="sm" onClick={() => updateField("projects", [...resume.projects, { name: "", description: "", tech: "" }])}>
                  <Plus className="mr-1 h-3 w-3" /> Add
                </Button>
              </div>
              {resume.projects.map((proj, i) => (
                <div key={i} className="space-y-3 rounded-lg border border-border bg-secondary/30 p-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Project #{i + 1}</span>
                    {resume.projects.length > 1 && (
                      <Button variant="ghost" size="sm" onClick={() => updateField("projects", resume.projects.filter((_, j) => j !== i))}>
                        <Trash2 className="h-3 w-3 text-destructive" />
                      </Button>
                    )}
                  </div>
                  <Input value={proj.name} onChange={(e) => { const u = [...resume.projects]; u[i] = { ...u[i], name: e.target.value }; updateField("projects", u); }} placeholder="Project name" />
                  <Textarea value={proj.description} onChange={(e) => { const u = [...resume.projects]; u[i] = { ...u[i], description: e.target.value }; updateField("projects", u); }} placeholder="Description" rows={2} />
                  <Input value={proj.tech} onChange={(e) => { const u = [...resume.projects]; u[i] = { ...u[i], tech: e.target.value }; updateField("projects", u); }} placeholder="Technologies used" />
                </div>
              ))}
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Experience</h2>
                <Button variant="outline" size="sm" onClick={() => updateField("experience", [...resume.experience, { company: "", role: "", duration: "", description: "" }])}>
                  <Plus className="mr-1 h-3 w-3" /> Add
                </Button>
              </div>
              {resume.experience.map((exp, i) => (
                <div key={i} className="space-y-3 rounded-lg border border-border bg-secondary/30 p-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Experience #{i + 1}</span>
                    {resume.experience.length > 1 && (
                      <Button variant="ghost" size="sm" onClick={() => updateField("experience", resume.experience.filter((_, j) => j !== i))}>
                        <Trash2 className="h-3 w-3 text-destructive" />
                      </Button>
                    )}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Input value={exp.company} onChange={(e) => { const u = [...resume.experience]; u[i] = { ...u[i], company: e.target.value }; updateField("experience", u); }} placeholder="Company" />
                    <Input value={exp.role} onChange={(e) => { const u = [...resume.experience]; u[i] = { ...u[i], role: e.target.value }; updateField("experience", u); }} placeholder="Role" />
                  </div>
                  <Input value={exp.duration} onChange={(e) => { const u = [...resume.experience]; u[i] = { ...u[i], duration: e.target.value }; updateField("experience", u); }} placeholder="Duration (e.g. 2022 – Present)" />
                  <Textarea value={exp.description} onChange={(e) => { const u = [...resume.experience]; u[i] = { ...u[i], description: e.target.value }; updateField("experience", u); }} placeholder="Description" rows={2} />
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Navigation */}
        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={prev} disabled={step === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          {step < steps.length - 1 ? (
            <Button onClick={next}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button className="gradient-hero border-0 text-primary-foreground" onClick={() => navigate("/preview")}>
              <Eye className="mr-2 h-4 w-4" /> Preview Resume
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
