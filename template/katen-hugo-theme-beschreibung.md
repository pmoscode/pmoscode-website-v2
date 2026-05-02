# Katen – Hugo Theme Dokumentation

> Strukturbeschreibung aller Seiten und Komponenten für die Hugo-Implementierung.  
> Farbpalette: Primär `#f75c5c` (Coral-Rot/Rosa), Sekundär `#1e2d3d` (Dunkelblau), Hintergrund `#f0f4f8` (Hellblau-Grau), Weiß `#ffffff`.  
> Schrift: Serifenlose, klare Sans-Serif für Fließtext; Bold für Überschriften.

---

## 1. Globale Komponenten

### 1.1 Header / Navigation (`partials/header.html`)

**Layout:** Einzeilige Navigationsleiste, weiß, volle Breite.

| Bereich | Inhalt |
|---|---|
| Links | Logo `Katen.` – „Katen" in Bold Dunkelblau, der Punkt in Coral-Rot |
| Mitte | Hauptmenü: `Home` (Pill-Button, Coral-Rot-Hintergrund, Weißer Text) · `Lifestyle` · `Inspiration` · `Pages ▾` (Dropdown) · `Contact` |
| Rechts | Social-Media-Icons (Facebook, Twitter, Instagram, Pinterest, Medium, YouTube) · Suchbutton (runder Coral-Button mit Lupen-Icon) · Menü-Button (runder Coral-Button mit Hamburger-Icon) |

**Hugo-Variablen:**
```
{{ .Site.Title }}          → "Katen"
{{ .Site.Menus.main }}     → Hauptmenü-Einträge
{{ .Site.Params.social }}  → Social-Media-Links
```

**Besonderheiten:**
- Aktiver Menüpunkt erhält Pill-Styling (Coral-Hintergrund).
- `Pages` ist ein Dropdown-Menü (`hasChildren`-Abfrage nötig).
- Navigation ist sticky (bleibt beim Scrollen oben).

---

### 1.2 Footer (`partials/footer.html`)

**Aufbau (3 Zonen):**

**Zone 1 – Instagram-Galerie:**
- Horizontale Bildleiste, 6 quadratische Fotos nebeneinander, volle Breite.
- Zentrierter Overlay-Button: `@Katen on Instagram` (Coral-Pill-Button).
- Hugo: Statische Bilder aus `assets/img/instagram/` oder via externem Instagram-Feed-Param.

**Zone 2 – Copyright-Leiste:**
- Links: `© 2021 Katen. Template by ThemeGer.`
- Mitte: Social-Media-Icons (Facebook, Twitter, Instagram, Pinterest, Medium, YouTube).
- Rechts: `∧ Back to Top`-Link.
- Hellgraue Trennlinie oben.

**Hugo-Variablen:**
```
{{ .Site.Params.copyrightYear }}
{{ .Site.Params.author }}
{{ .Site.Params.social }}
```

---

### 1.3 Sidebar (`partials/sidebar.html`)

Wird auf **About**, **Single Post** und **Main Page** (rechte Spalte) verwendet.

#### Widget: Katen-Brand-Box
- Logo `Katen.` zentriert (gleiche Schreibweise wie Header).
- Kurzer Bio-Text: „Hello, We're content writer who is fascinated by content fashion, celebrity and lifestyle..."
- Social-Icons-Reihe zentriert.

#### Widget: Popular Posts
- Überschrift `Popular Posts` + dekorative Wellenlinie in Coral (~~~).
- Listeneinträge (3 Stück), je mit:
  - Nummerierung (1, 2, 3) in Coral-Kreis.
  - Kleines Vorschaubild.
  - Titel (Link).
  - Datum.

#### Widget: Explore Topics
- Überschrift `Explore Topics` + Wellenlinie.
- Kategorienliste mit Pfeil-Icon (`›`), Name und Anzahl der Beiträge in Klammern.
- Kategorien: Lifestyle (5), Inspiration (2), Fashion (4), Politic (1), Trending (7), Culture (3).

