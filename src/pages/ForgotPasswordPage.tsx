import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import AnnounceBanner from "@/components/AnnounceBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setSent(true);
      toast.success("Reset link sent! Check your email ✉️");
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
            <h1 className="font-display font-black italic text-2xl text-foreground mb-2">Reset Password</h1>
            <p className="font-serif italic text-sm text-muted-foreground mb-6">Enter your email and we'll send you a reset link.</p>

            {sent ? (
              <div className="text-center py-4">
                <span className="text-4xl block mb-3">✉️</span>
                <p className="font-serif italic text-foreground">Check your inbox for the reset link.</p>
                <Link to="/auth" className="font-display italic text-sm text-primary hover:underline mt-4 inline-block">
                  ← Back to Sign In
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border-[3px] border-dark rounded-sm px-4 py-2.5 bg-background font-serif text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="you@email.com"
                />
                <button type="submit" disabled={loading} className="cta-primary w-full text-center disabled:opacity-50">
                  {loading ? "Sending..." : "Send Reset Link →"}
                </button>
                <Link to="/auth" className="font-serif italic text-xs text-muted-foreground hover:text-primary block text-center mt-3">
                  ← Back to Sign In
                </Link>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPasswordPage;
