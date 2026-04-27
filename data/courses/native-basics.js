export const course = {
  slug: "native-basics",
  title: "Native Basics",
  summary: "Podstawy Android/iOS potrzebne RN developerowi do debugowania i rozmów technicznych.",
  path: "Bonus",
  priority: 9,
  status: "Bonus",
  accent: "#c084fc",
  learningPath: "bonus",
  contentStatus: "placeholder",
  focusAreas: ["Android basics", "iOS basics", "lifecycle", "permissions", "native debugging"],
  plannedModules: [
    {
      title: "Platform lifecycle",
      scope: "Podstawowe różnice Android/iOS, lifecycle, backgrounding i app state.",
      projectPlaceholder: "Mapa platformowych zdarzeń dla RN screen."
    },
    {
      title: "Permissions and native APIs",
      scope: "Camera, location, notifications, permissions flow i failure cases.",
      projectPlaceholder: "Permission flow checklist."
    },
    {
      title: "When RN is not enough",
      scope: "Native modules mental model, debugging native errors i decyzje bridge/native.",
      projectPlaceholder: "Decision tree dla problemu native."
    }
  ]
};

