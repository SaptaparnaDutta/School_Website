# SVCS Website — Administrator Confirmation Checklist

The public site has been adjusted not to invent missing official information. Please confirm or supply the following before publication.

## Official information
- [ ] Confirm the official affiliation/board wording and provide the verified affiliation code (the current wording is inherited from the supplied project and should be verified).
- [ ] Supply an approved homepage campus photograph if desired; the hero currently uses a restrained branded fallback instead of a fabricated photograph.
- [ ] Confirm the current admission status, eligible classes, dates, application process and official application URL. The current site directs enquiries to Contact rather than claiming a live application form exists.
- [ ] Confirm principal's name, designation, qualifications, approved welcome message, and a school-approved portrait (if the principal section is to be shown).
- [ ] Verify faculty/staff names, roles, qualifications and permission to publish. The public staff directory is hidden until verified records are supplied.
- [ ] Verify the existence and exact description of each listed facility, including smart boards, laboratories, library, playground and security systems. Facility descriptions are neutral until confirmed.
- [ ] Confirm establishment year and provide an approved school history.
- [ ] Confirm management names, designations and approved biographies, if they should be published.
- [ ] Verify all school phone numbers, email address, office hours and the complete postal address.
- [ ] Confirm official social media accounts. Only the Facebook link supplied in the source data is currently enabled.
- [ ] Confirm homepage claims about safety, facilities, curriculum and teaching; remove or substantiate any claim not approved by the school.

## Photos and documents to supply
- [ ] Principal portrait: `assets/images/principal.jpg` (missing from the archive).
- [ ] Facility photos referenced in `js/data/facilities.js`: `assets/images/facilities/classroom.jpg`, `science_lab.jpg`, `computer_lab.jpg`, `library.jpg`, `playground.jpg`, and `security.jpg`.
- [ ] Event photos referenced in `js/data/events.js`: `assets/images/events/teachers_day.jpg` and `puja_fair.jpg`.
- [ ] Verified achievement images previously referenced by the source: `assets/images/gallery/board_toppers.jpg` and `quiz_trophy.jpg`; supply only with approved captions and substantiated achievement details.
- [ ] Notice files referenced in `js/data/notices.js`: `assets/notices/pdfs/durga_puja_schedule_2026.pdf`, `assets/notices/pdfs/ptm_august_2026.pdf`, `assets/notices/images/sports_meet_schedule.jpg`, and `assets/notices/images/independence_day_2026.jpg`. The archive does not contain the `assets/notices/` directory. Verify whether the notices remain current before republishing them.
- [ ] Review the supplied gallery photos for permission, accurate captions and student privacy.

## Time-sensitive content
- [ ] Confirm whether any new events should be announced. Events dated 5 September and 15 October 2026 are in the past and are not shown as upcoming.
- [ ] Confirm current recruitment needs. Vacancies whose application deadlines have passed are hidden from the active vacancy list; do not reopen them without approval.
- [ ] Review all 2026 notices and remove/update only after checking official records. Historical notices remain in source data, but missing PDF/image attachments must be supplied.

## Technical publication checks
- [ ] Confirm `https://svcschakdaha.com/` is the canonical production domain. Update canonical tags, Open Graph URLs and sitemap if the live domain differs.
- [ ] Confirm the existing Google Maps embed points to the correct campus entrance.
- [ ] If email enquiries must be stored or delivered without the visitor's email application, approve and configure a real form service/backend. The current form only prepares a `mailto:` message and does not submit data to a server.
