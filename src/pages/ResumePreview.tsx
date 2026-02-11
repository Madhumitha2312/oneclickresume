import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useResume } from "@/context/ResumeContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Edit, Mail, Phone, MapPin, Linkedin } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const ResumePreview = () => {
  const { resume } = useResume();
  const navigate = useNavigate();
  const resumeRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    if (!resumeRef.current) return;
    const canvas = await html2canvas(resumeRef.current, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${resume.name || "resume"}.pdf`);
  };

  const isEmpty = !resume.name && !resume.email;

  if (isEmpty) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">No Resume Data</h2>
          <p className="mt-2 text-muted-foreground">Fill in your details first.</p>
          <Button className="mt-4" onClick={() => navigate("/builder")}>Go to Builder</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/builder")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Edit
          </Button>
          <span className="text-sm font-medium text-foreground">Resume Preview</span>
          <Button size="sm" onClick={downloadPDF}>
            <Download className="mr-2 h-4 w-4" /> Download PDF
          </Button>
        </div>
      </nav>

      <div className="container mx-auto max-w-3xl px-4 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          {/* Action bar */}
          <div className="mb-6 flex flex-wrap gap-3">
            <Button variant="outline" size="sm" onClick={() => navigate("/builder")}>
              <Edit className="mr-2 h-3 w-3" /> Edit Resume
            </Button>
            <Button variant="outline" size="sm" onClick={downloadPDF}>
              <Download className="mr-2 h-3 w-3" /> Download PDF
            </Button>
          </div>

          {/* Resume Document */}
          <div
            ref={resumeRef}
            className="rounded-xl border border-border bg-card p-8 shadow-elevated sm:p-12"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {/* Header */}
            <div className="border-b border-border pb-6">
              <h1 className="text-3xl font-bold text-foreground font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>{resume.name}</h1>
              {resume.title && <p className="mt-1 text-lg text-primary font-medium">{resume.title}</p>}
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                {resume.email && <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" />{resume.email}</span>}
                {resume.phone && <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" />{resume.phone}</span>}
                {resume.location && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{resume.location}</span>}
                {resume.linkedin && <span className="flex items-center gap-1"><Linkedin className="h-3.5 w-3.5" />{resume.linkedin}</span>}
              </div>
            </div>

            {/* Summary */}
            {resume.summary && (
              <div className="mt-6">
                <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-primary font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>Summary</h2>
                <p className="text-sm leading-relaxed text-foreground/80">{resume.summary}</p>
              </div>
            )}

            {/* Experience */}
            {resume.experience.some((e) => e.company) && (
              <div className="mt-6">
                <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-primary font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>Experience</h2>
                <div className="space-y-4">
                  {resume.experience.filter((e) => e.company).map((exp, i) => (
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

            {/* Projects */}
            {resume.projects.some((p) => p.name) && (
              <div className="mt-6">
                <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-primary font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>Projects</h2>
                <div className="space-y-3">
                  {resume.projects.filter((p) => p.name).map((proj, i) => (
                    <div key={i}>
                      <h3 className="text-sm font-semibold text-foreground">{proj.name}</h3>
                      {proj.description && <p className="text-sm text-foreground/70">{proj.description}</p>}
                      {proj.tech && <p className="mt-0.5 text-xs text-primary">{proj.tech}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {resume.education.some((e) => e.institution) && (
              <div className="mt-6">
                <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-primary font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>Education</h2>
                <div className="space-y-2">
                  {resume.education.filter((e) => e.institution).map((edu, i) => (
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

            {/* Skills */}
            {resume.skills.length > 0 && (
              <div className="mt-6">
                <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-primary font-sans" style={{ fontFamily: "'Inter', sans-serif" }}>Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {resume.skills.map((s, i) => (
                    <span key={i} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResumePreview;
