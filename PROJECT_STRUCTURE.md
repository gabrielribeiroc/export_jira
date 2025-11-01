# Estrutura do Projeto - Jira Export

```
export_jira/
│
├── 📄 README.md                      # Documentação principal
├── 📄 QUICKSTART.md                  # Guia rápido de início
├── 📄 CONTRIBUTING.md                # Guia de contribuição
├── 📄 CHANGELOG.md                   # Histórico de mudanças
├── 📄 LICENSE                        # Licença MIT
├── 📄 PROJECT_STRUCTURE.md           # Este arquivo
│
├── 🔧 .gitignore                     # Arquivos ignorados pelo Git
├── 🐳 docker-compose.yml             # Configuração Docker Compose
│
├── 🚀 start.sh                       # Script de início (Linux/Mac)
├── 🚀 start.bat                      # Script de início (Windows)
├── ✅ check-dependencies.sh          # Verifica dependências (Linux/Mac)
├── ✅ check-dependencies.bat         # Verifica dependências (Windows)
├── 🧪 test-all.sh                    # Executa todos os testes
│
├── 📁 .vscode/                       # Configurações do VS Code
│   ├── settings.json
│   ├── extensions.json
│   └── launch.json
│
├── 📁 backend/                       # Backend Python/Flask
│   ├── 🐍 app.py                     # Aplicação Flask principal
│   ├── 🐍 test_app.py                # Testes do backend
│   ├── 📄 requirements.txt           # Dependências Python
│   ├── 📄 .env.example               # Exemplo de variáveis de ambiente
│   ├── 🐳 Dockerfile                 # Dockerfile do backend
│   └── 📁 venv/                      # Ambiente virtual (criado ao instalar)
│
└── 📁 frontend/                      # Frontend React
    ├── 📄 package.json               # Dependências Node
    ├── 📄 .env.example               # Exemplo de variáveis de ambiente
    ├── 📄 .gitignore                 # Arquivos ignorados
    ├── 🐳 Dockerfile                 # Dockerfile do frontend
    │
    ├── 📁 public/
    │   └── index.html                # HTML principal
    │
    ├── 📁 src/
    │   ├── ⚛️ index.js                # Entry point
    │   ├── 🎨 index.css               # Estilos globais
    │   ├── ⚛️ App.js                  # Componente principal
    │   ├── 🎨 App.css                 # Estilos do App
    │   ├── 🧪 App.test.js             # Testes do App
    │   ├── 🧪 setupTests.js           # Configuração de testes
    │   │
    │   └── 📁 components/
    │       ├── ⚛️ ConnectionForm.js   # Formulário de conexão
    │       ├── 🎨 ConnectionForm.css
    │       ├── ⚛️ TicketsList.js      # Lista de tickets
    │       └── 🎨 TicketsList.css
    │
    └── 📁 node_modules/               # Dependências instaladas
```

## 🎯 Arquivos Principais

### Backend (`/backend`)

| Arquivo | Descrição |
|---------|-----------|
| `app.py` | Aplicação Flask com todos os endpoints |
| `requirements.txt` | Lista de dependências Python |
| `test_app.py` | Testes automatizados |
| `.env.example` | Template de configuração |

**Endpoints Disponíveis:**
- `GET /api/health` - Status da API
- `POST /api/connect` - Conecta ao Jira
- `GET /api/projects` - Lista projetos
- `POST /api/tickets` - Busca tickets
- `POST /api/export/excel` - Exporta para Excel
- `POST /api/export/pdf` - Exporta para PDF

### Frontend (`/frontend`)

| Arquivo | Descrição |
|---------|-----------|
| `src/App.js` | Componente raiz da aplicação |
| `src/components/ConnectionForm.js` | Formulário de login no Jira |
| `src/components/TicketsList.js` | Tabela com tickets e filtros |

**Funcionalidades:**
- Conexão segura com Jira
- Busca em tempo real
- Filtros múltiplos
- Ordenação de colunas
- Exportação Excel/PDF

## 🚀 Scripts Disponíveis

| Script | Plataforma | Descrição |
|--------|-----------|-----------|
| `start.sh` | Linux/Mac | Inicia backend e frontend |
| `start.bat` | Windows | Inicia backend e frontend |
| `check-dependencies.sh` | Linux/Mac | Verifica dependências |
| `check-dependencies.bat` | Windows | Verifica dependências |
| `test-all.sh` | Linux/Mac | Executa todos os testes |

## 📦 Dependências

### Backend (Python)

```
Flask==3.0.0           # Framework web
flask-cors==4.0.0      # CORS
jira==3.5.2            # Cliente Jira
pandas==2.1.4          # Manipulação de dados
openpyxl==3.1.2        # Exportação Excel
reportlab==4.0.7       # Exportação PDF
```

### Frontend (React)

```
react@18.2.0           # Framework UI
axios@1.6.2            # Cliente HTTP
lucide-react@0.298.0   # Ícones
```

## 🔧 Configuração

### Variáveis de Ambiente

**Backend** (`.env`):
```bash
FLASK_ENV=development
FLASK_DEBUG=True
```

**Frontend** (`.env`):
```bash
REACT_APP_API_URL=http://localhost:5000
```

## 🐳 Docker

Execute com Docker:
```bash
docker-compose up
```

## 📚 Documentação

- **README.md** - Documentação completa
- **QUICKSTART.md** - Guia rápido
- **CONTRIBUTING.md** - Como contribuir
- **CHANGELOG.md** - Histórico de versões

## 🎨 Tecnologias Utilizadas

- **Backend**: Python, Flask, Jira API
- **Frontend**: React, Axios, CSS3
- **Exportação**: Pandas, OpenPyXL, ReportLab
- **Deploy**: Docker, Docker Compose

## 📞 Suporte

Para mais informações, consulte:
- [README.md](README.md)
- [QUICKSTART.md](QUICKSTART.md)
- [CONTRIBUTING.md](CONTRIBUTING.md)

---

**Desenvolvido com ❤️ para facilitar a gestão de tickets do Jira**
