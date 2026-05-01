import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { MapPin, Mail, Phone, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Neelam Jewels" },
      { name: "description", content: "Visit our Jaipur atelier or speak with us on WhatsApp. Neelam Jewels — fourth-generation fine jewelers." },
      { property: "og:title", content: "Contact Neelam Jewels" },
      { property: "og:description", content: "Visit our atelier in Jaipur or chat on WhatsApp." },
    ],
  }),
  component: Contact,
});

const WHATSAPP = "https://wa.me/919799557771?text=Hi%20Neelam%20Jewels%2C%20I%27d%20like%20to%20enquire.";

function Contact() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <section className="pt-32 md:pt-36 pb-12 md:pb-20 max-w-2xl mx-auto px-6 text-center">
        <p className="eyebrow mb-4">Get in Touch</p>
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl mb-6 md:mb-8 leading-[1.05]">Visit the atelier.</h1>
        <p className="text-muted-foreground mb-10 md:mb-12 font-light text-sm md:text-base">
          Book a private consultation or send us a note. We answer within 24 hours.
        </p>

        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-luxe justify-center w-full sm:w-auto sm:inline-flex mb-12"
          style={{ background: "#25D366", borderColor: "#25D366", color: "#fff" }}
        >
          <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
        </a>

        <form className="space-y-5 text-left">
          <input className="w-full bg-transparent border-b border-[var(--border)] py-3 focus:outline-none focus:border-[var(--gold)] transition-colors" placeholder="Your name" />
          <input className="w-full bg-transparent border-b border-[var(--border)] py-3 focus:outline-none focus:border-[var(--gold)] transition-colors" placeholder="Email" type="email" />
          <textarea rows={5} className="w-full bg-transparent border-b border-[var(--border)] py-3 focus:outline-none focus:border-[var(--gold)] transition-colors resize-none" placeholder="How can we help?" />
          <button type="button" className="btn-luxe mt-4 w-full sm:w-auto justify-center">Send Message</button>
        </form>

        <div className="mt-16 md:mt-20 grid sm:grid-cols-2 gap-8 text-left">
          <div className="flex gap-3">
            <MapPin className="h-4 w-4 text-gold mt-1 shrink-0" strokeWidth={1.5} />
            <div>
              <p className="eyebrow mb-2">Atelier</p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                883, 1st Floor, Ganga Mata Ki Gali<br />
                Gopal Ji Ka Rasta, Choura Rasta<br />
                B-33 A, Kirti Nagar, Gopalpura<br />
                Tonk Road, Jaipur
              </p>
            </div>
          </div>
          <div className="space-y-5">
            <div className="flex gap-3">
              <Mail className="h-4 w-4 text-gold mt-1 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="eyebrow mb-2">Email</p>
                <a href="mailto:neelamjewels@gmail.com" className="text-muted-foreground text-sm hover:text-gold transition-colors break-all">
                  neelamjewels@gmail.com
                </a>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone className="h-4 w-4 text-gold mt-1 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="eyebrow mb-2">Mobile</p>
                <a href="tel:+919799557771" className="text-muted-foreground text-sm hover:text-gold transition-colors">
                  +91 97995 57771
                </a>
              </div>
            </div>
            <div>
              <p className="eyebrow mb-2">Presence</p>
              <p className="text-muted-foreground text-sm">Chennai · Mumbai · Surat</p>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
