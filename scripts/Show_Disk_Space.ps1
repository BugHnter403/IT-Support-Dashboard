<#
    AdvancedDiskSpace_Fixed.ps1
    Displays detailed disk space information for all drives.
    Safely calculates folder sizes.
    Keeps window open until user presses a key.
#>

function Write-Header($title) {
    Write-Host "======================================" -ForegroundColor Cyan
    Write-Host $title -ForegroundColor Cyan
    Write-Host "======================================" -ForegroundColor Cyan
}

Clear-Host
Write-Header "ADVANCED DISK SPACE REPORT"

try {
    $drives = Get-CimInstance Win32_LogicalDisk -Filter "DriveType=3"  # Local disks only
    if ($drives.Count -eq 0) {
        Write-Host "No local drives found!" -ForegroundColor Red
    } else {
        foreach ($d in $drives) {
            $totalGB = [math]::Round($d.Size/1GB,2)
            $freeGB = [math]::Round($d.FreeSpace/1GB,2)
            $usedGB = $totalGB - $freeGB
            $percentUsed = [math]::Round(($usedGB/$totalGB)*100,1)

            if ($percentUsed -ge 90) { $color = "Red" }
            elseif ($percentUsed -ge 70) { $color = "Yellow" }
            else { $color = "Green" }

            Write-Host "`nDrive $($d.DeviceID) ($($d.VolumeName))" -ForegroundColor Cyan
            Write-Host ("  Total Size : {0} GB" -f $totalGB)
            Write-Host ("  Used Space : {0} GB" -f $usedGB)
            Write-Host ("  Free Space : {0} GB" -f $freeGB)
            Write-Host ("  Usage      : {0}%" -f $percentUsed) -ForegroundColor $color
        }
    }
} catch {
    Write-Host "❌ Failed to retrieve disk information: $_" -ForegroundColor Red
}

# --- Optional: Top 5 largest folders on C: ---
Write-Host "`n[Top 5 Largest Folders on C:]" -ForegroundColor Yellow
try {
    $folders = Get-ChildItem C:\ -Directory -ErrorAction SilentlyContinue
    $folderSizes = @()
    foreach ($f in $folders) {
        try {
            # Only sum file sizes, ignore subfolders without Length
            $size = (Get-ChildItem $f.FullName -Recurse -File -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum
            $folderSizes += [PSCustomObject]@{ Name=$f.FullName; SizeGB=[math]::Round($size/1GB,2) }
        } catch { continue }
    }
    $folderSizes | Sort-Object SizeGB -Descending | Select-Object -First 5 | ForEach-Object {
        Write-Host ("• {0} - {1} GB" -f $_.Name, $_.SizeGB)
    }
} catch {
    Write-Host "⚠ Failed to calculate folder sizes" -ForegroundColor Yellow
}

Write-Host "`n======================================" -ForegroundColor Cyan
Write-Host "Press any key to exit..." -ForegroundColor Magenta
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
