"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
      { name: "Wagyu Ribeye", desc: "Truffle jus, roasted garlic, seasonal vegetables", price: "$68" },
      { name: "Lobster Thermidor", desc: "Cognac cream, gratin, asparagus", price: "$58" },
      { name: "Duck Confit", desc: "Cherry gastrique, wild rice, frisée", price: "$42" },
      { name: "Sea Bass", desc: "Saffron broth, fennel, citrus oil", price: "$46" },
    ],
  },
  {
    name: "Desserts",
    items: [
      { name: "Crème Brûlée", desc: "Madagascar vanilla, caramelized sugar", price: "$16" },
      { name: "Chocolate Fondant", desc: "Dark chocolate, gold leaf, raspberry", price: "$18" },
      { name: "Tarte Tatin", desc: "Caramelized apple, calvados ice cream", price: "$17" },
      { name: "Cheese Selection", desc: "Artisan cheeses, honeycomb, walnuts", price: "$22" },
    ],
  },
];

const TESTIMONIALS = [
  { name: "Elena Rossi", role: "Food Critic", text: "An extraordinary culinary journey. Every dish tells a story of passion and precision. MAISON is not just a restaurant — it's an experience.", rating: 5 },
  { name: "James Chen", role: "Michelin Guide", text: "The attention to detail is remarkable. From the ambiance to the plate, everything speaks of excellence. A must-visit destination.", rating: 5 },
  { name: "Sophie Laurent", role: "Travel Blogger", text: "I've dined at restaurants worldwide. MAISON stands apart — the flavors are bold yet refined, the service impeccable. Truly unforgettable.", rating: 5 },
];

const GALLERY_ITEMS = [
  { title: "Wagyu Ribeye", category: "Mains" },
  { title: "Tuna Tartare", category: "Starters" },
  { title: "Chocolate Fondant", category: "Desserts" },
  { title: "Burrata", category: "Starters" },
  { title: "Sea Bass", category: "Mains" },
  { name: "Crème Brûlée", category: "Desserts" },
];

