import { findCourse } from "../data/courses.js";
import { favoriteButton, progressControl, searchInput, statusSelect, textArea } from "./components.js";
import { homePath, subcoursePath } from "./router.js";
import { el, normalizeText, percent } from "./utils.js";
import { getCompletedLessons } from "./storage.js";

const app = document.querySelector("#app");
const courseSlug = document.body.dataset.course;
const course = findCourse(courseSlug);
let query = "";

function subcourseProgress(subcourse) {
  return percent(getCompletedLessons(`${course.slug}:${subcourse.slug}`).length, subcourse.lessons.length);
}

function render() {
  if (!course) {
    app.replaceChildren(el("main", { className: "page" }, [
      el("h1", { text: "Course not found" }),
      el("a", { href: homePath(), text: "Back to all courses" })
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
        el("a", { className: "nav-link", href: homePath(), text: "All courses" })
      ])
    ]),
    el("main", { className: "page" }, [
      el("div", { className: "breadcrumbs" }, [
        el("a", { href: homePath(), text: "Courses" }),
        el("span", { text: "/" }),
        el("span", { text: course.title })
      ]),
      el("section", { className: "course-hero", style: `--accent: ${course.accent}` }, [
        el("div", {}, [
          el("p", { className: "eyebrow", text: course.level }),
          el("h1", { text: course.title }),
          el("p", { className: "lede", text: course.summary }),
          el("div", { className: "tag-row" }, course.tags.map((tag) => el("span", { className: "tag", text: tag })))
        ]),
        el("aside", { className: "study-panel" }, [
          favoriteButton(`course:${course.slug}`),
          statusSelect(`course:${course.slug}`),
          progressControl(`course:${course.slug}`)
        ])
      ]),
      el("section", { className: "split-layout" }, [
        el("div", {}, [
          el("div", { className: "section-heading" }, [
            el("div", {}, [
              el("p", { className: "eyebrow", text: "Course map" }),
              el("h2", { text: "Subcourses" })
            ]),
            searchInput({
              placeholder: "Search subcourses and lessons...",
              onInput: (value) => {
                query = normalizeText(value);
                renderSubcourses();
              }
            })
          ]),
          el("div", { className: "subcourse-list", id: "subcourse-list" })
        ]),
        el("aside", { className: "side-stack" }, [
          el("section", { className: "panel" }, [
            el("h2", { text: "Learning Outcomes" }),
            el("ul", { className: "check-list" }, course.outcomes.map((outcome) => el("li", { text: outcome })))
          ]),
          el("section", { className: "panel" }, [
            textArea({
              id: `course:${course.slug}`,
              label: "Course Notes",
              placeholder: "Capture decisions, links, examples, or questions...",
              onSave: (value) => localStorage.setItem(`sm-course:notes:course:${course.slug}`, JSON.stringify(value))
            })
          ])
        ])
      ])
    ])
  );

  renderSubcourses();
}

function renderSubcourses() {
  const list = document.querySelector("#subcourse-list");
  const filtered = course.subcourses.filter((subcourse) => {
    const haystack = normalizeText([
      subcourse.title,
      subcourse.summary,
      subcourse.status,
      subcourse.lessons.map((lesson) => `${lesson.title} ${lesson.summary} ${lesson.topics.join(" ")}`).join(" ")
    ].join(" "));
    return !query || haystack.includes(query);
  });

  list.replaceChildren(...filtered.map((subcourse) => {
    const progress = subcourseProgress(subcourse);
    return el("article", { className: "subcourse-card" }, [
      el("div", { className: "card-topline" }, [
        el("span", { className: "pill", text: subcourse.status }),
        el("span", { text: subcourse.duration })
      ]),
      el("h3", {}, el("a", { href: subcoursePath(course.slug, subcourse.slug), text: subcourse.title })),
      el("p", { text: subcourse.summary }),
      el("div", { className: "meter" }, [el("span", { style: `width: ${progress}%` })]),
      el("div", { className: "card-meta" }, [
        el("span", { text: `${subcourse.lessons.length} lessons` }),
        el("span", { text: `${progress}% complete` })
      ])
    ]);
  }));

  if (!filtered.length) {
    list.replaceChildren(el("div", { className: "empty-state" }, [
      el("h2", { text: "No subcourses found" }),
      el("p", { text: "Search by lesson title, topic, or subcourse summary." })
    ]));
  }
}

render();

