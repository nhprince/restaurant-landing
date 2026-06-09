"use client";

import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   MAISON RESTAURANT — PREMIUM EXPERIENCE
   Hero with parallax, real images, micro-animations, custom logo
   ═══════════════════════════════════════════════════════════════ */

const UNSPLASH = (id: string, w = 1920) =>
  `https://images.unsplash.com/photo-${id}?ixlib=rb-4.1.0&auto=format&fit=crop&w=${w}&q=80`;

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
      { name: "Tuna Tartare", desc: "Avocado mousse, sesame crisp, yuzu dressing", price: "$24", img: UNSPLASH("1546833999-b9f581a19d6d", 600) },
      { name: "Burrata", desc: "Heirloom tomatoes, basil oil, aged balsamic", price: "$19", img: UNSPLASH("1522906456132-bac22adad34e", 600) },
      { name: "Oysters", desc: "Half dozen, champagne mignonette, lemon", price: "$28", img: UNSPLASH("1750943083282-2542e334fbad", 600) },
      { name: "Foie Gras", desc: "Brioche toast, fig compote, micro greens", price: "$32", img: UNSPLASH("1616669944447-d65d41a222bd", 600) },
    ],
  },
  {
    name: "Mains",
    items: [
      { name: "Wagyu Ribeye", desc: "Truffle jus, roasted bone marrow, seasonal vegetables", price: "$68", img: UNSPLASH("1616669944447-d65d41a222bd", 600) },
      { name: "Pan-Seared Sea Bass", desc: "Saffron broth, fennel, citrus beurre blanc", price: "$48", img: UNSPLASH("1750943083282-2542e334fbad", 600) },
      { name: "Duck Confit", desc: "Lentil du Puy, cherry gastrique, crispy skin", price: "$42", img: UNSPLASH("1546833999-b9f581a19d6d", 600) },
      { name: "Lobster Risotto", desc: "Arborio rice, bisque reduction, chive oil", price: "$56", img: UNSPLASH("1498579150354-977475b7ea0b", 600) },
    ],
  },
  {
    name: "Desserts",
    items: [
      { name: "Chocolate Fondant", desc: "Valrhona chocolate, vanilla bean ice cream", price: "$18", img: UNSPLASH("1698688334089-c68105801d02", 600) },
      { name: "Crème Brûlée", desc: "Madagascar vanilla, caramelized sugar", price: "$16", img: UNSPLASH("1663100143193-bca3e76f81b6", 600) },
      { name: "Tarte Tatin", desc: "Caramelized apple, calvados cream", price: "$17", img: UNSPLASH("1698688334089-c68105801d02", 600) },
      { name: "Cheese Selection", desc: "Artisan cheeses, honeycomb, walnut bread", price: "$24", img: UNSPLASH("1522906456132-bac22adad34e", 600) },
    ],
  },
];

const GALLERY_ITEMS = [
  { category: "Mains", title: "Wagyu Ribeye", img: UNSPLASH("1616669944447-d65d41a222bd", 800) },
  { category: "Sushi", title: "Sashimi Selection", img: UNSPLASH("1700324828870-43027cba6d18", 800) },
  { category: "Desserts", title: "Chocolate Fondant", img: UNSPLASH("1698688334089-c68105801d02", 800) },
  { category: "Pasta", title: "Lobster Linguine", img: UNSPLASH("1498579150354-977475b7ea0b", 800) },
  { category: "Seafood", title: "Grilled Sea Bass", img: UNSPLASH("1750943083282-2542e334fbad", 800) },
  { category: "Drinks", title: "Signature Cocktail", img: UNSPLASH("1605270012917-bf157c5a9541", 800) },
];

const TESTIMONIALS = [
  { name: "Elena Rossi", role: "Food Critic — The New York Times", text: "An extraordinary culinary journey. Every dish tells a story of passion and precision. MAISON is not just a restaurant — it's an experience that lingers long after the last bite.", avatar: UNSPLASH("1494790108377-be9c29b29330", 200) },
  { name: "James Chen", role: "Michelin Guide Inspector", text: "The attention to detail is remarkable. From the ambiance to the plate, everything speaks of excellence. A must-visit destination for anyone who appreciates true craft.", avatar: UNSPLASH("1560250097-0b93528c311a", 200) },
  { name: "Sophie Laurent", role: "Travel & Food Blogger", text: "I've dined at restaurants across 40 countries. MAISON stands apart — the flavors are bold yet refined, the service impeccable. Truly unforgettable in every way.", avatar: UNSPLASH("1573496359142-b8d87734a5a2", 200) },
];

