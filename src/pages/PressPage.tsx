import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AnnounceBanner from "@/components/AnnounceBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const PressPage = () => (
  <>
    <AnnounceBanner />
    <Navbar />
    <section className="bg-cream paper-bg border-b-[5px] border-dark">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <Link to="/" className="inline-flex items-center gap-2 font-display italic text-sm text-muted-foreground hover:text-primary transition-colors no-underline mb-8"><ArrowLeft size={16} /> Back to Home</Link>
        <p className="section-kicker text-primary mb-3">Media</p>
        <h1 className="font-display font-black italic text-foreground leading-none mb-5" style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}>Press.</h1>
        <p className="font-serif italic text-muted-foreground text-lg max-w-3xl leading-relaxed">Want to write about OoohMy? We'd love that. Here's everything you need.</p>
      </div>
    </section>
    <section className="bg-parch paper-bg px-6 lg:px-12 py-16 border-b-[3px] border-dark">
      <div className="max-w-[900px] mx-auto space-y-8">
        <div className="bg-cream border-[3px] border-dark p-8 shadow-[5px_5px_0_hsl(var(--dark))]">
          <h2 className="font-display font-black italic text-foreground text-2xl mb-3">About OoohMy</h2>
          <p className="font-body text-foreground/75 leading-7 mb-4">OoohMy is a European intimate wellness brand that blends editorial design, playful copy and premium products into a shopping experience that feels confident, stylish and judgement-free.</p>
          <p className="font-body text-foreground/75 leading-7">Based in Ireland, shipping across Europe. Founded in 2025.</p>
        </div>
        <div className="bg-cream border-[3px] border-dark p-8 shadow-[5px_5px_0_hsl(var(--dark))]">
          <h2 className="font-display font-black italic text-foreground text-2xl mb-3">Press enquiries</h2>
          <p className="font-body text-foreground/75 leading-7">For interviews, features or brand assets reach out to:</p>
          <a href="mailto:press@ooohmy.eu" className="font-display italic font-bold text-primary text-lg mt-2 inline-block">press@ooohmy.eu</a>
        </div>
      </div>
    </section>
    <Footer />
  </>
);
export default PressPage;
