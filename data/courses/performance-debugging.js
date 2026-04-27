export const course = {
  slug: "performance-debugging",
  title: "Performance & Debugging",
  summary: "Diagnozowanie wolnych ekranów, renderów, list, animacji i problemów sieciowych w RN.",
  path: "Production Engineer",
  priority: 5,
  status: "Planowany",
  accent: "#f59e0b",
  learningPath: "production-engineer",
  contentStatus: "placeholder",
  focusAreas: ["profiling", "memory leaks", "FlatList", "network debugging", "animation performance"],
  plannedModules: [
    {
      title: "Profiling RN apps",
      scope: "React DevTools, Flipper, console profiling i interpretacja bottlenecków.",
      projectPlaceholder: "Diagnoza wolnego ekranu."
    },
    {
      title: "Rendering and list performance",
      scope: "Unnecessary re-renders, memoization, FlatList tuning i koszt renderowania.",
      projectPlaceholder: "Slow list -> optimized list."
    },
    {
      title: "Animation and memory issues",
      scope: "UI thread, animation jank, subscriptions, leaks i cleanup.",
      projectPlaceholder: "Performance case z animacją."
    }
  ]
};

