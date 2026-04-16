import { Link } from "react-router-dom";

const categories = [
  { label: "Buzz ⚡", to: "/category/buzz" },
  { label: "Duo 🔥", to: "/category/duo" },
  { label: "Slippery 🌶️", to: "/category/slippery" },
  { label: "Tied 🖤", to: "/category/tied" },
  { label: "Newbie 🎁", to: "/category/newbie" },
  { label: "Oops 😈", to: "/category/oops" },
];

const company = [
  { label: "Our Story", to: "/our-story" },
  { label: "No Judgment", to: "/no-judgment" },
  { label: "Affiliates", to: "/affiliates" },
  { label: "Press", to: "/press" },
];

const help = [
  { label: "Shipping", to: "/faq" },
  { label: "Returns", to: "/faq" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

const Footer = () => (
  <footer className="bg-dark border-t-[5px] border-primary px-5 sm:px-6 lg:px-12 pt-6 sm:pt-14 pb-5 sm:pb-8">
    <div className="max-w-[1440px] mx-auto">
      {/* Logo + desc — inline on mobile */}
      <div className="mb-4 sm:mb-8">
        <div className="font-display font-black italic text-xl sm:text-3xl leading-none mb-1 sm:mb-2">
          <span className="text-primary">Oooh</span>
          <span className="text-accent">My</span>
          <span className="text-neon-pink">.</span>
        </div>
        <p className="font-serif italic text-[0.65rem] sm:text-[0.8rem] text-white/25 leading-relaxed max-w-[300px]">
          Pleasure, unfiltered. Discreet packaging, zero judgement.
        </p>
      </div>

      {/* Links — 3 columns, compact on mobile */}
      <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-4 sm:mb-8 pb-4 sm:pb-8 border-b border-white/[0.06]">
        <div>
          <h4 className="font-display italic text-accent mb-1.5 sm:mb-3 text-[0.68rem] sm:text-[0.9rem]">Shop</h4>
          <ul className="space-y-0.5 sm:space-y-1.5 list-none">
            {categories.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="font-serif italic text-[0.6rem] sm:text-[0.78rem] text-white/30 hover:text-accent transition-colors no-underline leading-relaxed">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display italic text-accent mb-1.5 sm:mb-3 text-[0.68rem] sm:text-[0.9rem]">OoohMy</h4>
          <ul className="space-y-0.5 sm:space-y-1.5 list-none">
            {company.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="font-serif italic text-[0.6rem] sm:text-[0.78rem] text-white/30 hover:text-accent transition-colors no-underline leading-relaxed">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display italic text-accent mb-1.5 sm:mb-3 text-[0.68rem] sm:text-[0.9rem]">Help</h4>
          <ul className="space-y-0.5 sm:space-y-1.5 list-none">
            {help.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="font-serif italic text-[0.6rem] sm:text-[0.78rem] text-white/30 hover:text-accent transition-colors no-underline leading-relaxed">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex justify-between items-center flex-wrap gap-2">
        <span className="text-[0.5rem] sm:text-[0.62rem] text-white/15">© 2026 OoohMy.eu · 🇮🇪 Ireland · 🇪🇺 EU</span>
        <div className="flex gap-1 sm:gap-1.5">
          {["VISA", "MC", "PAYPAL", "MBWAY"].map((card) => (
            <span key={card} className="bg-white/[0.06] rounded-[2px] px-1.5 py-0.5 sm:px-2 sm:py-0.5 text-[0.45rem] sm:text-[0.52rem] font-bold text-white/25 tracking-wide">
              {card}
            </span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
