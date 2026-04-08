# Herberk – Gentlemanské sázky

Statický web pro sledování sázek podcastu Herberk. Žádný backend, žádná databáze – čisté HTML/CSS/JS soubory.

---

## Struktura souborů

```
index.html              # Hlavní stránka – seznam všech sázek
status.js               # Sdílená logika: status banner + vyhodnocení výsledků
vsazka-discord.html     # Sázka: David na discordu (vyhodnoceno)
vsazka-moravec.html     # Sázka: Počet sledujících Moravce (čísla + graf)
vsazka-sidlo.html       # Sázka: Stane se Šídlo senátorem?
vsazka-duben.html       # Sázka: Přídělový systém na paliva do dubna
README.md               # Tento soubor
```

---

## Jak přidat novou sázku

**1. Zkopíruj `vsazka-duben.html`** jako šablonu, přejmenuj na `vsazka-nova.html` a uprav:
- Nadpis (`<h1>`)
- Otázku (`.question-text` u bloku Definice)
- Výhru (`.question-text` u bloku Výhra)
- Řádky v tabulce (`<tbody id="votes-body">`)
- Správný výsledek na tagu `<table>`: `data-result="ano"` nebo `data-result="ne"` (nastav až při vyhodnocení, do té doby nech prázdné `data-result=""`)

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

> Název souboru v `data-file` musí přesně odpovídat názvu HTML souboru – `status.js` ho detekuje automaticky z URL.

---

## Jak změnit stav sázky

Stav se nastavuje **pouze v `index.html`** na atributu `data-status` u příslušného `<li>`. Podstránky si stav načtou automaticky přes `status.js` – text, barva i chování banneru se změní bez jakéhokoli zásahu do souborů sázky.

```html
<li data-status="waiting" data-file="vsazka-sidlo.html">
```

### Dostupné stavy

| Hodnota | Barva | Text | Kdy použít |
|---|---|---|---|
| `open` | 🟢 zelená | Otevřeno | Sázka přijímá tipy |
| `waiting` | 🔵 modrá | Čeká na vyhodnocení | Tipy uzavřeny, čekáme na výsledek |
| `resolved` | 🟡 zlatá | Rozhodnuto | Výsledek znám – automaticky se zobrazí výherci |
| `closed` | ⚫ šedá | Uzavřeno | Archivováno |

---

## Jak vyhodnotit sázku (ANO/NE stránky)

Vyhodnocení probíhá na dvou místech:

**1. V `index.html`** nastav stav na `resolved`:
```html
<li data-status="resolved" data-file="vsazka-nova.html">
```

**2. V souboru sázky** nastav správný výsledek na tagu `<table>`:
```html
<table data-result="ano">   <!-- nebo data-result="ne" -->
```

Při stavu `resolved` se automaticky (přes `status.js`):
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

## Sázka s čísly – vsazka-moravec.html

Stránka podporuje zadávání tipů jako čísel s pokročilým vyhodnocením:

- **Ruční zadání** hráčů a tipů přímo na stránce
- **Import ze souboru** – CSV, XLSX nebo XLS (drag & drop nebo tlačítko)
  - Soubor musí mít záhlaví; sloupce jsou detekovány automaticky podle klíčových slov (jméno, tip, count…)
- **Graf** (Chart.js) zobrazuje tipy seřazené podle hodnoty, skutečný výsledek jako přerušovaná čára
- **Losí kalkulačka** – ranking tipů se převede na počty losů, výsledkem je čistý zisk/ztráta losů na hráče
- **Persistence** – stav hráčů a tipů se ukládá do `localStorage` (`herberk_moravec_players`) a přežije refresh stránky

---

## Sdílený status.js

Soubor `status.js` obsluhuje všechny sázkové podstránky. Dělá jedinou věc: načte `index.html`, přečte stav sázky a:

1. Vykreslí **status banner** (pulsující tečka, název stavu, popis)
2. Pokud je stav `resolved`, spustí **vyhodnocení výsledků** (zvýraznění výherců)

Název aktuálního souboru detekuje sám z `window.location.pathname` – žádná ruční konfigurace není potřeba.

---

## Design systém

CSS proměnné definované v `:root` každého souboru:

```css
--bg: #0d0d0d        /* pozadí */
--accent: #c8ff00    /* hlavní zelená */
--text: #e8e8e8      /* text */
--muted: #555        /* tlumený text */
--muted2: #888       /* sekundární tlumený text */
--border: #222       /* ohraničení */
```

Fonty: **Bebas Neue** (nadpisy) + **IBM Plex Mono** (vše ostatní) – načítají se z Google Fonts.

---

## Hosting

Web je čistě statický – funguje na **GitHub Pages** bez jakékoli konfigurace.

```
Settings → Pages → Branch: main → / (root) → Save
```

> **Lokální vývoj:** `fetch()` v `status.js` nefunguje přes `file://`. Pro lokální testování použij:
> ```
> npx serve .
> ```

---

## Sociální sítě podcastu

| Platforma | Odkaz |
|---|---|
| Instagram | instagram.com/herberkpodcast |
| Spotify | open.spotify.com/show/7jdliDfD3Zhvkdw9XoRAze |
| Apple Podcasts | podcasts.apple.com/cz/podcast/herberk/id1825481130 |
| YouTube | youtube.com/playlist?list=PLZuqGbakZ1pHqPCLn7PJbf27dO_IBkqhg |
| Forendors | forendors.cz/herberk |
| HeroHero | herohero.co/herberk |

---

*Pan pes © 2026*
