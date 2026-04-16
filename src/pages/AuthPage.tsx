import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { toast } from "sonner";
import AnnounceBanner from "@/components/AnnounceBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back! 🔥");
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast.success("Check your email to confirm your account ✉️");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Google sign-in failed");
      return;
    }
    if (result.redirected) return;
    toast.success("Welcome! 🔥");
    navigate("/");
  };

  return (
    <>
      <AnnounceBanner />
      <Navbar />

      <div className="bg-parch paper-bg min-h-[70vh] flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-[440px]">
          <div className="bg-cream border-[3px] border-dark rounded-sm p-8 lg:p-10" style={{ boxShadow: "var(--shadow-brutal)" }}>
            <div className="text-center mb-8">
              <div className="font-display font-black italic text-3xl mb-1">
                <span className="text-primary">Oooh</span>
                <span className="text-accent">My</span>
                <span className="text-neon-pink">.</span>
              </div>
              <p className="font-serif italic text-sm text-muted-foreground">
                {isLogin ? "Welcome back, you." : "Join the secret club."}
              </p>
            </div>

            {/* Google button */}
            <button
              type="button"
              onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-3 bg-surface-strong text-surface-strong-foreground border-[3px] border-dark rounded-sm px-4 py-3 font-display italic font-bold text-sm transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_hsl(var(--dark))] mb-5"
              style={{ boxShadow: "4px 4px 0 hsl(var(--dark))" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-[2px] bg-dark/10" />
              <span className="font-serif italic text-xs text-muted-foreground">or</span>
              <div className="flex-1 h-[2px] bg-dark/10" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-display italic text-sm font-bold text-foreground block mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border-[3px] border-dark rounded-sm px-4 py-2.5 bg-background font-serif text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label className="font-display italic text-sm font-bold text-foreground block mb-1.5">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full border-[3px] border-dark rounded-sm px-4 py-2.5 bg-background font-serif text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Min. 8 characters"
                />
              </div>

              {isLogin && (
                <Link to="/forgot-password" className="font-serif italic text-xs text-primary hover:underline block text-right">
                  Forgot password?
                </Link>
              )}

              <button
                type="submit"
                disabled={loading}
                className="cta-primary w-full text-center disabled:opacity-50"
              >
                {loading ? "..." : isLogin ? "Sign In →" : "Create Account →"}
              </button>
            </form>

            <p className="text-center font-serif italic text-sm text-muted-foreground mt-6">
              {isLogin ? "New here? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary font-bold hover:underline bg-transparent border-none p-0"
              >
                {isLogin ? "Create an account" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AuthPage;
