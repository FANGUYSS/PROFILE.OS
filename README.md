# PROFILE.OS — FANGUYSS

A phone-like personal operating system wrapped around the original interactive developer portfolio. Built with Next.js 15, React 19, TypeScript and Motion.

## Phase 2 — phone experience

- Boot → lock screen → swipe-to-unlock → clean wallpaper-only home → swipe up to widgets → swipe up again to the app drawer.
- Home screen intentionally has no app grid or profile tile; the wallpaper is the main experience.
- Widgets include a live 12-hour clock, date/calendar, local weather (browser location permission required), and the exact Lanyard presence card for Discord user `1237229822371958908`.
- App drawer has two horizontally swipeable pages and Work/Social folder shortcuts.
- Separate bundled video wallpapers for lock and home screens, with fallback posters.
- Gesture navigation, animated page transitions, notifications and a simulated quick-settings panel.
- Adaptive dark/light appearance, brightness and volume controls.
- Original terminal portfolio restored as a full app: ASCII banner, command history, arrow-key history navigation, Tab autocomplete, quick command chips, terminal palettes and easter eggs.
- Portfolio apps for About, Projects, Skills, Experience, Social, GitHub, YouTube, Settings and Music.
- Lanyard presence card is embedded directly from `lanyard.cnrad.dev`; live status text also refreshes through the public Lanyard API.
- Local audio player wired to three user-provided MP3 paths; the audio files are not bundled.

## Run locally

Requires Node.js 20.9+.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Terminal commands

| Group | Commands |
|---|---|
| Identity | `whoami`, `about`, `experience`, `contact`, `discord` |
| Portfolio | `projects`, `skills`, `stack`, `social`, `socials`, `github` |
| System | `help`, `clear`, `home`, `date`, `history`, `ls`, `pwd`, `status`, `neofetch` |
| Navigation | `open <app>`, `visit <url>` |
| Media | `music`, `play`, `pause`, `resume`, `next`, `previous`, `nowplaying` |
| Showcase & extras | `showcase`, `aesthetic`, `theme`, `ascii`, `coffee`, `fortune`, `fortytwo`, `konami`, `matrix`, `secret`, `sudo` |

Aliases include `bio`, `me`, `work`, `exp`, `cv`, `now`, and `cls`.

Keyboard: `Enter` runs a command, `↑` / `↓` navigates history, `Tab` autocompletes, and `Esc` blurs the prompt. On mobile, tap the terminal to focus and use the on-screen keyboard.

## Discord presence (Lanyard)

The Widgets screen embeds this public card: `https://lanyard.cnrad.dev/api/1237229822371958908`. It links to the matching Discord profile. No Discord account token or environment variable is required.

## Local music

Place your own audio files in `public/music/`:

- `track-01.mp3`
- `track-02.mp3`
- `track-03.mp3`

The terminal media commands and Music app use these paths. The tracks are intentionally not included in the repository.

## Wallpapers

- `public/wallpapers/nocturne.mp4` — lock screen.
- `public/wallpapers/aurora.mp4` — home screen.
- `public/posters/` contains fallback SVG posters.

Videos are muted, looping and inline for mobile autoplay compatibility. Browser power-saving settings may still pause autoplay.

## Important browser limitation

Wi-Fi, Bluetooth, mobile data and airplane mode switches are simulated interface state. A website cannot toggle a visitor's actual device radios.

## Weather and privacy

Weather uses Open-Meteo and asks the visitor for browser location permission. If permission is denied, the widget explains how to enable it; it does not guess the visitor location. Calendar/date uses the device local date.

## Projects

The Projects app fetches the public, non-fork repositories from `https://api.github.com/users/FANGUYSS/repos?per_page=100&sort=updated`. It does not invent or hardcode projects. If GitHub is unavailable, it links to the profile repositories page.


## Phase 1–7 completion scope

This build brings the OS foundation, boot/lock flow, immersive wallpaper layers, home → widgets → app drawer navigation, system panels, applications, and final mobile-focused polish into one project.

