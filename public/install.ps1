$ErrorActionPreference = "Stop"

function Write-CodingNSInfo {
  param([string]$Message)
  Write-Host "[codingns-install] $Message"
}

function Resolve-CodingNSBash {
  $candidates = New-Object System.Collections.Generic.List[string]

  if ($env:CODINGNS_BASH) {
    $candidates.Add($env:CODINGNS_BASH)
  }

  $programFiles = [Environment]::GetFolderPath("ProgramFiles")
  $programFilesX86 = [Environment]::GetFolderPath("ProgramFilesX86")
  $localAppData = [Environment]::GetFolderPath("LocalApplicationData")

  if ($programFiles) {
    $candidates.Add((Join-Path $programFiles "Git\bin\bash.exe"))
    $candidates.Add((Join-Path $programFiles "Git\usr\bin\bash.exe"))
  }

  if ($programFilesX86) {
    $candidates.Add((Join-Path $programFilesX86 "Git\bin\bash.exe"))
    $candidates.Add((Join-Path $programFilesX86 "Git\usr\bin\bash.exe"))
  }

  if ($localAppData) {
    $candidates.Add((Join-Path $localAppData "Programs\Git\bin\bash.exe"))
    $candidates.Add((Join-Path $localAppData "Programs\Git\usr\bin\bash.exe"))
  }

  $pathBash = Get-Command bash.exe -ErrorAction SilentlyContinue
  if ($pathBash -and $pathBash.Source -and ($pathBash.Source -notmatch "\\Windows\\System32\\bash\.exe$")) {
    $candidates.Add($pathBash.Source)
  }

  foreach ($candidate in $candidates) {
    if ($candidate -and (Test-Path -LiteralPath $candidate)) {
      return $candidate
    }
  }

  return $null
}

$baseUrl = $env:CODINGNS_INSTALL_BASE_URL
if ([string]::IsNullOrWhiteSpace($baseUrl)) {
  $baseUrl = "https://codingns.com"
}
$baseUrl = $baseUrl.TrimEnd("/")
$installUrl = "$baseUrl/install.sh"
$tempRoot = Join-Path ([System.IO.Path]::GetTempPath()) "codingns-install"
$installScript = Join-Path $tempRoot "install.sh"

New-Item -ItemType Directory -Force -Path $tempRoot | Out-Null

Write-CodingNSInfo "Downloading installer: $installUrl"
Invoke-WebRequest -UseBasicParsing -Uri $installUrl -OutFile $installScript

$bashPath = Resolve-CodingNSBash
if (-not $bashPath) {
  Write-Host ""
  Write-CodingNSInfo "Windows one-click installer needs Git Bash to run the CodingNS install flow."
  Write-CodingNSInfo "Install Git for Windows first, then run this command again: winget install --id Git.Git -e --source winget"
  exit 1
}

Write-CodingNSInfo "Using Bash: $bashPath"
& $bashPath $installScript
exit $LASTEXITCODE
