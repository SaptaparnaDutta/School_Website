# SVCS Website Improvement — QA Test Report

## Passed
- JavaScript syntax validation: `node --check` passed for all 12 JavaScript source/data files.
- HTML structure audit: all 7 HTML pages contain a `<main>` landmark; no duplicate element IDs were detected.
- Local HTML-linked file audit: no missing HTML-linked local CSS, JavaScript, HTML or other checked local references.
- CSS syntax audit: all 10 stylesheets passed a top-level parse check with `tinycss2`.
- Local HTTP smoke test: all seven HTML pages, the global stylesheet, primary JavaScript, school settings data and school logo returned HTTP 200 from Python's static HTTP server.
- Date logic review: upcoming event rendering filters out dates before the visitor's current local date; active recruitment rendering excludes records with past application deadlines.
- Contact form code review: sender name, sender email, phone, subject and message are included in a `mailto:` body using `encodeURIComponent`; form uses browser validation and displays an explicit notice that the site has not sent or stored the enquiry.
- Map-link code review: address links and directions are generated from central school settings and open in a new tab with `rel="noopener noreferrer"`.
- SEO: homepage canonical URL now uses the root URL `https://svcschakdaha.com/`, consistent with homepage Open Graph URL.

## Failed
- No static syntax or local HTTP smoke checks failed.

## Not run / limitations
- Full interactive browser QA (mobile menu keyboard sequence, real touch-target inspection, visual breakpoints, map iframe rendering, and end-to-end form submit in a configured email client) could not be completed. A headless Chromium attempt hung in this execution environment; it is not counted as a passing browser test.
- Automated accessibility tree/contrast audit was not run. Visible focus styling and reduced-motion handling are implemented, but manual assistive-technology testing is still recommended.
- Real email delivery is not tested or claimed. The form prepares an email for the visitor's email application only.
- The Google Maps embed was not verified interactively against the physical campus entrance.
- Missing image and document assets remain administrator dependencies; missing local images use a neutral fallback where rendered as `<img>`.

## Missing supplied assets confirmed against the archive
- `assets/images/principal.jpg` (not currently used for public rendering while principal details are unconfirmed).
- `assets/images/facilities/classroom.jpg`
- `assets/images/facilities/science_lab.jpg`
- `assets/images/facilities/computer_lab.jpg`
- `assets/images/facilities/library.jpg`
- `assets/images/facilities/playground.jpg`
- `assets/images/facilities/security.jpg`
- `assets/images/events/teachers_day.jpg`
- `assets/images/events/puja_fair.jpg`
- `assets/images/gallery/board_toppers.jpg` and `assets/images/gallery/quiz_trophy.jpg` were referenced by removed, unverified achievement records; supply only if approved and factually substantiated.
- Notice attachment files referenced in source data are absent: `assets/notices/pdfs/durga_puja_schedule_2026.pdf`, `assets/notices/pdfs/ptm_august_2026.pdf`, `assets/notices/images/sports_meet_schedule.jpg`, `assets/notices/images/independence_day_2026.jpg`. These attachments are no longer linked from notice records; corresponding notice text is retained.

See `ADMIN_CHECKLIST_BEFORE_PUBLICATION.md` for the full administrator confirmation list.
