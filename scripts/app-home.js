import { courses } from "../data/courses.js";
import { favoriteButton, progressControl, searchInput, selectControl, statusSelect } from "./components.js";
import { coursePath } from "./router.js";
import { el, normalizeText, percent } from "./utils.js";
import { getCompletedLessons } from "./storage.js";

const app = document.querySelector("#app");
let query = "";
let statusFilter = "All";

function courseProgress(course) {
  const lessonCount = course.subcourses.reduce((total, subcourse) => total + subcourse.lessons.length, 0);
  const completedCount = course.subcourses.reduce((total, subcourse) => {
    return total + getCompletedLessons(`${course.slug}:${subcourse.slug}`).length;
  }, 0);
  return percent(completedCount, lessonCount);
}

function renderShell() {
  app.replaceChildren(
    el("header", { className: "site-header" }, [
      el("nav", { className: "nav" }, [
        el("a", { className: "brand", href: "./index.html" }, [
          el("span", { className: "brand-mark", text: "SM" }),
          el("span", { text: "Study Hub" })
        ]),
        el("span", { className: "version-pill", text: "Static GitHub Pages" })
      ])
    ]),
    el("main", { className: "page" }, [
      el("section", { className: "hero" }, [
        el("div", { className: "hero-copy" }, [
          el("p", { className: "eyebrow", text: "Personal knowledge hub" }),
          el("h1", { text: "Courses, subcourses, notes, and progress in one calm workspace." }),
          el("p", {
            className: "lede",
            text: "A modular study site built for many courses. Add content in one data file, keep pages light, and let the shared UI handle the layout."
          })
        ]),
        el("aside", { className: "hero-panel" }, [
          el("span", { className: "metric-label", text: "Courses" }),
          el("strong", { className: "metric-value", text: String(courses.length) }),
          el("span", { className: "metric-label", text: "Subcourses" }),
          el("strong", { className: "metric-value", text: String(courses.reduce((sum, course) => sum + course.subcourses.length, 0)) })
        ])
      ]),
      el("section", { className: "toolbar", id: "course-toolbar" }),
      el("section", { className: "course-grid", id: "course-grid", "aria-live": "polite" })
    ])
  );
}

function renderToolbar() {
  const toolbar = document.querySelector("#course-toolbar");
  toolbar.replaceChildren(
    searchInput({
      placeholder: "Search courses, tags, outcomes...",
      onInput: (value) => {
        query = normalizeText(value);
        renderCourses();
      }
    }),
    selectControl({
      id: "status-filter",
      label: "Filter",
      value: statusFilter,
      options: ["All", "Active", "Draft", "Archived"],
      onChange: (value) => {
        statusFilter = value;
        renderCourses();
      }
    })
  );
}

function renderCourses() {
  const grid = document.querySelector("#course-grid");
  const filtered = courses.filter((course) => {
    const haystack = normalizeText([
      course.title,
      course.summary,
      course.level,
      course.status,
      course.tags.join(" "),
      course.outcomes.join(" ")
    ].join(" "));
    const matchesSearch = !query || haystack.includes(query);
    const matchesStatus = statusFilter === "All" || course.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  grid.replaceChildren(...filtered.map((course) => {
    const progress = courseProgress(course);
    return el("article", { className: "course-card", style: `--accent: ${course.accent}` }, [
      el("div", { className: "card-topline" }, [
        el("span", { className: "pill", text: course.status }),
        favoriteButton(`course:${course.slug}`)
      ]),
      el("h2", {}, el("a", { href: coursePath(course.slug), text: course.title })),
      el("p", { text: course.summary }),
      el("div", { className: "tag-row" }, course.tags.map((tag) => el("span", { className: "tag", text: tag }))),
      el("div", { className: "meter", "aria-label": `${progress}% complete` }, [
        el("span", { style: `width: ${progress}%` })
      ]),
      el("div", { className: "card-meta" }, [
        el("span", { text: `${course.subcourses.length} subcourses` }),
        el("span", { text: `${progress}% complete` })
      ]),
      statusSelect(`course:${course.slug}`),
      progressControl(`course:${course.slug}`)
    ]);
  }));

  if (!filtered.length) {
    grid.replaceChildren(el("div", { className: "empty-state" }, [
      el("h2", { text: "No courses found" }),
      el("p", { text: "Try a broader search or change the status filter." })
    ]));
  }
}

renderShell();
renderToolbar();
renderCourses();

