const root = document.documentElement;
const savedTheme = localStorage.getItem("igem-theme");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (savedTheme) {
  document.body.dataset.theme = savedTheme;
  root.dataset.theme = savedTheme;
}

document.querySelectorAll("[data-nav-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("[data-nav-menu]")?.classList.toggle("open");
  });
});

document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
  button.addEventListener("click", () => {
    const next = document.body.dataset.theme === "dark" ? "light" : "dark";
    document.body.dataset.theme = next;
    root.dataset.theme = next;
    localStorage.setItem("igem-theme", next);
  });
});

const progress = document.querySelector("[data-progress]");
const setProgress = () => {
  if (!progress) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
  progress.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
};

window.addEventListener("scroll", setProgress, { passive: true });
setProgress();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll("[data-reveal]").forEach((item) => revealObserver.observe(item));

document.querySelectorAll("[data-tabs]").forEach((tabs) => {
  const buttons = tabs.querySelectorAll("[data-tab]");
  const panels = tabs.querySelectorAll("[data-panel]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tab;
      buttons.forEach((item) => item.classList.toggle("active", item === button));
      panels.forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === target));
    });
  });
});

document.querySelectorAll("[data-accordion]").forEach((accordion) => {
  accordion.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = button.nextElementSibling;
      panel?.classList.toggle("open");
    });
  });
});

document.querySelectorAll(".toc").forEach((toc) => {
  const links = Array.from(toc.querySelectorAll('a[href^="#"]'));
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  if (!sections.length) return;

  const update = () => {
    let current = sections[0];
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top < 150) current = section;
    });
    links.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + current.id);
    });
  };

  window.addEventListener("scroll", update, { passive: true });
  update();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelector("[data-nav-menu]")?.classList.remove("open");
  }
});

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const value = Number(el.dataset.count || 0);
      const decimals = Number(el.dataset.decimals || 0);
      const suffix = el.dataset.suffix || "";
      const duration = 900;
      const start = performance.now();

      const tick = (now) => {
        const ratio = Math.min(1, (now - start) / duration);
        const current = value * ratio;
        el.textContent = (decimals ? current.toFixed(decimals) : Math.round(current).toLocaleString()) + suffix;
        if (ratio < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.6 }
);

document.querySelectorAll("[data-count]").forEach((item) => counterObserver.observe(item));

const current = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-links a").forEach((link) => {
  if (link.getAttribute("href")?.endsWith(current)) link.classList.add("active");
});

document.querySelectorAll("[data-random-page]").forEach((button) => {
  button.addEventListener("click", () => {
    const pages = [
      "pages/description.html",
      "pages/engineering.html",
      "pages/results.html",
      "pages/model.html",
      "pages/safety.html",
      "pages/human-practices.html",
      "pages/team.html",
      "pages/attributions.html"
    ];
    location.href = pages[Math.floor(Math.random() * pages.length)];
  });
});

document.querySelectorAll("[data-magnetic]").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const box = card.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
    card.style.setProperty("--rx", `${((y / box.height) - 0.5) * -8}deg`);
    card.style.setProperty("--ry", `${((x / box.width) - 0.5) * 8}deg`);
  });

  card.addEventListener("pointerleave", () => {
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  });
});

document.querySelectorAll("[data-filter-group]").forEach((group) => {
  const chips = group.querySelectorAll("[data-filter]");
  const target = document.querySelector(group.dataset.filterTarget || "");
  const items = target?.querySelectorAll("[data-category]") || [];

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const filter = chip.dataset.filter;
      chips.forEach((item) => item.classList.toggle("active", item === chip));
      items.forEach((item) => {
        item.hidden = filter !== "all" && item.dataset.category !== filter;
      });
    });
  });
});

document.querySelectorAll("[data-compare]").forEach((compare) => {
  const range = compare.querySelector("input[type='range']");
  const setValue = () => compare.style.setProperty("--split", `${range.value}%`);
  range?.addEventListener("input", setValue);
  if (range) setValue();
});

document.querySelectorAll("[data-command-palette]").forEach((palette) => {
  const openers = document.querySelectorAll("[data-command-open]");
  const closer = palette.querySelector("[data-command-close]");
  const input = palette.querySelector("[data-command-input]");
  const actions = palette.querySelectorAll("[data-command-action]");

  const open = () => {
    palette.classList.add("open");
    palette.setAttribute("aria-hidden", "false");
    input?.focus();
  };

  const close = () => {
    palette.classList.remove("open");
    palette.setAttribute("aria-hidden", "true");
  };

  openers.forEach((button) => button.addEventListener("click", open));
  closer?.addEventListener("click", close);
  palette.addEventListener("click", (event) => {
    if (event.target === palette) close();
  });

  input?.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    actions.forEach((action) => {
      action.hidden = query && !action.textContent.toLowerCase().includes(query);
    });
  });
});

document.querySelectorAll("[data-particle-canvas]").forEach((canvas) => {
  if (prefersReducedMotion) return;
  const ctx = canvas.getContext("2d");
  const particles = [];
  const colors = ["#0f8b8d", "#ffb000", "#da4167", "#17324d"];

  const resize = () => {
    const box = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.floor(box.width * ratio));
    canvas.height = Math.max(1, Math.floor(box.height * ratio));
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const seed = () => {
    particles.length = 0;
    const box = canvas.getBoundingClientRect();
    const count = Math.min(90, Math.max(34, Math.floor(box.width / 12)));
    for (let i = 0; i < count; i += 1) {
      particles.push({
        x: Math.random() * box.width,
        y: Math.random() * box.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 2.4 + 1.2,
        color: colors[i % colors.length]
      });
    }
  };

  const draw = () => {
    const box = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, box.width, box.height);
    particles.forEach((p, index) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > box.width) p.vx *= -1;
      if (p.y < 0 || p.y > box.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.72;
      ctx.fill();

      for (let j = index + 1; j < particles.length; j += 1) {
        const other = particles[j];
        const distance = Math.hypot(p.x - other.x, p.y - other.y);
        if (distance < 118) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(other.x, other.y);
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = (1 - distance / 118) * 0.22;
          ctx.stroke();
        }
      }
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  };

  resize();
  seed();
  draw();
  window.addEventListener("resize", () => {
    resize();
    seed();
  });
});
