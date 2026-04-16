import { ArrowLeft, ShieldCheck, HeartHandshake, Scale, Eye, Lock, Users, MessageCircleHeart } from "lucide-react";
import { Link } from "react-router-dom";
import AnnounceBanner from "@/components/AnnounceBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import heroImg from "@/assets/pages/no-judgment-hero.webp";

const pledges = [
  { icon: HeartHandshake, title: "No shame. Ever.", text: "We believe pleasure is personal, natural and nothing to whisper about. Every product, every order, every interaction — judgement-free.", color: "bg-primary" },
  { icon: ShieldCheck, title: "Privacy is sacred.", text: "Your data stays yours. We don't share, sell or sneak around with your information. Discreet billing, discreet packaging, discreet everything.", color: "bg-dark" },
  { icon: Scale, title: "Inclusive by design.", text: "OoohMy is for everybody and every body. Our curation, language and experience are built to welcome — not to gatekeep.", color: "bg-cat-duo" },
  { icon: Eye, title: "Transparent always.", text: "What you see is what you get. Real reviews, honest descriptions, no tricks. We earn trust by being upfront.", color: "bg-primary" },
  { icon: Lock, title: "Your order, your secret.", text: "Plain packaging. Neutral bank statement. No logos, no hints, no awkward moments at the door.", color: "bg-dark" },
  { icon: Users, title: "Built for everyone.", text: "Solo, couples, curious, experienced — there's no wrong way to explore. We design for real people, not stereotypes.", color: "bg-cat-duo" },
];

const testimonials = [
  { text: "First time buying anything like this online and I felt completely at ease. The packaging was plain, delivery was fast, and the website didn't make me cringe once.", name: "Sarah M.", location: "Dublin" },
  { text: "Finally a shop that treats you like an adult without being clinical or creepy. The copy alone made me buy three things I didn't know I needed.", name: "Ana R.", location: "Lisbon" },
  { text: "Bought a gift for my partner and the whole experience was surprisingly fun. Discreet, stylish, zero awkwardness.", name: "James K.", location: "Berlin" },
];

const NoJudgmentPage = () => (
  <>
    <AnnounceBanner />
    <Navbar />

    {/* Hero */}
    <section className="relative overflow-hidden border-b-[5px] border-dark">
      <img src={heroImg} alt="Inclusivity" className="absolute inset-0 w-full h-full object-cover" width={1920} height={800} />
      <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/40 to-dark/20" />
      <div className="relative z-[1] max-w-[1440px] mx-auto px-6 lg:px-12 py-20 lg:py-32 text-center">
        <Link to="/" className="inline-flex items-center gap-2 font-display italic text-sm text-white/60 hover:text-accent transition-colors no-underline mb-8">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <p className="text-[0.62rem] tracking-[5px] uppercase text-accent font-bold mb-3">Our Promise</p>
        <h1 className="font-display font-black italic text-white leading-none mb-6" style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}>
          No Judgment Policy.
        </h1>
        <p className="font-serif italic text-white/70 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          What you buy is your business. How you enjoy it is your art. We're just here to make both easier.
        </p>
      </div>
    </section>

    {/* Manifesto band */}
    <section className="bg-primary border-b-[3px] border-dark">
      <div className="max-w-[900px] mx-auto px-6 py-10 lg:py-14 text-center">
        <p className="font-display font-black italic text-white text-xl sm:text-2xl lg:text-3xl leading-snug">
          "Pleasure is not a guilty secret. It's a human right. And shopping for it should feel just as good as the thing itself."
        </p>
        <p className="font-serif italic text-white/60 mt-4 text-sm">— The OoohMy Manifesto</p>
      </div>
    </section>

    {/* Pledges grid */}
    <section className="bg-parch paper-bg px-6 lg:px-12 py-16 lg:py-24 border-b-[3px] border-dark">
      <div className="max-w-[1440px] mx-auto">
        <p className="text-[0.62rem] tracking-[5px] uppercase text-primary font-bold mb-3">Our pledges</p>
        <h2 className="font-display font-black italic text-foreground text-3xl lg:text-4xl mb-10">What we promise you.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pledges.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="bg-cream border-[3px] border-dark p-7 group hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[6px_6px_0_hsl(var(--dark))] transition-all" style={{ boxShadow: "var(--shadow-brutal)" }}>
                <div className={`w-14 h-14 rounded-full ${p.color} border-[3px] border-dark flex items-center justify-center mb-5 text-white`}>
                  <Icon size={24} />
                </div>
                <h3 className="font-display font-black italic text-foreground text-xl mb-3">{p.title}</h3>
                <p className="font-body text-foreground/70 leading-7 text-[0.92rem]">{p.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="bg-dark px-6 lg:px-12 py-16 lg:py-24 border-b-[3px] border-primary">
      <div className="max-w-[1440px] mx-auto">
        <p className="text-[0.62rem] tracking-[5px] uppercase text-accent font-bold mb-3">Real voices</p>
        <h2 className="font-display font-black italic text-cream text-3xl mb-10">What our customers say.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-cream border-[3px] border-dark p-6" style={{ boxShadow: "var(--shadow-brutal)" }}>
              <MessageCircleHeart size={28} className="text-primary mb-4" />
              <p className="font-serif italic text-foreground/80 leading-7 text-sm mb-5">"{t.text}"</p>
              <div className="border-t-2 border-dark/10 pt-3">
                <p className="font-display font-bold italic text-foreground text-sm">{t.name}</p>
                <p className="text-[0.68rem] text-muted-foreground">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-cream paper-bg px-6 lg:px-12 py-16 lg:py-20 border-b-[5px] border-dark">
      <div className="max-w-[900px] mx-auto text-center">
        <span className="text-6xl block mb-4">💛</span>
        <h2 className="font-display font-black italic text-foreground text-3xl mb-4">Ready to explore?</h2>
        <p className="font-serif italic text-muted-foreground text-lg mb-8">No judgement. No pressure. Just great products and a good time.</p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link to="/products" className="cta-primary no-underline">Browse products →</Link>
          <Link to="/our-story" className="cta-secondary no-underline">Read our story</Link>
        </div>
      </div>
    </section>

    <Footer />
  </>
);
export default NoJudgmentPage;
