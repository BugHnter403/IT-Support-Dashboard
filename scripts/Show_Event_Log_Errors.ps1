<#
    EventLogManager.ps1
    Displays Event Log errors, shows recent and old users.
    Allows deletion of old log errors with user confirmation.
#>

function Write-Header($text) {
    Write-Host "======================================" -ForegroundColor Cyan
    Write-Host $text -ForegroundColor Cyan
    Write-Host "======================================" -ForegroundColor Cyan
}

Clear-Host
Write-Header "EVENT LOG MANAGER"

# --- Select Log Type ---
$logTypes = @("Application", "System", "Security")
Write-Host "Available Event Logs:" -ForegroundColor Yellow
for ($i=0; $i -lt $logTypes.Count; $i++) {
    Write-Host "$($i+1)) $($logTypes[$i])"
}
$logChoice = Read-Host "Select a log to view (1-$($logTypes.Count))"
$logName = $logTypes[$logChoice - 1]

# --- Get recent errors ---
Write-Host "`nFetching recent errors from '$logName' log..." -ForegroundColor Yellow
$recentErrors = Get-EventLog -LogName $logName -EntryType Error -Newest 20

if ($recentErrors.Count -eq 0) {
    Write-Host "No recent errors found." -ForegroundColor Green
} else {
    Write-Host "Recent Errors:" -ForegroundColor Green
    $recentErrors | ForEach-Object {
        $time = $_.TimeGenerated
        $source = $_.Source
        $user = if ($_.UserName) { $_.UserName } else { "N/A" }
        $message = $_.Message.Split("`n")[0]  # First line of message
        Write-Host "[$time] Source: $source | User: $user | $message"
    }
}

# --- Get old errors ---
Write-Host "`nFetching older errors from '$logName' log..." -ForegroundColor Yellow
$oldErrors = Get-EventLog -LogName $logName -EntryType Error | Where-Object { $_.TimeGenerated -lt (Get-Date).AddDays(-30) }

if ($oldErrors.Count -eq 0) {
    Write-Host "No old errors older than 30 days found." -ForegroundColor Green
} else {
    Write-Host "Old Errors (>30 days):" -ForegroundColor Yellow
    $oldErrors | ForEach-Object {
        $time = $_.TimeGenerated
        $source = $_.Source
        $user = if ($_.UserName) { $_.UserName } else { "N/A" }
        $message = $_.Message.Split("`n")[0]
        Write-Host "[$time] Source: $source | User: $user | $message"
    }

    # Ask user if they want to delete old errors
    $deleteChoice = Read-Host "`nDo you want to clear these old errors? (Y/N)"
    if ($deleteChoice -match "^[Yy]$") {
        try {
            Clear-EventLog -LogName $logName
            Write-Host "Old errors cleared from '$logName' log." -ForegroundColor Green
        } catch {
            Write-Host "Failed to clear event log. Run PowerShell as Administrator." -ForegroundColor Red
        }
    } else {
        Write-Host "Old errors not deleted." -ForegroundColor Yellow
    }
}

Write-Host "`nTask Completed. Press any key to exit..." -ForegroundColor Magenta
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
