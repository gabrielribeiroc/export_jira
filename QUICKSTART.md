# ?? Guia R?pido de In?cio

Este guia te ajudar? a come?ar em poucos minutos!

## ?? Checklist de Pr?-requisitos

Antes de come?ar, certifique-se de ter:

- [ ] Python 3.8+ instalado ([Download](https://www.python.org/downloads/))
- [ ] Node.js 14+ instalado ([Download](https://nodejs.org/))
- [ ] Conta no Jira Atlassian
- [ ] Token de API do Jira ([Criar Token](https://id.atlassian.com/manage-profile/security/api-tokens))

## ? In?cio R?pido

### Op??o 1: Script Autom?tico (Recomendado)

#### Linux/Mac:
```bash
./start.sh
```

#### Windows:
```cmd
start.bat
```

### Op??o 2: Manual

#### Terminal 1 - Backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

#### Terminal 2 - Frontend:
```bash
cd frontend
npm install
npm start
```

### Op??o 3: Docker

```bash
docker-compose up
```

## ?? Primeiros Passos

### 1. Abrir a Aplica??o
Acesse: http://localhost:3000

### 2. Obter Token do Jira

1. Acesse: https://id.atlassian.com/manage-profile/security/api-tokens
2. Clique em "Criar token de API"
3. D? um nome (ex: "Jira Export App")
4. Copie o token gerado

### 3. Conectar ao Jira

Na tela inicial, preencha:

```
URL do Jira: https://sua-empresa.atlassian.net
Email: seu-email@exemplo.com
Token API: [cole o token copiado]
```

Clique em **Conectar**

### 4. Visualizar Tickets

Ap?s conectar, voc? ver? todos os seus tickets!

### 5. Filtrar e Buscar

- **Buscar**: Digite no campo de busca
- **Filtrar por Projeto**: Selecione um projeto
- **Filtrar por Status**: Selecione um status
- **Ordenar**: Clique nos cabe?alhos das colunas

### 6. Exportar

Clique em:
- **Exportar Excel** para baixar .xlsx
- **Exportar PDF** para baixar relat?rio

## ?? Exemplo de Uso

### Caso de Uso 1: Exportar tickets em andamento

1. Conecte ao Jira
2. Filtrar Status: "In Progress"
3. Clique em "Exportar Excel"
4. ? Pronto! Arquivo baixado

### Caso de Uso 2: Relat?rio de tickets do projeto

1. Conecte ao Jira
2. Filtrar Projeto: "MEU-PROJETO"
3. Ordenar por "Criado em" (clique no cabe?alho)
4. Clique em "Exportar PDF"
5. ? Relat?rio gerado!

### Caso de Uso 3: Buscar ticket espec?fico

1. Conecte ao Jira
2. Digite a key na busca: "PROJ-123"
3. ? Ticket encontrado!

## ?? Configura??o da URL do Jira

Sua URL do Jira geralmente ?:

- **Jira Cloud**: `https://sua-empresa.atlassian.net`
- **Jira Server**: `https://jira.sua-empresa.com`

?? **N?o inclua** `/secure/` ou paths adicionais!

## ?? Dicas

### Dica 1: Combinando Filtros
Voc? pode combinar m?ltiplos filtros:
- Projeto: "MEU-PROJ"
- Status: "Done"
- Busca: "bug"

### Dica 2: Atalhos
- Pressione `F5` para atualizar os tickets
- Use `Ctrl+F` para buscar na p?gina

### Dica 3: Limites
Por padr?o, s?o carregados at? 1000 tickets. Para mais, edite:
```python
# Em backend/app.py linha ~70
maxResults=1000  # Altere para o valor desejado
```

## ? Problemas Comuns

### "Erro ao conectar ao Jira"

**Solu??o**: 
- Verifique se a URL est? correta
- Confirme se o token est? v?lido
- Tente gerar um novo token

### "Network Error"

**Solu??o**:
- Verifique se o backend est? rodando (http://localhost:5000)
- Verifique seu firewall/antiv?rus
- Tente reiniciar os servidores

### Backend n?o inicia

**Solu??o**:
```bash
cd backend
pip install --upgrade -r requirements.txt
python app.py
```

### Frontend n?o carrega

**Solu??o**:
```bash
cd frontend
rm -rf node_modules
npm install
npm start
```

## ?? Estrutura dos Dados Exportados

### Excel
Colunas inclu?das:
- Key
- Summary (Resumo)
- Status
- Priority (Prioridade)
- Assignee (Respons?vel)
- Reporter
- Created (Criado em)
- Updated (Atualizado em)
- Issue Type (Tipo)
- Project (Projeto)
- Description (Descri??o)
- Labels
- Components

### PDF
Campos principais em formato de tabela formatada.

## ?? Pr?ximos Passos

Agora que voc? est? rodando, explore:

1. **README.md** - Documenta??o completa
2. **CONTRIBUTING.md** - Como contribuir
3. **CHANGELOG.md** - Hist?rico de mudan?as

## ?? Precisa de Ajuda?

- ?? Leia o [README.md](README.md) completo
- ?? Reporte bugs abrindo uma [issue](https://github.com/seu-usuario/export_jira/issues)
- ?? Perguntas? Abra uma [discussion](https://github.com/seu-usuario/export_jira/discussions)

---

**Pronto para come?ar? Execute `./start.sh` e divirta-se! ??**
