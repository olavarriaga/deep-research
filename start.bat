@echo off
echo Starting Deep Research Application...

:: Check if Node.js is installed
where node >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Node.js is not installed! Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

:: Check if npm packages are installed
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
    if %ERRORLEVEL% neq 0 (
        echo Failed to install dependencies!
        pause
        exit /b 1
    )
)

:: Check if .env.local exists, create if not
if not exist ".env.local" (
    echo Creating .env.local file...
    copy .env.example .env.local >nul 2>&1
    if %ERRORLEVEL% neq 0 (
        echo Warning: Could not create .env.local file. You may need to set up your environment variables manually.
    )
)

:: Start the development server
echo Starting development server...
call npm run dev

:: If the server fails to start
if %ERRORLEVEL% neq 0 (
    echo Failed to start the development server!
    pause
    exit /b 1
)

pause 