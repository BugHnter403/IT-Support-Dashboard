<#
    Show_Local_Users.ps1
    Displays all local user accounts with status & info.
    Works on Windows 10/11 and Windows Server with PowerShell 5+.
    Keeps console open after finished.
#>

function Write-Header($title) {
    Write-Host "======================================" -ForegroundColor Cyan
    Write-Host $title -ForegroundColor Cyan
    Write-Host "======================================" -ForegroundColor Cyan
}

Clear-Host
Write-Header "LOCAL USER ACCOUNTS REPORT"

try {
    $users = Get-LocalUser -ErrorAction Stop
} catch {
    Write-Host "❌ Unable to load local users!" -ForegroundColor Red
    Write-Host "This script requires Windows 10/11 or Windows Server."
    Write-Host "`nPress any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

if ($users.Count -eq 0) {
    Write-Host "⚠️ No local users found!" -ForegroundColor Yellow
} else {
    Write-Host "`nUsers Found:" -ForegroundColor Green
    Write-Host "--------------------------------------"
    
    foreach ($user in $users) {
        $status = if ($user.Enabled) { "Enabled" } else { "Disabled" }
        Write-Host "• $($user.Name)" -ForegroundColor White
        Write-Host "  Status     : $status" -ForegroundColor Gray
        Write-Host "  Description: $($user.Description)" -ForegroundColor Gray
        if ($user.LastLogon) {
            Write-Host "  Last Logon : $($user.LastLogon)" -ForegroundColor Gray
        } else {
            Write-Host "  Last Logon : Never Logged In / Unknown" -ForegroundColor DarkGray
        }
        Write-Host "--------------------------------------"
    }
}

Write-Host "`nTotal Local Users: $($users.Count)" -ForegroundColor Cyan

Write-Host "`nPress any key to exit..." -ForegroundColor Magenta
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
