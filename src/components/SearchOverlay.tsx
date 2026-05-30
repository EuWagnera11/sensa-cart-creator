import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { PRODUCTS_QUERY, storefrontApiRequest, shopifyImg, type ShopifyProduct } from "@/lib/shopify";
import { filterToValidHandles } from "@/lib/productGroups";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Enter" && query.length >= 2) {
        onClose();
        navigate(`/products?q=${encodeURIComponent(query)}`);
      }
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, query, navigate]);

  // Debounced live search against the Shopify Storefront API
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    const handle = setTimeout(async () => {
      try {
        const sanitized = query.replace(/[^\p{L}\p{N}\s-]/gu, "");
        const data = await storefrontApiRequest(PRODUCTS_QUERY, {
          first: 8,
          query: `title:*${sanitized}*`,
        });
        if (cancelled) return;
        setResults(
          filterToValidHandles((data?.data?.products?.edges ?? []) as ShopifyProduct[])
        );
      } catch (e) {
        if (!cancelled) setResults([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(handle);
    };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[80px] px-4">
      <div className="absolute inset-0 bg-dark/80 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-[560px] bg-cream border-[3px] border-dark rounded-sm overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200"
        style={{ boxShadow: "var(--shadow-brutal)" }}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b-[3px] border-dark/10">
          <Search size={20} className="text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search live Shopify products..."
            className="flex-1 bg-transparent font-serif text-base outline-none placeholder:text-muted-foreground/50"
          />
          {loading && <Loader2 size={16} className="animate-spin text-muted-foreground" />}
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={18} />
          </button>
        </div>

        {query.length >= 2 && (
          <div className="max-h-[400px] overflow-y-auto">
            {!loading && results.length === 0 ? (
              <div className="px-5 py-8 text-center">
                <p className="font-serif italic text-muted-foreground">Nenhum resultado para "{query}"</p>
              </div>
            ) : (
              <>
                <ul className="py-2">
                  {results.map((p) => {
                    const node = p.node;
                    const img = node.images.edges[0]?.node;
                    const price = node.priceRange.minVariantPrice;
                    const symbol = price.currencyCode === "EUR" ? "€" : price.currencyCode + " ";
                    return (
                      <li key={node.id}>
                        <Link
                          to={`/shop/product/${node.handle}`}
                          onClick={onClose}
                          className="flex items-center gap-4 px-5 py-3 hover:bg-dark/[0.04] transition-colors no-underline"
                        >
                          <div className="w-12 h-12 rounded-sm border-2 border-dark/10 overflow-hidden shrink-0 bg-parch">
                            {img ? (
                              <img src={img.url} alt={img.altText || node.title} loading="eager" className="w-full h-full object-cover" />
                            ) : (
                              <span className="flex items-center justify-center w-full h-full text-xl">🛍️</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-display italic font-bold text-sm text-foreground truncate">{node.title}</p>
                            <p className="font-serif text-xs text-muted-foreground truncate">Live · Shopify</p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="font-display font-bold text-sm text-primary">
                              {symbol}{parseFloat(price.amount).toFixed(2)}
                            </span>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                {results.length > 0 && (
                  <Link
                    to={`/products?q=${encodeURIComponent(query)}`}
                    onClick={onClose}
                    className="block text-center py-3 border-t-2 border-dark/10 font-display italic text-sm font-bold text-primary hover:bg-dark/[0.03] transition-colors no-underline"
                  >
                    See all results →
                  </Link>
                )}
              </>
            )}
          </div>
        )}

        {query.length < 2 && (
          <div className="px-5 py-6 text-center">
            <p className="font-serif italic text-sm text-muted-foreground">Type at least 2 characters to search...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
