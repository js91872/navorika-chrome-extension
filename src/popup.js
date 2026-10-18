(function () {
  "use strict";
  const tools = window.NAVORIKA_TOOLS || [];
  const calculations = window.NAVORIKA_CALCULATIONS;
  const list = document.getElementById("tool-list");
  const workspace = document.getElementById("workspace");
  const aspectTool = document.getElementById("aspect-tool");
  const flexTool = document.getElementById("flex-tool");
  const search = document.getElementById("tool-search");
  const empty = document.getElementById("empty-state");
  const chips = [...document.querySelectorAll(".filter-chip")];
  const favoritesToggle = document.getElementById("favorites-toggle");
  const toast = document.getElementById("toast");
  let activeCategory = "all";
  let favoritesOnly = false;
  let favorites = [];
  let toastTimer;

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  }
  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1500);
  }
  function render() {
    const query = search.value.trim().toLowerCase();
    const visible = tools.filter(tool => {
      const categoryMatch = activeCategory === "all" || tool.category === activeCategory || tool.category === "all";
      const queryMatch = !query || `${tool.title} ${tool.description} ${tool.category}`.toLowerCase().includes(query);
      return categoryMatch && queryMatch && (!favoritesOnly || favorites.includes(tool.id));
    });
    list.innerHTML = visible.map(tool => {
      const isFavorite = favorites.includes(tool.id);
      const href = tool.inline ? "#" : escapeHtml(tool.url);
      const behavior = tool.inline ? `data-inline="${escapeHtml(tool.inline)}"` : 'target="_blank" rel="noreferrer"';
      const label = tool.inline ? `Use ${escapeHtml(tool.title)} in this extension` : `Open ${escapeHtml(tool.title)} in a new tab`;
      return `<article class="tool-card${isFavorite ? " is-favorite" : ""}">
        <a class="tool-link" href="${href}" ${behavior} aria-label="${label}">
          <span class="tool-icon tint-${escapeHtml(tool.tint)}" aria-hidden="true">${escapeHtml(tool.icon)}</span>
          <span class="tool-copy"><span class="tool-title">${escapeHtml(tool.title)}</span><span class="tool-description">${escapeHtml(tool.description)}</span></span>
          <span class="tool-arrow" aria-hidden="true">${tool.inline ? "›" : "↗"}</span>
        </a>
        <button class="favorite-button${isFavorite ? " is-favorite" : ""}" type="button" data-favorite-id="${escapeHtml(tool.id)}" aria-label="${isFavorite ? "Remove" : "Add"} ${escapeHtml(tool.title)} ${isFavorite ? "from" : "to"} favorites" title="${isFavorite ? "Remove from" : "Add to"} favorites"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/></svg></button>
      </article>`;
    }).join("");
    empty.hidden = visible.length !== 0;
    list.hidden = visible.length === 0;
    document.getElementById("tool-count").textContent = String(tools.length);
  }
  function saveFavorites() {
    if (globalThis.chrome?.storage?.local) chrome.storage.local.set({ favorites });
  }
  function toggleFavorite(id) {
    favorites = favorites.includes(id) ? favorites.filter(item => item !== id) : [...favorites, id];
    saveFavorites(); render(); showToast(favorites.includes(id) ? "Added to favorites" : "Removed from favorites");
  }
  function openWorkspace(kind) {
    list.hidden = true;
    document.querySelector(".filters").hidden = true;
    search.closest(".search-box").hidden = true;
    workspace.hidden = false;
    aspectTool.hidden = kind !== "aspect";
    flexTool.hidden = kind !== "flexbox";
    if (kind === "aspect") updateAspect();
    if (kind === "flexbox") updateFlex();
  }
  function closeWorkspace() {
    workspace.hidden = true; list.hidden = false;
    document.querySelector(".filters").hidden = false;
    search.closest(".search-box").hidden = false;
  }
  function updateAspect() {
    const ratio = calculations.computeAspectRatio(document.getElementById("ratio-width").value, document.getElementById("ratio-height").value);
    const result = document.getElementById("ratio-result");
    if (!ratio) {
      result.textContent = "Enter dimensions";
      document.getElementById("ratio-code").textContent = "Enter positive width and height values.";
      return;
    }
    result.textContent = `${ratio.padding}%`;
    document.getElementById("ratio-preview").style.aspectRatio = `${ratio.width} / ${ratio.height}`;
    document.getElementById("ratio-code").textContent = ratio.css;
  }
  function updateFlex() {
    const config = {
      direction: document.getElementById("flex-direction").value,
      justify: document.getElementById("flex-justify").value,
      align: document.getElementById("flex-align").value,
      gap: Math.max(0, Math.min(64, Number(document.getElementById("flex-gap").value) || 0))
    };
    const preview = document.getElementById("flex-preview");
    preview.style.flexDirection = config.direction;
    preview.style.justifyContent = config.justify;
    preview.style.alignItems = config.align;
    preview.style.gap = `${config.gap}px`;
    document.getElementById("flex-code").textContent = calculations.generateFlexCss(config);
  }
  list.addEventListener("click", event => {
    const inlineLink = event.target.closest("a[data-inline]");
    if (inlineLink) { event.preventDefault(); openWorkspace(inlineLink.dataset.inline); return; }
    const button = event.target.closest("[data-favorite-id]");
    if (button) { event.preventDefault(); event.stopPropagation(); toggleFavorite(button.dataset.favoriteId); }
  });
  search.addEventListener("input", render);
  document.getElementById("workspace-back").addEventListener("click", closeWorkspace);
  ["ratio-width", "ratio-height"].forEach(id => document.getElementById(id).addEventListener("input", updateAspect));
  document.querySelectorAll("[data-ratio]").forEach(button => button.addEventListener("click", () => {
    const [width, height] = button.dataset.ratio.split(":");
    document.getElementById("ratio-width").value = width;
    document.getElementById("ratio-height").value = height;
    updateAspect();
  }));
  ["flex-direction", "flex-justify", "flex-align", "flex-gap"].forEach(id => document.getElementById(id).addEventListener("input", updateFlex));
  document.querySelectorAll("[data-copy]").forEach(button => button.addEventListener("click", async () => {
    const text = document.getElementById(button.dataset.copy === "ratio" ? "ratio-code" : "flex-code").textContent;
    try { await navigator.clipboard.writeText(text); showToast("CSS copied"); }
    catch {
      const temporary = document.createElement("textarea"); temporary.value = text; temporary.style.position = "fixed"; temporary.style.opacity = "0";
      document.body.append(temporary); temporary.select(); const copied = document.execCommand("copy"); temporary.remove(); showToast(copied ? "CSS copied" : "Could not copy CSS");
    }
  }));
  chips.forEach(chip => chip.addEventListener("click", () => {
    activeCategory = chip.dataset.filter;
    chips.forEach(item => item.classList.toggle("active", item === chip));
    favoritesOnly = false; favoritesToggle.classList.remove("selected"); favoritesToggle.setAttribute("aria-label", "Show favorites"); render();
  }));
  favoritesToggle.addEventListener("click", () => {
    favoritesOnly = !favoritesOnly;
    favoritesToggle.classList.toggle("selected", favoritesOnly);
    favoritesToggle.setAttribute("aria-label", favoritesOnly ? "Show all tools" : "Show favorites");
    chips.forEach(item => item.classList.toggle("active", item.dataset.filter === "all" && !favoritesOnly));
    render();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "/" && document.activeElement !== search && !event.ctrlKey && !event.metaKey && !event.altKey) { event.preventDefault(); search.focus(); }
    if (event.key === "Escape") {
      if (!workspace.hidden) { closeWorkspace(); return; }
      search.value = ""; favoritesOnly = false; favoritesToggle.classList.remove("selected"); render();
    }
  });
  if (globalThis.chrome?.storage?.local) {
    chrome.storage.local.get({ favorites: [] }, result => {
      favorites = Array.isArray(result.favorites) ? result.favorites.filter(id => tools.some(tool => tool.id === id)) : [];
      render();
    });
  } else render();
})();
