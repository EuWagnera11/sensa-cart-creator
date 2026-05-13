import { useState } from "react";
import { ChevronDown, Truck, Package, RotateCcw, ShieldCheck } from "lucide-react";

interface Props {
  description: string;
  vendor?: string;
  /** Optional list of bullet-point spec rows: [label, value] */
  specs?: Array<[string, string]>;
}

const ProductTabs = ({ description, vendor, specs }: Props) => {
  const [open, setOpen] = useState<string>("description");

  const sections = [
    { id: "description", title: "Description" },
    { id: "specifications", title: "Specifications" },
    { id: "shipping", title: "Shipping & returns" },
    { id: "faq", title: "FAQ" },
  ];

  const defaultSpecs: Array<[string, string]> = specs?.length
    ? specs
    : [
        ["Brand", vendor || "—"],
        ["Body-safe material", "Yes"],
        ["Waterproof rating", "IPX7 (splash-proof)"],
        ["Cleaning", "Soap & water, or toy cleaner"],
        ["Warranty", "1 year manufacturer"],
      ];

  return (
    <section className="border-t-[3px] border-dark pt-10 mt-12">
      <h2 className="font-display font-black italic text-foreground text-3xl mb-6">Details</h2>

      <div className="space-y-0 border-y-[2px] border-dark/20">
        {sections.map((s, i) => {
          const isOpen = open === s.id;
          return (
            <div key={s.id} className={i > 0 ? "border-t border-dark/15" : ""}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? "" : s.id)}
                aria-expanded={isOpen}
                className="flex items-center justify-between w-full py-4 group text-left"
              >
                <span className="font-display italic font-black text-foreground text-base uppercase tracking-wider">
                  {s.title}
                </span>
                <ChevronDown
                  size={18}
                  className={`text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen && (
                <div className="pb-6">
                  {s.id === "description" && (
                    <div className="font-serif text-sm text-foreground/85 leading-relaxed whitespace-pre-line">
                      {description}
                    </div>
                  )}

                  {s.id === "specifications" && (
                    <table className="w-full text-sm">
                      <tbody>
                        {defaultSpecs.map(([label, value]) => (
                          <tr key={label} className="border-b border-dark/10 last:border-b-0">
                            <td className="py-2.5 pr-4 font-display italic text-foreground/70 text-xs uppercase tracking-wider align-top w-[40%]">
                              {label}
                            </td>
                            <td className="py-2.5 font-serif text-foreground">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  {s.id === "shipping" && (
                    <div className="space-y-4 font-serif text-sm text-foreground/85 leading-relaxed">
                      <InfoRow
                        icon={<Truck size={16} />}
                        title="Discreet shipping"
                        body="Plain brown box, no logos, no suggestive labels. Customs declaration says 'gift' or 'wellness product' as appropriate."
                      />
                      <InfoRow
                        icon={<Package size={16} />}
                        title="Delivery time"
                        body="2-4 business days within the EU. Free shipping on orders over €50."
                      />
                      <InfoRow
                        icon={<RotateCcw size={16} />}
                        title="14-day right of withdrawal"
                        body="Unopened items can be returned within 14 days. For hygiene reasons, opened intimate products cannot be returned (EU Directive 2011/83/EU)."
                      />
                      <InfoRow
                        icon={<ShieldCheck size={16} />}
                        title="2-year EU legal guarantee"
                        body="Manufacturing defects are covered for two years from delivery."
                      />
                    </div>
                  )}

                  {s.id === "faq" && (
                    <div className="space-y-4 font-serif text-sm text-foreground/85 leading-relaxed">
                      <FAQ
                        q="How discreet is the packaging?"
                        a="Completely. Plain brown box with a generic sender name. Nobody at your door — postman, neighbor, or otherwise — will know what's inside."
                      />
                      <FAQ
                        q="Will it appear on my card statement?"
                        a="The descriptor on your bank statement is neutral (something like 'OM Trading' or similar) — never the product name or category."
                      />
                      <FAQ
                        q="What if it doesn't work or arrives damaged?"
                        a="Email support within 7 days with photos. We'll arrange a free replacement or full refund — your choice."
                      />
                      <FAQ
                        q="Is this product body-safe?"
                        a="All products we sell are made of body-safe materials (medical-grade silicone, ABS, etc.) and tested to EU standards."
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

const InfoRow = ({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) => (
  <div className="flex gap-3">
    <span className="shrink-0 inline-flex items-center justify-center w-8 h-8 bg-accent border-[2px] border-dark rounded-sm text-foreground">
      {icon}
    </span>
    <div className="flex-1">
      <p className="font-display italic font-black text-foreground text-sm leading-tight mb-0.5">
        {title}
      </p>
      <p className="font-serif italic text-foreground/80">{body}</p>
    </div>
  </div>
);

const FAQ = ({ q, a }: { q: string; a: string }) => (
  <div>
    <p className="font-display italic font-black text-foreground text-sm mb-1">{q}</p>
    <p className="font-serif italic text-foreground/80">{a}</p>
  </div>
);

export default ProductTabs;
