# SAGAR AI — GitHub Pages package

This is a clean static package reconstructed from the Chrome DevTools HAR captured while the SAGAR AI Rocket preview was loaded.

## Upload
Upload the **contents of this folder** to the root of a new GitHub repository. Do not upload the ZIP itself and do not put the contents inside an extra folder.

Required root items include `.nojekyll`, `index.html`, `_next/`, `assets/`, `main-dashboard/`, and `sign-up-login-screen/`.

## GitHub Pages
Use Settings → Pages → Deploy from a branch → `main` → `/ (root)`.

The root landing page has been patched to use `./_next/...` and `./assets/...` so it works from a repository project URL such as `/Sagar-ai-site/`. Nested route pages use `../_next/...` because they live one directory below the repository root.

## Recovery limitation
This contains recovered deployed/browser assets, not the original Rocket source project. The HAR did not expose the original React component tree/package.json/source maps, and some route-specific JavaScript response bodies were not recoverable. The landing page HTML/CSS and recovered browser assets are preserved; backend/API features that require a Next.js server are not converted into GitHub Pages server functionality.
