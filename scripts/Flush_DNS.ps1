<#
    FlushDNS.ps1
    Clears DNS cache and restarts DNS-related services if needed.
    Keeps the PowerShell window open after completion.
#>

function Write-Header($title) {
    Write-Host "======================================" -ForegroundColor Cyan
    Write-Host $title -ForegroundColor Cyan
    Write-Host "======================================" -ForegroundColor Cyan
}

Clear-Host
Write-Header "DNS FLUSH & NETWORK CACHE RESET"

Write-Host "`nFlushing DNS cache..." -ForegroundColor Yellow
try {
    ipconfig /flushdns | Out-Null
    Write-Host "✓ DNS cache flushed successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to flush DNS!" -ForegroundColor Red
}

Write-Host "`nRestarting DNS Client Service..." -ForegroundColor Yellow
try {
    net stop dnscache /y | Out-Null
    net start dnscache | Out-Null
    Write-Host "✓ DNS Client Service restarted!" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Service restart failed. (Requires admin privileges)" -ForegroundColor DarkYellow
}

Write-Host "`nReleasing and Renewing IP..." -ForegroundColor Yellow
try {
    ipconfig /release | Out-Null
    ipconfig /renew | Out-Null
    Write-Host "✓ IP configuration refreshed!" -ForegroundColor Green
} catch {
    Write-Host "⚠️ IP refresh failed. (Requires admin privileges)" -ForegroundColor DarkYellow
}

Write-Host "`nOperation Completed Successfully." -ForegroundColor Cyan
Write-Host "Press any key to exit..." -ForegroundColor Magenta
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
