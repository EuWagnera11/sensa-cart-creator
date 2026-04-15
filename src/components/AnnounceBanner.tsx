const items = [
  "Not for everyone.",
  "OoohMy is not a mistake.",
  "Your Mum Would Be Proud. Well… maybe not.",
  "Just browsing? Sure you are.",
  "You weren't supposed to find this.",
  "What happens here, stays here.",
];

const AnnounceBanner = () => (
  <div className="bg-dark border-b-[3px] border-primary overflow-hidden py-2.5">
    <div className="flex whitespace-nowrap" style={{ animation: "marquee 20s linear infinite" }}>
      {[...items, ...items].map((item, i) => (
        <span key={i} className="font-serif italic text-[0.82rem] text-cream px-12 flex-shrink-0">
          {item} <b className="text-accent not-italic">★</b>
        </span>
      ))}
    </div>
  </div>
);

export default AnnounceBanner;
