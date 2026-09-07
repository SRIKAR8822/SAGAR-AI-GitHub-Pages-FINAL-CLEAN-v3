# Recovery status

## Included
- Captured landing-page HTML snapshot
- Captured CSS
- Captured JavaScript chunks loaded by the preview
- Captured font files
- Recovered SAGAR AI logo image
- Static HTML snapshots for `main-dashboard/` and `sign-up-login-screen/`
- `.nojekyll` for GitHub Pages

## Path corrections in this final package
- Root `index.html`: `../_next/...` → `./_next/...`
- Root `index.html`: `../assets/...` → `./assets/...`
- Root internal route links point to `./main-dashboard/` and `./sign-up-login-screen/`
- Captured Next Image optimizer URLs for the app logo are replaced with the recovered local logo file
- Nested route pages retain `../_next/...` because they are under their own route directories

## Not recoverable from the HAR
The original Rocket project source tree, package.json, React source components, and certain route-specific JS response bodies were not present in the captured response bodies. Those cannot be recreated faithfully from the HAR alone.


## v4 FINAL GitHub Pages path fix
- Removed incorrect `<base>` tags from nested pages so relative CSS/JS/font/image paths resolve inside the project site.
- Corrected project-relative home link on the sign-in page.
- Corrected homepage links from old Rocket route suffixes to `/sign-up-login-screen/` and `/main-dashboard/`.
- Cleaned remaining Next image-preload path remnants.


## Demo authentication
The sign-in page includes frontend-only demo account creation and sign-in. Accounts are stored in the browser localStorage and redirect to `../main-dashboard/`. No real server/database authentication is included.
