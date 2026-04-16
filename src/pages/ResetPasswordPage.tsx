import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import AnnounceBanner from "@/components/AnnounceBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for recovery token in URL
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setReady(true);
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setReady(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("Password updated! 🔐");
      navigate("/");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AnnounceBanner />
      <Navbar />
      <div className="bg-parch paper-bg min-h-[60vh] flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-[440px]">
          <div className="bg-cream border-[3px] border-dark rounded-sm p-8 lg:p-10" style={{ boxShadow: "var(--shadow-brutal)" }}>
            <h1 className="font-display font-black italic text-2xl text-foreground mb-2">New Password</h1>
            <p className="font-serif italic text-sm text-muted-foreground mb-6">Choose a new password for your account.</p>

            {!ready ? (
              <p className="font-serif italic text-muted-foreground text-center py-6">Loading recovery session...</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full border-[3px] border-dark rounded-sm px-4 py-2.5 bg-background font-serif text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="New password (min. 8 characters)"
                />
                <button type="submit" disabled={loading} className="cta-primary w-full text-center disabled:opacity-50">
                  {loading ? "Updating..." : "Update Password →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResetPasswordPage;
