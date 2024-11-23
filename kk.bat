::use cmd for run bat file
@echo off
echo Starting frontend...
cd frontend
start cmd /k "npm run dev"

echo Starting backend...
cd ../backend
start cmd /k "nodemon"

echo Both frontend and backend are now running!
pause

@echo off
@REM echo Starting frontend...
@REM cd frontend
@REM npm run dev
@REM cd ..

@REM echo Starting backend...
@REM cd backend
@REM npm run dev
@REM cd ..

@REM echo Both frontend and backend are running!
@REM pause
