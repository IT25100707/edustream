/* ==========================================================================
   EduStream — category filter + search (courses and tutors pages)
   ========================================================================== */
(function () {
  "use strict";

  const grid = document.querySelector("[data-catalog]");
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll("[data-category]"));
  const pills = Array.from(document.querySelectorAll("[data-filter]"));
  const countEl = document.querySelector("[data-count]");
  const emptyEl = document.querySelector("[data-empty]");
  const search = document.querySelector("[data-search]");
  const input = search && search.querySelector("input");
  const clear = search && search.querySelector("[data-search-clear]");
  const resetBtn = document.querySelector("[data-reset]");

  const nounOne = grid.dataset.nounOne || "course";
  const nounMany = grid.dataset.nounMany || "courses";

  let category = "all";
  let query = "";

  const normalise = (s) => s.toLowerCase().replace(/\s+/g, " ").trim();

  const apply = () => {
    let shown = 0;
    cards.forEach((card) => {
      const inCategory = category === "all" || card.dataset.category === category;
      const haystack = normalise(card.dataset.search || card.textContent);
      const inQuery = !query || haystack.includes(query);
      const visible = inCategory && inQuery;
      card.hidden = !visible;
      if (visible) shown++;
    });

    if (countEl) {
      countEl.innerHTML = `<strong>${shown}</strong> ${shown === 1 ? nounOne : nounMany}`;
    }
    if (emptyEl) emptyEl.hidden = shown !== 0;
  };

  const setCategory = (value) => {
    category = value;
    pills.forEach((p) => p.setAttribute("aria-pressed", String(p.dataset.filter === value)));
    apply();
  };

  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      setCategory(pill.dataset.filter);
      if (history.replaceState) {
        history.replaceState(null, "", pill.dataset.filter === "all" ? location.pathname : `#${pill.dataset.filter}`);
      }
    });
  });

  if (input) {
    input.addEventListener("input", () => {
      query = normalise(input.value);
      search.classList.toggle("has-value", query.length > 0);
      apply();
    });
    clear && clear.addEventListener("click", () => {
      input.value = "";
      query = "";
      search.classList.remove("has-value");
      apply();
      input.focus();
    });
  }

  resetBtn && resetBtn.addEventListener("click", () => {
    if (input) { input.value = ""; query = ""; search.classList.remove("has-value"); }
    setCategory("all");
  });

  // Deep link: courses.html#design preselects a category
  const hash = location.hash.replace("#", "");
  const valid = pills.some((p) => p.dataset.filter === hash);
  setCategory(valid ? hash : "all");
})();
