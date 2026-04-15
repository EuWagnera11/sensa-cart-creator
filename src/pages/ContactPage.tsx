import { ArrowLeft, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import AnnounceBanner from "@/components/AnnounceBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) { toast.error("Please fill in all fields."); return; }
    toast.success("Message sent! We'll get back to you soon. 💌");
    setName(""); setEmail(""); setMessage("");
  };

  return (
    <>
      <AnnounceBanner />
      <Navbar />
      <section className="bg-cream paper-bg border-b-[5px] border-dark">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
          <Link to="/" className="inline-flex items-center gap-2 font-display italic text-sm text-muted-foreground hover:text-primary transition-colors no-underline mb-8"><ArrowLeft size={16} /> Back to Home</Link>
          <p className="section-kicker text-primary mb-3">Get in touch</p>
          <h1 className="font-display font-black italic text-foreground leading-none mb-5" style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}>Contact.</h1>
          <p className="font-serif italic text-muted-foreground text-lg max-w-3xl leading-relaxed">Questions, ideas, compliments or complaints — we read everything.</p>
        </div>
      </section>
      <section className="bg-parch paper-bg px-6 lg:px-12 py-16 border-b-[3px] border-dark">
        <div className="max-w-[900px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-8">
          <form onSubmit={handleSubmit} className="bg-cream border-[3px] border-dark p-8 shadow-[5px_5px_0_hsl(var(--dark))] space-y-5">
            <div>
              <label className="font-display italic font-bold text-foreground text-sm block mb-1.5">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 border-[3px] border-dark bg-parch font-body rounded-sm" placeholder="Your name" />
            </div>
            <div>
              <label className="font-display italic font-bold text-foreground text-sm block mb-1.5">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 border-[3px] border-dark bg-parch font-body rounded-sm" placeholder="your@email.com" />
            </div>
            <div>
              <label className="font-display italic font-bold text-foreground text-sm block mb-1.5">Message</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} className="w-full px-4 py-3 border-[3px] border-dark bg-parch font-body rounded-sm resize-none" placeholder="What's on your mind?" />
            </div>
            <button type="submit" className="cta-primary w-full">Send message →</button>
          </form>
          <div className="space-y-5">
            <div className="bg-dark border-[3px] border-dark p-7 shadow-[5px_5px_0_hsl(var(--primary))]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full bg-accent border-[3px] border-dark flex items-center justify-center"><Mail size={18} /></div>
                <div><h3 className="font-display font-black italic text-cream text-xl mb-1">Email</h3><a href="mailto:hello@ooohmy.eu" className="font-body text-accent no-underline">hello@ooohmy.eu</a></div>
              </div>
            </div>
            <div className="bg-dark border-[3px] border-dark p-7 shadow-[5px_5px_0_hsl(var(--primary))]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full bg-accent border-[3px] border-dark flex items-center justify-center"><MapPin size={18} /></div>
                <div><h3 className="font-display font-black italic text-cream text-xl mb-1">Location</h3><p className="font-body text-cream/70">Dublin, Ireland 🇮🇪<br />Ships across Europe 🇪🇺</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
export default ContactPage;
