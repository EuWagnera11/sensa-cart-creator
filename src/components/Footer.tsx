import { Link } from "react-router-dom";
import { useState } from "react";

const shopLinks = [
  { label: "Buzz ⚡", to: "/category/buzz" },
  { label: "Duo 🔥", to: "/category/duo" },
  { label: "Slippery 🌶️", to: "/category/slippery" },
  { label: "Tied 🖤", to: "/category/tied" },
  { label: "Newbie 🎁", to: "/category/newbie" },
  { label: "Oops 😈", to: "/category/oops" },
];

const companyLinks = [
  { label: "Our Story", to: "/our-story" },
  { label: "No Judgment Policy", to: "/no-judgment" },
  { label: "Affiliates", to: "/affiliates" },
  { label: "Press", to: "/press" },
];

const helpLinks = [
  { label: "Discreet Shipping", to: "/faq" },
  { label: "Returns & Refunds", to: "/faq" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact Us", to: "/contact" },
];

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-dark border-t-[3px] border-primary text-white">
      {/* Newsletter — horizontal bar */}
      <div className="px-4 py-2 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <h4 className="font-display font-black italic text-xs text-accent leading-none whitespace-nowrap">
            OoohMy News
          </h4>
          <p className="font-serif italic text-[0.6rem] text-white/30 hidden sm:block whitespace-nowrap">
            Exclusive offers, new drops & zero spam.
          </p>
        </div>
        <div className="flex max-w-[300px] sm:max-w-[280px]">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 bg-white/[0.05] border border-white/[0.1] border-r-0 rounded-l-sm px-2.5 py-1 text-[0.6rem] text-white/70 placeholder:text-white/20 font-serif italic outline-none focus:border-white/20 transition-colors"
          />
          <button className="bg-primary hover:bg-primary/90 text-white font-display font-bold text-[0.55rem] px-3 py-1 rounded-r-sm tracking-wide transition-colors whitespace-nowrap">
            SUBSCRIBE
          </button>
        </div>
      </div>

      {/* Support + Info — compact row */}
      <div className="px-4 py-1.5 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
        <div className="flex items-center gap-2 text-[0.55rem] text-white/30">
          <span>🕐</span>
          <span className="font-serif italic">Mon–Fri, 10:00–18:00 CET</span>
          <Link
            to="/contact"
            className="bg-accent hover:bg-accent/90 text-dark font-display font-bold text-[0.5rem] px-3 py-0.5 rounded-sm tracking-wide transition-colors no-underline ml-1"
          >
            CONTACT US
          </Link>
        </div>
        <div className="flex items-center gap-4 text-[0.55rem] text-white/25">
          <span className="flex items-center gap-1">
            <span className="text-xs">🇪🇺</span>
            <span className="font-serif italic">Discreet Shipping</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="text-xs">🇮🇪</span>
            <span className="font-serif italic">Based in Ireland · VAT incl.</span>
          </span>
        </div>
      </div>

      {/* Links grid + Social — combined */}
      <div className="px-4 py-2 border-b border-white/[0.08] flex flex-col sm:flex-row gap-3 sm:gap-6">
        <div className="grid grid-cols-3 gap-2 flex-1 text-center sm:text-left">
          <div>
            <h5 className="font-display italic text-accent text-[0.55rem] mb-1">Shop</h5>
            <ul className="space-y-0 list-none">
              {shopLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="font-serif italic text-[0.5rem] text-white/25 hover:text-accent transition-colors no-underline leading-relaxed">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-display italic text-accent text-[0.55rem] mb-1">OoohMy</h5>
            <ul className="space-y-0 list-none">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="font-serif italic text-[0.5rem] text-white/25 hover:text-accent transition-colors no-underline leading-relaxed">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-display italic text-accent text-[0.55rem] mb-1">Help</h5>
            <ul className="space-y-0 list-none">
              {helpLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="font-serif italic text-[0.5rem] text-white/25 hover:text-accent transition-colors no-underline leading-relaxed">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social — vertical on side */}
        <div className="flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1.5 sm:pt-1">
          <span className="font-display italic text-accent text-[0.55rem]">Social</span>
          <div className="flex gap-1.5">
            {[
              { label: "Instagram", icon: "📸" },
              { label: "TikTok", icon: "🎵" },
              { label: "Twitter", icon: "𝕏" },
            ].map((s) => (
              <button
                key={s.label}
                className="w-5 h-5 rounded-full bg-white/[0.06] flex items-center justify-center text-[0.5rem] hover:bg-white/[0.12] transition-colors"
                aria-label={s.label}
              >
                {s.icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Logo + Legal + Payment + Copyright — all merged */}
      <div className="px-4 py-2 text-center flex flex-col items-center gap-1">
        <div className="font-display font-black italic text-sm leading-none">
          <span className="text-primary">Oooh</span>
          <span className="text-accent">My</span>
          <span className="text-neon-pink">.</span>
        </div>
        <div className="flex items-center gap-1.5">
          {["VISA", "MC", "PAYPAL", "MBWAY", "KLARNA"].map((card) => (
            <span key={card} className="bg-white/[0.06] rounded-[2px] px-1 py-0 text-[0.38rem] font-bold text-white/25 tracking-wide">
              {card}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[0.42rem]">
          <Link to="/faq" className="text-white/20 hover:text-white/40 transition-colors no-underline font-serif italic">Privacy</Link>
          <Link to="/faq" className="text-white/20 hover:text-white/40 transition-colors no-underline font-serif italic">Terms</Link>
          <Link to="/faq" className="text-white/20 hover:text-white/40 transition-colors no-underline font-serif italic">Cookies</Link>
          <span className="text-white/10">·</span>
          <span className="text-white/10 font-serif italic">© 2026 OoohMy.eu</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
