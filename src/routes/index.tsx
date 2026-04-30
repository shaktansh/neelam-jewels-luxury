import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import heroImg from "@/assets/hero-model.jpg";
import irlEveryday from "@/assets/irl-everyday.jpg";
import irlOffice from "@/assets/irl-office.jpg";
import irlOccasion from "@/assets/irl-occasion.jpg";
import irlCraft from "@/assets/irl-craft.jpg";
import irlFlatlay from "@/assets/irl-flatlay.jpg";
import storyAtelier from "@/assets/story-atelier.jpg";
import { ArrowRight, Sparkles, ShieldCheck, Gem, Pencil, Eye, Hammer, Check } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Neelam Jewels — Modern Heirlooms from Jaipur" },
      { name: "description", content: "Affordable luxury fine jewelry handcrafted in Jaipur. Sapphires, polki kundan, and 18k gold pieces designed for everyday elegance." },
      { property: "og:title", content: "Neelam Jewels — Modern Heirlooms" },
      { property: "og:description", content: "Crafted for everyday elegance. Designed to last." },
      { property: "og:image", content: heroImg },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = products.slice(0, 4);
  return (
    <div className="min-h-screen">
      <SiteNav />

      {/* HERO */}
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <video
            src="/hero-video.mp4"
            autoPlay
            muted
            loop
            playsInline
            poster={heroImg}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <div className="fade-up delay-100">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--ivory)]/40 text-[10px] uppercase tracking-[0.4em] text-ivory" style={{ color: "var(--ivory)" }}>
              <Sparkles className="h-3 w-3" /> Est. Jaipur · 1995
            </span>
          </div>
          <h1 className="fade-up delay-200 font-serif text-[clamp(3.5rem,11vw,9rem)] leading-[0.95] mt-6 mb-2" style={{ color: "var(--ivory)" }}>
            Modern
          </h1>
          <h1 className="fade-up delay-300 font-serif italic text-[clamp(3.5rem,11vw,9rem)] leading-[0.95] -mt-2 mb-10" style={{ color: "var(--gold-soft)" }}>
            Heirlooms.
          </h1>
          <div className="fade-up delay-400 flex flex-col sm:flex-row gap-4">
            <Link to="/shop" className="btn-luxe">Shop Collection <ArrowRight className="h-3 w-3" /></Link>
            <Link to="/about" className="btn-ghost-luxe">Our Story</Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] opacity-70 fade-up delay-400" style={{ color: "var(--ivory)" }}>
          Scroll ↓
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <section className="py-5 border-y border-[var(--gold)]/20 overflow-hidden bg-[var(--ivory)]">
        <div className="flex items-center justify-around gap-12 text-[11px] uppercase tracking-[0.3em] text-muted-foreground whitespace-nowrap">
          <span className="flex items-center gap-2"><Gem className="h-3 w-3 text-gold" /> Hand-set in Jaipur</span>
          <span className="hidden md:flex items-center gap-2"><ShieldCheck className="h-3 w-3 text-gold" /> Lifetime Authenticity</span>
          <span className="flex items-center gap-2"><Sparkles className="h-3 w-3 text-gold" /> Anti-tarnish · Skin-safe</span>
          <span className="hidden md:flex items-center gap-2"><Gem className="h-3 w-3 text-gold" /> Complimentary Engraving</span>
        </div>
      </section>

      {/* FEATURED COLLECTION — horizontal scroll */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-14 flex items-end justify-between">
          <div>
            <p className="eyebrow mb-3">The Signature Edit</p>
            <h2 className="font-serif text-5xl md:text-6xl">Quietly extraordinary.</h2>
          </div>
          <Link to="/shop" className="hidden md:inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] hover:text-gold transition-colors">
            View All <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="overflow-x-auto scroll-fade-mask pb-6">
          <div className="flex gap-6 px-6 lg:px-10 min-w-max">
            {products.map((p) => (
              <div key={p.id} className="w-[280px] md:w-[340px] flex-shrink-0">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IRL SECTION */}
      <section className="py-24 bg-white border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-3">As Worn</p>
            <h2 className="font-serif text-5xl md:text-6xl">Neelam Jewels IRL</h2>
            <p className="text-muted-foreground mt-3 max-w-md">Life in the atelier & beyond.</p>
          </div>
          <a href="#" className="text-teal text-sm tracking-[0.25em] uppercase hover:text-gold transition-colors">@neelamjewels</a>
        </div>

        <div className="overflow-x-auto scroll-fade-mask pb-2">
          <div className="flex gap-3 px-6 lg:px-10 min-w-max">
            {[
              { src: irlEveryday, label: "Everyday" },
              { src: irlOffice, label: "Office" },
              { src: irlOccasion, label: "Occasion" },
              { src: irlCraft, label: "Atelier" },
              { src: irlFlatlay, label: "Edit" },
            ].map((it) => (
              <div key={it.label} className="relative w-[260px] md:w-[320px] aspect-[4/5] flex-shrink-0 overflow-hidden group cursor-pointer">
                <img src={it.src} alt={it.label} loading="lazy" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <span className="absolute bottom-5 left-5 text-ivory font-serif text-2xl italic" style={{ color: "var(--ivory)" }}>{it.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="eyebrow mb-3">New Arrivals</p>
            <h2 className="font-serif text-5xl md:text-6xl mb-4">The current obsession.</h2>
            <div className="gold-divider w-24 mx-auto" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="text-center mt-16">
            <Link to="/shop" className="btn-luxe">Shop All</Link>
          </div>
        </div>
      </section>

      {/* CUSTOM DESIGN */}
      <section className="py-24 md:py-32 bg-white border-y border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="eyebrow mb-3">Design Your Own Jewelry</p>
            <h2 className="font-serif text-5xl md:text-6xl mb-5 leading-[1.05]">
              Your Vision. <em className="text-gold not-italic font-serif italic">Our Craftsmanship.</em>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto font-light">
              Have a design in mind? Share your idea, and our artisans will bring it to life with precision and care.
            </p>
            <div className="gold-divider w-24 mx-auto mt-8" />
          </div>

          {/* 3 STEPS */}
          <div className="grid md:grid-cols-3 gap-10 md:gap-6 mb-20">
            {[
              { icon: Pencil, n: "01", title: "Share Your Idea", desc: "Upload a reference image, sketch, or describe your design." },
              { icon: Eye, n: "02", title: "We Create a Preview", desc: "Our designers create a concept tailored to your vision." },
              { icon: Hammer, n: "03", title: "Approve & Craft", desc: "Once approved, we craft your jewelry with premium materials." },
            ].map((s) => (
              <div key={s.n} className="text-center px-4 group">
                <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full border border-[var(--gold)]/40 group-hover:border-[var(--gold)] transition-colors">
                  <s.icon className="h-7 w-7 text-teal" strokeWidth={1.25} />
                  <span className="absolute -top-2 -right-2 text-[10px] tracking-[0.25em] text-gold bg-white px-2 py-0.5 border border-[var(--gold)]/30">
                    {s.n}
                  </span>
                </div>
                <h3 className="font-serif text-2xl mb-3">{s.title}</h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-xs mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* TRUST LINE */}
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 mb-12 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            {["Handcrafted by experts", "Custom fit & finish", "Premium materials only"].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <Check className="h-3 w-3 text-gold" strokeWidth={2} /> {t}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link to="/contact" className="btn-luxe">Start Your Custom Design <ArrowRight className="h-3 w-3" /></Link>
            <Link to="/contact" className="btn-ghost-luxe" style={{ color: "var(--charcoal)", borderColor: "var(--charcoal)" }}>Talk to Designer</Link>
          </div>

          <p className="text-center text-xs text-muted-foreground italic">
            Not sure about the design? Our experts will guide you.
          </p>
          <p className="text-center mt-8 font-serif italic text-xl text-teal">
            Made just for you. Nothing mass-produced.
          </p>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="py-24 md:py-32" style={{ background: "var(--sapphire)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[5/6] overflow-hidden">
            <img src={storyAtelier} alt="Neelam Jewels atelier in Jaipur" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div style={{ color: "var(--ivory)" }}>
            <p className="eyebrow mb-4">The House of Neelam</p>
            <h2 className="font-serif text-5xl md:text-6xl mb-8 leading-[1.05]">
              Three generations.<br /><em className="text-gold not-italic font-serif">One obsession.</em>
            </h2>
            <p className="text-base md:text-lg opacity-80 leading-relaxed mb-6 font-light">
              Neelam Jewels was born in a small Jaipur workshop in 1995 — built on the belief that fine jewelry should be lived in, not locked away.
            </p>
            <p className="text-base opacity-70 leading-relaxed mb-10 font-light">
              We blend modern restraint with the deep heritage of Rajasthani craftsmanship. Every piece is hand-set, hallmarked, and guaranteed for life.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-gold border-b border-gold pb-1 hover:text-ivory hover:border-ivory transition-colors">
              Read Our Story <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
