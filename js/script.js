/**
 * Swami Vivekananda Centenary School (SVCS)
 * Core Interactivity & Dynamic Layout Script (js/script.js)
 */

document.addEventListener("DOMContentLoaded", () => {
  // Check if centralized data exists
  if (!window.SVCS_DATA || !window.SVCS_DATA.settings) {
    console.error("SVCS school data source is missing or failed to load. Please ensure all data scripts are included.");
    return;
  }

  // Validate critical data structures for admin sanity
  validateSVCSData(window.SVCS_DATA);

  const data = window.SVCS_DATA;
  const settings = data.settings;

  // Replace broken local image references with a calm, non-deceptive fallback.
  document.addEventListener("error", (event) => {
    const image = event.target;
    if (!(image instanceof HTMLImageElement) || image.dataset.fallbackApplied === "true") return;
    image.dataset.fallbackApplied = "true";
    image.alt = image.alt || "School image not yet supplied";
    image.src = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400"><rect width="640" height="400" fill="#E7EFE9"/><path d="M0 310L160 190l100 78 110-125 270 167v90H0z" fill="#D7E2D9"/><rect x="225" y="145" width="190" height="165" rx="4" fill="#FFFFFF" stroke="#18324B" stroke-width="5"/><path d="M205 150l115-75 115 75" fill="none" stroke="#C8953C" stroke-width="10"/><g fill="#18324B"><rect x="250" y="175" width="35" height="35"/><rect x="355" y="175" width="35" height="35"/><rect x="250" y="230" width="35" height="35"/><rect x="355" y="230" width="35" height="35"/></g><rect x="300" y="250" width="40" height="60" fill="#C8953C"/><text x="320" y="355" font-family="Arial,sans-serif" font-size="18" text-anchor="middle" fill="#18324B">School image unavailable</text></svg>'
    );
    image.classList.add("neutral-image-fallback");
  }, true);

  // Initialize all global bindings
 // Initialize all global bindings
injectGlobalSettings(settings);

initNavigation();
initScrollEffects();
initModals();

// First render all dynamic page content
initHomePage();
initAboutPage();
initAcademicsPage();
initFacilitiesPage();
initHomeEvents();
initNoticeBoard();
initContactPage();
initRecruitment();
initGalleryPage();
initFloatingAdmission();

// Start scroll reveal after dynamic elements are created
initIntersectionObserver();
});

/**
 * 0. Data Validation (Admin Sanity Check)
 * Verifies that critical content structures exist and logs clear warnings.
 */
function validateSVCSData(data) {
  const warnings = [];
  
  if (!data.settings || !data.settings.schoolName) warnings.push("Missing: schoolName in settings.");
  if (!data.about || !data.about.introduction) warnings.push("Missing: About Us introduction text.");
  if (!data.notices || !Array.isArray(data.notices)) warnings.push("Missing or invalid: Notice Board data.");
  if (!data.events || !Array.isArray(data.events)) warnings.push("Missing or invalid: Events data.");
  if (!data.recruitment || !data.recruitment.vacancies) warnings.push("Missing or invalid: Recruitment data.");

  if (warnings.length > 0) {
    console.warn("SVCS Data Validation Warnings (Please check data files):", warnings);
  } else {
    console.log("SVCS Data Validation Passed.");
  }
}

/**
 * 1. Dynamic Layout Settings Injection
 * Injects static text and hyperlinks from js/data.js to avoid code duplication.
 */
function injectGlobalSettings(settings) {
  // Bind School Name
  document.querySelectorAll(".school-name").forEach(el => {
    el.textContent = settings.schoolName;
  });

  // Bind Tagline
  document.querySelectorAll(".school-tagline").forEach(el => {
    el.textContent = settings.tagline;
  });

  // Bind Affiliation
  document.querySelectorAll(".school-board").forEach(el => {
    el.textContent = settings.boardAffiliation;
  });

  // Bind Admission Announcement top-bar text
  const admissionBarText = document.getElementById("admissionBarText");
  if (admissionBarText) {
    admissionBarText.textContent = settings.admissionStatus;
  }

  // Bind Contact Email Anchors
  document.querySelectorAll(".school-email").forEach(el => {
    el.textContent = settings.contactEmail;
    if (el.tagName === "A") {
      el.href = `mailto:${settings.contactEmail}`;
    }
  });

  // Address text and map links are driven by the central school settings.
  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${settings.schoolName}, ${settings.address.full}, ${settings.address.country || "India"}`)}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${settings.schoolName}, ${settings.address.full}, ${settings.address.country || "India"}`)}`;
  document.querySelectorAll(".school-address").forEach(el => {
    const addressText = `${settings.address.full}${settings.address.country ? `, ${settings.address.country}` : ""}`;
    const parentLink = el.closest("a");
    if (parentLink) {
      el.textContent = addressText;
      parentLink.href = mapSearchUrl; parentLink.target = "_blank"; parentLink.rel = "noopener noreferrer";
      parentLink.setAttribute("aria-label", "View school address on Google Maps");
    } else if (el.tagName === "A") {
      el.textContent = addressText; el.href = mapSearchUrl; el.target = "_blank"; el.rel = "noopener noreferrer";
      el.setAttribute("aria-label", "View school address on Google Maps");
    } else {
      const link = document.createElement("a");
      link.className = "school-address-link"; link.href = mapSearchUrl; link.target = "_blank"; link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", "View school address on Google Maps"); link.textContent = addressText;
      el.replaceWith(link);
    }
  });
  document.querySelectorAll(".school-location-link").forEach(link => {
    link.href = mapSearchUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
  document.querySelectorAll(".school-directions-link").forEach(link => {
    link.href = directionsUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });
  // Make location-pin controls usable by mouse, touch and keyboard.
  document.querySelectorAll(".contact-info-icon").forEach(icon => {
    if (!icon.textContent.includes("📍") || icon.querySelector("a")) return;
    const link = document.createElement("a");
    link.href = mapSearchUrl; link.target = "_blank"; link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", "View school location on Google Maps");
    link.textContent = icon.textContent.trim();
    icon.replaceChildren(link);
  });

  // Bind Timings text
  document.querySelectorAll(".school-timings").forEach(el => {
    el.textContent = `${settings.officeHours.days}, ${settings.officeHours.timing}`;
  });

  // Bind Office hours details
  const officeHoursElement = document.getElementById("officeHours");
  if (officeHoursElement) {
    officeHoursElement.innerHTML = `<strong>Timings:</strong> ${settings.officeHours.days} (${settings.officeHours.timing})`;
  }

  // Bind Phone numbers to top bars and links dynamically
  const phoneListContainer = document.getElementById("topBarPhoneList");
  if (phoneListContainer && settings.phoneNumbers && settings.phoneNumbers.length > 0) {
    // Top-bar shows the first primary phone number as quick link
    const primaryPhone = settings.phoneNumbers[0];
    phoneListContainer.innerHTML = `<a href="tel:+91${primaryPhone.number}">📞 Call: +91 ${primaryPhone.number}</a>`;
  }

  // Bind Social Links in footer — inject proper Facebook SVG icon
  const fbLink = document.getElementById("footerFacebookLink");
  if (fbLink) {
    if (settings.socialLinks.facebook && settings.socialLinks.facebook !== "TBD") {
      fbLink.href = settings.socialLinks.facebook;
      fbLink.title = "Follow us on Facebook";
      fbLink.style.display = "grid";
      // Replace text "F" with the official Facebook SVG icon
      fbLink.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
      </svg>`;
    } else {
      fbLink.style.display = "none";
    }
  }

  document.querySelectorAll('a[href="#"]').forEach(link => {
    if (link.id === "footerFacebookLink" && settings.socialLinks.facebook && settings.socialLinks.facebook !== "TBD") return;
    if (link.classList.contains("footer-social-icon") || link.getAttribute("aria-label")?.toLowerCase().includes("social")) {
      link.hidden = true;
      link.removeAttribute("href");
    }
  });

  // Inject logo image into all .logo-mark elements
  if (settings.logoPath) {
    document.querySelectorAll(".logo-mark").forEach(el => {
      el.innerHTML = `<img src="${settings.logoPath}" alt="SVCS School Logo" class="logo-img" />`;
    });
  }
}

/**
 * 2. Responsive Navigation System
 * Controls mobile hamburger toggles, overlay click closes, and keyboard trapping.
 */
