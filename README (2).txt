PREPARATORY SUITE (not the official test file)
Written during development and run on 17 Nov 2026 in headless Chromium: first run 17 passed / 1 failed (phone-width overflow on the
Resource Library page), then 18 passed after one rule in style.css. The student's official runs of 19 Nov 2026 used ../tests/kms.spec.js with the student's own ../package.json and ../playwright.config.js instead.
This folder's package-lock.json pins @playwright/test 1.63.0 and matches only this folder's package.json (the student's own package.json and package-lock.json are in ../ and are separate).
Run: npm install; npx playwright install chromium; npm test   (serve.js serves ../../04_HTML_Prototype)
