# Herberk – Gentlemanské sázky

Statický web pro sledování sázek a epizod podcastu Herberk. Žádný backend, žádná databáze – čisté HTML/CSS/JS soubory.

---

## Struktura souborů

```
index.html              # Hlavní stránka – seznam všech sázek
vsazka-sidlo.html       # Sázka: Stane se Šídlo senátorem?
vsazka-moravec.html     # Sázka: Počet sledujících Moravce (kalkulačka losů)
vsazka-duben.html       # Sázka: Přídělový systém na paliva do dubna
vsazka-discord.html     # Sázka: David na discordu
epizody.html            # Poslední epizoda podcastu (live z iTunes API)
README.md               # Tento soubor
```

---

## Jak přidat novou sázku

**1. Zkopíruj `vsazka-duben.html`** jako šablonu (obsahuje vše – CSS, status banner, výsledkovou logiku), přejmenuj na `vsazka-nova.html` a uprav:
- Nadpis (`<h1>`)
- Otázku (`.question-text` u bloku Definice)
- Výhru (`.question-text` u bloku Výhra)
- Jméno souboru v JS: `const THIS_FILE = 'vsazka-nova.html';`
- Řádky v tabulce (`<tbody id="votes-body">`)
- Správný výsledek na tagu `<table>`: `data-result="ano"` nebo `data-result="ne"`

**2. Přidej řádek do `index.html`** – do `<ul class="vsazky-list">`:

```html
<li data-status="open" data-file="vsazka-nova.html">
  <a href="vsazka-nova.html">
    <span class="left">
      <span class="index-num">05</span>
      <span class="filename">Název sázky</span>
    </span>
    <span class="right">
      <span class="arrow">→</span>
    </span>
  </a>
</li>
```

---

## Jak změnit stav sázky

Stav se nastavuje **pouze v `index.html`** na atributu `data-status` u příslušného `<li>`. Podstránky si stav načtou automaticky – text, barva i chování banneru se změní bez zásahu do souborů sázky.

```html
<li data-status="waiting" data-file="vsazka-sidlo.html">
```

### Dostupné stavy

| Hodnota | Barva | Text | Kdy použít |
|---|---|---|---|
| `open` | 🟢 zelená | Otevřeno | Sázka je otevřená, přijímáme tipy |
| `waiting` | 🔵 modrá | Čeká na vyhodnocení | Tipy uzavřeny, čekáme na výsledek |
| `resolved` | 🟡 zlatá | Rozhodnuto | Výsledek znám – automaticky se zobrazí výherci |
| `closed` | ⚫ šedá | Uzavřeno | Archivováno |

### Status banner na podstránkách

Každá stránka sázky zobrazuje pod nadpisem **status banner** – živě načtený z `index.html`. Obsahuje pulsující tečku, název stavu a popisný text. Není potřeba nic měnit na podstránkách.

---

## Jak vyhodnotit sázku

Vyhodnocení probíhá **na dvou místech**:

**1. V `index.html`** nastav stav na `resolved`:
```html
<li data-status="resolved" data-file="vsazka-nova.html">
```

**2. V souboru sázky** nastav správný výsledek na tagu `<table>`:
```html
<table data-result="ano">   <!-- nebo data-result="ne" -->
```

Při stavu `resolved` se automaticky:
- Výherci zvýrazní **zlatě**
- Poražení se **ztlumí** na 45 % opacity
- Pod tabulkou se zobrazí **banner s trofejí** a jmény výherců

---

## Jak přidat hráče do sázky ANO/NE

V souboru sázky přidej řádek do `<tbody id="votes-body">`:

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


> **Poznámka k status banneru a výsledkům:** Načítání `index.html` přes `fetch()` funguje pouze při servování přes HTTP/HTTPS. Lokálně přes `file://` bude banner prázdný – použij `npx serve .`

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