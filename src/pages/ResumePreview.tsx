import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useResume } from "@/context/ResumeContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Edit, Layout } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ClassicTemplate, ModernTemplate, MinimalTemplate, CreativeTemplate, templateNames, type TemplateName } from "@/components/resume-templates";

const ResumePreview = () => {
  const { resume } = useResume();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get("id");
  const resumeRef = useRef<HTMLDivElement>(null);
  const [template, setTemplate] = useState<TemplateName>("classic");

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

  const TemplateComponent = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
    minimal: MinimalTemplate,
    creative: CreativeTemplate,
  }[template];

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(resumeId ? `/builder?id=${resumeId}` : "/builder")}>
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
          {/* Template picker + actions */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 rounded-lg border border-border bg-card p-1">
              {(Object.keys(templateNames) as TemplateName[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTemplate(t)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    template === t ? "gradient-hero text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {templateNames[t]}
                </button>
              ))}
            </div>
            <div className="ml-auto flex gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate(resumeId ? `/builder?id=${resumeId}` : "/builder")}>
                <Edit className="mr-2 h-3 w-3" /> Edit
              </Button>
              <Button variant="outline" size="sm" onClick={downloadPDF}>
                <Download className="mr-2 h-3 w-3" /> PDF
              </Button>
            </div>
          </div>

          {/* Resume Document */}
          <TemplateComponent ref={resumeRef} resume={resume} />
        </motion.div>
      </div>
    </div>
  );
};

export default ResumePreview;
