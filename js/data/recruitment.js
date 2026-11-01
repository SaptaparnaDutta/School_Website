/**
 * Recruitment and Vacancies Data
 */
window.SVCS_DATA = window.SVCS_DATA || {};

window.SVCS_DATA.recruitment = {
  settings: {
    introduction: "We welcome talented and passionate educators and staff members who want to contribute to a supportive learning environment. Browse our current vacancies below and apply using the official channels.",
    applicationMethod: "email", // "email" or "external_form"
    applicationEmail: "svcs.12@rediffmail.com", // Used if applicationMethod is "email"
    applicationFormUrl: "", // Add only a school-approved application URL
    instructions: "To apply, please review the requirements carefully and submit your latest CV along with a cover letter indicating the position you are applying for.",
    privacyText: "By submitting your application, you consent to Swami Vivekananda Centenary School processing your personal data for recruitment purposes."
  },
  vacancies: [
    {
      id: "vac-001",
      title: "PGT Mathematics Teacher",
      department: "Senior Secondary",
      employmentType: "Full Time",
      location: "SVCS Campus, Chakdaha",
      description: "We are seeking an experienced PGT Mathematics teacher to teach Classes XI and XII for the ISC curriculum.",
      qualification: "M.Sc in Mathematics, B.Ed (Mandatory)",
      experience: "Minimum 3 years of teaching experience at the Senior Secondary level.",
      responsibilities: [
        "Deliver comprehensive lessons according to the ISC syllabus.",
        "Prepare students for board examinations.",
        "Conduct periodic assessments and maintain academic records."
      ],
      requirements: [
        "Strong command over subject matter.",
        "Excellent communication skills in English.",
        "Familiarity with digital teaching tools."
      ],
      applicationDeadline: "2026-10-15",
      status: "open" // "open", "closed", or "draft"
    },
    {
      id: "vac-002",
      title: "TGT English Teacher",
      department: "Middle & Secondary School",
      employmentType: "Full Time",
      location: "SVCS Campus, Chakdaha",
      description: "Seeking a dynamic TGT English teacher to engage middle and secondary school students, fostering a strong foundation in literature and language arts.",
      qualification: "M.A / B.A in English, B.Ed (Mandatory)",
      experience: "Minimum 2 years of teaching experience in ICSE/CBSE schools.",
      responsibilities: [
        "Teach English grammar, literature, and creative writing.",
        "Organize debates and language-focused extracurricular activities.",
        "Evaluate student progress regularly."
      ],
      requirements: [
        "Impeccable spoken and written English.",
        "Ability to create engaging lesson plans."
      ],
      applicationDeadline: "2026-09-30",
      status: "open"
    },
    {
      id: "vac-003",
      title: "Primary School Teacher (EVS)",
      department: "Primary School",
      employmentType: "Full Time",
      location: "SVCS Campus, Chakdaha",
      description: "Looking for an enthusiastic Primary teacher for Environmental Science.",
      qualification: "B.Sc/B.A, D.El.Ed or B.Ed",
      experience: "Fresher to 1 year.",
      responsibilities: [],
      requirements: [],
      applicationDeadline: "2026-08-30",
      status: "closed" // This will not show in the active list
    }
  ]
};
