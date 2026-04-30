import { Link } from "@tanstack/react-router";
import { type Product, formatINR } from "@/data/products";
import { Heart } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="product-card group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[var(--ivory)]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <button
          aria-label="Add to wishlist"
          onClick={(e) => e.preventDefault()}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
        >
          <Heart className="h-4 w-4" strokeWidth={1.5} />
        </button>
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <button
            onClick={(e) => e.preventDefault()}
            className="w-full bg-charcoal text-ivory text-[11px] uppercase tracking-[0.25em] py-3 hover:bg-[var(--gold)] hover:text-charcoal transition-colors duration-300"
            style={{ background: "var(--charcoal)", color: "var(--ivory)" }}
          >
            Quick Add
          </button>
        </div>
      </div>
      <div className="pt-5 pb-2 px-1">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-1.5">{product.category}</p>
        <h3 className="font-serif text-lg leading-tight mb-1 group-hover:text-teal transition-colors">{product.name}</h3>
        <p className="text-sm" style={{ color: "var(--charcoal)" }}>{formatINR(product.price)}</p>
      </div>
    </Link>
  );
}
