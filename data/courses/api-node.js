export const course = {
  slug: "api-node",
  title: "API + Node.js dla Frontendowca",
  summary: "Praktyczne rozumienie API, auth i backendowych kontraktów bez wchodzenia w pełny backend role.",
  path: "Fullstack Awareness",
  priority: 4,
  status: "Planowany",
  accent: "#34d399",
  learningPath: "fullstack-awareness",
  contentStatus: "placeholder",
  focusAreas: ["REST", "auth", "JWT", "pagination", "typed API client", "mock backend"],
  plannedModules: [
    {
      title: "API request lifecycle",
      scope: "REST basics, status codes, headers, errors, pagination, filtering i rate limiting.",
      projectPlaceholder: "Typed API client dla aplikacji mobilnej."
    },
    {
      title: "Auth flow",
      scope: "JWT, refresh tokens, secure storage mental model i session expiry.",
      projectPlaceholder: "Auth flow z mock backendem."
    },
    {
      title: "Simple Node API",
      scope: "Minimalne endpointy, walidacja inputu i spójne response shape.",
      projectPlaceholder: "Mały mock backend do kursów mobilnych."
    }
  ]
};

