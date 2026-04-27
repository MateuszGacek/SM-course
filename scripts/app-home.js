import { courses, coursesByLearningPath, filterCourses, learningPaths } from "../data/courses/index.js";
import { favoriteButton, progressControl, searchInput, selectControl, statusSelect } from "./components.js";
import { coursePath } from "./router.js";
import { el, normalizeText } from "./utils.js";

const app = document.querySelector("#app");
let query = "";
let statusFilter = "Wszystkie";
let pathFilter = "all";

function renderShell() {
  app.replaceChildren(
    el("header", { className: "site-header" }, [
      el("nav", { className: "nav" }, [
        el("a", { className: "brand", href: "./index.html" }, [
          el("span", { className: "brand-mark", text: "SM" }),
          el("span", { text: "Study Hub" })
        ]),
        el("span", { className: "version-pill", text: "GitHub Pages ready" })
      ])
    ]),
    el("main", { className: "page" }, [
      el("section", { className: "hero" }, [
        el("div", { className: "hero-copy" }, [
          el("p", { className: "eyebrow", text: "Multikursowy hub nauki" }),
          el("h1", { text: "Mapa kursów pod uniwersalnego inżyniera mobile." }),
          el("p", {
            className: "lede",
            text: "Aktualnie to szkielet nawigacji i placeholdery. Content kursów zostanie dodany w kolejnym kroku, bez przepisywania layoutu."
          })
        ]),
        el("aside", { className: "hero-panel" }, [
          el("span", { className: "metric-label", text: "Kursy" }),
          el("strong", { className: "metric-value", text: String(courses.length) }),
          el("span", { className: "metric-label", text: "Ścieżki" }),
          el("strong", { className: "metric-value", text: String(learningPaths.length) })
        ])
      ]),
      el("section", { className: "toolbar", id: "course-toolbar" }),
      el("section", { className: "path-stack", id: "course-paths", "aria-live": "polite" })
    ])
  );
}

function renderToolbar() {
  const toolbar = document.querySelector("#course-toolbar");
  toolbar.replaceChildren(
    searchInput({
      placeholder: "Szukaj kursów, ścieżek, technologii...",
      onInput: (value) => {
        query = normalizeText(value);
        renderCourses();
      }
    }),
    selectControl({
      id: "status-filter",
      label: "Status",
      value: statusFilter,
      options: ["Wszystkie", "Planowany", "Bonus", "Draft", "Gotowy"],
      onChange: (value) => {
        statusFilter = value;
        renderCourses();
      }
    }),
    selectControl({
      id: "path-filter",
      label: "Ścieżka",
      value: pathFilter,
      options: [
        { value: "all", label: "Wszystkie" },
        ...learningPaths.map((path) => ({ value: path.id, label: path.title }))
      ],
      onChange: (value) => {
        pathFilter = value;
        renderCourses();
      }
    })
  );
}

function renderCourses() {
  const stack = document.querySelector("#course-paths");
  const filtered = filterCourses({ query, status: statusFilter, learningPath: pathFilter });
  const groups = coursesByLearningPath(filtered).filter((path) => path.courses.length);

  stack.replaceChildren(...groups.map((path) => {
    return el("section", { className: "path-section" }, [
      el("div", { className: "section-heading" }, [
        el("div", {}, [
          el("p", { className: "eyebrow", text: "Ścieżka nauki" }),
          el("h2", { text: path.title }),
          el("p", { text: path.summary })
        ])
      ]),
      el("div", { className: "course-grid" }, path.courses.map((course) => {
        return el("article", { className: "course-card", style: `--accent: ${course.accent}` }, [
          el("div", { className: "card-topline" }, [
            el("span", { className: "pill", text: course.status }),
            favoriteButton(`course:${course.slug}`)
          ]),
          el("h3", {}, el("a", { href: coursePath(course.slug), text: course.title })),
          el("p", { text: course.summary }),
          el("div", { className: "tag-row" }, course.focusAreas.map((area) => el("span", { className: "tag", text: area }))),
          el("div", { className: "card-meta" }, [
            el("span", { text: course.path }),
            el("span", { text: `${course.plannedModules.length} moduły w planie` })
          ]),
          statusSelect(`course:${course.slug}`),
          progressControl(`course:${course.slug}`)
        ]);
      }))
    ]);
  }));

  if (!filtered.length) {
    stack.replaceChildren(el("div", { className: "empty-state" }, [
      el("h2", { text: "Nie znaleziono kursów" }),
      el("p", { text: "Zmień frazę wyszukiwania, status albo ścieżkę nauki." })
    ]));
  }
}

renderShell();
renderToolbar();
renderCourses();
