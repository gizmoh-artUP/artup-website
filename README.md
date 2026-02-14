# artUP - Contemporary Art Exhibition Website

Eine moderne Website für die artUP Contemporary Art Exhibition in Speyer mit 18 internationalen Künstlern.

## 🎨 Features

- **Animierte Künstler-Slideshow** – Zufällige Featured Artists auf der Startseite
- **Live Countdown** – Tage, Stunden, Minuten, Sekunden bis zur Ausstellung
- **Event Teaser** – Kommende Events während der Ausstellung
- **Künstler Profile** – Detailseiten für jeden der 18 Künstler
- **About & Praktische Infos** – Alle wichtigen Details zur Ausstellung
- **Media Kit** – Download-Bereich für Presse
- **Responsive Design** – Optimiert für alle Devices
- **Modern Aesthetics** – Hot Pink + Gold Farbschema aus dem Event-Poster
- **Semi-transparente Navigation** – Mit Backdrop-Blur Effekt
- **Mehrsprachigkeit (Platzhalter)** – DE/EN Switcher bereit für i18n

## 📅 Event Details

- **Datum:** 23. April – 17. Mai 2026
- **Ort:** Maximilianstraße 99, 67346 Speyer, Deutschland
- **Öffnungszeiten:** Di–So, 11:00–19:00 Uhr
- **Eintritt:** Kostenlos

## 🛠️ Tech Stack

- **React 18** – UI Framework
- **Tailwind CSS** – Styling
- **Lucide Icons** – Icon Library
- **Vercel** – Hosting & Deployment
- **React Scripts** – Build Tools

## 🚀 Schnellstart

### Installation

```bash
# Clone Repository
git clone https://github.com/yourusername/artup-website.git
cd artup-website

# Install Dependencies
npm install

# Start Development Server
npm run dev
```

Die Website läuft dann auf `http://localhost:3000`

### Build für Production

```bash
npm run build
```

## 📝 Umgang mit Bildern & URLs

Alle Placeholder-URLs müssen ersetzt werden:

### Künstler-Slideshows (Home)
```javascript
slideImage: 'SLIDESHOW_IMAGE_URL'  // → deine Kunstwerk-URL
```

### Artist Detail Pages
```javascript
// Portrait
backgroundImage: 'url(ARTIST_PORTRAIT_URL)'

// Artworks (3 Stück)
backgroundImage: `url(ARTWORK_1_URL)`
backgroundImage: `url(ARTWORK_2_URL)`
backgroundImage: `url(ARTWORK_3_URL)`
```

### Home Page
```javascript
// Event Poster
backgroundImage: 'url(POSTER_IMAGE_URL_HERE)'
```

### Sponsor Logos (Footer)
```javascript
logo: 'SPONSOR_LOGO_1_URL'  // bis 4_URL
```

### Media Kit (About Page)
```javascript
href="PRESS_KIT_PDF_URL"
href="HIGH_RES_IMAGES_URL"
href="ARTIST_BIOS_URL"
```

## 🔧 Konfiguration

### Event Daten ändern
Bearbeite in der `EventsTeaser` Komponente:

```javascript
const allEvents = [
  { date: '2026-04-24', day: 'Freitag', title: 'Vernissage', time: '19:00 Uhr' },
  // ... mehr Events
];
```

### Countdown Datum ändern
In der `CountdownSection` Komponente:

```javascript
const eventDate = new Date('2026-04-23T00:00:00').getTime();
```

### Farben anpassen
Main Colors sind in den Style-Props definiert:
- Hot Pink: `#FF1461`
- Gold: `#FFC500`
- Schwarz: `#000000`
- Weiß: `#FFFFFF`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🌐 Deployment auf Vercel

### Setup

1. **GitHub Repository erstellen**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/artup-website.git
   git push -u origin main
   ```

2. **Vercel verbinden**
   - Gehe zu https://vercel.com
   - Klicke "Import Project"
   - Wähle dein GitHub Repository
   - Settings übernehmen
   - Deploy!

3. **Domain verbinden**
   - In Vercel: Settings → Domains
   - `www.artup.space` hinzufügen
   - DNS-Records in deiner Domain-Verwaltung aktualisieren

## 📄 Lizenz

© 2026 artUP. All rights reserved.

## 👥 Kontakt

Email: contact@artup.space
Web: www.artup.space
