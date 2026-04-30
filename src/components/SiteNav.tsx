import { Link } from "@tanstack/react-router";
import { Heart, User, ShoppingBag } from "lucide-react";

export function SiteNav() {
  return (
    <header className="fixed top-4 left-4 right-4 z-50">
      <nav className="glass-nav rounded-full px-6 lg:px-10 py-4 flex items-center justify-between shadow-[0_8px_30px_-12px_rgba(31,58,95,0.18)]">
        <div className="flex items-center gap-7 text-[11px] uppercase tracking-[0.25em] font-medium text-charcoal">
          <Link to="/" className="hover:text-gold transition-colors duration-300" style={{ color: "var(--charcoal)" }}>Home</Link>
          <Link to="/shop" className="hover:text-gold transition-colors duration-300 hidden sm:inline" style={{ color: "var(--charcoal)" }}>Shop</Link>
          <Link to="/collections" className="hover:text-gold transition-colors duration-300 hidden md:inline" style={{ color: "var(--charcoal)" }}>Collections</Link>
        </div>

        <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center group">
          <span className="font-serif text-xl md:text-2xl tracking-[0.35em] text-teal whitespace-nowrap">
            NEELAM <span className="text-gold">JEWELS</span>
          </span>
          <span className="text-[8px] tracking-[0.4em] text-muted-foreground mt-0.5 hidden md:block">EST. JAIPUR</span>
        </Link>

        <div className="flex items-center gap-5 text-[11px] uppercase tracking-[0.25em] font-medium">
          <Link to="/shop" className="hover:text-gold transition-colors duration-300 hidden md:inline" style={{ color: "var(--charcoal)" }}>New Arrivals</Link>
          <Link to="/about" className="hover:text-gold transition-colors duration-300 hidden sm:inline" style={{ color: "var(--charcoal)" }}>About</Link>
          <div className="flex items-center gap-3 ml-1" style={{ color: "var(--charcoal)" }}>
            <button aria-label="Wishlist" className="hover:text-gold transition-colors"><Heart className="h-4 w-4" strokeWidth={1.5} /></button>
            <button aria-label="Account" className="hover:text-gold transition-colors"><User className="h-4 w-4" strokeWidth={1.5} /></button>
            <button aria-label="Cart" className="hover:text-gold transition-colors relative">
              <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
              <span className="absolute -top-2 -right-2 bg-[var(--gold)] text-[9px] text-charcoal rounded-full w-4 h-4 flex items-center justify-center font-medium">2</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
