@echo off
title CollegeBase - Local Dev Server
echo ============================================
echo   CollegeBase - Starting local environment
echo ============================================
echo.

:: Check Python
where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Python not found. Install it from https://python.org
    pause
    exit /b 1
)

:: Check Node
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js not found. Install it from https://nodejs.org
    pause
    exit /b 1
)

:: Install Python dependencies if needed
echo [1/4] Checking Python dependencies...
pip install -q -r requirements.txt

:: Ensure frontend .env exists
if not exist "collegebase-frontend\.env" (
    echo VITE_API_URL=http://127.0.0.1:8000> "collegebase-frontend\.env"
)

:: Install Node dependencies if needed
echo [2/4] Checking Node dependencies...
cd collegebase-frontend
if not exist node_modules (
    echo       Installing npm packages...
    call npm install
)
cd ..

:: Start the API server in the background
echo [3/4] Starting API server on http://localhost:8000 ...
start "CollegeBase API" cmd /c "python -m uvicorn main:app --reload --port 8000"

:: Give the API a moment to boot
timeout /t 2 /nobreak >nul

:: Start the frontend dev server
echo [4/4] Starting frontend on http://localhost:5173 ...
echo.
echo ============================================
echo   API:      http://localhost:8000/docs
echo   Frontend: http://localhost:5173
echo ============================================
echo.
echo Close this window to stop the frontend.
echo Close the other window to stop the API.
echo.

cd collegebase-frontend
call npx vite --open
