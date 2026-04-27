import { course as jsTypescript } from "./js-typescript.js";
import { course as advancedReactNative } from "./advanced-react-native.js";
import { course as mobileArchitecture } from "./mobile-architecture.js";
import { course as apiNode } from "./api-node.js";
import { course as performanceDebugging } from "./performance-debugging.js";
import { course as testing } from "./testing.js";
import { course as realWorldEngineering } from "./real-world-engineering.js";
import { course as react } from "./react.js";
import { course as nativeBasics } from "./native-basics.js";
import { normalizeText } from "../../scripts/utils.js";

export const learningPaths = [
  {
    id: "foundations",
    title: "Foundations",
    summary: "Baza JS/TS i core RN pod dalsze kursy."
  },
  {
    id: "professional-rn",
    title: "Professional RN Developer",
    summary: "Zaawansowany React Native, architektura i performance."
  },
  {
    id: "fullstack-awareness",
    title: "Fullstack Awareness",
    summary: "API, Node i data handling z perspektywy frontend/mobile."
  },
  {
    id: "production-engineer",
    title: "Production Engineer",
    summary: "Debugging, testing i real-world engineering mindset."
  },
  {
    id: "bonus",
    title: "Bonus",
    summary: "React i podstawy native jako dodatkowa przewaga."
  }
];

export const courses = [
  jsTypescript,
  advancedReactNative,
  mobileArchitecture,
  apiNode,
  performanceDebugging,
  testing,
  realWorldEngineering,
  react,
  nativeBasics
].sort((a, b) => a.priority - b.priority);

export function findCourse(slug) {
  return courses.find((course) => course.slug === slug);
}

export function findLearningPath(id) {
  return learningPaths.find((path) => path.id === id);
}

export function filterCourses({ query = "", status = "Wszystkie", learningPath = "all" } = {}) {
  const normalizedQuery = normalizeText(query);

  return courses.filter((course) => {
    const haystack = normalizeText([
      course.title,
      course.summary,
      course.path,
      course.status,
      course.focusAreas.join(" "),
      course.plannedModules.map((module) => `${module.title} ${module.scope}`).join(" ")
    ].join(" "));
    const matchesSearch = !normalizedQuery || haystack.includes(normalizedQuery);
    const matchesStatus = status === "Wszystkie" || course.status === status;
    const matchesPath = learningPath === "all" || course.learningPath === learningPath;

    return matchesSearch && matchesStatus && matchesPath;
  });
}

export function coursesByLearningPath(courseList = courses) {
  return learningPaths.map((path) => ({
    ...path,
    courses: courseList.filter((course) => course.learningPath === path.id)
  }));
}
