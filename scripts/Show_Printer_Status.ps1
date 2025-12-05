<#
    PrintersStatus.ps1
    Lists all printers on the system and shows their status.
    Highlights printers with Normal status.
#>

# --- Clear console and header ---
Clear-Host
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "        PRINTER STATUS REPORT         " -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

try {
    # Get all installed printers
    $printers = Get-Printer | Select-Object Name, PrinterStatus

    if ($printers.Count -eq 0) {
        Write-Host "No printers found on this system!" -ForegroundColor Red
    } else {
        foreach ($p in $printers) {
            $statusColor = switch ($p.PrinterStatus) {
                "Normal" { "Green" }
                "Offline" { "Yellow" }
                "Error" { "Red" }
                default { "Gray" }
            }
            Write-Host "Printer: $($p.Name) | Status: $($p.PrinterStatus)" -ForegroundColor $statusColor
        }

        # Optional: show only Normal printers
        $normalPrinters = $printers | Where-Object { $_.PrinterStatus -eq "Normal" }
        Write-Host "`nPrinters with Status 'Normal':" -ForegroundColor Cyan
        foreach ($np in $normalPrinters) {
            Write-Host " - $($np.Name)" -ForegroundColor Green
        }
    }
} catch {
    Write-Host "❌ Failed to retrieve printer information: $_" -ForegroundColor Red
}

# Pause so window does not close
Write-Host "`nPress Enter to exit..." -ForegroundColor Magenta
Read-Host
