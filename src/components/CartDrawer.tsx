import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useShop, getProductById } from "@/store/shop";
import { formatINR } from "@/data/products";
import { Minus, Plus, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQty, removeFromCart, cartTotal } = useShop();

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col bg-[var(--ivory)]">
        <SheetHeader>
          <SheetTitle className="font-serif text-2xl tracking-wide">Your Bag</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto -mx-6 px-6 py-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-12">
              <p className="text-muted-foreground text-sm">Your bag is empty.</p>
              <Link to="/shop" onClick={() => setCartOpen(false)} className="btn-luxe">Shop the House</Link>
            </div>
          ) : (
            <ul className="divide-y divide-[var(--border)]">
              {cart.map((item) => {
                const p = getProductById(item.id);
                if (!p) return null;
                return (
                  <li key={item.id} className="py-5 flex gap-4">
                    <img src={p.image} alt={p.name} className="w-20 h-24 object-cover bg-white" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.25em] text-gold mb-1">{p.category}</p>
                      <h4 className="font-serif text-base leading-tight">{p.name}</h4>
                      <p className="text-sm mt-1">{formatINR(p.price)}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center border border-[var(--border)]">
                          <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label="Decrease" className="px-2 py-1 hover:bg-white"><Minus className="h-3 w-3" /></button>
                          <span className="px-3 text-sm">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label="Increase" className="px-2 py-1 hover:bg-white"><Plus className="h-3 w-3" /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} aria-label="Remove" className="text-muted-foreground hover:text-charcoal"><X className="h-4 w-4" /></button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-[var(--border)] pt-5 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="uppercase tracking-[0.25em] text-[11px]">Subtotal</span>
              <span className="font-serif text-lg">{formatINR(cartTotal)}</span>
            </div>
            <p className="text-[11px] text-muted-foreground">Shipping & taxes calculated at checkout.</p>
            <button className="btn-luxe w-full">Checkout</button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