function initNavigation() {
  const menuToggle = document.getElementById("menuToggle");
  const mobileNavOverlay = document.getElementById("mobileNavOverlay");
  const mobileNavMenu = document.getElementById("mobileNavMenu");
  const mobileNavClose = document.getElementById("mobileNavClose");

  if (!menuToggle || !mobileNavOverlay || !mobileNavMenu || !mobileNavClose) return;

  const openMobileMenu = () => {
    mobileNavOverlay.classList.add("open");
    mobileNavMenu.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");
    mobileNavClose.focus();
  };

  const closeMobileMenu = () => {
    mobileNavOverlay.classList.remove("open");
    mobileNavMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.focus();
  };

  menuToggle.addEventListener("click", openMobileMenu);
  mobileNavClose.addEventListener("click", closeMobileMenu);
  mobileNavOverlay.addEventListener("click", closeMobileMenu);

  // Keyboard Escape listener
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNavMenu.classList.contains("open")) {
      closeMobileMenu();
    }
  });
}

/**
 * 3. Scroll Effects (Sticky Header, Scroll progress, Back to top)
 */
function initScrollEffects() {
  const header = document.getElementById("header");
  const backToTop = document.getElementById("backToTop");

  if (!header && !backToTop) return;

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;

    // Sticky scrolled header transition
    if (header) {
      if (scrollPos > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }

    // Back to top visibility
    if (backToTop) {
      if (scrollPos > 400) {
        backToTop.classList.add("visible");
      } else {
        backToTop.classList.remove("visible");
      }
    }
  });

  // Top scroll listener click
  if (backToTop) {
    backToTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

/**
 * 4. Intersection Observer for Entrance Transitions
 */
function initIntersectionObserver() {
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length === 0) return;

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target); // Trigger once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  reveals.forEach(el => revealObserver.observe(el));
}

/**
 * 5. Global Modal Framework Handles
 */
function initModals() {
  const modalOverlay = document.getElementById("globalModal");
  const modalClose = document.getElementById("modalClose");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  if (!modalOverlay || !modalClose || !modalTitle || !modalBody) return;

  let lastFocusedElement = null;

  // Open utility function exposed on window
  window.SVCS_MODAL = {
    open: (title, contentHtml) => {
      lastFocusedElement = document.activeElement;
      modalTitle.textContent = title;
      modalBody.innerHTML = contentHtml;
      modalOverlay.classList.add("open");
      document.body.style.overflow = "hidden"; // Freeze scroll
      modalClose.focus();
    },
    close: () => {
      modalOverlay.classList.remove("open");
      document.body.style.overflow = ""; // Unfreeze scroll
      modalBody.innerHTML = ""; // Clear body
      if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
      }
    }
  };

  modalClose.addEventListener("click", window.SVCS_MODAL.close);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      window.SVCS_MODAL.close();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalOverlay.classList.contains("open")) {
      window.SVCS_MODAL.close();
    }
  });
}

/**
 * 6. About Page Specific Bindings
 */
function initAboutPage() {
  const data = window.SVCS_DATA;
  if (!data || !data.about) return;

  // Texts
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };
  
  setText("aboutIntroductionText", data.about.introduction);
  const yearKnown = Boolean(data.about.establishmentYear && data.about.establishmentYear !== "TBD");
  const yearHeading = document.getElementById("aboutEstablishmentHeading");
  if (yearHeading) yearHeading.hidden = !yearKnown;
  setText("aboutEstYear", yearKnown ? data.about.establishmentYear : "");
  const historyText = data.about.history && !data.about.history.includes("to be provided") ? data.about.history : "";
  const historyEl = document.getElementById("aboutHistoryText");
  if (historyEl) {
    historyEl.textContent = historyText;
    if (!historyText) historyEl.closest(".history-section")?.setAttribute("hidden", "hidden");
  }
  setText("aboutVisionText", data.about.vision);
  setText("aboutMissionText", data.about.mission);
  setText("aboutCampusDesc", data.about.campusDescription);

  // Core Values
  const valuesList = document.getElementById("aboutValuesList");
  if (valuesList && data.about.coreValues) {
    valuesList.innerHTML = data.about.coreValues
      .map(val => `<span class="value-tag">${val}</span>`)
      .join("");
  }

  // Principal Message
  if (data.principalMessage) {
    const principalKnown = Boolean(data.principalMessage.name && data.principalMessage.name !== "TBD");
    const profile = document.querySelector(".about-principal-section");
    if (profile && !principalKnown) profile.hidden = true;
    setText("aboutPrincipalName", principalKnown ? data.principalMessage.name : "");
    setText("aboutPrincipalRole", principalKnown ? (data.principalMessage.designation || "") : "");
    setText("aboutPrincipalQual", principalKnown ? (data.principalMessage.qualification || "") : "");
    
    const msgEl = document.getElementById("aboutPrincipalMessage");
    if (msgEl) {
      msgEl.innerHTML = `<p>${data.principalMessage.fullMessage}</p>`;
    }
  }

  // Management List
  const mgmtList = document.getElementById("aboutManagementList");
  if (mgmtList && data.about.management) {
    const managementSection = mgmtList.closest("section");
    if (managementSection) managementSection.hidden = data.about.management.length === 0;
    mgmtList.innerHTML = data.about.management.map(person => `
      <div class="management-card">
        <div class="management-avatar">👤</div>
        <div class="management-info">
          <h4>${person.name}</h4>
          <span class="designation">${person.designation}</span>
          <p>${person.bio}</p>
        </div>
      </div>
    `).join("");
  }

  // Why Choose Us List
  const whyList = document.getElementById("aboutWhyChooseList");
  if (whyList && data.about.whyChooseUs) {
    whyList.innerHTML = data.about.whyChooseUs.map(item => `
      <div class="why-choose-card">
        <div class="why-choose-icon">${item.icon}</div>
        <div class="why-choose-text">
          <h4>${item.title}</h4>
          <p>${item.description}</p>
        </div>
      </div>
    `).join("");
  }
}

/**
 * 7. Academics Page Specific Bindings
 */
function initAcademicsPage() {
  const data = window.SVCS_DATA;
  if (!data || !data.academics) return;

  const ac = data.academics;

  // Texts
  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setText("acadOverview", ac.overview);
  setText("acadBoard", ac.curriculum?.board);
  setText("acadCurriculumDesc", ac.curriculum?.description);
  setText("acadSportsDesc", ac.sports);

  // Grade Structure
  const gradeGrid = document.getElementById("acadGradeGrid");
  if (gradeGrid && ac.gradeLevels) {
    gradeGrid.innerHTML = ac.gradeLevels.map(grade => `
      <div class="grade-card">
        <h3>${grade.stage}</h3>
        <span class="grade-range">${grade.grades}</span>
        <p>${grade.description}</p>
      </div>
    `).join("");
  }

  // Teaching Methodology
  const methodGrid = document.getElementById("acadMethodGrid");
  if (methodGrid && ac.teachingMethodology) {
    methodGrid.innerHTML = ac.teachingMethodology.map((method, index) => {
      const icons = ["💡", "💻", "🔬", "🤝"];
      const icon = icons[index % icons.length];
      return `
        <div class="method-item">
          <div class="method-icon">${icon}</div>
          <div class="method-text">
            <h4>${method.title}</h4>
            <p>${method.description}</p>
          </div>
        </div>
      `;
    }).join("");
  }

  // Subjects
  const subjectsGrid = document.getElementById("acadSubjectsGrid");
  if (subjectsGrid && ac.subjects) {
    const renderSubjectGroup = (title, subjects) => {
      if (!subjects || subjects.length === 0) return "";
      return `
        <div class="subject-group">
          <h4>${title}</h4>
          <ul>
            ${subjects.map(s => `<li>${s}</li>`).join("")}
          </ul>
        </div>
      `;
    };
    
    subjectsGrid.innerHTML = 
      renderSubjectGroup("Primary", ac.subjects.primary) +
      renderSubjectGroup("Middle School", ac.subjects.middle) +
      renderSubjectGroup("Secondary", ac.subjects.secondary) +
      renderSubjectGroup("Senior Secondary", ac.subjects.seniorSecondary);
  }

  // Assessment Timeline
  const assessTimeline = document.getElementById("acadAssessmentTimeline");
  if (assessTimeline && ac.assessment) {
    assessTimeline.innerHTML = ac.assessment.map((item, idx) => {
      const icons = ["📝", "✏️", "🔬", "📈"];
      const icon = icons[idx % icons.length];
      return `
        <div class="assessment-step">
          <div class="assessment-step-icon">${icon}</div>
          <h4>${item.title}</h4>
          <p>${item.description}</p>
        </div>
      `;
    }).join("");
  }

  // Co-Curricular
  const coCurrList = document.getElementById("acadCoCurricularList");
  if (coCurrList && ac.coCurricular) {
    coCurrList.innerHTML = ac.coCurricular.map(item => `
      <div class="activity-card">
        <span class="activity-icon">${item.icon}</span>
        <span>${item.title}</span>
      </div>
    `).join("");
  }

  // Student Development
  const devList = document.getElementById("acadDevList");
  if (devList && ac.studentDevelopment) {
    devList.innerHTML = ac.studentDevelopment.map(item => `<li>${item}</li>`).join("");
  }

  // Academic Calendar
  const calTbody = document.getElementById("acadCalendarTbody");
  if (calTbody && ac.calendar) {
    calTbody.innerHTML = ac.calendar.map(item => `
      <tr>
        <td>${item.month}</td>
        <td>${item.events}</td>
      </tr>
    `).join("");
  }

  // Faculty Directory
  const facultyGrid = document.getElementById("facultyDirectoryContainer");
  if (facultyGrid && data.faculty) {
    const facultySection = facultyGrid.closest(".faculty-section");
    if (facultySection) facultySection.hidden = data.faculty.length === 0;
    facultyGrid.innerHTML = data.faculty.map(member => `
      <div class="faculty-card">
        <div class="faculty-photo">👤</div>
        <div class="faculty-info">
          <h4>${member.name}</h4>
          <span class="faculty-designation">${member.designation}</span>
          <div class="faculty-subject">${member.subject}</div>
          <div class="faculty-qual">${member.qualification}</div>
        </div>
      </div>
    `).join("");
  }
}

