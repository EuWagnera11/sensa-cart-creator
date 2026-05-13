import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AnnounceBanner from "@/components/AnnounceBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h2 className="font-display font-black italic text-foreground text-2xl mb-3">{title}</h2>
    <div className="space-y-3">{children}</div>
  </div>
);

const RefundPolicyPage = () => (
  <>
    <SEOHead title="Refund Policy" description="How returns and refunds work at OoohMy — including the hygiene exception." />
    <AnnounceBanner />
    <Navbar />

    <section className="bg-cream paper-bg border-b-[5px] border-dark">
      <div className="max-w-[900px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <Link to="/" className="inline-flex items-center gap-2 font-display italic text-sm text-muted-foreground hover:text-primary transition-colors no-underline mb-6">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <p className="section-kicker text-primary mb-3">Legal</p>
        <h1 className="font-display font-black italic text-foreground leading-none mb-4" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
          Refund Policy.
        </h1>
        <p className="font-serif italic text-muted-foreground text-base">Last updated: 13 May 2026</p>
      </div>
    </section>

    <section className="bg-parch paper-bg px-6 lg:px-12 py-12 lg:py-16">
      <article className="max-w-[760px] mx-auto font-body text-foreground/85 leading-7 space-y-8">
        <p className="font-serif italic text-foreground/70">
          We want you to love what you bought. Here's how returns work — and where the law (rightly) draws the line.
        </p>

        <Section title="1. The 14-day right of withdrawal">
          <p>
            EU consumers have <strong>14 days from delivery</strong> to withdraw from the purchase, no reason needed.
            Email us at <a href="mailto:[SUPPORT_EMAIL]" className="text-primary underline">[SUPPORT_EMAIL]</a> with
            your order number to start the process.
          </p>
        </Section>

        <Section title="2. The hygiene exception (Art. 16(e) Directive 2011/83/EU)">
          <p>
            By law, products that are <strong>sealed for hygiene</strong> and have been <strong>unsealed</strong>{" "}
            cannot be returned. This protects all our customers. It applies to:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Vibrators, dildos and any intimate toy</li>
            <li>Lubricants, oils, creams</li>
            <li>Condoms</li>
            <li>Lingerie & swimwear</li>
            <li>Any product where a hygiene seal has been broken</li>
          </ul>
          <p>
            <strong>Sealed and unopened?</strong> You can still return it within 14 days.
          </p>
        </Section>

        <Section title="3. Faulty or damaged items">
          <p>
            If something arrives broken, faulty or not what you ordered, you're covered by the EU 2-year legal
            guarantee. Contact us within a reasonable time after discovering the issue and we'll replace, repair
            or refund — your choice.
          </p>
          <p>
            Photos help us help you faster. Email <a href="mailto:[SUPPORT_EMAIL]" className="text-primary underline">[SUPPORT_EMAIL]</a>.
          </p>
        </Section>

        <Section title="4. How we refund">
          <ul className="list-disc pl-5 space-y-1">
            <li>Refunds go back to the original payment method.</li>
            <li>Processing typically takes 3–10 business days after we receive the return.</li>
            <li>Original shipping costs are refunded; return shipping is on you (unless the item was faulty).</li>
          </ul>
        </Section>

        <Section title="5. Return address">
          <p>
            Don't ship anything back without contacting us first — we'll send you the correct address and a return
            reference. Returns sent without a reference may be delayed or refused.
          </p>
        </Section>

        <Section title="6. Questions?">
          <p>
            <a href="mailto:[SUPPORT_EMAIL]" className="text-primary underline">[SUPPORT_EMAIL]</a> —
            real humans, no judgement, fast replies.
          </p>
        </Section>
      </article>
    </section>

    <Footer />
  </>
);

export default RefundPolicyPage;
