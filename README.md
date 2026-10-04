# Stickman vs Website

Video vertikal HyperFrames 1080x1920 / 60 FPS dengan karakter stickman tebal dan rig pose-driven reusable.

## Yang sudah tersedia

- Scene 01: website normal, stickman masuk, berjalan, berpikir, lalu menendang CTA.
- Stickman_Set modular:
  - 00_Rig
  - 01_Locomotion
  - 02_Vertical
  - 03_Interaction
  - 04_Combat
  - 05_Emotion
  - 06_Sport_Special
  - Export
- Walk cycle 8 pose dengan interpolasi 60 FPS.
- Rig tebal berbasis titik sendi, bukan garis tipis.
- Render shortcut Windows 60 FPS.

## Sinkronkan versi terbaru ke PC

```bat
cd /d D:\stikman_video
git fetch origin
git reset --hard origin/main
```

## Validasi

```bat
npx hyperframes lint
npx hyperframes check
```

## Preview

```bat
npx hyperframes preview
```

## Render 60 FPS

```bat
render-60fps.bat
```

atau:

```bat
npx hyperframes render --fps 60 --quality high --output renders\stickman-vs-website-60fps.mp4
```

## Struktur

```text
stikman_video/
├── index.html
├── compositions/
│   └── scene-01.html
├── Stickman_Set/
│   ├── 00_Rig/
│   ├── 01_Locomotion/
│   ├── 02_Vertical/
│   ├── 03_Interaction/
│   ├── 04_Combat/
│   ├── 05_Emotion/
│   ├── 06_Sport_Special/
│   ├── Export/
│   └── animation-manifest.json
├── assets/
└── render-60fps.bat
```

Scene 01 menggunakan library modular dari `Stickman_Set`, sehingga animasi berikutnya tidak perlu membangun karakter dari nol.
