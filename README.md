# Stickman vs Website

Prototype video vertikal 9:16 untuk serial **Stickman vs Website**, dibuat dengan HyperFrames + GSAP.

## Target
- Resolusi: 1080x1920
- Frame rate final: 60 FPS
- Format: vertical short-form
- Karakter: stickman SVG dengan joint/pivot GSAP
- Konsep: stickman masuk ke halaman website dan mulai menghancurkan elemen UI secara fisik
- Style: clean web UI + slapstick animation

## Preview

```bash
npx hyperframes preview
```

## Validasi

```bash
npx hyperframes lint
npx hyperframes check
```

## Render 60 FPS

```bash
npx hyperframes render --fps 60 --quality high --output renders/stickman-vs-website-60fps.mp4
```

Di Windows bisa juga langsung jalankan:

```bat
render-60fps.bat
```

> Catatan: HyperFrames default ke 30 FPS jika flag `--fps 60` tidak diberikan. `data-fps="60"` dipakai sebagai composition hint, sedangkan flag CLI memastikan output final benar-benar 60 FPS.

## Struktur

- `index.html` — root composition
- `compositions/scene-01.html` — Scene 01 + rig Stickman + timeline GSAP
- `assets/` — aset suara, gambar, atau media tambahan
- `render-60fps.bat` — shortcut render Windows 60 FPS

## Roadmap

1. Scene 01 — website normal + stickman masuk + menendang CTA
2. Scene 02 — navbar/card jatuh seperti benda fisik
3. Scene 03 — error popup + glitch
4. Scene 04 — website hancur total
5. Scene 05 — reveal website baru + punchline
