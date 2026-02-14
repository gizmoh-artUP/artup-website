/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Calendar, ArrowLeft, Instagram, Mail, Phone, MessageSquare, Menu, X } from 'lucide-react';
import textsJSON from './texts.json';

const ArtUPWebsite = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedArtistDetail, setSelectedArtistDetail] = useState(null);
  const [featuredArtists, setFeaturedArtists] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [language, setLanguage] = useState('de');

  // Helper function to get translations from JSON
  const t = (key) => {
    if (!textsJSON) return key;
    const keys = key.split('.');
    let value = textsJSON[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  // Alle 18 Künstler
  const allArtists = [
    {
      id: 1,
      name: 'BUJA',
      style: 'Street Art',
      shortBio: 'Urban aesthetics meet contemporary expression.',
      fullBio: 'BUJA transforms cityscapes into vibrant dialogues between artist and community. With over a decade in street art, their work challenges perceptions of public space and creative expression.',
      description: 'Urban aesthetics meet contemporary expression. BUJA transforms cityscapes into vibrant dialogue.',
      color: '#FF1461',
      slideImage: 'SLIDESHOW_IMAGE_URL',
      images: [
        'ARTWORK_1_URL',
        'ARTWORK_2_URL',
        'ARTWORK_3_URL'
      ],
      slideImage: 'BUJA_SLIDESHOW_IMAGE_URL'
    },
    {
      id: 2,
      name: 'Nina Bussjäger',
      style: 'Klassische Malerei',
      shortBio: 'Timeless elegance in every brushstroke.',
      fullBio: 'Nina Bussjäger brings classical painting techniques into the contemporary realm. Her works explore the intersection of tradition and modernity, creating pieces that speak to both heritage and innovation.',
      description: 'Timeless elegance in every brushstroke. Traditional mastery with a contemporary vision.',
      color: '#FFC500',
      slideImage: 'SLIDESHOW_IMAGE_URL'
    },
    {
      id: 3,
      name: 'Timothy Starratt',
      style: 'Abstrakt',
      shortBio: 'Pure form and color dancing in space.',
      fullBio: 'Timothy\'s abstract works strip down to the essence of visual language. Color, form, and composition become vehicles for emotional expression, creating immersive visual experiences.',
      description: 'Pure form and color dancing in space. Abstraction as a language beyond representation.',
      color: '#FF1461',
      slideImage: 'SLIDESHOW_IMAGE_URL'
    },
    {
      id: 4,
      name: 'Gizmoh',
      style: 'Illustrative Poetry',
      shortBio: 'Where illustration meets narrative.',
      fullBio: 'Gizmoh creates visual stories that blur the lines between illustration and fine art. Each piece is a poetic narrative rendered in exquisite detail and imagination.',
      description: 'Where illustration meets narrative. Visual stories that whisper and sing.',
      color: '#FFC500',
      slideImage: 'SLIDESHOW_IMAGE_URL'
    },
    {
      id: 5,
      name: 'Elena Rossi',
      style: 'Figurativ',
      shortBio: 'Human emotion through figurative expression.',
      fullBio: 'Elena captures the complexity of human emotion and connection through figurative painting. Her portraits and figure studies reveal the inner landscape of the human experience.',
      description: 'Human emotion through figurative expression.',
      color: '#FF1461',
      slideImage: 'SLIDESHOW_IMAGE_URL'
    },
    {
      id: 6,
      name: 'Marcus Chen',
      style: 'Digital Art',
      shortBio: 'Bridging analog and digital realms.',
      fullBio: 'Marcus Chen explores the intersection of traditional artistic principles and cutting-edge digital technology, creating works that challenge our perception of medium and authenticity.',
      description: 'Bridging analog and digital realms.',
      color: '#FFC500',
      slideImage: 'SLIDESHOW_IMAGE_URL'
    },
    {
      id: 7,
      name: 'Sofía García',
      style: 'Conceptual Art',
      shortBio: 'Ideas made tangible through concept.',
      fullBio: 'Sofía\'s conceptual practice examines social structures and cultural narratives. Her installations and interventions provoke thought and dialogue.',
      description: 'Ideas made tangible through concept.',
      color: '#FF1461',
      slideImage: 'SLIDESHOW_IMAGE_URL'
    },
    {
      id: 8,
      name: 'James Wilson',
      style: 'Mixed Media',
      shortBio: 'Layering materials, meanings, and textures.',
      fullBio: 'James combines traditional and unconventional materials to create richly textured works that invite tactile and visual exploration.',
      description: 'Layering materials, meanings, and textures.',
      color: '#FFC500',
      slideImage: 'SLIDESHOW_IMAGE_URL'
    },
    {
      id: 9,
      name: 'Yuki Tanaka',
      style: 'Minimalism',
      shortBio: 'Silence speaks louder than words.',
      fullBio: 'Yuki\'s minimalist approach distills visual language to its purest form, allowing viewers to find their own meaning in reduction and negative space.',
      description: 'Silence speaks louder than words.',
      color: '#FF1461',
      slideImage: 'SLIDESHOW_IMAGE_URL'
    },
    {
      id: 10,
      name: 'Amara Okonkwo',
      style: 'Contemporary Sculpture',
      shortBio: 'Form, space, and presence in three dimensions.',
      fullBio: 'Amara creates sculptures that dialogue with their environment and viewers, exploring themes of identity, belonging, and human connection.',
      description: 'Form, space, and presence in three dimensions.',
      color: '#FFC500',
      slideImage: 'SLIDESHOW_IMAGE_URL'
    },
    {
      id: 11,
      name: 'Laura Vega',
      style: 'Landscape Painting',
      shortBio: 'Nature reimagined through artistic vision.',
      fullBio: 'Laura captures landscapes as emotional territories. Her paintings transcend realistic depiction to reveal the inner essence of place and atmosphere.',
      description: 'Nature reimagined through artistic vision.',
      color: '#FF1461',
      slideImage: 'SLIDESHOW_IMAGE_URL'
    },
    {
      id: 12,
      name: 'Klaus Mueller',
      style: 'Photography',
      shortBio: 'Moments crystallized in light and shadow.',
      fullBio: 'Klaus\'s photographic work explores the poetic potential of everyday moments, transforming the mundane into the extraordinary through light and composition.',
      description: 'Moments crystallized in light and shadow.',
      color: '#FFC500',
      slideImage: 'SLIDESHOW_IMAGE_URL'
    },
    {
      id: 13,
      name: 'Zara Al-Rashid',
      style: 'Textile & Installation',
      shortBio: 'Woven stories and spatial interventions.',
      fullBio: 'Zara combines traditional textile techniques with contemporary installation practices, creating immersive environments that celebrate cultural narratives.',
      description: 'Woven stories and spatial interventions.',
      color: '#FF1461',
      slideImage: 'SLIDESHOW_IMAGE_URL'
    },
    {
      id: 14,
      name: 'Adrien Laurent',
      style: 'Experimental Painting',
      shortBio: 'Pushing the boundaries of paint and canvas.',
      fullBio: 'Adrien\'s experimental approach challenges conventional painting techniques, employing unconventional materials and methods to expand artistic possibilities.',
      description: 'Pushing the boundaries of paint and canvas.',
      color: '#FFC500',
      slideImage: 'SLIDESHOW_IMAGE_URL'
    },
    {
      id: 15,
      name: 'Priya Sharma',
      style: 'Video Art',
      shortBio: 'Time and motion as artistic medium.',
      fullBio: 'Priya works with video and moving image to explore narratives of identity, technology, and human experience in the digital age.',
      description: 'Time and motion as artistic medium.',
      color: '#FF1461',
      slideImage: 'SLIDESHOW_IMAGE_URL'
    },
    {
      id: 16,
      name: 'Omar Hassan',
      style: 'Calligraphy & Drawing',
      shortBio: 'Ancient forms meet contemporary expression.',
      fullBio: 'Omar fuses traditional calligraphic techniques with contemporary drawing practices, creating works that honor heritage while pushing artistic boundaries.',
      description: 'Ancient forms meet contemporary expression.',
      color: '#FFC500',
      slideImage: 'SLIDESHOW_IMAGE_URL'
    },
    {
      id: 17,
      name: 'Isabelle Moreau',
      style: 'Collage & Assemblage',
      shortBio: 'Found objects, new meanings.',
      fullBio: 'Isabelle transforms discarded materials into compelling artistic statements, revealing hidden beauty and meaning in the overlooked and forgotten.',
      description: 'Found objects, new meanings.',
      color: '#FF1461',
      slideImage: 'SLIDESHOW_IMAGE_URL'
    },
    {
      id: 18,
      name: 'David Park',
      style: 'Printmaking',
      shortBio: 'Precision, layers, and artistic vision.',
      fullBio: 'David\'s printmaking practice explores the meditative process of mark-making and layering, creating works of remarkable subtlety and depth.',
      description: 'Precision, layers, and artistic vision.',
      color: '#FFC500',
      slideImage: 'SLIDESHOW_IMAGE_URL'
    }
  ];

  // Sponsoren-Logos
  const sponsors = [
    { id: 1, name: 'Sponsor One', logo: 'SPONSOR_LOGO_1_URL' },
    { id: 2, name: 'Sponsor Two', logo: 'SPONSOR_LOGO_2_URL' },
    { id: 3, name: 'Sponsor Three', logo: 'SPONSOR_LOGO_3_URL' },
    { id: 4, name: 'Sponsor Four', logo: 'SPONSOR_LOGO_4_URL' }
  ];

  // Zufällige Featured Artists generieren
  const generateRandomFeatured = () => {
    const shuffled = [...allArtists].sort(() => Math.random() - 0.5).slice(0, 4);
    setFeaturedArtists(shuffled);
    setCurrentSlide(0);
  };

  useEffect(() => {
    generateRandomFeatured();
  }, [currentPage]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredArtists.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredArtists.length]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % featuredArtists.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + featuredArtists.length) % featuredArtists.length);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 3000);
    }
  };

  const navigateTo = (page, artist = null) => {
    if (artist) setSelectedArtistDetail(artist);
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // Countdown Component
  const CountdownSection = () => {
    const [timeLeft, setTimeLeft] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    });

    useEffect(() => {
      const calculateTimeLeft = () => {
        const eventDate = new Date('2026-04-23T00:00:00').getTime();
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance > 0) {
          setTimeLeft({
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((distance / 1000 / 60) % 60),
            seconds: Math.floor((distance / 1000) % 60)
          });
        }
      };

      calculateTimeLeft();
      const timer = setInterval(calculateTimeLeft, 1000);
      return () => clearInterval(timer);
    }, []);

    const CountdownBox = ({ value, label }) => (
      <div className="flex flex-col items-center">
        <div className="border-4 border-white p-2 md:p-4 min-w-16 md:min-w-20 mb-1">
          <p className="text-3xl md:text-5xl font-black text-white tracking-tight" style={{ fontFamily: 'Courier New, monospace' }}>
            {String(value).padStart(2, '0')}
          </p>
        </div>
        <p className="text-white text-xs md:text-sm font-black uppercase tracking-widest" style={{ fontFamily: 'Courier New, monospace' }}>
          {label}
        </p>
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

          {/* Animated Countdown */}
          <div className="flex justify-center gap-2 md:gap-4 mb-12">
            <CountdownBox value={timeLeft.days} label={t('countdown.days')} />
            <div className="flex items-center text-white text-xl md:text-3xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>:</div>
            <CountdownBox value={timeLeft.hours} label={t('countdown.hours')} />
            <div className="flex items-center text-white text-xl md:text-3xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>:</div>
            <CountdownBox value={timeLeft.minutes} label={t('countdown.minutes')} />
            <div className="flex items-center text-white text-xl md:text-3xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>:</div>
            <CountdownBox value={timeLeft.seconds} label={t('countdown.seconds')} />
          </div>

          {/* Start Date - Typographic */}
          <div className="text-center">
            <p className="text-white text-base md:text-lg font-light tracking-widest" style={{ fontFamily: 'Courier New, monospace' }}>
              {t('countdown.date')}
            </p>
          </div>
        </div>
      </section>
    );
  };

  // About Teaser Component
  const AboutTeaser = () => (
    <section className="py-20 px-6 border-b-4 border-black cursor-pointer hover:opacity-95 transition-opacity" onClick={() => navigateTo('about')} style={{ backgroundColor: '#FFC500' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter" style={{ fontFamily: 'Courier New, monospace' }}>{t('about_teaser.title')}</h2>
            <p className="text-lg leading-relaxed mb-8 font-medium">
              {t('about_teaser.description')}
            </p>
            <p className="text-base font-black uppercase tracking-widest" style={{ fontFamily: 'Courier New, monospace', color: '#FF1461' }}>
              {t('about_teaser.learn_more')}
            </p>
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

  // Events Component
  const EventsTeaser = () => {
    const allEvents = [
      { date: '2026-04-24', day: 'Freitag', title: 'Vernissage', time: '19:00 Uhr' },
      { date: '2026-04-25', day: 'Samstag', title: 'Konzert - ThreeCheese', time: '20:00 Uhr' },
      { date: '2026-04-26', day: 'Sonntag', title: 'Zauberei', time: '18:00 Uhr' },
    ];

    const getDateDisplay = (dateString) => {
      const [year, month, day] = dateString.split('-');
      const monthNames = {
        '01': 'Januar',
        '02': 'Februar',
        '03': 'März',
        '04': 'April',
        '05': 'Mai',
        '06': 'Juni',
        '07': 'Juli',
        '08': 'August',
        '09': 'September',
        '10': 'Oktober',
        '11': 'November',
        '12': 'Dezember'
      };
      return `${day} ${monthNames[month]}`;
    };

    const upcomingEvents = allEvents.slice(0, 3);

    return (
      <section className="py-20 px-6 border-b-4 border-black bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-12 tracking-tighter" style={{ fontFamily: 'Courier New, monospace' }}>
            {t('events.title')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-4 border-black p-6 hover:shadow-lg transition-all cursor-pointer" style={{ backgroundColor: '#FF1461' }}>
              <p className="text-sm font-black uppercase tracking-widest mb-2" style={{ fontFamily: 'Courier New, monospace', color: '#fff' }}>
                {t('events.day_friday')}
              </p>
              <p className="text-3xl font-black mb-4 tracking-tighter" style={{ fontFamily: 'Courier New, monospace', color: '#fff' }}>
                24 April
              </p>
              <h3 className="text-xl font-black mb-2" style={{ fontFamily: 'Courier New, monospace', color: '#fff' }}>
                {t('events.event_1')}
              </h3>
              <p className="text-sm font-medium" style={{ color: '#fff' }}>
                {t('events.event_1_time')}
              </p>
            </div>

            <div className="border-4 border-black p-6 hover:shadow-lg transition-all cursor-pointer" style={{ backgroundColor: '#FFC500' }}>
              <p className="text-sm font-black uppercase tracking-widest mb-2" style={{ fontFamily: 'Courier New, monospace', color: '#000' }}>
                {t('events.day_saturday')}
              </p>
              <p className="text-3xl font-black mb-4 tracking-tighter" style={{ fontFamily: 'Courier New, monospace', color: '#000' }}>
                25 April
              </p>
              <h3 className="text-xl font-black mb-2" style={{ fontFamily: 'Courier New, monospace', color: '#000' }}>
                {t('events.event_2')}
              </h3>
              <p className="text-sm font-medium" style={{ color: '#666' }}>
                {t('events.event_2_time')}
              </p>
            </div>

            <div className="border-4 border-black p-6 hover:shadow-lg transition-all cursor-pointer" style={{ backgroundColor: '#FF1461' }}>
              <p className="text-sm font-black uppercase tracking-widest mb-2" style={{ fontFamily: 'Courier New, monospace', color: '#fff' }}>
                {t('events.day_sunday')}
              </p>
              <p className="text-3xl font-black mb-4 tracking-tighter" style={{ fontFamily: 'Courier New, monospace', color: '#fff' }}>
                26 April
              </p>
              <h3 className="text-xl font-black mb-2" style={{ fontFamily: 'Courier New, monospace', color: '#fff' }}>
                {t('events.event_3')}
              </h3>
              <p className="text-sm font-medium" style={{ color: '#fff' }}>
                {t('events.event_3_time')}
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // Navigation Component
  const Navigation = () => (
    <nav className="fixed w-full z-50 border-b" style={{ 
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      borderBottomColor: 'rgba(0, 0, 0, 0.3)',
      borderBottomWidth: '2px'
    }}>
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        {/* Logo - Left */}
        <button 
          onClick={() => navigateTo('home')} 
          className="text-2xl font-black tracking-tight hover:opacity-70 transition-opacity"
          style={{ fontFamily: 'Courier New, monospace', color: '#FF1461' }}
        >
          artUP
        </button>

        {/* Desktop Menu - Center */}
        <div className="hidden md:flex gap-2 text-sm font-medium">
          <button 
            onClick={() => navigateTo('home')} 
            className={`px-4 py-2 transition-all uppercase tracking-wide ${currentPage === 'home' ? 'text-white' : 'text-black hover:opacity-60'}`}
            style={{ 
              fontFamily: 'Courier New, monospace',
              backgroundColor: currentPage === 'home' ? '#FF1461' : 'transparent'
            }}
          >
            {t('nav.home')}
          </button>
          <button 
            onClick={() => navigateTo('artists')} 
            className={`px-4 py-2 transition-all uppercase tracking-wide ${currentPage === 'artists' ? 'text-white' : 'text-black hover:opacity-60'}`}
            style={{ 
              fontFamily: 'Courier New, monospace',
              backgroundColor: currentPage === 'artists' ? '#FF1461' : 'transparent'
            }}
          >
            {t('nav.artists')}
          </button>
          <button 
            onClick={() => navigateTo('about')} 
            className={`px-4 py-2 transition-all uppercase tracking-wide ${currentPage === 'about' ? 'text-white' : 'text-black hover:opacity-60'}`}
            style={{ 
              fontFamily: 'Courier New, monospace',
              backgroundColor: currentPage === 'about' ? '#FF1461' : 'transparent'
            }}
          >
            {t('nav.about')}
          </button>
          <button 
            onClick={() => navigateTo('contact')} 
            className={`px-4 py-2 transition-all uppercase tracking-wide ${currentPage === 'contact' ? 'text-white' : 'text-black hover:opacity-60'}`}
            style={{ 
              fontFamily: 'Courier New, monospace',
              backgroundColor: currentPage === 'contact' ? '#FF1461' : 'transparent'
            }}
          >
            {t('nav.contact')}
          </button>
          <button 
            onClick={() => navigateTo('impressum')} 
            className={`px-4 py-2 transition-all uppercase tracking-wide text-xs ${currentPage === 'impressum' ? 'text-white' : 'text-black hover:opacity-60'}`}
            style={{ 
              fontFamily: 'Courier New, monospace',
              backgroundColor: currentPage === 'impressum' ? '#FF1461' : 'transparent'
            }}
          >
            {t('nav.impressum')}
          </button>
          <button 
            onClick={() => navigateTo('privacy')} 
            className={`px-4 py-2 transition-all uppercase tracking-wide text-xs ${currentPage === 'privacy' ? 'text-white' : 'text-black hover:opacity-60'}`}
            style={{ 
              fontFamily: 'Courier New, monospace',
              backgroundColor: currentPage === 'privacy' ? '#FF1461' : 'transparent'
            }}
          >
            {t('nav.privacy')}
          </button>
          <button 
            onClick={() => navigateTo('terms')} 
            className={`px-4 py-2 transition-all uppercase tracking-wide text-xs ${currentPage === 'terms' ? 'text-white' : 'text-black hover:opacity-60'}`}
            style={{ 
              fontFamily: 'Courier New, monospace',
              backgroundColor: currentPage === 'terms' ? '#FF1461' : 'transparent'
            }}
          >
            {t('nav.terms')}
          </button>

          {/* Language Switcher - End of Menu */}
          <div className="flex gap-2 text-xs font-medium border-l border-gray-300 pl-6 ml-4" style={{ fontFamily: 'Courier New, monospace' }}>
            <button
              onClick={() => setLanguage('de')}
              className="px-3 py-2 transition-all text-black font-black"
              style={{ backgroundColor: language === 'de' ? '#FFC500' : 'transparent' }}
            >
              DE
            </button>
            <span className="text-gray-300">/</span>
            <button
              onClick={() => setLanguage('en')}
              className="px-3 py-2 transition-all text-black font-black"
              style={{ backgroundColor: language === 'en' ? '#FFC500' : 'transparent' }}
            >
              EN
            </button>
          </div>
        </div>

        {/* Mobile Menu Button + Language Switcher - Right */}
        <div className="md:hidden flex items-center gap-4">
          {/* Language Switcher - Mobile */}
          <div className="flex gap-1 text-xs font-medium" style={{ fontFamily: 'Courier New, monospace' }}>
            <button
              onClick={() => setLanguage('de')}
              className="px-2 py-1 transition-all text-black font-black"
              style={{ backgroundColor: language === 'de' ? '#FFC500' : 'transparent' }}
            >
              DE
            </button>
            <span className="text-gray-300">/</span>
            <button
              onClick={() => setLanguage('en')}
              className="px-2 py-1 transition-all text-black font-black"
              style={{ backgroundColor: language === 'en' ? '#FFC500' : 'transparent' }}
            >
              EN
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden py-4 px-6 space-y-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderTopColor: 'rgba(0, 0, 0, 0.2)', borderTopWidth: '2px' }}>
          <button 
            onClick={() => navigateTo('home')} 
            className="block w-full text-left py-2 hover:text-pink-600 transition-colors font-medium"
            style={{ fontFamily: 'Courier New, monospace' }}
          >
            HOME
          </button>
          <button 
            onClick={() => navigateTo('artists')} 
            className="block w-full text-left py-2 hover:text-pink-600 transition-colors font-medium"
            style={{ fontFamily: 'Courier New, monospace' }}
          >
            ARTISTS
          </button>
          <button 
            onClick={() => navigateTo('about')} 
            className="block w-full text-left py-2 hover:text-pink-600 transition-colors font-medium"
            style={{ fontFamily: 'Courier New, monospace' }}
          >
            ABOUT
          </button>
          <button 
            onClick={() => navigateTo('contact')} 
            className="block w-full text-left py-2 hover:text-pink-600 transition-colors font-medium"
            style={{ fontFamily: 'Courier New, monospace' }}
          >
            CONTACT
          </button>
          <button 
            onClick={() => navigateTo('impressum')} 
            className="block w-full text-left py-2 hover:text-pink-600 transition-colors font-medium text-sm"
            style={{ fontFamily: 'Courier New, monospace' }}
          >
            IMPRESSUM
          </button>
          <button 
            onClick={() => navigateTo('privacy')} 
            className="block w-full text-left py-2 hover:text-pink-600 transition-colors font-medium text-sm"
            style={{ fontFamily: 'Courier New, monospace' }}
          >
            PRIVACY
          </button>
          <button 
            onClick={() => navigateTo('terms')} 
            className="block w-full text-left py-2 hover:text-pink-600 transition-colors font-medium text-sm"
            style={{ fontFamily: 'Courier New, monospace' }}
          >
            TERMS
          </button>
        </div>
      )}

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:ital@0;1&family=JetBrains+Mono:wght@400;600;700&display=swap');
      `}</style>
    </nav>
  );

  // Footer Component
  const Footer = () => (
    <footer className="bg-black text-white py-24 px-6 border-t border-white" style={{ borderTopWidth: '2px' }}>
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 pb-16 border-b border-gray-700">
          <div>
            <p className="text-2xl font-black mb-2" style={{ color: '#FF1461',
      slideImage: 'SLIDESHOW_IMAGE_URL', fontFamily: 'Courier New, monospace' }}>
              artUP
            </p>
            <p className="text-sm text-gray-400 mb-6" style={{ fontFamily: 'Courier New, monospace' }}>
              Contemporary Art Exhibition
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-white hover:bg-pink-600 hover:border-pink-600 transition-all transform hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@artup.space"
                className="p-3 border border-white hover:bg-pink-600 hover:border-pink-600 transition-all transform hover:scale-110"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-widest mb-4" style={{ fontFamily: 'Courier New, monospace' }}>Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <button 
                  onClick={() => navigateTo('home')} 
                  className="hover:text-white transition-colors font-medium"
                  style={{ fontFamily: 'Courier New, monospace' }}
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('artists')} 
                  className="hover:text-white transition-colors font-medium"
                  style={{ fontFamily: 'Courier New, monospace' }}
                >
                  Artists
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('about')} 
                  className="hover:text-white transition-colors font-medium"
                  style={{ fontFamily: 'Courier New, monospace' }}
                >
                  About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('contact')} 
                  className="hover:text-white transition-colors font-medium"
                  style={{ fontFamily: 'Courier New, monospace' }}
                >
                  Contact
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('impressum')} 
                  className="hover:text-white transition-colors font-medium text-xs"
                  style={{ fontFamily: 'Courier New, monospace' }}
                >
                  Impressum
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('privacy')} 
                  className="hover:text-white transition-colors font-medium text-xs"
                  style={{ fontFamily: 'Courier New, monospace' }}
                >
                  Privacy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('terms')} 
                  className="hover:text-white transition-colors font-medium text-xs"
                  style={{ fontFamily: 'Courier New, monospace' }}
                >
                  Terms
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-widest mb-4" style={{ fontFamily: 'Courier New, monospace' }}>Contact</h3>
            <p className="text-sm text-gray-400 mb-2" style={{ fontFamily: 'Courier New, monospace' }}>Maximilianstraße 99</p>
            <p className="text-sm text-gray-400 mb-2" style={{ fontFamily: 'Courier New, monospace' }}>Speyer, Germany</p>
            <p className="text-sm text-gray-400" style={{ fontFamily: 'Courier New, monospace' }}>contact@artup.space</p>
          </div>
        </div>

        {/* Sponsors Section */}
        <div className="mb-16">
          <h3 className="text-sm font-black uppercase tracking-widest mb-8" style={{ fontFamily: 'Courier New, monospace' }}>Supported by</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {sponsors.map((sponsor) => (
              <div key={sponsor.id} className="flex items-center justify-center">
                <div
                  className="h-16 border-2 border-white rounded-lg flex items-center justify-center px-4"
                  style={{
                    backgroundImage: `url(${sponsor.logo})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                  }}
                >
                  {!sponsor.logo.includes('http') && (
                    <span className="text-xs text-gray-500 text-center font-medium">{sponsor.name}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-700 text-gray-400 text-sm flex flex-col md:flex-row justify-between items-center gap-4" style={{ fontFamily: 'Courier New, monospace' }}>
          <p>© 2026 artUP. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <button onClick={() => navigateTo('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => navigateTo('terms')} className="hover:text-white transition-colors">Terms</button>
          </div>
        </div>
      </div>
    </footer>
  );

  // Home Page
  if (currentPage === 'home') {
    return (
      <div className="min-h-screen bg-white overflow-hidden">
        <Navigation />

        {/* Hero Slideshow */}
        <div className="pt-40 pb-32 min-h-screen flex flex-col justify-center relative overflow-hidden border-b-4 border-black">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-pink-50 to-yellow-50" />
          
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0,0,0,.05) 25%, rgba(0,0,0,.05) 26%, transparent 27%, transparent 74%, rgba(0,0,0,.05) 75%, rgba(0,0,0,.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0,0,0,.05) 25%, rgba(0,0,0,.05) 26%, transparent 27%, transparent 74%, rgba(0,0,0,.05) 75%, rgba(0,0,0,.05) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px'
          }} />
          
          <div className="relative flex-1 flex items-center justify-center cursor-pointer" onClick={() => navigateTo('artist-detail', featuredArtists[currentSlide])}>
            {featuredArtists.map((artist, idx) => (
              <div
                key={artist.id}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 hover:opacity-95 ${
                  idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              >
                {/* Artwork Background */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${artist.slideImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Text Content */}
                <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
                  <h2 className="text-6xl md:text-8xl font-black mb-4 tracking-tighter text-white" style={{ fontFamily: 'Courier New, monospace', textShadow: '3px 3px 10px rgba(0,0,0,0.8)' }}>{artist.name}</h2>
                  <p className="text-xl md:text-2xl mb-8 font-bold italic text-white" style={{ fontFamily: 'Courier New, monospace', textShadow: '2px 2px 8px rgba(0,0,0,0.8)' }}>{artist.style}</p>
                  <p className="text-lg leading-relaxed max-w-xl mx-auto text-white font-medium" style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.8)' }}>{artist.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Slide Controls - Fixed at bottom */}
          <div className="relative z-20 flex justify-between items-center mt-8 px-6">
            <button
              onClick={prevSlide}
              className="p-4 border-3 border-black hover:bg-black hover:text-white transition-all"
              aria-label="Previous artist"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex gap-3">
              {featuredArtists.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-3 transition-all border-2 border-black ${
                    idx === currentSlide ? 'w-8 bg-black' : 'w-3 bg-white'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="p-4 border-3 border-black hover:bg-black hover:text-white transition-all"
              aria-label="Next artist"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {/* Countdown Section */}
        <CountdownSection />

        <AboutTeaser />

        <EventsTeaser />

        {/* All Artists Grid */}
        <section className="py-24 px-6 bg-white border-b-4 border-black">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter" style={{ fontFamily: 'Courier New, monospace' }}>All Artists</h2>
            <p className="text-lg mb-16 max-w-xl font-medium">Discover all {allArtists.length} participating artists in this year's exhibition.</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allArtists.map((artist) => (
                <button
                  key={artist.id}
                  onClick={() => navigateTo('artist-detail', artist)}
                  className="group text-left transition-all duration-300 border-3 border-black p-4 hover:shadow-xl"
                >
                  <div className="mb-4 h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative border-3 border-black">
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: artist.color }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-all duration-300 font-black">
                        <p style={{ fontFamily: 'Courier New, monospace' }}>VIEW</p>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-black mb-1 group-hover:opacity-70 transition-opacity" style={{ fontFamily: 'Courier New, monospace' }}>{artist.name}</h3>
                  <p className="text-sm font-medium italic" style={{ color: artist.color, fontFamily: 'Courier New, monospace' }}>{artist.style}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Event Info */}
        <section className="py-24 px-6 border-b-4 border-black" style={{ backgroundColor: '#FF1461' }}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black mb-16 tracking-tighter text-white" style={{ fontFamily: 'Courier New, monospace' }}>Event Details</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white p-8 border-4 border-black">
                <div className="flex items-center gap-4 mb-4">
                  <Calendar className="w-8 h-8" style={{ color: '#FF1461',
      slideImage: 'SLIDESHOW_IMAGE_URL' }} />
                  <div>
                    <p className="text-sm font-black uppercase" style={{ fontFamily: 'Courier New, monospace' }}>Exhibition Period</p>
                    <p className="text-2xl font-black">23 April – 17 May</p>
                  </div>
                </div>
                <p className="text-sm ml-12 font-medium">A month-long celebration of contemporary art and creative expression.</p>
              </div>

              <div className="bg-white p-8 border-4 border-black">
                <div className="flex items-center gap-4 mb-4">
                  <MapPin className="w-8 h-8" style={{ color: '#FF1461',
      slideImage: 'SLIDESHOW_IMAGE_URL' }} />
                  <div>
                    <p className="text-sm font-black uppercase" style={{ fontFamily: 'Courier New, monospace' }}>Venue</p>
                    <p className="text-2xl font-black">Maximilianstraße 99</p>
                  </div>
                </div>
                <p className="text-sm ml-12 font-medium">Speyer, Germany</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 px-6 bg-white border-b-4 border-black">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter" style={{ fontFamily: 'Courier New, monospace' }}>Get in Touch</h2>
            <p className="text-lg mb-16 font-medium">Have questions about the exhibition? We'd love to hear from you.</p>
            
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-black uppercase mb-2" style={{ fontFamily: 'Courier New, monospace' }}>Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 border-3 border-black focus:outline-none focus:bg-yellow-50 transition-colors"
                  style={{ fontFamily: 'Courier New, monospace' }}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-black uppercase mb-2" style={{ fontFamily: 'Courier New, monospace' }}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border-3 border-black focus:outline-none focus:bg-yellow-50 transition-colors"
                  style={{ fontFamily: 'Courier New, monospace' }}
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-black uppercase mb-2" style={{ fontFamily: 'Courier New, monospace' }}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="Your message..."
                  rows="6"
                  className="w-full px-4 py-3 border-3 border-black focus:outline-none focus:bg-yellow-50 transition-colors resize-none"
                  style={{ fontFamily: 'Courier New, monospace' }}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 font-black text-white border-4 border-black transform hover:scale-105 transition-all uppercase tracking-widest"
                style={{ fontFamily: 'Courier New, monospace', backgroundColor: '#FF1461' }}
              >
                Send Message
              </button>

              {formSubmitted && (
                <div className="p-4 bg-yellow-100 border-3 border-black text-black text-sm text-center font-black animate-fadeIn" style={{ fontFamily: 'Courier New, monospace' }}>
                  ✓ Nachricht erfolgreich versendet!
                </div>
              )}
            </form>
          </div>
        </section>

        <Footer />

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.4s ease-out;
          }
        `}</style>
      </div>
    );
  }

  // About Page with Media Kit
  if (currentPage === 'about') {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        
        <section className="pt-40 pb-24 px-6">
          <div className="max-w-7xl mx-auto">
            {/* About Section */}
            <div className="mb-24">
              <h1 className="text-6xl md:text-7xl font-black mb-8 tracking-tighter" style={{ fontFamily: 'Courier New, monospace', color: '#FF1461' }}>About artUP</h1>
              
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                  <h2 className="text-3xl font-black mb-6 tracking-tighter" style={{ fontFamily: 'Courier New, monospace' }}>The Exhibition</h2>
                  <p className="text-lg leading-relaxed mb-6 font-medium">
                    artUP is a contemporary art exhibition bringing together 18 international artists across diverse mediums and practices. From street art to classical painting, digital art to conceptual installations – artUP celebrates the diversity and vitality of contemporary artistic expression.
                  </p>
                  <p className="text-lg leading-relaxed font-medium">
                    Held in the heart of Speyer, this month-long exhibition creates a platform for emerging and established artists to showcase their work and engage with the community.
                  </p>
                </div>
                
                <div className="border-4 border-black p-8" style={{ backgroundColor: '#FFC500' }}>
                  <h3 className="text-2xl font-black mb-6 tracking-tighter" style={{ fontFamily: 'Courier New, monospace' }}>Event Details</h3>
                  <div className="space-y-4 font-medium">
                    <div>
                      <p className="text-sm font-black uppercase text-gray-700">Dates</p>
                      <p className="text-lg">April 23 – May 17, 2026</p>
                    </div>
                    <div>
                      <p className="text-sm font-black uppercase text-gray-700">Location</p>
                      <p className="text-lg">Maximilianstraße 99<br />67346 Speyer, Germany</p>
                    </div>
                    <div>
                      <p className="text-sm font-black uppercase text-gray-700">Hours</p>
                      <p className="text-lg">Tuesday – Sunday<br />11:00 AM – 7:00 PM<br />Closed Mondays</p>
                    </div>
                    <div>
                      <p className="text-sm font-black uppercase text-gray-700">Admission</p>
                      <p className="text-lg">Free Entry</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Practical Information */}
            <div className="mb-24 border-t-4 border-black pt-16">
              <h2 className="text-4xl font-black mb-12 tracking-tighter" style={{ fontFamily: 'Courier New, monospace' }}>Practical Information</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="border-4 border-black p-6">
                  <h3 className="text-2xl font-black mb-4 tracking-tighter" style={{ fontFamily: 'Courier New, monospace' }}>Getting There</h3>
                  <p className="text-sm leading-relaxed mb-4">
                    <strong>By Car:</strong> Parking available at nearby public lots<br /><br />
                    <strong>By Public Transport:</strong> Speyer Hauptbahnhof is 15 min walking distance<br /><br />
                    <strong>Address:</strong><br />
                    Maximilianstraße 99<br />
                    67346 Speyer
                  </p>
                </div>
                
                <div className="border-4 border-black p-6">
                  <h3 className="text-2xl font-black mb-4 tracking-tighter" style={{ fontFamily: 'Courier New, monospace' }}>Contact</h3>
                  <p className="text-sm leading-relaxed mb-4">
                    <strong>Email:</strong><br />
                    contact@artup.space<br /><br />
                    <strong>Phone:</strong><br />
                    +49 (0) 6232 XXX XXX<br /><br />
                    <strong>Web:</strong><br />
                    www.artup.space
                  </p>
                </div>
                
                <div className="border-4 border-black p-6">
                  <h3 className="text-2xl font-black mb-4 tracking-tighter" style={{ fontFamily: 'Courier New, monospace' }}>Accessibility</h3>
                  <p className="text-sm leading-relaxed mb-4">
                    ✓ Wheelchair accessible<br />
                    ✓ Accessible restrooms<br />
                    ✓ Guided tours available<br />
                    ✓ Multiple languages<br /><br />
                    For special accommodations, please contact us in advance.
                  </p>
                </div>
              </div>
            </div>

            {/* Media & Press Kit */}
            <div className="mb-24 border-t-4 border-black pt-16">
              <h2 className="text-4xl font-black mb-12 tracking-tighter" style={{ fontFamily: 'Courier New, monospace' }}>Media & Press</h2>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-black mb-6 tracking-tighter" style={{ fontFamily: 'Courier New, monospace' }}>Press Information</h3>
                  <p className="text-lg leading-relaxed mb-8 font-medium">
                    artUP is open to media inquiries, interviews, and coverage. We provide press materials, high-resolution images, and artist information.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="border-4 border-black p-4">
                      <p className="font-black text-sm uppercase" style={{ fontFamily: 'Courier New, monospace' }}>Press Contact</p>
                      <p className="font-medium">press@artup.space</p>
                    </div>
                    
                    <div className="border-4 border-black p-4">
                      <p className="font-black text-sm uppercase" style={{ fontFamily: 'Courier New, monospace' }}>Exhibition Title</p>
                      <p className="font-medium">artUP – Contemporary Art Exhibition</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-black mb-6 tracking-tighter" style={{ fontFamily: 'Courier New, monospace' }}>Download Media Kit</h3>
                  <p className="text-lg leading-relaxed mb-8 font-medium">
                    Complete press kit including high-resolution images, artist bios, and exhibition information.
                  </p>
                  
                  <div className="space-y-3">
                    <a href="PRESS_KIT_PDF_URL" className="block border-4 border-black p-4 bg-yellow-50 hover:bg-yellow-100 transition-all text-center font-black" style={{ fontFamily: 'Courier New, monospace' }}>
                      📥 PRESS KIT (PDF)
                    </a>
                    <a href="HIGH_RES_IMAGES_URL" className="block border-4 border-black p-4 bg-yellow-50 hover:bg-yellow-100 transition-all text-center font-black" style={{ fontFamily: 'Courier New, monospace' }}>
                      📸 HIGH-RES IMAGES
                    </a>
                    <a href="ARTIST_BIOS_URL" className="block border-4 border-black p-4 bg-yellow-50 hover:bg-yellow-100 transition-all text-center font-black" style={{ fontFamily: 'Courier New, monospace' }}>
                      📋 ARTIST BIOS
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="border-t-4 border-black pt-16 text-center">
              <h2 className="text-3xl font-black mb-8 tracking-tighter" style={{ fontFamily: 'Courier New, monospace' }}>Ready to Visit?</h2>
              <button
                onClick={() => navigateTo('contact')}
                className="px-8 py-4 font-black text-white border-4 border-black transform hover:scale-105 transition-all uppercase tracking-widest"
                style={{ fontFamily: 'Courier New, monospace', backgroundColor: '#FF1461' }}
              >
                Get in Touch
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  // Poster Page
  if (currentPage === 'poster') {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        
        <section className="pt-32 pb-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-black mb-8 tracking-tighter" style={{ fontFamily: 'Courier New, monospace', color: '#FF1461' }}>Event Poster</h1>
            <p className="text-lg mb-16 max-w-2xl font-medium">
              High-resolution poster for the artUP exhibition. Use this for print, digital, and social media.
            </p>
            
            <div className="bg-white border-4 border-black overflow-hidden shadow-2xl">
              <div 
                className="aspect-video md:aspect-auto md:h-96 lg:h-[700px] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
                style={{
                  backgroundImage: 'url(POSTER_IMAGE_URL_HERE)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="text-center text-gray-600">
                  <p className="text-4xl font-black mb-2" style={{ fontFamily: 'Courier New, monospace' }}>artUP</p>
                  <p className="text-2xl font-bold">Event Poster</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  // Contact Page
  if (currentPage === 'contact') {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        
        <section className="pt-32 pb-24 px-6">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-black mb-4 tracking-tighter" style={{ fontFamily: 'Courier New, monospace', color: '#FF1461',
      slideImage: 'SLIDESHOW_IMAGE_URL' }}>Get in Touch</h1>
            <p className="text-lg mb-16 font-medium">
              Questions about the exhibition? Interested in sponsoring? We're here to help.
            </p>
            
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-black uppercase mb-2" style={{ fontFamily: 'Courier New, monospace' }}>Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 border-3 border-black focus:outline-none focus:bg-yellow-50 transition-colors"
                  style={{ fontFamily: 'Courier New, monospace' }}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-black uppercase mb-2" style={{ fontFamily: 'Courier New, monospace' }}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border-3 border-black focus:outline-none focus:bg-yellow-50 transition-colors"
                  style={{ fontFamily: 'Courier New, monospace' }}
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-black uppercase mb-2" style={{ fontFamily: 'Courier New, monospace' }}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="Your message..."
                  rows="6"
                  className="w-full px-4 py-3 border-3 border-black focus:outline-none focus:bg-yellow-50 transition-colors resize-none"
                  style={{ fontFamily: 'Courier New, monospace' }}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 font-black text-white border-4 border-black transform hover:scale-105 transition-all uppercase tracking-widest"
                style={{ fontFamily: 'Courier New, monospace', backgroundColor: '#FF1461' }}
              >
                Send Message
              </button>

              {formSubmitted && (
                <div className="p-4 bg-yellow-100 border-3 border-black text-black text-sm text-center font-black animate-fadeIn" style={{ fontFamily: 'Courier New, monospace' }}>
                  ✓ Nachricht erfolgreich versendet!
                </div>
              )}
            </form>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  // Artists Page
  if (currentPage === 'artists') {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        
        <section className="pt-32 pb-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-black mb-4 tracking-tighter" style={{ fontFamily: 'Courier New, monospace', color: '#FF1461',
      slideImage: 'SLIDESHOW_IMAGE_URL' }}>All Artists</h1>
            <p className="text-lg mb-16 max-w-2xl font-medium">
              Discover all {allArtists.length} participating artists in this year's exhibition.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allArtists.map((artist) => (
                <button
                  key={artist.id}
                  onClick={() => navigateTo('artist-detail', artist)}
                  className="group text-left transition-all duration-300 border-3 border-black p-4 hover:shadow-xl"
                >
                  <div className="mb-4 h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative border-3 border-black">
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: artist.color }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-all duration-300 font-black">
                        <p style={{ fontFamily: 'Courier New, monospace' }}>VIEW</p>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-black mb-1 group-hover:opacity-70 transition-opacity" style={{ fontFamily: 'Courier New, monospace' }}>{artist.name}</h3>
                  <p className="text-sm font-medium italic" style={{ color: artist.color, fontFamily: 'Courier New, monospace' }}>{artist.style}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  // Artist Detail Page
  if (currentPage === 'artist-detail' && selectedArtistDetail) {
    const artist = selectedArtistDetail;
    const relatedArtists = allArtists.filter(a => a.id !== artist.id).sort(() => Math.random() - 0.5).slice(0, 3);

    return (
      <div className="min-h-screen bg-white">
        <Navigation />

        {/* Hero */}
        <div className="pt-32 pb-16 px-6 md:pt-48 border-b-4 border-black" style={{ backgroundColor: artist.color }}>
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div
                className="w-24 h-24 border-4 border-black"
                style={{ backgroundColor: artist.color }}
              />
            </div>
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-4 text-white" style={{ fontFamily: 'Courier New, monospace', textShadow: '2px 2px 0px rgba(0,0,0,0.3)' }}>{artist.name}</h1>
            <p className="text-2xl font-black mb-8 text-white italic" style={{ fontFamily: 'Courier New, monospace' }}>{artist.style}</p>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-24 pt-32">
          <div className="max-w-6xl mx-auto">
            {/* Biography Text */}
            <div className="mb-16">
              <p className="text-lg leading-relaxed font-medium">{artist.fullBio}</p>
            </div>

            {/* Portfolio Grid */}
            <div className="mb-24">
              
              {/* Portrait & Video Row */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Artist Portrait */}
                <div className="md:col-span-1 border-4 border-black overflow-hidden bg-gray-100 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundColor: artist.color,
                        backgroundImage: 'url(ARTIST_PORTRAIT_URL)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                    {!artist.color.includes('http') && (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-sm font-black" style={{ fontFamily: 'Courier New, monospace' }}>PORTRAIT</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Video Embed */}
                <div className="md:col-span-2 border-4 border-black overflow-hidden bg-gray-100 h-80 flex items-center justify-center">
                  <div
                    className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center"
                    style={{
                      backgroundImage: 'url(VIDEO_THUMBNAIL_URL)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="text-center text-white">
                      <div className="w-16 h-16 border-4 border-white rounded-full flex items-center justify-center mx-auto">
                        <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <p className="text-sm font-black mt-4" style={{ fontFamily: 'Courier New, monospace' }}>VIDEO</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Artworks Grid - 3 pieces */}
              <div className="grid md:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="border-4 border-black overflow-hidden bg-gray-100 h-64 flex items-center justify-center group cursor-pointer hover:shadow-xl transition-all">
                    <div
                      className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative group"
                      style={{
                        backgroundColor: item === 2 ? artist.color : undefined,
                        backgroundImage: `url(ARTWORK_${item}_URL)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-all" />
                      <p className="text-sm font-black text-gray-600 group-hover:text-white transition-colors" style={{ fontFamily: 'Courier New, monospace' }}>
                        ARTWORK {item}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            {/* Related Artists */}
            <div className="mt-16">
              <h2 className="text-4xl font-black mb-12 tracking-tighter" style={{ fontFamily: 'Courier New, monospace' }}>Other Featured Artists</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedArtists.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => navigateTo('artist-detail', a)}
                    className="group text-left transition-all duration-300 border-3 border-black p-4 hover:shadow-xl"
                  >
                    <div className="mb-4 h-40 bg-gradient-to-br from-gray-100 to-gray-200 relative border-3 border-black">
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ backgroundColor: a.color }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white text-center opacity-0 group-hover:opacity-100 transition-all duration-300 font-black">
                          <p style={{ fontFamily: 'Courier New, monospace' }}>VIEW</p>
                        </div>
                      </div>
                    </div>
                    <h3 className="font-black mb-1 group-hover:opacity-70 transition-opacity text-sm" style={{ fontFamily: 'Courier New, monospace' }}>{a.name}</h3>
                    <p className="text-xs font-medium italic" style={{ color: a.color, fontFamily: 'Courier New, monospace' }}>{a.style}</p>
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

  // Impressum Page
  if (currentPage === 'impressum') {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        
        <section className="pt-40 pb-24 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-black mb-12 tracking-tighter" style={{ fontFamily: 'Courier New, monospace', color: '#FF1461',
      slideImage: 'SLIDESHOW_IMAGE_URL' }}>Impressum</h1>
            
            <div className="space-y-8 border-4 border-black p-8 bg-yellow-50">
              {/* Verantwortlich */}
              <div>
                <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>Verantwortlich für den Inhalt</h2>
                <p className="font-medium mb-2" style={{ fontFamily: 'Courier New, monospace' }}>artUP Exhibition</p>
                <p className="mb-2">Maximilianstraße 99<br />67346 Speyer<br />Deutschland</p>
              </div>

              {/* Kontakt */}
              <div className="border-t-4 border-black pt-8">
                <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>Kontakt</h2>
                <p className="mb-2">
                  <strong>Email:</strong> contact@artup.space<br />
                  <strong>Website:</strong> www.artup.space
                </p>
              </div>

              {/* Vertretungsberechtigte Person */}
              <div className="border-t-4 border-black pt-8">
                <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>Vertretungsberechtigte Person</h2>
                <p className="font-medium" style={{ fontFamily: 'Courier New, monospace' }}>[Name und Titel einfügen]</p>
              </div>

              {/* Disclaimer */}
              <div className="border-t-4 border-black pt-8">
                <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>Haftungsausschluss</h2>
                <p className="mb-4 leading-relaxed">
                  Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 des TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
                <p className="leading-relaxed">
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch nur möglich, wenn wir Kenntnis von einer konkreten Rechtsverletzung haben. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                </p>
              </div>

              {/* Links */}
              <div className="border-t-4 border-black pt-8">
                <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>Haftung für Links</h2>
                <p className="mb-4 leading-relaxed">
                  Unsere Website enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
                </p>
                <p className="leading-relaxed">
                  Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                </p>
              </div>

              {/* Urheberrecht */}
              <div className="border-t-4 border-black pt-8">
                <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>Urheberrecht</h2>
                <p className="leading-relaxed">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des Autors oder Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                </p>
              </div>

              {/* Datenschutz */}
              <div className="border-t-4 border-black pt-8">
                <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>Datenschutz</h2>
                <p className="mb-4 leading-relaxed">
                  Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.
                </p>
                <p className="leading-relaxed">
                  Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per eMail) Sicherheitslücken aufweisen kann. Ein lückenloses Schützen der Daten vor dem Zugriff durch Dritte ist nicht möglich.
                </p>
              </div>

              {/* Bildquellen */}
              <div className="border-t-4 border-black pt-8">
                <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>Bildquellen</h2>
                <p className="leading-relaxed">
                  Die Kunstwerke und Porträts auf dieser Website sind Eigentum der jeweiligen Künstler. Alle Rechte bleiben bei den Künstlern.
                </p>
              </div>

              {/* Redaktionelle Änderungen */}
              <div className="border-t-4 border-black pt-8">
                <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>Redaktionelle Änderungen</h2>
                <p className="leading-relaxed">
                  Wir behalten uns vor, diese Seite jederzeit ohne vorherige Ankündigung zu ändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.
                </p>
              </div>
            </div>

            <div className="mt-12 p-6 border-4 border-black bg-yellow-100">
              <p className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Courier New, monospace' }}>
                <strong>Hinweis:</strong> Bitte ersetze [Name und Titel einfügen] mit deinen persönlichen Daten. Für eine rechtssichere Website solltest du diese Seite mit einem Rechtsanwalt überprüfen lassen.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  // Privacy Policy Page
  if (currentPage === 'privacy') {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        
        <section className="pt-40 pb-24 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-black mb-12 tracking-tighter" style={{ fontFamily: 'Courier New, monospace', color: '#FF1461' }}>Privacy Policy</h1>
            
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>1. Data Protection</h2>
                <p className="text-lg leading-relaxed mb-4">
                  Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal data when you use our website www.artup.space.
                </p>
              </div>

              <div className="border-t-4 border-black pt-8">
                <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>2. Data Collection</h2>
                <p className="text-lg leading-relaxed mb-4">
                  We collect personal data only when you voluntarily provide it to us, such as when you submit a contact form. This may include your name, email address, and message.
                </p>
              </div>

              <div className="border-t-4 border-black pt-8">
                <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>3. Use of Data</h2>
                <p className="text-lg leading-relaxed mb-4">
                  We use the data you provide solely to respond to your inquiries and communicate with you about the artUP exhibition. We do not share your data with third parties without your consent.
                </p>
              </div>

              <div className="border-t-4 border-black pt-8">
                <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>4. Cookies</h2>
                <p className="text-lg leading-relaxed mb-4">
                  Our website does not use cookies to track personal data. We may use analytics to understand how visitors use our site, but this does not identify you personally.
                </p>
              </div>

              <div className="border-t-4 border-black pt-8">
                <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>5. Your Rights</h2>
                <p className="text-lg leading-relaxed mb-4">
                  You have the right to access, correct, or delete your personal data. Please contact us at contact@artup.space to exercise these rights.
                </p>
              </div>

              <div className="border-t-4 border-black pt-8">
                <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>6. Contact</h2>
                <p className="text-lg leading-relaxed">
                  If you have questions about our privacy practices, please contact us at contact@artup.space
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  // Terms & Conditions Page
  if (currentPage === 'terms') {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        
        <section className="pt-40 pb-24 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-black mb-12 tracking-tighter" style={{ fontFamily: 'Courier New, monospace', color: '#FF1461' }}>Terms & Conditions</h1>
            
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>1. Use of Website</h2>
                <p className="text-lg leading-relaxed mb-4">
                  By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>

              <div className="border-t-4 border-black pt-8">
                <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>2. Disclaimer</h2>
                <p className="text-lg leading-relaxed mb-4">
                  The information provided on this website is for informational purposes only. While we strive to ensure accuracy, we make no warranties or representations about the content. The artUP exhibition reserves the right to make changes without notice.
                </p>
              </div>

              <div className="border-t-4 border-black pt-8">
                <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>3. Intellectual Property</h2>
                <p className="text-lg leading-relaxed mb-4">
                  All content on this website, including artwork images and descriptions, are the intellectual property of the respective artists or the artUP organization. You may not reproduce, distribute, or modify any content without explicit permission.
                </p>
              </div>

              <div className="border-t-4 border-black pt-8">
                <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>4. User-Generated Content</h2>
                <p className="text-lg leading-relaxed mb-4">
                  If you submit any information or content to artUP, you grant us the right to use it in connection with the exhibition and marketing purposes.
                </p>
              </div>

              <div className="border-t-4 border-black pt-8">
                <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>5. Limitation of Liability</h2>
                <p className="text-lg leading-relaxed mb-4">
                  artUP shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of or relating to your use of this website.
                </p>
              </div>

              <div className="border-t-4 border-black pt-8">
                <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>6. Changes to Terms</h2>
                <p className="text-lg leading-relaxed mb-4">
                  We reserve the right to change these terms and conditions at any time. Your continued use of the website following the posting of changes constitutes your acceptance of such changes.
                </p>
              </div>

              <div className="border-t-4 border-black pt-8">
                <h2 className="text-2xl font-black mb-4" style={{ fontFamily: 'Courier New, monospace' }}>7. Contact</h2>
                <p className="text-lg leading-relaxed">
                  If you have questions about these terms, please contact us at contact@artup.space
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  return null;
};

export default ArtUPWebsite;
