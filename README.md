# Stickman vs Website

Prototype video vertikal 9:16 untuk serial **Stickman vs Website**, dibuat dengan HyperFrames + GSAP.

## Target awal
- Resolusi: 1080x1920
- Format: vertical short-form
- Karakter: stickman SVG
- Konsep: stickman masuk ke halaman website dan mulai menghancurkan elemen UI secara fisik
- Style: clean web UI + slapstick animation

## Jalankan di HyperFrames

```bash
npx hyperframes
```

Render:

```bash
npx hyperframes render --output stickman-vs-website.mp4
```

Validasi:

```bash
npx hyperframes lint
npx hyperframes check
```

## Struktur

- `index.html` — composition utama
- `assets/` — aset suara, gambar, atau media tambahan nanti
- `README.md` — catatan project

## Roadmap

1. Scene 01 — website normal + stickman masuk
2. Scene 02 — CTA rusak / ditendang
3. Scene 03 — navbar/card jatuh seperti benda fisik
4. Scene 04 — error popup + glitch
5. Scene 05 — website hancur total
6. Scene 06 — reveal website baru + punchline
