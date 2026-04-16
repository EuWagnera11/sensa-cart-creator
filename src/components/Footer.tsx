import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-dark border-t-[5px] border-primary px-5 sm:px-6 lg:px-12 pt-12 sm:pt-20 pb-8 sm:pb-10">
    <div className="max-w-[1440px] mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-8 sm:gap-12 mb-10 sm:mb-14 pb-10 sm:pb-14 border-b border-white/[0.08]">
        <div className="max-w-[340px]">
          <div className="font-display font-black italic text-4xl lg:text-[3rem] leading-none mb-3">
            <span className="text-primary">Oooh</span>
            <span className="text-accent">My</span>
            <span className="text-neon-pink">.</span>
          </div>
          <p className="font-serif italic text-[0.85rem] text-white/30 leading-[1.8] max-w-[280px]">
            Pleasure, unfiltered. Fast delivery, discreet packaging, zero judgement. Because you deserve this — and we both know it.
          </p>
        </div>

        <div>
          <h4 className="font-display italic text-accent mb-[18px] text-[1rem]">The Secret Menu</h4>
          <ul className="space-y-[10px] list-none">
            {[
              { label: "Buzz — Vibrators ⚡", to: "/category/buzz" },
              { label: "Duo — For Couples 🔥", to: "/category/duo" },
              { label: "Slippery — Gels & Lubes 🌶️", to: "/category/slippery" },
              { label: "Tied — Bondage 🖤", to: "/category/tied" },
              { label: "Newbie — Starter Kits 🎁", to: "/category/newbie" },
              { label: "Oops — Sale 😈", to: "/category/oops" },
            ].map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="font-serif italic text-[0.82rem] text-white/35 hover:text-accent transition-colors no-underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display italic text-accent mb-[18px] text-[1rem]">OoohMy</h4>
          <ul className="space-y-[10px] list-none">
            {[
              { label: "Our Story", to: "/our-story" },
              { label: "No Judgment Policy", to: "/no-judgment" },
              { label: "Affiliates", to: "/affiliates" },
              { label: "Press", to: "/press" },
            ].map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="font-serif italic text-[0.82rem] text-white/35 hover:text-accent transition-colors no-underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display italic text-accent mb-[18px] text-[1rem]">Help</h4>
          <ul className="space-y-[10px] list-none">
            {[
              { label: "Discreet Shipping", to: "/faq" },
              { label: "Returns", to: "/faq" },
              { label: "FAQ", to: "/faq" },
              { label: "Contact", to: "/contact" },
            ].map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="font-serif italic text-[0.82rem] text-white/35 hover:text-accent transition-colors no-underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-between items-center flex-wrap gap-4">
        <span className="text-[0.68rem] text-white/20">© 2026 OoohMy.eu — Pleasure, no questions asked. 🇮🇪 Based in Ireland · 🇪🇺 Ships across Europe</span>
        <div className="flex gap-2">
          {["VISA", "MC", "PAYPAL", "MBWAY"].map((card) => (
            <span key={card} className="bg-white/[0.08] rounded-[3px] px-2.5 py-1 text-[0.58rem] font-bold text-white/30 tracking-wide">
              {card}
            </span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