/* ─── NAVBAR ────────────────────────────────────────────────────────────────── */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border)] py-3"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <a href="#home" className="relative z-10">
            <span className="font-[var(--font-serif)] text-2xl md:text-3xl tracking-wide text-[var(--text-primary)]">MAISON</span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs tracking-[0.2em] uppercase text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-300 font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            <a href="#reservation" className="btn-primary text-xs py-3 px-6">
              Reserve
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative z-10 p-2 text-[var(--text-primary)]"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[var(--bg-primary)]/98 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="text-lg tracking-[0.15em] uppercase text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#reservation"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.08 }}
                className="btn-primary mt-4"
              >
                Reserve a Table
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── HERO ──────────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[var(--bg-primary)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, var(--accent) 1px, transparent 0)`,
        backgroundSize: "40px 40px",
      }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="section-label mb-6"
          >
            Fine Dining Experience
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="heading-xl mb-8"
          >
            Where Every Plate
            <br />
            <span className="text-gradient">Tells a Story</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-body-lg max-w-2xl mx-auto mb-12"
          >
            A sanctuary of culinary artistry where locally sourced ingredients meet
            artisan techniques. Experience the extraordinary.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="#menu" className="btn-primary">
              Explore Menu
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#reservation" className="btn-secondary">
              Reserve a Table
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-5 h-5 text-[var(--accent)] animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}

/* ─── ABOUT ─────────────────────────────────────────────────────────────────── */

function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left — Image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
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
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="section-label">Our Story</p>
            <h2 className="heading-lg mb-8">
              A Passion for the <span className="text-gradient">Exceptional</span>
            </h2>
            <div className="space-y-6 text-body">
              <p>
                Founded in 2019, MAISON was born from a singular vision: to create a dining
                experience that transcends the ordinary. Our chef brings two decades of
                culinary mastery from the world&apos;s most revered kitchens.
              </p>
              <p>
                Every ingredient is thoughtfully sourced from local farms and artisan producers.
                We believe that exceptional food begins with exceptional ingredients — and that
                every plate should be a testament to the land and the hands that cultivated it.
              </p>
            </div>

            <div className="divider my-10" />

            <div className="grid grid-cols-3 gap-8">
              {[
                { value: "5+", label: "Years" },
                { value: "50+", label: "Menu Items" },
                { value: "4.9", label: "Rating" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                >
                  <div className="font-[var(--font-serif)] text-3xl md:text-4xl text-[var(--accent)] mb-1">{stat.value}</div>
                  <div className="text-xs tracking-[0.15em] uppercase text-[var(--text-muted)]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── MENU ──────────────────────────────────────────────────────────────────── */

function MenuSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="menu" className="py-32 bg-[var(--bg-secondary)] relative" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="section-label">Culinary Selection</p>
          <h2 className="heading-lg mb-4">The Menu</h2>
          <p className="text-body max-w-xl mx-auto">
            Each dish is a carefully composed narrative of flavor, texture, and artistry.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-2 mb-14"
        >
          {MENU_CATEGORIES.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(i)}
              className={`px-6 py-3 text-xs tracking-[0.15em] uppercase transition-all duration-300 border ${
                activeCategory === i
                  ? "bg-[var(--accent)] text-[var(--bg-primary)] border-[var(--accent)]"
                  : "bg-transparent text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--border-accent)] hover:text-[var(--accent)]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        {/* Menu items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-0"
          >
            {MENU_CATEGORIES[activeCategory].items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group py-6 border-b border-[var(--border)] hover:border-[var(--border-accent)] transition-colors duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-1">
                      <h3 className="font-[var(--font-serif)] text-xl md:text-2xl text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                        {item.name}
                      </h3>
                      <div className="flex-1 border-b border-dotted border-[var(--border)] min-w-8" />
                      <span className="font-[var(--font-serif)] text-xl text-[var(--accent)]">{item.price}</span>
                    </div>
                    <p className="text-body text-sm">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─── GALLERY ───────────────────────────────────────────────────────────────── */

function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="gallery" className="py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="section-label">Visual Journey</p>
          <h2 className="heading-lg mb-4">Gallery</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative aspect-square bg-[var(--bg-secondary)] border border-[var(--border)] cursor-pointer overflow-hidden hover:border-[var(--border-accent)] transition-all duration-500"
            >
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ───────────────────────────────────────────────────────────── */

function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="py-32 bg-[var(--bg-secondary)] relative" ref={ref}>
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="section-label">Guest Voices</p>
          <h2 className="heading-lg mb-4">Testimonials</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-card p-8"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-[var(--accent)] fill-[var(--accent)]" />
                ))}
              </div>
              <p className="text-body mb-6 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              <div className="border-t border-[var(--border)] pt-4">
                <p className="font-[var(--font-serif)] text-lg text-[var(--text-primary)]">{t.name}</p>
                <p className="text-xs tracking-[0.15em] uppercase text-[var(--accent)]">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── RESERVATION ───────────────────────────────────────────────────────────── */

