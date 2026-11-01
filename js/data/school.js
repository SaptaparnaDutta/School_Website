/**
 * Global school settings and contact information
 */
window.SVCS_DATA = window.SVCS_DATA || {};

window.SVCS_DATA.settings = {
  schoolName: "Swami Vivekananda Centenary School",
  shortName: "SVCS",
  tagline: "Education is the manifestation of the perfection already in man",
  boardAffiliation: "ICSE / ISC Affiliated School (CISCE)",
  affiliationCode: "", // Publish only after school confirmation
  domainName: "svcschakdaha.com",
  contactEmail: "svcs.12@rediffmail.com",
  
  // Multiple phone lines mapped dynamically
  phoneNumbers: [
    { label: "General Inquiry", number: "9046300512" },
    { label: "Admission Desk", number: "7004366275" },
    { label: "Office Landline", number: "03473-246597" }
  ],
  
  address: {
    street: "Dhanicha (Near B.D.O. Office)",
    city: "Chakdaha",
    district: "Nadia",
    state: "West Bengal",
    postalCode: "741222",
    country: "India",
    full: "Dhanicha (Near B.D.O. Office), Chakdaha, Nadia, West Bengal - 741222"
  },
  
  officeHours: {
    days: "Monday to Saturday",
    timing: "9:00 AM to 2:00 PM"
  },
  
  socialLinks: {
    facebook: "https://www.facebook.com/svcs.chakdaha/",
    instagram: "",
    youtube: ""
  },
  
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.4939768670154!2d88.5298818!3d23.0423547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f8ea73e215dfd5%3A0xe108bc0fa03c5354!2sSwami%20Vivekananda%20Centenary%20School%2C%20Chakdaha!5e0!3m2!1sen!2sin!4v1714856000000!5m2!1sen!2sin",
  logoPath: "assets/images/logo/svcs-logo.png",
  
  // Static forms or external configurations
  recruitmentFormUrl: "", // Add only a school-approved application URL
  contactFormEndpoint: "",    // e.g. Formspree or Web3Forms URL endpoint
  admissionFormUrl: "",
  
  admissionStatus: "Contact the school office for current admission information",

  // -----------------------------------------------------------------------
  // Floating Admission Island Configuration
  // Change these values to control the floating widget across ALL pages.
  // Set enabled: false to completely hide the widget sitewide.
  // -----------------------------------------------------------------------
  floatingAdmission: {
    enabled: true,
    status: "custom",          // "open" | "closed" | "custom"
    title: "Admissions Information",
    classes: "All enquiries",
    message: "Please contact the school office to confirm current availability.",
    buttonText: "Contact School",
    link: "",               // No application URL confirmed; falls back to contact.html
    target: "_self",           // "_self" or "_blank"
    showAfterScroll: 300,      // px scrolled before island appears
    position: "bottom-right"   // "bottom-right" | "bottom-left"
  }
};
