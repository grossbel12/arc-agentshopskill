$ErrorActionPreference = "Continue"

function Keep-Alive {
    param([string]$msg)
    $start = Get-Date
    $errLog = "$PWD\.next\dev\logs\next-development.log"

    while ($true) {
        $now = Get-Date
        if ((Test-Path $errLog) -and ((Get-Item $errLog).LastWriteTime -lt $start.AddMinutes(-1))) {
            Write-Host "[$now] Server may have crashed, restarting..."
            Start-Process node -ArgumentList "node_modules\next\dist\bin\next","dev" -WindowStyle Hidden -PassThru
            $start = $now
        }
        Start-Sleep -Seconds 30
    }
}

$proc = Start-Process node -ArgumentList "node_modules\next\dist\bin\next","dev" -WindowStyle Hidden -PassThru
Write-Host "Started Next.js with PID: $($proc.Id)"

Start-Sleep -Seconds 5

if ($proc.HasExited) {
    Write-Host "Server exited with code: $($proc.ExitCode)"
    exit 1
} else {
    Write-Host "Server running at http://localhost:3000"
    Keep-Alive
}