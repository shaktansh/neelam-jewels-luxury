import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { products, type Product } from "@/data/products";

type CartItem = { id: string; qty: number };

type ShopState = {
  cart: CartItem[];
  wishlist: string[];
  cartOpen: boolean;
  wishlistOpen: boolean;
  addToCart: (id: string, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  toggleWishlist: (id: string) => void;
  inWishlist: (id: string) => boolean;
  setCartOpen: (b: boolean) => void;
  setWishlistOpen: (b: boolean) => void;
  cartCount: number;
  cartTotal: number;
};

const Ctx = createContext<ShopState | null>(null);

const safeRead = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try { const v = localStorage.getItem(key); return v ? (JSON.parse(v) as T) : fallback; } catch { return fallback; }
};

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setCart(safeRead<CartItem[]>("nj_cart", []));
    setWishlist(safeRead<string[]>("nj_wishlist", []));
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) localStorage.setItem("nj_cart", JSON.stringify(cart)); }, [cart, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem("nj_wishlist", JSON.stringify(wishlist)); }, [wishlist, hydrated]);

  const addToCart = (id: string, qty = 1) => {
    setCart((c) => {
      const ex = c.find((i) => i.id === id);
      if (ex) return c.map((i) => i.id === id ? { ...i, qty: i.qty + qty } : i);
      return [...c, { id, qty }];
    });
    setCartOpen(true);
  };
  const removeFromCart = (id: string) => setCart((c) => c.filter((i) => i.id !== id));
  const updateQty = (id: string, qty: number) =>
    setCart((c) => qty <= 0 ? c.filter((i) => i.id !== id) : c.map((i) => i.id === id ? { ...i, qty } : i));
  const toggleWishlist = (id: string) =>
    setWishlist((w) => w.includes(id) ? w.filter((x) => x !== id) : [...w, id]);
  const inWishlist = (id: string) => wishlist.includes(id);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => {
    const p = products.find((p) => p.id === i.id);
    return s + (p ? p.price * i.qty : 0);
  }, 0);

  return (
    <Ctx.Provider value={{ cart, wishlist, cartOpen, wishlistOpen, addToCart, removeFromCart, updateQty, toggleWishlist, inWishlist, setCartOpen, setWishlistOpen, cartCount, cartTotal }}>
      {children}
    </Ctx.Provider>
  );
}

export function useShop() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}

export const getProductById = (id: string): Product | undefined => products.find((p) => p.id === id);
