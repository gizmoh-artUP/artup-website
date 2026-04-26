/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Calendar, ArrowLeft, Instagram, Mail, Phone, MessageSquare, Menu, X } from 'lucide-react';
import textsJSON from './texts.json';
import eventsJSON from './events.json';
import artistsJSON from './artists.json';

const ArtUPWebsite = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedArtistDetail, setSelectedArtistDetail] = useState(null);
  const [selectedEventDetail, setSelectedEventDetail] = useState(null);
  const [featuredArtists, setFeaturedArtists] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('de');
  const [cookieAccepted, setCookieAccepted] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('artup-cookies-accepted') === 'true';
    }
    return false;
  });

  const handleCookieAccept = () => {
    localStorage.setItem('artup-cookies-accepted', 'true');
    setCookieAccepted(true);
  };

  const t = (key) => {
    if (!textsJSON) return key;
    const keys = key.split('.');
    let value = textsJSON[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const getArtistText = (artist, textProperty) => {
    if (!artist || !artist.textKey) return '';
    const artistTexts = textsJSON[language]?.artists?.[artist.textKey];
    return artistTexts?.[textProperty] || '';
  };

  // ── Helpers for event dates ──────────────────────────────────────────
  const getEventDayName = (dateStr) => {
    const d = new Date(dateStr);
    const days = ['day_sunday','day_monday','day_tuesday','day_wednesday','day_thursday','day_friday','day_saturday'];
    return t(`events.${days[d.getDay()]}`);
  };

  const getEventMonthName = (dateStr) => {
    const d = new Date(dateStr);
    const m = String(d.getMonth() + 1).padStart(2, '0');
    return t(`events.month_${m}`);
  };

  const getEventTitle = (event) => language === 'de' ? event.title_de : event.title_en;

  // ── Data ─────────────────────────────────────────────────────────────
  const allArtists = artistsJSON.artists;
  const allEvents = eventsJSON.events;

  const sponsors = [
    { id: 1, name: 'Blackstorck', logo: 'https://res.cloudinary.com/dsktnxayr/image/upload/v1771593469/bs_logo_2_uafi9s.jpg', website: 'https://www.blackstork-braumanufaktur.de/' },
    { id: 2, name: 'Bassermann-Jordan', logo: 'https://res.cloudinary.com/dsktnxayr/image/upload/v1771593471/bj_logo_2_axvgf4.jpg', website: 'https://www.bassermann-jordan.de/' },
    { id: 3, name: 'Boesner Künstlerbedarf', logo: 'https://res.cloudinary.com/dsktnxayr/image/upload/v1771593337/boesner_logo_6_v1kcs6.jpg', website: 'https://www.boesner.com/' },
    { id: 4, name: 'Schramms Kaffeerösterei', logo: 'https://res.cloudinary.com/dsktnxayr/image/upload/v1771610990/schramms_logo_ht6qpb.jpg', website: 'https://www.schramms-kaffee.de/' }
  ];

  const generateRandomFeatured = () => {
    const shuffled = [...allArtists].sort(() => Math.random() - 0.5).slice(0, 4);
    setFeaturedArtists(shuffled);
    setCurrentSlide(0);
  };

  useEffect(() => { generateRandomFeatured(); }, [currentPage]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredArtists.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredArtists.length]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % featuredArtists.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + featuredArtists.length) % featuredArtists.length);

  const navigateTo = (page, data = null) => {
    if (page === 'artist-detail' && data) {
      setSelectedArtistDetail(data);
      const slug = data.name.toLowerCase().replace(/\s+/g, '-');
      window.history.pushState(null, '', `/artist/${slug}`);
    } else if (page === 'event-detail' && data) {
      setSelectedEventDetail(data);
      window.history.pushState(null, '', `/event/${data.id}`);
    } else {
      window.history.pushState(null, '', `/${page === 'home' ? '' : page}`);
    }
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/' || path === '') {
        setCurrentPage('home');
      } else if (path.startsWith('/artist/')) {
        const slug = path.replace('/artist/', '').toLowerCase();
        const artist = allArtists.find(a => a.name.toLowerCase().replace(/\s+/g, '-') === slug);
        if (artist) { setSelectedArtistDetail(artist); setCurrentPage('artist-detail'); }
      } else if (path.startsWith('/event/')) {
        const id = parseInt(path.replace('/event/', ''));
        const event = allEvents.find(e => e.id === id);
        if (event) { setSelectedEventDetail(event); setCurrentPage('event-detail'); }
      } else {
        setCurrentPage(path.replace('/', ''));
      }
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', handlePopState);
    handlePopState();
    return () => window.removeEventListener('popstate', handlePopState);
  }, [allArtists, allEvents]);

  const [upcomingEvents, setUpcomingEvents] = useState([]);
  useEffect(() => {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const upcoming = allEvents
      .filter(e => new Date(e.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3);
    setUpcomingEvents(upcoming);
  }, []);

  // ── COUNTDOWN ────────────────────────────────────────────────────────
  const CountdownSection = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    useEffect(() => {
      const calc = () => {
        const dist = new Date('2026-05-17T21:00:00').getTime() - Date.now();
        if (dist > 0) setTimeLeft({
          days: Math.floor(dist / 86400000),
          hours: Math.floor((dist / 3600000) % 24),
          minutes: Math.floor((dist / 60000) % 60),
          seconds: Math.floor((dist / 1000) % 60)
        });
      };
      calc();
      const timer = setInterval(calc, 1000);
      return () => clearInterval(timer);
    }, []);
    const Box = ({ value, label }) => (
      <div className="flex flex-col items-center">
        <div className="border-4 border-white p-2 md:p-4 min-w-16 md:min-w-20 mb-1">
          <p className="text-3xl md:text-5xl font-black text-white tracking-tight" style={{ fontFamily: 'Courier New, monospace' }}>
            {String(value).padStart(2, '0')}
          </p>
        </div>
        <p className="text-white text-xs md:text-sm font-black uppercase tracking-widest" style={{ fontFamily: 'Courier New, monospace' }}>{label}</p>
      </div>
    );
    return (
      <section className="py-20 px-6 border-b-4 border-black" style={{ backgroundColor: '#FF1461' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-white text-sm font-black uppercase mb-8 tracking-widest" style={{ fontFamily: 'Courier New, monospace', letterSpacing: '0.3em' }}>
              {t('countdown.header')}
            </p>
          </div>
          <div className="flex justify-center gap-2 md:gap-4 mb-12">
            <Box value={timeLeft.days} label={t('countdown.days')} />
            <div className="flex items-center text-white text-xl md:text-3xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>:</div>
            <Box value={timeLeft.hours} label={t('countdown.hours')} />
            <div className="flex items-center text-white text-xl md:text-3xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>:</div>
            <Box value={timeLeft.minutes} label={t('countdown.minutes')} />
            <div className="flex items-center text-white text-xl md:text-3xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>:</div>
            <Box value={timeLeft.seconds} label={t('countdown.seconds')} />
          </div>
          <div className="text-center">
            <p className="text-white text-base md:text-lg font-light tracking-widest" style={{ fontFamily: 'Courier New, monospace' }}>
              {t('countdown.date')}
            </p>
          </div>
        </div>
      </section>
    );
  };

  // ── ABOUT TEASER ─────────────────────────────────────────────────────
  const AboutTeaser = () => (
    <section className="py-20 px-6 border-b-4 border-black cursor-pointer hover:opacity-95 transition-opacity" onClick={() => navigateTo('about')} style={{ backgroundColor: '#FFC500' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter" style={{ fontFamily: 'Courier New, monospace' }}>{t('about_teaser.title')}</h2>
            <p className="text-lg leading-relaxed mb-8 font-medium">{t('about_teaser.description')}</p>
            <p className="text-base font-black uppercase tracking-widest" style={{ fontFamily: 'Courier New, monospace', color: '#FF1461' }}>{t('about_teaser.learn_more')}</p>
          </div>
          <div className="border-4 border-black p-8 bg-white">
            <div className="space-y-4 font-medium">
              <div>
                <p className="text-sm font-black uppercase text-gray-700">{t('about_teaser.location_label')}</p>
                <p className="text-lg">{t('about_teaser.location')}</p>
              </div>
              <div className="border-t-2 border-black pt-4">
                <p className="text-sm font-black uppercase text-gray-700">{t('about_teaser.hours_label')}</p>
                <p className="text-lg">{t('about_teaser.hours')}</p>
              </div>
              <div className="border-t-2 border-black pt-4">
                <p className="text-sm font-black uppercase text-gray-700">{t('about_teaser.admission_label')}</p>
                <p className="text-lg">{t('about_teaser.admission')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // ── EVENTS TEASER (Homepage) — Poster-Style ───────────────────────────
  const EventsTeaser = () => {
    const bgColors = ['#FF1461', '#000000', '#FF1461'];
    const oclock = language === 'de' ? ' Uhr' : '';

    // All upcoming events, top 3 as poster cards, rest as list
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const allUpcoming = allEvents
      .filter(e => new Date(e.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    const posterEvents = allUpcoming.slice(0, 3);
    const listEvents = allUpcoming.slice(3);

    return (
      <section className="py-20 px-6 border-b-4 border-black bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter" style={{ fontFamily: 'Courier New, monospace' }}>
              {t('events.title')}
            </h2>
            <button
              onClick={() => navigateTo('events')}
              className="text-sm font-black uppercase tracking-widest hover:opacity-60 transition-opacity hidden md:block"
              style={{ fontFamily: 'Courier New, monospace', color: '#FF1461' }}
            >
              {t('events.view_all')}
            </button>
          </div>

          {/* ── 3 Poster Cards ── */}
          <div className="grid md:grid-cols-3 gap-0 border-4 border-black">
            {posterEvents.length > 0 ? posterEvents.map((event, idx) => {
              const d = new Date(event.date);
              const day = d.getDate();
              const month = getEventMonthName(event.date);
              const dayName = getEventDayName(event.date);
              const bg = bgColors[idx];

              return (
                <div
                  key={event.id}
                  onClick={() => navigateTo('event-detail', event)}
                  className="cursor-pointer relative overflow-hidden group transition-all"
                  style={{
                    backgroundColor: bg,
                    borderRight: idx < 2 ? '4px solid #000' : 'none',
                    minHeight: '380px'
                  }}
                >
                  {/* Background image if available */}
                  {event.image && (
                    <img
                      src={event.image}
                      alt=""
                      className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105"
                      style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.35 }}
                    />
                  )}

                  {/* Card content */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6">
                    {/* Top right: date block */}
                    <div className="flex justify-end">
                      <div className="text-right">
                        <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ fontFamily: 'Courier New, monospace', color: '#fff', opacity: 0.55, letterSpacing: '0.2em' }}>
                          {dayName}
                        </p>
                        <p className="font-black leading-none" style={{ fontFamily: 'Courier New, monospace', color: '#fff', fontSize: 'clamp(56px, 10vw, 80px)', lineHeight: 1 }}>
                          {String(day).padStart(2, '0')}
                        </p>
                        <p className="text-xs font-black uppercase tracking-widest mt-2" style={{ fontFamily: 'Courier New, monospace', color: '#fff', opacity: 0.55, letterSpacing: '0.2em' }}>
                          {month}
                        </p>
                        <p className="text-sm font-black mt-2" style={{ fontFamily: 'Courier New, monospace', color: '#fff', opacity: 0.75 }}>
                          {event.time}{oclock}
                        </p>
                      </div>
                    </div>

                    {/* Bottom: Event title */}
                    <div>
                      <h3 className="text-xl md:text-2xl font-black leading-tight" style={{ fontFamily: 'Courier New, monospace', color: '#fff' }}>
                        {getEventTitle(event)}
                      </h3>
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                  <div className="absolute top-5 left-5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-black text-lg" style={{ fontFamily: 'Courier New, monospace' }}>→</span>
                  </div>
                </div>
              );
            }) : (
              <div className="col-span-3 p-12 text-center">
                <p className="font-black" style={{ fontFamily: 'Courier New, monospace' }}>{t('events.no_events')}</p>
              </div>
            )}
          </div>

          {/* ── Remaining events list ── */}
          {listEvents.length > 0 && (
            <div className="border-l-4 border-r-4 border-b-4 border-black">
              {listEvents.map((event, idx) => {
                const d = new Date(event.date);
                const day = d.getDate();
                const month = getEventMonthName(event.date);
                const dayName = getEventDayName(event.date);
                const isLast = idx === listEvents.length - 1;

                return (
                  <div
                    key={event.id}
                    onClick={() => navigateTo('event-detail', event)}
                    className="flex items-center gap-4 px-5 py-3 cursor-pointer group hover:bg-gray-50 transition-colors"
                    style={{ borderBottom: isLast ? 'none' : '2px solid #000' }}
                  >
                    {/* Date pill */}
                    <div className="flex-shrink-0 w-10 text-center">
                      <p className="text-xl font-black leading-none" style={{ fontFamily: 'Courier New, monospace' }}>
                        {String(day).padStart(2, '0')}
                      </p>
                      <p className="text-xs font-black uppercase" style={{ fontFamily: 'Courier New, monospace', color: '#FF1461' }}>
                        {month.slice(0, 3)}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="w-px h-8 bg-black opacity-20 flex-shrink-0" />

                    {/* Day + Title */}
                    <div className="flex-1 min-w-0">
                      <span className="text-xs font-black uppercase tracking-wider text-gray-400 mr-2" style={{ fontFamily: 'Courier New, monospace' }}>
                        {dayName}
                      </span>
                      <span className="text-sm font-black" style={{ fontFamily: 'Courier New, monospace' }}>
                        {getEventTitle(event)}
                      </span>
                    </div>

                    {/* Time */}
                    <div className="flex-shrink-0 text-right">
                      <span className="text-xs font-black text-gray-500" style={{ fontFamily: 'Courier New, monospace' }}>
                        {event.time}{oclock}
                      </span>
                    </div>

                    {/* Arrow */}
                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-black" style={{ fontFamily: 'Courier New, monospace', color: '#FF1461' }}>→</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Mobile: View all button */}
          <div className="mt-8 text-center md:hidden">
            <button
              onClick={() => navigateTo('events')}
              className="text-sm font-black uppercase tracking-widest"
              style={{ fontFamily: 'Courier New, monospace', color: '#FF1461' }}
            >
              {t('events.view_all')}
            </button>
          </div>
        </div>
      </section>
    );
  };

  // ── NAVIGATION ────────────────────────────────────────────────────────
  const Navigation = () => (
    <nav className="fixed w-full border-b" style={{
      zIndex: 9999,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottomColor: 'rgba(0, 0, 0, 0.3)',
      borderBottomWidth: '2px'
    }}>
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <button
          onClick={() => navigateTo('home')}
          className="hover:opacity-70 transition-opacity"
          aria-label="artUP Home"
        >
          <img
            src="https://res.cloudinary.com/dsktnxayr/image/upload/v1776023983/logo_artup.png"
            alt="artUP"
            style={{ height: '56px', width: 'auto' }}
          />
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-2 text-sm font-medium">
          {[
            { key: 'home', label: t('nav.home') },
            { key: 'artists', label: t('nav.artists') },
            { key: 'about', label: t('nav.about') },
            { key: 'events', label: t('nav.events') },
            { key: 'contact', label: t('nav.contact') },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => navigateTo(key)}
              className={`px-4 py-2 transition-all uppercase tracking-wide ${
                currentPage === key || (key === 'events' && currentPage === 'event-detail')
                  ? 'text-white' : 'text-black hover:opacity-60'
              }`}
              style={{
                fontFamily: 'Courier New, monospace',
                backgroundColor: (currentPage === key || (key === 'events' && currentPage === 'event-detail')) ? '#FF1461' : 'transparent'
              }}
            >
              {label}
            </button>
          ))}

          {/* Language Switcher */}
          <div className="flex gap-2 text-xs font-medium border-l border-gray-300 pl-6 ml-4" style={{ fontFamily: 'Courier New, monospace' }}>
            {['de', 'en'].map((lang, i) => (
              <React.Fragment key={lang}>
                {i > 0 && <span className="text-gray-300">/</span>}
                <button
                  onClick={() => setLanguage(lang)}
                  className="px-3 py-2 transition-all text-black font-black"
                  style={{ backgroundColor: language === lang ? '#FFC500' : 'transparent' }}
                >
                  {lang.toUpperCase()}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-4">
          <div className="flex gap-1 text-xs font-medium" style={{ fontFamily: 'Courier New, monospace' }}>
            {['de', 'en'].map((lang, i) => (
              <React.Fragment key={lang}>
                {i > 0 && <span className="text-gray-300">/</span>}
                <button
                  onClick={() => setLanguage(lang)}
                  className="px-2 py-1 transition-all text-black font-black"
                  style={{ backgroundColor: language === lang ? '#FFC500' : 'transparent' }}
                >
                  {lang.toUpperCase()}
                </button>
              </React.Fragment>
            ))}
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden py-4 px-6 space-y-3" style={{ backgroundColor: 'rgba(255,255,255,0.95)', borderTopColor: 'rgba(0,0,0,0.2)', borderTopWidth: '2px' }}>
          {[
            { key: 'home', label: 'HOME' },
            { key: 'artists', label: t('nav.artists').toUpperCase() },
            { key: 'about', label: t('nav.about').toUpperCase() },
            { key: 'events', label: t('nav.events').toUpperCase() },
            { key: 'contact', label: t('nav.contact').toUpperCase() },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => navigateTo(key)}
              className="block w-full text-left py-2 hover:text-pink-600 transition-colors font-medium"
              style={{ fontFamily: 'Courier New, monospace' }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );

  // ── FOOTER ────────────────────────────────────────────────────────────
  const Footer = () => (
    <footer className="bg-black text-white py-24 px-6 border-t border-white" style={{ borderTopWidth: '2px' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 pb-16 border-b border-gray-700">
          <div>
            <p className="text-2xl font-black mb-2" style={{ color: '#FF1461', fontFamily: 'Courier New, monospace' }}>artUP</p>
            <p className="text-sm text-gray-400 mb-6" style={{ fontFamily: 'Courier New, monospace' }}>Contemporary Art Exhibition</p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/artupspeyer/" target="_blank" rel="noopener noreferrer"
                className="p-3 border border-white hover:bg-pink-600 hover:border-pink-600 transition-all transform hover:scale-110" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="mailto:hello@artup.space"
                className="p-3 border border-white hover:bg-pink-600 hover:border-pink-600 transition-all transform hover:scale-110" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-widest mb-4" style={{ fontFamily: 'Courier New, monospace' }}>Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {[
                { key: 'home', label: 'Home' },
                { key: 'artists', label: t('nav.artists') },
                { key: 'about', label: t('nav.about') },
                { key: 'events', label: t('nav.events') },
                { key: 'contact', label: t('nav.contact') },
                { key: 'impressum', label: 'Impressum' },
                { key: 'privacy', label: t('nav.privacy') },
                { key: 'terms', label: t('nav.terms') },
              ].map(({ key, label }) => (
                <li key={key}>
                  <button onClick={() => navigateTo(key)} className="hover:text-white transition-colors font-medium" style={{ fontFamily: 'Courier New, monospace' }}>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-widest mb-4" style={{ fontFamily: 'Courier New, monospace' }}>Contact</h3>
            <p className="text-sm text-gray-400 mb-2" style={{ fontFamily: 'Courier New, monospace' }}>Maximilianstraße 99</p>
            <p className="text-sm text-gray-400 mb-2" style={{ fontFamily: 'Courier New, monospace' }}>Speyer, Germany</p>
            <a href="mailto:hello@artup.space" className="text-sm text-gray-400 hover:text-white transition-colors" style={{ fontFamily: 'Courier New, monospace' }}>hello@artup.space</a>
          </div>
        </div>

        {/* Sponsors */}
        <div className="mb-16">
          <h3 className="text-sm font-black uppercase tracking-widest mb-8" style={{ fontFamily: 'Courier New, monospace' }}>Supported by</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {sponsors.map((sponsor) => (
              <a key={sponsor.id} href={sponsor.website} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center hover:opacity-80 transition-opacity" title={sponsor.name}>
                <div className="h-16 border-2 border-white rounded-lg flex items-center justify-center px-4 w-full hover:border-pink-600 transition-colors"
                  style={{ backgroundImage: `url(${sponsor.logo})`, backgroundSize: '100%', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundColor: '#111111' }}>
                  {!sponsor.logo.includes('http') && <span className="text-xs text-gray-500 text-center font-medium">{sponsor.name}</span>}
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="pt-8 border-t border-gray-700 text-gray-400 text-sm flex flex-col md:flex-row justify-between items-center gap-4" style={{ fontFamily: 'Courier New, monospace' }}>
          <p>© 2026 artUP. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <button onClick={() => navigateTo('privacy')} className="hover:text-white transition-colors">{t('nav.privacy')}</button>
            <button onClick={() => navigateTo('terms')} className="hover:text-white transition-colors">{t('nav.terms')}</button>
          </div>
        </div>
      </div>
    </footer>
  );

  // ── COOKIE BANNER ─────────────────────────────────────────────────────
  const CookieBanner = () => {
    if (cookieAccepted) return null;
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-6 border-t-4 border-pink-600 z-40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm font-medium" style={{ fontFamily: 'Courier New, monospace' }}>
            Wir nutzen Cookies für Analytics und bessere Nutzererfahrung. Durch Nutzung der Website stimmst du zu. |
            We use cookies for analytics and user experience. By using the website, you agree.
          </p>
          <button onClick={handleCookieAccept}
            className="px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white font-black border-2 border-pink-600 transition whitespace-nowrap"
            style={{ fontFamily: 'Courier New, monospace' }}>
            Akzeptieren / Accept
          </button>
        </div>
      </div>
    );
  };

  // ══════════════════════════════════════════════════════════════════════
  // HOME PAGE
  // ══════════════════════════════════════════════════════════════════════
  if (currentPage === 'home') {
    return (
      <>
        <div className="min-h-screen bg-white overflow-hidden">
          <Navigation />

          {/* Hero Slideshow */}
          <div className="pt-40 pb-32 min-h-screen flex flex-col justify-center relative overflow-hidden border-b-4 border-black">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-pink-50 to-yellow-50" />
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0,0,0,.05) 25%, rgba(0,0,0,.05) 26%, transparent 27%, transparent 74%, rgba(0,0,0,.05) 75%, rgba(0,0,0,.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0,0,0,.05) 25%, rgba(0,0,0,.05) 26%, transparent 27%, transparent 74%, rgba(0,0,0,.05) 75%, rgba(0,0,0,.05) 76%, transparent 77%, transparent)',
              backgroundSize: '50px 50px'
            }} />

            <div className="relative flex-1 flex items-center justify-center cursor-pointer" onClick={() => navigateTo('artist-detail', featuredArtists[currentSlide])}>
              {featuredArtists.map((artist, idx) => (
                <div key={artist.id} className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${idx === currentSlide ? 'opacity-100 scale-100 hover:opacity-95' : 'opacity-0 scale-95'}`}>
                  <div className="absolute inset-0" style={{ backgroundImage: `url(${artist.slideImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
                    <h2 className="text-6xl md:text-8xl font-black mb-4 tracking-tighter text-white" style={{ fontFamily: 'Courier New, monospace', textShadow: '3px 3px 10px rgba(0,0,0,0.8)' }}>{artist.name}</h2>
                    <p className="text-xl md:text-2xl mb-8 font-bold italic text-white" style={{ fontFamily: 'Courier New, monospace', textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>{getArtistText(artist, 'style')}</p>
                    <p className="text-lg leading-relaxed max-w-xl mx-auto text-white font-medium" style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.8)' }}>{getArtistText(artist, 'description')}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative z-20 flex justify-between items-center mt-8 px-6">
              <button onClick={prevSlide} className="p-4 border-3 border-black hover:bg-black hover:text-white transition-all" aria-label="Previous artist">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex gap-3">
                {featuredArtists.map((_, idx) => (
                  <button key={idx} onClick={() => setCurrentSlide(idx)} className={`h-3 transition-all border-2 border-black ${idx === currentSlide ? 'w-8 bg-black' : 'w-3 bg-white'}`} />
                ))}
              </div>
              <button onClick={nextSlide} className="p-4 border-3 border-black hover:bg-black hover:text-white transition-all" aria-label="Next artist">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>

          <CountdownSection />
          <AboutTeaser />
          <EventsTeaser />

          {/* Artists Grid */}
          <section className="py-24 px-6 bg-white border-b-4 border-black">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter" style={{ fontFamily: 'Courier New, monospace' }}>{t('artists_page.title')}</h2>
              <p className="text-lg mb-16 max-w-xl font-medium">{t('artists_page.description')}</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allArtists.map((artist) => (
                  <button key={artist.id} onClick={() => navigateTo('artist-detail', artist)} className="group text-left transition-all duration-300 border-3 border-black p-4 hover:shadow-xl">
                    <div className="mb-4 h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative border-3 border-black overflow-hidden">
                      <div className="absolute inset-0" style={{ backgroundImage: `url(${artist.slideImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-90 transition-opacity duration-300" style={{ backgroundColor: artist.color }} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-white text-center opacity-0 group-hover:opacity-100 transition-all duration-300 font-black" style={{ fontFamily: 'Courier New, monospace' }}>VIEW</p>
                      </div>
                    </div>
                    <h3 className="text-lg font-black mb-1 group-hover:opacity-70 transition-opacity" style={{ fontFamily: 'Courier New, monospace' }}>{artist.name}</h3>
                    <p className="text-sm font-medium italic" style={{ color: artist.color, fontFamily: 'Courier New, monospace' }}>{getArtistText(artist, 'style')}</p>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Schramms Kaffee Kollaboration */}
          <section className="border-b-4 border-black" style={{ backgroundColor: '#000' }}>
            <div className="max-w-7xl mx-auto">

              {/* Header — kompakt, über den Etiketten */}
              <div className="px-6 pt-16 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ fontFamily: 'Courier New, monospace', color: '#FF1461', letterSpacing: '0.25em' }}>
                    {language === 'de' ? 'Kollaboration' : 'Collaboration'}
                  </p>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white leading-none" style={{ fontFamily: 'Courier New, monospace' }}>
                    artUP × Schramms
                  </h2>
                </div>
                <p className="text-gray-400 max-w-xs text-sm font-medium leading-relaxed">
                  {language === 'de'
                    ? 'Vier Etiketten, vier Künstler – als Special Edition erhältlich in der Kaffeerösterei Schramms und bei uns in der Ausstellung.'
                    : 'Four labels, four artists – available as a special edition at Schramms Kaffeerösterei and at our exhibition.'
                  }
                </p>
              </div>

              {/* 4 Labels — volle Breite, gleichmäßig verteilt */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mx-auto" style={{ maxWidth: '780px' }}>
                {[
                  'https://res.cloudinary.com/dsktnxayr/image/upload/v1776022169/schramms_gizmoh.png',
                  'https://res.cloudinary.com/dsktnxayr/image/upload/v1776022169/schramms_tim.png',
                  'https://res.cloudinary.com/dsktnxayr/image/upload/v1776022168/schramms_buja.png',
                  'https://res.cloudinary.com/dsktnxayr/image/upload/v1776022168/schramms_nina.png',
                ].map((url, idx) => (
                  <div
                    key={idx}
                    className="relative overflow-hidden group transition-all"
                    style={{
                      aspectRatio: '182 / 460',
                    }}
                  >
                    <img
                      src={url}
                      alt={`Schramms Label ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Subtle hover overlay */}
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity" />
                  </div>
                ))}
              </div>

              {/* Footer link */}
              <div className="px-6 py-6 flex justify-end">
                <a
                  href="https://www.schramms-kaffee.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-black uppercase tracking-widest text-gray-600 hover:text-white transition-colors"
                  style={{ fontFamily: 'Courier New, monospace', letterSpacing: '0.2em' }}
                >
                  schramms-kaffee.de →
                </a>
              </div>

            </div>
          </section>

          <Footer />
        </div>
        <CookieBanner />
      </>
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // EVENTS LISTING PAGE
  // ══════════════════════════════════════════════════════════════════════
  if (currentPage === 'events') {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const upcoming = allEvents.filter(e => new Date(e.date) >= today).sort((a, b) => new Date(a.date) - new Date(b.date));
    const past = allEvents.filter(e => new Date(e.date) < today).sort((a, b) => new Date(b.date) - new Date(a.date));

    const EventCard = ({ event, isPast }) => {
      const d = new Date(event.date);
      const day = d.getDate();
      const month = getEventMonthName(event.date);
      const dayName = getEventDayName(event.date);

      return (
        <div
          onClick={() => navigateTo('event-detail', event)}
          className={`border-4 border-black group transition-all cursor-pointer ${isPast ? 'opacity-50 hover:opacity-70' : 'hover:shadow-xl'}`}
          style={{ backgroundColor: isPast ? '#f5f5f5' : '#fff' }}
        >
          {/* Color bar top */}
          <div className="h-2" style={{ backgroundColor: isPast ? '#ccc' : '#FF1461' }} />

          <div className="p-6 flex gap-6 items-center">
            {/* Date block */}
            <div className="flex-shrink-0 w-20 text-center border-r-2 border-black pr-6">
              <p className="text-4xl font-black leading-none tracking-tighter" style={{ fontFamily: 'Courier New, monospace' }}>
                {String(day).padStart(2, '0')}
              </p>
              <p className="text-xs font-black uppercase tracking-wide mt-1" style={{ fontFamily: 'Courier New, monospace' }}>
                {month.slice(0, 3)}
              </p>
            </div>

            {/* Info */}
            <div className="flex-1">
              <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ fontFamily: 'Courier New, monospace', color: '#FF1461', opacity: isPast ? 0.5 : 1 }}>
                {dayName}
              </p>
              <h3 className="text-xl font-black tracking-tight mb-1" style={{ fontFamily: 'Courier New, monospace' }}>
                {getEventTitle(event)}
              </h3>
              <p className="text-sm font-medium text-gray-600" style={{ fontFamily: 'Courier New, monospace' }}>
                {event.time}{language === 'de' ? ' Uhr' : ''}
              </p>
            </div>

            {/* Arrow */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-2xl font-black" style={{ fontFamily: 'Courier New, monospace', color: isPast ? '#999' : '#FF1461' }}>→</span>
            </div>
          </div>
        </div>
      );
    };

    return (
      <>
        <div className="min-h-screen bg-white">
          <Navigation />

          {/* Hero */}
          <div className="pt-40 pb-16 px-6 border-b-4 border-black" style={{ backgroundColor: '#000' }}>
            <div className="max-w-7xl mx-auto">
              <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ fontFamily: 'Courier New, monospace', color: '#FF1461' }}>
                artUP · Speyer · 2026
              </p>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white" style={{ fontFamily: 'Courier New, monospace' }}>
                {t('events.all_events')}
              </h1>
              <p className="text-white mt-4 font-medium opacity-60">
                24. April – 17. Mai 2026 · Maximilianstraße 99, Speyer
              </p>
            </div>
          </div>

          <section className="py-20 px-6">
            <div className="max-w-4xl mx-auto">

              {/* Upcoming */}
              {upcoming.length > 0 && (
                <div className="mb-16">
                  <h2 className="text-2xl font-black mb-8 uppercase tracking-widest" style={{ fontFamily: 'Courier New, monospace' }}>
                    {t('events.title')}
                  </h2>
                  <div className="space-y-4">
                    {upcoming.map(e => <EventCard key={e.id} event={e} isPast={false} />)}
                  </div>
                </div>
              )}

              {/* Past */}
              {past.length > 0 && (
                <div>
                  <h2 className="text-2xl font-black mb-8 uppercase tracking-widest text-gray-400" style={{ fontFamily: 'Courier New, monospace' }}>
                    {language === 'de' ? 'Vergangene Events' : 'Past Events'}
                  </h2>
                  <div className="space-y-4">
                    {past.map(e => <EventCard key={e.id} event={e} isPast={true} />)}
                  </div>
                </div>
              )}
            </div>
          </section>

          <Footer />
        </div>
        <CookieBanner />
      </>
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // EVENT DETAIL PAGE — Poster Aesthetics
  // ══════════════════════════════════════════════════════════════════════
  if (currentPage === 'event-detail' && selectedEventDetail) {
    const event = selectedEventDetail;
    const d = new Date(event.date);
    const day = d.getDate();
    const month = getEventMonthName(event.date);
    const year = d.getFullYear();
    const dayName = getEventDayName(event.date);
    const eventTitle = getEventTitle(event);

    // Alternate colors per event id
    const heroBg = event.id % 2 === 0 ? '#000000' : '#FF1461';
    const accentCol = event.id % 2 === 0 ? '#FF1461' : '#FFC500';

    return (
      <>
        <div className="min-h-screen bg-white">
          <Navigation />

          {/* POSTER HERO */}
          <div className="relative overflow-hidden border-b-4 border-black" style={{ backgroundColor: heroBg, minHeight: '70vh' }}>
            {/* Background image if available */}
            {event.image && (
              <>
                <div className="absolute inset-0" style={{ backgroundImage: `url(${event.image})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: 0.35 }} />
              </>
            )}

            {/* Giant day number — decorative */}
            <div className="absolute right-0 top-0 bottom-0 flex items-center overflow-hidden pointer-events-none select-none" aria-hidden="true">
              <span
                className="font-black leading-none"
                style={{
                  fontFamily: 'Courier New, monospace',
                  fontSize: 'clamp(200px, 40vw, 400px)',
                  color: '#fff',
                  opacity: 0.04,
                  lineHeight: 1,
                  marginRight: '-0.1em'
                }}
              >
                {String(day).padStart(2, '0')}
              </span>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-48 pb-20 flex flex-col justify-end" style={{ minHeight: '70vh' }}>
              {/* Back link */}
              <button
                onClick={() => navigateTo('events')}
                className="absolute top-28 left-6 text-xs font-black uppercase tracking-widest hover:opacity-60 transition-opacity flex items-center gap-2"
                style={{ fontFamily: 'Courier New, monospace', color: accentCol }}
              >
                ← {t('events.back_to_events')}
              </button>

              {/* Label */}
              <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ fontFamily: 'Courier New, monospace', color: accentCol }}>
                artUP · Speyer
              </p>

              {/* Event title */}
              <h1
                className="font-black tracking-tighter text-white leading-none mb-8"
                style={{
                  fontFamily: 'Courier New, monospace',
                  fontSize: 'clamp(40px, 8vw, 90px)',
                  maxWidth: '80%'
                }}
              >
                {eventTitle}
              </h1>

              {/* Date + Time row */}
              <div className="flex flex-wrap gap-6 items-center">
                <div className="border-2 px-6 py-3" style={{ borderColor: accentCol }}>
                  <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ fontFamily: 'Courier New, monospace', color: accentCol }}>
                    {language === 'de' ? 'Datum' : 'Date'}
                  </p>
                  <p className="text-2xl md:text-3xl font-black text-white tracking-tight" style={{ fontFamily: 'Courier New, monospace' }}>
                    {dayName}, {String(day).padStart(2, '0')}. {month} {year}
                  </p>
                </div>
                <div className="border-2 px-6 py-3" style={{ borderColor: accentCol }}>
                  <p className="text-xs font-black uppercase tracking-widest mb-1" style={{ fontFamily: 'Courier New, monospace', color: accentCol }}>
                    {language === 'de' ? 'Uhrzeit' : 'Time'}
                  </p>
                  <p className="text-2xl md:text-3xl font-black text-white tracking-tight" style={{ fontFamily: 'Courier New, monospace' }}>
                    {event.time}{language === 'de' ? ' Uhr' : ''}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="py-20 px-6">
            <div className="max-w-4xl mx-auto">

              {/* Description if any */}
              {event.description_de && (
                <div className="mb-16 border-l-4 pl-8" style={{ borderColor: '#FF1461' }}>
                  <p className="text-lg leading-relaxed font-medium">
                    {language === 'de' ? event.description_de : (event.description_en || event.description_de)}
                  </p>
                </div>
              )}

              {/* Social Links */}
              {(event.instagram || event.website) && (
                <div className="mb-16">
                  <h2 className="text-2xl font-black mb-6 tracking-tighter" style={{ fontFamily: 'Courier New, monospace' }}>Links</h2>
                  <div className="flex gap-4 flex-wrap">
                    {event.website && (
                      <a href={event.website} target="_blank" rel="noopener noreferrer"
                        className="px-6 py-3 bg-black text-white font-black border-2 border-black hover:bg-white hover:text-black transition"
                        style={{ fontFamily: 'Courier New, monospace' }}>
                        WEB →
                      </a>
                    )}
                    {event.instagram && (
                      <a href={event.instagram} target="_blank" rel="noopener noreferrer"
                        className="px-6 py-3 font-black border-2 border-black hover:bg-black hover:text-white transition"
                        style={{ fontFamily: 'Courier New, monospace', backgroundColor: '#FF1461', color: '#fff', borderColor: '#FF1461' }}>
                        INSTAGRAM →
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Back + navigation */}
              <div className="border-t-4 border-black pt-12 flex flex-col md:flex-row gap-4 justify-between">
                <button
                  onClick={() => navigateTo('events')}
                  className="px-8 py-4 font-black border-4 border-black hover:bg-black hover:text-white transition uppercase tracking-widest"
                  style={{ fontFamily: 'Courier New, monospace' }}
                >
                  {t('events.back_to_events')}
                </button>
              </div>
            </div>
          </div>

          <Footer />
        </div>
        <CookieBanner />
      </>
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // ABOUT PAGE
  // ══════════════════════════════════════════════════════════════════════
  // ABOUT PAGE
  // ══════════════════════════════════════════════════════════════════════
  if (currentPage === 'about') {
    const crewImage = 'https://res.cloudinary.com/dsktnxayr/image/upload/v1771445769/team_3_2_90_2_multwk.jpg';

    const textDE = {
      hero_label: 'Speyer · 2026',
      hero_title: 'Über\nartUP',
      pull_quote: '„Wir wollten einen Raum schaffen, in dem Kunst einfach passiert."',
      story_title: 'Wie artUP entstand',
      story_p1: 'artUP begann mit einer einfachen Idee: Kunst raus aus dem weißen Raum, rein ins Leben. Wir wollten keinen klassischen Ausstellungsbetrieb, sondern etwas, das lebt – mit Konzerten, Talks, Live-Aktionen und echten Begegnungen zwischen Künstlern und Publikum.',
      story_p2: 'Was als loser Plan unter Freunden startete, ist heute eine Ausstellung mit 18 Künstlerinnen und Künstlern aus der Region – und einem Programm, das sich über fast vier Wochen erstreckt. Wir sind kein Verein, keine Institution. Wir sind ein Team, das Bock auf Kunst hat.',
      crew_label: 'Das Team',
      facts_title: 'Die Fakten',
      contact_title: 'Schreib uns',
      contact_desc: 'Fragen, Ideen, Presseanfragen – wir freuen uns.',
    };

    const textEN = {
      hero_label: 'Speyer · 2026',
      hero_title: 'About\nartUP',
      pull_quote: '"We wanted to create a space where art simply happens."',
      story_title: 'How artUP came to be',
      story_p1: 'artUP started with a simple idea: take art out of the white cube and bring it into real life. We didn\'t want a conventional exhibition format – we wanted something alive, with concerts, talks, live actions and genuine encounters between artists and audiences.',
      story_p2: 'What began as a loose plan among friends is now an exhibition featuring 18 artists from the region – with a programme spanning almost four weeks. We\'re not an association or an institution. We\'re a team that loves art.',
      crew_label: 'The Team',
      facts_title: 'The Facts',
      contact_title: 'Get in touch',
      contact_desc: 'Questions, ideas, press enquiries – we\'d love to hear from you.',
    };

    const tx = language === 'de' ? textDE : textEN;

    return (
      <>
        <div className="min-h-screen bg-white">
          <Navigation />

          {/* ── HERO + CREW FOTO — Text über dem Bild ── */}
          <div className="relative border-b-4 border-black overflow-hidden" style={{ minHeight: '70vh' }}>
            {/* Foto als img — object-position funktioniert zuverlässiger */}
            <img
              src={crewImage}
              alt="artUP Crew"
              className="absolute inset-0 w-full h-full"
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
            {/* Gradient: oben schwarz (für Lesbarkeit), unten transparent */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.0) 100%)'
              }}
            />

            {/* Text oben links */}
            <div className="relative z-10 max-w-7xl mx-auto px-6" style={{ paddingTop: '160px', paddingBottom: '80px' }}>
              <p className="text-xs font-black uppercase tracking-widest mb-6" style={{ fontFamily: 'Courier New, monospace', color: '#FF1461', letterSpacing: '0.25em' }}>
                {tx.hero_label}
              </p>
              <h1
                className="font-black tracking-tighter text-white"
                style={{
                  fontFamily: 'Courier New, monospace',
                  fontSize: 'clamp(60px, 12vw, 120px)',
                  lineHeight: 0.9,
                  whiteSpace: 'pre-line'
                }}
              >
                {tx.hero_title}
              </h1>
            </div>
          </div>

          {/* ── STORY — Pull Quote + Text ── */}
          <section className="py-24 px-6 border-b-4 border-black bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-16 items-start">
                {/* Pull Quote links */}
                <div>
                  <p
                    className="font-black leading-tight tracking-tight"
                    style={{
                      fontFamily: 'Courier New, monospace',
                      fontSize: 'clamp(22px, 3.5vw, 36px)',
                      color: '#FF1461',
                      lineHeight: 1.2
                    }}
                  >
                    {tx.pull_quote}
                  </p>
                </div>

                {/* Text rechts */}
                <div>
                  <h2 className="text-2xl font-black mb-6 tracking-tight" style={{ fontFamily: 'Courier New, monospace' }}>
                    {tx.story_title}
                  </h2>
                  <p className="text-base leading-relaxed mb-5 font-medium text-gray-800">
                    {tx.story_p1}
                  </p>
                  <p className="text-base leading-relaxed font-medium text-gray-800">
                    {tx.story_p2}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── FACTS TICKER — schwarze Leiste ── */}
          <div className="border-b-4 border-black py-5 px-6 overflow-hidden" style={{ backgroundColor: '#000' }}>
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-wrap gap-x-8 gap-y-2 items-center">
                {[
                  language === 'de' ? '24. APR – 17. MAI 2026' : '24 APR – 17 MAY 2026',
                  'MAXIMILIANSTRASSE 99 · SPEYER',
                  language === 'de' ? 'AB 15:00 UHR' : 'FROM 3:00 PM',
                  language === 'de' ? 'MI – SO' : 'WED – SUN',
                  language === 'de' ? 'EINTRITT FREI' : 'FREE ENTRY',
                  '18 ' + (language === 'de' ? 'KÜNSTLER·INNEN' : 'ARTISTS'),
                ].map((fact, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <span style={{ color: '#FF1461', fontFamily: 'Courier New, monospace', fontSize: '10px' }}>◆</span>}
                    <span className="text-xs font-black uppercase tracking-widest text-white" style={{ fontFamily: 'Courier New, monospace', letterSpacing: '0.15em' }}>
                      {fact}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* ── KONTAKT ── */}
          <section className="py-24 px-6 border-b-4 border-black" style={{ backgroundColor: '#FFC500' }}>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-10">
              <div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-3" style={{ fontFamily: 'Courier New, monospace' }}>
                  {tx.contact_title}
                </h2>
                <p className="text-base font-medium">{tx.contact_desc}</p>
              </div>
              <a
                href="mailto:hello@artup.space"
                className="flex-shrink-0 inline-block px-10 py-5 font-black text-white border-4 border-black hover:scale-105 transition-transform uppercase tracking-widest text-lg"
                style={{ fontFamily: 'Courier New, monospace', backgroundColor: '#FF1461' }}
              >
                hello@artup.space →
              </a>
            </div>
          </section>

          <Footer />
        </div>
      </>
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // CONTACT PAGE — simplified mailto
  // ══════════════════════════════════════════════════════════════════════
  if (currentPage === 'contact') {
    return (
      <>
        <div className="min-h-screen bg-white">
          <Navigation />
          <section className="pt-40 pb-24 px-6">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-6xl md:text-7xl font-black mb-4 tracking-tighter" style={{ fontFamily: 'Courier New, monospace', color: '#FF1461' }}>
                {t('contact.title')}
              </h1>
              <p className="text-lg mb-16 font-medium">{t('contact.description')}</p>

              {/* Big mailto CTA */}
              <div className="border-4 border-black p-12 mb-12 text-center" style={{ backgroundColor: '#FFC500' }}>
                <p className="text-sm font-black uppercase tracking-widest mb-4" style={{ fontFamily: 'Courier New, monospace' }}>
                  {language === 'de' ? 'Schreib uns direkt:' : 'Write to us directly:'}
                </p>
                <a
                  href="mailto:hello@artup.space"
                  className="block text-2xl md:text-4xl font-black tracking-tight hover:opacity-70 transition-opacity mb-8"
                  style={{ fontFamily: 'Courier New, monospace' }}
                >
                  hello@artup.space
                </a>
                <a
                  href="mailto:hello@artup.space"
                  className="inline-block px-10 py-5 font-black text-white border-4 border-black transform hover:scale-105 transition-all uppercase tracking-widest text-lg"
                  style={{ fontFamily: 'Courier New, monospace', backgroundColor: '#FF1461' }}
                >
                  {t('contact.cta')} →
                </a>
              </div>

              {/* Address */}
              <div className="border-4 border-black p-8">
                <h2 className="text-xl font-black mb-4 tracking-tight" style={{ fontFamily: 'Courier New, monospace' }}>
                  {language === 'de' ? 'Vor Ort' : 'In Person'}
                </h2>
                <p className="font-medium leading-relaxed">
                  artUP Exhibition<br />
                  Maximilianstraße 99<br />
                  67346 Speyer, Deutschland<br /><br />
                  Mi – So · ab 15:00 Uhr
                </p>
              </div>

              {/* Instagram */}
              <div className="mt-8 flex gap-4">
                <a href="https://www.instagram.com/artupspeyer/" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 border-4 border-black font-black hover:bg-black hover:text-white transition"
                  style={{ fontFamily: 'Courier New, monospace' }}>
                  <Instagram className="w-5 h-5" /> @artupspeyer
                </a>
              </div>
            </div>
          </section>
          <Footer />
        </div>
        <CookieBanner />
      </>
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // ARTISTS PAGE
  // ══════════════════════════════════════════════════════════════════════
  if (currentPage === 'artists') {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <section className="pt-32 pb-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-black mb-4 tracking-tighter" style={{ fontFamily: 'Courier New, monospace', color: '#FF1461' }}>{t('artists_page.title')}</h1>
            <p className="text-lg mb-16 max-w-2xl font-medium">{t('artists_page.description')}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allArtists.map((artist) => (
                <button key={artist.id} onClick={() => navigateTo('artist-detail', artist)} className="group text-left transition-all duration-300 border-3 border-black p-4 hover:shadow-xl">
                  <div className="mb-4 h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative border-3 border-black overflow-hidden">
                    <div className="absolute inset-0" style={{ backgroundImage: `url(${artist.slideImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-90 transition-opacity duration-300" style={{ backgroundColor: artist.color }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-white text-center opacity-0 group-hover:opacity-100 transition-all duration-300 font-black" style={{ fontFamily: 'Courier New, monospace' }}>VIEW</p>
                    </div>
                  </div>
                  <h3 className="text-lg font-black mb-1 group-hover:opacity-70 transition-opacity" style={{ fontFamily: 'Courier New, monospace' }}>{artist.name}</h3>
                  <p className="text-sm font-medium italic" style={{ color: artist.color, fontFamily: 'Courier New, monospace' }}>{getArtistText(artist, 'style')}</p>
                </button>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // ARTIST DETAIL PAGE
  // ══════════════════════════════════════════════════════════════════════
  if (currentPage === 'artist-detail' && selectedArtistDetail) {
    const artist = selectedArtistDetail;
    const relatedArtists = allArtists.filter(a => a.id !== artist.id).sort(() => Math.random() - 0.5).slice(0, 3);
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="pt-32 pb-16 px-6 md:pt-48 border-b-4 border-black relative overflow-visible" style={{ minHeight: '400px' }}>
          <div className="absolute inset-0 z-0" style={{ backgroundImage: `url(${artist.slideImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div className="absolute inset-0 bg-black opacity-40 z-5" />
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="p-8" style={{ backgroundColor: artist.color }}>
              <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-4 text-white" style={{ fontFamily: 'Courier New, monospace' }}>{artist.name}</h1>
              <p className="text-2xl font-black text-white italic" style={{ fontFamily: 'Courier New, monospace' }}>{getArtistText(artist, 'style')}</p>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 bg-white border-b-4 border-black">
          <div className="max-w-4xl mx-auto flex gap-3">
            {artist.website && <a href={artist.website} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-black text-white font-black border-2 border-black hover:bg-white hover:text-black transition" style={{ fontFamily: 'Courier New, monospace' }}>WEB</a>}
            {artist.instagram && <a href={artist.instagram} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-black text-white font-black border-2 border-black hover:bg-white hover:text-black transition" style={{ fontFamily: 'Courier New, monospace' }}>IG</a>}
            {artist.facebook && <a href={artist.facebook} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-black text-white font-black border-2 border-black hover:bg-white hover:text-black transition" style={{ fontFamily: 'Courier New, monospace' }}>FB</a>}
          </div>
        </div>
        <div className="px-6 pb-24 pt-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <p className="text-lg leading-relaxed font-medium">{getArtistText(artist, 'fullBio')}</p>
            </div>
            <div className="mb-24">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 items-stretch">
                <div className="md:col-span-1 border-4 border-black overflow-hidden bg-gray-100" style={{ aspectRatio: '4 / 5' }}>
                  <div className="w-full h-full" style={{ backgroundColor: artist.color, backgroundImage: `url(${artist.portraitImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                </div>
                <div className="md:col-span-2 border-4 border-black overflow-hidden bg-black h-80 md:h-auto" style={{ height: 'auto', minHeight: '400px', position: 'relative' }}>
                  {artist.videoUrl ? (
                    <>
                      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                        <iframe style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }} src={artist.videoUrl} title="Artist Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none md:hidden">
                        <a href={artist.videoUrl.includes('youtube') ? artist.videoUrl.replace('/embed/', '/watch?v=') : artist.videoUrl} target="_blank" rel="noopener noreferrer"
                          className="pointer-events-auto px-6 py-3 bg-pink-600 text-white font-black border-2 border-white hover:bg-pink-700 transition rounded"
                          style={{ fontFamily: 'Courier New, monospace' }}>▶ Open Video</a>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                      <p className="text-center text-gray-600 font-black" style={{ fontFamily: 'Courier New, monospace' }}>Kein Video verfügbar</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {artist.artworks && artist.artworks.map((artwork, idx) => (
                  <div key={idx} className="border-4 border-black overflow-hidden bg-gray-100 h-64 flex items-center justify-center group cursor-pointer hover:shadow-xl transition-all">
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative group"
                      style={{ backgroundImage: `url(${artwork})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-all" />
                      <p className="text-sm font-black text-gray-600 group-hover:text-white transition-colors opacity-0" style={{ fontFamily: 'Courier New, monospace' }}>ARTWORK {idx + 1}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-16 border-t-4 border-black">
              <h2 className="text-4xl font-black mb-12 tracking-tighter" style={{ fontFamily: 'Courier New, monospace' }}>Related Artists</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArtists.map((a) => (
                  <button key={a.id} onClick={() => navigateTo('artist-detail', a)} className="group text-left transition-all duration-300 border-3 border-black p-4 hover:shadow-xl">
                    <div className="mb-4 h-40 bg-gradient-to-br from-gray-100 to-gray-200 relative border-3 border-black overflow-hidden">
                      <div className="absolute inset-0" style={{ backgroundImage: `url(${a.slideImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-90 transition-opacity duration-300" style={{ backgroundColor: a.color }} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-white text-center opacity-0 group-hover:opacity-100 transition-all duration-300 font-black" style={{ fontFamily: 'Courier New, monospace' }}>VIEW</p>
                      </div>
                    </div>
                    <h3 className="font-black mb-1 group-hover:opacity-70 transition-opacity text-sm" style={{ fontFamily: 'Courier New, monospace' }}>{a.name}</h3>
                    <p className="text-xs font-medium italic" style={{ color: a.color, fontFamily: 'Courier New, monospace' }}>{getArtistText(a, 'style')}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════
  // LEGAL PAGES
  // ══════════════════════════════════════════════════════════════════════
  if (currentPage === 'impressum') {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <section className="pt-40 pb-24 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-black mb-12 tracking-tighter" style={{ fontFamily: 'Courier New, monospace', color: '#FF1461' }}>Impressum</h1>
            <div className="space-y-8 border-4 border-black p-8 bg-yellow-50">
              <div>
                <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>Verantwortlich für den Inhalt</h2>
                <p className="font-medium mb-2" style={{ fontFamily: 'Courier New, monospace' }}>Rene Burjack & Georg Rück</p>
                <p className="mb-2">Killianstraße 3<br />67373 Dudenhofen<br />Deutschland</p>
              </div>
              <div className="border-t-4 border-black pt-8">
                <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>Kontakt</h2>
                <p className="mb-2"><strong>Email:</strong> hello@artup.space<br /><strong>Website:</strong> www.artup.space</p>
              </div>
              <div className="border-t-4 border-black pt-8">
                <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>Vertretungsberechtigte Person</h2>
                <p className="font-medium" style={{ fontFamily: 'Courier New, monospace' }}>Nina Bussjäger & Timothy Starratt</p>
              </div>
              <div className="border-t-4 border-black pt-8">
                <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>Haftungsausschluss</h2>
                <p className="mb-4 leading-relaxed">Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.</p>
              </div>
              <div className="border-t-4 border-black pt-8">
                <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>Urheberrecht</h2>
                <p className="leading-relaxed">Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht.</p>
              </div>
              <div className="border-t-4 border-black pt-8">
                <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>Bildquellen</h2>
                <p className="leading-relaxed">Die Kunstwerke und Porträts auf dieser Website sind Eigentum der jeweiligen Künstler. Alle Rechte bleiben bei den Künstlern.</p>
              </div>
            </div>
            <div className="mt-12 p-6 border-4 border-black bg-yellow-100">
              <p className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Courier New, monospace' }}><strong>Hinweis:</strong> Wie kleinkariert kann man sein, damit man den Scheiß hier auch noch liest. Glückwunsch Arschloch.</p>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (currentPage === 'privacy') {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <section className="pt-40 pb-24 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-black mb-12 tracking-tighter" style={{ fontFamily: 'Courier New, monospace', color: '#FF1461' }}>Privacy Policy</h1>
            <div className="space-y-8">
              {[
                ['1. Data Protection', 'Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal data when you use our website www.artup.space.'],
                ['2. Data Collection', 'We collect personal data only when you voluntarily provide it to us. This may include your name, email address, and message.'],
                ['3. Use of Data', 'We use the data you provide solely to respond to your inquiries. We do not share your data with third parties without your consent.'],
                ['4. Cookies', 'Our website uses cookies for analytics to understand how visitors use our site.'],
                ['5. Your Rights', 'You have the right to access, correct, or delete your personal data. Please contact us at hello@artup.space.'],
              ].map(([title, text], i) => (
                <div key={i} className={i > 0 ? 'border-t-4 border-black pt-8' : ''}>
                  <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>{title}</h2>
                  <p className="text-lg leading-relaxed mb-4">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (currentPage === 'terms') {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <section className="pt-40 pb-24 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-black mb-12 tracking-tighter" style={{ fontFamily: 'Courier New, monospace', color: '#FF1461' }}>Terms & Conditions</h1>
            <div className="space-y-8">
              {[
                ['1. Use of Website', 'By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.'],
                ['2. Disclaimer', 'The information provided on this website is for informational purposes only. The artUP exhibition reserves the right to make changes without notice.'],
                ['3. Intellectual Property', 'All content on this website, including artwork images and descriptions, are the intellectual property of the respective artists or the artUP organization.'],
                ['4. Limitation of Liability', 'artUP shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or relating to your use of this website.'],
                ['5. Contact', 'If you have questions about these terms, please contact us at hello@artup.space'],
              ].map(([title, text], i) => (
                <div key={i} className={i > 0 ? 'border-t-4 border-black pt-8' : ''}>
                  <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>{title}</h2>
                  <p className="text-lg leading-relaxed mb-4">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return <><CookieBanner /></>;
};

export default ArtUPWebsite;
