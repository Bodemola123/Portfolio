# Emola Bodunrin portfolio: design language

Every design task on this site follows this file. Tokens live in `app/globals.css`.

**Read:** a developer portfolio for recruiters and hiring leads, in a calm, nocturnal gallery language, built on Next.js 16 and React Three Fiber.

## The idea: the light table

The work is the hero. Each product is a thin glass screen carrying a real screenshot, lit from behind by the product's own brand colour, resting on a dark stage. Scrolling through the work section flips the deck one screen at a time while the matching case-study text sits beside it. Everything around the stage stays flat and quiet.

Borrowed moves, not looks:

- **Linear:** near-black canvas, hairline panels, product screenshots framed in dark panels, one accent used sparingly.
- **Mercury:** luminous 3D on a dark ground with completely calm UI around it; depth by tonal steps, not by shadow.
- **Oura:** the object gets its own stage, lifted off the ground by a soft radial glow.

## Colour

One warm grey family, one accent.

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0c0b09` | page |
| `--surface` | `#14130f` | raised panels |
| `--surface-2` | `#1c1a16` | hover and pressed panels |
| `--line` | `#2a2822` | hairlines and dividers |
| `--line-strong` | `#3d3a32` | control borders |
| `--text` | `#ede6d8` | headings and body |
| `--text-2` | `#a8a092` | secondary text (7:1 on `--bg`) |
| `--text-3` | `#8a8374` | captions only (5:1 on `--bg`) |
| `--accent` | `#d4b47a` | primary action, focus, current item |
| `--on-accent` | `#17120a` | text on the accent |

Rules:
- Gold is spent on the primary action, focus rings and the current item. Nowhere decorative.
- Brand colours of the products appear only as light in the 3D scene and as a small dot in lists.
- No gradients on text or buttons. The only gradient is the stage glow.

## Type

- **Geist** for everything; **Geist Mono** for years, indices and technical labels.
- Display: `clamp(44px, 8.4vw, 116px)`, weight 600, tracking `-0.035em`, line-height 0.95.
- H2: `clamp(30px, 4.6vw, 56px)`, weight 600, tracking `-0.03em`.
- H3: 24px, weight 600, tracking `-0.02em`.
- Body 17px / 1.6, secondary 15px, caption 13px. Prose capped at 62ch.
- Sentence case. No uppercase micro-labels; small labels are Geist Mono at 13px in `--text-3`.
- `text-wrap: balance` on headings, `tabular-nums` on years and counts.

## Shape and space

- Radius: 8px controls, 14px panels and screenshots, pill for buttons and tags.
- A surface gets a hairline border or a tonal step, never a border plus a shadow.
- Spacing steps: 4, 8, 12, 16, 24, 32, 48, 72, 120. Page gutter 16px on phones, 32px tablet, 48px desktop. Max width 1320px.

## Motion

- Ease-out `cubic-bezier(0.23, 1, 0.32, 1)` for entrances; 160ms for hover and press; buttons press to `scale(0.97)`.
- The 3D responds rather than performs: no idle spin, damped scroll-following, a pointer tilt of at most 4 degrees.
- `prefers-reduced-motion`: no 3D animation, the CSS stage swaps screens instantly, no entrance animations.

## 3D rules

- React Three Fiber, loaded client-side after the page paints; the CSS stage (real `<img>` screenshots in a CSS 3D stack) paints first and stays as the fallback for no-WebGL, reduced motion, Save-Data and errors.
- Unlit `meshBasicMaterial` with the screenshot as the map, no tone mapping, so the work keeps its true colours. Glow and contact shadow are canvas-generated textures, not lights.
- `frameloop="demand"`: frames render only while something is moving.
- Pixel ratio `[1, 2]` on desktop, `[1, 1.5]` on phones, dropped to 1 by a frame-time check when frames run long. Antialias off.
- Textures 1024px wide (shared with the CSS poster, so cached once). Under 25 draw calls.
- On touch devices the canvas has `pointer-events: none`; the page always scrolls.
