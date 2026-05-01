import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube, MessageCircle } from "lucide-react";

export function SiteFooter() {
  return (
    <footer style={{ background: "var(--sapphire)", color: "var(--ivory)" }} className="pt-16 md:pt-20 pb-10 mt-20 md:mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-12 md:mb-16">
          <p className="eyebrow mb-3">Join the House</p>
          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-4">The Neelam Letter</h3>
          <p className="text-sm opacity-70 max-w-md mx-auto mb-6 px-4">
            Quiet drops, atelier stories, and first looks — delivered the old-fashioned way.
          </p>
          <form className="flex max-w-md mx-auto gap-2 px-4">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-transparent border-b border-[var(--gold)]/50 px-2 py-3 text-sm placeholder:opacity-40 focus:outline-none focus:border-[var(--gold)]"
            />
            <button className="text-[11px] uppercase tracking-[0.25em] text-gold hover:text-ivory transition-colors px-2">
              Subscribe →
            </button>
          </form>
        </div>

        <div className="gold-divider mb-10 md:mb-12 opacity-40" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-12 md:mb-16">
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.3em] text-gold mb-5">Collections</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li><Link to="/shop">Earrings</Link></li>
              <li><Link to="/shop">Necklaces</Link></li>
              <li><Link to="/shop">Rings</Link></li>
              <li><Link to="/collections">Bridal</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.3em] text-gold mb-5">House</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li><Link to="/about">Our Story</Link></li>
              <li><Link to="/about">Atelier</Link></li>
              <li><Link to="/about">Craftsmanship</Link></li>
              <li>Presence: Chennai · Mumbai · Surat</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.3em] text-gold mb-5">Support</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li><Link to="/contact">Contact</Link></li>
              <li>
                <a href="https://wa.me/919799557771" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-gold">
                  <MessageCircle className="h-3 w-3" /> WhatsApp
                </a>
              </li>
              <li><a href="mailto:neelamjewels@gmail.com" className="hover:text-gold break-all">neelamjewels@gmail.com</a></li>
              <li><a href="tel:+919799557771" className="hover:text-gold">+91 97995 57771</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] uppercase tracking-[0.3em] text-gold mb-5">Atelier</h4>
            <p className="text-sm opacity-80 leading-relaxed">
              883, 1st Floor,<br />
              Ganga Mata Ki Gali,<br />
              Gopal Ji Ka Rasta,<br />
              Choura Rasta, Jaipur
            </p>
            <div className="flex gap-4 mt-5">
              <a href="#" aria-label="Instagram" className="hover:text-gold transition-colors"><Instagram className="h-4 w-4" strokeWidth={1.5} /></a>
              <a href="#" aria-label="Facebook" className="hover:text-gold transition-colors"><Facebook className="h-4 w-4" strokeWidth={1.5} /></a>
              <a href="#" aria-label="Youtube" className="hover:text-gold transition-colors"><Youtube className="h-4 w-4" strokeWidth={1.5} /></a>
            </div>
          </div>
        </div>

        <div className="gold-divider mb-8 opacity-30" />
        <div className="flex flex-col md:flex-row justify-between items-center text-xs opacity-60 gap-3 text-center">
          <span className="font-serif tracking-[0.3em] text-base">NEELAM <span className="text-gold">JEWELS</span></span>
          <span>© {new Date().getFullYear()} Neelam Jewels. Crafted in Jaipur.</span>
        </div>
      </div>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/919799557771?text=Hi%20Neelam%20Jewels%2C%20I%27d%20like%20to%20enquire."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        style={{ background: "#25D366", color: "#fff" }}
      >
        <MessageCircle className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.75} />
      </a>
    </footer>
  );
}
