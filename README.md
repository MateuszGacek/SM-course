# SM Course

Statyczny, GitHub Pages-ready hub nauki pod wiele kursów. Aktualny etap zawiera nawigację, ścieżki nauki i placeholdery kursów; właściwy content kursów będzie dodawany później.

## Struktura

```text
.
├── index.html
├── courses/
│   ├── js-typescript/index.html
│   ├── advanced-react-native/index.html
│   └── ...
├── data/courses/
│   ├── index.js
│   ├── js-typescript.js
│   ├── advanced-react-native.js
│   └── ...
├── scripts/
│   ├── app-course.js
│   ├── app-home.js
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

## Dodawanie Kursu

1. Dodaj nowy plik `data/courses/<course-slug>.js`.
2. Wyeksportuj z niego `course` zgodny z interfejsem:

```js
export const course = {
  slug: "course-slug",
  title: "Course title",
  summary: "Short purpose statement.",
  path: "Foundations",
  priority: 10,
  status: "Planowany",
  accent: "#5eead4",
  learningPath: "foundations",
  contentStatus: "placeholder",
  focusAreas: ["topic"],
  plannedModules: [
    {
      title: "Module title",
      scope: "What this module will cover.",
      projectPlaceholder: "Future project placeholder."
    }
  ]
};
```

3. Zaimportuj kurs w `data/courses/index.js` i dodaj go do tablicy `courses`.
4. Utwórz `courses/<course-slug>/index.html` i ustaw:

```html
<body data-page="course" data-course="course-slug">
```

Najprościej skopiować istniejący placeholder z `courses/js-typescript/index.html` i zmienić `title`, `description` oraz `data-course`.

## Obecne Ścieżki

- Foundations
- Professional RN Developer
- Fullstack Awareness
- Production Engineer
- Bonus

Content kursów nie powinien być teraz dokładany do HTML. Najpierw dodawaj metadane i plan modułów w osobnym pliku kursu.

## GitHub Pages

Projekt nie wymaga build stepu.

1. Push do GitHuba.
2. Repository settings.
3. **Pages**.
4. Source: **Deploy from a branch**.
5. Branch: `main`, folder: `/root`.
6. Save.

Wszystkie linki są względne i działają pod project path typu `/SM-course/`.
