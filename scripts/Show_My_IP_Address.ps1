<#
    ShowIP.ps1
    Displays local and public IP addresses.
    Keeps PowerShell window open until user closes it.
#>

Write-Host "==============================" -ForegroundColor Cyan
Write-Host "        IP Address Info       " -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan
Write-Host ""

# --- Local IP Addresses ---
Write-Host "Local IP Addresses:" -ForegroundColor Green
try {
    $localIPs = Get-NetIPAddress -AddressFamily IPv4 | Where-Object {
        $_.IPAddress -notlike "169.254.*" -and $_.IPAddress -ne "127.0.0.1"
    }
    if ($localIPs.Count -eq 0) {
        Write-Host "No local IP addresses found."
    } else {
        $localIPs | ForEach-Object {
            Write-Host "$($_.InterfaceAlias) : $($_.IPAddress)"
        }
    }
} catch {
    Write-Host "Unable to retrieve local IPs." -ForegroundColor Red
}

Write-Host "`nPublic IP Addresses:" -ForegroundColor Green

# --- Public IP using multiple trusted sources ---
$publicAPIs = @(
    "https://api.ipify.org",
    "https://ipinfo.io/ip",
    "https://ifconfig.me/ip",
    "https://checkip.amazonaws.com"
)

$publicIPs = @()

foreach ($api in $publicAPIs) {
    try {
        $ip = Invoke-RestMethod -Uri $api -UseBasicParsing -TimeoutSec 5
        if ($ip -and -not $publicIPs.Contains($ip)) {
            $publicIPs += $ip
        }
    } catch {
        Write-Host "Failed to get IP from $api" -ForegroundColor Yellow
    }
}

if ($publicIPs.Count -eq 0) {
    Write-Host "Unable to fetch public IP from all sources." -ForegroundColor Red
} else {
    $publicIPs | ForEach-Object { Write-Host $_ }
}

Write-Host "`nPress any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
