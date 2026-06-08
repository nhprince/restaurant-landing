"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Menu, X, MapPin, Phone, Clock, ChevronDown,
  Star, Instagram, Facebook, Twitter, Mail, ArrowRight, Plus, Minus
} from "lucide-react";

/* ─── DATA ──────────────────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Reservation", href: "#reservation" },
  { label: "Contact", href: "#contact" },
];

const MENU_CATEGORIES = [
  {
    name: "Starters",
    items: [
      { name: "Tuna Tartare", desc: "Avocado mousse, sesame crisp, yuzu", price: "$24" },
      { name: "Burrata", desc: "Heirloom tomatoes, basil oil, aged balsamic", price: "$19" },
      { name: "Oysters", desc: "Half dozen, mignonette, lemon", price: "$28" },
      { name: "Foie Gras", desc: "Brioche, fig compote, micro greens", price: "$32" },
    ],
  },
  {
    name: "Mains",
    items: [
      { name: "Wagyu Ribeye", desc: "Truffle jus, roasted bone marrow, seasonal vegetables", price: "$68" },
      { name: "Pan-Seared Sea Bass", desc: "Saffron broth, fennel, citrus beurre blanc", price: "$48" },
      { name: "Duck Confit", desc: "Lentil du Puy, cherry gastrique, crispy skin", price: "$42" },
      { name: "Lobster Risotto", desc: "Arborio rice, bisque reduction, chive oil", price: "$56" },
    ],
  },
  {
    name: "Desserts",
    items: [
      { name: "Chocolate Fondant", desc: "Valrhona chocolate, vanilla bean ice cream", price: "$18" },
      { name: "Crème Brûlée", desc: "Madagascar vanilla, caramelized sugar", price: "$16" },
      { name: "Tarte Tatin", desc: "Caramelized apple, calvados cream", price: "$17" },
      { name: "Cheese Selection", desc: "Artisan cheeses, honeycomb, walnut bread", price: "$24" },
    ],
  },
];

const GALLERY_ITEMS = [
  { category: "Mains", title: "Wagyu Ribeye" },
  { category: "Starters", title: "Tuna Tartare" },
  { category: "Desserts", title: "Chocolate Fondant" },
  { category: "Starters", title: "Burrata" },
  { category: "Mains", title: "Sea Bass" },
  { category: "Desserts", title: "Crème Brûlée" },
];

const TESTIMONIALS = [
  { name: "Elena Rossi", role: "Food Critic", text: "An extraordinary culinary journey. Every dish tells a story of passion and precision. MAISON is not just a restaurant — it's an experience." },
  { name: "James Chen", role: "Michelin Guide", text: "The attention to detail is remarkable. From the ambiance to the plate, everything speaks of excellence. A must-visit destination." },
  { name: "Sophie Laurent", role: "Travel Blogger", text: "I've dined at restaurants worldwide. MAISON stands apart — the flavors are bold yet refined, the service impeccable. Truly unforgettable." },
];

/* ─── REUSABLE COMPONENTS ───────────────────────────────────────────────────── */

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="section-label">
      {children}
    </p>
  );
}

