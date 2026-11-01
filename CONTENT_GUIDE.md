# SVCS Content Management Guide

Welcome to the Swami Vivekananda Centenary School static content guide. This website is built without a backend or database to ensure high performance, top-tier security, and zero server maintenance costs. 

As an administrator, you can update the entire website's content by simply editing the simple data files located in the `js/data/` folder.

## The Architecture

The website uses a "Static Data Injection" pattern. 
1. The raw text and data live in JavaScript files (e.g., `js/data/school.js`, `js/data/notices.js`).
2. When a visitor loads a page, the browser automatically pulls that data and injects it into the beautiful design layout.

This means **you never have to edit the complex HTML or CSS code** to change text, add notices, or post job vacancies.

## Data Files Overview

All data files are located in `js/data/`.

| File | What it controls |
|------|------------------|
| `school.js` | School name, phone numbers, email, address, social links, admission status. |
| `notices.js` | The entire Notice Board system (active notices and archives). |
| `recruitment.js` | Teacher and staff job vacancies on the Contact page. |
| `events.js` | The upcoming events calendar on the Home page. |
| `about.js` | Principal's message, school history, vision, and core values. |
| `academics.js` | Subjects, syllabus overview, and academic calendar. |
| `facilities.js` | Infrastructure details, classrooms, and labs. |
| `achievements.js` | Board examination results and inter-school competition trophies. |
| `faculty.js` | Teacher profiles listed on the Academics page. |
| `gallery.js` | Photo gallery images and captions. |
| `testimonials.js` | Parent and alumni reviews. |

## How to Edit a Data File

1. Open the relevant file in any plain text editor (e.g., VS Code, Notepad).
2. Locate the text you want to change.
3. Update the text **inside the quotation marks**.
4. Save the file.
5. Refresh the website in your browser to see the changes instantly.

### Important Rules
* **Quotes**: Always keep text inside straight double quotes `""` or single quotes `''`.
* **Commas**: If you are editing a list, make sure there is a comma `,` at the end of every item except the last one.
* **Special Characters**: If you need to use a quote inside your text, use the other type of quote (e.g., `"The principal's desk"`).

## Asset Organization (Images & PDFs)

When you want to add a new image or PDF (e.g., for a new notice or gallery photo), save the file in the appropriate folder under `assets/`:

* `assets/images/gallery/` - For general school photos.
* `assets/images/events/` - For event thumbnail photos.
* `assets/images/facilities/` - For campus infrastructure photos.
* `assets/notices/pdfs/` - For Notice Board PDF documents.
* `assets/notices/images/` - For Notice Board image documents.

After placing the file in the folder, reference its path in the data file. For example:
`"file": "assets/notices/pdfs/my_new_notice.pdf"`

## Troubleshooting

If the website suddenly stops showing data or the layout breaks after you made a change:
1. **Check for syntax errors:** Did you accidentally delete a quote `"` or a comma `,`?
2. **Check the console:** Right-click on the website, select "Inspect", and go to the "Console" tab. The system has a built-in validation script that will warn you if it detects formatting errors in your data files.
