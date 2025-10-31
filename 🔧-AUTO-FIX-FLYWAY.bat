@echo off
echo ================================================
echo    FIXING FLYWAY CHECKSUM MISMATCH
echo ================================================
echo.

echo Updating database checksum...
mysql -u root -proot -e "USE serenmind_db; UPDATE flyway_schema_history SET checksum = -1748013652 WHERE version = '2';"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ================================================
    echo    FIXED! Checksum updated successfully
    echo ================================================
    echo.
    echo Now starting backend...
    echo.
    cd backend
    set JAVA_HOME=C:\Program Files\Java\jdk-17.0.2
    call mvnw.cmd spring-boot:run "-Dmaven.test.skip=true"
) else (
    echo.
    echo ================================================
    echo    ERROR: Could not connect to MySQL
    echo ================================================
    echo.
    echo Please use MySQL Workbench instead:
    echo 1. Open MySQL Workbench
    echo 2. Run this query:
    echo.
    echo    USE serenmind_db;
    echo    UPDATE flyway_schema_history SET checksum = -1748013652 WHERE version = '2';
    echo.
    echo 3. Then run: START-BACKEND-NOW.bat
    echo.
    pause
)

