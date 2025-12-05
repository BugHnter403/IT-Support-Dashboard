<#
    Firewall_Manager.ps1
    View or manage Windows Firewall status
    Automatically requests Administrator privileges if needed
#>

# Check if running as Administrator
function Test-Admin {
    $user = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
    return $user.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

# Relaunch with Elevation if required for changes
if (-not (Test-Admin)) {
    Write-Host "⚠ Restarting script as Administrator..." -ForegroundColor Yellow
    Start-Process powershell.exe "-ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
    exit
}

Clear-Host
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "          FIREWALL MANAGER            " -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

function Show-FirewallStatus {
    Write-Host "`nCurrent Firewall Status:" -ForegroundColor Yellow
    Get-NetFirewallProfile |
        Select-Object Name, Enabled |
        Format-Table -AutoSize
}

Show-FirewallStatus

Write-Host "`nChoose an option:" -ForegroundColor Green
Write-Host "[1] Enable Firewall (All Profiles)" -ForegroundColor White
Write-Host "[2] Disable Firewall (All Profiles)" -ForegroundColor White
Write-Host "[3] Exit" -ForegroundColor White

$choice = Read-Host "`nEnter your selection (1-3)"

switch ($choice) {

    "1" {
        Write-Host "`nEnabling Firewall..." -ForegroundColor Yellow
        Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled True
        Write-Host "✔ Firewall Enabled!" -ForegroundColor Green
        Show-FirewallStatus
    }

    "2" {
        Write-Host "`n⚠ WARNING! You are about to disable ALL firewall protection!" -ForegroundColor Red
        Write-Host "This may expose your system to network attacks." -ForegroundColor DarkRed
        $confirm = Read-Host "Type YES to confirm:"

        if ($confirm -eq "YES") {
            Write-Host "`nDisabling Firewall..." -ForegroundColor Yellow
            Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled False
            Write-Host "❌ Firewall Disabled!" -ForegroundColor Red
            Show-FirewallStatus
        } else {
            Write-Host "`nAction cancelled." -ForegroundColor Gray
        }
    }

    "3" {
        Write-Host "`nExiting..." -ForegroundColor Gray
    }

    Default {
        Write-Host "`nInvalid option selected!" -ForegroundColor Red
    }
}

Write-Host "`nPress ENTER to exit..." -ForegroundColor Magenta
Read-Host
