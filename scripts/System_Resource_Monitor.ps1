<#
    SysMonitor_Fixed2.ps1
    Professional system resource monitor.
    Displays CPU, RAM, Disk, Network usage.
    Skips adapters that cannot report statistics (virtual adapters, some Wi-Fi).
#>

# CPU usage
function Get-CPUUsage {
    $cpu = Get-CimInstance Win32_Processor | Measure-Object -Property LoadPercentage -Average | Select-Object -ExpandProperty Average
    return [math]::Round($cpu, 1)
}

# RAM usage
function Get-RAMUsage {
    $os = Get-CimInstance Win32_OperatingSystem
    $total = [math]::Round($os.TotalVisibleMemorySize / 1MB, 2)
    $free = [math]::Round($os.FreePhysicalMemory / 1MB, 2)
    $used = [math]::Round($total - $free, 2)
    $percent = [math]::Round(($used / $total) * 100, 1)
    return @{Used=$used; Total=$total; Percent=$percent}
}

# Disk usage
function Get-DiskUsage {
    $disks = Get-CimInstance Win32_LogicalDisk -Filter "DriveType=3"
    $diskInfo = @()
    foreach ($disk in $disks) {
        $total = [math]::Round($disk.Size / 1GB, 2)
        $free = [math]::Round($disk.FreeSpace / 1GB, 2)
        $used = [math]::Round($total - $free, 2)
        $percent = [math]::Round(($used / $total) * 100, 1)
        $diskInfo += [PSCustomObject]@{
            Name = $disk.DeviceID
            Used = $used
            Total = $total
            Percent = $percent
        }
    }
    return $diskInfo
}

# Network usage
function Get-NetworkUsage {
    # Filter out virtual adapters and loopback
    $adapters = Get-NetAdapter | Where-Object {
        $_.Status -eq "Up" -and 
        $_.HardwareInterface -eq $true -and 
        $_.Virtual -eq $false
    }
    $netInfo = @()
    foreach ($adapter in $adapters) {
        try {
            $stats = Get-NetAdapterStatistics -Name $adapter.Name
            $netInfo += [PSCustomObject]@{
                Adapter = $adapter.Name
                ReceivedMB = [math]::Round($stats.ReceivedBytes / 1MB, 2)
                SentMB = [math]::Round($stats.SentBytes / 1MB, 2)
            }
        } catch {
            Write-Host "Skipping adapter '$($adapter.Name)' (statistics not available)" -ForegroundColor Yellow
        }
    }
    return $netInfo
}

# Main loop
while ($true) {
    Clear-Host
    Write-Host "===============================" -ForegroundColor Cyan
    Write-Host "     SYSTEM RESOURCE MONITOR    " -ForegroundColor Cyan
    Write-Host "===============================" -ForegroundColor Cyan
    Write-Host ""

    # CPU
    $cpu = Get-CPUUsage
    Write-Host "CPU Usage     : $cpu%" -ForegroundColor Green

    # RAM
    $ram = Get-RAMUsage
    Write-Host "RAM Usage     : $($ram.Used) GB / $($ram.Total) GB ($($ram.Percent)%)" -ForegroundColor Green

    # Disk
    Write-Host "`nDisk Usage:" -ForegroundColor Yellow
    Get-DiskUsage | ForEach-Object {
        Write-Host "  $_.Name : $($_.Used) GB / $($_.Total) GB ($($_.Percent)%)"
    }

    # Network
    Write-Host "`nNetwork Usage (Total Received/Sent MB):" -ForegroundColor Yellow
    $networkStats = Get-NetworkUsage
    if ($networkStats.Count -eq 0) {
        Write-Host "  No usable network adapter statistics available." -ForegroundColor Red
    } else {
        $networkStats | ForEach-Object {
            Write-Host "  $_.Adapter : Received=$($_.ReceivedMB) MB, Sent=$($_.SentMB) MB"
        }
    }

    Write-Host "`nPress Ctrl+C to exit..." -ForegroundColor Magenta
    Start-Sleep -Seconds 3
}
