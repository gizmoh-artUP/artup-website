# 🚀 QUICK START - artUP Website zu GitHub & Vercel

## ⏱️ Zeit: ca. 10 Minuten

---

## 1️⃣ GITHUB SETUP (3 Min)

### A) GitHub Account
→ Gehe zu https://github.com
→ Sign Up (oder Login)
→ Bestätige Email

### B) Neues Repository erstellen
→ Oben rechts: **"+" → "New repository"**

```
Repository name: artup-website
Description: Contemporary Art Exhibition Website
Visibility: Public
→ Create repository
```

---

## 2️⃣ DATEIEN VORBEREITEN (2 Min)

Alle Dateien sind bereits im `/outputs` Ordner:

```
artup-website/
├── src/
│   ├── App.jsx (✅ deine Website)
│   ├── index.js (✅)
│   └── index.css (✅)
├── public/
│   └── index.html (✅)
├── package.json (✅)
├── .gitignore (✅)
├── README.md (✅)
└── DEPLOYMENT_GUIDE.md (✅)
```

**Speichere alles in einem Ordner auf deinem Mac.**

---

## 3️⃣ GIT PUSH (3 Min - Terminal am Mac)

Öffne Terminal und führe nacheinander aus:

```bash
# Zum Ordner gehen
cd /path/to/artup-website

# Git initialisieren
git init

# Alle Dateien hinzufügen
git add .

# Ersten Commit
git commit -m "Initial commit - artUP website"

# Main Branch
git branch -M main

# GitHub Repository verbinden
git remote add origin https://github.com/DEIN_USERNAME/artup-website.git

# Hochladen
git push -u origin main
```

**Fertig!** Schau auf GitHub - dein Code ist online! ✅

---

## 4️⃣ VERCEL DEPLOYMENT (2 Min)

### A) Vercel Account
→ https://vercel.com
→ "Sign Up"
→ "Continue with GitHub"
→ Autorisieren

### B) Website importieren
→ "Add New..." → "Project"
→ Wähle `artup-website`
→ Settings standard lassen
→ Klick **"Deploy"**

⏳ **Warten Sie 2-3 Minuten...**

→ ✅ **Deine Website läuft live!**
→ URL: `artup-website.vercel.app`

---

## 5️⃣ CUSTOM DOMAIN (Optional, 5 Min)

Falls du `www.artup.space` nutzen willst:

### Vercel
1. Settings → Domains
2. "Add" → `www.artup.space`

### IONOS (oder dein Provider)
1. DNS-Einstellungen öffnen
2. Vercel CNAME Records eintragen
3. Speichern
4. **24-48h warten**

---

## ✅ FERTIG!

**Deine Website läuft jetzt auf:**
- `https://artup-website.vercel.app` (sofort)
- `https://www.artup.space` (in 24-48h)

---

## 📝 WICHTIG - Bilder & URLs

Bevor du Go-Live gehst, ersetze alle Placeholder:

**In `src/App.jsx` suchen & ersetzen:**

```javascript
// Slideshow Images
slideImage: 'SLIDESHOW_IMAGE_URL'

// Kunstwerk Images
ARTWORK_1_URL
ARTWORK_2_URL
ARTWORK_3_URL

// Poster
POSTER_IMAGE_URL_HERE

// Sponsor Logos
SPONSOR_LOGO_1_URL bis 4_URL

// Media Kit
PRESS_KIT_PDF_URL
HIGH_RES_IMAGES_URL
ARTIST_BIOS_URL
```

→ Ersetze mit deinen echten URLs (von Cloudinary, Imgur, etc.)

---

## 🔄 Updates später hochladen

```bash
# Änderungen machen in VS Code oder Editor

# Terminal:
git add .
git commit -m "Deine Nachricht"
git push origin main
```

✅ **Vercel deployt automatisch!**

---

## 🆘 Hilfe?

- GitHub Fehler: https://docs.github.com
- Vercel Docs: https://vercel.com/docs
- Siehe auch: `DEPLOYMENT_GUIDE.md`

---

**Happy Coding!** 🚀
