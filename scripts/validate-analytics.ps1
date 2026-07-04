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

Assert-FileContains -Path "theme/head.hbs" -Pattern "data-goatcounter" -Message "theme/head.hbs must load GoatCounter tracking."
Assert-FileContains -Path "src/theme/course-feedback.js" -Pattern "course-stats\.json" -Message "course-feedback.js must load the public stats JSON."
Assert-FileContains -Path "src/theme/course-feedback.js" -Pattern "currentPagePath" -Message "course-feedback.js must map the current mdBook page to a stats path."
Assert-FileContains -Path "src/theme/course-feedback.css" -Pattern "\.course-stats" -Message "course-feedback.css must style the public stats block."
Assert-FileContains -Path "src/theme/course-stats.json" -Pattern '"topPages"' -Message "src/theme/course-stats.json must provide a safe default stats payload."
Assert-FileContains -Path "scripts/build-public-stats.mjs" -Pattern "/api/v0" -Message "build-public-stats.mjs must use GoatCounter API v0."
Assert-FileContains -Path "scripts/build-public-stats.mjs" -Pattern "GOATCOUNTER_REPORTING_UTC_OFFSET" -Message "build-public-stats.mjs must support a reporting timezone offset."
Assert-FileContains -Path "scripts/build-public-stats.mjs" -Pattern "/stats/total" -Message "build-public-stats.mjs must read GoatCounter totals."
Assert-FileContains -Path "scripts/build-public-stats.mjs" -Pattern "/stats/hits" -Message "build-public-stats.mjs must read GoatCounter page hits."
Assert-FileContains -Path ".github/workflows/deploy.yml" -Pattern "Build public analytics summary" -Message "deploy.yml must generate public stats during Pages build."
Assert-FileContains -Path ".github/workflows/deploy.yml" -Pattern "GOATCOUNTER_API_TOKEN" -Message "deploy.yml must pass the GoatCounter API token through a secret."
Assert-FileContains -Path ".github/workflows/deploy.yml" -Pattern "GOATCOUNTER_REPORTING_UTC_OFFSET" -Message "deploy.yml must set the analytics reporting timezone."

Write-Host "Analytics integration checks passed."
