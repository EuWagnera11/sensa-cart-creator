import { ArrowLeft, Mail, Users, TrendingUp, Zap, Gift, BarChart3, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import AnnounceBanner from "@/components/AnnounceBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import heroImg from "@/assets/pages/affiliates-hero.jpg";

const stats = [
  { value: "15%", label: "Commission rate" },
  { value: "30d", label: "Cookie window" },
  { value: "Monthly", label: "Payouts" },
  { value: "€0", label: "Joining fee" },
];

const perks = [
  { icon: TrendingUp, title: "Generous commissions", text: "Earn 15% on every sale you drive. No hidden caps, no diminishing returns. The more you share, the more you earn." },
  { icon: Users, title: "Creative freedom", text: "We give you assets, banners and copy — but your voice is yours. Promote OoohMy the way that fits your audience best." },
  { icon: Gift, title: "Exclusive perks", text: "Early access to new drops, free product samples and exclusive discount codes for your followers." },
  { icon: BarChart3, title: "Real-time dashboard", text: "Track clicks, conversions and earnings in real time. Transparent reporting, no guesswork." },
  { icon: Zap, title: "Fast onboarding", text: "Apply today, get approved within 48 hours. Your unique link and assets kit arrive instantly." },
  { icon: Mail, title: "Dedicated support", text: "A real human answers your questions. Priority support and a direct line to our partnerships team." },
];

const steps = [
  { num: "01", title: "Apply", text: "Fill in your details and tell us about your audience. Takes 2 minutes." },
  { num: "02", title: "Get approved", text: "We review your application within 48 hours. Most creators are approved same day." },
  { num: "03", title: "Share & earn", text: "Use your unique link and assets. Earn 15% on every sale you generate." },
];

const AffiliatesPage = () => (
  <>
    <AnnounceBanner />
    <Navbar />

    {/* Hero */}
    <section className="relative overflow-hidden border-b-[5px] border-dark">
      <img src={heroImg} alt="Creator workspace" className="absolute inset-0 w-full h-full object-cover" width={1920} height={800} />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-dark/40" />
      <div className="relative z-[1] max-w-[1440px] mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <Link to="/" className="inline-flex items-center gap-2 font-display italic text-sm text-white/60 hover:text-accent transition-colors no-underline mb-8">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <p className="text-[0.62rem] tracking-[5px] uppercase text-accent font-bold mb-3">Partner with us</p>
        <h1 className="font-display font-black italic text-white leading-none mb-6" style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}>
          Affiliates.
        </h1>
        <p className="font-serif italic text-white/70 text-lg sm:text-xl max-w-2xl leading-relaxed mb-8">
          Love what we do? Earn while you share. Our affiliate programme is open to creators, bloggers and anyone with taste and an audience.
        </p>
        <a href="mailto:affiliates@ooohmy.eu" className="cta-primary no-underline inline-flex items-center gap-2">
          Apply now <ChevronRight size={18} />
        </a>
      </div>
    </section>

    {/* Stats */}
    <section className="bg-dark border-b-[3px] border-primary">
      <div className="max-w-[1440px] mx-auto grid grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={stat.label} className={`px-6 py-8 text-center ${i < stats.length - 1 ? "border-r border-white/10" : ""}`}>
            <div className="font-display font-black italic text-accent text-3xl sm:text-4xl mb-1">{stat.value}</div>
            <div className="text-[0.68rem] tracking-[2px] uppercase text-white/40 font-bold">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>

    {/* How it works */}
    <section className="bg-cream paper-bg px-6 lg:px-12 py-16 lg:py-24 border-b-[3px] border-dark">
      <div className="max-w-[1440px] mx-auto">
        <p className="text-[0.62rem] tracking-[5px] uppercase text-primary font-bold mb-3 text-center">How it works</p>
        <h2 className="font-display font-black italic text-foreground text-3xl lg:text-4xl mb-12 text-center">Three simple steps.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.num} className="bg-parch border-[3px] border-dark p-8 text-center group hover:translate-y-[-4px] hover:shadow-[6px_6px_0_hsl(var(--dark))] transition-all" style={{ boxShadow: "var(--shadow-brutal)" }}>
              <div className="font-display font-black italic text-primary text-5xl mb-4">{step.num}</div>
              <h3 className="font-display font-black italic text-foreground text-2xl mb-3">{step.title}</h3>
              <p className="font-body text-foreground/70 leading-7">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Perks grid */}
    <section className="bg-parch paper-bg px-6 lg:px-12 py-16 lg:py-24 border-b-[3px] border-dark">
      <div className="max-w-[1440px] mx-auto">
        <p className="text-[0.62rem] tracking-[5px] uppercase text-primary font-bold mb-3">Why join</p>
        <h2 className="font-display font-black italic text-foreground text-3xl mb-10">Programme perks.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {perks.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="bg-cream border-[3px] border-dark p-6 group hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[6px_6px_0_hsl(var(--dark))] transition-all" style={{ boxShadow: "var(--shadow-brutal)" }}>
                <div className="w-12 h-12 rounded-full bg-accent border-[3px] border-dark flex items-center justify-center mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="font-display font-black italic text-foreground text-xl mb-2">{p.title}</h3>
                <p className="font-body text-foreground/70 leading-7 text-sm">{p.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-dark px-6 lg:px-12 py-16 lg:py-20 border-b-[5px] border-primary">
      <div className="max-w-[900px] mx-auto text-center">
        <span className="text-6xl block mb-4">🤝</span>
        <h2 className="font-display font-black italic text-cream text-3xl lg:text-4xl mb-4">Ready to earn?</h2>
        <p className="font-serif italic text-white/60 text-lg mb-8 max-w-xl mx-auto">Join hundreds of creators already earning with OoohMy. No fee, no commitment, just commissions.</p>
        <a href="mailto:affiliates@ooohmy.eu" className="cta-primary no-underline inline-flex items-center gap-2">
          Apply now → affiliates@ooohmy.eu
        </a>
      </div>
    </section>

    <Footer />
  </>
);
export default AffiliatesPage;
