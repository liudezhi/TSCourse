import fs from "node:fs/promises";
import path from "node:path";

const SITE_CODE = process.env.GOATCOUNTER_SITE_CODE || "tscourse";
const API_TOKEN = process.env.GOATCOUNTER_API_TOKEN || "";
const PUBLIC_BASE_PATH = normalizeBasePath(process.env.GOATCOUNTER_PUBLIC_BASE_PATH || "/TSCourse");
const REPORTING_UTC_OFFSET = parseUtcOffset(process.env.GOATCOUNTER_REPORTING_UTC_OFFSET || "+08:00");
const OUTPUT_PATH = process.env.COURSE_STATS_OUTPUT || path.join("book", "theme", "course-stats.json");
const SUMMARY_PATH = path.join("src", "SUMMARY.md");
const API_BASE = `https://${SITE_CODE}.goatcounter.com/api/v0`;

function normalizeBasePath(basePath) {
  if (!basePath || basePath === "/") {
    return "";
  }

  return "/" + basePath.replace(/^\/+|\/+$/g, "");
}

function normalizePublicPath(rawPath) {
  let normalized = rawPath || "/";

  if (/^https?:\/\//.test(normalized)) {
    normalized = new URL(normalized).pathname;
  }

  if (PUBLIC_BASE_PATH && normalized.startsWith(PUBLIC_BASE_PATH + "/")) {
    normalized = normalized.slice(PUBLIC_BASE_PATH.length);
  } else if (PUBLIC_BASE_PATH && normalized === PUBLIC_BASE_PATH) {
    normalized = "/";
  }

  normalized = normalized.replace(/\/index\.html$/, "/").replace(/\/$/, "");
  return normalized || "/";
}

function toCountedPath(publicPath) {
  const normalized = publicPath === "/" ? "/" : publicPath;
  return (PUBLIC_BASE_PATH + normalized).replace(/\/{2,}/g, "/") || "/";
}

function isoDate(date) {
  return date.toISOString().replace(/\.\d{3}Z$/, "Z");
}

function parseUtcOffset(value) {
  const match = /^([+-])(\d{2}):?(\d{2})$/.exec(value);

  if (!match) {
    throw new Error(`Invalid GOATCOUNTER_REPORTING_UTC_OFFSET: ${value}`);
  }

  const sign = match[1] === "-" ? -1 : 1;
  return sign * (Number(match[2]) * 60 + Number(match[3]));
}

function startOfReportingDay(date) {
  const shifted = new Date(date.getTime() + REPORTING_UTC_OFFSET * 60 * 1000);
  const shiftedMidnight = Date.UTC(
    shifted.getUTCFullYear(),
    shifted.getUTCMonth(),
    shifted.getUTCDate()
  );

  return new Date(shiftedMidnight - REPORTING_UTC_OFFSET * 60 * 1000);
}

function longAgo() {
  return new Date("2000-01-01T00:00:00Z");
}

function defaultSummary(enabled = false) {
  return {
    enabled,
    generatedAt: enabled ? new Date().toISOString() : null,
    site: SITE_CODE,
    totals: {
      allTime: 0,
      today: 0
    },
    pages: {},
    topPages: []
  };
}

async function writeSummary(summary) {
  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(summary, null, 2) + "\n", "utf8");
}

function extractCount(value) {
  if (typeof value === "number") {
    return value;
  }

  if (!value || typeof value !== "object") {
    return 0;
  }

  for (const key of ["count", "total", "pageviews", "views", "hits", "visitors"]) {
    if (typeof value[key] === "number") {
      return value[key];
    }
  }

  if (value.total && typeof value.total === "object") {
    return extractCount(value.total);
  }

  return 0;
}

function extractHits(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (!value || typeof value !== "object") {
    return [];
  }

  for (const key of ["hits", "paths", "data", "results"]) {
    if (Array.isArray(value[key])) {
      return value[key];
    }
  }

  return [];
}

async function goat(pathname, params) {
  const url = new URL(API_BASE + pathname);

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => url.searchParams.append(key, item));
    } else if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`GoatCounter API ${response.status}: ${await response.text()}`);
  }

  return response.json();
}

async function readCoursePages() {
  const summary = await fs.readFile(SUMMARY_PATH, "utf8");
  const pages = [{ path: "/", title: "课程总览" }];
  const pattern = /\[([^\]]+)\]\((days\/[^)]+\.md)\)/g;
  let match;

  while ((match = pattern.exec(summary))) {
    pages.push({
      title: match[1],
      path: "/" + match[2].replace(/\.md$/, ".html")
    });
  }

  return pages;
}

async function readTotal(start, end, publicPath) {
  const params = {
    start: isoDate(start),
    end: isoDate(end)
  };

  if (publicPath) {
    params.path_by_name = "true";
    params.include_paths = [toCountedPath(publicPath)];
  }

  return extractCount(await goat("/stats/total", params));
}

async function readTopPages(start, end, titleByPath) {
  const response = await goat("/stats/hits", {
    start: isoDate(start),
    end: isoDate(end),
    limit: "10"
  });

  return extractHits(response)
    .map((item) => {
      const publicPath = normalizePublicPath(item.path || item.name || "");
      return {
        path: publicPath,
        title: titleByPath.get(publicPath) || item.title || item.name || publicPath,
        views: extractCount(item)
      };
    })
    .filter((item) => item.path && item.views > 0)
    .slice(0, 10);
}

async function main() {
  if (!API_TOKEN) {
    await writeSummary(defaultSummary(false));
    console.log(`GoatCounter token missing; wrote disabled public stats to ${OUTPUT_PATH}`);
    return;
  }

  const now = new Date();
  const start = longAgo();
  const today = startOfReportingDay(now);
  const coursePages = await readCoursePages();
  const titleByPath = new Map(coursePages.map((page) => [page.path, page.title]));

  const [allTime, todayTotal, topPages] = await Promise.all([
    readTotal(start, now),
    readTotal(today, now),
    readTopPages(start, now, titleByPath)
  ]);

  const pageEntries = await Promise.all(
    coursePages.map(async (page) => {
      try {
        return [page.path, await readTotal(start, now, page.path)];
      } catch (error) {
        console.warn(`Could not fetch page stats for ${page.path}: ${error.message}`);
        return [page.path, 0];
      }
    })
  );

  await writeSummary({
    enabled: true,
    generatedAt: now.toISOString(),
    site: SITE_CODE,
    totals: {
      allTime,
      today: todayTotal
    },
    pages: Object.fromEntries(pageEntries),
    topPages
  });

  console.log(`Wrote public GoatCounter stats to ${OUTPUT_PATH}`);
}

main().catch(async (error) => {
  console.error(error);
  await writeSummary(defaultSummary(false));
  process.exit(1);
});
