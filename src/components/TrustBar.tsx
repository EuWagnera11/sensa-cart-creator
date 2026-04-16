const trust = [
  { icon: "📦", title: "Your neighbours? Clueless.", sub: '"No logos. No questions. Nothing to explain."' },
  { icon: "⚡", title: "Faster than your excuses.", sub: '"Ships in 24–48h. Discreet, always."' },
  { icon: "🔒", title: "Nothing to explain.", sub: '"Your car. Your secret."' },
];

const TrustBar = () => (
  <div className="bg-background paper-bg py-5 sm:py-10 lg:py-14 px-4 lg:px-12 border-b-4 border-dark">
    <div className="max-w-[1200px] mx-auto grid grid-cols-3 gap-3 sm:gap-6">
      {trust.map((item) => (
        <div key={item.title} className="flex items-center gap-2.5 sm:gap-0 sm:flex-col sm:text-center justify-center sm:bg-parch sm:border-[2px] sm:border-dark/10 sm:rounded-lg sm:px-6 sm:py-8">
          <span className="text-2xl sm:text-4xl sm:mb-4">{item.icon}</span>
          <div>
            <div className="font-display font-black text-[0.8rem] sm:text-[1rem] text-foreground leading-tight">{item.title}</div>
            <div className="font-serif italic text-[0.62rem] sm:text-[0.82rem] text-foreground/50 leading-snug mt-0.5 sm:mt-2">{item.sub}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TrustBar;
