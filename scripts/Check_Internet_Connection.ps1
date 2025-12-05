<#
    Internet_Check.ps1
    Professional Internet Connectivity & Diagnostics Tool
    Includes local, DNS, gateway, and multi‑source global + Malaysia checks.
#>

function Write-Status($label, $status) {
    if ($status -eq "OK") {
        Write-Host ("[ OK ] " + $label) -ForegroundColor Green
    } elseif ($status -eq "FAIL") {
        Write-Host ("[FAIL] " + $label) -ForegroundColor Red
    } else {
        Write-Host ("[INFO] " + $label) -ForegroundColor Yellow
    }
}

Clear-Host
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "        INTERNET DIAGNOSTIC TOOL      " -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Local Network Check
Write-Host "Checking Local Network..." -ForegroundColor Yellow
try {
    $gateway = (Get-NetRoute -DestinationPrefix "0.0.0.0/0").NextHop
    Write-Status "Default Gateway: $gateway" "OK"
} catch {
    Write-Status "Default Gateway Not Found" "FAIL"
}

# DNS Check
Write-Host "`nChecking DNS..." -ForegroundColor Yellow
$dnsServers = Get-DnsClientServerAddress | Select-Object -ExpandProperty ServerAddresses -Unique
if ($dnsServers) {
    foreach ($dns in $dnsServers) {
        Write-Status "DNS Server: $dns" "OK"
    }
} else {
    Write-Status "No DNS servers found" "FAIL"
}

# Public IP API sources
$publicAPIs = @(
    "https://api.ipify.org",
    "https://ifconfig.me/ip",
    "https://ipinfo.io/ip",
    "https://checkip.amazonaws.com"
)

Write-Host "`nChecking Internet Access..." -ForegroundColor Yellow
$internetOK = $false
$publicip = $null

foreach ($api in $publicAPIs) {
    try {
        $ip = Invoke-RestMethod -Uri $api -UseBasicParsing -TimeoutSec 4
        if ($ip) {
            $publicip = $ip
            $internetOK = $true
            Write-Status "Public IP: $ip (via: $api)" "OK"
            break
        }
    } catch {}
}

if (-not $internetOK) {
    Write-Status "Unable to detect public IP — Possible DNS/Connection Issue" "FAIL"
}

# Latency Tests
Write-Host "`nLatency Testing..." -ForegroundColor Yellow

$pingTargets = @{
    "Google DNS (8.8.8.8)" = "8.8.8.8"
    "Cloudflare DNS (1.1.1.1)" = "1.1.1.1"
    "TM Malaysia DNS (202.188.0.133)" = "202.188.0.133"
    "MyIX Malaysia Gateway" = "103.26.47.1"
}

foreach ($target in $pingTargets.Keys) {
    try {
        $r = Test-Connection -ComputerName $pingTargets[$target] -Count 1 -Quiet
        if ($r) {
            $lat = (Test-Connection -ComputerName $pingTargets[$target] -Count 1).ResponseTime
            Write-Status "$target : ${lat}ms" "OK"
        } else {
            Write-Status "$target Unreachable" "FAIL"
        }
    } catch {
        Write-Status "$target Failed" "FAIL"
    }
}

# HTTPS Website Reachability Test (Trusted Sites)
Write-Host "`nWebsite Reachability..." -ForegroundColor Yellow
$sites = @(
    "https://www.google.com",
    "https://www.youtube.com",
    "https://www.tm.com.my",
    "https://www.myix.net.my"
)

foreach ($site in $sites) {
    try {
        $response = Invoke-WebRequest -Uri $site -UseBasicParsing -TimeoutSec 4
        if ($response.StatusCode -eq 200) {
            Write-Status "$site" "OK"
        } else {
            Write-Status "$site ($($response.StatusCode))" "FAIL"
        }
    } catch {
        Write-Status "$site Unreachable" "FAIL"
    }
}

Write-Host "`n======================================" -ForegroundColor Cyan
Write-Host "Diagnostics Completed" -ForegroundColor Cyan
Write-Host "Press any key to exit..." -ForegroundColor Magenta
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

