export const course = {
  slug: "mobile-architecture",
  title: "Mobile Architecture & Patterns",
  summary: "Struktura aplikacji mobilnej, separacja warstw i skalowalne podejście feature-based.",
  path: "Professional RN Developer",
  priority: 3,
  status: "Planowany",
  accent: "#a78bfa",
  learningPath: "professional-rn",
  contentStatus: "placeholder",
  focusAreas: ["feature architecture", "clean architecture", "state machines", "offline-first", "caching"],
  plannedModules: [
    {
      title: "Feature-based architecture",
      scope: "Podział UI, domain, data, services i shared modules w aplikacji RN.",
      projectPlaceholder: "Szkielet skalowalnej aplikacji mobilnej od zera."
    },
    {
      title: "State and data boundaries",
      scope: "Loading/error/success, state machines, cache ownership i use cases.",
      projectPlaceholder: "Feature z wyraźnym data flow i stanami."
    },
    {
      title: "Offline-first basics",
      scope: "Cache, retry, optimistic updates i ograniczenia synchronizacji.",
      projectPlaceholder: "Prosty offline-ready feature."
    }
  ]
};

