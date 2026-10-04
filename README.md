# Stickman vs Web

Video HyperFrames vertikal 1080x1920 / 60 FPS dengan stickman SVG tebal, hierarchical rig, dan gerakan GSAP reusable.

## Arsitektur

```text
stikman_video/
├── rig/
│   ├── stickman.svg
│   ├── stickman.js
│   └── rig.css
├── moves/
│   ├── _helpers.js
│   ├── walk.js
│   ├── run.js
│   ├── jump.js
│   ├── punch.js
│   ├── kick.js
│   ├── hit.js
│   ├── climb.js
│   └── victory.js
├── scenes/
│   ├── 01_intro.html
│   ├── 02_fight.html
│   ├── 03_boss.html
│   └── 04_outro.html
├── web-assets/
│   └── ui.css
├── audio/
│   └── README.md
├── index.html
└── render-60fps.bat
```

## Rig

Hierarki utama:

```text
pelvis
├── chest
│   ├── neck
│   │   └── head
│   ├── shoulder front
│   │   └── elbow front
│   └── shoulder back
│       └── elbow back
├── hip front
│   └── knee front
│       └── ankle front
└── hip back
    └── knee back
        └── ankle back
```

Semua bagian adalah SVG nested groups. Rotasi parent otomatis membawa child, sehingga siku mengikuti bahu dan pergelangan kaki mengikuti lutut.

## API gerakan

Contoh di scene:

```js
const stickman = new StickmanRig.Stickman("#hero-host", {
  root: "#hero-root",
  shadow: "#hero-shadow"
});

timeline.add(stickman.walk(2), 1.0);
timeline.add(stickman.jump(), 3.0);
timeline.add(stickman.punch(), 4.5);
timeline.add(stickman.kick(), 5.5);
timeline.add(stickman.hit(), 6.5);
timeline.add(stickman.climb(2), 7.0);
```

Walk menggunakan 4 pose dasar: contact, down, passing, up. Empat pose sisi sebaliknya dibuat otomatis dengan mirror, lalu GSAP menginterpolasi seluruh gerak pada render 60 FPS.

## Video

1. Intro — stickman vs cookie popup
2. Fight — popup iklan + giant cursor
3. Boss — 404 Not Found
4. Outro — website rebuilt + victory

Total: 36 detik.

## Sinkronkan ke PC

```bat
cd /d D:\stikman_video
git fetch origin
git reset --hard origin/main
```

## Cek

```bat
npx hyperframes lint
npx hyperframes check
npx hyperframes preview
```

## Render

```bat
render-60fps.bat
```