/**
 * 8. Facilities Page Specific Bindings
 */
function initFacilitiesPage() {
  const data = window.SVCS_DATA;
  if (!data || !data.facilitiesPage) return;

  const fp = data.facilitiesPage;

  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el && text) el.textContent = text;
  };

  // Campus introduction
  setText("facCampusIntro", fp.campusIntro);

  // Classrooms
  if (fp.classrooms) {
    setText("facClassroomTitle", fp.classrooms.title);
    setText("facClassroomDesc", fp.classrooms.description);
    const featuresEl = document.getElementById("facClassroomFeatures");
    if (featuresEl && fp.classrooms.features) {
      featuresEl.innerHTML = fp.classrooms.features
        .map(f => `<div class="classroom-feature-tag">${f}</div>`)
        .join("");
    }
  }

  // Laboratories
  const labsGrid = document.getElementById("facLabsGrid");
  if (labsGrid && fp.laboratories) {
    labsGrid.innerHTML = fp.laboratories.map(lab => `
      <div class="lab-card">
        <span class="lab-icon">${lab.icon}</span>
        <h3>${lab.title}</h3>
        <p>${lab.description}</p>
      </div>
    `).join("");
  }

  // Library
  if (fp.library) {
    setText("facLibraryTitle", fp.library.title);
    setText("facLibraryDesc", fp.library.description);
  }

  // Sports
  if (fp.sports) {
    setText("facSportsTitle", fp.sports.title);
    setText("facSportsDesc", fp.sports.description);
    const activitiesEl = document.getElementById("facSportsActivities");
    if (activitiesEl && fp.sports.activities) {
      activitiesEl.innerHTML = fp.sports.activities
        .map(a => `<span class="sport-tag">${a}</span>`)
        .join("");
    }
  }

  // Arts
  if (fp.arts) {
    setText("facArtsTitle", fp.arts.title);
    setText("facArtsDesc", fp.arts.description);
  }

  // Student Services
  const servicesGrid = document.getElementById("facServicesGrid");
  if (servicesGrid && fp.studentServices) {
    servicesGrid.innerHTML = fp.studentServices.map(svc => `
      <div class="service-card">
        <span class="service-icon">${svc.icon}</span>
        <h4>${svc.title}</h4>
        <p>${svc.description}</p>
      </div>
    `).join("");
  }

  // Technology
  if (fp.technology) {
    setText("facTechTitle", fp.technology.title);
    setText("facTechDesc", fp.technology.description);
  }

  // Safety
  if (fp.safety) {
    setText("facSafetyTitle", fp.safety.title);
    setText("facSafetyDesc", fp.safety.description);
    const systemsEl = document.getElementById("facSafetySystems");
    if (systemsEl && fp.safety.systems) {
      systemsEl.innerHTML = fp.safety.systems
        .map(s => `<div class="safety-item">${s}</div>`)
        .join("");
    }
  }

const galleryMosaic = document.getElementById("facGalleryMosaic");

if (galleryMosaic && data.gallery) {

  // Facilities page-specific image replacements
  const imageOverrides = {

    // Smart Classroom replaced with Arts & Culture
    "assets/images/gallery/smartclassroom_1.jpeg": {
      url: "assets/images/gallery/arts_culture_2.jpeg",
      caption: "Arts & Cultural Activities",
      alt: "Students participating in arts and cultural activities"
    },

    // Independence Day image replaced ONLY in Facilities
    "assets/images/gallery/independencecultural_1.jpeg": {
      url: "assets/images/facilities/independence_day_2.jpeg",
      caption: "Independence Day Celebration",
      alt: "Students celebrating Independence Day at SVCS"
    },

    // Annual Sports image replaced ONLY in Facilities
    "assets/images/gallery/annualsports_1.jpeg": {
      url: "assets/images/facilities/annual_sports_2.jpeg",
      caption: "Annual Sports Day",
      alt: "Students participating in annual sports activities at SVCS"
    }

  };

  galleryMosaic.innerHTML = data.gallery.map((item, idx) => {

    const override = imageOverrides[item.url];

    const imageUrl = override
      ? override.url
      : item.url;

    const imageCaption = override
      ? override.caption
      : item.caption;

    const imageAlt = override
      ? override.alt
      : (item.alt || item.caption || "School campus photograph");

    const isFeatured = idx === 0;

    return `
      <div class="gallery-item ${isFeatured ? "featured" : ""}">

        <img
          src="${imageUrl}"
          alt="${imageAlt}"
          loading="lazy"
          decoding="async"
        >

        <div class="gallery-caption">
          ${imageCaption}
        </div>

      </div>
    `;

  }).join("");

}
}

/* ============================================================================
   9. NOTICE BOARD SYSTEM
   ============================================================================
   Central notice board logic: sorting, current/archive split, search,
   category/year filters, New badge, featured notices, and viewer modal.
   ============================================================================ */

/** Editable constant: notices published within this many days get a "New" badge */
const NEW_NOTICE_DAYS = 7;

/** Maximum number of current (non-archive) notices shown */
const MAX_CURRENT_NOTICES = 5;

/** Supported notice categories (centralised) */
const NOTICE_CATEGORIES = [
  "General", "Holiday", "Examination", "Admission", "Sports",
  "Events", "Parent Meeting", "Academic", "Transportation", "Other"
];

/**
 * Parse a YYYY-MM-DD date string safely, avoiding timezone shifts.
 * Returns a Date object set to local midnight, or null if invalid.
 */
function parseNoticeDate(dateStr) {
  if (!dateStr || typeof dateStr !== "string") return null;
  const parts = dateStr.split("-");
  if (parts.length !== 3) return null;
  const y = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10) - 1;
  const d = parseInt(parts[2], 10);
  if (isNaN(y) || isNaN(m) || isNaN(d)) return null;
  return new Date(y, m, d);
}

/**
 * Format a Date object as a human-readable string: "3 September 2026"
 */
