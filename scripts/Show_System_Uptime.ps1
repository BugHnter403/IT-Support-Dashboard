# Clear the screen
Clear-Host

# Header
Write-Host "========== SYSTEM UPTIME ==========" -ForegroundColor Cyan

# Calculate and display uptime
$uptime = (Get-Date) - (Get-CimInstance Win32_OperatingSystem).LastBootUpTime
Write-Host "`nSystem Uptime: $($uptime.Days) Days, $($uptime.Hours) Hours, $($uptime.Minutes) Minutes, $($uptime.Seconds) Seconds" -ForegroundColor Green

# Display last boot time
$lastBoot = (Get-CimInstance Win32_OperatingSystem).LastBootUpTime
Write-Host "Last Boot Time: $lastBoot" -ForegroundColor Yellow

# Pause so the window does not close
Write-Host "`nPress Enter to exit..." -ForegroundColor Magenta
Read-Host

