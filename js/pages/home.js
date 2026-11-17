/* home page */
PAGES.home = () => `
  <section class="hero">
    <div class="blob" style="width:300px;height:300px;background:var(--p);left:-80px;top:40px"></div>
    <div class="blob" style="width:260px;height:260px;background:var(--ac);right:10%;bottom:-60px;animation-delay:-5s"></div>
    <div class="wrap hgrid">
      <div>
        <div class="eyebrow up">For every stage of life</div>
        <h1 class="up" style="animation-delay:.15s">
          Learn Something New. <span class="grad">Grow Every Day.</span>
        </h1>
        <p class="up" style="font-size:1.1rem;max-width:520px;animation-delay:.3s">
          Build knowledge, discover new interests and develop real skills. Learn at your pace, whenever you like.
        </p>
        <a class="btn pri up" style="animation-delay:.45s" href="#courses">Explore Courses</a>
        <div class="stats up" style="animation-delay:.6s">
          <div>
            <b data-n="120" data-s="+">0</b>
            <span>Courses</span>
          </div>
          <div>
            <b data-n="40" data-s="k">0</b>
            <span>Learners</span>
          </div>
          <div>
            <b data-n="4.8" data-d="1" data-s="★">0</b>
            <span>Avg. rating</span>
          </div>
        </div>
      </div>

      <div style="position:relative">
        <div class="hart">
          <img
            src="${IMAGE_SET.hero[0]}"
            alt="Students learning together"
            style="width:100%;height:100%;object-fit:cover;display:block;"
            loading="eager"
          />
        </div>
        <div class="chip-f" style="left:-14px;top:18%">🎯 Daily goals</div>
        <div class="chip-f" style="right:-10px;bottom:14%;animation-delay:-2s">✅ 12 lessons done</div>
      </div>
    </div>
  </section>

  <div class="mq">
    <div>
      ${(m => m + m)(["Mathematics","Python","Communication","Science","Study skills","Data","Creativity","Project management"].map(x => `<span>✦ ${x}</span>`).join(""))}
    </div>
  </div>

  <section>
    <div class="wrap">
      <h2>Learning for every kind of curiosity</h2>
      <p>Find a learning path that feels right for you.</p>
      <div class="grid">
        ${feats([
          ["🏫", "School learning", "Build strong foundations"],
          ["🎓", "College essentials", "Sharpen your coursework"],
          ["💻", "Career & technology", "Develop practical skills"],
          ["🌱", "Personal growth", "Follow your curiosity"]
        ])}
      </div>
    </div>
  </section>

  <section class="alt">
    <div class="wrap">
      <h2>Popular courses</h2>
      <p>Start with what others enjoy.</p>
      <div class="grid">${COURSES.slice(0, 3).map(cc).join("")}</div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <h2>A clearer path to your goals</h2>
      <p>Follow a guided sequence, one course at a time.</p>
      <div class="grid">${PATHS.slice(0, 3).map(pc).join("")}</div>
    </div>
  </section>

  <section class="alt">
    <div class="wrap">
      <h2>How it works</h2>
      <p>Three simple steps to get started.</p>
      <div class="grid">
        ${[["01", "Find your interest", "Explore courses or choose a guided path."], ["02", "Learn at your pace", "Watch short lessons and take notes."], ["03", "Put it into practice", "Use what you learn in everyday life."]]
          .map(
            (s) => `
              <div class="step rv">
                <b>${s[0]}</b>
                <h3>${s[1]}</h3>
                <p>${s[2]}</p>
              </div>
            `
          )
          .join("")}
      </div>
    </div>
  </section>

  <section>
    <div class="wrap">
      <h2>Why choose Stackly?</h2>
      <div class="grid" style="margin-top:20px">
        ${feats([
          ["🌍", "Learning for all ages", "Relevant courses for school and professional life."],
          ["🕒", "Flexible by design", "Learn when it works for you."],
          ["✨", "Practical and clear", "Approachable lessons with real-world focus."]
        ])}
      </div>
    </div>
  </section>

  <section class="alt">
    <div class="wrap">
      <h2>Learning that fits real life</h2>
      <div class="grid" style="margin-top:20px">
        ${[["“Short maths lessons made revision feel manageable.”", "Riya · School student"], ["“I finally built my first Python project at my own pace.”", "Arjun · College student"], ["“I can fit a useful lesson into a busy working day.”", "Sam · Working professional"]]
          .map(
            (t) => `
              <div class="card pad rv">
                <p style="color:var(--tx)">${t[0]}</p>
                <div class="meta">${t[1]}</div>
              </div>
            `
          )
          .join("")}
      </div>
    </div>
  </section>

  <section>
    <div class="wrap" style="max-width:760px">
      <h2>Frequently asked questions</h2>
      <p>A little clarity before you begin.</p>
      ${faq()}
    </div>
  </section>
`;

