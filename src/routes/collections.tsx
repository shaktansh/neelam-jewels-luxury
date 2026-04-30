import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import irlOccasion from "@/assets/irl-occasion.jpg";
import irlEveryday from "@/assets/irl-everyday.jpg";
import irlOffice from "@/assets/irl-office.jpg";
import irlFlatlay from "@/assets/irl-flatlay.jpg";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — Neelam Jewels" },
      { name: "description", content: "Explore Neelam Jewels collections — Bridal, Everyday, Office Edit, and Heritage Polki." },
      { property: "og:title", content: "Neelam Jewels Collections" },
      { property: "og:description", content: "Curated stories in gold, sapphire and polki." },
    ],
  }),
  component: Collections,
});

function Collections() {
  const sets = [
    { title: "Bridal Reverie", tag: "Heritage Polki", img: irlOccasion },
    { title: "Everyday Gold", tag: "Demi-fine", img: irlEveryday },
    { title: "The Office Edit", tag: "Quiet Luxury", img: irlOffice },
    { title: "Whisper Layers", tag: "Stackable", img: irlFlatlay },
  ];
  return (
    <div className="min-h-screen">
      <SiteNav />
      <div className="pt-36 pb-16 text-center px-6">
        <p className="eyebrow mb-3">Curated Stories</p>
        <h1 className="font-serif text-6xl md:text-7xl">Collections.</h1>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-6 pb-24">
        {sets.map((s) => (
          <Link to="/shop" key={s.title} className="group block relative aspect-[4/5] overflow-hidden">
            <img src={s.img} alt={s.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[900ms]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8" style={{ color: "var(--ivory)" }}>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold mb-2">{s.tag}</p>
              <h3 className="font-serif text-4xl md:text-5xl mb-3">{s.title}</h3>
              <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] border-b border-[var(--ivory)] pb-1">Discover →</span>
            </div>
          </Link>
        ))}
      </div>
      <SiteFooter />
    </div>
  );
}
