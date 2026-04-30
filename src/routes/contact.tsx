import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Neelam Jewels" },
      { name: "description", content: "Visit our Jaipur atelier or book a private consultation with Neelam Jewels." },
      { property: "og:title", content: "Contact Neelam Jewels" },
      { property: "og:description", content: "Visit our atelier in Jaipur." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="pt-36 pb-20 max-w-2xl mx-auto px-6 text-center">
        <p className="eyebrow mb-4">Get in Touch</p>
        <h1 className="font-serif text-6xl md:text-7xl mb-8">Visit the atelier.</h1>
        <p className="text-muted-foreground mb-12 font-light">
          Book a private consultation or send us a note. We answer within 24 hours.
        </p>
        <form className="space-y-5 text-left">
          <input className="w-full bg-transparent border-b border-[var(--border)] py-3 focus:outline-none focus:border-[var(--gold)] transition-colors" placeholder="Your name" />
          <input className="w-full bg-transparent border-b border-[var(--border)] py-3 focus:outline-none focus:border-[var(--gold)] transition-colors" placeholder="Email" type="email" />
          <textarea rows={5} className="w-full bg-transparent border-b border-[var(--border)] py-3 focus:outline-none focus:border-[var(--gold)] transition-colors resize-none" placeholder="How can we help?" />
          <button type="button" className="btn-luxe mt-4">Send Message</button>
        </form>

        <div className="mt-20 grid sm:grid-cols-2 gap-8 text-sm">
          <div>
            <p className="eyebrow mb-2">Atelier</p>
            <p className="text-muted-foreground">C-12, Civil Lines<br />Jaipur, Rajasthan 302006</p>
          </div>
          <div>
            <p className="eyebrow mb-2">Concierge</p>
            <p className="text-muted-foreground">care@neelamjewels.com<br />+91 141 4000 1995</p>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
