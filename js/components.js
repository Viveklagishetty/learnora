/* Shared UI components: vector art (sharp on 4K), cards, FAQ, headers, CTA */
const art = (i, big) => {
  const image = IMAGE_SET.course[i % IMAGE_SET.course.length];

  return `
    <img
      src="${image}"
      alt="Course artwork"
      loading="lazy"
      style="width:100%;height:100%;object-fit:cover;display:block;"
    />
  `;
};

const cc = (c, i) => `
  <article class="card rv">
    <div class="img">${art(i)}</div>
    <div class="bd">
      <div class="meta">
        <span class="tag">${c[2]}</span>
        <span>${c[3]} lessons</span>
      </div>
      <h3>${c[0]}</h3>
      <p style="margin-bottom:14px;font-size:.88rem">By ${c[1]}</p>
      <a class="btn sm" href="#signup">View Course Details</a>
    </div>
  </article>
`;

const pc = (p) => `
  <article class="card rv pad">
    <div class="ic">${p[4]}</div>
    <h3>${p[0]}</h3>
    <p style="font-size:.9rem">${p[1]}</p>
    <div class="meta">${p[2]} · ${p[3]}</div>
    <a class="btn sm" href="#courses">Explore</a>
  </article>
`;

const faq = () =>
  FAQ.map(
    (f) => `
      <details class="rv">
        <summary>${f[0]}</summary>
        <p>${f[1]}</p>
      </details>
    `
  ).join("");

const head = (eyebrow, title, description) => `
  <section class="alt" style="padding:56px 0 40px">
    <div class="wrap">
      <div class="eyebrow">${eyebrow}</div>
      <h1>${title}</h1>
      <p style="max-width:620px;font-size:1.05rem">${description}</p>
    </div>
  </section>
`;

const feats = (items) =>
  items
    .map(
      (item) => `
        <div class="rv">
          <div class="ic">${item[0]}</div>
          <h3>${item[1]}</h3>
          <p>${item[2]}</p>
        </div>
      `
    )
    .join("");
