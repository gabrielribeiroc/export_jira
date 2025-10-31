@echo off
setlocal enabledelayedexpansion

echo ================================================
echo   Verificando Dependencias - Jira Export
echo ================================================
echo.

set all_ok=1

REM Verificar Python
echo Verificando Python...
python --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=2" %%i in ('python --version 2^>^&1') do set python_version=%%i
    echo [OK] Instalado ^(versao !python_version!^)
) else (
    echo [ERRO] Nao instalado
    echo   Instale em: https://www.python.org/downloads/
    set all_ok=0
)

REM Verificar pip
echo Verificando pip...
pip --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Instalado
) else (
    echo [ERRO] Nao instalado
    set all_ok=0
)

REM Verificar Node.js
echo Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=1" %%i in ('node --version') do set node_version=%%i
    echo [OK] Instalado ^(versao !node_version!^)
) else (
    echo [ERRO] Nao instalado
    echo   Instale em: https://nodejs.org/
    set all_ok=0
)

REM Verificar npm
echo Verificando npm...
npm --version >nul 2>&1
if %errorlevel% equ 0 (
    for /f "tokens=1" %%i in ('npm --version') do set npm_version=%%i
    echo [OK] Instalado ^(versao !npm_version!^)
) else (
    echo [ERRO] Nao instalado
    set all_ok=0
)

REM Verificar git
echo Verificando git...
git --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Instalado ^(opcional^)
) else (
    echo [AVISO] Nao instalado ^(opcional^)
)

REM Verificar Docker
echo Verificando Docker...
docker --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Instalado ^(opcional^)
) else (
    echo [AVISO] Nao instalado ^(opcional^)
)

echo.
echo ================================================

if %all_ok% equ 1 (
    echo [OK] Todas as dependencias necessarias estao instaladas!
    echo.
    echo Proximos passos:
    echo   1. Execute: start.bat
    echo   2. Ou leia: QUICKSTART.md
) else (
    echo [ERRO] Algumas dependencias estao faltando.
    echo.
    echo Instale as dependencias faltantes e execute este script novamente.
)

echo ================================================
echo.
pause