function formatNoticeDate(date) {
  if (!date || !(date instanceof Date) || isNaN(date)) return "Unknown Date";
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Determine whether a notice qualifies for the "New" badge.
 */
function isNoticeNew(dateStr) {
  const noticeDate = parseNoticeDate(dateStr);
  if (!noticeDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffMs = today - noticeDate;
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= NEW_NOTICE_DAYS;
}

/**
 * Validate a single notice object for required fields.
 * Returns true if the notice has enough data to render safely.
 */
function isValidNotice(notice) {
  return notice && typeof notice.id === "string" && typeof notice.title === "string" && notice.title.trim() !== "";
}

/**
 * Get published, valid notices sorted by date descending.
 */
function getPublishedNotices(allNotices) {
  if (!Array.isArray(allNotices)) return [];
  return allNotices
    .filter(n => n.published === true && isValidNotice(n))
    .sort((a, b) => {
      const da = parseNoticeDate(a.date);
      const db = parseNoticeDate(b.date);
      if (!da && !db) return 0;
      if (!da) return 1;
      if (!db) return -1;
      return db - da;
    });
}

/**
 * Get the type CSS class for a notice type badge.
 */
function getTypeClass(type) {
  if (type === "pdf") return "type-pdf";
  if (type === "image") return "type-image";
  return "";
}

/**
 * Get the display label for a notice type.
 */
function getTypeLabel(type) {
  if (type === "pdf") return "PDF";
  if (type === "image") return "Image";
  return "Text";
}

/**
 * Open the notice viewer modal for a given notice.
 */
function openNoticeViewer(notice) {
  if (!window.SVCS_MODAL) return;

  const date = parseNoticeDate(notice.date);
  const dateStr = formatNoticeDate(date);
  const isNew = isNoticeNew(notice.date);
  const category = notice.category || "Other";
  const type = notice.type || "text";
  const file = notice.file || "";
  const desc = notice.description || "";

  let contentHtml = `
    <div class="notice-viewer-meta">
      <span class="notice-date">${dateStr}</span>
      <span class="notice-category-tag">${category}</span>
      <span class="notice-type-tag ${getTypeClass(type)}">${getTypeLabel(type)}</span>
      ${isNew ? '<span class="badge-new">New</span>' : ''}
    </div>
  `;

  if (desc) {
    contentHtml += `<p class="notice-viewer-desc">${desc}</p>`;
  }

  if (type === "image" && file) {
    contentHtml += `
      <img
        class="notice-viewer-image"
        src="${file}"
        alt="Notice: ${notice.title}"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
      />
      <div class="notice-viewer-fallback" style="display:none;">
        <p>Unable to load the notice image.</p>
      </div>
    `;
  } else if (type === "pdf" && file) {
    contentHtml += `
      <div class="notice-viewer-pdf-container">
        <iframe src="${file}" title="Notice PDF: ${notice.title}"></iframe>
      </div>
      <div class="notice-viewer-actions">
        <a href="${file}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="font-size:1.3rem;padding:0.8rem 1.6rem;">
          Open PDF in New Tab
        </a>
        <a href="${file}" download class="btn btn-outline" style="font-size:1.3rem;padding:0.8rem 1.6rem;">
          Download PDF
        </a>
      </div>
    `;
  }

  window.SVCS_MODAL.open(notice.title, contentHtml);
}

/**
 * Render a featured notice card (HTML string).
 */
function renderFeaturedNotice(notice) {
  const date = parseNoticeDate(notice.date);
  const dateStr = formatNoticeDate(date);
  const isNew = isNoticeNew(notice.date);
  const type = notice.type || "text";
  const desc = notice.description || "";

  return `
    <div class="notice-featured" onclick="openNoticeViewer(window._nbNoticeMap['${notice.id}'])" tabindex="0" role="button" aria-label="View notice: ${notice.title}">
      <div class="notice-meta">
        <span class="notice-date">${dateStr}</span>
        <span class="notice-category-tag">${notice.category || 'Other'}</span>
        ${isNew ? '<span class="badge-new">New</span>' : ''}
      </div>
      <h3>${notice.title}</h3>
      ${desc ? `<p class="notice-desc">${desc}</p>` : ''}
      <div class="notice-actions">
        <span class="notice-view-btn">View Notice →</span>
      </div>
    </div>
  `;
}

/**
 * Render a compact notice row (HTML string).
 */
function renderCompactNotice(notice) {
  const date = parseNoticeDate(notice.date);
  const dateStr = formatNoticeDate(date);
  const isNew = isNoticeNew(notice.date);
  const type = notice.type || "text";

  return `
    <div class="notice-compact" onclick="openNoticeViewer(window._nbNoticeMap['${notice.id}'])" tabindex="0" role="button" aria-label="View notice: ${notice.title}">
      <div class="notice-compact-info">
        <span class="notice-compact-title">${notice.title}</span>
      </div>
      <div class="notice-compact-meta">
        <span class="notice-date">${dateStr}</span>
        <span class="notice-category-tag">${notice.category || 'Other'}</span>
        <span class="notice-type-tag ${getTypeClass(type)}">${getTypeLabel(type)}</span>
        ${isNew ? '<span class="badge-new">New</span>' : ''}
        <span class="notice-view-btn">View →</span>
      </div>
    </div>
  `;
}

/**
 * Render an archive notice row (HTML string).
 */
function renderArchiveItem(notice) {
  const date = parseNoticeDate(notice.date);
  const dateStr = formatNoticeDate(date);
  const type = notice.type || "text";

  return `
    <div class="archive-item" onclick="openNoticeViewer(window._nbNoticeMap['${notice.id}'])" tabindex="0" role="button" aria-label="View notice: ${notice.title}">
      <div class="archive-item-info">
        <span class="notice-type-tag ${getTypeClass(type)}">${getTypeLabel(type)}</span>
        <span class="archive-item-title">${notice.title}</span>
      </div>
      <div class="notice-compact-meta">
        <span class="notice-category-tag">${notice.category || 'Other'}</span>
        <span class="archive-item-date">${dateStr}</span>
        <span class="notice-view-btn">View →</span>
      </div>
    </div>
  `;
}

/**
 * Main Notice Board initialiser — runs on DOMContentLoaded.
 */
function initNoticeBoard() {
  const data = window.SVCS_DATA;
  if (!data || !Array.isArray(data.notices)) return;

  const publishedNotices = getPublishedNotices(data.notices);

  // Build a lookup map so onclick handlers can find the notice object
  window._nbNoticeMap = {};
  publishedNotices.forEach(n => { window._nbNoticeMap[n.id] = n; });

  // Split into current (max 5) and archive (the rest)
  const currentNotices = publishedNotices.slice(0, MAX_CURRENT_NOTICES);
  const archiveNotices = publishedNotices.slice(MAX_CURRENT_NOTICES);

  // Featured = newest 1-2 of current; remaining = rest of current
  const featuredNotices = currentNotices.slice(0, 2);
  const remainingCurrent = currentNotices.slice(2);

  // --- Facilities & Notices page elements ---
  const featuredEl = document.getElementById("nbFeaturedNotices");
  const currentHeading = document.getElementById("nbCurrentHeading");
  const currentEl = document.getElementById("nbCurrentNotices");
  const archiveSection = document.getElementById("nbArchiveSection");
  const archiveListEl = document.getElementById("nbArchiveList");
  const archiveEmptyEl = document.getElementById("nbArchiveEmpty");
  const globalEmptyEl = document.getElementById("nbGlobalEmpty");
  const searchEl = document.getElementById("nbArchiveSearch");
  const catFilterEl = document.getElementById("nbCategoryFilter");
  const yearFilterEl = document.getElementById("nbYearFilter");

  // Check if we're on the facilities-notices page
  const isNoticePage = !!featuredEl;

  if (isNoticePage) {
    // Handle 0-notice state
    if (publishedNotices.length === 0) {
      if (globalEmptyEl) globalEmptyEl.style.display = "block";
    } else {
      // Render featured notices
      if (featuredEl) {
        featuredEl.innerHTML = featuredNotices.map(renderFeaturedNotice).join("");
        // Keyboard support for featured cards
        featuredEl.querySelectorAll('[role="button"]').forEach(btn => {
          btn.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); btn.click(); } });
        });
      }

      // Render remaining current notices
      if (remainingCurrent.length > 0 && currentEl && currentHeading) {
        currentHeading.style.display = "block";
        currentEl.innerHTML = remainingCurrent.map(renderCompactNotice).join("");
        currentEl.querySelectorAll('[role="button"]').forEach(btn => {
          btn.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); btn.click(); } });
        });
      }

      // Render archive
      if (archiveNotices.length > 0 && archiveSection) {
        archiveSection.style.display = "block";

        // Populate category filter
        if (catFilterEl) {
          const usedCats = [...new Set(archiveNotices.map(n => n.category || "Other"))].sort();
          usedCats.forEach(cat => {
            const opt = document.createElement("option");
            opt.value = cat;
            opt.textContent = cat;
            catFilterEl.appendChild(opt);
          });
        }

        // Populate year filter
        if (yearFilterEl) {
          const usedYears = [...new Set(archiveNotices.map(n => {
            const d = parseNoticeDate(n.date);
            return d ? d.getFullYear().toString() : null;
          }).filter(Boolean))].sort().reverse();
          usedYears.forEach(yr => {
            const opt = document.createElement("option");
            opt.value = yr;
            opt.textContent = yr;
            yearFilterEl.appendChild(opt);
          });
        }

        // Render archive and attach filter/search logic
        const renderArchive = () => {
          const searchTerm = (searchEl?.value || "").trim().toLowerCase();
          const catFilter = catFilterEl?.value || "all";
          const yearFilter = yearFilterEl?.value || "all";

          const filtered = archiveNotices.filter(n => {
            // Search filter
            if (searchTerm) {
              const titleMatch = (n.title || "").toLowerCase().includes(searchTerm);
              const descMatch = (n.description || "").toLowerCase().includes(searchTerm);
              if (!titleMatch && !descMatch) return false;
            }
            // Category filter
            if (catFilter !== "all" && (n.category || "Other") !== catFilter) return false;
            // Year filter
            if (yearFilter !== "all") {
              const d = parseNoticeDate(n.date);
              if (!d || d.getFullYear().toString() !== yearFilter) return false;
            }
            return true;
          });

          if (archiveListEl) {
            if (filtered.length > 0) {
              archiveListEl.innerHTML = filtered.map(renderArchiveItem).join("");
              archiveListEl.style.display = "flex";
              archiveListEl.querySelectorAll('[role="button"]').forEach(btn => {
                btn.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); btn.click(); } });
              });
              if (archiveEmptyEl) archiveEmptyEl.style.display = "none";
            } else {
              archiveListEl.style.display = "none";
              if (archiveEmptyEl) archiveEmptyEl.style.display = "block";
            }
          }
        };

        renderArchive();
        if (searchEl) searchEl.addEventListener("input", renderArchive);
        if (catFilterEl) catFilterEl.addEventListener("change", renderArchive);
        if (yearFilterEl) yearFilterEl.addEventListener("change", renderArchive);
      }
    }
  }

  // --- Homepage notice preview ---
  const homeNoticeGrid = document.getElementById("homeNoticesGrid") || document.getElementById("homeNoticeGrid");
  if (homeNoticeGrid && currentNotices.length > 0) {
    homeNoticeGrid.innerHTML = currentNotices.map(notice => {
      const date = parseNoticeDate(notice.date);
      const dateStr = formatNoticeDate(date);
      const isNew = isNoticeNew(notice.date);
      const type = notice.type || "text";
      const desc = notice.description || "";

      return `
        <div class="home-notice-card" onclick="openNoticeViewer(window._nbNoticeMap['${notice.id}'])" tabindex="0" role="button" aria-label="View notice: ${notice.title}">
          <div class="notice-meta" style="display:flex;align-items:center;gap:var(--space-sm);flex-wrap:wrap;margin-bottom:var(--space-sm);">
            <span class="notice-date">${dateStr}</span>
            <span class="notice-category-tag">${notice.category || 'Other'}</span>
            ${isNew ? '<span class="badge-new">New</span>' : ''}
          </div>
          <h4>${notice.title}</h4>
          ${desc ? `<p class="notice-desc">${desc}</p>` : ''}
          <span class="notice-view-btn" style="margin-top:auto;">View Notice →</span>
        </div>
      `;
    }).join("");
    homeNoticeGrid.querySelectorAll('[role="button"]').forEach(btn => {
      btn.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); btn.click(); } });
    });
  }
}

