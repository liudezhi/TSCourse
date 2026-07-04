(function () {
  const REPOSITORY = "liudezhi/TSCourse";
  const ISSUE_LABEL = "course-feedback";
  const PROJECT_BASE_PATH = "/TSCourse";

  function pageTitle() {
    const heading = document.querySelector(".content main h1");
    return (heading ? heading.textContent : document.title).trim();
  }

  function normalizePath(path) {
    let normalized = path.replace(new RegExp("^" + PROJECT_BASE_PATH + "/?"), "/");

    if (!normalized || normalized === "/" || normalized === "/index.html") {
      return "/";
    }

    normalized = normalized.replace(/\/index\.html$/, "/").replace(/\/$/, "");
    return normalized || "/";
  }

  function currentPagePath() {
    return normalizePath(window.location.pathname);
  }

  function sourcePath() {
    const path = window.location.pathname.replace(/^\/TSCourse\/?/, "");

    if (!path || path === "index.html") {
      return "src/README.md";
    }

    return "src/" + path.replace(/\.html$/, ".md");
  }

  function issueUrl(title) {
    const params = new URLSearchParams({
      title: "课程反馈：" + title,
      body: [
        "页面：" + window.location.href,
        "源码：" + sourcePath(),
        "",
        "反馈内容：",
        ""
      ].join("\n"),
      labels: ISSUE_LABEL
    });

    return "https://github.com/" + REPOSITORY + "/issues/new?" + params.toString();
  }

  function feedbackScriptUrl() {
    const script = document.currentScript || document.querySelector('script[src*="course-feedback.js"]');
    return script ? script.src : "";
  }

  function statsUrl() {
    const scriptUrl = feedbackScriptUrl();
    return scriptUrl ? new URL("course-stats.json", scriptUrl).toString() : "theme/course-stats.json";
  }

  function formatNumber(value) {
    const number = Number(value || 0);
    return number.toLocaleString("zh-CN");
  }

  function findPageViews(stats) {
    const pages = stats.pages || {};
    const path = currentPagePath();
    return pages[path] || pages[path + "/"] || 0;
  }

  function createMetric(label, value) {
    const item = document.createElement("div");
    item.className = "course-stats__metric";

    const valueElement = document.createElement("strong");
    valueElement.className = "course-stats__value";
    valueElement.textContent = formatNumber(value);

    const labelElement = document.createElement("span");
    labelElement.className = "course-stats__label";
    labelElement.textContent = label;

    item.appendChild(valueElement);
    item.appendChild(labelElement);
    return item;
  }

  function createTopPagesList(pages) {
    const list = document.createElement("ol");
    list.className = "course-stats__top-list";

    pages.slice(0, 10).forEach(function (page) {
      const item = document.createElement("li");
      item.className = "course-stats__top-item";

      const title = document.createElement("span");
      title.className = "course-stats__top-title";
      title.textContent = page.title || page.path || "未命名页面";

      const views = document.createElement("span");
      views.className = "course-stats__top-views";
      views.textContent = formatNumber(page.views) + " 次";

      item.appendChild(title);
      item.appendChild(views);
      list.appendChild(item);
    });

    return list;
  }

  function renderCourseStats(stats) {
    if (!stats || !stats.enabled) {
      return null;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "course-stats";
    wrapper.setAttribute("aria-label", "课程访问统计");

    const title = document.createElement("h3");
    title.className = "course-stats__title";
    title.textContent = "访问统计";
    wrapper.appendChild(title);

    if (stats.status === "unavailable") {
      const notice = document.createElement("p");
      notice.className = "course-stats__notice";
      notice.textContent = stats.message || "统计数据准备中";
      wrapper.appendChild(notice);
      return wrapper;
    }

    const metrics = document.createElement("div");
    metrics.className = "course-stats__metrics";
    metrics.appendChild(createMetric("本站访问", stats.totals && stats.totals.allTime));
    metrics.appendChild(createMetric("今日访问", stats.totals && stats.totals.today));
    metrics.appendChild(createMetric("本页阅读", findPageViews(stats)));

    wrapper.appendChild(metrics);

    if (Array.isArray(stats.topPages) && stats.topPages.length > 0) {
      const topTitle = document.createElement("h4");
      topTitle.className = "course-stats__subtitle";
      topTitle.textContent = "热门章节 Top 10";

      wrapper.appendChild(topTitle);
      wrapper.appendChild(createTopPagesList(stats.topPages));
    }

    return wrapper;
  }

  function appendCourseStats(section) {
    fetch(statsUrl(), { cache: "no-store" })
      .then(function (response) {
        return response.ok ? response.json() : null;
      })
      .then(function (stats) {
        const statsBlock = renderCourseStats(stats);
        const header = section.querySelector(".course-feedback__header");

        if (statsBlock && header) {
          header.insertAdjacentElement("afterend", statsBlock);
        }
      })
      .catch(function () {
        // Stats are optional; feedback and comments should still work offline.
      });
  }

  function appendUtterances(container) {
    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", REPOSITORY);
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("label", ISSUE_LABEL);
    script.setAttribute("theme", "preferred-color-scheme");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;
    container.appendChild(script);
  }

  function initFeedback() {
    const main = document.querySelector(".content main");

    if (!main || document.querySelector(".course-feedback")) {
      return;
    }

    const title = pageTitle();
    const section = document.createElement("section");
    section.className = "course-feedback";
    section.setAttribute("aria-labelledby", "course-feedback-title");
    section.innerHTML = [
      '<div class="course-feedback__header">',
      '  <h2 id="course-feedback-title" class="course-feedback__title">反馈与留言</h2>',
      '  <p class="course-feedback__text">发现错别字、代码问题，或者想交流学习心得，可以在这里留下痕迹。</p>',
      "</div>",
      '<div class="course-feedback__actions">',
      '  <a class="course-feedback__link" href="' + issueUrl(title) + '" target="_blank" rel="noopener noreferrer">反馈此页</a>',
      '  <a class="course-feedback__link" href="https://github.com/' + REPOSITORY + '/issues" target="_blank" rel="noopener noreferrer">查看反馈</a>',
      "</div>",
      '<div class="course-feedback__comments" aria-label="课程留言区"></div>'
    ].join("");

    main.appendChild(section);
    appendCourseStats(section);
    appendUtterances(section.querySelector(".course-feedback__comments"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFeedback);
  } else {
    initFeedback();
  }
})();
