import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Neelam Jewels" },
      { name: "description", content: "Browse the complete Neelam Jewels collection — sapphires, polki kundan, diamond solitaires and 18k gold pieces." },
      { property: "og:title", content: "Shop Neelam Jewels" },
      { property: "og:description", content: "The complete edit of modern heirlooms." },
    ],
  }),
  component: Shop,
});

const categories = ["All", "Earrings", "Necklaces", "Sets"] as const;
type Cat = typeof categories[number];

function Shop() {
  const [active, setActive] = useState<Cat>("All");
  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="pt-36 pb-12 text-center px-6">
        <p className="eyebrow mb-3">The Edit</p>
        <h1 className="font-serif text-6xl md:text-7xl mb-4">Shop the House.</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">Heirloom craftsmanship, contemporary form. Every piece hand-set in Jaipur.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-12 flex flex-wrap justify-center gap-3 md:gap-6 text-[11px] uppercase tracking-[0.25em]">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-5 py-2 border transition-colors ${active === c ? "border-[var(--charcoal)] bg-[var(--charcoal)] text-[var(--ivory)]" : "border-[var(--border)] hover:border-[var(--gold)] hover:text-gold"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-24">
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">No pieces in this category yet.</p>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-14">
            {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}
