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

const TermsOfUsePage = () => (
  <>
    <SEOHead title="Terms of Use" description="The legal terms governing your use of OoohMy — orders, returns, liability, jurisdiction." />
    <AnnounceBanner />
    <Navbar />

    <section className="bg-cream paper-bg border-b-[5px] border-dark">
      <div className="max-w-[900px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <Link to="/" className="inline-flex items-center gap-2 font-display italic text-sm text-muted-foreground hover:text-primary transition-colors no-underline mb-6">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <p className="section-kicker text-primary mb-3">Legal</p>
        <h1 className="font-display font-black italic text-foreground leading-none mb-4" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
          Terms of Use.
        </h1>
        <p className="font-serif italic text-muted-foreground text-base">Last updated: 13 May 2026</p>
      </div>
    </section>

    <section className="bg-parch paper-bg px-6 lg:px-12 py-12 lg:py-16">
      <article className="max-w-[760px] mx-auto font-body text-foreground/85 leading-7 space-y-8">
        <p className="font-serif italic text-foreground/70">
          By using OoohMy.eu (the "Site"), you agree to these terms. If you don't, please leave.
        </p>

        <Section title="1. Operator">
          <p>
            The Site is operated by <strong>[COMPANY_NAME]</strong>, <strong>[COMPANY_LEGAL_FORM]</strong>,
            registered office at <strong>[REGISTERED_ADDRESS]</strong>, registration number{" "}
            <strong>[REGISTRATION_NUMBER]</strong>, VAT ID <strong>[VAT_ID]</strong> ("we", "us").
          </p>
        </Section>

        <Section title="2. Eligibility">
          <p>
            You must be at least <strong>18 years old</strong> (or the age of majority in your country, whichever
            is higher) to use the Site or place an order. By proceeding through the age gate, you confirm this.
          </p>
        </Section>

        <Section title="3. Orders & Contract Formation">
          <ul className="list-disc pl-5 space-y-1">
            <li>Product listings are an invitation to treat, not a binding offer.</li>
            <li>The contract forms when we send the order confirmation email.</li>
            <li>We may refuse or cancel any order (e.g. stock issues, suspected fraud, address we don't ship to).</li>
            <li>Prices include VAT where applicable. Shipping is shown at checkout.</li>
          </ul>
        </Section>

        <Section title="4. Payment">
          <p>
            We accept the methods listed at checkout. All payments are processed by PCI-compliant third parties.
            You authorize us to charge the full order amount (incl. shipping & taxes) at the moment of purchase.
          </p>
        </Section>

        <Section title="5. Right of Withdrawal (14 days — EU consumers)">
          <p>
            Under Directive 2011/83/EU, you have <strong>14 days from receipt</strong> to withdraw from the contract
            without giving any reason. To exercise this right, send an unambiguous statement to{" "}
            <a href="mailto:[SUPPORT_EMAIL]" className="text-primary underline">[SUPPORT_EMAIL]</a>.
          </p>
          <p>
            <strong>Important — Hygiene exception (Art. 16(e)):</strong> The right of withdrawal does NOT apply to
            sealed goods which are not suitable for return for reasons of <strong>hygiene or health protection</strong>{" "}
            and which were unsealed after delivery. This includes: vibrators and other intimate toys, lubricants,
            condoms, lingerie, and any product with a hygiene seal that has been broken.
          </p>
          <p>See our <Link to="/refund-policy" className="text-primary underline">Refund Policy</Link> for the practical process.</p>
        </Section>

        <Section title="6. Acceptable Use">
          <p>You agree not to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Use the Site for any illegal purpose.</li>
            <li>Attempt to access accounts or systems you're not authorized for.</li>
            <li>Scrape, copy or reproduce site content for commercial purposes.</li>
            <li>Submit false information at checkout.</li>
          </ul>
        </Section>

        <Section title="7. Intellectual Property">
          <p>
            All content on the Site (logos, copy, photography, design) belongs to us or our licensors and is
            protected by copyright. Personal, non-commercial browsing is fine; everything else needs written permission.
          </p>
        </Section>

        <Section title="8. Liability">
          <p>
            To the extent permitted by law, our liability is limited to the order amount. Nothing in these terms
            limits liability for fraud, gross negligence, or where excluded by mandatory consumer law.
          </p>
        </Section>

        <Section title="9. Governing Law & Jurisdiction">
          <p>
            These terms are governed by the laws of <strong>[CITY, COUNTRY]</strong>. EU consumers retain the
            protections of the mandatory consumer law of their country of residence and may also use the EU Online
            Dispute Resolution platform: <a href="https://ec.europa.eu/consumers/odr" className="text-primary underline" target="_blank" rel="noopener noreferrer">ec.europa.eu/consumers/odr</a>.
          </p>
        </Section>

        <Section title="10. Changes">
          <p>
            We may update these terms. Material changes will be communicated to registered users; continued use
            after the effective date counts as acceptance.
          </p>
        </Section>
      </article>
    </section>

    <Footer />
  </>
);

export default TermsOfUsePage;
