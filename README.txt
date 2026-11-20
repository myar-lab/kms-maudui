PLAYWRIGHT TESTING - KMS Mawdu'i reference prototype
=====================================================
The prototype is three files in ../04_HTML_Prototype/ : index.html, style.css, script.js.

OFFICIAL TEST FILES (used for the student's runs on 19 Nov 2026)
  tests/kms.spec.js      18 tests, T1-T18 (kept exactly as run)
  package.json           the student's own project file: name kms_maudui, script "test": "playwright test", devDependency @playwright/test ^1.65.1
  playwright.config.js   { testDir: './tests', use: { headless: true } }  (no browser project set, so Playwright's default Chromium is used)

OFFICIAL RESULT - RUN 1: npx playwright test --reporter=html
  19 Nov 2026, 3:48:25 PM, VS Code integrated terminal, Chromium: 18 passed, 0 failed, 7.5 s.   Report: evidence/Independent_Run_19Nov2026_Playwright_Report.html
SCREEN RECORDING - RUN 2: npx playwright test --reporter=line  (same file, same config)
  18 passed, 0 failed, 11.7 s; run again to record the process; shown on Canva Slide 15.
Both runs were executed personally by the student. test.js was not used for either run.
Details and limits of the tests: evidence/Independent_Run_19Nov2026_Student_Record.txt

package-lock.json       the student's own lock file from the KMS_Maudui folder where npm install was run: name kms_maudui, @playwright/test locked at 1.65.1
                         (matches package.json: same name and version, 1.65.1 satisfies ^1.65.1). The separate lock file inside preparatory_suite_17Nov2026/
                         belongs to that preparatory suite only (1.63.0) and must not be mixed with this one.

TO RE-RUN: put index.html, style.css, script.js, package.json, package-lock.json, playwright.config.js and the tests folder in one folder; change the "file" path inside
  tests/kms.spec.js (it points to the student's own computer); then: npm install; npx playwright install chromium; npm test
  (or npx playwright test --reporter=html / --reporter=line).

preparatory_suite_17Nov2026/   a separate, preparatory suite (test.js, serve.js, package.json, its own config) written during development and run
                               on 17 Nov 2026. Not the official result. To run: cd into that folder; npm install; npx playwright install chromium; npm test.
evidence/preparatory_17Nov2026_test.js_runs/   output of those preparatory runs (first run 17 passed / 1 failed, then 18 passed after a style.css fix).

The six Resource Library links were checked manually and separately; no Playwright run verifies that the live external websites are online.
