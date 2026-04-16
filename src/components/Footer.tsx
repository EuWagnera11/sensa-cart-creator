import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-dark border-t-[5px] border-primary px-5 sm:px-6 lg:px-12 pt-8 sm:pt-20 pb-6 sm:pb-10">
    <div className="max-w-[1440px] mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-x-6 gap-y-5 sm:gap-8 lg:gap-12 mb-6 sm:mb-14 pb-6 sm:pb-14 border-b border-white/[0.08]">
        <div className="col-span-2 lg:col-span-1 max-w-[340px]">
          <div className="font-display font-black italic text-2xl sm:text-4xl lg:text-[3rem] leading-none mb-2 sm:mb-3">
            <span className="text-primary">Oooh</span>
            <span className="text-accent">My</span>
            <span className="text-neon-pink">.</span>
          </div>
          <p className="font-serif italic text-[0.75rem] sm:text-[0.85rem] text-white/30 leading-[1.7] max-w-[280px]">
            Pleasure, unfiltered. Fast delivery, discreet packaging, zero judgement.
          </p>
        </div>

        <div>
          <h4 className="font-display italic text-accent mb-2.5 sm:mb-[18px] text-[0.82rem] sm:text-[1rem]">The Secret Menu</h4>
          <ul className="space-y-1.5 sm:space-y-[10px] list-none">
            {[
              { label: "Buzz ⚡", to: "/category/buzz" },
              { label: "Duo 🔥", to: "/category/duo" },
              { label: "Slippery 🌶️", to: "/category/slippery" },
              { label: "Tied 🖤", to: "/category/tied" },
              { label: "Newbie 🎁", to: "/category/newbie" },
              { label: "Oops 😈", to: "/category/oops" },
            ].map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="font-serif italic text-[0.72rem] sm:text-[0.82rem] text-white/35 hover:text-accent transition-colors no-underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display italic text-accent mb-2.5 sm:mb-[18px] text-[0.82rem] sm:text-[1rem]">OoohMy</h4>
          <ul className="space-y-1.5 sm:space-y-[10px] list-none">
            {[
              { label: "Our Story", to: "/our-story" },
              { label: "No Judgment", to: "/no-judgment" },
              { label: "Affiliates", to: "/affiliates" },
              { label: "Press", to: "/press" },
            ].map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="font-serif italic text-[0.72rem] sm:text-[0.82rem] text-white/35 hover:text-accent transition-colors no-underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display italic text-accent mb-2.5 sm:mb-[18px] text-[0.82rem] sm:text-[1rem]">Help</h4>
          <ul className="space-y-1.5 sm:space-y-[10px] list-none">
            {[
              { label: "Shipping", to: "/faq" },
              { label: "Returns", to: "/faq" },
              { label: "FAQ", to: "/faq" },
              { label: "Contact", to: "/contact" },
            ].map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="font-serif italic text-[0.72rem] sm:text-[0.82rem] text-white/35 hover:text-accent transition-colors no-underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-between items-center flex-wrap gap-3">
        <span className="text-[0.58rem] sm:text-[0.68rem] text-white/20">© 2026 OoohMy.eu · 🇮🇪 Ireland · 🇪🇺 Ships EU</span>
        <div className="flex gap-1.5 sm:gap-2">
          {["VISA", "MC", "PAYPAL", "MBWAY"].map((card) => (
            <span key={card} className="bg-white/[0.08] rounded-[3px] px-2 py-0.5 sm:px-2.5 sm:py-1 text-[0.5rem] sm:text-[0.58rem] font-bold text-white/30 tracking-wide">
              {card}
            </span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
