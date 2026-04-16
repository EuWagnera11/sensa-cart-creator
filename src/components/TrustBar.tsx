const trust = [
  { icon: "📦", title: "Your neighbours? Clueless.", sub: '"No logos. No questions. Nothing to explain."' },
  { icon: "⚡", title: "Faster than your excuses.", sub: '"Ships in 24–48h. Discreet, always."' },
  { icon: "🔒", title: "Nothing to explain.", sub: '"Your car. Your secret."' },
];

const TrustBar = () => (
  <div className="bg-background paper-bg py-10 px-6 lg:px-12 border-b-4 border-dark">
    <div className="max-w-[1200px] mx-auto grid grid-cols-3 gap-3 sm:gap-6">
      {trust.map((item) => (
        <div
          key={item.title}
          className="bg-cream/60 paper-bg border-[2px] border-dark/10 rounded-[4px] px-6 py-5 flex flex-col items-center text-center"
          style={{ boxShadow: "3px 3px 0 hsl(var(--dark) / 0.06)" }}
        >
          <span className="text-3xl mb-3">{item.icon}</span>
          <div className="font-display font-black text-[0.95rem] text-foreground mb-1.5">{item.title}</div>
          <div className="font-serif italic text-[0.8rem] text-foreground/50 leading-snug">{item.sub}</div>
        </div>
      ))}
    </div>
  </div>
);

export default TrustBar;
