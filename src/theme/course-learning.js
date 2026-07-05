(function () {
  const PROJECT_BASE_PATH = "/TSCourse";
  const STORAGE_PREFIX = "tscourse.learning.";

  const COURSE_PAGES = [
    { index: 1, stage: "阶段一", title: "Day 01：JS/TS 心智模型", path: "/days/day01-js-ts-mental-model.html" },
    { index: 2, stage: "阶段一", title: "Day 02：变量、函数、对象与引用", path: "/days/day02-variables-functions-objects.html" },
    { index: 3, stage: "阶段一", title: "Day 03：数组、对象与数据建模", path: "/days/day03-arrays-objects-data-modeling.html" },
    { index: 4, stage: "阶段一", title: "Day 04：模块与 npm 基础", path: "/days/day04-modules-and-npm.html" },
    { index: 5, stage: "阶段一", title: "Day 05：TypeScript 编译、运行与调试", path: "/days/day05-compile-run-debug.html" },
    { index: 6, stage: "阶段一", title: "Day 06：从 package.json 找项目入口", path: "/days/day06-package-json-entry.html" },
    { index: 7, stage: "阶段一", title: "Day 07：阶段一复盘与源码阅读小测", path: "/days/day07-phase-one-review.html" },
    { index: 8, stage: "阶段二", title: "Day 08：项目 1 启动，interface 与 type", path: "/days/day08-interface-and-type.html" },
    { index: 9, stage: "阶段二", title: "Day 09：union 与 literal type 状态建模", path: "/days/day09-union-literal-state.html" },
    { index: 10, stage: "阶段二", title: "Day 10：类型收窄与 type guard", path: "/days/day10-narrowing-type-guard.html" },
    { index: 11, stage: "阶段二", title: "Day 11：泛型与列表工具", path: "/days/day11-generics-list-utils.html" },
    { index: 12, stage: "阶段二", title: "Day 12：discriminated union 与项目 1 验收", path: "/days/day12-discriminated-union.html" },
    { index: 13, stage: "阶段二", title: "Day 13：utility types 与真实类型阅读", path: "/days/day13-utility-types.html" },
    { index: 14, stage: "阶段二", title: "Day 14：tsconfig、声明文件与阶段二复盘", path: "/days/day14-tsconfig-declarations-review.html" },
    { index: 15, stage: "阶段二", title: "Day 15：项目结构与模块依赖图", path: "/days/day15-project-structure.html" },
    { index: 16, stage: "阶段三", title: "Day 16：项目 2 启动，CLI 入口与 argv", path: "/days/day16-cli-entry-argv.html" },
    { index: 17, stage: "阶段三", title: "Day 17：fs/path 与目录扫描", path: "/days/day17-fs-path-scanning.html" },
    { index: 18, stage: "阶段三", title: "Day 18：Promise、async/await 与 TODO 统计", path: "/days/day18-promise-async-todo.html" },
    { index: 19, stage: "阶段三", title: "Day 19：配置文件与错误处理", path: "/days/day19-config-error-handling.html" },
    { index: 20, stage: "阶段三", title: "Day 20：child_process 与外部命令调用", path: "/days/day20-child-process.html" },
    { index: 21, stage: "阶段三", title: "Day 21：stream、readline、日志与阶段三复盘", path: "/days/day21-stream-readline-logging.html" },
    { index: 22, stage: "阶段三", title: "Day 22：CLI 调试与最小测试", path: "/days/day22-cli-debugging-testing.html" },
    { index: 23, stage: "阶段三", title: "Day 23：项目 2 验收与 CLI 调用链阅读", path: "/days/day23-cli-call-chain.html" },
    { index: 24, stage: "阶段四", title: "Day 24：项目 3 启动，Agent loop", path: "/days/day24-agent-loop.html" },
    { index: 25, stage: "阶段四", title: "Day 25：tool calling 与工具注册", path: "/days/day25-tool-calling-registry.html" },
    { index: 26, stage: "阶段四", title: "Day 26：permission 与 sandbox 思维", path: "/days/day26-permission-sandbox.html" },
    { index: 27, stage: "阶段四", title: "Day 27：session、context 与上下文压缩", path: "/days/day27-session-context-compaction.html" },
    { index: 28, stage: "阶段四", title: "Day 28：hook、plugin、MCP 与阶段四复盘", path: "/days/day28-hooks-plugins-mcp.html" },
    { index: 29, stage: "阶段四", title: "Day 29：源码阅读方法论与笔记模板", path: "/days/day29-source-reading-method.html" },
    { index: 30, stage: "阶段四", title: "Day 30：最终验收与后续强化", path: "/days/day30-final-assessment.html" }
  ];

  const CHECKLIST_ITEMS = [
    "完成概念学习",
    "完成代码练习",
    "完成源码阅读训练",
    "写下复盘笔记"
  ];

  function storageKey(kind, path) {
    return STORAGE_PREFIX + kind + "." + path;
  }

  function readJson(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Learning helpers are optional and should never block reading.
    }
  }

  function readText(key) {
    try {
      return localStorage.getItem(key) || "";
    } catch (error) {
      return "";
    }
  }

  function writeText(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      // Ignore storage errors in private browsing modes.
    }
  }

  function normalizePath(pathname) {
    let normalized = pathname;

    if (normalized.indexOf(PROJECT_BASE_PATH + "/") === 0) {
      normalized = normalized.slice(PROJECT_BASE_PATH.length);
    } else if (normalized === PROJECT_BASE_PATH) {
      normalized = "/";
    }

    if (!normalized || normalized === "/" || normalized.endsWith("/index.html")) {
      return "/";
    }

    return normalized.replace(/\/$/, "");
  }

  function currentCoursePage() {
    const normalized = normalizePath(window.location.pathname);
    const direct = COURSE_PAGES.find(function (page) {
      return page.path === normalized;
    });

    if (direct) {
      return direct;
    }

    return COURSE_PAGES.find(function (page) {
      return window.location.pathname.endsWith(page.path);
    }) || null;
  }

  function isHomePage() {
    return !currentCoursePage() && normalizePath(window.location.pathname) === "/";
  }

  function rootPath() {
    return typeof window.path_to_root === "string" ? window.path_to_root : "";
  }

  function pageHref(page) {
    if (!page) {
      return rootPath() + "index.html";
    }

    return rootPath() + page.path.replace(/^\//, "");
  }

  function isComplete(page) {
    return readJson(storageKey("complete", page.path), false) === true;
  }

  function setComplete(page, value) {
    writeJson(storageKey("complete", page.path), value === true);
  }

  function completedCount(pages) {
    return pages.filter(isComplete).length;
  }

  function progressPercent(done, total) {
    return total > 0 ? Math.round((done / total) * 100) : 0;
  }

  function createProgressBar(done, total) {
    const percent = progressPercent(done, total);
    const wrapper = document.createElement("div");
    wrapper.className = "course-progress";
    wrapper.setAttribute("aria-label", "学习进度 " + percent + "%");

    const bar = document.createElement("div");
    bar.className = "course-progress__bar";
    bar.style.width = percent + "%";
    wrapper.appendChild(bar);

    return wrapper;
  }

  function stageGroups() {
    return ["阶段一", "阶段二", "阶段三", "阶段四"].map(function (stage) {
      const pages = COURSE_PAGES.filter(function (page) {
        return page.stage === stage;
      });
      const done = completedCount(pages);
      return { name: stage, total: pages.length, done: done };
    });
  }

  function nextLearningPage() {
    return COURSE_PAGES.find(function (page) {
      return !isComplete(page);
    }) || COURSE_PAGES[COURSE_PAGES.length - 1];
  }

  function renderHomeDashboard(main) {
    const done = completedCount(COURSE_PAGES);
    const next = nextLearningPage();
    const section = document.createElement("section");
    section.className = "course-learning course-learning--home";
    section.setAttribute("aria-label", "学习进度");

    const header = document.createElement("div");
    header.className = "course-learning__header";

    const title = document.createElement("h2");
    title.className = "course-learning__title";
    title.textContent = "学习进度";

    const stat = document.createElement("p");
    stat.className = "course-learning__stat";
    stat.textContent = "已完成 " + done + " / " + COURSE_PAGES.length + " 天";

    const action = document.createElement("a");
    action.className = "course-learning__primary";
    action.href = pageHref(next);
    action.textContent = done === COURSE_PAGES.length ? "回顾最终验收" : "继续学习 " + next.title.replace(/^Day\s*/, "Day ");

    header.appendChild(title);
    header.appendChild(stat);
    header.appendChild(action);

    const stages = document.createElement("div");
    stages.className = "course-learning__stages";

    stageGroups().forEach(function (stage) {
      const item = document.createElement("div");
      item.className = "course-learning__stage";

      const name = document.createElement("strong");
      name.textContent = stage.name;

      const count = document.createElement("span");
      count.textContent = stage.done + " / " + stage.total;

      item.appendChild(name);
      item.appendChild(count);
      item.appendChild(createProgressBar(stage.done, stage.total));
      stages.appendChild(item);
    });

    section.appendChild(header);
    section.appendChild(createProgressBar(done, COURSE_PAGES.length));
    section.appendChild(stages);
    main.insertBefore(section, main.firstChild);
  }

  function renderDayPanel(main, page) {
    const done = completedCount(COURSE_PAGES);
    const currentComplete = isComplete(page);
    const section = document.createElement("section");
    section.className = "course-learning course-learning--day";
    section.setAttribute("aria-label", "本课学习状态");

    const meta = document.createElement("div");
    meta.className = "course-learning__meta";
    meta.textContent = page.stage + " · Day " + String(page.index).padStart(2, "0") + " / 30";

    const controls = document.createElement("div");
    controls.className = "course-learning__controls";

    const stat = document.createElement("span");
    stat.className = "course-learning__stat";
    stat.textContent = "总进度 " + done + " / " + COURSE_PAGES.length;

    const button = document.createElement("button");
    button.className = "course-learning__primary";
    button.type = "button";

    function refreshButton() {
      const complete = isComplete(page);
      button.setAttribute("aria-pressed", complete ? "true" : "false");
      button.textContent = complete ? "已学完" : "标记学完";
      section.classList.toggle("is-complete", complete);
    }

    button.addEventListener("click", function () {
      setComplete(page, !isComplete(page));
      refreshButton();
      stat.textContent = "总进度 " + completedCount(COURSE_PAGES) + " / " + COURSE_PAGES.length;
    });

    controls.appendChild(stat);
    controls.appendChild(button);
    section.appendChild(meta);
    section.appendChild(controls);
    section.appendChild(createProgressBar(done, COURSE_PAGES.length));

    refreshButton();

    const heading = main.querySelector("h1");
    if (heading && heading.nextSibling) {
      main.insertBefore(section, heading.nextSibling);
    } else {
      main.insertBefore(section, main.firstChild);
    }

    if (currentComplete) {
      section.classList.add("is-complete");
    }
  }

  function renderChecklist(page) {
    const key = storageKey("checklist", page.path);
    const state = readJson(key, {});
    const fieldset = document.createElement("fieldset");
    fieldset.className = "course-checklist";

    const legend = document.createElement("legend");
    legend.textContent = "每日清单";
    fieldset.appendChild(legend);

    CHECKLIST_ITEMS.forEach(function (label, index) {
      const id = "course-check-" + page.index + "-" + index;
      const row = document.createElement("label");
      row.className = "course-checklist__item";
      row.setAttribute("for", id);

      const input = document.createElement("input");
      input.type = "checkbox";
      input.id = id;
      input.checked = state[index] === true;

      input.addEventListener("change", function () {
        state[index] = input.checked;
        writeJson(key, state);
      });

      const text = document.createElement("span");
      text.textContent = label;

      row.appendChild(input);
      row.appendChild(text);
      fieldset.appendChild(row);
    });

    return fieldset;
  }

  function renderNotes(page) {
    const key = storageKey("notes", page.path);
    const wrapper = document.createElement("div");
    wrapper.className = "course-notes";

    const label = document.createElement("label");
    label.className = "course-notes__label";
    label.setAttribute("for", "course-notes-" + page.index);
    label.textContent = "本地笔记";

    const textarea = document.createElement("textarea");
    textarea.id = "course-notes-" + page.index;
    textarea.className = "course-notes__field";
    textarea.rows = 6;
    textarea.placeholder = "今天的卡点、结论、下一步...";
    textarea.value = readText(key);

    const status = document.createElement("span");
    status.className = "course-notes__status";
    status.textContent = textarea.value ? "已保存" : "";

    let timer = null;
    textarea.addEventListener("input", function () {
      writeText(key, textarea.value);
      status.textContent = "保存中";
      clearTimeout(timer);
      timer = setTimeout(function () {
        status.textContent = "已保存";
      }, 350);
    });

    wrapper.appendChild(label);
    wrapper.appendChild(textarea);
    wrapper.appendChild(status);
    return wrapper;
  }

  function renderLearningTools(main, page) {
    const section = document.createElement("section");
    section.className = "course-learning-tools";
    section.setAttribute("aria-label", "学习工具");

    section.appendChild(renderChecklist(page));
    section.appendChild(renderNotes(page));
    main.appendChild(section);
  }

  function fallbackCopy(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      document.execCommand("copy");
    } finally {
      textarea.remove();
    }
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }

    fallbackCopy(text);
    return Promise.resolve();
  }

  function initCodeCopy(main) {
    main.querySelectorAll("pre > code").forEach(function (code) {
      const pre = code.parentElement;
      if (!pre || pre.classList.contains("course-code-block")) {
        return;
      }

      pre.classList.add("course-code-block");

      const button = document.createElement("button");
      button.className = "course-code-copy";
      button.type = "button";
      button.textContent = "复制";

      button.addEventListener("click", function () {
        copyText(code.textContent || "").then(function () {
          button.textContent = "已复制";
          button.classList.add("is-copied");
          setTimeout(function () {
            button.textContent = "复制";
            button.classList.remove("is-copied");
          }, 1400);
        }).catch(function () {
          button.textContent = "复制失败";
          setTimeout(function () {
            button.textContent = "复制";
          }, 1400);
        });
      });

      pre.appendChild(button);
    });
  }

  function initLearning() {
    const main = document.querySelector(".content main");

    if (!main || document.querySelector(".course-learning")) {
      return;
    }

    initCodeCopy(main);

    const page = currentCoursePage();
    if (isHomePage()) {
      renderHomeDashboard(main);
      return;
    }

    renderDayPanel(main, page);
    renderLearningTools(main, page);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLearning);
  } else {
    initLearning();
  }
})();
