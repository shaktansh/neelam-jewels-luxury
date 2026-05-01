import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import storyAtelier from "@/assets/story-atelier.jpg";
import irlCraft from "@/assets/irl-craft.jpg";
import { Check } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Neelam Jewels" },
      { name: "description", content: "Neelam Jewels — fourth-generation jewelers specializing in Diamond, Kundan Meena and gemstone jewelry, handcrafted in Jaipur." },
      { property: "og:title", content: "About Neelam Jewels" },
      { property: "og:description", content: "Four generations. In-house craftsmanship. Premium gemstones." },
      { property: "og:image", content: storyAtelier },
    ],
  }),
  component: About,
});

const why = [
  "Fourth-generation expertise",
  "In-house manufacturing",
  "Premium gemstone sourcing",
  "Competitive pricing",
  "Handcrafted precision",
];

const gemstones = [
  "Diamonds (above 25pt)",
  "Yellow Sapphires",
  "Blue Sapphires",
  "Emeralds",
  "Rubies",
];

function About() {
  return (
    <div className="min-h-screen">
      <SiteNav />

      {/* HERO */}
      <section className="pt-32 md:pt-36 pb-12 md:pb-20 max-w-3xl mx-auto px-6 text-center">
        <p className="eyebrow mb-4">The House</p>
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl mb-6 md:mb-8 leading-[1.05]">
          A Jaipur atelier, <em className="text-gold not-italic">four generations strong.</em>
        </h1>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-light">
          Neelam Jewels is a fourth-generation jewelry brand rooted in traditional craftsmanship and modern design. We specialize in Diamond, Kundan Meena, and gemstone jewelry — crafted in-house with strict quality control and a presence across India.
        </p>
      </section>

      {/* BELIEF */}
      <section className="max-w-6xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-10 md:gap-12 items-center pb-20 md:pb-24">
        <img src={storyAtelier} alt="Atelier" loading="lazy" className="w-full aspect-[4/5] object-cover" />
        <div>
          <p className="eyebrow mb-3">Our Belief</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-5 md:mb-6 leading-tight">Jewelry should be lived in.</h2>
          <p className="text-sm md:text-base leading-relaxed text-muted-foreground mb-4 font-light">
            Our experienced team oversees every step — from design to finishing — ensuring each piece meets the highest standards of quality, finish and durability.
          </p>
          <p className="text-sm md:text-base leading-relaxed text-muted-foreground font-light">
            We continuously evolve designs based on customer feedback and trends, ensuring timeless yet modern collections. Perfection and customer satisfaction remain our highest priorities.
          </p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 md:py-24 bg-white border-y border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
          <p className="eyebrow mb-3">Why Choose Us</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-10 md:mb-12">Built on craft. Trusted across India.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 text-left">
            {why.map((w) => (
              <div key={w} className="flex items-start gap-3 p-5 border border-[var(--border)] hover:border-[var(--gold)]/60 transition-colors">
                <Check className="h-4 w-4 text-gold mt-1 shrink-0" strokeWidth={2} />
                <span className="text-sm md:text-base">{w}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GEMSTONE EXPERTISE */}
      <section className="py-20 md:py-24" style={{ background: "var(--sapphire)", color: "var(--ivory)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          <div className="order-2 md:order-1">
            <p className="eyebrow mb-3">Gemstone Expertise</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-5 md:mb-6 leading-tight">
              Sourced direct.<br /><em className="text-gold not-italic">Selected by hand.</em>
            </h2>
            <p className="opacity-80 leading-relaxed mb-6 font-light text-sm md:text-base">
              We deal in high-quality gemstones sourced directly from trusted global markets — Sri Lanka, Bangkok and South Africa. Every stone is selected for premium quality at competitive pricing.
            </p>
            <ul className="grid grid-cols-2 gap-3 text-sm opacity-90 mt-6">
              {gemstones.map((g) => (
                <li key={g} className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-gold rounded-full shrink-0" />{g}</li>
              ))}
            </ul>
          </div>
          <img src={irlCraft} alt="Karigar at work" loading="lazy" className="order-1 md:order-2 w-full aspect-[4/5] object-cover" />
        </div>
      </section>

      {/* PRESENCE */}
      <section className="py-16 md:py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="eyebrow mb-3">Presence</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-6">Across India.</h2>
          <p className="text-muted-foreground mb-8 font-light text-sm md:text-base">
            Serving clients with a strong retail and wholesale network.
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-[11px] uppercase tracking-[0.3em]">
            {["Jaipur", "Chennai", "Mumbai", "Surat"].map((c) => (
              <span key={c} className="px-5 py-2 border border-[var(--gold)]/40 text-charcoal">{c}</span>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
