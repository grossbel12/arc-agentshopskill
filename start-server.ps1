$ErrorActionPreference = "Stop"
$projectDir = "C:\Users\User\Arc Marketplace AI\agentshop"

$proc = Start-Process -FilePath "node" -ArgumentList "node_modules\next\dist\bin\next", "dev" -WorkingDirectory $projectDir -PassThru -WindowStyle Hidden

Write-Host "Started Next.js with PID: $($proc.Id)"
Write-Host "Server should be running at http://localhost:3000"

# Wait and keep alive
Start-Sleep -Seconds 3600