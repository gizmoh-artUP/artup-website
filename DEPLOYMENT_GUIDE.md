# 📖 GitHub + Vercel Deployment Guide für artUP Website

## 🔧 Step 1: GitHub Repository erstellen

### A) GitHub Account vorbereiten
1. Gehe zu https://github.com
2. Melde dich an (oder erstelle einen Account)
3. Klicke oben rechts "+" → "New repository"

### B) Repository Details
```
Repository name: artup-website
Description: Contemporary Art Exhibition Website
Visibility: Public
Initialize: NICHT ankreuzen (wir machen das lokal)
```
→ Klick "Create repository"

---

## 💻 Step 2: Lokal Git Setup (Terminal am Mac)

Öffne Terminal und navigiere zu deinem Projekt-Ordner:

```bash
# Ordner erstellen (oder in existierenden gehen)
mkdir artup-website
cd artup-website

# Git initialisieren
git init

# Alle Dateien hinzufügen
git add .

# Ersten Commit
git commit -m "Initial commit - artUP website"

# Main Branch
git branch -M main

# Remote Repository verbinden
git remote add origin https://github.com/DEIN_USERNAME/artup-website.git

# Zu GitHub hochladen
git push -u origin main
```

**Fertig!** Dein Code ist jetzt auf GitHub.

---

## 🚀 Step 3: Vercel Deployment

### A) Vercel Account erstellen
1. Gehe zu https://vercel.com
2. Klicke "Sign Up"
3. Wähle "Continue with GitHub"
4. Autorisiere Vercel

### B) Project importieren
1. Klicke "Add New..." → "Project"
2. Wähle dein `artup-website` Repository
3. Settings überprüfen:
   ```
   Framework Preset: Create React App (auto erkannt)
   Build Command: npm run build
   Output Directory: build
   Install Command: npm install
   ```
4. Klick "Deploy"

→ **Vercel baut deine Website** (2-3 Minuten)

→ **Live URL:** `artup-website.vercel.app`

---

## 🌐 Step 4: Custom Domain (www.artup.space)

### A) Im Vercel Dashboard
1. Dein Project auswählen
2. "Settings" → "Domains"
3. "Add Domain"
4. Gib ein: `www.artup.space`
5. Klick "Add"

### B) DNS bei deinem Domain-Provider (IONOS)
1. Gehe zu IONOS Dashboard
2. Domains → `artup.space`
3. DNS-Einstellungen
4. Suche Vercel's DNS Records (Vercel zeigt sie dir)
   - Normalerweise ein CNAME Record
5. Ersetze alte Records mit Vercel's Werten
6. Speichern

**Warte 24-48h** bis Domain aktiv ist.

---

## 🔄 Step 5: Updates hochladen (später)

Wenn du änderungen machst:

```bash
# Änderungen hinzufügen
git add .

# Commit
git commit -m "Deine Nachricht hier"

# Zu GitHub pushen
git push origin main
```

**Vercel sieht das automatisch** und deployed neu!

---

## 📁 Dateistruktur

```
artup-website/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── App.jsx (deine Website)
│   ├── index.js
│   └── index.css
├── package.json
├── .gitignore
├── README.md
└── DEPLOYMENT_GUIDE.md (diese Datei)
```

---

## 🆘 Troubleshooting

### Domain zeigt "Not Found"
- Warte 24-48h bis DNS propagiert ist
- Check Vercel Domain-Settings nochmal
- Clear Browser Cache (Cmd+Shift+Delete)

### Build schlägt fehl auf Vercel
- Check "Build Logs" im Vercel Dashboard
- Meist: fehlende Dependencies
- Fix: `npm install` lokal, dann `git push`

### Änderungen sichtbar, aber nicht live
- Vercel baut ca. 1-2 Min
- Check "Deployments" Tab im Dashboard
- Warte bis Status "Ready" ist

---

## 📝 Wichtige URLs

| Service | URL |
|---------|-----|
| GitHub | https://github.com/yourusername/artup-website |
| Vercel Dashboard | https://vercel.com/dashboard |
| Live Website | https://www.artup.space |
| Vercel Preview | https://artup-website.vercel.app |

---

## ✅ Checkliste für Go-Live

- [ ] GitHub Account erstellt
- [ ] Repository hochgeladen
- [ ] Vercel Account erstellt
- [ ] Website deployed auf Vercel
- [ ] Custom Domain verbunden
- [ ] Alle Image-URLs ersetzt
- [ ] Alle Texte/Daten aktualisiert
- [ ] Events aktualisiert
- [ ] Sponsoren-Logos hinzugefügt
- [ ] Mobile Test (iPhone/Android)
- [ ] Desktop Test
- [ ] Domain funktioniert

---

## 🎉 Fertig!

Deine Website läuft jetzt live auf www.artup.space! 🚀
