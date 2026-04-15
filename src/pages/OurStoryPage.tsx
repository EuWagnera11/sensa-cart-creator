import { ArrowLeft, Heart, Package, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import AnnounceBanner from "@/components/AnnounceBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const storyPoints = [
  {
    icon: Heart,
    title: "Pleasure without apology",
    text: "OoohMy was made for curious people who want great products, sharp taste and zero shame in the process.",
  },
  {
    icon: Package,
    title: "Discreet by default",
    text: "Fast shipping, quiet packaging and a storefront that feels playful instead of clinical or awkward.",
  },
  {
    icon: Sparkles,
    title: "Bold, not boring",
    text: "We treat intimacy like style: personal, expressive and a little mischievous when it should be.",
  },
];

const OurStoryPage = () => (
  <>
    <AnnounceBanner />
    <Navbar />

    <section className="bg-cream paper-bg border-b-[5px] border-dark">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <Link to="/" className="inline-flex items-center gap-2 font-display italic text-sm text-muted-foreground hover:text-primary transition-colors no-underline mb-8">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <p className="section-kicker text-primary mb-3">About OoohMy</p>
        <h1 className="font-display font-black italic text-foreground leading-none mb-5" style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}>
          Our Story.
        </h1>
        <p className="font-serif italic text-muted-foreground text-lg max-w-3xl leading-relaxed">
          We built OoohMy for people who like their shopping experience the same way they like their pleasure: confident,
          stylish, discreet and never judgemental.
        </p>
      </div>
    </section>

    <section className="bg-parch paper-bg px-6 lg:px-12 py-16 lg:py-20 border-b-[3px] border-dark">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-10 items-start">
        <article className="bg-cream border-[3px] border-dark p-8 lg:p-10 shadow-[6px_6px_0_hsl(var(--dark))]">
          <h2 className="font-display font-black italic text-foreground text-3xl mb-4">Why we exist.</h2>
          <div className="space-y-4 font-body text-foreground/75 leading-7">
            <p>
              Too many intimate stores feel sterile, tacky or weirdly embarrassed by what they sell. OoohMy goes the other way.
            </p>
            <p>
              We wanted a shop that feels editorial, cheeky and premium — where discovery is fun, categories make sense and every click leads somewhere worth going.
            </p>
            <p>
              That means better curation, playful copy, strong visuals and a browsing experience that respects privacy without losing personality.
            </p>
          </div>
        </article>

        <aside className="bg-dark border-[3px] border-dark p-8 lg:p-10 shadow-[6px_6px_0_hsl(var(--primary))]">
          <p className="section-kicker text-accent mb-3">What matters here</p>
          <div className="space-y-4">
            {storyPoints.map((point) => {
              const Icon = point.icon;

              return (
                <div key={point.title} className="bg-cream border-[3px] border-dark p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 shrink-0 rounded-full bg-accent border-[3px] border-dark flex items-center justify-center text-foreground">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="font-display font-black italic text-foreground text-xl mb-1">{point.title}</h3>
                      <p className="font-body text-foreground/75 leading-6 text-sm">{point.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </section>

    <section className="bg-dark px-6 lg:px-12 py-14 lg:py-16 border-b-[5px] border-primary">
      <div className="max-w-[1440px] mx-auto text-center">
        <p className="section-kicker text-accent mb-3">Ready to browse?</p>
        <h2 className="font-display font-black italic text-cream leading-none mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
          The secret is out.
        </h2>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link to="/products" className="cta-primary no-underline">
            View all products →
          </Link>
          <Link to="/category/newbie" className="cta-secondary no-underline text-cream border-cream/20 hover:text-foreground">
            Start with beginner picks
          </Link>
        </div>
      </div>
    </section>

    <Footer />
  </>
);

export default OurStoryPage;
