param(
  [switch]$Check
)

$ErrorActionPreference = "Stop"

$Root = Resolve-Path (Join-Path $PSScriptRoot "..")
$RawDir = Join-Path $Root "raw_courses"
$SrcDir = Join-Path $Root "src"

if (-not (Test-Path -LiteralPath $RawDir)) {
  throw "raw_courses directory was not found. Keep your private source course files in raw_courses/ before syncing."
}

$CourseMap = @(
  @{ RawPattern = "Day00-*.md"; Src = "README.md" }
  @{ RawPattern = "Day01-*.md"; Src = "days/day01-js-ts-mental-model.md" }
  @{ RawPattern = "Day02-*.md"; Src = "days/day02-variables-functions-objects.md" }
  @{ RawPattern = "Day03-*.md"; Src = "days/day03-arrays-objects-data-modeling.md" }
  @{ RawPattern = "Day04-*.md"; Src = "days/day04-modules-and-npm.md" }
  @{ RawPattern = "Day05-*.md"; Src = "days/day05-compile-run-debug.md" }
  @{ RawPattern = "Day06-*.md"; Src = "days/day06-package-json-entry.md" }
  @{ RawPattern = "Day07-*.md"; Src = "days/day07-phase-one-review.md" }
  @{ RawPattern = "Day08-*.md"; Src = "days/day08-interface-and-type.md" }
  @{ RawPattern = "Day09-*.md"; Src = "days/day09-union-literal-state.md" }
  @{ RawPattern = "Day10-*.md"; Src = "days/day10-narrowing-type-guard.md" }
  @{ RawPattern = "Day11-*.md"; Src = "days/day11-generics-list-utils.md" }
  @{ RawPattern = "Day12-*.md"; Src = "days/day12-discriminated-union.md" }
  @{ RawPattern = "Day13-*.md"; Src = "days/day13-utility-types.md" }
  @{ RawPattern = "Day14-*.md"; Src = "days/day14-tsconfig-declarations-review.md" }
  @{ RawPattern = "Day15-*.md"; Src = "days/day15-project-structure.md" }
  @{ RawPattern = "Day16-*.md"; Src = "days/day16-cli-entry-argv.md" }
  @{ RawPattern = "Day17-*.md"; Src = "days/day17-fs-path-scanning.md" }
  @{ RawPattern = "Day18-*.md"; Src = "days/day18-promise-async-todo.md" }
  @{ RawPattern = "Day19-*.md"; Src = "days/day19-config-error-handling.md" }
  @{ RawPattern = "Day20-*.md"; Src = "days/day20-child-process.md" }
  @{ RawPattern = "Day21-*.md"; Src = "days/day21-stream-readline-logging.md" }
  @{ RawPattern = "Day22-*.md"; Src = "days/day22-cli-debugging-testing.md" }
  @{ RawPattern = "Day23-*.md"; Src = "days/day23-cli-call-chain.md" }
  @{ RawPattern = "Day24-*.md"; Src = "days/day24-agent-loop.md" }
  @{ RawPattern = "Day25-*.md"; Src = "days/day25-tool-calling-registry.md" }
  @{ RawPattern = "Day26-*.md"; Src = "days/day26-permission-sandbox.md" }
  @{ RawPattern = "Day27-*.md"; Src = "days/day27-session-context-compaction.md" }
  @{ RawPattern = "Day28-*.md"; Src = "days/day28-hooks-plugins-mcp.md" }
  @{ RawPattern = "Day29-*.md"; Src = "days/day29-source-reading-method.md" }
  @{ RawPattern = "Day30-*.md"; Src = "days/day30-final-assessment.md" }
)

function Test-SameFileBytes {
  param(
    [string]$Left,
    [string]$Right
  )

  if (-not (Test-Path -LiteralPath $Right)) {
    return $false
  }

  $leftBytes = [System.IO.File]::ReadAllBytes($Left)
  $rightBytes = [System.IO.File]::ReadAllBytes($Right)

  if ($leftBytes.Length -ne $rightBytes.Length) {
    return $false
  }

  for ($i = 0; $i -lt $leftBytes.Length; $i++) {
    if ($leftBytes[$i] -ne $rightBytes[$i]) {
      return $false
    }
  }

  return $true
}

$mismatches = New-Object System.Collections.Generic.List[string]

foreach ($item in $CourseMap) {
  $rawMatches = @(Get-ChildItem -LiteralPath $RawDir -Filter $item.RawPattern -File)

  if ($rawMatches.Count -eq 0) {
    throw "Missing raw course file matching pattern: $($item.RawPattern)"
  }

  if ($rawMatches.Count -gt 1) {
    throw "Multiple raw course files match pattern $($item.RawPattern): $($rawMatches.Name -join ', ')"
  }

  $rawPath = $rawMatches[0].FullName
  $srcPath = Join-Path $SrcDir $item.Src

  if ($Check) {
    if (-not (Test-SameFileBytes -Left $rawPath -Right $srcPath)) {
      $mismatches.Add("$($rawMatches[0].Name) -> $($item.Src)")
    }
  } else {
    $srcParent = Split-Path -Parent $srcPath
    if (-not (Test-Path -LiteralPath $srcParent)) {
      New-Item -ItemType Directory -Force -Path $srcParent | Out-Null
    }

    Copy-Item -LiteralPath $rawPath -Destination $srcPath -Force
  }
}

if ($Check) {
  if ($mismatches.Count -gt 0) {
    Write-Error ("Course files are out of sync:`n" + ($mismatches -join "`n"))
    exit 1
  }

  Write-Host "Course files are in sync: raw_courses -> src"
  exit 0
}

Write-Host "Synced $($CourseMap.Count) course files: raw_courses -> src"
