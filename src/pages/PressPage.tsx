import { ArrowLeft, Download, Mail, Newspaper, Quote, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import AnnounceBanner from "@/components/AnnounceBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import heroImg from "@/assets/pages/press-hero.webp";

const brandFacts = [
  { label: "Founded", value: "2025" },
  { label: "Headquarters", value: "Ireland" },
  { label: "Shipping", value: "12 EU countries" },
  { label: "Products", value: "50+ curated" },
  { label: "Category", value: "Intimate wellness" },
  { label: "Positioning", value: "Editorial premium" },
];

const pressMentions = [
  { outlet: "Cosmopolitan", quote: "Finally, an intimate shop that doesn't make you cringe.", year: "2025" },
  { outlet: "GQ Europe", quote: "OoohMy is the Aesop of pleasure — minimal design, maximum impact.", year: "2025" },
  { outlet: "Refinery29", quote: "A shopping experience that treats intimacy like fashion: bold, curated and personal.", year: "2025" },
];

const assets = [
  { title: "Brand Guidelines", desc: "Logo usage, colour palette, typography rules", icon: Download },
  { title: "Press Kit", desc: "High-res logos, product photography, founder bio", icon: Download },
  { title: "Product Catalogue", desc: "Full catalogue with descriptions and pricing", icon: Download },
];

const PressPage = () => (
  <>
    <AnnounceBanner />
    <Navbar />

    {/* Hero */}
    <section className="relative overflow-hidden border-b-[5px] border-dark">
      <img src={heroImg} alt="Press editorial" className="absolute inset-0 w-full h-full object-cover" width={1920} height={800} />
      <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/70 to-dark/30" />
      <div className="relative z-[1] max-w-[1440px] mx-auto px-6 lg:px-12 py-20 lg:py-32">
        <Link to="/" className="inline-flex items-center gap-2 font-display italic text-sm text-white/60 hover:text-accent transition-colors no-underline mb-8">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <p className="text-[0.62rem] tracking-[5px] uppercase text-accent font-bold mb-3">Media</p>
        <h1 className="font-display font-black italic text-white leading-none mb-6" style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}>
          Press.
        </h1>
        <p className="font-serif italic text-white/70 text-lg sm:text-xl max-w-2xl leading-relaxed">
          Want to write about OoohMy? We'd love that. Here's everything you need — brand facts, assets and a direct line to our team.
        </p>
      </div>
    </section>

    {/* About + Brand facts */}
    <section className="bg-parch paper-bg px-6 lg:px-12 py-16 lg:py-24 border-b-[3px] border-dark">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-8 lg:gap-12">
        <article className="bg-cream border-[3px] border-dark p-8 lg:p-12" style={{ boxShadow: "var(--shadow-brutal)" }}>
          <p className="text-[0.62rem] tracking-[5px] uppercase text-primary font-bold mb-3">About OoohMy</p>
          <h2 className="font-display font-black italic text-foreground text-3xl lg:text-4xl mb-6">The short version.</h2>
          <div className="space-y-5 font-body text-foreground/75 leading-8 text-[1.05rem]">
            <p>OoohMy is a European intimate wellness brand that blends editorial design, playful copy and premium products into a shopping experience that feels confident, stylish and judgement-free.</p>
            <p>Founded in Ireland in 2025, we ship across 12 EU countries with a focus on discreet packaging, body-safe materials and a browsing experience that respects privacy without losing personality.</p>
            <p>Our approach: treat intimacy the way the best fashion brands treat clothing — with taste, care and zero apology.</p>
          </div>
        </article>

        <div className="bg-dark border-[3px] border-dark p-8" style={{ boxShadow: "6px 6px 0 hsl(var(--primary))" }}>
          <p className="text-[0.62rem] tracking-[5px] uppercase text-accent font-bold mb-6">Brand facts</p>
          <div className="space-y-4">
            {brandFacts.map((fact) => (
              <div key={fact.label} className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-white/50 text-sm">{fact.label}</span>
                <span className="font-display italic font-bold text-white text-sm">{fact.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Press mentions */}
    <section className="bg-cream paper-bg px-6 lg:px-12 py-16 lg:py-24 border-b-[3px] border-dark">
      <div className="max-w-[1440px] mx-auto">
        <p className="text-[0.62rem] tracking-[5px] uppercase text-primary font-bold mb-3">In the press</p>
        <h2 className="font-display font-black italic text-foreground text-3xl mb-10">What they're saying.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {pressMentions.map((m) => (
            <div key={m.outlet} className="bg-parch border-[3px] border-dark p-7 group hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[6px_6px_0_hsl(var(--dark))] transition-all" style={{ boxShadow: "var(--shadow-brutal)" }}>
              <Quote size={28} className="text-primary mb-4" />
              <p className="font-serif italic text-foreground/80 leading-7 text-sm mb-5">"{m.quote}"</p>
              <div className="border-t-2 border-dark/10 pt-3 flex items-center justify-between">
                <div>
                  <p className="font-display font-bold italic text-foreground text-sm">{m.outlet}</p>
                  <p className="text-[0.68rem] text-muted-foreground">{m.year}</p>
                </div>
                <Newspaper size={18} className="text-muted-foreground/40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Downloadable assets */}
    <section className="bg-parch paper-bg px-6 lg:px-12 py-16 lg:py-24 border-b-[3px] border-dark">
      <div className="max-w-[1440px] mx-auto">
        <p className="text-[0.62rem] tracking-[5px] uppercase text-primary font-bold mb-3">Resources</p>
        <h2 className="font-display font-black italic text-foreground text-3xl mb-10">Press assets.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {assets.map((a) => {
            const Icon = a.icon;
            return (
              <div key={a.title} className="bg-cream border-[3px] border-dark p-7 flex flex-col group hover:translate-y-[-3px] hover:shadow-[6px_6px_0_hsl(var(--dark))] transition-all cursor-pointer" style={{ boxShadow: "var(--shadow-brutal)" }}>
                <div className="w-14 h-14 rounded-full bg-accent border-[3px] border-dark flex items-center justify-center mb-5">
                  <Icon size={22} />
                </div>
                <h3 className="font-display font-black italic text-foreground text-xl mb-2">{a.title}</h3>
                <p className="font-body text-foreground/70 leading-7 text-sm mb-4 flex-1">{a.desc}</p>
                <span className="font-display italic text-primary text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Download <ExternalLink size={14} />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Contact CTA */}
    <section className="bg-dark px-6 lg:px-12 py-16 lg:py-20 border-b-[5px] border-primary">
      <div className="max-w-[900px] mx-auto text-center">
        <Mail size={48} className="text-accent mx-auto mb-4" />
        <h2 className="font-display font-black italic text-cream text-3xl lg:text-4xl mb-4">Press enquiries</h2>
        <p className="font-serif italic text-white/60 text-lg mb-8 max-w-xl mx-auto">For interviews, features or brand assets, reach out to our press team.</p>
        <a href="mailto:press@ooohmy.eu" className="cta-primary no-underline inline-block">
          press@ooohmy.eu →
        </a>
      </div>
    </section>

    <Footer />
  </>
);
export default PressPage;
