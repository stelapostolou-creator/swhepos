# SWHepos — Android App (PWA)

**by Στυλιανός Φ. Αποστόλου · Ζίτσα Ιωαννίνων** — δωρεάν για όλους.

Το SWHepos είναι το **SW Maps → ΕΓΣΑ87 (HEPOS)** εργαλείο ως εγκαταστάσιμη εφαρμογή:
χάρτης (δορυφόρος/OSM), ανάγνωση σημείων/γραμμών/πολυγώνων από `.swm2` & Excel,
χάραξη (extend/divide/τομή αποστάσεων), εξαγωγή **DXF & CSV**. Δουλεύει **offline**
(εκτός από τα map tiles που θέλουν ίντερνετ).

## Περιεχόμενα φακέλου
```
index.html              ← η εφαρμογή (self-contained, με embedded HEPOS grids)
manifest.webmanifest    ← PWA manifest
sw.js                   ← service worker (offline)
swmaps.js · hepos.js · hepos_grids.js   ← μηχανές
icon-192/512(-maskable).png · apple-touch-icon.png · favicon-32.png
assets/                 ← λογότυπο
```

## 1. Δοκιμή τοπικά
Τα service workers θέλουν `http://localhost` ή `https://` (όχι `file://`):
```bash
cd SWHepos
python -m http.server 8080
```
→ άνοιξε `http://localhost:8080/` σε Chrome. F12 → Application → έλεγξε Service Worker & Manifest.

## 2. Δημοσίευση (GitHub Pages — δωρεάν)
1. Ανέβασε **όλα** τα αρχεία του φακέλου σε public GitHub repo (π.χ. `swhepos`).
2. Settings → Pages → Deploy from branch `main`, folder `/ (root)`.
3. Θα πάρεις URL: `https://USERNAME.github.io/swhepos/`.
4. Άνοιξέ το στο **κινητό** (Chrome Android) → menu ⋮ → **Install app / Add to Home Screen**.
   Εμφανίζεται ως κανονική εφαρμογή, ανοίγει fullscreen, δουλεύει offline. ✅

## 3. (Προαιρετικά) APK / Google Play
1. [pwabuilder.com](https://www.pwabuilder.com) → βάλε το URL → **Package for stores → Android**.
2. Package ID π.χ. `gr.zstop.swhepos`, App name **SWHepos**, Generate new signing key (φύλαξέ το!).
3. Κατέβασε το `.aab` → ανέβασέ το στο Play Console (Developer account $25 μία φορά).
4. Ανέβασε το `assetlinks.json` (από το PWABuilder) στο `/.well-known/` του site.

## Updates
Άλλαξε ό,τι θες, **αύξησε το `CACHE` στο `sw.js`** (π.χ. `swhepos-v2`) ώστε να δουν οι users τις αλλαγές, push στο GitHub. Για Play: νέο version code, ΙΔΙΟ keystore.
