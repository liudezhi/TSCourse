# 30 天 TypeScript 精品课程

这是一个使用 mdBook 生成的 TypeScript 自学课程站点，课程目标是帮助有 C 语言基础的学习者，在 30 天内建立 TypeScript + Node.js + CLI + AI Agent 源码阅读的主干能力。

## 目录结构

```text
raw_courses/        本地原始课程 Markdown，不上传远端
src/                mdBook 发布源码
src/SUMMARY.md      mdBook 章节目录
book.toml           mdBook 配置
.github/workflows/  GitHub Pages 自动部署
scripts/            本地维护脚本
```

## 课程维护规则

`raw_courses/` 是本地原始课程文件夹，已经加入 `.gitignore`，不会上传到远端仓库。

长期维护时遵守这个顺序：

1. 先修改 `raw_courses/` 下的课程原文。
2. 运行同步脚本，把原文同步到 mdBook 发布目录 `src/`。
3. 检查同步状态。
4. 只提交 `src/`、`book.toml`、`SUMMARY.md`、脚本和部署配置。

同步课程：

```powershell
.\scripts\sync-courses.ps1
```

检查 `raw_courses/` 和 `src/` 是否一致：

```powershell
.\scripts\sync-courses.ps1 -Check
```

如果 Windows PowerShell 提示当前系统禁止运行脚本，可以只对这一次命令绕过执行策略：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\sync-courses.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\sync-courses.ps1 -Check
```

不要直接长期编辑 `src/days/*.md`。`src/` 是发布用内容，下一次同步会被 `raw_courses/` 覆盖。

## 本地预览

安装 mdBook 后运行：

```bash
mdbook serve --open
```

构建静态站点：

```bash
mdbook build
```

构建结果会生成到 `book/` 目录，该目录已加入 `.gitignore`。

## 学习者反馈与留言

站点每个页面底部都会通过 `src/theme/course-feedback.js` 自动加入反馈区：

1. `反馈此页` 会打开 GitHub Issue，并自动带上当前页面地址和对应源码路径。
2. 留言区使用 Utterances，把页面评论保存到 GitHub Issues。
3. 访问统计使用 GoatCounter 记录页面访问，并只公开聚合摘要数据：本站访问、今日访问、本页阅读和热门章节 Top 10。

启用留言区需要在仓库安装一次 Utterances App：

1. 打开 https://github.com/apps/utterances。
2. 点击 `Install`。
3. 只选择 `liudezhi/TSCourse` 仓库授权。
4. 仓库需要保持公开，否则访客无法读取评论。

页面注入入口在 `theme/head.hbs`，反馈区样式和脚本在 `src/theme/`。如果以后想关闭页面留言区，删除 `theme/head.hbs` 即可。

## 访问统计配置

站点默认按 GoatCounter 站点代码 `tscourse` 接入：

```html
https://tscourse.goatcounter.com/count
```

如果你注册 GoatCounter 时使用了别的站点代码，需要同步修改两个地方：

1. `theme/head.hbs` 里的 `data-goatcounter` 地址。
2. GitHub 仓库变量 `GOATCOUNTER_SITE_CODE`。

公开统计摘要由 GitHub Actions 在构建时生成到 `book/theme/course-stats.json`。前端只读取这个公开 JSON，不暴露 GoatCounter API token。
`今日访问` 默认按北京时间 `+08:00` 计算；如果以后站点主要面向其他时区，可以修改 `.github/workflows/deploy.yml` 里的 `GOATCOUNTER_REPORTING_UTC_OFFSET`。

需要在 GitHub 仓库配置：

1. `Settings -> Secrets and variables -> Actions -> Variables` 中新增 `GOATCOUNTER_SITE_CODE`，值为 GoatCounter 站点代码，例如 `tscourse`。
2. `Settings -> Secrets and variables -> Actions -> Secrets` 中新增 `GOATCOUNTER_API_TOKEN`，值为 GoatCounter API token。

如果暂时没有配置 `GOATCOUNTER_API_TOKEN`，部署不会失败，但页面不会展示访问统计摘要。

## GitHub Pages 部署

仓库推送到 `main` 或 `master` 分支后，GitHub Actions 会运行 `.github/workflows/deploy.yml`：

1. 安装 mdBook。
2. 执行 `mdbook build`。
3. 上传 `book/` 目录。
4. 发布到 GitHub Pages。

首次部署前，需要在 GitHub 仓库里手动启用一次 Pages：

1. 打开 `Settings -> Pages`。
2. 将 `Build and deployment` 里的 `Source` 选择为 `GitHub Actions`。
3. 保存设置后，重新运行失败的 workflow，或推送一次新的提交。

如果没有先启用 Pages，`actions/configure-pages@v5` 会在 CI 中报 `Get Pages site failed`。不要直接给 workflow 加 `enablement: true`，除非你已经额外配置了具有 Pages 写权限的 PAT secret；默认的 `GITHUB_TOKEN` 不能自动启用仓库 Pages。
