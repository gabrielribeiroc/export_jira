# Jira Export - Extra??o e Organiza??o de Tickets

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Python](https://img.shields.io/badge/python-3.8+-green.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

Uma aplica??o web completa para extrair, visualizar, organizar e exportar tickets do Jira para Excel ou PDF.

## ?? Funcionalidades

- ? **Conex?o segura com Jira** - Conecte-se usando suas credenciais Atlassian
- ?? **Busca avan?ada** - Pesquise por key, resumo ou descri??o
- ?? **Filtros m?ltiplos** - Filtre por projeto, status e prioridade
- ?? **Ordena??o inteligente** - Ordene por qualquer coluna
- ?? **Visualiza??o em tabela** - Interface moderna e responsiva
- ?? **Exporta??o Excel** - Exporte para planilhas Excel (.xlsx)
- ?? **Exporta??o PDF** - Gere relat?rios em PDF
- ?? **Interface moderna** - Design clean e intuitivo

## ?? Pr?-requisitos

### Backend
- Python 3.8 ou superior
- pip (gerenciador de pacotes Python)

### Frontend
- Node.js 14 ou superior
- npm ou yarn

### Jira
- Conta Atlassian com acesso ao Jira
- Token de API do Jira ([Como criar](https://id.atlassian.com/manage-profile/security/api-tokens))

## ??? Instala??o

### 1. Clone o reposit?rio

```bash
git clone <url-do-repositorio>
cd export_jira
```

### 2. Configurar o Backend

```bash
# Navegue at? a pasta backend
cd backend

# Crie um ambiente virtual (recomendado)
python -m venv venv

# Ative o ambiente virtual
# No Linux/Mac:
source venv/bin/activate
# No Windows:
venv\Scripts\activate

# Instale as depend?ncias
pip install -r requirements.txt
```

### 3. Configurar o Frontend

```bash
# Navegue at? a pasta frontend
cd frontend

# Instale as depend?ncias
npm install
```

## ?? Como Executar

### 1. Iniciar o Backend

```bash
cd backend
python app.py
```

O backend estar? rodando em `http://localhost:5000`

### 2. Iniciar o Frontend

Em outro terminal:

```bash
cd frontend
npm start
```

O frontend estar? rodando em `http://localhost:3000`

## ?? Como Usar

### Passo 1: Conectar ao Jira

1. Abra a aplica??o em `http://localhost:3000`
2. Preencha os campos:
   - **URL do Jira**: URL da sua inst?ncia (ex: `https://sua-empresa.atlassian.net`)
   - **Email**: Seu email do Atlassian
   - **Token API**: Seu token de API ([criar token](https://id.atlassian.com/manage-profile/security/api-tokens))
3. Clique em "Conectar"

### Passo 2: Visualizar e Filtrar Tickets

Ap?s conectar, voc? ver? todos os tickets do Jira:

- **Buscar**: Digite no campo de busca para filtrar por key, resumo ou descri??o
- **Filtrar por Projeto**: Selecione um projeto espec?fico
- **Filtrar por Status**: Filtre por status (To Do, In Progress, Done, etc.)
- **Filtrar por Prioridade**: Filtre por prioridade (High, Medium, Low, etc.)
- **Ordenar**: Clique nos cabe?alhos das colunas para ordenar

### Passo 3: Exportar

Escolha o formato de exporta??o:

- **Excel**: Clique em "Exportar Excel" para baixar arquivo .xlsx
- **PDF**: Clique em "Exportar PDF" para baixar relat?rio em PDF

Os arquivos ser?o baixados automaticamente com timestamp no nome.

## ?? Configura??o Avan?ada

### Vari?veis de Ambiente

#### Backend (`backend/.env`)

```env
FLASK_ENV=development
FLASK_DEBUG=True
```

#### Frontend (`frontend/.env`)

```env
REACT_APP_API_URL=http://localhost:5000
```

### JQL Customizada

Para usar queries JQL customizadas, voc? pode modificar o c?digo em:
- `backend/app.py` - Endpoint `/api/tickets`

Exemplo de JQL:
```python
jql = 'project = PROJ AND status = "In Progress" ORDER BY created DESC'
```

## ?? Estrutura do Projeto

```
export_jira/
??? backend/
?   ??? app.py                 # Aplica??o Flask principal
?   ??? requirements.txt       # Depend?ncias Python
?   ??? .env.example          # Exemplo de configura??o
?
??? frontend/
?   ??? public/
?   ?   ??? index.html        # HTML principal
?   ??? src/
?   ?   ??? components/
?   ?   ?   ??? ConnectionForm.js    # Formul?rio de conex?o
?   ?   ?   ??? ConnectionForm.css
?   ?   ?   ??? TicketsList.js       # Lista de tickets
?   ?   ?   ??? TicketsList.css
?   ?   ??? App.js            # Componente principal
?   ?   ??? App.css
?   ?   ??? index.js          # Entry point
?   ?   ??? index.css
?   ??? package.json          # Depend?ncias Node
?   ??? .env.example          # Exemplo de configura??o
?
??? README.md                 # Este arquivo
```

## ?? API Endpoints

### Backend API

| M?todo | Endpoint | Descri??o |
|--------|----------|-----------|
| GET | `/api/health` | Verifica status da API |
| POST | `/api/connect` | Conecta ao Jira |
| GET | `/api/projects` | Lista projetos do Jira |
| POST | `/api/tickets` | Busca tickets (aceita filtros JQL) |
| POST | `/api/export/excel` | Exporta tickets para Excel |
| POST | `/api/export/pdf` | Exporta tickets para PDF |

### Exemplo de Requisi??o

```javascript
// Buscar tickets de um projeto espec?fico
const response = await fetch('http://localhost:5000/api/tickets', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    project_key: 'PROJ',
    jql: 'project = PROJ AND status = "In Progress"'
  })
});
```

## ?? Customiza??o

### Estilos

Os arquivos CSS est?o em:
- `frontend/src/App.css` - Estilos gerais
- `frontend/src/components/*.css` - Estilos dos componentes

### Campos Exportados

Para adicionar/remover campos na exporta??o, edite:
- `backend/app.py` - Fun??es `export_excel()` e `export_pdf()`

### Limite de Tickets

Por padr?o, s?o buscados at? 1000 tickets. Para alterar:
```python
# Em backend/app.py, linha ~70
issues = jira_client.search_issues(jql, maxResults=1000)
```

## ?? Solu??o de Problemas

### Erro de Conex?o com Jira

**Problema**: "Erro ao conectar: Unauthorized"

**Solu??o**:
- Verifique se o token API est? correto
- Confirme se o email est? correto
- Verifique se a URL do Jira est? no formato correto

### Erro CORS

**Problema**: "Access-Control-Allow-Origin"

**Solu??o**:
```bash
# Reinstale o flask-cors
pip install --upgrade flask-cors
```

### Frontend n?o conecta ao Backend

**Problema**: "Network Error"

**Solu??o**:
1. Verifique se o backend est? rodando em `http://localhost:5000`
2. Verifique o arquivo `.env` no frontend
3. Limpe o cache do navegador

### Exporta??o n?o funciona

**Problema**: Erro ao exportar

**Solu??o**:
```bash
# Reinstale as depend?ncias de exporta??o
pip install --upgrade openpyxl reportlab pandas
```

## ?? Seguran?a

?? **IMPORTANTE**: 

- Nunca commite arquivos `.env` com credenciais reais
- O token API ? enviado de forma segura via HTTPS (em produ??o)
- Use sempre HTTPS em produ??o
- Mantenha as depend?ncias atualizadas

## ?? Deploy

### Backend (Heroku/Railway)

```bash
# Adicione um Procfile
echo "web: python backend/app.py" > Procfile

# Configure as vari?veis de ambiente no painel de controle
```

### Frontend (Vercel/Netlify)

```bash
cd frontend
npm run build

# Deploy a pasta build/
```

## ?? Contribuindo

Contribui??es s?o bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudan?as (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## ?? Licen?a

Este projeto est? sob a licen?a MIT. Veja o arquivo LICENSE para mais detalhes.

## ????? Autor

Desenvolvido com ?? para facilitar a gest?o de tickets do Jira

## ?? Agradecimentos

- [Jira Python Library](https://jira.readthedocs.io/)
- [Flask](https://flask.palletsprojects.com/)
- [React](https://reactjs.org/)
- [Lucide Icons](https://lucide.dev/)

## ?? Suporte

Se encontrar problemas ou tiver d?vidas:

1. Verifique a se??o [Solu??o de Problemas](#-solu??o-de-problemas)
2. Abra uma issue no GitHub
3. Consulte a [documenta??o da API do Jira](https://developer.atlassian.com/cloud/jira/platform/rest/v3/)

---

**? Se este projeto foi ?til, considere dar uma estrela!**
