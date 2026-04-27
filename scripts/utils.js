export function el(tag, options = {}, children = []) {
  const node = document.createElement(tag);

  Object.entries(options).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (key === "className") node.className = value;
    else if (key === "text") node.textContent = value;
    else if (key === "html") node.innerHTML = value;
    else if (key === "dataset") Object.assign(node.dataset, value);
    else if (key.startsWith("on") && typeof value === "function") {
      node.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      node.setAttribute(key, value);
    }
  });

  const childList = Array.isArray(children) ? children : [children];
  childList.filter(Boolean).forEach((child) => {
    node.append(child.nodeType ? child : document.createTextNode(child));
  });

  return node;
}

export function slugTitle(slug) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function percent(value, total) {
  if (!total) return 0;
  return Math.round((value / total) * 100);
}

export function normalizeText(value) {
  return String(value).toLowerCase().trim();
}

