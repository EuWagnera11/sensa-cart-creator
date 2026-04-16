import { Link } from "react-router-dom";

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

const socials = [
  { label: "Instagram", icon: "📸" },
  { label: "TikTok", icon: "🎵" },
  { label: "Twitter", icon: "𝕏" },
];

const Footer = () => (
  <footer className="bg-dark border-t-[5px] border-primary">
    {/* Main footer content */}
    <div className="px-5 sm:px-6 lg:px-12 pt-8 sm:pt-12 pb-6 sm:pb-8">
      <div className="max-w-[1440px] mx-auto">
        {/* Top row: Logo + Support info */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-6 sm:mb-10 pb-5 sm:pb-8 border-b border-white/[0.06]">
          <div>
            <div className="font-display font-black italic text-2xl sm:text-3xl leading-none mb-1.5">
              <span className="text-primary">Oooh</span>
              <span className="text-accent">My</span>
              <span className="text-neon-pink">.</span>
            </div>
            <p className="font-serif italic text-[0.65rem] sm:text-[0.78rem] text-white/25 leading-relaxed max-w-[280px]">
              Pleasure, unfiltered. Discreet packaging, zero judgement.
            </p>
          </div>

          <div className="flex flex-col sm:items-end gap-2">
            <div className="flex items-center gap-1.5 text-[0.6rem] sm:text-[0.7rem] text-white/30">
              <span>📧</span>
              <a href="mailto:hello@ooohmy.eu" className="text-white/40 hover:text-accent transition-colors no-underline font-serif italic">
                hello@ooohmy.eu
              </a>
            </div>
            <div className="flex items-center gap-1.5 text-[0.6rem] sm:text-[0.7rem] text-white/30">
              <span>🕐</span>
              <span className="font-serif italic">Mon–Fri, 10:00–18:00 CET</span>
            </div>
            <div className="flex gap-3 mt-1">
              {socials.map((s) => (
                <button key={s.label} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/[0.06] flex items-center justify-center text-[0.7rem] hover:bg-white/[0.12] transition-colors" aria-label={s.label}>
                  {s.icon}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-5 sm:mb-8 pb-5 sm:pb-8 border-b border-white/[0.06]">
          <div>
            <h4 className="font-display italic text-accent mb-2 sm:mb-3 text-[0.68rem] sm:text-[0.85rem]">Shop</h4>
            <ul className="space-y-1 sm:space-y-1.5 list-none">
              {shopLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="font-serif italic text-[0.58rem] sm:text-[0.75rem] text-white/30 hover:text-accent transition-colors no-underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display italic text-accent mb-2 sm:mb-3 text-[0.68rem] sm:text-[0.85rem]">OoohMy</h4>
            <ul className="space-y-1 sm:space-y-1.5 list-none">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="font-serif italic text-[0.58rem] sm:text-[0.75rem] text-white/30 hover:text-accent transition-colors no-underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display italic text-accent mb-2 sm:mb-3 text-[0.68rem] sm:text-[0.85rem]">Help</h4>
            <ul className="space-y-1 sm:space-y-1.5 list-none">
              {helpLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="font-serif italic text-[0.58rem] sm:text-[0.75rem] text-white/30 hover:text-accent transition-colors no-underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal + payments */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div>
            <div className="flex gap-1.5 sm:gap-2 mb-2">
              {["VISA", "MC", "PAYPAL", "MBWAY", "KLARNA"].map((card) => (
                <span key={card} className="bg-white/[0.06] rounded-[2px] px-1.5 py-0.5 sm:px-2 sm:py-0.5 text-[0.45rem] sm:text-[0.52rem] font-bold text-white/25 tracking-wide">
                  {card}
                </span>
              ))}
            </div>
            <p className="text-[0.48rem] sm:text-[0.55rem] text-white/15 leading-relaxed max-w-[400px]">
              OoohMy.eu is a registered brand. All prices include VAT. 🇮🇪 Based in Ireland · 🇪🇺 Ships across Europe.
              By using this site you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
          <div className="flex gap-3 sm:gap-4 text-[0.5rem] sm:text-[0.58rem]">
            <Link to="/faq" className="text-white/20 hover:text-white/40 transition-colors no-underline font-serif italic">Privacy</Link>
            <Link to="/faq" className="text-white/20 hover:text-white/40 transition-colors no-underline font-serif italic">Terms</Link>
            <Link to="/faq" className="text-white/20 hover:text-white/40 transition-colors no-underline font-serif italic">Cookies</Link>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-white/[0.04] text-center">
          <span className="text-[0.45rem] sm:text-[0.5rem] text-white/10">© 2026 OoohMy.eu — All rights reserved. 100% discreet. Always.</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
