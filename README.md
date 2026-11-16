# Rick Clips Video Studio

A complete, local-first Remotion starter for 30-second vertical animated shorts. The sample short follows Milo, an original cartoon explorer, through five colorful, cinematic scenes. All visuals are generated with React and SVG/CSS—no paid assets or services are required.

## Requirements

- Node.js 18.17+ (Node 20 LTS recommended)
- npm
- FFmpeg (Remotion can download/use its bundled FFmpeg)

## Get started

```bash
npm install
npm run typecheck
npm run dev
```

Open Remotion Studio and select **ShortsComposition**. The composition is 1080×1920 (9:16), 30 fps, and 900 frames (30 seconds).

## Render a playable MP4

```bash
npm run render
```

This renders `out/shorts.mp4` as H.264 with `yuv420p` pixel format for broad playback compatibility. For a faster low-resolution preview, run `npm run render:preview`.

## Optional narration (including ElevenLabs)

The composition accepts an optional `audioSrc` prop. To use narration, generate/download an audio file from ElevenLabs (or any voice tool), put it in `public/` (for example `public/narration.mp3`), then render with a props file:

```json
{"audioSrc":"narration.mp3"}
```

Save that JSON as `public/render-props.json` and run:

```bash
npx remotion render src/index.tsx ShortsComposition out/shorts.mp4 --props=public/render-props.json --codec=h264 --pixel-format=yuv420p
```

No ElevenLabs account, API key, or paid service is needed to render. Add voice audio only if you already have a file; keep API keys out of this public repository. The built-in subtitles work with or without narration. The sample subtitle lines are scene-timed; replace them and the matching narration script in `src/Shorts.tsx` to customize the story.

## Customize

- Edit the `scenes` array in `src/Shorts.tsx` to change the scene titles, captions, color palettes, and environments.
- The `Character` SVG component defines Milo and is reused across every scene.
- `Landscape` creates the layered, parallax environments and their camera drift.
- Scene timing is controlled by `SCENE_FRAMES` (currently 180 frames / 6 seconds per scene).
- Keep the total duration in sync with `durationInFrames` in `src/Root.tsx`.

## Free stack

Remotion, React, TypeScript, hand-authored SVG/CSS visuals, and local rendering. No external image/audio APIs, paid plugins, or proprietary scene assets are used. YouTube branding and upload automation are intentionally not bundled; this repository renders a video file locally.
