const PREFIX = "sm-course";

function key(parts) {
  return [PREFIX, ...parts].join(":");
}

export function getJSON(parts, fallback) {
  try {
    const value = localStorage.getItem(key(parts));
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function setJSON(parts, value) {
  localStorage.setItem(key(parts), JSON.stringify(value));
}

export function getFavorite(id) {
  return getJSON(["favorite", id], false);
}

export function setFavorite(id, value) {
  setJSON(["favorite", id], value);
}

export function getStatus(id) {
  return getJSON(["status", id], "Not started");
}

export function setStatus(id, value) {
  setJSON(["status", id], value);
}

export function getProgress(id) {
  return getJSON(["progress", id], 0);
}

export function setProgress(id, value) {
  setJSON(["progress", id], Number(value));
}

export function getNotes(id) {
  return getJSON(["notes", id], "");
}

export function setNotes(id, value) {
  setJSON(["notes", id], value);
}

export function getCompletedLessons(scopeId) {
  return getJSON(["completed", scopeId], []);
}

export function setCompletedLessons(scopeId, lessonIds) {
  setJSON(["completed", scopeId], lessonIds);
}