/* ─── MAIN PAGE ─────────────────────────────────────────────────────────────── */

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [guests, setGuests] = useState(2);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* ── NAV ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[var(--bg-primary)]/95 backdrop-blur-md py-4 shadow-lg shadow-black/20" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <a href="#home" className="relative z-10">
            <span className="font-[var(--font-serif)] text-2xl md:text-3xl tracking-wide text-[var(--text-primary)]">MAISON</span>
          </a>
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="text-xs tracking-[0.2em] uppercase text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-300 font-medium">
                {link.label}
              </a>
            ))}
          </div>
          <div className="hidden lg:block">
            <a href="#reservation" className="btn-primary text-xs py-3 px-6">Reserve</a>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden relative z-10 p-2 text-[var(--text-primary)]">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[var(--bg-primary)]/98 backdrop-blur-lg border-t border-[var(--border)]">
            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-sm tracking-[0.15em] uppercase text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors py-2">
                  {link.label}
                </a>
              ))}
              <a href="#reservation" onClick={() => setMobileMenuOpen(false)} className="btn-primary text-xs py-3 px-6 text-center mt-2">Reserve a Table</a>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[var(--bg-primary)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, var(--accent) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <FadeIn>
            <SectionLabel>Fine Dining Experience</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h1 className="heading-xl mb-8">
              Where Every Plate<br />
              <span className="text-gradient">Tells a Story</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-body-lg max-w-2xl mx-auto mb-12">
              A sanctuary of culinary artistry where locally sourced ingredients meet artisan techniques. Experience the extraordinary.
            </p>
          </FadeIn>
          <FadeIn delay={0.45}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#menu" className="btn-primary">
                Explore Menu <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#reservation" className="btn-secondary">Reserve a Table</a>
            </div>
          </FadeIn>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <ChevronDown className="w-5 h-5 text-[var(--accent)] animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <FadeIn className="relative">
              <div className="aspect-[4/5] bg-[var(--bg-secondary)] border border-[var(--border)] relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 border border-[var(--border-accent)] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="font-[var(--font-serif)] text-3xl text-[var(--accent)]">M</span>
                    </div>
                    <p className="text-[var(--text-muted)] text-sm tracking-widest uppercase">Est. 2019</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-[var(--border-accent)]" />
            </FadeIn>
            <FadeIn>
              <SectionLabel>Our Story</SectionLabel>
              <h2 className="heading-lg mb-8">A Passion for the <span className="text-gradient">Exceptional</span></h2>
              <div className="space-y-6 text-body">
                <p>Founded in 2019, MAISON was born from a singular vision: to create a dining experience that transcends the ordinary. Our chef brings two decades of culinary mastery from the world's most revered kitchens.</p>
                <p>Every ingredient is thoughtfully sourced from local farms and artisan producers. We believe that exceptional food begins with exceptional ingredients — and that every plate should be a testament to the land and the hands that cultivated it.</p>
              </div>
              <div className="divider my-10" />
              <div className="grid grid-cols-3 gap-8">
                {[
                  { num: "5+", label: "Years" },
                  { num: "50+", label: "Menu Items" },
                  { num: "4.9", label: "Rating" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="font-[var(--font-serif)] text-3xl md:text-4xl text-[var(--accent)] mb-1">{stat.num}</div>
                    <div className="text-xs tracking-[0.15em] uppercase text-[var(--text-muted)]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── MENU ── */}
      <section id="menu" className="py-32 bg-[var(--bg-secondary)] relative">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeIn className="text-center mb-16">
            <SectionLabel>Culinary Selection</SectionLabel>
            <h2 className="heading-lg mb-4">The Menu</h2>
            <p className="text-body max-w-xl mx-auto">Each dish is a carefully composed narrative of flavor, texture, and artistry.</p>
          </FadeIn>
          <FadeIn className="flex justify-center gap-2 mb-14">
            {MENU_CATEGORIES.map((cat, i) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(i)}
                className={`px-6 py-3 text-xs tracking-[0.15em] uppercase transition-all duration-300 border ${activeCategory === i ? "bg-[var(--accent)] text-[var(--bg-primary)] border-[var(--accent)]" : "bg-transparent text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--border-accent)] hover:text-[var(--accent)]"}`}
              >
                {cat.name}
              </button>
            ))}
          </FadeIn>
          <div className="space-y-0">
            {MENU_CATEGORIES[activeCategory].items.map((item, i) => (
              <FadeIn key={item.name} delay={i * 0.05}>
                <div className="group py-6 border-b border-[var(--border)] hover:border-[var(--border-accent)] transition-colors duration-300">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3 mb-1">
                        <h3 className="font-[var(--font-serif)] text-xl md:text-2xl text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">{item.name}</h3>
                        <div className="flex-1 border-b border-dotted border-[var(--border)] min-w-8" />
                        <span className="font-[var(--font-serif)] text-xl text-[var(--accent)]">{item.price}</span>
                      </div>
                      <p className="text-body text-sm">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <FadeIn className="text-center mb-16">
            <SectionLabel>Visual Journey</SectionLabel>
            <h2 className="heading-lg mb-4">Gallery</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {GALLERY_ITEMS.map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="group relative aspect-square bg-[var(--bg-secondary)] border border-[var(--border)] cursor-pointer overflow-hidden hover:border-[var(--border-accent)] transition-all duration-500">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center transition-transform duration-500 group-hover:scale-110">
                      <p className="text-xs tracking-[0.2em] uppercase text-[var(--accent)] mb-2">{item.category}</p>
                      <h3 className="font-[var(--font-serif)] text-xl text-[var(--text-primary)]">{item.title}</h3>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <p className="text-body text-sm">View Details →</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="py-32 bg-[var(--bg-secondary)] relative">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <FadeIn className="text-center mb-16">
            <SectionLabel>Guest Voices</SectionLabel>
            <h2 className="heading-lg mb-4">Testimonials</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="glass-card p-8">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-[var(--accent)] fill-[var(--accent)]" />
                    ))}
                  </div>
                  <p className="text-body mb-6 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                  <div className="border-t border-[var(--border)] pt-4">
                    <p className="font-[var(--font-serif)] text-lg text-[var(--text-primary)]">{t.name}</p>
                    <p className="text-xs tracking-[0.15em] uppercase text-[var(--accent)]">{t.role}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESERVATION ── */}
      <section id="reservation" className="py-32 relative">
        <div className="max-w-3xl mx-auto px-6 md:px-10">
          <FadeIn className="text-center mb-16">
            <SectionLabel>Join Us</SectionLabel>
            <h2 className="heading-lg mb-4">Reserve a Table</h2>
            <p className="text-body max-w-lg mx-auto">Secure your place at MAISON. For parties larger than 8, please contact us directly.</p>
          </FadeIn>
          <FadeIn>
            <form className="glass-card p-8 md:p-10 space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] mb-2">Name</label>
                  <input type="text" required className="w-full bg-[var(--bg-card)] border border-[var(--border)] px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] mb-2">Email</label>
                  <input type="email" required className="w-full bg-[var(--bg-card)] border border-[var(--border)] px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] mb-2">Date</label>
                  <input type="date" required className="w-full bg-[var(--bg-card)] border border-[var(--border)] px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors" />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] mb-2">Time</label>
                  <select required className="w-full bg-[var(--bg-card)] border border-[var(--border)] px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors">
                    <option value="">Select time</option>
                    {["5:00 PM","5:30 PM","6:00 PM","6:30 PM","7:00 PM","7:30 PM","8:00 PM","8:30 PM","9:00 PM","9:30 PM"].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] mb-2">Number of Guests</label>
                <div className="flex items-center gap-4">
                  <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} className="w-10 h-10 border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-[var(--font-serif)] text-2xl text-[var(--text-primary)] w-8 text-center">{guests}</span>
                  <button type="button" onClick={() => setGuests(Math.min(20, guests + 1))} className="w-10 h-10 border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] mb-2">Special Requests (Optional)</label>
                <textarea rows={3} className="w-full bg-[var(--bg-card)] border border-[var(--border)] px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none" placeholder="Allergies, celebrations, seating preferences..." />
              </div>
              <button type="submit" className="btn-primary w-full justify-center py-4">Confirm Reservation</button>
            </form>
          </FadeIn>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-32 bg-[var(--bg-secondary)] relative">
        <div className="max-w-5xl mx-auto px-6 md:px-10">
          <FadeIn className="text-center mb-16">
            <SectionLabel>Find Us</SectionLabel>
            <h2 className="heading-lg mb-4">Contact</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: <MapPin className="w-5 h-5" />, title: "Address", lines: ["123 Culinary Lane", "Downtown District", "New York, NY 10001"] },
              { icon: <Clock className="w-5 h-5" />, title: "Hours", lines: ["Mon–Thu: 5PM – 10PM", "Fri–Sat: 5PM – 11PM", "Sun: 5PM – 9PM"] },
              { icon: <Phone className="w-5 h-5" />, title: "Phone", lines: ["+1 (555) 123-4567", "reservations@maison.com", "For parties 8+ call us"] },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="glass-card p-8 text-center">
                  <div className="w-12 h-12 border border-[var(--border-accent)] rounded-full flex items-center justify-center mx-auto mb-4 text-[var(--accent)]">
                    {card.icon}
                  </div>
                  <h3 className="font-[var(--font-serif)] text-lg text-[var(--text-primary)] mb-3">{card.title}</h3>
                  {card.lines.map((line, j) => (
                    <p key={j} className="text-body text-sm">{line}</p>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <div className="h-64 bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-[var(--accent)] mx-auto mb-3 opacity-50" />
                <p className="text-[var(--text-muted)] text-sm">Interactive Map</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-16 border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <span className="font-[var(--font-serif)] text-2xl text-[var(--text-primary)] tracking-wide">MAISON</span>
              <p className="text-body text-sm mt-4 max-w-sm">A sanctuary of culinary artistry where locally sourced ingredients meet artisan techniques. Every plate tells a story.</p>
              <div className="flex gap-4 mt-6">
                {[
                  { icon: <Instagram className="w-4 h-4" />, label: "Instagram" },
                  { icon: <Facebook className="w-4 h-4" />, label: "Facebook" },
                  { icon: <Twitter className="w-4 h-4" />, label: "Twitter" },
                ].map((s) => (
                  <a key={s.label} href="#" aria-label={s.label} className="w-10 h-10 border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--border-accent)] transition-all duration-300">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-xs tracking-[0.15em] uppercase text-[var(--accent)] mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {["Menu","Reservations","Gallery","About Us"].map((l) => (
                  <li key={l}><a href={`#${l.toLowerCase().replace(" ","-")}`} className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs tracking-[0.15em] uppercase text-[var(--accent)] mb-4">Newsletter</h4>
              <p className="text-sm text-[var(--text-secondary)] mb-4">Get exclusive offers and updates.</p>
              <div className="flex">
                <input type="email" placeholder="Your email" className="flex-1 bg-[var(--bg-card)] border border-[var(--border)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors" />
                <button className="px-4 py-2.5 bg-[var(--accent)] text-[var(--bg-primary)]">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-[var(--border)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[var(--text-muted)]">© 2026 MAISON. All rights reserved.</p>
            <div className="flex gap-6">
              {["Privacy","Terms","Cookies"].map((l) => (
                <a key={l} href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
