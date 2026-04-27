export function pathToRoot() {
  const page = document.body.dataset.page;
  if (page === "course") return "../..";
  if (page === "subcourse") return "../../../..";
  return ".";
}

export function homePath() {
  return `${pathToRoot()}/index.html`;
}

export function coursePath(courseSlug) {
  return `${pathToRoot()}/courses/${courseSlug}/index.html`;
}

export function subcoursePath(courseSlug, subcourseSlug) {
  return `${pathToRoot()}/courses/${courseSlug}/subcourses/${subcourseSlug}/index.html`;
}
