# Herberk – Gentlemanské sázky

Statický web pro sledování sázek a epizod podcastu Herberk. Žádný backend, žádná databáze – čisté HTML/CSS/JS soubory.

---


## Jak přidat novou sázku

**1. Přidej řádek do `index.html`** – do `<ul class="vsazky-list">`:

```html
<li data-status="open" data-file="vsazka-nova.html">
  <a href="vsazka-nova.html">
    <span class="left">
      <span class="index-num">03</span>
      <span class="filename">Název sázky</span>
    </span>
    <span class="right">
      <span class="arrow">→</span>
    </span>
  </a>
</li>
```

**2. Zkopíruj `vsazka-sidlo.html`** jako šablonu, přejmenuj na `vsazka-nova.html` a uprav:
- Nadpis (`<h1>`)
- Otázku (`.question-text`)
- Výhru (`.question-text` u bloku Výhra)
- Jméno souboru v JS: `const THIS_FILE = 'vsazka-nova.html';`
- Řádky v tabulce (`<tbody id="votes-body">`)

---

## Jak změnit stav sázky

Stav se nastavuje **pouze v `index.html`** na atributu `data-status` u příslušného `<li>`. Podstránky si stav načtou automaticky.

```html
<li data-status="waiting" data-file="vsazka-sidlo.html">
```

### Dostupné stavy

| Hodnota | Barva | Text | Kdy použít |
|---|---|---|---|
| `open` | 🟢 zelená | Sběr tipů | Sázka je otevřená, přijímáme tipy |
| `waiting` | 🔵 modrá | Čeká na vyhodnocení | Tipy uzavřeny, čekáme na výsledek |
| `resolved` | 🟡 zlatá | Rozhodnuto | Výsledek znám, vítěz určen |
| `closed` | ⚫ šedá | Uzavřeno | Archivováno |

---

## Jak přidat hráče do sázky ANO/NE

V souboru sázky (`vsazka-sidlo.html` apod.) přidej řádek do `<tbody id="votes-body">`:

```html
<tr>
  <td class="name" style="color:var(--muted);font-size:10px;">03</td>
  <td class="name">Jméno hráče</td>
  <td class="vote"><span class="badge ano">ANO</span></td>
</tr>
```

Přepni `ano` na `ne` podle tipu. Souhrn (počty ANO/NE) se přepočítá automaticky.

---

## Design systém

Barvy jsou definované jako CSS proměnné v `:root` každého souboru:

```css
--bg: #0d0d0d        /* pozadí */
--accent: #c8ff00    /* hlavní zelená */
--text: #e8e8e8      /* text */
--muted: #555        /* tlumený text */
--border: #222       /* ohraničení */
```

Fonty: **Bebas Neue** (nadpisy) + **IBM Plex Mono** (vše ostatní) – načítají se z Google Fonts.

---

## Hosting

Web je čistě statický – funguje na **GitHub Pages** bez jakékoli konfigurace.

```
Settings → Pages → Branch: main → / (root) → Save
```

Adresa webu bude: `https://tvoje-jmeno.github.io/nazev-repozitare`

> **Poznámka k `epizody.html`:** iTunes API vyžaduje HTTPS. Na GitHub Pages funguje bez problémů, lokálně přes `file://` nikoliv – pro lokální testování použij např. `npx serve .`

---

## Sociální sítě podcastu

| Platforma | Odkaz |
|---|---|
| Instagram | instagram.com/herberkpodcast |
| Spotify | open.spotify.com/show/7jdliDfD3Zhvkdw9XoRAze |
| Apple Podcasts | podcasts.apple.com/cz/podcast/herberk/id1825481130 |
| YouTube | youtube.com/@herberkpodcast |
| Forendors | forendors.cz/herberkv |
| HeroHero | herohero.co/herberk |

---

*Pan pes © 2026*