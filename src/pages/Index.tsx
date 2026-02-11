import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FileText, Sparkles, Download, Globe, ArrowRight, Layout, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sampleResume, useResume } from "@/context/ResumeContext";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";

const features = [
  { icon: Sparkles, title: "AI-Powered", desc: "Smart suggestions to make your resume stand out" },
  { icon: FileText, title: "4 Templates", desc: "Classic, Modern, Minimal & Creative layouts" },
  { icon: Download, title: "PDF Export", desc: "Download your resume in perfect format" },
  { icon: Globe, title: "Portfolio Page", desc: "Get a personal public portfolio link" },
  { icon: Layout, title: "Dashboard", desc: "Manage all your resumes in one place" },
  { icon: Shield, title: "Secure Auth", desc: "Your data is safe with user accounts" },
];

const Index = () => {
  const navigate = useNavigate();
  const { setResume } = useResume();
  const { user } = useAuth();

  const handleDemo = () => {
    setResume(sampleResume);
    navigate("/builder");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="gradient-hero flex h-8 w-8 items-center justify-center rounded-lg">
              <FileText className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">ResumeAI</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={handleDemo}>Demo</Button>
            {user ? (
              <Button size="sm" onClick={() => navigate("/dashboard")}>Dashboard</Button>
            ) : (
              <Button size="sm" onClick={() => navigate("/auth")}>Sign In</Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 gradient-subtle" />
        <div className="container relative mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground shadow-card">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              AI-Powered Resume Builder
            </span>
          </motion.div>
          <motion.h1
            className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Build Your Perfect Resume in Minutes
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Create a professional, ATS-friendly resume with our intelligent builder. Stand out from the crowd and land your dream job.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button size="lg" className="gradient-hero border-0 px-8 text-primary-foreground shadow-glow" onClick={() => navigate(user ? "/dashboard" : "/auth")}>
              {user ? "Go to Dashboard" : "Get Started"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={handleDemo}>
              Try with Sample Data
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="group rounded-xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-elevated"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-foreground font-sans">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2026 ResumeAI. Build beautiful resumes with confidence.
        </div>
      </footer>
    </div>
  );
};

export default Index;
