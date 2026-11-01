# Quick Update Cheatsheet for Administrators

Use this guide for the most common website updates.

## 1. How to Add a New Notice to the Notice Board

**File to edit:** `js/data/notices.js`

1. Open `notices.js`.
2. Find the top of the `window.SVCS_DATA.notices = [` list.
3. Copy an existing notice block enclosed in `{ ... },` and paste it right below the `[`.
4. Update the values:
   - `id`: Make it unique (e.g., `"notice-015"`).
   - `date`: Use `YYYY-MM-DD` format (e.g., `"2026-10-05"`). *The website automatically sorts by this date!*
   - `title`: The headline of the notice.
   - `category`: Must be one of: `"General", "Holiday", "Examination", "Admission", "Sports", "Events", "Parent Meeting", "Academic", "Transportation", "Other"`.
   - `type`: Use `"text"`, `"pdf"`, or `"image"`.
   - `file`: If type is pdf/image, provide the path (e.g., `"assets/notices/pdfs/document.pdf"`). Leave as `""` for text.
   - `description`: The short summary.
   - `published`: Set to `true` to make it live, or `false` to hide it as a draft.
5. Save the file.

## 2. How to Add a Job Vacancy

**File to edit:** `js/data/recruitment.js`

1. Open `recruitment.js`.
2. Inside the `vacancies: [` list, copy and paste an existing job block.
3. Update the details (`title`, `department`, `qualification`, `deadline`, etc.).
4. Set `status: "open"`.
5. Save the file. (To remove a job later, just change `status: "closed"`).

## 3. How to Update the School Phone Number or Email

**File to edit:** `js/data/school.js`

1. Open `school.js`.
2. To change the email, locate `contactEmail: "..."` and update it. (This automatically updates all `mailto:` links across the entire site).
3. To change phone numbers, look at the `phoneNumbers` list and update the `"number"` field.
4. Save the file.

## 4. How to Update the Admission Status (Top Banner)

**File to edit:** `js/data/school.js`

1. Open `school.js`.
2. Locate `admissionStatus: "Admission Open for..."` at the bottom of the settings block.
3. Change the text. If admissions are closed, you can change it to `"Admissions currently closed for the 2026-2027 session"`.
4. Save the file.

## 5. How to Add a New Photo to the Gallery

**File to edit:** `js/data/gallery.js`

1. Save your new image into the `assets/images/gallery/` folder on your computer/server.
2. Open `gallery.js`.
3. Add a new line inside the list: `{ url: "assets/images/gallery/my_new_photo.jpg", caption: "Students at the science fair", category: "Events" }`
4. Save the file.
