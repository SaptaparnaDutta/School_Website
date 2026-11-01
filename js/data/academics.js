/**
 * Academics Page specific content
 */
window.SVCS_DATA = window.SVCS_DATA || {};

window.SVCS_DATA.academics = {
  overview: "At Swami Vivekananda Centenary School, we focus on a holistic educational approach that nurtures curiosity, critical thinking, and character building in our students.",
  gradeLevels: [
    {
      id: "pre-primary",
      stage: "Pre-Primary & Primary",
      grades: "Play Group to Class V",
      description: "Focuses on activity-based learning, language skills, number patterns, social interaction, and motor coordinates."
    },
    {
      id: "middle-secondary",
      stage: "Middle & Secondary",
      grades: "Class VI to Class X",
      description: "Introduction to specialized sciences, literature analyses, logical mathematics, social sciences, and computer applications under the ICSE board."
    },
    {
      id: "senior-secondary",
      stage: "Senior Secondary",
      grades: "Class XI & XII",
      description: "Stream specializations including Science (Physics, Chemistry, Biology, Mathematics/Computer) and Commerce streams under the ISC board."
    }
  ],
  curriculum: {
    board: "CISCE (ICSE / ISC)",
    description: "Our curriculum is structured to support comprehensive evaluation under CISCE standards. We emphasize hands-on experiments, training students to apply theoretical models practically."
  },
  teachingMethodology: [
    {
      title: "Interactive Learning",
      description: "Engaging classroom environments where students actively participate."
    },
    {
      title: "Smart-class Teaching",
      description: "Utilizing digital tools and visual aids to enhance understanding."
    },
    {
      title: "Practical Application",
      description: "Hands-on experiments in our modern science and computer laboratories."
    },
    {
      title: "Individual Support",
      description: "Attention to each student's unique learning pace and style."
    }
  ],
  subjects: {
    primary: ["English", "Bengali / Hindi", "Mathematics", "Environmental Science", "Computer Basics", "Art & Craft"],
    middle: ["English", "Bengali / Hindi", "Mathematics", "Science (Physics, Chemistry, Biology)", "History & Civics", "Geography", "Computer Applications"],
    secondary: ["English Language & Literature", "Second Language", "Mathematics", "Science (Physics, Chemistry, Biology)", "History, Civics & Geography", "Computer Applications / Economic Applications"],
    seniorSecondary: ["English", "Physics", "Chemistry", "Mathematics", "Biology / Computer Science", "Commerce Stream Subjects"]
  },
  assessment: [
    { title: "Terminal Examinations", description: "Conducted twice a year to verify course completion progress." },
    { title: "Unit Assessments", description: "Frequent periodic class worksheets monitoring knowledge acquisition." },
    { title: "Practical Worksheets", description: "Evaluation of laboratory experiments and file submissions." },
    { title: "Continuous Evaluation", description: "Regular feedback on classroom participation and assignments." }
  ],
  coCurricular: [
    { title: "Music & Dance", icon: "🎵" },
    { title: "Art & Craft", icon: "🎨" },
    { title: "Debate & Public Speaking", icon: "🎤" },
    { title: "Science & Eco Clubs", icon: "🌱" }
  ],
  sports: "We believe in the physical well-being of our students. Our sports program includes outdoor games like Football, Cricket, and Volleyball, as well as indoor activities like Table Tennis and Chess. Annual athletic meets are organized to foster teamwork and discipline.",
  studentDevelopment: [
    "Leadership Skills through Student Council",
    "Personality Development Programs",
    "Career Guidance Workshops",
    "Value Education Sessions"
  ],
  calendar: [
    { month: "April", events: "New Academic Session Begins" },
    { month: "May", events: "First Unit Assessments" },
    { month: "September", events: "First Terminal Examinations, Teachers' Day" },
    { month: "October", events: "Puja Vacations, Educational Tours" },
    { month: "December", events: "Annual Sports, Winter Break" },
    { month: "February", events: "Final Unit Assessments" },
    { month: "March", events: "Final Terminal Examinations" }
  ]
};
