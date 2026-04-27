# SM Course

A static, GitHub Pages-ready learning hub for multiple courses, subcourses, lessons, notes, bookmarks, and local progress tracking.

## Structure

```text
.
├── index.html
├── courses/
│   ├── social-media/
│   │   ├── index.html
│   │   └── subcourses/
│   │       ├── strategy/index.html
│   │       └── content-planning/index.html
│   └── ai-productivity/
│       ├── index.html
│       └── subcourses/fundamentals/index.html
├── data/courses.js
├── scripts/
│   ├── app-course.js
│   ├── app-home.js
│   ├── app-subcourse.js
│   ├── components.js
│   ├── router.js
│   ├── storage.js
│   └── utils.js
└── styles/
    ├── base.css
    ├── components.css
    ├── layout.css
    └── main.css
```

## Add a Course

1. Add a new object in `data/courses.js`.
2. Create `courses/<course-slug>/index.html` and set:

```html
<body data-page="course" data-course="course-slug">
```

3. Create subcourse folders such as `courses/<course-slug>/subcourses/<subcourse-slug>/index.html` and set:

```html
<body data-page="subcourse" data-course="course-slug" data-subcourse="subcourse-slug">
```

Reuse the existing pages as templates.

## GitHub Pages

This project does not need a build step.

1. Push the repository to GitHub.
2. Open repository settings.
3. Go to **Pages**.
4. Set source to **Deploy from a branch**.
5. Choose `main` and `/root`.
6. Save.

All links are relative and work under a GitHub Pages project path such as `/SM-course/`.