const CONTACT_CARDS = [
  { icon: "📍", title: "Address", lines: ["123 Culinary Lane", "Downtown District", "New York, NY 10001"] },
  { icon: "🕐", title: "Hours", lines: ["Mon–Thu: 5PM – 10PM", "Fri–Sat: 5PM – 11PM", "Sun: 5PM – 9PM"] },
  { icon: "📞", title: "Phone", lines: ["+1 (555) 123-4567", "reservations@maison.com", "For parties 8+ call us"] },
];

const FOOTER_COLS = [
  { title: "Quick Links", links: [{ l: "Menu", h: "#menu" }, { l: "Reservations", h: "#reservation" }, { l: "Gallery", h: "#gallery" }, { l: "About Us", h: "#about" }] },
  { title: "Social", links: [{ l: "Instagram", h: "#" }, { l: "Facebook", h: "#" }, { l: "Twitter", h: "#" }] },
];

// ─── SCROLL REVEAL HOOK ─────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ─── NAVBAR ──────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : "navbar-transparent"}`}>
        <div className="container-fluid">
          <div className="navbar-inner">
            <a href="#home" className="nav-logo">
              <div className="nav-logo-icon">M</div>
              <span className="hidden sm:inline">AISON</span>
            </a>

            <div className="nav-links">
              {NAV_LINKS.map(l => (
                <a key={l.label} href={l.href}>{l.label}</a>
              ))}
            </div>

            <div className="nav-actions">
              <a href="#reservation" className="btn-primary text-xs py-3 px-6">Reserve</a>
            </div>

            <button onClick={() => setDrawerOpen(true)} className="nav-mobile-btn p-2 text-[var(--text-primary)]" aria-label="Open menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${drawerOpen ? "open" : ""}`} role="dialog" aria-modal="true">
        <div className="mobile-drawer-backdrop" onClick={() => setDrawerOpen(false)} />
        <div className="mobile-drawer-panel">
          <div className="p-5 pt-14">
            <button onClick={() => setDrawerOpen(false)} className="absolute top-4 right-4 p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]" aria-label="Close menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <div className="mb-6 flex items-center gap-3">
              <div className="nav-logo-icon">M</div>
              <span className="nav-logo text-xl">MAISON</span>
            </div>
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} onClick={() => setDrawerOpen(false)}>{l.label}</a>
            ))}
            <a href="#reservation" onClick={() => setDrawerOpen(false)} className="btn-primary w-full mt-6">Reserve a Table</a>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── HERO ────────────────────────────────────────────────────────

