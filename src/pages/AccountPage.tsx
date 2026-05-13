import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Package, Heart, LogOut, User as UserIcon, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import AnnounceBanner from "@/components/AnnounceBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import { useAuth } from "@/hooks/useAuth";
import { useWishlist } from "@/hooks/useWishlist";

const AccountPage = () => {
  const { user, loading, signOut } = useAuth();
  const { count: wishlistCount } = useWishlist();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      toast("Please sign in to access your account");
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <>
        <AnnounceBanner />
        <Navbar />
        <div className="min-h-[60vh] bg-parch paper-bg" />
        <Footer />
      </>
    );
  }

  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "Gorgeous";

  const handleSignOut = async () => {
    await signOut();
    toast.success("See you soon 👋");
    navigate("/");
  };

  return (
    <>
      <SEOHead title="My Account" description="Your account, orders, and wishlist." />
      <AnnounceBanner />
      <Navbar />

      <div className="bg-parch paper-bg min-h-[80vh] px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
        <div className="max-w-[1100px] mx-auto">
          {/* Header */}
          <div className="mb-10">
            <p className="font-display italic font-black text-[11px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Welcome back
            </p>
            <h1
              className="font-display font-black italic text-foreground leading-[0.95] mb-3"
              style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
            >
              Hi, {displayName}.
            </h1>
            <p className="font-serif italic text-base text-muted-foreground">
              Signed in as <span className="text-foreground font-semibold">{user.email}</span>
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AccountCard
              to="/orders"
              icon={<Package size={22} />}
              title="Orders"
              description="Track shipments & re-order favorites"
              badge={null}
            />
            <AccountCard
              to="/account/wishlist"
              icon={<Heart size={22} />}
              title="Wishlist"
              description="Saved for later"
              badge={wishlistCount > 0 ? String(wishlistCount) : null}
            />
            <button
              type="button"
              onClick={handleSignOut}
              className="text-left bg-cream border-[3px] border-dark rounded-sm p-6 transition-all hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[6px_6px_0_hsl(var(--dark))] focus:outline-none focus:ring-2 focus:ring-primary"
              style={{ boxShadow: "3px 3px 0 hsl(var(--dark))" }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center justify-center w-11 h-11 bg-primary text-cream border-[2px] border-dark rounded-sm">
                  <LogOut size={22} />
                </span>
              </div>
              <h3 className="font-display italic font-black text-foreground text-xl mb-1">
                Sign out
              </h3>
              <p className="font-serif italic text-sm text-muted-foreground">
                End your session on this device
              </p>
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

const AccountCard = ({
  to,
  icon,
  title,
  description,
  badge,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  badge: string | null;
}) => (
  <Link
    to={to}
    className="block bg-cream border-[3px] border-dark rounded-sm p-6 transition-all hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[6px_6px_0_hsl(var(--dark))] no-underline group"
    style={{ boxShadow: "3px 3px 0 hsl(var(--dark))" }}
  >
    <div className="flex items-center justify-between mb-3">
      <span className="inline-flex items-center justify-center w-11 h-11 bg-accent text-foreground border-[2px] border-dark rounded-sm">
        {icon}
      </span>
      {badge && (
        <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 bg-primary text-cream border-[2px] border-dark rounded-sm font-display italic font-black text-xs tabular-nums">
          {badge}
        </span>
      )}
    </div>
    <h3 className="font-display italic font-black text-foreground text-xl mb-1 group-hover:text-primary transition-colors">
      {title}
    </h3>
    <p className="font-serif italic text-sm text-muted-foreground mb-3">{description}</p>
    <span className="inline-flex items-center gap-1 font-display italic font-black text-[11px] uppercase tracking-wider text-foreground group-hover:text-primary transition-colors">
      Open <ArrowRight size={12} />
    </span>
  </Link>
);

export default AccountPage;
