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

const ImpressumPage = () => (
  <>
    <SEOHead title="Impressum" description="Legal disclosure (§5 TMG / §18 MStV) for OoohMy." />
    <AnnounceBanner />
    <Navbar />

    <section className="bg-cream paper-bg border-b-[5px] border-dark">
      <div className="max-w-[900px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <Link to="/" className="inline-flex items-center gap-2 font-display italic text-sm text-muted-foreground hover:text-primary transition-colors no-underline mb-6">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <p className="section-kicker text-primary mb-3">Legal</p>
        <h1 className="font-display font-black italic text-foreground leading-none mb-4" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
          Impressum.
        </h1>
        <p className="font-serif italic text-muted-foreground text-base">Information pursuant to §5 TMG and §18 MStV</p>
      </div>
    </section>

    <section className="bg-parch paper-bg px-6 lg:px-12 py-12 lg:py-16">
      <article className="max-w-[760px] mx-auto font-body text-foreground/85 leading-7 space-y-8">
        <Section title="Operator">
          <p>
            <strong>[COMPANY_NAME]</strong>
            <br />
            <strong>[COMPANY_LEGAL_FORM]</strong>
            <br />
            [REGISTERED_ADDRESS_LINE_1]
            <br />
            [REGISTERED_ADDRESS_LINE_2]
            <br />
            [POSTAL_CODE] [CITY]
            <br />
            [COUNTRY]
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Phone: <a href="tel:[CONTACT_PHONE]" className="text-primary underline">[CONTACT_PHONE]</a>
            <br />
            Email: <a href="mailto:[CONTACT_EMAIL]" className="text-primary underline">[CONTACT_EMAIL]</a>
          </p>
        </Section>

        <Section title="Represented by">
          <p>[REPRESENTATIVE_NAME]</p>
        </Section>

        <Section title="Commercial Register">
          <p>
            Registered: <strong>[REGISTER_TYPE]</strong>
            <br />
            Court / Authority: <strong>[REGISTER_COURT]</strong>
            <br />
            Registration number: <strong>[REGISTRATION_NUMBER]</strong>
          </p>
        </Section>

        <Section title="VAT ID">
          <p>
            VAT identification number pursuant to §27a UStG: <strong>[VAT_ID]</strong>
          </p>
        </Section>

        <Section title="Responsible for content (§18 Abs. 2 MStV)">
          <p>
            [CONTENT_RESPONSIBLE_NAME]
            <br />
            [CONTENT_RESPONSIBLE_ADDRESS]
          </p>
        </Section>

        <Section title="EU Online Dispute Resolution">
          <p>
            The European Commission provides a platform for online dispute resolution:{" "}
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary underline">
              ec.europa.eu/consumers/odr
            </a>
            . We are not obliged and not willing to participate in dispute resolution proceedings before a consumer arbitration board.
          </p>
        </Section>

        <Section title="Liability for content">
          <p>
            As a service provider, we are responsible for our own content on these pages in accordance with §7 (1) TMG and general law.
            According to §§8 to 10 TMG, however, we are not obliged to monitor transmitted or stored third-party information or to investigate
            circumstances that indicate illegal activity.
          </p>
        </Section>

        <Section title="Liability for links">
          <p>
            Our offer contains links to external websites of third parties, on whose contents we have no influence. Therefore, we cannot assume
            any liability for these external contents. The respective provider or operator of the linked pages is always responsible for the contents.
          </p>
        </Section>

        <Section title="Copyright">
          <p>
            The content and works on these pages created by the site operator are subject to copyright law. Duplication, processing, distribution
            and any kind of exploitation outside the limits of copyright require the written consent of the respective author or creator.
          </p>
        </Section>
      </article>
    </section>

    <Footer />
  </>
);

export default ImpressumPage;
