const trust = [
  { icon: "📦", title: "Discreet", sub: "No logos. No questions." },
  { icon: "⚡", title: "24–48h", sub: "Ships fast, always." },
  { icon: "🔒", title: "Private", sub: "Your car. Your secret." },
];

const TrustBar = () => (
  <div className="bg-background paper-bg py-5 sm:py-4 px-4 lg:px-12 border-b-4 border-dark">
    <div className="max-w-[1200px] mx-auto grid grid-cols-3 gap-3 sm:gap-6">
      {trust.map((item) => (
        <div key={item.title} className="flex items-center gap-2.5 sm:gap-3 justify-center">
          <span className="text-2xl sm:text-2xl">{item.icon}</span>
          <div>
            <div className="font-display font-black text-[0.8rem] sm:text-[0.85rem] text-foreground leading-tight">{item.title}</div>
            <div className="font-serif italic text-[0.62rem] sm:text-[0.72rem] text-foreground/50 leading-snug mt-0.5">{item.sub}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TrustBar;