/* ============================================================================
   10. CONTACT PAGE SPECIFIC BINDINGS
   ============================================================================ */
function initContactPage() {
  const data = window.SVCS_DATA;
  if (!data || !data.settings) return;
  const s = data.settings;
  const mapQuery = `${s.schoolName}, ${s.address.full}, ${s.address.country || "India"}`;
  const mapsSearch = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`;
  const elAddress = document.getElementById("contactPageAddress");
  const elPhones = document.getElementById("contactPagePhones");
  const elEmail = document.getElementById("contactPageEmail");
  const elHours = document.getElementById("contactPageHours");
  const mapContainer = document.getElementById("contactPageMapContainer");
  const directionsBtn = document.getElementById("contactPageDirectionsBtn");

  if (elAddress) {
    elAddress.textContent = `${s.address.full}, ${s.address.country || "India"}`;
    const addressLink = document.createElement("a");
    addressLink.href = mapsSearch; addressLink.target = "_blank";
    addressLink.rel = "noopener noreferrer";
    addressLink.className = "school-address-link";
    addressLink.setAttribute("aria-label", "View school location on Google Maps");
    addressLink.textContent = elAddress.textContent;
    elAddress.replaceChildren(addressLink);
  }
  if (elPhones && s.phoneNumbers) {
    elPhones.innerHTML = s.phoneNumbers.map(p => {
      const dial = String(p.number).replace(/[^+\d]/g, "");
      return `<div><strong>${p.label}:</strong> <a href="tel:${dial}">+91 ${p.number}</a></div>`;
    }).join("");
  }
  if (elEmail) { elEmail.textContent = s.contactEmail; elEmail.href = `mailto:${s.contactEmail}`; }
  if (elHours) elHours.innerHTML = `<strong>${s.officeHours.days}</strong><br>${s.officeHours.timing}`;
  if (directionsBtn) { directionsBtn.href = directions; directionsBtn.target = "_blank"; directionsBtn.rel = "noopener noreferrer"; }
  if (mapContainer) {
    const embed = s.googleMapsEmbedUrl || `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;
    mapContainer.innerHTML = `<iframe src="${embed}" title="Map showing Swami Vivekananda Centenary School" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe><p class="map-fallback-link"><a href="${directions}" target="_blank" rel="noopener noreferrer">Map not loading? Open directions in Google Maps</a></p>`;
  }

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const feedback = document.getElementById("contactFormFeedback");
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;
      const name = document.getElementById("contactName")?.value.trim() || "";
      const senderEmail = document.getElementById("contactSenderEmail")?.value.trim() || "";
      const phone = document.getElementById("contactPhone")?.value.trim() || "";
      const subject = document.getElementById("contactSubject")?.value || "General Query";
      const message = document.getElementById("contactMessage")?.value.trim() || "";
      if (name.length < 2 || message.length < 10) {
        if (feedback) { feedback.hidden = false; feedback.textContent = "Please enter your name and a message of at least 10 characters."; }
        return;
      }
      const emailSubject = `SVCS Website Enquiry: ${subject}`;
      const emailBody = [
        `Name: ${name}`, `Email: ${senderEmail}`, `Phone: ${phone}`, "", "Enquiry details:", message
      ].join("\r\n");
      const mailto = `mailto:${s.contactEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      if (feedback) {
        feedback.hidden = false;
        feedback.textContent = "Your email application should open with the enquiry prepared. The website has not sent or stored this message; please review and send it in your email application.";
      }
      window.location.href = mailto;
    });
  }
}

/* ============================================================================
   11. RECRUITMENT SYSTEM (VACANCIES)
   ============================================================================ */
function initRecruitment() {
  const data = window.SVCS_DATA;
  if (!data || !data.recruitment) return;

  const rec = data.recruitment;
  const vacancies = rec.vacancies || [];
  
  const introText = document.getElementById("recruitmentIntroText");
  const listContainer = document.getElementById("vacanciesListContainer");
  const emptyState = document.getElementById("recruitmentEmptyState");
  
  if (introText && rec.settings.introduction) {
    introText.textContent = rec.settings.introduction;
  }
  
  if (!listContainer) return; // Not on contact page
  
  // Only show explicitly open vacancies whose deadlines have not passed.
  // Expired vacancies are retained in source data for admin review.
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const openVacancies = vacancies.filter(v => {
    if (v.status !== "open") return false;
    if (!v.applicationDeadline) return true;
    const deadline = new Date(`${v.applicationDeadline}T23:59:59`);
    return !Number.isNaN(deadline.getTime()) && deadline >= today;
  });
  
  if (openVacancies.length === 0) {
    listContainer.style.display = "none";
    if (emptyState) emptyState.style.display = "block";
    return;
  }
  
  if (emptyState) emptyState.style.display = "none";
  
  // Build lookup map for modal
  window._svcsVacanciesMap = {};
  openVacancies.forEach(v => { window._svcsVacanciesMap[v.id] = v; });
  
  listContainer.innerHTML = openVacancies.map(v => {
    // Format deadline
    let deadlineStr = "Open until filled";
    if (v.applicationDeadline) {
      const d = parseNoticeDate(v.applicationDeadline);
      if (d) deadlineStr = `Apply by: ${formatNoticeDate(d)}`;
    }
    
    return `
      <div class="vacancy-card">
        <div class="vacancy-card-header">
          <div class="vacancy-department">${v.department}</div>
          <h3 class="vacancy-card-title">${v.title}</h3>
        </div>
        <div class="vacancy-meta">
          <span class="vacancy-meta-tag">💼 ${v.employmentType}</span>
          <span class="vacancy-meta-tag">📍 ${v.location}</span>
          <span class="vacancy-meta-tag">⏳ ${deadlineStr}</span>
        </div>
        <p class="vacancy-desc">${v.description}</p>
        <div class="vacancy-actions">
          <button class="btn btn-outline" style="flex:1;" onclick="openVacancyViewer('${v.id}')">View Details</button>
        </div>
      </div>
    `;
  }).join("");
}

/**
 * Open Vacancy Details Modal
 */
window.openVacancyViewer = function(vacancyId) {
  if (!window.SVCS_MODAL || !window._svcsVacanciesMap) return;
  
  const v = window._svcsVacanciesMap[vacancyId];
  if (!v) return;
  
  const settings = window.SVCS_DATA.recruitment.settings;
  
  let deadlineStr = "Open until filled";
  if (v.applicationDeadline) {
    const d = parseNoticeDate(v.applicationDeadline);
    if (d) deadlineStr = formatNoticeDate(d);
  }
  
  let content = `
    <div class="vacancy-detail-header">
      <div class="vacancy-department" style="margin-bottom:var(--space-xs);">${v.department}</div>
      <h2>${v.title}</h2>
      <div class="vacancy-detail-meta">
        <span class="vacancy-meta-tag">💼 ${v.employmentType}</span>
        <span class="vacancy-meta-tag">📍 ${v.location}</span>
        <span class="vacancy-meta-tag" style="color:var(--primary); font-weight:600;">⏳ Deadline: ${deadlineStr}</span>
      </div>
    </div>
    
    <div class="vacancy-detail-section">
      <h4>Job Description</h4>
      <p>${v.description}</p>
    </div>
  `;
  
  if (v.responsibilities && v.responsibilities.length > 0) {
    content += `
      <div class="vacancy-detail-section">
        <h4>Key Responsibilities</h4>
        <ul class="vacancy-detail-list">
          ${v.responsibilities.map(r => `<li>${r}</li>`).join("")}
        </ul>
      </div>
    `;
  }
  
  content += `
    <div class="vacancy-detail-section" style="background:var(--bg); padding:var(--space-md); border-radius:var(--radius-sm); border:1px solid var(--border);">
      <h4 style="margin-bottom:var(--space-xs);">Requirements</h4>
      <p style="margin-bottom:var(--space-sm);"><strong>Qualification:</strong> ${v.qualification}</p>
      <p style="margin-bottom:var(--space-sm);"><strong>Experience:</strong> ${v.experience}</p>
      ${v.requirements && v.requirements.length > 0 ? `
        <ul class="vacancy-detail-list" style="margin-top:var(--space-sm); margin-bottom:0;">
          ${v.requirements.map(req => `<li>${req}</li>`).join("")}
        </ul>
      ` : ''}
    </div>
  `;
  
  // Application Box
  let applyActionHtml = '';
  if (settings.applicationMethod === "external_form" && settings.applicationFormUrl && settings.applicationFormUrl !== "TBD") {
    applyActionHtml = `<a href="${settings.applicationFormUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="display:inline-block; font-size:1.6rem; padding:1.2rem 3rem;">Apply Online Now</a>`;
  } else {
    // Fallback to email
    const subject = encodeURIComponent(`Application for ${v.title}`);
    const emailTo = settings.applicationEmail && settings.applicationEmail !== "TBD" ? settings.applicationEmail : window.SVCS_DATA.settings.contactEmail;
    applyActionHtml = `<a href="mailto:${emailTo}?subject=${subject}" class="btn btn-primary" style="display:inline-block; font-size:1.6rem; padding:1.2rem 3rem;">Apply via Email</a>`;
  }
  
  content += `
    <div class="vacancy-application-box">
      <p>${settings.instructions}</p>
      <div style="margin-top:var(--space-md);">
        ${applyActionHtml}
      </div>
      <div class="vacancy-privacy-note">${settings.privacyText}</div>
    </div>
  `;
  
  window.SVCS_MODAL.open("Career Opportunity", content);
};

