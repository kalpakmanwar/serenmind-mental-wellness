@echo off
echo ================================================
echo ▶️  STARTING SERENMIND BACKEND
echo ================================================
echo.

REM Set JAVA_HOME temporarily (no admin needed!)
set "JAVA_HOME=C:\Program Files\Java\jdk-17.0.2"
set "PATH=%JAVA_HOME%\bin;%PATH%"

echo ✅ Java configured: %JAVA_HOME%
echo.

REM Verify Java works
echo 🔍 Verifying Java...
java -version
echo.

echo 🛑 Stopping old backend (if running)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080') do (
    echo    Killing PID: %%a
    taskkill /PID %%a /F 2>nul
)
echo ✅ Ready to start fresh
echo.

echo 🗄️ Checking MySQL...
net start MySQL80 2>nul
if %errorlevel% equ 0 (
    echo ✅ MySQL started
) else (
    echo ✅ MySQL already running
)
echo.

echo 🚀 Starting Backend...
echo ⏳ Please wait 30-60 seconds...
echo.
echo 📝 Watch for this message:
echo    "Started SerenMindApplication in X.XXX seconds"
echo.
echo ================================================

cd backend
call mvnw.cmd spring-boot:run -Dmaven.test.skip=true

pause

