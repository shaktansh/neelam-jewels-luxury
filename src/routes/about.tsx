import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import storyAtelier from "@/assets/story-atelier.jpg";
import irlCraft from "@/assets/irl-craft.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Neelam Jewels" },
      { name: "description", content: "Three generations of Jaipur craftsmanship. Discover the house of Neelam Jewels." },
      { property: "og:title", content: "About Neelam Jewels" },
      { property: "og:description", content: "Three generations. One obsession." },
      { property: "og:image", content: storyAtelier },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="pt-36 pb-20 max-w-3xl mx-auto px-6 text-center">
        <p className="eyebrow mb-4">The House</p>
        <h1 className="font-serif text-6xl md:text-7xl mb-8 leading-[1.05]">A Jaipur atelier, <em className="text-gold not-italic">since 1995.</em></h1>
        <p className="text-lg text-muted-foreground leading-relaxed font-light">
          Neelam Jewels began as a single workbench in the pink city — and grew into a quiet house of fine jewelry trusted by three generations of women.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-12 items-center pb-24">
        <img src={storyAtelier} alt="Atelier" loading="lazy" className="w-full aspect-[4/5] object-cover" />
        <div>
          <p className="eyebrow mb-3">Our Belief</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Jewelry should be lived in.</h2>
          <p className="text-base leading-relaxed text-muted-foreground mb-4 font-light">
            We believe heirlooms aren't made for vaults — they're made for first dates, board rooms, school runs, and big anniversaries.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground font-light">
            Every Neelam piece is hallmarked, hypoallergenic, and built to be worn every single day of the life you're already living.
          </p>
        </div>
      </section>

      <section className="py-24" style={{ background: "var(--sapphire)", color: "var(--ivory)" }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <p className="eyebrow mb-3">Craftsmanship</p>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Hand-set, never mass-made.</h2>
            <p className="opacity-80 leading-relaxed mb-4 font-light">
              Our karigars come from families that have practiced kundan-meena for over a century. Each setting is shaped, polished, and hallmarked by hand.
            </p>
            <ul className="space-y-3 text-sm opacity-80 mt-8">
              {["BIS Hallmarked Gold", "Conflict-free natural diamonds", "Lifetime polish & repair", "Plant-a-tree on every order"].map((i) => (
                <li key={i} className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-gold rounded-full" />{i}</li>
              ))}
            </ul>
          </div>
          <img src={irlCraft} alt="Karigar at work" loading="lazy" className="order-1 md:order-2 w-full aspect-[4/5] object-cover" />
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
