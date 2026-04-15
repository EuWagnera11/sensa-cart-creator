import { ArrowLeft, Package, RotateCcw, Truck, CreditCard, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import AnnounceBanner from "@/components/AnnounceBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const faqs = [
  { icon: Truck, q: "How long does shipping take?", a: "Standard delivery takes 3–5 business days across Europe. Express options are available at checkout." },
  { icon: Package, q: "Is packaging discreet?", a: "Always. Plain box, no logos, no product descriptions on the outside. Your business stays yours." },
  { icon: RotateCcw, q: "What's your return policy?", a: "Unopened items can be returned within 30 days for a full refund. Hygiene-sealed products are non-returnable once opened." },
  { icon: CreditCard, q: "What payment methods do you accept?", a: "Visa, Mastercard, PayPal and MB WAY. All transactions are encrypted and billing is discreet." },
  { icon: Clock, q: "How do I track my order?", a: "You'll receive a tracking link by email as soon as your order ships. You can also check status in your account." },
];

const FaqPage = () => (
  <>
    <AnnounceBanner />
    <Navbar />
    <section className="bg-cream paper-bg border-b-[5px] border-dark">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <Link to="/" className="inline-flex items-center gap-2 font-display italic text-sm text-muted-foreground hover:text-primary transition-colors no-underline mb-8"><ArrowLeft size={16} /> Back to Home</Link>
        <p className="section-kicker text-primary mb-3">Support</p>
        <h1 className="font-display font-black italic text-foreground leading-none mb-5" style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}>FAQ.</h1>
        <p className="font-serif italic text-muted-foreground text-lg max-w-3xl leading-relaxed">Quick answers to the things people actually ask.</p>
      </div>
    </section>
    <section className="bg-parch paper-bg px-6 lg:px-12 py-16 border-b-[3px] border-dark">
      <div className="max-w-[900px] mx-auto space-y-5">
        {faqs.map((faq) => { const Icon = faq.icon; return (
          <div key={faq.q} className="bg-cream border-[3px] border-dark p-7 shadow-[4px_4px_0_hsl(var(--dark))]">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 shrink-0 rounded-full bg-accent border-[3px] border-dark flex items-center justify-center"><Icon size={18} /></div>
              <div><h2 className="font-display font-black italic text-foreground text-xl mb-2">{faq.q}</h2><p className="font-body text-foreground/75 leading-7">{faq.a}</p></div>
            </div>
          </div>
        ); })}
      </div>
    </section>
    <Footer />
  </>
);
export default FaqPage;
