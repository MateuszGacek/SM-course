export const course = {
  slug: "react",
  title: "React",
  summary: "React jako przewaga dodatkowa: rendering model, hooks, performance i wzorce komponentów.",
  path: "Bonus",
  priority: 8,
  status: "Bonus",
  accent: "#38bdf8",
  learningPath: "bonus",
  contentStatus: "placeholder",
  focusAreas: ["hooks", "rendering model", "performance", "compound components", "render props"],
  plannedModules: [
    {
      title: "Hooks deep dive",
      scope: "useEffect, dependencies, memoization, custom hooks i pułapki renderowania.",
      projectPlaceholder: "Zestaw hooków pod data/UI flows."
    },
    {
      title: "Rendering model",
      scope: "Render, commit, reconciliation, state updates i component boundaries.",
      projectPlaceholder: "Debug render behavior w małej aplikacji."
    },
    {
      title: "Component patterns",
      scope: "Compound components, render props, controlled/uncontrolled patterns.",
      projectPlaceholder: "Reusable UI primitive."
    }
  ]
};

