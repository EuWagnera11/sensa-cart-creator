import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, ShoppingBag, X, User, User as UserIcon, LogOut, Search, Package, Store, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useShopifyCart } from "@/stores/shopifyCart";
import { useAuth } from "@/hooks/useAuth";
import { useWishlist } from "@/hooks/useWishlist";
import SearchOverlay from "@/components/SearchOverlay";

const navItems = [
  { name: "Buzz", sub: "Vibrators", to: "/category/buzz" },
  { name: "Duo", sub: "For couples", to: "/category/duo" },
  { name: "Slippery", sub: "Gels & lubes", to: "/category/slippery" },
  { name: "Tied", sub: "Bondage", to: "/category/tied" },
  { name: "Newbie", sub: "Starter kits", to: "/category/newbie" },
  { name: "Oops 🔥", sub: "Sale", to: "/category/oops", highlight: true },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  useCart(); // legacy cart still used by other pages
  const shopifyItems = useShopifyCart((s) => s.items);
  const setShopifyOpen = useShopifyCart((s) => s.setIsOpen);
  const shopifyCount = shopifyItems.reduce((s, i) => s + i.quantity, 0);
  const { user, signOut } = useAuth();
  const { count: wishlistCount } = useWishlist();

  return (
    <nav className="bg-dark border-b-4 border-primary sticky top-0 z-[100]">
      <div className="flex items-center justify-between px-4 lg:px-8 xl:px-12 3xl:px-16 h-[58px] xl:h-[66px] 3xl:h-[80px] max-w-[1440px] 3xl:max-w-[1800px] mx-auto gap-4">
        <Link to="/" className="font-display italic font-black text-[2rem] tracking-[0.5px] flex items-center shrink-0 no-underline">
          <span className="text-accent">Oooh</span>
          <span className="text-cream">My</span>
          <span className="text-primary">.</span>
        </Link>

        <ul className="hidden lg:flex list-none">
          {navItems.map((item, index) => (
            <li key={item.name}>
              <NavLink
                to={item.to}
                className={({ isActive }) => `flex flex-col items-center px-[10px] xl:px-[14px] h-[58px] xl:h-[66px] justify-center no-underline transition-colors ${index < navItems.length - 1 ? "border-r border-white/10" : ""} ${
                  isActive || location.pathname.startsWith(item.to) ? "bg-white/[0.07]" : "hover:bg-white/[0.07]"
                }`}
              >
                <span className={`font-display italic font-bold text-[0.9rem] whitespace-nowrap transition-colors ${item.highlight ? "text-accent" : "text-white/80 hover:text-accent"}`}>
                  {item.name}
                </span>
                <span className="text-[0.48rem] tracking-[2px] uppercase text-white/25 mt-0.5">{item.sub}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* Shop link */}
          <Link
            to="/shop"
            className="hidden sm:inline-flex items-center gap-1.5 text-white/60 hover:text-accent transition-colors font-display italic text-[0.82rem] no-underline"
            title="Shop"
          >
            <Store size={15} /> Shop
          </Link>

          {/* Search */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="text-white/50 hover:text-accent transition-colors p-1.5"
            title="Search"
          >
            <Search size={18} />
          </button>

          {/* Auth button */}
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/account"
                className="inline-flex items-center gap-1.5 text-white/50 hover:text-accent transition-colors font-display italic text-[0.82rem] no-underline"
                title="My Account"
              >
                <UserIcon size={15} />
              </Link>
              <Link
                to="/orders"
                className="inline-flex items-center gap-1.5 text-white/50 hover:text-accent transition-colors font-display italic text-[0.82rem] no-underline"
                title="My Orders"
              >
                <Package size={15} />
              </Link>
            </div>
          ) : (
            <Link
              to="/auth"
              className="inline-flex items-center gap-1.5 text-white/50 hover:text-accent transition-colors font-display italic text-[0.82rem] no-underline"
            >
              <User size={15} />
            </Link>
          )}

          {/* Wishlist */}
          <Link
            to="/account/wishlist"
            aria-label={`Wishlist (${wishlistCount} item${wishlistCount === 1 ? "" : "s"})`}
            className="relative inline-flex items-center justify-center w-10 h-10 text-white/60 hover:text-accent transition-colors no-underline"
          >
            <Heart size={18} />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-primary text-cream rounded-full font-display italic font-black text-[10px] tabular-nums border-[2px] border-dark">
                {wishlistCount > 99 ? "99+" : wishlistCount}
              </span>
            )}
          </Link>

          {/* Shopify Bag button */}
          <button
            type="button"
            className="relative text-cream p-2"
            onClick={() => setShopifyOpen(true)}
            title="Shop bag"
          >
            <ShoppingBag size={22} />
            {shopifyCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-primary text-white text-[0.6rem] font-bold rounded-full flex items-center justify-center border border-dark">
                {shopifyCount}
              </span>
            )}
          </button>
          <button className="lg:hidden text-cream rounded-full border border-white/10 bg-white/[0.03] p-2.5" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-dark border-t border-white/10 px-6 pb-6">
          {navItems.map((item) => (
            <NavLink key={item.name} to={item.to} className="block py-4 border-b border-white/5 no-underline" onClick={() => setMobileOpen(false)}>
              <span className={`font-display italic font-bold ${item.highlight ? "text-accent" : "text-white/80"}`}>{item.name}</span>
              <span className="text-white/25 text-xs ml-2">{item.sub}</span>
            </NavLink>
          ))}
          <div className="pt-4">
            {user ? (
              <div className="flex flex-col gap-3">
                <Link to="/orders" onClick={() => setMobileOpen(false)} className="text-white/50 font-display italic text-sm flex items-center gap-2 no-underline">
                  <Package size={15} /> My Orders
                </Link>
                <button onClick={() => { signOut(); setMobileOpen(false); }} className="text-white/50 font-display italic text-sm flex items-center gap-2">
                  <LogOut size={15} /> Sign Out
                </button>
              </div>
            ) : (
              <Link to="/auth" onClick={() => setMobileOpen(false)} className="text-accent font-display italic text-sm flex items-center gap-2 no-underline">
                <User size={15} /> Sign In
              </Link>
            )}
          </div>
        </div>
      )}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </nav>
  );
};

export default Navbar;
