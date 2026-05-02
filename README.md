# pmoscode-website-v2

Hugo-basierte persönliche Website. Theme: `pmoscode-theme` (custom, Vanilla CSS, kein Framework).

---

## Lokale Entwicklung

```bash
hugo server --environment dev
```

Drafts und zukünftige Posts werden im `dev`-Environment automatisch mit eingebaut (`buildDrafts = true`, `buildFuture = true`).

---

## Posts erstellen

Posts verwenden **Page Bundles**:

```
content/posts/<slug>/
├── index.md        ← Inhalt + Front Matter
├── cover.jpg       ← Titelbild (wird automatisch verarbeitet)
└── img/
    ├── foto1.jpg
    └── foto2.jpg
```

Das Titelbild muss `cover.*` heißen (JPG, PNG, WebP). Es wird von Hugo automatisch zu WebP konvertiert.

---

## Bilder in Posts steuern

### Einzelbild mit Ausrichtung

Mit dem `img`-Shortcode lassen sich Bilder links oder rechts ausrichten, wobei der Text darum herumfließt.

```
{{< img src="img/foto.jpg" align="left" alt="Beschreibung" >}}
{{< img src="img/foto.jpg" align="right" alt="Beschreibung" >}}
{{< img src="img/foto.jpg" >}}
```

| Parameter | Werte | Beschreibung |
|---|---|---|
| `src` | Pfad relativ zum Page Bundle | Pflichtfeld |
| `align` | `left` \| `right` | Text fließt um das Bild herum; ohne `align` → Block (volle Breite) |
| `alt` | Text | Alt-Text für Barrierefreiheit |
| `caption` | Text | Optionale Bildunterschrift |

**Beispiel mit Caption:**
```
{{< img src="img/ergebnis.jpg" align="right" alt="Fertiges Werkstück" caption="Das fertige Ergebnis nach 3 Stunden" >}}
```

> Float-Bilder belegen maximal 45% der Breite. Auf Mobilgeräten (< 768px) wird der Float automatisch aufgehoben.

---

### Mehrere Bilder nebeneinander

Mit dem `imgrow`-Shortcode lassen sich 2 oder 3 Bilder in einer Zeile anzeigen. Sie teilen sich den verfügbaren Platz gleichmäßig.

```
{{< imgrow "img/a.jpg" "img/b.jpg" >}}
{{< imgrow "img/a.jpg" "img/b.jpg" "img/c.jpg" >}}
```

Die Pfade sind positional und relativ zum Page Bundle. Auf Mobilgeräten stapeln sich die Bilder automatisch vertikal.

---

## Videos einbinden

Videos liegen in `static/mov/` und werden **nicht** von Hugo verarbeitet. Einbinden mit dem `video`-Shortcode:

```
{{< video src="/mov/meinvideo.mp4" >}}
```

---

## Kategorien

| Kategorie | URL |
|---|---|
| Woodwork | `/categories/woodwork/` |
| Hardware | `/categories/hardware/` |
| 3D Print | `/categories/3d-print/` |
| Lasercutter | `/categories/lasercutter/` |
| Computer | `/categories/computer/` |

Im Front Matter eines Posts:

```toml
categories = ["Woodwork"]
# oder mehrere:
categories = ["Hardware", "Lasercutter"]
```

---

## Kommentare (Giscus)

Kommentare laufen über [Giscus](https://giscus.app) (GitHub Discussions). Konfiguration in `config/_default/hugo.toml` unter `[params.giscus]`. Solange `repo_id` leer ist, wird kein Kommentarbereich angezeigt.

Einrichtung:
1. GitHub Discussions im Repository aktivieren
2. [giscus.app](https://giscus.app) aufrufen und die Werte für `repo`, `repo_id`, `category`, `category_id` generieren
3. Werte in `hugo.toml` eintragen
