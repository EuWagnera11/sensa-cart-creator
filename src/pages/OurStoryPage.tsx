import { ArrowLeft, Heart, Package, Sparkles, Shield, Globe, Award, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import AnnounceBanner from "@/components/AnnounceBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import heroImg from "@/assets/pages/our-story-hero.webp";

const stats = [
  { value: "50+", label: "Products curated" },
  { value: "12", label: "EU countries shipped" },
  { value: "4.8★", label: "Average rating" },
  { value: "100%", label: "Discreet packaging" },
];

const timeline = [
  { year: "2024", title: "The idea sparks", text: "Tired of sterile shops and embarrassing checkout flows, we decided to build something better." },
  { year: "2024", title: "First products curated", text: "Hand-picked 50+ items from European suppliers. Every single one tested, reviewed, approved." },
  { year: "2025", title: "OoohMy launches", text: "Editorial design meets intimate wellness. Bold copy, premium products, zero shame." },
  { year: "Now", title: "Growing fast", text: "Expanding across Europe with new categories, exclusive drops and a loyal community." },
];

const values = [
  { icon: Heart, title: "Pleasure without apology", text: "OoohMy was made for curious people who want great products, sharp taste and zero shame." },
  { icon: Package, title: "Discreet by default", text: "Plain packaging, neutral billing, fast shipping. Your privacy is non-negotiable." },
  { icon: Sparkles, title: "Bold, not boring", text: "We treat intimacy like style: personal, expressive and a little mischievous." },
  { icon: Shield, title: "Safe & certified", text: "Every product is CE certified, body-safe and tested to the highest European standards." },
  { icon: Globe, title: "European roots", text: "Based in Ireland, curating from across Europe. Local quality, continental reach." },
  { icon: Award, title: "Expert curation", text: "We don't sell everything — we sell the best. Each item earns its place." },
];

const OurStoryPage = () => (
  <>
    <AnnounceBanner />
    <Navbar />

    {/* Hero with image */}
    <section className="relative overflow-hidden border-b-[5px] border-dark">
      <img src={heroImg} alt="OoohMy boutique" className="absolute inset-0 w-full h-full object-cover" width={1920} height={800} />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-dark/40" />
      <div className="relative z-[1] max-w-[1440px] mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <Link to="/" className="inline-flex items-center gap-2 font-display italic text-sm text-white/60 hover:text-accent transition-colors no-underline mb-8">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <p className="text-[0.62rem] tracking-[5px] uppercase text-accent font-bold mb-3">About OoohMy</p>
        <h1 className="font-display font-black italic text-white leading-none mb-6" style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}>
          Our Story.
        </h1>
        <p className="font-serif italic text-white/70 text-lg sm:text-xl max-w-2xl leading-relaxed">
          We built OoohMy for people who like their shopping experience the same way they like their pleasure: confident, stylish, discreet and never judgemental.
        </p>
      </div>
    </section>

    {/* Stats bar */}
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

    {/* Why we exist + Values */}
    <section className="bg-parch paper-bg px-6 lg:px-12 py-16 lg:py-24 border-b-[3px] border-dark">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-8 lg:gap-12 mb-16">
          <article className="bg-cream border-[3px] border-dark p-8 lg:p-12" style={{ boxShadow: "var(--shadow-brutal)" }}>
            <p className="text-[0.62rem] tracking-[5px] uppercase text-primary font-bold mb-3">The beginning</p>
            <h2 className="font-display font-black italic text-foreground text-3xl lg:text-4xl mb-6">Why we exist.</h2>
            <div className="space-y-5 font-body text-foreground/75 leading-8 text-[1.05rem]">
              <p>Too many intimate stores feel sterile, tacky or weirdly embarrassed by what they sell. OoohMy goes the other way.</p>
              <p>We wanted a shop that feels editorial, cheeky and premium — where discovery is fun, categories make sense and every click leads somewhere worth going.</p>
              <p>That means better curation, playful copy, strong visuals and a browsing experience that respects privacy without losing personality.</p>
              <p className="font-serif italic text-primary text-lg border-l-4 border-primary pl-6">
                "We don't whisper about pleasure. We design around it."
              </p>
            </div>
          </article>

          <div className="space-y-4">
            <div className="bg-dark border-[3px] border-dark p-6 lg:p-8" style={{ boxShadow: "6px 6px 0 hsl(var(--primary))" }}>
              <Zap size={32} className="text-accent mb-4" />
              <h3 className="font-display font-black italic text-white text-2xl mb-2">Quick facts</h3>
              <ul className="space-y-3 text-white/60 text-sm">
                <li className="flex items-center gap-2"><span className="text-accent">✦</span> Founded in Ireland, 2025</li>
                <li className="flex items-center gap-2"><span className="text-accent">✦</span> 50+ curated products</li>
                <li className="flex items-center gap-2"><span className="text-accent">✦</span> Ships to 12 EU countries</li>
                <li className="flex items-center gap-2"><span className="text-accent">✦</span> 100% body-safe materials</li>
                <li className="flex items-center gap-2"><span className="text-accent">✦</span> CE certified, EU compliant</li>
                <li className="flex items-center gap-2"><span className="text-accent">✦</span> 30-day returns, no questions</li>
              </ul>
            </div>
            <div className="bg-accent border-[3px] border-dark p-6 text-center" style={{ boxShadow: "var(--shadow-brutal)" }}>
              <span className="text-5xl block mb-2">🔥</span>
              <p className="font-display font-black italic text-foreground text-lg">Join 10,000+ happy customers</p>
              <p className="text-foreground/60 text-sm mt-1">And counting every week</p>
            </div>
          </div>
        </div>

        {/* Values grid */}
        <p className="text-[0.62rem] tracking-[5px] uppercase text-primary font-bold mb-3">What we stand for</p>
        <h2 className="font-display font-black italic text-foreground text-3xl mb-8">Our values.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.title} className="bg-cream border-[3px] border-dark p-6 group hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[6px_6px_0_hsl(var(--dark))] transition-all" style={{ boxShadow: "var(--shadow-brutal)" }}>
                <div className="w-12 h-12 rounded-full bg-accent border-[3px] border-dark flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon size={20} />
                </div>
                <h3 className="font-display font-black italic text-foreground text-xl mb-2">{v.title}</h3>
                <p className="font-body text-foreground/70 leading-7 text-sm">{v.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Timeline */}
    <section className="bg-cream paper-bg px-6 lg:px-12 py-16 lg:py-24 border-b-[3px] border-dark">
      <div className="max-w-[900px] mx-auto">
        <p className="text-[0.62rem] tracking-[5px] uppercase text-primary font-bold mb-3 text-center">The journey</p>
        <h2 className="font-display font-black italic text-foreground text-3xl lg:text-4xl mb-12 text-center">How we got here.</h2>
        <div className="relative">
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-[3px] bg-dark/15 -translate-x-1/2" />
          {timeline.map((item, i) => (
            <div key={i} className={`relative flex items-start gap-6 mb-10 last:mb-0 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
              <div className={`flex-1 ${i % 2 === 0 ? "sm:text-right" : "sm:text-left"} hidden sm:block`} />
              <div className="relative z-[2] w-12 h-12 shrink-0 rounded-full bg-primary border-[3px] border-dark flex items-center justify-center text-white font-display font-black text-xs sm:mx-0">
                {item.year}
              </div>
              <div className="flex-1 bg-cream border-[3px] border-dark p-5" style={{ boxShadow: "var(--shadow-brutal)" }}>
                <h3 className="font-display font-black italic text-foreground text-lg mb-1">{item.title}</h3>
                <p className="font-body text-foreground/70 leading-7 text-sm">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-dark px-6 lg:px-12 py-16 lg:py-20 border-b-[5px] border-primary">
      <div className="max-w-[1440px] mx-auto text-center">
        <span className="text-6xl block mb-4">✨</span>
        <p className="text-[0.62rem] tracking-[5px] uppercase text-accent font-bold mb-3">Ready to browse?</p>
        <h2 className="font-display font-black italic text-cream leading-none mb-8" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
          The secret is out.
        </h2>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link to="/products" className="cta-primary no-underline">View all products →</Link>
          <Link to="/category/newbie" className="cta-secondary no-underline text-cream border-cream/20 hover:text-foreground">Start with beginner picks</Link>
        </div>
      </div>
    </section>

    <Footer />
  </>
);

export default OurStoryPage;
