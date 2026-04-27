export const course = {
  slug: "testing",
  title: "Testing",
  summary: "Testowanie logiki, hooków, async code i integracji z API w praktycznym stylu frontend/mobile.",
  path: "Production Engineer",
  priority: 6,
  status: "Planowany",
  accent: "#fb7185",
  learningPath: "production-engineer",
  contentStatus: "placeholder",
  focusAreas: ["unit tests", "hooks", "async tests", "API mocking", "integration basics"],
  plannedModules: [
    {
      title: "Unit tests for app logic",
      scope: "Jest/Vitest, pure functions, edge cases i readable test cases.",
      projectPlaceholder: "Test suite dla data helpers."
    },
    {
      title: "Testing hooks and async flows",
      scope: "Loading/error/success, timers, promises i mockowanie API.",
      projectPlaceholder: "Testy hooka pobierającego dane."
    },
    {
      title: "Integration basics",
      scope: "Testowanie przepływów bez kruchego przywiązania do implementacji.",
      projectPlaceholder: "Mini integration test dla feature flow."
    }
  ]
};

