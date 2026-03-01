import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface Resume {
  id: string;
  title: string;
  template: string;
  updated_at: string;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumes = async () => {
      const { data, error } = await supabase
        .from("resumes")
        .select("id, title, template, updated_at")
        .order("updated_at", { ascending: false });

      if (!error && data) {
        setResumes(data);
      }
      setLoading(false);
    };

    fetchResumes();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">OneClickResume</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <button
              onClick={handleSignOut}
              className="rounded-md border border-input px-3 py-1.5 text-sm font-medium text-foreground hover:bg-accent"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">My Resumes</h2>

        {loading ? (
          <p className="text-muted-foreground">Loading resumes...</p>
        ) : resumes.length === 0 ? (
          <div className="rounded-lg border border-border p-8 text-center">
            <p className="text-muted-foreground">You haven't created any resumes yet.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="rounded-lg border border-border p-4 hover:bg-accent/50 transition-colors"
              >
                <h3 className="font-medium text-foreground">{resume.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Template: {resume.template}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Updated {new Date(resume.updated_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
