import { findCourse, findLearningPath } from "../data/courses/index.js";
import { favoriteButton, progressControl, statusSelect, textArea } from "./components.js";
import { homePath } from "./router.js";
import { el } from "./utils.js";

const app = document.querySelector("#app");
const courseSlug = document.body.dataset.course;
const course = findCourse(courseSlug);
const learningPath = course ? findLearningPath(course.learningPath) : null;

function render() {
  if (!course) {
    app.replaceChildren(el("main", { className: "page" }, [
      el("h1", { text: "Nie znaleziono kursu" }),
      el("a", { href: homePath(), text: "Wróć do listy kursów" })
    ]));
    return;
  }

  document.title = `${course.title} · Study Hub`;
  app.replaceChildren(
    el("header", { className: "site-header" }, [
      el("nav", { className: "nav" }, [
        el("a", { className: "brand", href: homePath() }, [
          el("span", { className: "brand-mark", text: "SM" }),
          el("span", { text: "Study Hub" })
        ]),
        el("a", { className: "nav-link", href: homePath(), text: "Wszystkie kursy" })
      ])
    ]),
    el("main", { className: "page" }, [
      el("div", { className: "breadcrumbs" }, [
        el("a", { href: homePath(), text: "Kursy" }),
        el("span", { text: "/" }),
        learningPath ? el("span", { text: learningPath.title }) : null,
        learningPath ? el("span", { text: "/" }) : null,
        el("span", { text: course.title })
      ]),
      el("section", { className: "course-hero", style: `--accent: ${course.accent}` }, [
        el("div", {}, [
          el("p", { className: "eyebrow", text: course.path }),
          el("h1", { text: course.title }),
          el("p", { className: "lede", text: course.summary }),
          el("div", { className: "tag-row" }, course.focusAreas.map((area) => el("span", { className: "tag", text: area })))
        ]),
        el("aside", { className: "study-panel" }, [
          favoriteButton(`course:${course.slug}`),
          statusSelect(`course:${course.slug}`),
          progressControl(`course:${course.slug}`)
        ])
      ]),
      el("section", { className: "split-layout" }, [
        el("div", {}, [
          el("section", { className: "notice-panel" }, [
            el("p", { className: "eyebrow", text: "Placeholder" }),
            el("h2", { text: "Content kursu zostanie dodany w kolejnym kroku" }),
            el("p", {
              text: "Ta strona ma już docelowe miejsce w strukturze, routing, notatki i kontrolki nauki. Teraz przechowuje tylko plan modułów, żeby agent mógł później pracować na konkretnym kursie bez szukania w monolitach."
            })
          ]),
          el("div", { className: "section-heading" }, [
            el("div", {}, [
              el("p", { className: "eyebrow", text: "Plan kursu" }),
              el("h2", { text: "Planowane moduły" })
            ])
          ]),
          el("div", { className: "module-list" }, course.plannedModules.map((module, index) => {
            return el("article", { className: "module-card" }, [
              el("div", { className: "card-topline" }, [
                el("span", { className: "pill", text: `Moduł ${index + 1}` }),
                el("span", { text: "Do uzupełnienia" })
              ]),
              el("h3", { text: module.title }),
              el("p", { text: module.scope }),
              el("div", { className: "placeholder-box" }, [
                el("span", { className: "metric-label", text: "Projekt placeholder" }),
                el("strong", { text: module.projectPlaceholder })
              ])
            ]);
          }))
        ]),
        el("aside", { className: "side-stack" }, [
          el("section", { className: "panel" }, [
            el("h2", { text: "Metadane" }),
            el("dl", { className: "meta-list" }, [
              el("dt", { text: "Ścieżka" }),
              el("dd", { text: course.path }),
              el("dt", { text: "Priorytet" }),
              el("dd", { text: String(course.priority) }),
              el("dt", { text: "Status contentu" }),
              el("dd", { text: course.contentStatus }),
              el("dt", { text: "Plik danych" }),
              el("dd", { text: `data/courses/${course.slug}.js` })
            ])
          ]),
          el("section", { className: "panel" }, [
            textArea({
              id: `course:${course.slug}`,
              label: "Notatki do kursu",
              placeholder: "Zapisz decyzje, linki, pytania albo pomysły do przyszłego contentu...",
              onSave: (value) => localStorage.setItem(`sm-course:notes:course:${course.slug}`, JSON.stringify(value))
            })
          ])
        ])
      ])
    ])
  );
}

render();
