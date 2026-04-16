const items = [
  "All Pleasure",
  "OoohMy",
  "Just Browsing? Sure You Are.",
  "Boring is a Choice. Bad One.",
  "Curiosity always wins.",
  "One click away from a better night.",
  "You know you want to.",
  "Go on. Take a look.",
];

const MarqueeBand = () => (
  <div className="bg-dark py-3.5 overflow-hidden border-y-[3px] border-primary">
    <div className="flex whitespace-nowrap" style={{ animation: "marquee 12s linear infinite" }}>
      {[...items, ...items, ...items].map((item, i) => (
        <span key={i} className="font-display italic text-[0.85rem] sm:text-[1.1rem] text-accent px-4 sm:px-10 flex-shrink-0">
          {item} <b className="text-neon-pink not-italic">✦</b>
        </span>
      ))}
    </div>
  </div>
);

export default MarqueeBand;
