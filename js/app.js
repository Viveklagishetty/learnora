/* Router, interactions and animations */
const LOGO = "assets/logo.png";

const setLogo = () => {
  document.querySelectorAll(".lg:not([src])").forEach((img) => {
    img.src = LOGO;
  });
};

const setMenuOpen = (open) => {
  const menu = document.getElementById("links");
  const button = document.getElementById("bg");
  menu.classList.toggle("open", open);
  button.classList.toggle("is-open", open);
  button.textContent = open ? "×" : "☰";
  button.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  button.setAttribute("aria-expanded", String(open));
};

const app = document.getElementById("app");
const toast = (message) => {
  const t = document.getElementById("toast");
  t.textContent = message;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2600);
};

function route() {
  const key = location.hash.slice(1) || "home";
  const page = PAGES[key] ? key : "home";

  app.innerHTML = `<div class="page">${PAGES[page]()}</div>`;
  window.scrollTo(0, 0);

  document.querySelectorAll(".links a").forEach((link) => {
    link.classList.toggle("on", link.getAttribute("href") === `#${page}`);
  });

  setMenuOpen(false);
  document.querySelector("footer").style.display = document.querySelector("header").style.display =
    page === "login" || page === "signup" ? "none" : "";

  if (page === "courses") {
    initCourses();
  }

  countUp();

  app.querySelectorAll(".auth .box > *").forEach((el, index) => {
    el.style.animationDelay = `${0.2 + index * 0.07}s`;
  });

  app.querySelectorAll("[data-auth]").forEach((form) => {
    form.onsubmit = (event) => {
      event.preventDefault();
      const button = form.querySelector(".btn.pri");
      button.classList.add("load");
      setTimeout(() => {
        button.classList.remove("load");
        toast("Welcome to Stackly! (demo)");
      }, 1200);
    };
  });

  const contactForm = document.getElementById("cf");
  if (contactForm) {
    contactForm.onsubmit = (event) => {
      event.preventDefault();
      contactForm.reset();
      toast("Message sent. We’ll reply within one working day.");
    };
  }

  app.querySelectorAll("[data-t]").forEach((button) => {
    button.onclick = () => toast(button.dataset.t);
  });

  setLogo();
  observe();
}

function initCourses() {
  let category = "all";
  const q = document.getElementById("q");
  const lv = document.getElementById("lv");

  const draw = () => {
    const results = COURSES.map((course, index) => [course, index]).filter(
      ([course]) =>
        (category === "all" || course[4] === category || (category === "school" && course[4] === "college")) &&
        (!lv.value || course[2] === lv.value) &&
        course[0].toLowerCase().includes(q.value.toLowerCase())
    );

    document.getElementById("cg").innerHTML =
      results.map(([course, index]) => cc(course, index)).join("") || "<p>No courses match your search.</p>";
    document.getElementById("cnt").textContent = `Showing ${results.length} of ${COURSES.length} courses`;
    observe();
  };

  q.oninput = lv.onchange = draw;

  document.querySelectorAll("#chips .pill").forEach((button) => {
    button.onclick = () => {
      document.querySelectorAll("#chips .pill").forEach((item) => item.classList.remove("on"));
      button.classList.add("on");
      category = button.dataset.c;
      draw();
    };
  });

  draw();
}

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
        setTimeout(() => {
          entry.target.classList.add("done");
          entry.target.style.transitionDelay = "0ms";
        }, 1000);
      }
    });
  },
  { threshold: 0.12 }
);

function observe() {
  document.querySelectorAll(".rv:not(.in):not([data-o])").forEach((el, index) => {
    el.dataset.o = 1;
    el.classList.add(["l", "z", "r"][index % 3]);
    el.style.transitionDelay = `${(index % 4) * 80}ms`;
    io.observe(el);
  });
}

document.getElementById("bg").onclick = () => {
  setMenuOpen(!document.getElementById("links").classList.contains("open"));
};

document.getElementById("links").addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});

document.getElementById("theme").onclick = () => {
  const root = document.documentElement;
  const isDark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme:dark)").matches;
  root.dataset.theme = isDark ? "light" : "dark";
};

function countUp() {
  document.querySelectorAll("[data-n]").forEach((el) => {
    const value = +el.dataset.n;
    const digits = +(el.dataset.d || 0);
    const suffix = el.dataset.s || "";
    const start = performance.now();

    (function animateFrame(time) {
      const progress = Math.min((time - start) / 1600, 1);
      const currentValue = value * (1 - Math.pow(1 - progress, 3));
      el.textContent = currentValue.toFixed(digits) + suffix;
      if (progress < 1) {
        requestAnimationFrame(animateFrame);
      }
    })(start);
  });
}

document.addEventListener("click", (event) => {
  const button = event.target.closest(".btn");
  if (!button) return;

  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const ripple = document.createElement("span");
  ripple.className = "rip";
  ripple.style.cssText = `width:${size}px;height:${size}px;left:${event.clientX - rect.left - size / 2}px;top:${event.clientY - rect.top - size / 2}px`;
  button.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});

const prog = document.getElementById("prog");
const topButton = document.getElementById("top");

addEventListener(
  "scroll",
  () => {
    const maxScroll = document.documentElement.scrollHeight - innerHeight;
    prog.style.width = `${maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0}%`;
    topButton.classList.toggle("show", scrollY > 500);
  },
  { passive: true }
);

topButton.onclick = () => scrollTo({ top: 0, behavior: "smooth" });

setLogo();
addEventListener("hashchange", route);
route();

setTimeout(() => {
  document.body.classList.remove("is-loading");
  document.body.classList.add("ready");
  document.getElementById("loader").setAttribute("aria-busy", "false");
}, 600);
