<# 
    RestartNetwork.ps1
    Restarts all network adapters that are currently enabled and connected.
    Run PowerShell as Administrator for full effect.
#>

Write-Host "Scanning for active network adapters..." -ForegroundColor Cyan

# Get all network adapters that are Up/Enabled
$adapters = Get-NetAdapter | Where-Object { $_.Status -eq "Up" }

if ($adapters.Count -eq 0) {
    Write-Host "No active network adapters found." -ForegroundColor Yellow
    exit
}

foreach ($adapter in $adapters) {
    Write-Host "Restarting adapter: $($adapter.Name)..." -ForegroundColor Green
    Restart-NetAdapter -Name $adapter.Name -Confirm:$false
    Start-Sleep -Seconds 3
}

Write-Host "✔ Network adapters restarted successfully!" -ForegroundColor Cyan
Pause