function Hero() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <section id="home" className="hero-section">
      {/* Parallax Background Image */}
      <div
        className="hero-bg-image"
        style={{
          backgroundImage: `url(${UNSPLASH("1414235077428-338989a2e8c0", 1920)})`,
          transform: `scale(1.1) translateY(${scrollY * 0.3}px)`,
        }}
      />
      <div className="hero-bg-overlay" />
      <div className="hero-bg-pattern" />

      <div className="relative z-10 container-fluid text-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--border-accent)] rounded-full mb-6 md:mb-8">
            <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-pulse" />
            <p className="text-label mb-0 text-[var(--accent)]">Fine Dining Experience</p>
          </div>
        </div>

        <div className="animate-fade-in-up stagger-1">
          <h1 className="heading-xl mb-4 md:mb-8">
            Where Every Plate<br />
            <span className="text-gradient">Tells a Story</span>
          </h1>
        </div>

        <div className="animate-fade-in-up stagger-2">
          <p className="text-body-lg max-w-2xl mx-auto mb-8 md:mb-12 text-[var(--text-secondary)]">
            A sanctuary of culinary artistry where locally sourced ingredients meet artisan techniques. Experience the extraordinary.
          </p>
        </div>

        <div className="animate-fade-in-up stagger-3">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#menu" className="btn-primary w-full sm:w-auto group">
              Explore Menu
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
            <a href="#reservation" className="btn-secondary w-full sm:w-auto">Reserve a Table</a>
          </div>
        </div>

        {/* Stats bar */}
        <div className="animate-fade-in-up stagger-5 mt-12 md:mt-20">
          <div className="flex items-center justify-center gap-8 md:gap-16">
            {[
              { num: "5+", label: "Years" },
              { num: "50+", label: "Menu Items" },
              { num: "4.9", label: "Rating" },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="stat-number">{stat.num}</div>
                <div className="text-[10px] md:text-xs tracking-[0.15em] uppercase text-[var(--text-muted)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </section>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────

function About() {
  const reveal = useReveal();
  return (
    <section id="about" className="section-padding section-pattern relative">
      <div className="container-section">
        <div ref={reveal} className="reveal grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="image-frame aspect-[4/5]">
              <img src={UNSPLASH("1622021142947-da7dedc7c39a", 800)} alt="Chef cooking" loading="lazy" />
              <div className="image-overlay" />
            </div>
            <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-32 h-32 md:w-48 md:h-48 border border-[var(--border-accent)] rounded-2xl" />
            <div className="absolute -top-4 -left-4 w-24 h-24 md:w-32 md:h-32 border border-[var(--border)] rounded-2xl opacity-50" />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <p className="text-label">Our Story</p>
            <h2 className="heading-lg mb-4 md:mb-8">A Passion for the <span className="text-gradient">Exceptional</span></h2>
            <div className="space-y-4 md:space-y-6 text-body">
              <p>Founded in 2019, MAISON was born from a singular vision: to create a dining experience that transcends the ordinary. Our chef brings two decades of culinary mastery from the world's most revered kitchens.</p>
              <p>Every ingredient is thoughtfully sourced from local farms and artisan producers. We believe that exceptional food begins with exceptional ingredients — and that every plate should be a testament to the land and the hands that cultivated it.</p>
            </div>
            <div className="divider my-6 md:my-10" />
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              {[
                { num: "5+", label: "Years" },
                { num: "50+", label: "Menu Items" },
                { num: "4.9", label: "Rating" },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="stat-number">{stat.num}</div>
                  <div className="text-[10px] md:text-xs tracking-[0.15em] uppercase text-[var(--text-muted)]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── MENU ────────────────────────────────────────────────────────

function Menu() {
  const [activeCategory, setActiveCategory] = useState(0);
  const reveal = useReveal();

  return (
    <section id="menu" className="section-padding bg-[var(--bg-secondary)] section-pattern relative">
      <div className="container-section">
        <div ref={reveal} className="reveal text-center mb-8 md:mb-16">
          <p className="text-label">Culinary Selection</p>
          <h2 className="heading-lg mb-3 md:mb-4">The Menu</h2>
          <p className="text-body max-w-xl mx-auto">Each dish is a carefully composed narrative of flavor, texture, and artistry.</p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-1.5 md:gap-2 mb-8 md:mb-14">
          {MENU_CATEGORIES.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(i)}
              className={`px-4 py-2.5 md:px-6 md:py-3 text-[10px] md:text-xs tracking-[0.1em] md:tracking-[0.15em] uppercase transition-all duration-300 border rounded-lg md:rounded-none ${
                activeCategory === i
                  ? "bg-[var(--accent)] text-[var(--bg-primary)] border-[var(--accent)]"
                  : "bg-transparent text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--border-accent)] hover:text-[var(--accent)]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="space-y-0">
          {MENU_CATEGORIES[activeCategory].items.map((item, i) => (
            <div key={item.name} className="menu-item group" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 md:gap-3 mb-1 flex-wrap">
                    <h3 className="font-[var(--font-display)] text-lg md:text-xl lg:text-2xl text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">{item.name}</h3>
                    <div className="flex-1 border-b border-dotted border-[var(--border)] min-w-4 hidden sm:block" />
                    <span className="font-[var(--font-display)] text-lg md:text-xl text-[var(--accent)] flex-shrink-0">{item.price}</span>
                  </div>
                  <p className="text-body text-xs md:text-sm">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── GALLERY ─────────────────────────────────────────────────────

function Gallery() {
  const reveal = useReveal();
  return (
    <section id="gallery" className="section-padding section-pattern relative">
      <div className="container-section">
        <div ref={reveal} className="reveal text-center mb-8 md:mb-16">
          <p className="text-label">Visual Journey</p>
          <h2 className="heading-lg mb-3 md:mb-4">Gallery</h2>
        </div>

        {/* Desktop Grid */}
        <div className="desktop-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          {GALLERY_ITEMS.map((item, i) => (
            <div key={i} className="gallery-item">
              <img src={item.img} alt={item.title} loading="lazy" />
              <div className="gallery-label">
                <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-[var(--accent)] mb-1">{item.category}</p>
                <h3 className="font-[var(--font-display)] text-base md:text-lg text-[var(--text-primary)]">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Scroll */}
        <div className="mobile-scroll scroll-row md:hidden">
          {GALLERY_ITEMS.map((item, i) => (
            <div key={i} className="gallery-item flex-shrink-0" style={{ width: "75vw", maxWidth: "22rem" }}>
              <img src={item.img} alt={item.title} loading="lazy" />
              <div className="gallery-label" style={{ transform: "translateY(0)" }}>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--accent)] mb-1">{item.category}</p>
                <h3 className="font-[var(--font-display)] text-base text-[var(--text-primary)]">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ────────────────────────────────────────────────

function Testimonials() {
  const reveal = useReveal();
  return (
    <section id="testimonials" className="section-padding bg-[var(--bg-secondary)] section-pattern relative">
      <div className="container-section">
        <div ref={reveal} className="reveal text-center mb-8 md:mb-16">
          <p className="text-label">Guest Voices</p>
          <h2 className="heading-lg mb-3 md:mb-4">Testimonials</h2>
        </div>

        {/* Desktop Grid */}
        <div className="desktop-grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="glass-card p-5 md:p-8">
              <div className="star-rating mb-3 md:mb-4">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ))}
              </div>
              <p className="text-body mb-4 md:mb-6 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              <div className="border-t border-[var(--border)] pt-3 md:pt-4 flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-[var(--border)]" loading="lazy" />
                <div>
                  <p className="font-[var(--font-display)] text-base md:text-lg text-[var(--text-primary)]">{t.name}</p>
                  <p className="text-[10px] md:text-xs tracking-[0.15em] uppercase text-[var(--accent)]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Scroll */}
        <div className="mobile-scroll scroll-row md:hidden">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="glass-card p-5 flex-shrink-0" style={{ width: "80vw", maxWidth: "22rem" }}>
              <div className="star-rating mb-3">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="star" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ))}
              </div>
              <p className="text-body text-sm mb-4 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              <div className="border-t border-[var(--border)] pt-3 flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-[var(--border)]" loading="lazy" />
                <div>
                  <p className="font-[var(--font-display)] text-base text-[var(--text-primary)]">{t.name}</p>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-[var(--accent)]">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── RESERVATION ─────────────────────────────────────────────────

function Reservation() {
  const [guests, setGuests] = useState(2);
  const reveal = useReveal();

  return (
    <section id="reservation" className="section-padding section-pattern relative">
      <div className="container-section">
        <div ref={reveal} className="reveal max-w-3xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <p className="text-label">Join Us</p>
            <h2 className="heading-lg mb-3 md:mb-4">Reserve a Table</h2>
            <p className="text-body max-w-lg mx-auto">Secure your place at MAISON. For parties larger than 8, please contact us directly.</p>
          </div>

          <form className="glass-card p-5 md:p-8 lg:p-10 space-y-4 md:space-y-6" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-[10px] md:text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] mb-2">Name</label>
                <input type="text" required className="form-input" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-[10px] md:text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] mb-2">Email</label>
                <input type="email" required className="form-input" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-[10px] md:text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] mb-2">Date</label>
                <input type="date" required className="form-input" />
              </div>
              <div>
                <label className="block text-[10px] md:text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] mb-2">Time</label>
                <select required className="form-input">
                  <option value="">Select time</option>
                  {["5:00 PM","5:30 PM","6:00 PM","6:30 PM","7:00 PM","7:30 PM","8:00 PM","8:30 PM","9:00 PM","9:30 PM"].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] md:text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] mb-2">Number of Guests</label>
              <div className="guest-counter">
                <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} className="guest-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/></svg>
                </button>
                <span className="guest-count">{guests}</span>
                <button type="button" onClick={() => setGuests(Math.min(20, guests + 1))} className="guest-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[10px] md:text-xs tracking-[0.15em] uppercase text-[var(--text-muted)] mb-2">Special Requests (Optional)</label>
              <textarea rows={3} className="form-input resize-none" placeholder="Allergies, celebrations, seating preferences..." />
            </div>

            <button type="submit" className="btn-primary w-full py-3 md:py-4">Confirm Reservation</button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────

function Contact() {
  const reveal = useReveal();
  return (
    <section id="contact" className="section-padding bg-[var(--bg-secondary)] section-pattern relative">
      <div className="container-section">
        <div ref={reveal} className="reveal">
          <div className="text-center mb-8 md:mb-16">
            <p className="text-label">Find Us</p>
            <h2 className="heading-lg mb-3 md:mb-4">Contact</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16">
            {CONTACT_CARDS.map((card, i) => (
              <div key={i} className="glass-card p-5 md:p-8 text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 border border-[var(--border-accent)] rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 text-[var(--accent)] text-lg md:text-xl">
                  {card.icon}
                </div>
                <h3 className="font-[var(--font-display)] text-base md:text-lg text-[var(--text-primary)] mb-2 md:mb-3">{card.title}</h3>
                {card.lines.map((line, j) => (
                  <p key={j} className="text-body text-xs md:text-sm">{line}</p>
                ))}
              </div>
            ))}
          </div>

          {/* Map */}
          <div className="image-frame h-48 md:h-80">
            <img
              src={UNSPLASH("1517248135467-4c7edcad34c4", 1920)}
              alt="Restaurant interior"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/60 to-transparent" />
            <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8">
              <p className="font-[var(--font-display)] text-lg md:text-2xl text-[var(--text-primary)]">MAISON Restaurant</p>
              <p className="text-body text-xs md:text-sm">123 Culinary Lane, New York</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="py-8 md:py-16 border-t border-[var(--border)]">
      <div className="container-section">
        <div className="footer-grid mb-8 md:mb-12">
          <div className="md:col-span-2 lg:col-span-1">
            <a href="#home" className="nav-logo mb-3 md:mb-4 inline-flex">
              <div className="nav-logo-icon">M</div>
              <span>MAISON</span>
            </a>
            <p className="text-body text-xs md:text-sm mt-3 md:mt-4 max-w-sm">A sanctuary of culinary artistry where locally sourced ingredients meet artisan techniques. Every plate tells a story.</p>
            <div className="flex gap-3 md:gap-4 mt-4 md:mt-6">
              {[
                { label: "Instagram", icon: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" },
                { label: "Facebook", icon: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                { label: "Twitter", icon: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" },
              ].map(s => (
                <a key={s.label} href="#" aria-label={s.label} className="w-8 h-8 md:w-10 md:h-10 border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--border-accent)] transition-all duration-300 rounded-lg">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={s.icon} /></svg>
                </a>
              ))}
            </div>
          </div>

          {FOOTER_COLS.map(col => (
            <div key={col.title}>
              <h4 className="text-[10px] md:text-xs tracking-[0.15em] uppercase text-[var(--accent)] mb-3 md:mb-4">{col.title}</h4>
              <ul className="space-y-2 md:space-y-3">
                {col.links.map(link => (
                  <li key={link.l}><a href={link.h} className="text-xs md:text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors no-underline">{link.l}</a></li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-[10px] md:text-xs tracking-[0.15em] uppercase text-[var(--accent)] mb-3 md:mb-4">Newsletter</h4>
            <p className="text-xs md:text-sm text-[var(--text-secondary)] mb-3 md:mb-4">Get exclusive offers and updates.</p>
            <div className="flex">
              <input type="email" placeholder="Your email" className="form-input flex-1 min-w-0 rounded-r-none text-xs md:text-sm" />
              <button className="px-3 md:px-4 bg-[var(--accent)] text-[var(--bg-primary)] rounded-r-lg flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--border)] pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
          <p className="text-[10px] md:text-xs text-[var(--text-muted)]">© {new Date().getFullYear()} MAISON. All rights reserved.</p>
          <div className="flex gap-4 md:gap-6">
            {["Privacy", "Terms", "Cookies"].map(l => (
              <a key={l} href="#" className="text-[10px] md:text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors no-underline">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <div className="bg-orbs" />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Menu />
        <Gallery />
        <Testimonials />
        <Reservation />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
