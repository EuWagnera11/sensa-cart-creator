import { Link } from "react-router-dom";

const shopLinks = [
  { label: "Buzz — Vibrators ⚡", to: "/category/buzz" },
  { label: "Duo — For Couples 🔥", to: "/category/duo" },
  { label: "Slippery — Gels & Lubes 🌶️", to: "/category/slippery" },
  { label: "Tied — Bondage 🖤", to: "/category/tied" },
  { label: "Newbie — Starter Kits 🎁", to: "/category/newbie" },
  { label: "Oops — Sale 😈", to: "/category/oops" },
];

const companyLinks = [
  { label: "Our Story", to: "/our-story" },
  { label: "No Judgment Policy", to: "/no-judgment" },
  { label: "Affiliates", to: "/affiliates" },
  { label: "Press", to: "/press" },
];

const helpLinks = [
  { label: "Discreet Shipping", to: "/faq" },
  { label: "Returns", to: "/faq" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

const Footer = () => {
  return (
    <footer className="bg-dark text-white">
      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-[1.2fr_1fr_0.8fr_0.6fr] gap-8 sm:gap-6">
        {/* Brand column */}
        <div>
          <div className="font-display font-black italic text-3xl leading-none mb-3">
            <span className="text-primary">Oooh</span>
            <span className="text-accent">My</span>
            <span className="text-neon-pink">.</span>
          </div>
          <p className="font-serif italic text-[0.75rem] text-white/30 leading-relaxed max-w-[260px]">
            Pleasure, unfiltered. Fast delivery, discreet packaging, zero judgement. Because you deserve this — and we both know it.
          </p>
        </div>

        {/* The Secret Menu */}
        <div>
          <h5 className="font-display italic text-accent text-sm mb-3">The Secret Menu</h5>
          <ul className="space-y-1.5 list-none">
            {shopLinks.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="font-serif italic text-[0.75rem] text-white/30 hover:text-accent transition-colors no-underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* OoohMy */}
        <div>
          <h5 className="font-display italic text-accent text-sm mb-3">OoohMy</h5>
          <ul className="space-y-1.5 list-none">
            {companyLinks.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="font-serif italic text-[0.75rem] text-white/30 hover:text-accent transition-colors no-underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <h5 className="font-display italic text-accent text-sm mb-3">Help</h5>
          <ul className="space-y-1.5 list-none">
            {helpLinks.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="font-serif italic text-[0.75rem] text-white/30 hover:text-accent transition-colors no-underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.08] px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-6xl mx-auto">
        <p className="text-[0.65rem] text-white/20 font-serif italic text-center sm:text-left">
          © 2026 OoohMy.eu — Pleasure, no questions asked. 🇮🇪 Based in Ireland · 🇪🇺 Ships across Europe
        </p>
        <div className="flex items-center gap-1.5">
          {["VISA", "MC", "PAYPAL", "MBWAY"].map((card) => (
            <span key={card} className="bg-white/[0.06] border border-white/[0.08] rounded px-2 py-0.5 text-[0.5rem] font-bold text-white/30 tracking-wide">
              {card}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
