$ErrorActionPreference = "Stop"

function Assert-FileContains {
  param(
    [string]$Path,
    [string]$Pattern,
    [string]$Message
  )

  if (-not (Test-Path -LiteralPath $Path)) {
    throw "Missing file: $Path"
  }

  $content = Get-Content -Raw -Encoding UTF8 $Path
  if ($content -notmatch $Pattern) {
    throw $Message
  }
}

function Assert-FileDoesNotContain {
  param(
    [string]$Path,
    [string]$Pattern,
    [string]$Message
  )

  if (-not (Test-Path -LiteralPath $Path)) {
    throw "Missing file: $Path"
  }

  $content = Get-Content -Raw -Encoding UTF8 $Path
  if ($content -match $Pattern) {
    throw $Message
  }
}

Assert-FileContains -Path "theme/head.hbs" -Pattern "data-goatcounter" -Message "theme/head.hbs must load GoatCounter tracking."
Assert-FileContains -Path "src/theme/course-feedback.js" -Pattern "course-stats\.json" -Message "course-feedback.js must load the public stats JSON."
Assert-FileContains -Path "src/theme/course-feedback.js" -Pattern "currentPagePath" -Message "course-feedback.js must map the current mdBook page to a stats path."
Assert-FileContains -Path "src/theme/course-feedback.js" -Pattern "course-stats__notice" -Message "course-feedback.js must show a visible notice when configured stats are unavailable."
Assert-FileContains -Path "src/theme/course-feedback.js" -Pattern "slice\(0, 3\)" -Message "course-feedback.js must limit public top pages to Top 3."
Assert-FileContains -Path "src/theme/course-feedback.js" -Pattern "Top 3" -Message "course-feedback.js must label the popular chapters list as Top 3."
Assert-FileContains -Path "src/theme/course-feedback.js" -Pattern "course-feedback__comments" -Message "course-feedback.js must find the comments area before placing stats."
Assert-FileContains -Path "src/theme/course-feedback.js" -Pattern 'insertAdjacentElement\("afterend"' -Message "course-feedback.js must place stats after the comments area."
Assert-FileContains -Path "src/theme/course-feedback.css" -Pattern "\.course-stats" -Message "course-feedback.css must style the public stats block."
Assert-FileContains -Path "src/theme/course-feedback.css" -Pattern "\.course-stats__notice" -Message "course-feedback.css must style the stats unavailable notice."
Assert-FileContains -Path "src/theme/course-feedback.css" -Pattern "margin: 2\.75rem 0 0" -Message "course-feedback.css must add larger spacing above the bottom stats block."
Assert-FileContains -Path "src/theme/course-stats.json" -Pattern '"topPages"' -Message "src/theme/course-stats.json must provide a safe default stats payload."
Assert-FileContains -Path "scripts/build-public-stats.mjs" -Pattern "/api/v0" -Message "build-public-stats.mjs must use GoatCounter API v0."
Assert-FileContains -Path "scripts/build-public-stats.mjs" -Pattern "GOATCOUNTER_REPORTING_UTC_OFFSET" -Message "build-public-stats.mjs must support a reporting timezone offset."
Assert-FileContains -Path "scripts/build-public-stats.mjs" -Pattern "/stats/total" -Message "build-public-stats.mjs must read GoatCounter totals."
Assert-FileContains -Path "scripts/build-public-stats.mjs" -Pattern "/stats/hits" -Message "build-public-stats.mjs must read GoatCounter page hits."
Assert-FileContains -Path "scripts/build-public-stats.mjs" -Pattern "wrote disabled public stats" -Message "build-public-stats.mjs must fall back to disabled stats on recoverable GoatCounter failures."
Assert-FileContains -Path "scripts/build-public-stats.mjs" -Pattern "unavailableSummary" -Message "build-public-stats.mjs must publish a visible unavailable state when configured stats cannot be fetched."
Assert-FileDoesNotContain -Path "scripts/build-public-stats.mjs" -Pattern "process\.exit\(1\)" -Message "build-public-stats.mjs must not fail Pages deployment when GoatCounter stats cannot be fetched."
Assert-FileContains -Path ".github/workflows/deploy.yml" -Pattern "Build public analytics summary" -Message "deploy.yml must generate public stats during Pages build."
Assert-FileContains -Path ".github/workflows/deploy.yml" -Pattern "GOATCOUNTER_API_TOKEN" -Message "deploy.yml must pass the GoatCounter API token through a secret."
Assert-FileContains -Path ".github/workflows/deploy.yml" -Pattern "GOATCOUNTER_REPORTING_UTC_OFFSET" -Message "deploy.yml must set the analytics reporting timezone."

Write-Host "Analytics integration checks passed."