/* ============================================================================
   12. HOMEPAGE SPECIFIC DYNAMIC BINDINGS
   ============================================================================ */
function initHomePage() {
  const data = window.SVCS_DATA;
  if (!data) return;

  // Principal Message on Homepage
  if (data.principalMessage) {
    const pm = data.principalMessage;
    const principalSection = document.querySelector(".principal-section");
    const principalKnown = Boolean(pm.name && pm.name !== "TBD");
    if (principalSection && !principalKnown) principalSection.hidden = true;
    const nameEl = document.getElementById("principalNameDisplay");
    const desigEl = document.getElementById("principalDesignationDisplay");
    const qualEl = document.getElementById("principalQualDisplay");
    const excerptEl = document.getElementById("principalExcerptDisplay");

    if (nameEl && pm.name) nameEl.textContent = pm.name;
    if (desigEl && pm.designation) desigEl.textContent = pm.designation;
    if (qualEl && pm.qualification) qualEl.textContent = pm.qualification;
    if (excerptEl && (pm.excerpt || pm.fullMessage)) {
      excerptEl.innerHTML = `<p>${pm.excerpt || pm.fullMessage}</p>`;
    }
  }
// ======================================
// HOME FACILITIES GRID
// ======================================

const homeFacilitiesGrid = document.getElementById("homeFacilitiesGrid");

if (homeFacilitiesGrid && Array.isArray(data.facilities)) {

    const facItems = data.facilities.slice(0, 6);

    const iconMap = {
        "Learning": "📚",
        "Laboratories": "🔬",
        "Sports": "⚽",
        "Other": "🏫"
    };

    homeFacilitiesGrid.innerHTML = facItems.map(f => {

        const icon = iconMap[f.category] || "🏫";

        const imageHTML = f.image
            ? `
                <img
                    src="${f.image}"
                    alt="${f.title}"
                    loading="lazy"
                    decoding="async"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                >
                <div class="facility-image-fallback" style="display:none;">
                    ${icon}
                </div>
            `
            : `
                <div class="facility-image-fallback">
                    ${icon}
                </div>
            `;

        return `
            <article class="facility-card reveal">

                <div class="facility-card-image">
                    ${imageHTML}
                </div>

                <div class="facility-card-body">
                    <h4>${f.title}</h4>
                    <p>${f.description}</p>
                </div>

            </article>
        `;

    }).join("");
}

// ======================================
// HOME ACHIEVEMENTS RENDERING
// ======================================

const homeAchievementsGrid = document.getElementById(
    "homeAchievementsGrid"
);

if (
    homeAchievementsGrid &&
    Array.isArray(data.achievements)
) {

    homeAchievementsGrid.innerHTML = data.achievements.map(a => `

        <article class="achievement-card">

            <div class="achievement-image">

                <img
                    src="${a.image}"
                    alt="${a.alt || a.title}"
                    loading="lazy"
                    decoding="async"
                    onerror="this.style.display='none';"
                >

            </div>

            <div class="achievement-content">

                <span class="achievement-card-category">
                    ${a.category || "Achievement"}
                </span>

                <h3>${a.title}</h3>

                <p class="achievement-description">
                    ${a.description}
                </p>

                <div class="achievement-details">

                    ${a.competition ? `
                        <span>
                            Competition: ${a.competition}
                        </span>
                    ` : ""}

                    ${a.year ? `
                        <span>
                            Year: ${a.year}
                        </span>
                    ` : ""}

                    ${a.result ? `
                        <strong>
                            ${a.result}
                        </strong>
                    ` : ""}

                </div>

            </div>

        </article>

    `).join("");

    if (data.achievements.length === 0) {

        homeAchievementsGrid.innerHTML = `
            <p class="empty-state">
                Verified school achievements will be published here.
            </p>
        `;

    }

}

  // Home Events Grid
  const homeEventsGrid = document.getElementById("homeEventsGrid");
  if (homeEventsGrid && Array.isArray(data.events)) {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const upcomingEvents = data.events.filter(e => {
      if (!e.isoDate) return false;
      const eventDate = new Date(`${e.isoDate}T00:00:00`);
      return !Number.isNaN(eventDate.getTime()) && eventDate >= today;
    });
    homeEventsGrid.innerHTML = upcomingEvents.map(e => {
      const dateParts = (e.date || "").trim().split(" ");
      const day = dateParts[0] || "";
      const month = dateParts.slice(1).join(" ") || "";
      return `
        <article class="event-card reveal">
          <div class="event-date-block">
            <span class="event-day">${day}</span>
            <span class="event-month">${month}</span>
          </div>
          <div class="event-info">
            <h3>${e.title}</h3>
            <p>${e.description}</p>
          </div>
        </article>
      `;
    }).join("");
    if (upcomingEvents.length === 0) {
      homeEventsGrid.innerHTML = '<p class="empty-state">Upcoming events will be announced by the school.</p>';
    }
  }

 // ======================================
// HOME GALLERY PREVIEW
// ======================================

const homeGalleryGrid = document.getElementById("homeGalleryGrid");

if (homeGalleryGrid && Array.isArray(data.gallery)) {

    const previewItems = data.gallery.slice(0, 6);

    homeGalleryGrid.innerHTML = previewItems.map(item => `
        <a
            href="gallery.html"
            class="gallery-item"
            aria-label="View gallery photo: ${item.caption}"
        >

            <img
                src="${item.url}"
                alt="${item.alt || item.caption}"
                loading="lazy"
                decoding="async"
            >

            <span>${item.caption}</span>

        </a>
    `).join("");
}
  // Home Testimonials Grid
  const homeTestimonialsGrid = document.getElementById("homeTestimonialsGrid");
  if (homeTestimonialsGrid && Array.isArray(data.testimonials)) {
    const testimonialSection = homeTestimonialsGrid.closest(".testimonials-section");
    if (testimonialSection) testimonialSection.hidden = data.testimonials.length === 0;
    homeTestimonialsGrid.innerHTML = data.testimonials.map(t => `
      <article class="testimonial-card reveal">
        <p class="testimonial-text">"${t.text}"</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">👤</div>
          <div>
            <h4 class="testimonial-name">${t.name}</h4>
            <div class="testimonial-role">${t.role}</div>
          </div>
        </div>
      </article>
    `).join("");
  }

  // Home Contact Summary Phone Numbers
  const homePhoneList = document.getElementById("homePhoneList");
  if (homePhoneList && data.settings && Array.isArray(data.settings.phoneNumbers)) {
    homePhoneList.innerHTML = data.settings.phoneNumbers.map(p => `
      <div><strong>${p.label}:</strong> <a href="tel:+91${p.number}" style="color:var(--primary);text-decoration:none;">+91 ${p.number}</a></div>
    `).join("");
  }
}

