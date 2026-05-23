$ErrorActionPreference = "Stop"

function Write-CodingNSInfo {
  param([string]$Message)
  Write-Host "[codingns-install] $Message"
}

function Resolve-CodingNSWinget {
  $winget = Get-Command winget.exe -ErrorAction SilentlyContinue
  if ($winget -and $winget.Source) {
    return $winget.Source
  }

  return $null
}

function Install-CodingNSGitForWindows {
  $wingetPath = Resolve-CodingNSWinget
  if (-not $wingetPath) {
    Write-Host ""
    Write-CodingNSInfo "Git Bash was not found, and winget is not available on this machine."
    Write-CodingNSInfo "Please install Git for Windows manually, then run this command again: winget install --id Git.Git -e --source winget"
    exit 1
  }

  Write-Host ""
  Write-CodingNSInfo "Git Bash was not found. Installing Git for Windows with winget..."
  Write-CodingNSInfo "Command: winget install --id Git.Git -e --source winget --accept-package-agreements --accept-source-agreements"

  & $wingetPath install --id Git.Git -e --source winget --accept-package-agreements --accept-source-agreements
  $exitCode = $LASTEXITCODE
  if ($exitCode -ne 0) {
    Write-Host ""
    Write-CodingNSInfo "Git for Windows installation failed. winget exit code: $exitCode"
    Write-CodingNSInfo "Please install Git for Windows manually, then run this command again."
    exit $exitCode
  }

  $bashPath = $null
  for ($index = 0; $index -lt 10; $index += 1) {
    $bashPath = Resolve-CodingNSBash
    if ($bashPath) {
      return $bashPath
    }
    Start-Sleep -Seconds 1
  }

  Write-Host ""
  Write-CodingNSInfo "Git for Windows was installed, but Git Bash is still not available in the expected locations."
  Write-CodingNSInfo "Please open a new PowerShell window and run the install command again."
  exit 1
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
  $bashPath = Install-CodingNSGitForWindows
}

Write-CodingNSInfo "Using Bash: $bashPath"
& $bashPath $installScript
exit $LASTEXITCODE
