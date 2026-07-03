(function () {
  const REPOSITORY = "liudezhi/TSCourse";
  const ISSUE_LABEL = "course-feedback";

  function pageTitle() {
    const heading = document.querySelector(".content main h1");
    return (heading ? heading.textContent : document.title).trim();
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
    appendUtterances(section.querySelector(".course-feedback__comments"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initFeedback);
  } else {
    initFeedback();
  }
})();
