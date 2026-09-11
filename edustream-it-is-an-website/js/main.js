/* ==========================================================================
   EduStream — home page interactions
   Nav toggle · Courses carousel · Category tabs · Steps accordion · Reveal
   ========================================================================== */
(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile navigation ---------- */
  const nav = document.querySelector("[data-nav]");
  const navToggle = document.querySelector("[data-nav-toggle]");

  if (nav && navToggle) {
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    // Close menu after choosing a link
    nav.querySelectorAll(".nav__link").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.focus();
      }
    });
  }

  /* ---------- Courses carousel ---------- */
  const track = document.querySelector("[data-carousel]");

  if (track) {
    const prev = document.querySelector("[data-carousel-prev]");
    const next = document.querySelector("[data-carousel-next]");
    const dotsWrap = document.querySelector("[data-carousel-dots]");
    const cards = Array.from(track.children);

    const cardStep = () => {
      const first = cards[0];
      const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
      return first.getBoundingClientRect().width + gap;
    };

    const scrollByCards = (dir) => {
      track.scrollBy({ left: dir * cardStep(), behavior: prefersReducedMotion ? "auto" : "smooth" });
    };

    prev && prev.addEventListener("click", () => scrollByCards(-1));
    next && next.addEventListener("click", () => scrollByCards(1));

    // Dots
    let dots = [];
    if (dotsWrap) {
      cards.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "courses__dot";
        dot.setAttribute("aria-label", `Go to course ${i + 1}`);
        dot.addEventListener("click", () => {
          track.scrollTo({ left: i * cardStep(), behavior: prefersReducedMotion ? "auto" : "smooth" });
        });
        dotsWrap.appendChild(dot);
        dots.push(dot);
      });
    }

    const updateDots = () => {
      if (!dots.length) return;
      const index = Math.round(track.scrollLeft / cardStep());
      dots.forEach((d, i) => d.classList.toggle("is-active", i === Math.min(index, dots.length - 1)));
    };

    let raf;
    track.addEventListener("scroll", () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateDots);
    }, { passive: true });

    updateDots();
  }

  /* ---------- Category tabs ---------- */
  const tabList = document.querySelector("[role='tablist']");

  if (tabList) {
    const tabs = Array.from(tabList.querySelectorAll("[role='tab']"));
    const panels = tabs.map((tab) => document.getElementById(tab.getAttribute("aria-controls")));

    const activate = (tab, focus = false) => {
      tabs.forEach((t, i) => {
        const selected = t === tab;
        t.setAttribute("aria-selected", String(selected));
        t.tabIndex = selected ? 0 : -1;
        const panel = panels[i];
        if (!panel) return;
        if (selected) {
          panel.hidden = false;
          if (!prefersReducedMotion) {
            panel.classList.remove("is-entering");
            void panel.offsetWidth; // restart animation
            panel.classList.add("is-entering");
          }
        } else {
          panel.hidden = true;
        }
      });
      if (focus) tab.focus();
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => activate(tab));
      tab.addEventListener("keydown", (e) => {
        const i = tabs.indexOf(tab);
        if (e.key === "ArrowRight") { e.preventDefault(); activate(tabs[(i + 1) % tabs.length], true); }
        if (e.key === "ArrowLeft") { e.preventDefault(); activate(tabs[(i - 1 + tabs.length) % tabs.length], true); }
        if (e.key === "Home") { e.preventDefault(); activate(tabs[0], true); }
        if (e.key === "End") { e.preventDefault(); activate(tabs[tabs.length - 1], true); }
      });
    });
  }

  /* ---------- Steps accordion ---------- */
  const steps = Array.from(document.querySelectorAll("[data-step]"));

  if (steps.length) {
    const openStep = (step) => {
      steps.forEach((s) => {
        const isTarget = s === step;
        s.classList.toggle("is-open", isTarget);
        const head = s.querySelector(".step__head");
        head && head.setAttribute("aria-expanded", String(isTarget));
      });
    };

    steps.forEach((step) => {
      const head = step.querySelector(".step__head");
      head && head.addEventListener("click", () => {
        // Keep one step open at all times so the section never collapses fully
        if (!step.classList.contains("is-open")) openStep(step);
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  // "?static" disables scroll-reveal (handy for screenshots and visual testing)
  const staticMode = /[?&]static\b/.test(window.location.search);

  if (revealEls.length && "IntersectionObserver" in window && !prefersReducedMotion && !staticMode) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });

    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Footer year ---------- */
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
