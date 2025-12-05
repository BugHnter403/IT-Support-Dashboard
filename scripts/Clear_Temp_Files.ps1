<#
    CleanTemp.ps1
    Safely cleans user and system temporary folders.
    Run PowerShell as Administrator for best results.
#>

Write-Host "🧹 Cleaning Temporary Files..." -ForegroundColor Cyan

# Paths to clean
$paths = @(
    "$env:TEMP\*",
    "$env:TMP\*",
    "$env:LOCALAPPDATA\Temp\*",
    "C:\Windows\Temp\*"
)

foreach ($path in $paths) {
    Write-Host "Cleaning: $path"
    try {
        Remove-Item -Path $path -Recurse -Force -ErrorAction SilentlyContinue
    } catch {
        Write-Host "Skipping some protected files..."
    }
}

Write-Host "`n✔ Temp files removed successfully!" -ForegroundColor Green
Pause