/* ============================================================================
   13. DEDICATED GALLERY PAGE SYSTEM
   ============================================================================ */
function initGalleryPage() {
  const galleryGrid = document.getElementById("galleryGrid");
  const filterContainer = document.getElementById("galleryCategoryFilters");
  const countEl = document.getElementById("galleryItemCount");
  const emptyState = document.getElementById("galleryEmptyState");
  const lightbox = document.getElementById("galleryLightbox");

  // Only run on gallery page
  if (!galleryGrid) return;

  const data = window.SVCS_DATA;
  if (!data || !Array.isArray(data.gallery)) {
    if (emptyState) emptyState.style.display = "block";
    return;
  }

  const allItems = data.gallery;
  if (allItems.length === 0) {
    if (emptyState) emptyState.style.display = "block";
    return;
  }

  // Extract unique categories in order of appearance
  const categories = ["All"];
  allItems.forEach(item => {
    const cat = item.category ? item.category.trim() : "Campus";
    if (!categories.includes(cat)) {
      categories.push(cat);
    }
  });

  let activeCategory = "All";
  let filteredItems = [...allItems];
  let lightboxIndex = 0;

  // Render Category Filter Buttons
  if (filterContainer) {
    filterContainer.innerHTML = categories.map(cat => {
      const count = cat === "All"
        ? allItems.length
        : allItems.filter(i => (i.category || "Campus") === cat).length;
      const isActive = cat === "All" ? " active" : "";
      return `
        <button type="button" class="gallery-filter-btn${isActive}" data-category="${cat}" aria-label="Filter by ${cat}">
          <span>${cat}</span>
          <span class="filter-count">${count}</span>
        </button>
      `;
    }).join("");

    // Attach click events to filter buttons
    const filterButtons = filterContainer.querySelectorAll(".gallery-filter-btn");
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const selectedCat = btn.getAttribute("data-category");
        if (selectedCat === activeCategory) return;

        activeCategory = selectedCat;
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        renderFilteredGallery();
      });
    });
  }

  // Render Grid Items
  function renderFilteredGallery() {
    if (activeCategory === "All") {
      filteredItems = [...allItems];
    } else {
      filteredItems = allItems.filter(i => (i.category || "Campus") === activeCategory);
    }

    // Update counter
    if (countEl) {
      countEl.textContent = `Showing ${filteredItems.length} of ${allItems.length} photo${allItems.length !== 1 ? 's' : ''}`;
    }

    if (filteredItems.length === 0) {
      galleryGrid.style.display = "none";
      if (emptyState) emptyState.style.display = "block";
      return;
    }

    galleryGrid.style.display = "grid";
    if (emptyState) emptyState.style.display = "none";

    galleryGrid.innerHTML = filteredItems.map((item, index) => {
      const categoryLabel = item.category || "Campus";
      return `
        <article class="gallery-card" data-index="${index}" tabindex="0" role="button" aria-label="View photograph: ${item.caption}">
          <div class="gallery-thumb">
            <img
              class="gallery-img"
              src="${item.url}"
              alt="${item.alt || item.caption}"
              loading="lazy"
              onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
            />
            <div class="gallery-placeholder" style="display:none;" aria-hidden="true">
              📷
              <span>${categoryLabel}</span>
            </div>
            <div class="gallery-overlay">
              <span class="gallery-zoom-badge">🔍 View Photo</span>
            </div>
          </div>
          <div class="gallery-card-body">
            <div class="gallery-card-meta">
              <span class="gallery-category-tag">${categoryLabel}</span>
            </div>
            <h3 class="gallery-card-caption">${item.caption}</h3>
          </div>
        </article>
      `;
    }).join("");

    // Attach click & keydown handlers to open lightbox
    galleryGrid.querySelectorAll(".gallery-card").forEach(card => {
      card.addEventListener("click", () => {
        const idx = parseInt(card.getAttribute("data-index"), 10);
        openLightbox(idx);
      });
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          card.click();
        }
      });
    });
  }

  // Initial render of gallery
  renderFilteredGallery();

  // --- Lightbox Implementation ---
  if (!lightbox) return;

  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxCategory = document.getElementById("lightboxCategory");
  const lightboxCounter = document.getElementById("lightboxCounter");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");

  let lastActiveElement = null;

  function openLightbox(index) {
    if (!filteredItems || filteredItems.length === 0) return;
    if (index < 0 || index >= filteredItems.length) return;

    lastActiveElement = document.activeElement;
    lightboxIndex = index;
    updateLightboxContent();

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    if (lightboxClose) lightboxClose.focus();
  }

  function updateLightboxContent() {
    const item = filteredItems[lightboxIndex];
    if (!item) return;

    if (lightboxImg) {
      lightboxImg.src = item.url;
      lightboxImg.alt = item.alt || item.caption;
      lightboxImg.onerror = function() {
        this.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'><rect fill='%23fff7ed' width='800' height='500'/><text fill='%23ea580c' font-family='sans-serif' font-size='28' font-weight='bold' x='50%' y='46%' text-anchor='middle'>Swami Vivekananda Centenary School</text><text fill='%2364748b' font-family='sans-serif' font-size='18' x='50%' y='56%' text-anchor='middle'>Photo: " + encodeURI(item.caption) + "</text></svg>";
      };
    }
    if (lightboxCaption) lightboxCaption.textContent = item.caption;
    if (lightboxCategory) lightboxCategory.textContent = item.category || "Campus";
    if (lightboxCounter) {
      lightboxCounter.textContent = `Photo ${lightboxIndex + 1} of ${filteredItems.length}`;
    }
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    if (lastActiveElement && typeof lastActiveElement.focus === "function") {
      lastActiveElement.focus();
    }
  }

  function nextPhoto() {
    if (filteredItems.length === 0) return;
    lightboxIndex = (lightboxIndex + 1) % filteredItems.length;
    updateLightboxContent();
  }

  function prevPhoto() {
    if (filteredItems.length === 0) return;
    lightboxIndex = (lightboxIndex - 1 + filteredItems.length) % filteredItems.length;
    updateLightboxContent();
  }

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener("click", nextPhoto);
  if (lightboxPrev) lightboxPrev.addEventListener("click", prevPhoto);

  // Close on backdrop click
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;

    if (e.key === "Escape") {
      e.preventDefault();
      closeLightbox();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextPhoto();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevPhoto();
    }
  });
}