### Navigation
- Boot / Hello → lock screen → swipe up to unlock.
- Empty wallpaper home → swipe left to reveal widgets.
- Widgets → swipe up to open the app drawer.
- Swipe right from widgets to return home; swipe down from drawer to return to widgets.

### Wallpaper uploads
Settings supports independent lock-screen and home-screen MP4/WebM uploads (80 MB maximum). Custom videos are stored as Blobs in IndexedDB on the current browser/device. They are not uploaded to a server and do not automatically sync to another device or browser. Bundled wallpaper choices remain available as a reset/fallback. Browsers may require a user gesture before video playback; videos are muted and inline. Reduced-motion preference disables video playback.

### Persistence and limitations
Theme, brightness, volume and bundled wallpaper selections are saved in localStorage. Uploaded video blobs are saved in IndexedDB. Wi-Fi, Bluetooth, mobile data and airplane-mode controls are simulated UI state; a website cannot toggle device radios. Weather uses browser geolocation and Open-Meteo. Discord presence uses the public Lanyard endpoint for the configured public user ID. Projects screen links to the GitHub profile rather than fabricating a local project list.

### Local media
Add MP3 files as `public/music/track-01.mp3`, `track-02.mp3`, and `track-03.mp3`.

### Run
`npm install` then `npm run dev`; open `http://localhost:3000`.


## Final deployment: Netlify + shared admin

PROFILE.OS uses **Netlify Functions + Netlify Blobs** for shared settings and media. This is the server-side layer that makes admin-published changes visible to every visitor. Browser localStorage/IndexedDB is not used for the published settings.

### 1. Configure admin secrets

Create a strong admin password (12+ characters). Generate its scrypt hash locally:

```bash
node scripts/set-admin-password.mjs "YOUR-STRONG-ADMIN-PASSWORD"
```

Copy the printed `ADMIN_PASSWORD_HASH=...` value. Generate a separate session secret:

```bash
openssl rand -hex 32
```

In Netlify: **Site configuration → Environment variables**, add:

- `ADMIN_PASSWORD_HASH` = the complete salt:hash value printed by the script
- `ADMIN_SESSION_SECRET` = the random 64-character hex secret

Never put either value in `NEXT_PUBLIC_*`, source code, GitHub, or a client-side file. Redeploy after setting them.

### 2. Deploy

Push the project to GitHub and import it into Netlify. `netlify.toml` configures the Next.js adapter and build command. Netlify Blobs is the persistent shared store; it survives normal deploys and is not tied to a visitor's browser.

### 3. Local development

The Netlify Functions are required for admin login, publishing and shared media. Run the project through the Netlify development runtime:

```bash
npm install
npx netlify dev
```

Use the local URL printed by Netlify CLI. Plain `npm run dev` runs Next.js without the Netlify Functions and therefore cannot test the shared admin endpoints.

### 4. Admin workflow

Open Settings → Administrator and sign in. Change app icons, website shortcuts, songs, wallpapers or system appearance, then choose **Publish settings to all visitors**. Visitors fetch the published configuration from the Netlify function.

Admin sessions use an HttpOnly, Secure, SameSite=Strict cookie signed with `ADMIN_SESSION_SECRET`. Passwords are verified server-side with scrypt and are never shipped to the browser.

### Shared media limits

The included Netlify Function upload endpoint accepts image/audio/video media up to **4 MB per file** to stay within serverless request limits. For larger custom MP4/WebM wallpapers or long audio tracks, optimize/compress the file below this limit or connect object storage with signed uploads (for example, Supabase Storage or Cloudinary). Do not raise the function payload limit expecting Netlify Functions to accept arbitrarily large videos.

### Important platform note

The public website works for visitors on mobile and desktop. The shared admin backend in this build is specifically implemented for Netlify (Netlify Functions + Netlify Blobs). Moving the site to another host requires porting those server functions and persistent storage.
