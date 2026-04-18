@echo off
cd /d "%~dp0"
start /b node node_modules\next\dist\bin\next dev
echo Server started
timeout /t 3600