#!/bin/bash

# Script para verificar depend?ncias necess?rias

echo "================================================"
echo "  Verificando Depend?ncias - Jira Export"
echo "================================================"
echo ""

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

all_ok=true

# Verificar Python
echo -n "Verificando Python... "
if command -v python3 &> /dev/null; then
    python_version=$(python3 --version | cut -d ' ' -f 2)
    echo -e "${GREEN}? Instalado (vers?o $python_version)${NC}"
    
    # Verificar se ? 3.8+
    major=$(echo $python_version | cut -d '.' -f 1)
    minor=$(echo $python_version | cut -d '.' -f 2)
    
    if [ "$major" -ge 3 ] && [ "$minor" -ge 8 ]; then
        echo -e "  ${GREEN}? Vers?o adequada (3.8+)${NC}"
    else
        echo -e "  ${YELLOW}? Vers?o antiga. Recomendado: 3.8+${NC}"
    fi
else
    echo -e "${RED}? N?o instalado${NC}"
    echo -e "  ${YELLOW}Instale em: https://www.python.org/downloads/${NC}"
    all_ok=false
fi

# Verificar pip
echo -n "Verificando pip... "
if command -v pip3 &> /dev/null; then
    pip_version=$(pip3 --version | cut -d ' ' -f 2)
    echo -e "${GREEN}? Instalado (vers?o $pip_version)${NC}"
else
    echo -e "${RED}? N?o instalado${NC}"
    all_ok=false
fi

# Verificar Node.js
echo -n "Verificando Node.js... "
if command -v node &> /dev/null; then
    node_version=$(node --version | cut -d 'v' -f 2)
    echo -e "${GREEN}? Instalado (vers?o $node_version)${NC}"
    
    # Verificar se ? 14+
    major=$(echo $node_version | cut -d '.' -f 1)
    
    if [ "$major" -ge 14 ]; then
        echo -e "  ${GREEN}? Vers?o adequada (14+)${NC}"
    else
        echo -e "  ${YELLOW}? Vers?o antiga. Recomendado: 14+${NC}"
    fi
else
    echo -e "${RED}? N?o instalado${NC}"
    echo -e "  ${YELLOW}Instale em: https://nodejs.org/${NC}"
    all_ok=false
fi

# Verificar npm
echo -n "Verificando npm... "
if command -v npm &> /dev/null; then
    npm_version=$(npm --version)
    echo -e "${GREEN}? Instalado (vers?o $npm_version)${NC}"
else
    echo -e "${RED}? N?o instalado${NC}"
    all_ok=false
fi

# Verificar git
echo -n "Verificando git... "
if command -v git &> /dev/null; then
    git_version=$(git --version | cut -d ' ' -f 3)
    echo -e "${GREEN}? Instalado (vers?o $git_version)${NC}"
else
    echo -e "${YELLOW}? N?o instalado (opcional)${NC}"
fi

# Verificar Docker (opcional)
echo -n "Verificando Docker... "
if command -v docker &> /dev/null; then
    docker_version=$(docker --version | cut -d ' ' -f 3 | tr -d ',')
    echo -e "${GREEN}? Instalado (vers?o $docker_version)${NC}"
else
    echo -e "${YELLOW}? N?o instalado (opcional)${NC}"
fi

# Verificar docker-compose (opcional)
echo -n "Verificando Docker Compose... "
if command -v docker-compose &> /dev/null; then
    compose_version=$(docker-compose --version | cut -d ' ' -f 3 | tr -d ',')
    echo -e "${GREEN}? Instalado (vers?o $compose_version)${NC}"
else
    echo -e "${YELLOW}? N?o instalado (opcional)${NC}"
fi

echo ""
echo "================================================"

if [ "$all_ok" = true ]; then
    echo -e "${GREEN}? Todas as depend?ncias necess?rias est?o instaladas!${NC}"
    echo ""
    echo "Pr?ximos passos:"
    echo "  1. Execute: ./start.sh"
    echo "  2. Ou leia: QUICKSTART.md"
else
    echo -e "${RED}? Algumas depend?ncias est?o faltando.${NC}"
    echo ""
    echo "Instale as depend?ncias faltantes e execute este script novamente."
fi

echo "================================================"
