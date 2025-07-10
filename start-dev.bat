@echo off
echo Starting PRTU Community Portal...
echo.
echo Compiling server...
call npm run compile-server
if %errorlevel% neq 0 (
    echo Server compilation failed!
    pause
    exit /b 1
)

echo.
echo Starting both frontend and backend servers...
call npm run start:full

pause
