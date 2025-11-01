#!/bin/bash

echo "================================================"
echo "  Executando Todos os Testes - Jira Export"
echo "================================================"
echo ""

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

all_passed=true

# Testar Backend
echo -e "${BLUE}Testando Backend...${NC}"
cd backend
source venv/bin/activate 2>/dev/null || true
python test_app.py
backend_result=$?

if [ $backend_result -eq 0 ]; then
    echo -e "${GREEN}? Testes do backend passaram${NC}"
else
    echo -e "${RED}? Testes do backend falharam${NC}"
    all_passed=false
fi

echo ""

# Testar Frontend
echo -e "${BLUE}Testando Frontend...${NC}"
cd ../frontend
npm test -- --watchAll=false --passWithNoTests 2>/dev/null
frontend_result=$?

if [ $frontend_result -eq 0 ]; then
    echo -e "${GREEN}? Testes do frontend passaram${NC}"
else
    echo -e "${RED}? Testes do frontend falharam${NC}"
    all_passed=false
fi

echo ""
echo "================================================"

if [ "$all_passed" = true ]; then
    echo -e "${GREEN}? Todos os testes passaram!${NC}"
    exit 0
else
    echo -e "${RED}? Alguns testes falharam${NC}"
    exit 1
fi
