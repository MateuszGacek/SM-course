import { findCourse, findSubcourse } from "../data/courses.js";
import { collapsible, favoriteButton, progressControl, searchInput, statusSelect, textArea } from "./components.js";
import { coursePath, homePath } from "./router.js";
import { el, normalizeText, percent } from "./utils.js";
import { getCompletedLessons, setCompletedLessons } from "./storage.js";

const app = document.querySelector("#app");
const courseSlug = document.body.dataset.course;
const subcourseSlug = document.body.dataset.subcourse;
const course = findCourse(courseSlug);
const subcourse = findSubcourse(courseSlug, subcourseSlug);
const scopeId = `${courseSlug}:${subcourseSlug}`;
let query = "";

function render() {
  if (!course || !subcourse) {
    app.replaceChildren(el("main", { className: "page" }, [
      el("h1", { text: "Subcourse not found" }),
      el("a", { href: homePath(), text: "Back to all courses" })
    ]));
    return;
  }

  document.title = `${subcourse.title} · ${course.title}`;
  app.replaceChildren(
    el("header", { className: "site-header" }, [
      el("nav", { className: "nav" }, [
        el("a", { className: "brand", href: homePath() }, [
          el("span", { className: "brand-mark", text: "SM" }),
          el("span", { text: "Study Hub" })
        ]),
        el("a", { className: "nav-link", href: coursePath(course.slug), text: course.title })
      ])
    ]),
    el("main", { className: "page" }, [
      el("div", { className: "breadcrumbs" }, [
        el("a", { href: homePath(), text: "Courses" }),
        el("span", { text: "/" }),
        el("a", { href: coursePath(course.slug), text: course.title }),
        el("span", { text: "/" }),
        el("span", { text: subcourse.title })
      ]),
      el("section", { className: "course-hero", style: `--accent: ${course.accent}` }, [
        el("div", {}, [
          el("p", { className: "eyebrow", text: subcourse.status }),
          el("h1", { text: subcourse.title }),
          el("p", { className: "lede", text: subcourse.summary })
        ]),
        el("aside", { className: "study-panel" }, [
          favoriteButton(`subcourse:${scopeId}`),
          statusSelect(`subcourse:${scopeId}`),
          progressControl(`subcourse:${scopeId}`)
        ])
      ]),
      el("section", { className: "split-layout" }, [
        el("div", {}, [
          el("div", { className: "section-heading" }, [
            el("div", {}, [
              el("p", { className: "eyebrow", text: "Lessons" }),
              el("h2", { text: "Study Sections" })
            ]),
            searchInput({
              placeholder: "Search lessons, topics, tasks...",
              onInput: (value) => {
                query = normalizeText(value);
                renderLessons();
              }
            })
          ]),
          el("div", { className: "lesson-list", id: "lesson-list" })
        ]),
        el("aside", { className: "side-stack" }, [
          el("section", { className: "panel" }, [
            el("h2", { text: "Progress Snapshot" }),
            el("div", { className: "big-progress", id: "big-progress" })
          ]),
          el("section", { className: "panel" }, [
            textArea({
              id: `subcourse:${scopeId}`,
              label: "Study Notes",
              placeholder: "Save examples, open questions, links, and review notes...",
              onSave: (value) => localStorage.setItem(`sm-course:notes:subcourse:${scopeId}`, JSON.stringify(value))
            })
          ])
        ])
      ])
    ])
  );

  renderLessons();
}

function toggleLesson(lessonId, checked) {
  const current = new Set(getCompletedLessons(scopeId));
  if (checked) current.add(lessonId);
  else current.delete(lessonId);
  setCompletedLessons(scopeId, [...current]);
  renderProgress();
}

function renderProgress() {
  const complete = getCompletedLessons(scopeId).length;
  const total = subcourse.lessons.length;
  const progress = percent(complete, total);
  const target = document.querySelector("#big-progress");
  if (!target) return;
  target.replaceChildren(
    el("strong", { text: `${progress}%` }),
    el("span", { text: `${complete} of ${total} lessons complete` }),
    el("div", { className: "meter" }, [el("span", { style: `width: ${progress}%` })])
  );
}

function renderLessons() {
  const list = document.querySelector("#lesson-list");
  const completed = new Set(getCompletedLessons(scopeId));
  const filtered = subcourse.lessons.filter((lesson) => {
    const haystack = normalizeText([
      lesson.title,
      lesson.summary,
      lesson.topics.join(" "),
      lesson.tasks.join(" "),
      lesson.hints.join(" ")
    ].join(" "));
    return !query || haystack.includes(query);
  });

  list.replaceChildren(...filtered.map((lesson, index) => {
    const done = completed.has(lesson.id);
    return collapsible({
      title: lesson.title,
      eyebrow: done ? "Complete" : `Lesson ${index + 1}`,
      defaultOpen: index === 0 || done,
      children: [
        el("p", { className: "lesson-summary", text: lesson.summary }),
        el("div", { className: "tag-row" }, lesson.topics.map((topic) => el("span", { className: "tag", text: topic }))),
        el("div", { className: "lesson-grid" }, [
          el("div", {}, [
            el("h4", { text: "Tasks" }),
            el("ul", { className: "check-list" }, lesson.tasks.map((task) => el("li", { text: task })))
          ]),
          el("div", {}, [
            el("h4", { text: "Study Hints" }),
            el("ul", { className: "hint-list" }, lesson.hints.map((hint) => el("li", { text: hint })))
          ])
        ]),
        el("label", { className: "complete-toggle" }, [
          el("input", {
            type: "checkbox",
            checked: done ? "checked" : null,
            onChange: (event) => toggleLesson(lesson.id, event.target.checked)
          }),
          el("span", { text: "Mark lesson complete" })
        ])
      ]
    });
  }));

  if (!filtered.length) {
    list.replaceChildren(el("div", { className: "empty-state" }, [
      el("h2", { text: "No lessons found" }),
      el("p", { text: "Try searching for a different topic, task, or hint." })
    ]));
  }

  renderProgress();
}

render();

