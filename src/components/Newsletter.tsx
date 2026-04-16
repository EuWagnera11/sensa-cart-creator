import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import member1 from "@/assets/club-member-1.webp";
import member2 from "@/assets/club-member-2.webp";
import member3 from "@/assets/club-member-3.webp";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("Type your email first 💌");
      return;
    }

    toast.success("You're on the list ✨", {
      description: `${email} will get the next drop, the best offers and zero judgement.`,
    });
    setEmail("");
  };

  return (
    <div id="newsletter" className="bg-primary border-y-[5px] border-dark py-12 px-6 lg:px-12 text-center relative overflow-hidden">
      {/* Background OoohMy watermark */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display italic font-black text-[16rem] text-cream/[0.04] whitespace-nowrap pointer-events-none select-none">
        OoohMy
      </span>

      {/* Halftone dot overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--dark) / 0.08) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Heading */}
      <h2 className="font-display font-black italic text-cream relative z-[1] mb-1.5" style={{ fontSize: "clamp(2rem,4vw,3.5rem)" }}>
        Join the Secret Club.
      </h2>
      <p className="font-serif italic text-cream/60 relative z-[1] mb-1 text-[1.1rem]">
        We don't talk about it.
      </p>
      <p className="font-display italic font-bold text-cream/80 relative z-[1] mb-8 text-[0.95rem] tracking-wide">
        Private drops. Early access. Zero judgement.
      </p>

      {/* Email form */}
      <form className="max-w-[480px] mx-auto relative z-[1]" style={{ boxShadow: "6px 6px 0 hsl(var(--dark))" }} onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row">
          <input
            type="email"
            placeholder="Your private email..."
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="flex-1 px-6 py-4 font-display italic bg-cream text-foreground border-[3px] border-dark sm:border-r-0 rounded-t-[2px] sm:rounded-l-[2px] sm:rounded-tr-none outline-none"
          />
          <button type="submit" className="yellow-texture-fill border-[3px] border-dark px-7 py-4 font-display italic font-bold text-[1rem] whitespace-nowrap rounded-b-[2px] sm:rounded-r-[2px] sm:rounded-bl-none transition-colors">
            Let me in →
          </button>
        </div>
      </form>

      <p className="text-[0.78rem] mt-4 font-serif italic relative z-[1] text-cream/50">
        6,500+ members already inside. None of them talk. ✨
      </p>

      {/* Member avatars - closer to the text above */}
      <div className="relative z-[1] flex items-center justify-center -space-x-4 mt-4 mb-4">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-[3px] border-cream overflow-hidden shadow-lg">
          <img src={member1} alt="Club member" loading="lazy" width={512} height={512} className="w-full h-full object-cover" />
        </div>
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-[3px] border-cream overflow-hidden shadow-lg z-10">
          <img src={member2} alt="Club member" loading="lazy" width={512} height={512} className="w-full h-full object-cover" />
        </div>
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-[3px] border-cream overflow-hidden shadow-lg">
          <img src={member3} alt="Club member" loading="lazy" width={512} height={512} className="w-full h-full object-cover" />
        </div>
      </div>

      <p className="font-display font-black italic text-cream relative z-[1] text-[1.3rem]">
        We don't kiss and tell.
      </p>
    </div>
  );
};

export default Newsletter;