/**
 * N. Floating Admission Island
 * Dynamically builds and injects the floating admission widget onto every page.
 * All configuration is read from window.SVCS_DATA.settings.floatingAdmission.
 * No HTML markup needed in individual pages — the widget is self-injecting.
 */
function initFloatingAdmission() {
  const settings = window.SVCS_DATA && window.SVCS_DATA.settings;
  if (!settings) return;

  const cfg = settings.floatingAdmission;

  // Bail out if not configured or explicitly disabled
  if (!cfg || cfg.enabled === false) return;

  // Bail out if already dismissed this session (safe sessionStorage access)
  const DISMISS_KEY = "svcs_fadm_dismissed";
  let isDismissed = false;
  try {
    isDismissed = sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch (err) {
    isDismissed = false;
  }
  if (isDismissed) return;

  // -------------------------------------------------------------------------
  // Resolve the destination URL with fallback chain:
  //   1. cfg.link (if not "TBD" or empty)
  //   2. settings.admissionFormUrl (if not "TBD" or empty)
  //   3. "contact.html" (safe fallback — always works)
  // -------------------------------------------------------------------------
  const resolveLink = (primary, secondary, fallback) => {
    if (primary && primary !== "TBD" && primary.trim() !== "") return primary;
    if (secondary && secondary !== "TBD" && secondary.trim() !== "") return secondary;
    return fallback;
  };

  const admissionHref   = resolveLink(cfg.link, settings.admissionFormUrl, "contact.html");
  const admissionTarget = (cfg.target === "_blank") ? "_blank" : "_self";
  const admissionRel    = admissionTarget === "_blank" ? ' rel="noopener noreferrer"' : "";

  // -------------------------------------------------------------------------
  // Build island DOM
  // -------------------------------------------------------------------------
  const island = document.createElement("aside");
  island.className = "floating-admission-island";
  island.setAttribute("aria-label", "Admission announcement");
  island.setAttribute("role", "complementary");

  // Position class
  if (cfg.position === "bottom-left") {
    island.classList.add("pos-bottom-left");
    document.body.classList.add("fadm-pos-left");
  }

  // Status class (drives visual variant)
  const status = cfg.status || "open";
  if (status === "closed") {
    island.classList.add("status-closed");
  }

  // Determine display values based on status
  const displayTitle   = cfg.title   || (status === "closed" ? "Admissions Closed" : "Admissions Open");
  const displayClasses = cfg.classes || "Class IX & XI";
  const displayMessage = cfg.message || (status === "closed" ? "Admissions are currently closed." : "Applications are now open.");
  const displayBtnText = (status === "closed") ? "Admissions Closed" : (cfg.buttonText || "Apply Now");

  const ctaAttributes = (status === "closed")
    ? 'role="button" aria-disabled="true" tabindex="-1"'
    : `href="${admissionHref}" target="${admissionTarget}"${admissionRel} aria-label="${displayBtnText} for ${displayClasses}"`;

  island.innerHTML = `
    <div class="fadm-inner">
      <div class="fadm-header">
        <div class="fadm-title-group">
          <span class="fadm-pulse-dot" aria-hidden="true"></span>
          <span class="fadm-title">${displayTitle}</span>
        </div>
        <button
          class="fadm-close"
          aria-label="Dismiss admission announcement"
          title="Dismiss admission announcement"
          type="button"
        >&#10005;</button>
      </div>
      <div class="fadm-body">
        <span class="fadm-classes-tag">&#127891; ${displayClasses}</span>
        <p class="fadm-message">${displayMessage}</p>
      </div>
      <div class="fadm-footer">
        <a
          class="fadm-cta-btn"
          ${ctaAttributes}
        >${displayBtnText} ${status !== "closed" ? '<span class="fadm-cta-arrow" aria-hidden="true">&#8594;</span>' : ''}</a>
      </div>
    </div>
  `;

  document.body.appendChild(island);

  // -------------------------------------------------------------------------
  // Main island click behavior:
  // Clicking the island or its "Apply Now" button navigates to the admission URL.
  // Clicking the close button dismisses without navigating.
  // -------------------------------------------------------------------------
  island.addEventListener("click", (e) => {
    // If click originated on or within the close button, ignore
    if (e.target.closest(".fadm-close")) return;
    // If status is closed, do not navigate
    if (status === "closed") return;
    // If click is on the CTA anchor itself, default browser navigation handles it
    if (e.target.closest(".fadm-cta-btn")) return;

    // Entire card acts as an interactive link
    if (admissionTarget === "_blank") {
      window.open(admissionHref, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = admissionHref;
    }
  });

  // -------------------------------------------------------------------------
  // Close / dismiss button
  // stopPropagation ensures clicking close does NOT trigger the admission link.
  // Sets sessionStorage flag so island stays hidden for the current session.
  // -------------------------------------------------------------------------
  const closeBtn = island.querySelector(".fadm-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      island.classList.remove("is-visible");
      island.classList.add("is-dismissed");
      document.body.classList.remove("fadm-visible");
      try {
        sessionStorage.setItem(DISMISS_KEY, "1");
      } catch (err) {}
    });
  }

  // -------------------------------------------------------------------------
  // Scroll-driven visibility using requestAnimationFrame for performance.
  // Uses a passive event listener to avoid blocking the main thread.
  // -------------------------------------------------------------------------
  const scrollThreshold = (typeof cfg.showAfterScroll === "number") ? cfg.showAfterScroll : 300;
  let rafPending = false;

  const handleScroll = () => {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => {
      rafPending = false;
      // Re-check dismissal in case user dismissed during scroll
      let dismissed = false;
      try {
        dismissed = sessionStorage.getItem(DISMISS_KEY) === "1";
      } catch (err) {}

      if (dismissed) {
        island.classList.remove("is-visible");
        document.body.classList.remove("fadm-visible");
        return;
      }

      if (window.scrollY >= scrollThreshold) {
        island.classList.add("is-visible");
        document.body.classList.add("fadm-visible");
      } else {
        island.classList.remove("is-visible");
        document.body.classList.remove("fadm-visible");
      }
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  // Run once on init (handles deep-linked pages that start scrolled)
  handleScroll();
}
/* =========================================
   HOME UPCOMING EVENTS
========================================= */

function initHomeEvents() {

    const eventsGrid = document.getElementById("homeEventsGrid");

    if (!eventsGrid) return;

    const events = window.SVCS_DATA?.events || [];

    // No upcoming events
    if (!events.length) {

        eventsGrid.innerHTML = `
            <div class="events-empty-state">
                <p>
                    Upcoming events will be announced by the school.
                </p>
            </div>
        `;

        return;
    }

    // Render event cards
    eventsGrid.innerHTML = events.map(event => {

        const eventDate = event.date
            ? new Date(event.date)
            : null;

        const day = eventDate && !isNaN(eventDate)
            ? eventDate.getDate()
            : "";

        const month = eventDate && !isNaN(eventDate)
            ? eventDate.toLocaleString("en", { month: "short" })
            : "";

        return `
            <article class="event-card">

                <div class="event-card-image">
                    <img
                        src="${event.image || 'assets/images/event-placeholder.jpg'}"
                        alt="${event.title}"
                        loading="lazy"
                        onerror="this.style.display='none'"
                    >
                </div>

                <div class="event-info">

                    <span class="event-category">
                        ${event.category || "School Event"}
                    </span>

                    <h3>${event.title}</h3>

                    <p>${event.description || ""}</p>

                    <div class="event-date-info">
                        ${day ? `<strong>${day} ${month}</strong>` : ""}
                    </div>

                </div>

            </article>
        `;

    }).join("");

}
