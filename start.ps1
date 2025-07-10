# PowerShell script to start PRTU servers
Write-Host "Starting PRTU Community Portal..." -ForegroundColor Green
Write-Host ""

# Check if Node.js is available
try {
    $nodeVersion = node --version
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Yellow
} catch {
    Write-Host "ERROR: Node.js is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "[1/3] Installing dependencies..." -ForegroundColor Cyan
npm install

# Start backend server
Write-Host "[2/3] Starting backend server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; node server-js.js"

# Wait a bit for backend to start
Start-Sleep -Seconds 3

# Start frontend server
Write-Host "[3/3] Starting frontend server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev"

Write-Host ""
Write-Host "✅ Both servers are starting!" -ForegroundColor Green
Write-Host "📊 Backend: http://localhost:5000" -ForegroundColor Blue
Write-Host "🌐 Frontend: http://localhost:5173" -ForegroundColor Blue
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
