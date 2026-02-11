import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useResume, type ResumeData, sampleResume } from "@/context/ResumeContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  FileText, Plus, Trash2, Edit, Eye, LogOut, LayoutDashboard, User, Globe, Loader2, Sparkles,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResumeRecord {
  id: string;
  title: string;
  resume_data: ResumeData;
  template: string;
  is_public: boolean;
  slug: string | null;
  updated_at: string;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { setResume } = useResume();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [resumes, setResumes] = useState<ResumeRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchResumes = async () => {
    const { data, error } = await supabase
      .from("resumes")
      .select("*")
      .eq("user_id", user!.id)
      .order("updated_at", { ascending: false });

    if (!error && data) {
      setResumes(data.map((r: any) => ({ ...r, resume_data: r.resume_data as ResumeData })));
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const createResume = async () => {
    const { data, error } = await supabase
      .from("resumes")
      .insert({ user_id: user!.id, title: "New Resume", resume_data: {} as any })
      .select()
      .single();

    if (!error && data) {
      setResume({ ...sampleResume, name: "", title: "", email: "", phone: "", location: "", linkedin: "", summary: "", education: [{ institution: "", degree: "", year: "" }], skills: [], projects: [{ name: "", description: "", tech: "" }], experience: [{ company: "", role: "", duration: "", description: "" }], certifications: [{ name: "", issuer: "", year: "" }], github: "" });
      navigate(`/builder?id=${data.id}`);
    }
  };

  const createDemoResume = async () => {
    const { data, error } = await supabase
      .from("resumes")
      .insert({ user_id: user!.id, title: "Demo Resume", resume_data: sampleResume as any, template: "classic" })
      .select()
      .single();

    if (!error && data) {
      setResume(sampleResume);
      navigate(`/builder?id=${data.id}`);
    }
  };

  const deleteResume = async (id: string) => {
    await supabase.from("resumes").delete().eq("id", id);
    setResumes((prev) => prev.filter((r) => r.id !== id));
    toast({ title: "Resume deleted" });
  };

  const openResume = (r: ResumeRecord) => {
    const rd = r.resume_data as ResumeData;
    setResume({
      ...sampleResume,
      ...rd,
      certifications: rd.certifications || [{ name: "", issuer: "", year: "" }],
      github: rd.github || "",
    });
    navigate(`/builder?id=${r.id}`);
  };

  const togglePublic = async (r: ResumeRecord) => {
    const slug = r.is_public ? null : (r.slug || r.id.slice(0, 8));
    await supabase.from("resumes").update({ is_public: !r.is_public, slug }).eq("id", r.id);
    fetchResumes();
    toast({ title: r.is_public ? "Resume made private" : "Resume published!" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-full w-64 border-r border-border bg-card md:block">
        <div className="flex h-16 items-center gap-2 border-b border-border px-6">
          <div className="gradient-hero flex h-8 w-8 items-center justify-center rounded-lg">
            <FileText className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">ResumeAI</span>
        </div>
        <nav className="mt-4 space-y-1 px-3">
          <button className="flex w-full items-center gap-3 rounded-lg bg-primary/10 px-3 py-2.5 text-sm font-medium text-primary">
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </button>
          <button onClick={() => navigate("/profile")} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary">
            <User className="h-4 w-4" /> Profile
          </button>
        </nav>
        <div className="absolute bottom-4 left-0 right-0 px-3 space-y-2">
          <div className="flex items-center justify-between px-3">
            <span className="text-xs text-muted-foreground truncate">{user?.email}</span>
            <ThemeToggle />
          </div>
          <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground" onClick={signOut}>
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Mobile header */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md md:hidden">
        <div className="flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="gradient-hero flex h-7 w-7 items-center justify-center rounded-lg">
              <FileText className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">ResumeAI</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={signOut}><LogOut className="h-4 w-4" /></Button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="pt-16 md:ml-64 md:pt-0">
        <div className="p-6 md:p-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Resumes</h1>
              <p className="mt-1 text-muted-foreground">Create, edit, and manage your resumes</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={createDemoResume}>
                <Sparkles className="mr-2 h-4 w-4" /> Demo
              </Button>
              <Button className="gradient-hero border-0 text-primary-foreground" onClick={createResume}>
                <Plus className="mr-2 h-4 w-4" /> New Resume
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : resumes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20 text-center"
            >
              <FileText className="mb-4 h-12 w-12 text-muted-foreground/50" />
              <h3 className="text-lg font-semibold text-foreground">No resumes yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">Create your first resume or try with demo data</p>
              <div className="mt-6 flex gap-3">
                <Button variant="outline" onClick={createDemoResume}>Try Demo</Button>
                <Button onClick={createResume}>Create Resume</Button>
              </div>
            </motion.div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {resumes.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group rounded-xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-elevated"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{r.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        Updated {new Date(r.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                    {r.is_public && (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">Public</span>
                    )}
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                    {(r.resume_data as any)?.name || "No name set"} · {(r.resume_data as any)?.title || "No title"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={() => openResume(r)}>
                      <Edit className="mr-1 h-3 w-3" /> Edit
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => { openResume(r); setTimeout(() => navigate(`/preview?id=${r.id}`), 100); }}>
                      <Eye className="mr-1 h-3 w-3" /> Preview
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => togglePublic(r)}>
                      <Globe className="mr-1 h-3 w-3" /> {r.is_public ? "Unpublish" : "Publish"}
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => deleteResume(r.id)}>
                      <Trash2 className="h-3 w-3 text-destructive" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
