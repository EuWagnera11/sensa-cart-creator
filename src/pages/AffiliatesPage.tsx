import { ArrowLeft, Mail, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import AnnounceBanner from "@/components/AnnounceBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const perks = [
  { icon: TrendingUp, title: "Generous commissions", text: "Earn on every sale you drive. Competitive rates, monthly payouts, no hidden caps." },
  { icon: Users, title: "Creative freedom", text: "We give you assets and copy — but your voice is yours. Promote OoohMy the way that fits your audience." },
  { icon: Mail, title: "Dedicated support", text: "A real human answers your questions. Fast onboarding, tracking dashboard and priority access to new drops." },
];

const AffiliatesPage = () => (
  <>
    <AnnounceBanner />
    <Navbar />
    <section className="bg-cream paper-bg border-b-[5px] border-dark">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <Link to="/" className="inline-flex items-center gap-2 font-display italic text-sm text-muted-foreground hover:text-primary transition-colors no-underline mb-8"><ArrowLeft size={16} /> Back to Home</Link>
        <p className="section-kicker text-primary mb-3">Partner with us</p>
        <h1 className="font-display font-black italic text-foreground leading-none mb-5" style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}>Affiliates.</h1>
        <p className="font-serif italic text-muted-foreground text-lg max-w-3xl leading-relaxed">Love what we do? Earn while you share. Our affiliate programme is open to creators, bloggers and anyone with taste and an audience.</p>
      </div>
    </section>
    <section className="bg-parch paper-bg px-6 lg:px-12 py-16 border-b-[3px] border-dark">
      <div className="max-w-[900px] mx-auto space-y-6">
        {perks.map((p) => { const Icon = p.icon; return (
          <div key={p.title} className="bg-cream border-[3px] border-dark p-8 shadow-[5px_5px_0_hsl(var(--dark))]">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 shrink-0 rounded-full bg-accent border-[3px] border-dark flex items-center justify-center"><Icon size={20} /></div>
              <div><h2 className="font-display font-black italic text-foreground text-2xl mb-2">{p.title}</h2><p className="font-body text-foreground/75 leading-7">{p.text}</p></div>
            </div>
          </div>
        ); })}
        <div className="text-center pt-6">
          <a href="mailto:affiliates@ooohmy.eu" className="cta-primary no-underline inline-block">Apply now → affiliates@ooohmy.eu</a>
        </div>
      </div>
    </section>
    <Footer />
  </>
);
export default AffiliatesPage;
