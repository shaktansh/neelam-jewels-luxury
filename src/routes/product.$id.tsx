import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { getProduct, products, formatINR } from "@/data/products";
import { ShieldCheck, Sparkles, Truck, RotateCw, Heart } from "lucide-react";
import { useShop } from "@/store/shop";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Product — Neelam Jewels" }] };
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — Neelam Jewels` },
        { name: "description", content: product.tagline },
        { property: "og:title", content: `${product.name} — Neelam Jewels` },
        { property: "og:description", content: product.description },
        { property: "og:image", content: product.image },
        { property: "og:type", content: "product" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <p className="font-serif text-3xl mb-4">Piece not found.</p>
      <Link to="/shop" className="text-gold underline">Return to shop</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <p>Something went wrong: {error.message}</p>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="pt-32 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-8">
          <Link to="/" className="hover:text-gold">Home</Link> / <Link to="/shop" className="hover:text-gold">Shop</Link> / <span className="text-charcoal">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden bg-white group">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms] cursor-zoom-in" />
          </div>

          <div className="lg:pt-8">
            <p className="eyebrow mb-3">{product.category}</p>
            <h1 className="font-serif text-5xl md:text-6xl mb-3 leading-[1.05]">{product.name}</h1>
            <p className="text-muted-foreground italic mb-6 font-serif text-xl">{product.tagline}</p>
            <p className="text-2xl mb-2">{formatINR(product.price)}</p>
            <p className="text-xs text-muted-foreground mb-10">Inclusive of all taxes · GST included</p>

            <div className="gold-divider mb-8" />

            <p className="text-base leading-relaxed text-muted-foreground mb-8 font-light">
              {product.description}
            </p>

            <ProductActions id={product.id} />


            <div className="border-t border-[var(--border)] pt-8 mb-8">
              <h3 className="text-[11px] uppercase tracking-[0.3em] text-gold mb-4">Material & Craft</h3>
              <ul className="space-y-2.5 text-sm">
                {product.details.map((d) => (
                  <li key={d} className="flex items-center gap-3 text-muted-foreground">
                    <span className="w-1 h-1 bg-gold rounded-full" /> {d}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              {[
                { icon: ShieldCheck, t: "Anti-tarnish" },
                { icon: Sparkles, t: "Hypoallergenic" },
                { icon: Truck, t: "Free shipping" },
                { icon: RotateCw, t: "30-day returns" },
              ].map(({ icon: Icon, t }) => (
                <div key={t} className="flex items-center gap-3 p-3 border border-[var(--border)]">
                  <Icon className="h-4 w-4 text-gold" strokeWidth={1.5} />
                  <span className="uppercase tracking-[0.2em] text-[10px]">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-32 mb-24">
          <div className="text-center mb-14">
            <p className="eyebrow mb-3">You may also love</p>
            <h2 className="font-serif text-4xl md:text-5xl">Pairs beautifully with.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
