import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, ShoppingBag, X, User, LogOut, Search, Package } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";
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
  const { itemCount, setIsOpen } = useCart();
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-dark border-b-4 border-primary sticky top-0 z-[100]">
      <div className="flex items-center justify-between px-4 lg:px-8 xl:px-12 h-[58px] xl:h-[66px] max-w-[1440px] mx-auto gap-4">
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
            <div className="hidden sm:flex items-center gap-3">
              <Link
                to="/orders"
                className="inline-flex items-center gap-1.5 text-white/50 hover:text-accent transition-colors font-display italic text-[0.82rem] no-underline"
                title="My Orders"
              >
                <Package size={15} />
                <span className="hidden md:inline">Orders</span>
              </Link>
              <button
                type="button"
                onClick={signOut}
                className="inline-flex items-center gap-1.5 text-white/50 hover:text-accent transition-colors font-display italic text-[0.82rem]"
                title="Sign out"
              >
                <LogOut size={15} />
                <span className="hidden md:inline">Sign Out</span>
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="hidden sm:inline-flex items-center gap-1.5 text-white/50 hover:text-accent transition-colors font-display italic text-[0.82rem] no-underline"
            >
              <User size={15} />
              <span className="hidden md:inline">Sign In</span>
            </Link>
          )}

          {/* Mobile bag button */}
          <button
            type="button"
            className="sm:hidden relative text-cream p-2"
            onClick={() => setIsOpen(true)}
          >
            <ShoppingBag size={22} />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-primary text-white text-[0.6rem] font-bold rounded-full flex items-center justify-center border border-dark">
                {itemCount}
              </span>
            )}
          </button>
          <button
            type="button"
            className="hidden sm:inline-flex items-center gap-2 red-texture-fill border-2 border-dark px-5 py-2.5 font-display italic text-[0.9rem] rounded-[2px] transition-all"
            style={{ boxShadow: "3px 3px 0 rgba(0,0,0,.4)" }}
            onClick={() => setIsOpen(true)}
          >
            Bag ({itemCount}) <ShoppingBag size={16} />
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
