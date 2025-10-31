@echo off
echo ======================================
echo   Jira Export - Iniciando Aplicacao
echo ======================================
echo.

REM Verificar se Python esta instalado
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERRO] Python nao encontrado. Por favor, instale o Python 3.8+
    pause
    exit /b 1
)

REM Verificar se Node esta instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERRO] Node.js nao encontrado. Por favor, instale o Node.js 14+
    pause
    exit /b 1
)

echo [INFO] Instalando dependencias do backend...
cd backend
if not exist "venv" (
    python -m venv venv
)
call venv\Scripts\activate.bat
pip install -q -r requirements.txt
echo [OK] Dependencias do backend instaladas
echo.

echo [INFO] Instalando dependencias do frontend...
cd ..\frontend
if not exist "node_modules" (
    call npm install --silent
)
echo [OK] Dependencias do frontend instaladas
echo.

REM Criar arquivo .env se nao existir
if not exist ".env" (
    copy .env.example .env
)

cd ..

echo [INFO] Iniciando servidores...
echo.
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Pressione Ctrl+C para parar os servidores
echo.

REM Iniciar backend
start "Jira Export - Backend" cmd /k "cd backend && venv\Scripts\activate.bat && python app.py"

REM Aguardar backend iniciar
timeout /t 3 /nobreak >nul

REM Iniciar frontend
start "Jira Export - Frontend" cmd /k "cd frontend && npm start"

echo.
echo [OK] Servidores iniciados!
echo.
pause
