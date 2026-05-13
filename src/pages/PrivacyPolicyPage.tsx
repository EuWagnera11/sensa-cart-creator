import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AnnounceBanner from "@/components/AnnounceBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";

const openCookiePrefs = () => {
  window.dispatchEvent(new Event("om-open-cookie-prefs"));
};

const PrivacyPolicyPage = () => (
  <>
    <SEOHead title="Privacy Policy" description="How OoohMy collects, uses and protects your personal data — full GDPR breakdown." />
    <AnnounceBanner />
    <Navbar />

    <section className="bg-cream paper-bg border-b-[5px] border-dark">
      <div className="max-w-[900px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <Link to="/" className="inline-flex items-center gap-2 font-display italic text-sm text-muted-foreground hover:text-primary transition-colors no-underline mb-6">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <p className="section-kicker text-primary mb-3">Legal</p>
        <h1 className="font-display font-black italic text-foreground leading-none mb-4" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
          Privacy Policy.
        </h1>
        <p className="font-serif italic text-muted-foreground text-base">Last updated: 13 May 2026</p>
      </div>
    </section>

    <section className="bg-parch paper-bg px-6 lg:px-12 py-12 lg:py-16">
      <article className="max-w-[760px] mx-auto prose-legal font-body text-foreground/85 leading-7 space-y-8">
        <p className="font-serif italic text-foreground/70">
          We take your privacy seriously — especially given what we sell. This page explains, in plain English,
          what data we collect, why, who sees it, and how to make us forget you exist. Compliant with the EU
          General Data Protection Regulation (GDPR) Articles 13 & 14.
        </p>

        <Section title="1. Who we are (Data Controller)">
          <p>
            <strong>[COMPANY_NAME]</strong>, a <strong>[COMPANY_LEGAL_FORM]</strong> registered in <strong>[COUNTRY]</strong>
            under registration number <strong>[REGISTRATION_NUMBER]</strong>.
          </p>
          <p>
            Registered address: <strong>[REGISTERED_ADDRESS]</strong>
            <br />
            General contact: <a href="mailto:[CONTACT_EMAIL]" className="text-primary underline">[CONTACT_EMAIL]</a>
            <br />
            Data Protection Officer: <a href="mailto:[DPO_EMAIL]" className="text-primary underline">[DPO_EMAIL]</a>
          </p>
        </Section>

        <Section title="2. What data we collect">
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Account data:</strong> email, password (hashed), name, marketing opt-ins.</li>
            <li><strong>Order data:</strong> billing/shipping address, items purchased, order history.</li>
            <li><strong>Payment data:</strong> handled directly by our payment processor — we never see your full card number.</li>
            <li><strong>Technical data:</strong> IP, browser, device type, pages visited (only if you accept Analytics cookies).</li>
            <li><strong>Communications:</strong> support emails and chat transcripts.</li>
            <li><strong>Age verification:</strong> a single flag stored locally in your browser (no government ID requested).</li>
          </ul>
        </Section>

        <Section title="3. Why we process it (Legal basis — Art. 6 GDPR)">
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Performance of contract</strong> — to fulfil orders, ship products, handle returns.</li>
            <li><strong>Legal obligation</strong> — to keep tax/accounting records (typically 10 years).</li>
            <li><strong>Legitimate interest</strong> — to prevent fraud, secure the site, improve the service.</li>
            <li><strong>Consent</strong> — for marketing emails, analytics & advertising cookies. Withdrawable anytime.</li>
          </ul>
        </Section>

        <Section title="4. Who we share it with (Recipients)">
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Payment processors</strong> (Stripe / Adyen / PayPal) — to take payment.</li>
            <li><strong>Shipping carriers</strong> (DHL, GLS, CTT, etc.) — to deliver in discreet packaging.</li>
            <li><strong>Cloud hosting & email providers</strong> — under strict Data Processing Agreements.</li>
            <li><strong>Analytics partners</strong> — only with your consent, and only pseudonymized.</li>
            <li><strong>Tax authorities</strong> — when legally required.</li>
          </ul>
          <p>
            We <strong>never sell</strong> your personal data. We do not share what you bought with anyone outside
            the order fulfilment chain.
          </p>
        </Section>

        <Section title="5. International transfers">
          <p>
            Where data leaves the EU/EEA (e.g. some hosting providers), we rely on EU Standard Contractual Clauses
            and additional safeguards as required by the Schrems II ruling.
          </p>
        </Section>

        <Section title="6. How long we keep it">
          <ul className="list-disc pl-5 space-y-1">
            <li>Order records: <strong>10 years</strong> (tax law).</li>
            <li>Account data: until you delete your account, then anonymized within 30 days.</li>
            <li>Marketing consent: until you opt out.</li>
            <li>Analytics: max 14 months.</li>
            <li>Support tickets: 24 months after resolution.</li>
          </ul>
        </Section>

        <Section title="7. Your rights (Art. 15–22 GDPR)">
          <p>You have the right to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Access</strong> — get a copy of all data we hold on you.</li>
            <li><strong>Rectify</strong> — fix anything wrong.</li>
            <li><strong>Erase</strong> — be forgotten (with limits where retention is required by law).</li>
            <li><strong>Restrict / object</strong> to certain processing.</li>
            <li><strong>Port</strong> your data to another service.</li>
            <li><strong>Withdraw consent</strong> at any time — without affecting prior lawfulness.</li>
            <li><strong>Lodge a complaint</strong> with your local Data Protection Authority.</li>
          </ul>
          <p>
            To exercise any of the above, email{" "}
            <a href="mailto:[DPO_EMAIL]" className="text-primary underline">[DPO_EMAIL]</a>. We respond within 30 days.
          </p>
        </Section>

        <Section title="8. Cookies">
          <p>
            We use essential cookies to make the site work (cart, login, age gate). With your consent, we also use
            analytics, marketing and personalization cookies.
          </p>
          <button
            type="button"
            onClick={openCookiePrefs}
            className="cta-secondary px-5 py-2.5 text-sm mt-2"
          >
            Change cookie preferences
          </button>
        </Section>

        <Section title="9. Security">
          <p>
            HTTPS everywhere, password hashing, encrypted backups, principle of least privilege for staff access.
            No system is 100% secure, but we work continuously to keep yours safe.
          </p>
        </Section>

        <Section title="10. Changes">
          <p>
            We'll post any updates here and bump the date at the top. For significant changes, we'll email
            registered users at least 14 days in advance.
          </p>
        </Section>
      </article>
    </section>

    <Footer />
  </>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h2 className="font-display font-black italic text-foreground text-2xl mb-3">{title}</h2>
    <div className="space-y-3">{children}</div>
  </div>
);

export default PrivacyPolicyPage;
