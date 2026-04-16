import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { products, type Product } from "@/data/products";
import { getProductImage } from "@/data/productImages";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const normalise = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setQuery("");
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

  if (!isOpen) return null;

  const results: Product[] = query.length >= 2
    ? products.filter((p) => {
        const q = normalise(query);
        return normalise(p.name).includes(q) || normalise(p.category).includes(q) || normalise(p.description).includes(q);
      }).slice(0, 8)
    : [];

  const seen = new Set<string>();
  const unique = results.filter((p) => {
    const base = p.name.toLowerCase();
    if (seen.has(base)) return false;
    seen.add(base);
    return true;
  });

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
            placeholder="Search products..."
            className="flex-1 bg-transparent font-serif text-base outline-none placeholder:text-muted-foreground/50"
          />
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={18} />
          </button>
        </div>

        {query.length >= 2 && (
          <div className="max-h-[400px] overflow-y-auto">
            {unique.length === 0 ? (
              <div className="px-5 py-8 text-center">
                <p className="font-serif italic text-muted-foreground">Nenhum resultado para "{query}"</p>
              </div>
            ) : (
              <>
                <ul className="py-2">
                  {unique.map((product) => {
                    const img = getProductImage(product.id);
                    return (
                      <li key={product.id}>
                        <Link
                          to={`/category/${product.categorySlug}/product/${product.slug}`}
                          onClick={onClose}
                          className="flex items-center gap-4 px-5 py-3 hover:bg-dark/[0.04] transition-colors no-underline"
                        >
                          <div className="w-12 h-12 rounded-sm border-2 border-dark/10 overflow-hidden shrink-0 bg-parch">
                            {img ? (
                              <img src={img} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="flex items-center justify-center w-full h-full text-xl">{product.emoji}</span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-display italic font-bold text-sm text-foreground truncate">{product.name}</p>
                            <p className="font-serif text-xs text-muted-foreground truncate">{product.category}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="font-display font-bold text-sm text-primary">€{product.price}</span>
                            {product.originalPrice && (
                              <span className="block font-serif text-xs text-muted-foreground line-through">€{product.originalPrice}</span>
                            )}
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <Link
                  to={`/products?q=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="block text-center py-3 border-t-2 border-dark/10 font-display italic text-sm font-bold text-primary hover:bg-dark/[0.03] transition-colors no-underline"
                >
                  See all results →
                </Link>
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
