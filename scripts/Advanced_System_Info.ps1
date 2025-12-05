function Write-Header($title) {
    Write-Host "======================================" -ForegroundColor Cyan
    Write-Host $title -ForegroundColor Cyan
    Write-Host "======================================" -ForegroundColor Cyan
}

Clear-Host
Write-Header "ADVANCED SYSTEM INFORMATION"

# --- OS Information ---
Write-Host "`n[OS INFORMATION]" -ForegroundColor Yellow
try {
    $os = Get-CimInstance Win32_OperatingSystem
    Write-Host "Name        : $($os.Caption)"
    Write-Host "Version     : $($os.Version)"
    Write-Host "Build       : $($os.BuildNumber)"
    Write-Host "Architecture: $($os.OSArchitecture)"
    Write-Host "Install Date: $([Management.ManagementDateTimeConverter]::ToDateTime($os.InstallDate))"
    Write-Host "Last Boot   : $([Management.ManagementDateTimeConverter]::ToDateTime($os.LastBootUpTime))"
} catch {
    Write-Host "Failed to retrieve OS info" -ForegroundColor Red
}

# --- CPU Information ---
Write-Host "`n[CPU INFORMATION]" -ForegroundColor Yellow
try {
    $cpu = Get-CimInstance Win32_Processor
    foreach ($c in $cpu) {
        Write-Host "Name          : $($c.Name)"
        Write-Host "Cores         : $($c.NumberOfCores)"
        Write-Host "LogicalProc   : $($c.NumberOfLogicalProcessors)"
        Write-Host "Max Clock     : $($c.MaxClockSpeed) MHz"
        Write-Host "Manufacturer  : $($c.Manufacturer)`n"
    }
} catch {
    Write-Host "Failed to retrieve CPU info" -ForegroundColor Red
}

# --- RAM Information ---
Write-Host "`n[RAM INFORMATION]" -ForegroundColor Yellow
try {
    $mem = Get-CimInstance Win32_PhysicalMemory
    $totalRAM = 0
    foreach ($m in $mem) {
        Write-Host "Capacity : $([math]::Round($m.Capacity/1GB,2)) GB | Speed: $($m.Speed) MHz | Manufacturer: $($m.Manufacturer)"
        $totalRAM += $m.Capacity
    }
    Write-Host "Total Installed RAM: $([math]::Round($totalRAM/1GB,2)) GB"
} catch {
    Write-Host "Failed to retrieve RAM info" -ForegroundColor Red
}

# --- GPU Information ---
Write-Host "`n[GPU INFORMATION]" -ForegroundColor Yellow
try {
    $gpu = Get-CimInstance Win32_VideoController
    foreach ($g in $gpu) {
        Write-Host "Name       : $($g.Name)"
        Write-Host "Driver     : $($g.DriverVersion)"
        Write-Host "RAM        : $([math]::Round($g.AdapterRAM/1MB)) MB"
        Write-Host "Status     : $($g.Status)`n"
    }
} catch {
    Write-Host "Failed to retrieve GPU info" -ForegroundColor Red
}

# --- Disk Information ---
Write-Host "`n[DISK INFORMATION]" -ForegroundColor Yellow
try {
    $disks = Get-CimInstance Win32_LogicalDisk -Filter "DriveType=3"
    foreach ($d in $disks) {
        $total = [math]::Round($d.Size/1GB,2)
        $free = [math]::Round($d.FreeSpace/1GB,2)
        $used = $total - $free
        $percent = [math]::Round(($used/$total)*100,1)
        Write-Host "Drive $($d.DeviceID) : $used GB / $total GB used ($percent%)"
    }
} catch {
    Write-Host "Failed to retrieve disk info" -ForegroundColor Red
}

# --- Network Adapter Information ---
Write-Host "`n[NETWORK ADAPTERS]" -ForegroundColor Yellow
try {
    $adapters = Get-NetAdapter | Where-Object {$_.Status -eq "Up"}
    foreach ($a in $adapters) {
        Write-Host "Name       : $($a.Name)"
        Write-Host "Interface  : $($a.InterfaceDescription)"
        Write-Host "MAC Address: $($a.MacAddress)"
        $ip = (Get-NetIPAddress -InterfaceIndex $a.ifIndex -AddressFamily IPv4).IPAddress
        if ($ip) { Write-Host "IP Address : $($ip -join ', ')" } else { Write-Host "IP Address : N/A" }
        Write-Host ""
    }
} catch {
    Write-Host "Failed to retrieve network info" -ForegroundColor Red
}

# --- Computer Information ---
Write-Host "`n[COMPUTER INFO]" -ForegroundColor Yellow
try {
    $comp = Get-CimInstance Win32_ComputerSystem
    Write-Host "Manufacturer: $($comp.Manufacturer)"
    Write-Host "Model       : $($comp.Model)"
    Write-Host "Domain      : $($comp.Domain)"
    Write-Host "User Name   : $($comp.UserName)"
} catch {
    Write-Host "Failed to retrieve computer info" -ForegroundColor Red
}

Write-Host "`n======================================" -ForegroundColor Cyan
Write-Host "Advanced System Information Completed" -ForegroundColor Cyan
Write-Host "Press any key to exit..." -ForegroundColor Magenta
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")