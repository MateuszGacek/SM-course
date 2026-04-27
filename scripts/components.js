import { el } from "./utils.js";
import { getFavorite, getNotes, getProgress, getStatus, setFavorite, setNotes, setProgress, setStatus } from "./storage.js";

export const UI_VERSION = "1.0.0";

export function button({ label, icon = "", variant = "secondary", onClick, title }) {
  return el("button", {
    className: `button button-${variant}`,
    type: "button",
    title,
    onClick
  }, [
    icon ? el("span", { className: "button-icon", text: icon, "aria-hidden": "true" }) : null,
    el("span", { text: label })
  ]);
}

export function selectControl({ id, label, value, options, onChange }) {
  const select = el("select", {
    id,
    className: "input",
    onChange: (event) => onChange?.(event.target.value)
  }, options.map((option) => el("option", {
    value: option,
    text: option,
    selected: option === value ? "selected" : null
  })));

  return el("label", { className: "field" }, [
    el("span", { text: label }),
    select
  ]);
}

export function searchInput({ placeholder = "Search", onInput }) {
  return el("label", { className: "search" }, [
    el("span", { className: "search-icon", text: "⌕", "aria-hidden": "true" }),
    el("input", {
      className: "input",
      type: "search",
      placeholder,
      onInput: (event) => onInput?.(event.target.value)
    })
  ]);
}

export function textArea({ id, label = "Notes", placeholder, onSave }) {
  const area = el("textarea", {
    id,
    className: "textarea",
    rows: "7",
    placeholder,
    onInput: (event) => onSave?.(event.target.value)
  });
  area.value = getNotes(id);

  return el("label", { className: "field notes-field" }, [
    el("span", { text: label }),
    area
  ]);
}

export function statusSelect(scopeId, label = "Status") {
  return selectControl({
    id: `${scopeId}-status`,
    label,
    value: getStatus(scopeId),
    options: ["Not started", "Learning", "Reviewing", "Complete"],
    onChange: (value) => setStatus(scopeId, value)
  });
}

export function progressControl(scopeId) {
  const value = getProgress(scopeId);
  const output = el("strong", { text: `${value}%` });
  const range = el("input", {
    className: "range",
    type: "range",
    min: "0",
    max: "100",
    step: "5",
    value,
    onInput: (event) => {
      output.textContent = `${event.target.value}%`;
      setProgress(scopeId, event.target.value);
    }
  });

  return el("div", { className: "progress-control" }, [
    el("div", { className: "row-between" }, [
      el("span", { text: "Progress" }),
      output
    ]),
    range
  ]);
}

export function favoriteButton(id) {
  const active = getFavorite(id);
  const control = button({
    label: active ? "Bookmarked" : "Bookmark",
    icon: active ? "★" : "☆",
    variant: active ? "accent" : "secondary",
    title: "Toggle bookmark"
  });

  control.addEventListener("click", () => {
    const next = !getFavorite(id);
    setFavorite(id, next);
    control.className = `button button-${next ? "accent" : "secondary"}`;
    control.querySelector(".button-icon").textContent = next ? "★" : "☆";
    control.querySelector("span:last-child").textContent = next ? "Bookmarked" : "Bookmark";
  });

  return control;
}

export function collapsible({ title, eyebrow, defaultOpen = false, children }) {
  const body = el("div", { className: "collapse-body" }, children);
  const card = el("article", { className: "collapse" }, [
    el("button", {
      className: "collapse-trigger",
      type: "button",
      "aria-expanded": String(defaultOpen),
      onClick: (event) => {
        const open = event.currentTarget.getAttribute("aria-expanded") !== "true";
        event.currentTarget.setAttribute("aria-expanded", String(open));
        body.hidden = !open;
      }
    }, [
      el("span", { className: "collapse-title", text: title }),
      eyebrow ? el("span", { className: "collapse-eyebrow", text: eyebrow }) : null,
      el("span", { className: "collapse-chevron", text: "⌄", "aria-hidden": "true" })
    ]),
    body
  ]);

  body.hidden = !defaultOpen;
  return card;
}

export function emptyState(title, text) {
  return el("div", { className: "empty-state" }, [
    el("h2", { text: title }),
    el("p", { text })
  ]);
}

