@echo off
echo Starting PRTU Community Portal (Test Version)...
echo.

echo [1/3] Installing dependencies...
call npm install

echo.
echo [2/3] Starting TEST backend server...
start "PRTU Test Backend" cmd /k "node test-server.js"

echo.
echo [3/3] Starting frontend server...
timeout /t 5 > nul
start "PRTU Frontend" cmd /k "npm run dev"

echo.
echo ✅ Both servers are starting!
echo 📊 Backend: http://localhost:5000
echo 🌐 Frontend: http://localhost:5173
echo.
echo 🧪 NOTE: This is using a test server without MongoDB
echo    Comments will not persist between sessions
echo.
echo Press any key to exit...
pause > nul
