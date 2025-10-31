#!/bin/bash

echo "======================================"
echo "  Jira Export - Iniciando Aplica??o  "
echo "======================================"
echo ""

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar se Python est? instalado
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}? Python3 n?o encontrado. Por favor, instale o Python 3.8+${NC}"
    exit 1
fi

# Verificar se Node est? instalado
if ! command -v node &> /dev/null; then
    echo -e "${RED}? Node.js n?o encontrado. Por favor, instale o Node.js 14+${NC}"
    exit 1
fi

echo -e "${BLUE}?? Instalando depend?ncias do backend...${NC}"
cd backend
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate
pip install -q -r requirements.txt
echo -e "${GREEN}? Depend?ncias do backend instaladas${NC}"
echo ""

echo -e "${BLUE}?? Instalando depend?ncias do frontend...${NC}"
cd ../frontend
if [ ! -d "node_modules" ]; then
    npm install --silent
fi
echo -e "${GREEN}? Depend?ncias do frontend instaladas${NC}"
echo ""

# Criar arquivo .env se n?o existir
if [ ! -f ".env" ]; then
    cp .env.example .env
fi

cd ..

echo -e "${GREEN}?? Iniciando servidores...${NC}"
echo ""
echo -e "${BLUE}Backend:${NC} http://localhost:5000"
echo -e "${BLUE}Frontend:${NC} http://localhost:3000"
echo ""
echo -e "Pressione ${RED}Ctrl+C${NC} para parar os servidores"
echo ""

# Iniciar backend em background
cd backend
source venv/bin/activate
python app.py &
BACKEND_PID=$!

# Aguardar backend iniciar
sleep 3

# Iniciar frontend
cd ../frontend
npm start &
FRONTEND_PID=$!

# Aguardar e capturar Ctrl+C
trap "echo ''; echo 'Parando servidores...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT

wait
