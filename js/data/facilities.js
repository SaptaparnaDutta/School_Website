/**
 * Facilities and Campus Data
 */
window.SVCS_DATA = window.SVCS_DATA || {};

window.SVCS_DATA.facilities = [
  {
    id: "fac-classrooms",
    title: " Classrooms",
    category: "Learning",
    description: "Facility details and availability will be confirmed by the school administration.",
    image: "assets/images/facilities/classroom.jpeg"
  },
  {
    id: "fac-scilabs",
    title: "Science Laboratories",
    category: "Laboratories",
    description: "Facility details and availability will be confirmed by the school administration.",
    image: "assets/images/facilities/science_lab.jpeg"
  },
  {
    id: "fac-complab",
    title: "Computer Science Center",
    category: "Laboratories",
    description: "Facility details and availability will be confirmed by the school administration.",
    image: "assets/images/facilities/computer_lab.jpeg"
  },
  {
    id: "fac-library",
    title: "Central Library",
    category: "Learning",
    description: "Facility details and availability will be confirmed by the school administration.",
    image: "assets/images/facilities/library.jpeg"
  },
  {
    id: "fac-sports",
    title: "Playground & Sports Complex",
    category: "Sports",
    description: "Facility details and availability will be confirmed by the school administration.",
    image: "assets/images/facilities/playground.jpeg"
  },
  {
    id: "fac-safety",
    title: "Safety & Security Systems",
    category: "Other",
    description: "Facility details and availability will be confirmed by the school administration.",
    image: "assets/images/facilities/svcs_safe_security_collage.jpg"
  }
];

window.SVCS_DATA.facilitiesPage = {
  campusIntro: "The school will share confirmed information about its campus and facilities here. Please contact the school office for current details.",
  classrooms: {
    title: "Classrooms & Learning Spaces",
    description: "Classroom features and available learning equipment will be confirmed by the school administration.",
    features: []
  },
  laboratories: [
    {
      title: "Science Laboratories",
      description: "Laboratory facilities and equipment will be confirmed by the school administration.",
      icon: "🔬"
    },
    {
      title: "Computer Science Center",
      description: "The availability and equipment of this facility will be confirmed by the school administration.",
      icon: "💻"
    }
  ],
  library: {
    title: "Central Library",
    description: "Library resources, opening arrangements and facilities will be confirmed by the school administration."
  },
  sports: {
    title: "Sports & Physical Education",
    description: "Sports grounds, equipment and activities available to students will be confirmed by the school administration.",
    activities: []
  },
  arts: {
    title: "Arts & Cultural Spaces",
    description: "Arts, music and cultural facilities will be confirmed by the school administration."
  },
  studentServices: [
    { title: "Drinking Water", icon: "💧", description: "Availability and arrangements will be confirmed by the school administration." },
    { title: "Washrooms", icon: "🚿", description: "Facilities and arrangements will be confirmed by the school administration." },
    { title: "First Aid", icon: "🩹", description: "First-aid provisions will be confirmed by the school administration." }
  ],
  technology: {
    title: "Technology Infrastructure",
    description: "Technology, classroom equipment and digital learning tools will be confirmed by the school administration."
  },
  safety: {
    title: "Safety & Security",
    description: "Campus safety measures and security arrangements will be confirmed by the school administration.",
    systems: []
  }
};