#### Widget: Newsletter
- Überschrift `Newsletter` + Wellenlinie.
- Text: „Join 70,000 subscribers!"
- E-Mail-Eingabefeld (Placeholder „Email address...").
- Coral-Button: `Sign Up`.
- Datenschutzhinweis-Link (klein).

#### Widget: Celebration (Slider)
- Überschrift `Celebration` + Wellenlinie.
- Einzelner Artikel-Card mit Bild, Kategorie-Badge, Titel, Autor, Datum.
- Vor/Zurück-Pfeile (`‹ ›`).

#### Widget: Tag Clouds
- Überschrift `Tag Clouds` + Wellenlinie.
- Tags als klickbare Pill-Elemente.

---

## 2. Seite: Startseite / Main Page (`layouts/index.html`)

**Layout:** 2-Spalten (Inhalt ~70% | Sidebar ~30%).

---

### 2.1 Hero-Bereich (Featured Post)

- Großes Vollbild-Card mit Bild, füllt die gesamte linke Spaltenbreite.
- Overlay unten: Kategorie-Badge (Coral-Pill), Titel (groß, weiß), Autor + Datum (weiß).
- Rechts daneben: Liste der 4 neuesten/beliebtesten Posts (Popular/Recent Toggle).
  - Toggle-Buttons: `Popular` | `Recent` (Pill, aktiv = Coral).
  - Jeder Eintrag: kleines Vorschaubild + Titel + Datum.

**Hugo-Daten:**
```
{{ range first 1 (where .Site.RegularPages "Params.featured" true) }}
{{ range first 4 .Site.RegularPages }}
```

---

### 2.2 Editor's Pick (`section: editors-pick`)

- Sektion-Überschrift: `Editor's Pick` + Coral-Wellenlinie darunter.
- **Layout:** 1 großes Card links + 3 kleine Cards rechts gestapelt.
  - Großes Card: Bild oben, Kategorie-Badge, Titel (groß), Autor, Datum, Teaser-Text.
  - Kleine Cards: Bild links (klein), Titel + Datum rechts.

**Hugo:**
```
{{ range where .Site.RegularPages "Params.editors_pick" true }}
```

---

### 2.3 Trending (`section: trending`)

- Sektion-Überschrift: `Trending` + Coral-Wellenlinie.
- **Obere Reihe:** 2 große Cards nebeneinander mit Bild, Kategorie-Badge (Coral oder andere Farbe), Titel, Autor, Datum, Teaser-Text.
- **Untere Reihe:** 4 kleine Cards nebeneinander (Bild + Titel + Datum).

**Hugo:**
```
{{ range where .Site.RegularPages "Params.trending" true }}
```

---

### 2.4 Inspiration (`section: inspiration`)

- Sektion-Überschrift: `Inspiration` + Coral-Wellenlinie + Vor/Zurück-Pfeile rechts.
- 2 große Bild-Cards nebeneinander mit Overlay (Kategorie-Badge, Titel, Autor unten links).

---

### 2.5 Latest Posts (`section: latest-posts`)

- Sektion-Überschrift: `Latest Posts` + Coral-Wellenlinie.
- Vertikale Liste von Artikeln:
  - Bild links (mittelgroß), rechts: Autor + Kategorie + Datum (kleine Tags), Titel (fett), Teaser-Text, Share-Icon.
- `Load More`-Button zentriert am Ende (Outline-Style, Coral-Rahmen).

**Hugo:**
```
{{ range .Paginator.Pages }}
```

---

## 3. Seite: Single Post (`layouts/_default/single.html`)

**Layout:** 2-Spalten (Inhalt ~65% | Sidebar ~35%).

---

### 3.1 Breadcrumb (`partials/breadcrumb.html`)

```
Home › Inspiration › 3 Easy Ways To Make Your iPhone Faster
```
Kleiner Text, Links in Coral.

---

### 3.2 Artikel-Header

- Titel (H1, groß, fett, Dunkelblau).
- Meta-Zeile: Autoren-Avatar (rund, klein) + Autorenname + Kategorie-Tag + Datum.

**Hugo:**
```
{{ .Title }}
{{ .Params.author }}
{{ .Params.categories }}
{{ .Date | dateFormat "02 January 2006" }}
```

---

### 3.3 Artikel-Body

- Hauptbild (volle Inhaltsbreite).
- Fließtext mit Absätzen.
- Zwischenbild mit Bildunterschrift (Caption, zentriert, kursiv).
- Gemischtes Layout (Text + Bild nebeneinander möglich, Bild links, Text rechts).
- Zwischenüberschrift (H2, fett, Dunkelblau).
- Aufzählungsliste (Bullet-Points mit `·`-Zeichen).
- Inline-Links in Coral-Rot.

---

### 3.4 Tag- und Share-Leiste

- Links: Tags als Coral-Pill-Buttons (`#Trending`, `#Hiker`, `#Feaured`).
- Rechts: Share-Icons (Facebook, Twitter, LinkedIn, Pinterest, Bookmark, E-Mail).

**Hugo:**
```
{{ range .Params.tags }}
```

---

### 3.5 Autoren-Box (`partials/author-box.html`)

- Hellblauer Hintergrund-Block.
- Autorenname (fett, groß).
- Autoren-Avatar (rund, mittelgroß, links).
- Kurze Bio.
- Social-Icons des Autors.

---

### 3.6 Kommentarbereich (`partials/comments.html`)

**Kommentar-Liste:**
- Überschrift: `Comments (3)` + Coral-Wellenlinie.
- Jeder Kommentar:
  - Avatar (rund) + Name (fett) + Datum + Uhrzeit.
  - Kommentar-Text.
  - Coral-Button: `Reply`.
- Eingerückte Antwort-Kommentare (verschoben nach rechts).

**Kommentar-Formular:**
- Überschrift: `Leave Comment` + Coral-Wellenlinie.
- Felder: `Your comment here...` (Textarea, groß) · `Email address` · `Website` · `Your name` (3er-Reihe).
- Coral-Button: `Submit`.

> **Hinweis:** Für Hugo empfiehlt sich die Integration von Disqus (`{{ template "_internal/disqus.html" . }}`) oder Utterances als Kommentarsystem.

---

## 4. Seite: About (`layouts/page/about.html`)

**Layout:** 2-Spalten (Inhalt ~60% | Sidebar ~40%).

---

### 4.1 Page-Header (`partials/page-header.html`)

- Hellblau-grauer Hintergrund-Block (volle Breite).
- Seiten-Titel zentriert: `About` (H1, fett, Dunkelblau).
- Breadcrumb zentriert darunter: `Home / About`.

Dieses Element wird auch auf der **Contact**-Seite verwendet.

---

### 4.2 Autoren-Profil

- Großes Profilbild (volle Inhaltsbreite, ca. 480px hoch, Graustufen-Foto).
- Fließtext in mehreren Absätzen (persönliche Bio).
- Social-Media-Icons am Ende der Bio (Facebook, Twitter, Instagram, Pinterest, Medium, YouTube).

**Hugo:**
```
{{ .Content }}
{{ .Params.social }}
```

---

## 5. Seite: Contact (`layouts/page/contact.html`)

**Layout:** Einspaltiger Inhalt (zentriert, max-width ca. 1000px).

---

### 5.1 Page-Header

Identisch mit dem About-Page-Header (siehe 4.1).
- Titel: `Contact`
- Breadcrumb: `Home / Contact`

---

### 5.2 Kontakt-Info-Cards (`partials/contact-info.html`)

3 Cards nebeneinander, je mit:
- Coral-quadratisches Icon-Badge (links).
- Bezeichnung (fett, H3).
- Wert darunter (Telefon / E-Mail / Adresse).

| Icon | Bezeichnung | Wert |
|---|---|---|
| Telefon | Phone | +1-202-555-0135 |
| Umschlag | E-Mail | hello@example.com |
| Karte | Location | California, USA |

**Hugo-Params:**
```yaml
# config.yaml / params
contact:
  phone: "+1-202-555-0135"
  email: "hello@example.com"
  location: "California, USA"
```

---

### 5.3 Kontakt-Formular (`partials/contact-form.html`)

- Überschrift: `Send Message` (H2) + Coral-Wellenlinie.
- Felder:
  - Reihe 1: `Your name` (50%) | `Email address` (50%)
  - Reihe 2: `Subject` (100%)
  - Reihe 3: `Your message here...` (Textarea, 100%, ~120px hoch)
- Coral-Button: `Submit Message`

> **Hinweis für Hugo:** Da Hugo statisch ist, wird ein Drittanbieter-Dienst benötigt:
> - [Formspree](https://formspree.io) (`action="https://formspree.io/f/XXXXXX"`)
> - [Netlify Forms](https://docs.netlify.com/forms/setup/) (`netlify`-Attribut)

---

## 6. Styles & Design-Token-Übersicht

```css
:root {
  --color-primary:    #f75c5c;   /* Coral-Rot – Buttons, Links, Akzente */
  --color-dark:       #1e2d3d;   /* Dunkelblau – Überschriften, Text */
  --color-bg-light:   #f0f4f8;   /* Hellblau-Grau – Page-Header, Hintergründe */
  --color-white:      #ffffff;
  --color-border:     #e8e8e8;   /* Trennlinien */
  --color-meta:       #888888;   /* Datum, Metadaten */

  --font-body:    'Jost', sans-serif;       /* oder ähnliche serifenlose */
  --font-heading: 'Playfair Display', serif; /* für H1/H2 optional */

  --radius-pill:  50px;  /* Pill-Buttons & Badges */
  --radius-card:  6px;   /* Card-Eckenradius */

  --sidebar-width: 30%;
  --content-width: 65%;
  --gap:           20px;
}
```

---

## 7. Hugo-Verzeichnisstruktur (Empfehlung)

```
katen-hugo/
├── archetypes/
│   └── default.md
├── assets/
│   ├── css/
│   │   └── main.css
│   ├── js/
│   │   └── main.js
│   └── img/
│       └── instagram/        ← Footer-Galerie
├── layouts/
│   ├── _default/
│   │   ├── baseof.html       ← Basis-Template mit Header/Footer
│   │   ├── list.html         ← Kategorien-/Tag-Übersicht
│   │   └── single.html       ← Einzelner Artikel
│   ├── index.html            ← Startseite
│   ├── page/
│   │   ├── about.html        ← About-Seite
│   │   └── contact.html      ← Kontakt-Seite
│   └── partials/
│       ├── header.html
│       ├── footer.html
│       ├── sidebar.html
│       ├── breadcrumb.html
│       ├── page-header.html
│       ├── author-box.html
│       ├── comments.html
│       ├── contact-form.html
│       ├── contact-info.html
│       └── widgets/
│           ├── popular-posts.html
│           ├── explore-topics.html
│           ├── newsletter.html
│           ├── celebration.html
│           └── tag-clouds.html
├── content/
│   ├── _index.md
│   ├── about.md              ← type: page, layout: about
│   ├── contact.md            ← type: page, layout: contact
│   └── posts/
│       └── *.md
└── config.yaml
```

---

## 8. Front Matter – Vorlage für Artikel

```yaml
---
title: "3 Easy Ways To Make Your iPhone Faster"
date: 2021-03-29
author: "Katen Doe"
categories: ["Trending"]
tags: ["Trending", "Hiker", "Featured"]
featured: false
editors_pick: false
trending: true
cover: "/img/posts/iphone-faster.jpg"
summary: "A wonderful serenity has taken possession of my entire soul..."
---
```

---

## 9. Dekorative Wellenlinie (Komponente)

Das Coral-Wellenlinien-Element unter Sektion-Überschriften kann als einfaches SVG oder CSS realisiert werden:

```html
<!-- partials/wave-divider.html -->
<div class="wave-divider">
  <svg width="40" height="8" viewBox="0 0 40 8" fill="none">
    <path d="M0 4 Q5 0 10 4 Q15 8 20 4 Q25 0 30 4 Q35 8 40 4"
          stroke="#f75c5c" stroke-width="2" fill="none"/>
  </svg>
</div>
```

Aufruf in Templates: `{{ partial "wave-divider.html" . }}`
