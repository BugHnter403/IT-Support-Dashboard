<#
    Show_Recently_Modified.ps1
    Displays recently modified files for the local machine.
    User can choose location and time range.
#>

# Prevent window auto-close
$Host.UI.RawUI.WindowTitle = "Recently Modified Files Viewer"
Clear-Host

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "      RECENTLY MODIFIED FILES REPORT         " -ForegroundColor Cyan
Write-Host "=============================================`n" -ForegroundColor Cyan

# Ask user to enter directory
$folder = Read-Host "Enter folder path to scan (Example: C:\Users)"

if (!(Test-Path $folder)) {
    Write-Host "`n❌ Invalid folder path!" -ForegroundColor Red
    Write-Host "Press ENTER to exit..."
    Read-Host
    exit
}

# Ask filtering days
$days = Read-Host "Show files modified within the last how many days? (Example: 7)"

if ($days -notmatch '^\d+$') {
    Write-Host "`n❌ Invalid number!" -ForegroundColor Red
    Write-Host "Press ENTER to exit..."
    Read-Host
    exit
}

try {
    Write-Host "`nScanning files... Please wait..." -ForegroundColor Yellow

    $timeLimit = (Get-Date).AddDays(-[int]$days)

    $results = Get-ChildItem -Path $folder -Recurse -File -ErrorAction SilentlyContinue |
               Where-Object { $_.LastWriteTime -ge $timeLimit } |
               Select-Object FullName, LastWriteTime |
               Sort-Object LastWriteTime -Descending

    Write-Host "`n=========== RESULTS ===========" -ForegroundColor Green
    if ($results.Count -gt 0) {
        $results | Format-Table -AutoSize
    } else {
        Write-Host "No files modified in the last $days days." -ForegroundColor DarkGray
    }
}
catch {
    Write-Host "`n❌ Error scanning files!" -ForegroundColor Red
}

Write-Host "`nPress ENTER to exit..." -ForegroundColor Magenta
Read-Host
