const trust = [
  { icon: "📦", label: "Discreet" },
  { icon: "⚡", label: "24–48h" },
  { icon: "🔒", label: "Private" },
];

const TrustBar = () => (
  <div className="bg-background paper-bg py-2.5 px-4 lg:px-12 border-b-4 border-dark">
    <div className="max-w-[1200px] mx-auto flex items-center justify-center gap-6 sm:gap-10">
      {trust.map((item) => (
        <div key={item.label} className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-base sm:text-lg">{item.icon}</span>
          <span className="font-display font-bold text-[0.7rem] sm:text-[0.82rem] text-foreground/70 tracking-wide uppercase">{item.label}</span>
        </div>
      ))}
    </div>
  </div>
);

export default TrustBar;
