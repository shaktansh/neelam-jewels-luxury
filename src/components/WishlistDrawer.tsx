import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useShop, getProductById } from "@/store/shop";
import { formatINR } from "@/data/products";
import { Heart, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function WishlistDrawer() {
  const { wishlist, wishlistOpen, setWishlistOpen, toggleWishlist, addToCart } = useShop();

  return (
    <Sheet open={wishlistOpen} onOpenChange={setWishlistOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col bg-[var(--ivory)]">
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl tracking-wide flex items-center gap-2">
            <Heart className="h-4 w-4 text-gold" /> Wishlist
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto -mx-6 px-6 py-4">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-12">
              <p className="text-muted-foreground text-sm">No saved pieces yet.</p>
              <Link to="/shop" onClick={() => setWishlistOpen(false)} className="btn-luxe">Discover Pieces</Link>
            </div>
          ) : (
            <ul className="divide-y divide-[var(--border)]">
              {wishlist.map((id) => {
                const p = getProductById(id);
                if (!p) return null;
                return (
                  <li key={id} className="py-5 flex gap-4">
                    <Link to="/product/$id" params={{ id }} onClick={() => setWishlistOpen(false)}>
                      <img src={p.image} alt={p.name} className="w-20 h-24 object-cover bg-white" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-1">{p.category}</p>
                      <h4 className="font-serif text-base leading-tight">{p.name}</h4>
                      <p className="text-sm mt-1">{formatINR(p.price)}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <button onClick={() => { addToCart(id); toggleWishlist(id); setWishlistOpen(false); }} className="text-[11px] uppercase tracking-[0.25em] border-b border-charcoal pb-0.5 hover:text-gold hover:border-gold">Move to bag</button>
                        <button onClick={() => toggleWishlist(id)} aria-label="Remove" className="text-muted-foreground hover:text-charcoal"><X className="h-4 w-4" /></button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
