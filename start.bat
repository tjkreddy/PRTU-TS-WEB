@echo off
echo Starting PRTU Community Portal...
echo.

echo [1/3] Installing dependencies...
call npm install

echo.
echo [2/3] Starting backend server...
start "PRTU Backend" cmd /k "npx ts-node --project tsconfig.server.json server/server.ts"

echo.
echo [3/3] Starting frontend server...
timeout /t 5 > nul
start "PRTU Frontend" cmd /k "npm run dev"

echo.
echo ✅ Both servers are starting!
echo 📊 Backend: http://localhost:5000
echo 🌐 Frontend: http://localhost:5173
echo.
echo Press any key to exit...
pause > nul
