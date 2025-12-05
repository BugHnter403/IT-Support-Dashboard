<#
    Show_Local_Admins.ps1
    Displays all members of the local Administrators group
    including local & domain accounts.
    Keeps PowerShell window open after execution.
#>

function Write-Header($title) {
    Write-Host "======================================" -ForegroundColor Cyan
    Write-Host $title -ForegroundColor Cyan
    Write-Host "======================================" -ForegroundColor Cyan
}

Clear-Host
Write-Header "LOCAL ADMINISTRATORS REPORT"

try {
    $admins = Get-LocalGroupMember -Group "Administrators" -ErrorAction Stop
} catch {
    Write-Host "❌ Failed to retrieve Administrators group members!" -ForegroundColor Red
    Write-Host "This script must be run on Windows 10/11 or Server with PowerShell 5+."
    Write-Host "`nPress any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

if ($admins.Count -eq 0) {
    Write-Host "No members found in Administrators group!" -ForegroundColor Yellow
} else {
    Write-Host "`nMembers Found:" -ForegroundColor Green
    Write-Host "--------------------------------------"

    foreach ($member in $admins) {
        Write-Host ("• {0}   ({1})" -f $member.Name, $member.ObjectClass) -ForegroundColor White
    }
}

Write-Host "`n--------------------------------------"
Write-Host "Total Admin Members: $($admins.Count)" -ForegroundColor Cyan

Write-Host "`nPress any key to exit..." -ForegroundColor Magenta
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
