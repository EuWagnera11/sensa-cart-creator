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
    <footer className="bg-dark border-t-[4px] border-primary">
      {/* Newsletter */}
      <div className="px-4 py-5 border-b border-white/[0.08] text-center">
        <h4 className="font-display font-black italic text-sm text-accent leading-none mb-0.5">
          OoohMy News
        </h4>
        <p className="font-serif italic text-[0.6rem] text-white/30 mb-2.5">
          Exclusive offers, new drops & zero spam.
        </p>
        <div className="flex max-w-[340px] mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 bg-white/[0.05] border border-white/[0.1] border-r-0 rounded-l-sm px-3 py-1.5 text-[0.65rem] text-white/70 placeholder:text-white/20 font-serif italic outline-none focus:border-white/20 transition-colors"
          />
          <button className="bg-primary hover:bg-primary/90 text-white font-display font-bold text-[0.6rem] px-4 py-1.5 rounded-r-sm tracking-wide transition-colors">
            SUBSCRIBE
          </button>
        </div>
      </div>

      {/* Support */}
      <div className="px-4 py-4 border-b border-white/[0.08] text-center flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-1.5 text-[0.6rem] text-white/30">
          <span>🕐</span>
          <span className="font-serif italic">Mon–Fri, 10:00–18:00 CET</span>
        </div>
        <Link
          to="/contact"
          className="inline-block bg-accent hover:bg-accent/90 text-dark font-display font-bold text-[0.6rem] px-5 py-1.5 rounded-sm tracking-wide transition-colors no-underline"
        >
          CONTACT US
        </Link>
      </div>

      {/* Info blocks */}
      <div className="grid grid-cols-2 border-b border-white/[0.08]">
        <div className="px-3 py-3 text-center border-r border-white/[0.08]">
          <span className="text-base leading-none">🇪🇺</span>
          <p className="font-display italic text-[0.6rem] text-white/50 mt-1 leading-tight">Discreet Shipping</p>
          <p className="font-serif italic text-[0.5rem] text-white/20 mt-0.5 leading-snug">Plain packaging across Europe</p>
        </div>
        <div className="px-3 py-3 text-center">
          <span className="text-base leading-none">🇮🇪</span>
          <p className="font-display italic text-[0.6rem] text-white/50 mt-1 leading-tight">Based in Ireland</p>
          <p className="font-serif italic text-[0.5rem] text-white/20 mt-0.5 leading-snug">All prices include VAT</p>
        </div>
      </div>

      {/* Links grid */}
      <div className="grid grid-cols-3 gap-3 px-4 py-4 border-b border-white/[0.08] text-center">
        <div>
          <h5 className="font-display italic text-accent text-[0.6rem] mb-1.5">Shop</h5>
          <ul className="space-y-0.5 list-none">
            {shopLinks.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="font-serif italic text-[0.5rem] text-white/25 hover:text-accent transition-colors no-underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="font-display italic text-accent text-[0.6rem] mb-1.5">OoohMy</h5>
          <ul className="space-y-0.5 list-none">
            {companyLinks.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="font-serif italic text-[0.5rem] text-white/25 hover:text-accent transition-colors no-underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="font-display italic text-accent text-[0.6rem] mb-1.5">Help</h5>
          <ul className="space-y-0.5 list-none">
            {helpLinks.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="font-serif italic text-[0.5rem] text-white/25 hover:text-accent transition-colors no-underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Social */}
      <div className="flex justify-center gap-3 px-4 py-3 border-b border-white/[0.08]">
        {[
          { label: "Instagram", icon: "📸" },
          { label: "TikTok", icon: "🎵" },
          { label: "Twitter", icon: "𝕏" },
        ].map((s) => (
          <button
            key={s.label}
            className="w-7 h-7 rounded-full bg-white/[0.06] flex items-center justify-center text-[0.65rem] hover:bg-white/[0.12] transition-colors"
            aria-label={s.label}
          >
            {s.icon}
          </button>
        ))}
      </div>

      {/* Logo + Legal */}
      <div className="px-4 py-3 border-b border-white/[0.08] text-center">
        <div className="font-display font-black italic text-lg leading-none mb-1">
          <span className="text-primary">Oooh</span>
          <span className="text-accent">My</span>
          <span className="text-neon-pink">.</span>
        </div>
        <p className="text-[0.45rem] text-white/15 leading-relaxed max-w-[320px] mx-auto mb-1.5">
          OoohMy.eu is a registered brand. All prices include VAT. GDPR compliant. 🇮🇪 Based in Ireland · 🇪🇺 Ships across Europe.
        </p>
        <div className="flex justify-center gap-3 text-[0.48rem]">
          <Link to="/faq" className="text-white/20 hover:text-white/40 transition-colors no-underline font-serif italic">Privacy</Link>
          <Link to="/faq" className="text-white/20 hover:text-white/40 transition-colors no-underline font-serif italic">Terms</Link>
          <Link to="/faq" className="text-white/20 hover:text-white/40 transition-colors no-underline font-serif italic">Cookies</Link>
        </div>
      </div>

      {/* Payment badges */}
      <div className="flex justify-center gap-1.5 px-4 py-2.5 border-b border-white/[0.08]">
        {["VISA", "MC", "PAYPAL", "MBWAY", "KLARNA"].map((card) => (
          <span key={card} className="bg-white/[0.06] rounded-[2px] px-1.5 py-0.5 text-[0.42rem] font-bold text-white/25 tracking-wide">
            {card}
          </span>
        ))}
      </div>

      {/* Copyright */}
      <div className="py-2 text-center">
        <span className="text-[0.42rem] text-white/10">© 2026 OoohMy.eu — All rights reserved. 100% discreet. Always.</span>
      </div>
    </footer>
  );
};

export default Footer;
