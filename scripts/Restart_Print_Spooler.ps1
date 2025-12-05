<#
    RestartPrintSpooler_Elevate.ps1
    Safely restarts the Windows Print Spooler service.
    Warns user before restarting, requests confirmation.
    Automatically requests elevation (UAC) if not running as Administrator.
#>

# Function to check if running as admin
function Test-Admin {
    $currentUser = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
    return $currentUser.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

# Relaunch script with elevation if not admin
if (-not (Test-Admin)) {
    Write-Host "⚠ Not running as Administrator. Relaunching with elevation..." -ForegroundColor Yellow
    Start-Process powershell.exe "-ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
    exit
}

# Clear console and display header
Clear-Host
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "        PRINT SPOOLER MANAGER         " -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# --- User Warning & Confirmation ---
Write-Host "⚠ WARNING: This will restart the Print Spooler service." -ForegroundColor Yellow
Write-Host "Make sure:" -ForegroundColor Yellow
Write-Host "  1. No one is using the printer." -ForegroundColor Yellow
Write-Host "  2. All print jobs are complete or paused." -ForegroundColor Yellow
Write-Host ""
$confirm = Read-Host "Do you want to continue? (Y/N)"

if ($confirm -notin @("Y","y")) {
    Write-Host "`nOperation cancelled by user." -ForegroundColor Red
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

# --- Get Print Spooler service ---
try {
    $service = Get-Service -Name "Spooler" -ErrorAction Stop
    Write-Host "Current Print Spooler Status: $($service.Status)" -ForegroundColor Yellow
} catch {
    Write-Host "❌ Print Spooler service not found!" -ForegroundColor Red
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

# --- Restart the service ---
try {
    Write-Host "`nRestarting Print Spooler..." -ForegroundColor Cyan
    Restart-Service -Name "Spooler" -Force -ErrorAction Stop
    Start-Sleep -Seconds 2
    $service.Refresh()
    Write-Host "✔ Print Spooler restarted successfully!" -ForegroundColor Green
    Write-Host "Current Status: $($service.Status)" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to restart Print Spooler." -ForegroundColor Red
}

# Pause so window does not close
Write-Host "`nPress any key to exit..." -ForegroundColor Magenta
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
