# Safari Hero Refresh Lag Investigation

Date: 2026-06-11  
Project: `jetour-yemen`  
Area: homepage hero on iPhone Safari

## Problem

On iPhone Safari, refreshing the homepage appears slow and the beginning of the hero animation is damaged or janky. Chrome on the same iPhone appears acceptable, which means the issue is likely timing-sensitive rather than a simple missing asset or broken route.

The problem has not been reproduced directly on the physical iPhone from this environment. Local probes can simulate a mobile viewport and Safari-like user agent, but they cannot perfectly reproduce iOS Safari's rendering, memory, thermal, cache, and WebKit scheduling behavior.

## Current User-Visible Symptom

- On refresh, the first hero animation does not play cleanly.
- Safari feels slower than Chrome on the same iPhone.
- The issue persists after two initial attempts to reduce the 360 viewer workload.
- The final solution must keep the first viewport animated. It should still use the client hero, Framer Motion, `Car360`, `TextReveal`, animated counters, and the canvas turntable.

## Internet Research Notes

These are the relevant browser facts gathered before attempting any further fix:

1. Safari/WebKit performance should be profiled with Web Inspector Timelines. Apple says Timelines show network requests, CSS rendering, JavaScript, and events during page load. WebKit's Timelines documentation also includes frame-level rendering and timeline tools.  
   Sources: [Apple Safari Web Inspector Guide](https://developer.apple.com/library/archive/documentation/AppleApplications/Conceptual/Safari_Developer_Guide/Instruments/Instruments.html), [WebKit Timelines Tab](https://webkit.org/web-inspector/timelines-tab/)

2. `requestAnimationFrame` callbacks run before repaint. If the main thread is busy with JavaScript, layout, image decode, font work, or paint/compositing, visual animation can drop frames.  
   Source: [MDN requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)

3. `requestIdleCallback` is intended for low-priority work that should not block animation or input. It is not a guarantee that work will run at a convenient time, especially with a timeout. Safari support and behavior can differ from Chrome, so relying on it for startup scheduling is risky.  
   Sources: [MDN requestIdleCallback](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback), [WebKit bug 164193](https://bugs.webkit.org/show_bug.cgi?id=164193)

4. Image decoding can affect rendering. MDN recommends `HTMLImageElement.decode()` when dynamically inserting or swapping images so the browser can wait until the image is decoded and safe to display. `decoding="async"` is only a hint; it does not remove all decode cost.  
   Sources: [MDN HTMLImageElement.decode](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decode), [MDN HTMLImageElement.decoding](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/decoding)

5. Lazy loading is a critical-rendering-path strategy: non-critical resources should load only when needed. The homepage hero should avoid loading resources that are not essential to the first visual frame.  
   Sources: [MDN Lazy loading](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Lazy_loading), [MDN HTMLImageElement.loading](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/loading)

6. Web fonts can cause delayed text rendering and layout shifts. This project loads both Manrope and Tajawal with many weights, and previous local probes showed many font files being requested on first load. That may distort text reveal timing on Safari.  
   Sources: [web.dev Optimize WebFont loading and rendering](https://web.dev/articles/optimize-webfont-loading), [web.dev font best practices](https://web.dev/articles/font-best-practices), [Next.js font optimization](https://nextjs.org/docs/app/getting-started/fonts)

7. `backdrop-filter` and large blur/filter effects require the browser to process what is behind translucent elements. The current UI uses glass/backdrop blur utilities and large blurred color fields. Safari supports these effects, but they can be expensive during animation-heavy first paint.  
   Sources: [MDN backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter), [web.dev backdrop-filter](https://web.dev/articles/backdrop-filter)

8. `content-visibility` can let the browser skip rendering work for content that is not needed yet. This may be relevant for sections below the hero, but it does not directly solve first-viewport hero jank.  
   Source: [MDN content-visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/content-visibility)

## Local Evidence Collected

### Initial homepage load before the first fix

A local mobile-sized probe showed:

- 82 local requests within the first several seconds.
- 40 image responses.
- 36 raw `/images/360/t2/*.png` frame requests.
- About 7.1 MB for the T2 frame sequence alone.
- The first turntable frame arrived first, then the remaining 35 frames arrived in a tight burst around the time the hero animation was playing.

This supported the hypothesis that Safari was being overloaded by simultaneous animation, canvas drawing, image decode, and resource fetch work.

### After first 360 preload fix

Changes made:

- Added `src/components/models/car360Preload.ts`.
- Changed `src/components/models/Car360.tsx` to store the initial image in `imagesRef.current` before drawing.
- Changed the 360 loader to delay background frame loading and load frames in batches.
- Added `tests/car360Preload.test.mjs`.

Verification:

- Regression test passed.
- `npm run build` passed.
- Local production probe showed the first T2 frame loading alone, with background frames starting later in batches.

Result:

- This reduced one clear resource burst.
- User reported the physical iPhone Safari problem still persisted.

### After second mobile-static hero attempt

Changes made:

- Added `src/components/home/heroTurntable.ts`.
- Changed `src/components/home/Hero.tsx` so mobile/coarse-pointer/reduced-motion devices do not mount `Car360`.
- Mobile hero now renders one static optimized `/images/360/t2/23.png` image.
- Added `tests/heroTurntable.test.mjs`.

Verification:

- Regression tests passed.
- `npm run build` passed.
- Mobile local probe showed:
  - `canvasCount: 0`
  - raw 360 frame requests: `0`
  - optimized static hero image requests: `1`
- Desktop local probe still showed the interactive canvas path.

Result:

- This removes the 360 canvas/PNG sequence from mobile first paint.
- This was rejected because it made the first viewport too static. It is kept here only as a diagnostic attempt and was reverted.

### After coordinated animated hero fix

Changes made:

- Restored `src/components/home/Hero.tsx` as a client component.
- Kept `framer-motion`, `Car360`, `TextReveal`, `Counter`, and canvas in the first viewport.
- Added a coordinated start gate: the hero waits for `document.fonts.ready` and for the first `Car360` image to decode and draw before releasing the entrance animation.
- Added a 2.2 second fallback so Safari cannot leave the hero hidden if a readiness signal is delayed.
- Changed `Car360` to call `onInitialFrameReady` after the initial frame is actually drawable.
- Kept 360 background frame loading delayed and batched, so the full frame sequence does not compete with the first entrance animation.
- Disabled the largest blurred atmosphere fields on mobile, while preserving the animated hero content.
- Added `active` props to `TextReveal` and `Counter` so they can wait for the coordinated start.
- Added `tests/homeHeroCoordinatedMotion.test.mjs`.

Verification:

- Regression tests passed.
- `npm run build` passed.
- `npm run lint` passed after converting the standalone inspection helper away from `require()`.
- Local server restarted on `0.0.0.0:3001`.
- `http://127.0.0.1:3001/en?animated-fix=20260611` returned `200`.
- `http://192.168.100.195:3001/en?animated-fix=20260611` returned `200`.
- Mobile clean-cache probe showed:
  - `canvasCount: 1`
  - first 360 frame `23.png` received at about `324ms`
  - background 360 frames started at about `2205ms`, then continued in small batches
  - canvas pixel samples were opaque and varied after the first draw, confirming the canvas was not blank

Result:

- The current solution is not static. It keeps the premium animated hero but avoids starting all animation, canvas, font, decode, and preload work in the same refresh window.

## Known Validation Gaps

1. We do not yet have a real iPhone Safari Web Inspector trace.
2. We do not know whether the user is seeing:
   - animation jank,
   - font/layout shift,
   - delayed first paint,
   - stale cached JavaScript,
   - network delay from Windows LAN serving,
   - or a Safari-specific compositor/filter problem.
3. Local Chromium/Puppeteer probes cannot faithfully reproduce iOS Safari.
4. Next build still warns about:
   - workspace root inference because another `package-lock.json` exists at `C:\Users\lenovo\package-lock.json`,
   - deprecated `middleware.ts` convention in Next 16.

## Current Hypotheses

### Hypothesis A: Web font loading is shifting or delaying the text reveal

Why it fits:

- The hero animation is text-heavy.
- The project loads many font weights for both English and Arabic.
- Previous local runs showed many font preload warnings.
- Safari may show the font swap/layout timing more visibly than Chrome.

Evidence needed:

- Safari Web Inspector timeline showing font downloads and layout shifts during refresh.
- Test build with reduced font weights or variable fonts.

Potential solution:

- Use variable fonts where possible.
- Reduce loaded weights.
- Consider separate locale-specific font loading.
- Consider less fragile text reveal timing until fonts are ready.

### Hypothesis B: First-viewport visual effects are too expensive for iPhone Safari

Why it fits:

- Hero uses large blur fields, backdrop blur/glass elements, huge stroked watermark text, background scale animation, text reveal, scroll transforms, and stats counters.
- Removing the 360 viewer may not remove enough compositor/paint work.

Evidence needed:

- Safari Web Inspector Frames/Rendering timeline.
- A/B test disabling blur/filter/backdrop effects in the hero.

Potential solution:

- Add Safari/mobile-specific reduced visual effects for the first viewport.
- Disable background scale animation and large blur fields on mobile Safari.
- Replace glass/backdrop blur in the fixed header and hero stats during initial load.

### Hypothesis C: Framer Motion hydration and while-in-view animations are colliding with first paint

Why it fits:

- The entire hero is a client component.
- It mounts scroll transforms, motion values, springs, text reveal, counters, and viewport observers.
- Safari may schedule hydration and animation start differently from Chrome.

Evidence needed:

- Compare Safari trace with a static/no-motion hero build.
- Track long tasks around hydration.

Potential solution:

- Keep the animated client hero, but coordinate startup so Framer Motion, text reveal, counters, and canvas auto-rotation begin after the first car frame and web fonts are ready.
- Start nonessential animation work after the first stable paint.
- Keep expensive blur/filter effects out of mobile first paint.

### Hypothesis D: The test URL may still be serving stale assets to the iPhone

Why it fits:

- The iPhone is testing over LAN from a local production server.
- Safari can aggressively preserve state on refresh.
- The user may have tested a cached bundle before the latest server restart.

Evidence needed:

- Test with a unique query string after every rebuild.
- Confirm served JS chunk contains the `heroTurntable` code.
- Use Safari Web Inspector Network tab with cache disabled.

Potential solution:

- Hard reload / clear Safari website data for the LAN host.
- Change port after major rebuild.
- Add a visible build marker temporarily to confirm the loaded bundle.

## Attempted Solutions

1. **Initial 360 frame race fix**
   - Problem addressed: first canvas frame not being present in `imagesRef.current` before `drawFrame`.
   - Files: `src/components/models/Car360.tsx`, `src/components/models/car360Preload.ts`.
   - Status: verified locally, but not enough for user's physical iPhone symptom.

2. **Batch and delay 360 background frame loading**
   - Problem addressed: 35 PNG frames loading almost at once during hero intro.
   - Files: `src/components/models/Car360.tsx`, `src/components/models/car360Preload.ts`.
   - Status: verified locally, but not enough for user's physical iPhone symptom.

3. **Static mobile hero image instead of interactive 360**
   - Problem addressed: canvas and 360 frame sequence removed completely from mobile first viewport.
   - Files: `src/components/home/Hero.tsx`, `src/components/home/heroTurntable.ts`.
   - Status: verified locally, rejected by user, and reverted.

4. **Server-rendered static homepage hero**
   - Problem addressed: remaining first-paint cost from Framer Motion hydration, text reveal, counters, scroll-linked transforms, and client-side media-query gating.
   - Files: `src/components/home/Hero.tsx`, `tests/homeHeroStatic.test.mjs`.
   - Status: verified as a diagnostic direction, rejected by user, and reverted.
   - Trade-off: the homepage lost the animated/interactive hero, so this is not acceptable as the final solution.

5. **Image cache header experiment**
   - Problem addressed: public images served with `Cache-Control: public, max-age=0`.
   - Attempt: added `headers()` rule in `next.config.ts`.
   - Result: `next start` still served public image files with `max-age=0`, so this was reverted. If needed, image caching should be handled at deployment/CDN level or via a different static asset strategy.

6. **Coordinated animated hero startup**
   - Problem addressed: Safari starting hydration, Framer Motion, text reveal, counters, canvas drawing, font resolution, and 360 preload work at the same time.
   - Files: `src/components/home/Hero.tsx`, `src/components/models/Car360.tsx`, `src/components/motion/TextReveal.tsx`, `src/components/motion/Counter.tsx`, `tests/homeHeroCoordinatedMotion.test.mjs`.
   - Status: current active solution. Verified by tests, lint, and production build.
   - Trade-off: the hero may wait briefly for the first canvas frame and fonts before the entrance animation starts, but it remains animated and interactive rather than static.

## Recommended Next Debugging Steps

1. **Capture a real iPhone Safari Web Inspector trace**
   - Use Safari on macOS connected to the iPhone.
   - Record Timelines while refreshing.
   - Capture Network, Layout & Rendering, JavaScript, Frames, and screenshots.

2. **Add a temporary visible build marker**
   - Example: small hidden-ish footer/debug string like `build safari-debug-2026-06-11-1`.
   - Purpose: prove the iPhone is loading the latest local build.

3. **Run controlled A/B builds**
   - A: current coordinated animated hero.
   - B: current hero with system fonts only.
   - C: current hero with no mobile blur/backdrop/filter effects.
   - D: static/server hero only as a diagnostic baseline, not as the final design.

4. **Prioritize the cheapest likely fixes**
   - Reduce font weights or use variable fonts.
   - Disable heavy blur/backdrop effects on mobile Safari.
   - Delay stats counters and nonessential hero animations.
   - Split the hero into server-rendered static content plus smaller animation islands.

## Working Conclusion

The original 360 viewer was definitely too aggressive, but the user's continued iPhone Safari report means it was probably not the only cause. The current non-static fix keeps the animated first viewport and changes the startup order: draw the first canvas frame, wait for fonts or fallback, then release Framer Motion, `TextReveal`, counters, and auto-rotation. If the physical iPhone still lags, the next most likely causes are web font timing and Safari compositing cost from blur/backdrop/filter effects, which should be isolated with Safari Web Inspector or focused A/B builds.