function Reservation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", date: "", time: "", guests: "2", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="reservation" className="py-32 relative" ref={ref}>
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="section-label">Join Us</p>
          <h2 className="heading-lg mb-4">Reserve a Table</h2>
          <p className="text-body max-w-lg mx-auto">
            Secure your place at MAISON. For parties larger than 8, please contact us directly.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-12 text-center"
            >
              <div className="w-16 h-16 border border-[var(--accent)] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-[var(--accent)] text-2xl">✓</span>
              </div>
              <h3 className="font-[var(--font-serif)] text-2xl text-[var(--text-primary)] mb-3">Reservation Confirmed</h3>
              <p className="text-body">Thank you, {form.name}. We look forward to welcoming you to MAISON.</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="glass-card p-8 md:p-10 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] mb-2">Name</label>
                  <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-[var(--bg-card)] border border-[var(--border)] px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                    placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] mb-2">Email</label>
                  <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[var(--bg-card)] border border-[var(--border)] px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
                    placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] mb-2">Date</label>
                  <input type="date" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                    className="w-full bg-[var(--bg-card)] border border-[var(--border)] px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors" />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] mb-2">Time</label>
                  <select required value={form.time} onChange={e => setForm({ ...form, time: e.target.value })}
                    className="w-full bg-[var(--bg-card)] border border-[var(--border)] px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors">
                    <option value="">Select time</option>
                    {["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] mb-2">Number of Guests</label>
                <div className="flex items-center gap-4">
                  <button type="button" onClick={() => setForm({ ...form, guests: String(Math.max(1, parseInt(form.guests) - 1)) })}
                    className="w-10 h-10 border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-[var(--font-serif)] text-2xl text-[var(--text-primary)] w-8 text-center">{form.guests}</span>
                  <button type="button" onClick={() => setForm({ ...form, guests: String(Math.min(12, parseInt(form.guests) + 1)) })}
                    className="w-10 h-10 border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] mb-2">Special Requests (Optional)</label>
                <textarea rows={3} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-[var(--bg-card)] border border-[var(--border)] px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
                  placeholder="Allergies, celebrations, seating preferences..." />
              </div>

              <button type="submit" className="btn-primary w-full justify-center py-4">
                Confirm Reservation
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─── CONTACT ───────────────────────────────────────────────────────────────── */

function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-32 bg-[var(--bg-secondary)] relative" ref={ref}>
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="section-label">Find Us</p>
          <h2 className="heading-lg mb-4">Contact</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: <MapPin className="w-5 h-5" />, title: "Address", lines: ["123 Culinary Lane", "Downtown District", "New York, NY 10001"] },
            { icon: <Clock className="w-5 h-5" />, title: "Hours", lines: ["Mon–Thu: 5PM – 10PM", "Fri–Sat: 5PM – 11PM", "Sun: 5PM – 9PM"] },
            { icon: <Phone className="w-5 h-5" />, title: "Phone", lines: ["+1 (555) 123-4567", "reservations@maison.com", "For parties 8+ call us"] },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card p-8 text-center"
            >
              <div className="w-12 h-12 border border-[var(--border-accent)] rounded-full flex items-center justify-center mx-auto mb-4 text-[var(--accent)]">
                {item.icon}
              </div>
              <h3 className="font-[var(--font-serif)] text-lg text-[var(--text-primary)] mb-3">{item.title}</h3>
              {item.lines.map((line, j) => (
                <p key={j} className="text-body text-sm">{line}</p>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Map placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-64 bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center"
        >
          <div className="text-center">
            <MapPin className="w-8 h-8 text-[var(--accent)] mx-auto mb-3 opacity-50" />
            <p className="text-[var(--text-muted)] text-sm">Interactive Map</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FOOTER ────────────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="py-16 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <span className="font-[var(--font-serif)] text-2xl text-[var(--text-primary)] tracking-wide">MAISON</span>
            <p className="text-body text-sm mt-4 max-w-sm">
              A sanctuary of culinary artistry where locally sourced ingredients meet artisan techniques. Every plate tells a story.
            </p>
            <div className="flex gap-4 mt-6">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--border-accent)] transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase text-[var(--accent)] mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {["Menu", "Reservations", "Gallery", "About Us"].map(link => (
                <li key={link}><a href={`#${link.toLowerCase().replace(" ", "-")}`} className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.15em] uppercase text-[var(--accent)] mb-4">Newsletter</h4>
            <p className="text-sm text-[var(--text-secondary)] mb-4">Get exclusive offers and updates.</p>
            <div className="flex">
              <input type="email" placeholder="Your email"
                className="flex-1 bg-[var(--bg-card)] border border-[var(--border)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors" />
              <button className="px-4 py-2.5 bg-[var(--accent)] text-[var(--bg-primary)]">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--border)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)]">© {new Date().getFullYear()} MAISON. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map(link => (
              <a key={link} href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── MAIN PAGE ─────────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <MenuSection />
      <Gallery />
      <Testimonials />
      <Reservation />
      <Contact />
      <Footer />
    </div>
  );
}
