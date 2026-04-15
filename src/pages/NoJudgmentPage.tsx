import { ArrowLeft, ShieldCheck, HeartHandshake, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import AnnounceBanner from "@/components/AnnounceBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const policies = [
  { icon: HeartHandshake, title: "No shame. Ever.", text: "We believe pleasure is personal, natural and nothing to whisper about. Every product, every order, every interaction — judgement-free." },
  { icon: ShieldCheck, title: "Privacy is sacred.", text: "Your data stays yours. We don't share, sell or sneak around with your information. Discreet billing, discreet packaging, discreet everything." },
  { icon: Scale, title: "Inclusive by design.", text: "OoohMy is for everybody and every body. Our curation, language and experience are built to welcome — not to gatekeep." },
];

const NoJudgmentPage = () => (
  <>
    <AnnounceBanner />
    <Navbar />
    <section className="bg-cream paper-bg border-b-[5px] border-dark">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <Link to="/" className="inline-flex items-center gap-2 font-display italic text-sm text-muted-foreground hover:text-primary transition-colors no-underline mb-8"><ArrowLeft size={16} /> Back to Home</Link>
        <p className="section-kicker text-primary mb-3">Our Promise</p>
        <h1 className="font-display font-black italic text-foreground leading-none mb-5" style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}>No Judgment Policy.</h1>
        <p className="font-serif italic text-muted-foreground text-lg max-w-3xl leading-relaxed">What you buy is your business. How you enjoy it is your art. We're just here to make both easier.</p>
      </div>
    </section>
    <section className="bg-parch paper-bg px-6 lg:px-12 py-16 border-b-[3px] border-dark">
      <div className="max-w-[900px] mx-auto space-y-6">
        {policies.map((p) => { const Icon = p.icon; return (
          <div key={p.title} className="bg-cream border-[3px] border-dark p-8 shadow-[5px_5px_0_hsl(var(--dark))]">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 shrink-0 rounded-full bg-accent border-[3px] border-dark flex items-center justify-center"><Icon size={20} /></div>
              <div><h2 className="font-display font-black italic text-foreground text-2xl mb-2">{p.title}</h2><p className="font-body text-foreground/75 leading-7">{p.text}</p></div>
            </div>
          </div>
        ); })}
      </div>
    </section>
    <Footer />
  </>
);
export default NoJudgmentPage;
