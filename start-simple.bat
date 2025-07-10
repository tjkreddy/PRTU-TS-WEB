@echo off
echo Starting PRTU Community Portal (Simple Version)...
echo.

echo [1/3] Installing dependencies...
call npm install

echo.
echo [2/3] Starting backend server (JavaScript version)...
start "PRTU Backend" cmd /k "node server-js.js"

echo.
echo [3/3] Starting frontend server...
timeout /t 3 > nul
start "PRTU Frontend" cmd /k "npm run dev"

echo.
echo ✅ Both servers are starting!
echo 📊 Backend: http://localhost:5000
echo 🌐 Frontend: http://localhost:5173
echo.
echo Press any key to exit...
pause > nul
