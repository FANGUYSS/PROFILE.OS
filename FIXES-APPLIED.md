# PROFILE.OS fixes applied

This is the full project source with the requested bug fixes integrated.

## Music player
- One playlist now contains the three bundled tracks plus songs uploaded in Settings.
- The Music app, Settings manager, and shared audio element use the same playlist.
- Selecting, playing, pausing, skipping, and track completion operate on that playlist.
- Uploaded songs can have optional cover artwork.
- Removing an uploaded track updates the playlist and stops it if it was selected.
- Terminal media commands no longer refer to stale hardcoded track indexes.

## Notifications
- Replaced the static, fake notification cards with a session activity feed.
- Includes app-open events, music-library updates, playback pause and playback errors.
- Notifications can be cleared and can navigate to their related app.

## Gestures
- Gestures originating on buttons, links, inputs, media and other controls are ignored so they don't accidentally navigate.
- Swiping up from Home opens the app drawer.
- Notification shade supports vertical dismissal and horizontal switching between notifications and control centre.
- Existing Home → Widgets → Drawer gestures remain.

## Validation
- TypeScript/build validation was attempted in the sandbox, but the dependency installation did not complete within the available time. The incomplete `node_modules` directory caused missing type-definition errors; these are environment/dependency-install errors, not confirmed source errors.
- After extracting, run `npm ci` and `npm run build` in Termux before pushing.
