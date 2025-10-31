# ?? Screenshots e Demonstra??o

Este arquivo descreve as telas da aplica??o para refer?ncia futura.

## ?? Tela Inicial - Conex?o

**Descri??o**: Formul?rio de conex?o ao Jira

**Elementos**:
- Logo "Jira Export" com ?cone de database
- Formul?rio com 3 campos:
  - URL do Jira (ex: https://sua-empresa.atlassian.net)
  - Email do usu?rio
  - Token API (campo de senha)
- Bot?o "Conectar" (gradiente roxo)
- Se??o de ajuda: "Como obter o Token API?"
- Link para criar token API do Atlassian

**Cores**:
- Fundo: Gradiente roxo (#667eea ? #764ba2)
- Card: Branco com sombra
- Bot?es: Gradiente roxo
- Texto: Cinza escuro (#333)

---

## ?? Tela Principal - Lista de Tickets

**Descri??o**: Visualiza??o e gerenciamento de tickets

### Header
- Logo "Jira Export"
- Subt?tulo: "Extraia e organize seus tickets do Jira"

### Controles
1. **Contador de Tickets**: "X tickets encontrados"
2. **Bot?o Atualizar**: ?cone de refresh + "Atualizar"

### ?rea de Filtros
1. **Barra de Busca**:
   - ?cone de lupa
   - Placeholder: "Buscar por key, resumo ou descri??o..."
   
2. **Filtros Dropdown**:
   - Todos os Projetos
   - Todos os Status
   - Todas as Prioridades

### Bot?es de Exporta??o
- **Exportar Excel**: Verde (#10793f) + ?cone de planilha
- **Exportar PDF**: Vermelho (#d32f2f) + ?cone de documento

### Tabela de Tickets
**Colunas**:
1. Key (clic?vel para ordenar)
2. Resumo (clic?vel para ordenar)
3. Status (badges coloridos, clic?vel para ordenar)
4. Prioridade (badges coloridos, clic?vel para ordenar)
5. Respons?vel (clic?vel para ordenar)
6. Tipo (clic?vel para ordenar)
7. Criado em (clic?vel para ordenar)

**Badges de Status**:
- To Do / A Fazer: Azul claro
- In Progress / Em Progresso: Laranja
- Done / Conclu?do: Verde

**Badges de Prioridade**:
- Highest: Vermelho escuro
- High / Alta: Laranja
- Medium / M?dia: Amarelo
- Low / Baixa: Verde azulado

### Footer
- "? 2025 Jira Export - Ferramenta de extra??o e organiza??o de tickets"
- Fundo semi-transparente escuro

---

## ?? Paleta de Cores

```css
/* Cores Principais */
Primary Purple: #667eea
Secondary Purple: #764ba2

/* Status */
Todo Blue: #1976d2
In Progress Orange: #f57c00
Done Green: #388e3c

/* Prioridade */
Highest Red: #c62828
High Orange: #ef6c00
Medium Yellow: #f9a825
Low Teal: #00897b

/* Exporta??o */
Excel Green: #10793f
PDF Red: #d32f2f

/* Neutros */
Background Light: #f8f9fa
Border: #e0e0e0
Text Dark: #333
Text Light: #666
White: #ffffff
```

---

## ?? Responsividade

### Desktop (> 768px)
- Layout em colunas
- Tabela completa com todas as colunas
- Filtros em linha horizontal

### Mobile (< 768px)
- Layout em coluna ?nica
- Tabela com scroll horizontal
- Filtros empilhados verticalmente
- Bot?es de exporta??o em coluna

---

## ? Intera??es

### Hover Effects
1. **Bot?es**: Eleva??o (translateY -2px) + sombra
2. **Linhas da Tabela**: Background cinza claro
3. **Cabe?alhos da Tabela**: Background cinza m?dio
4. **Inputs**: Borda azul + sombra suave

### Anima??es
1. **Fade In**: Cards aparecem suavemente (0.5s)
2. **Loading**: Bot?es mostram texto "Carregando..."
3. **Sort**: ?cone de seta aparece ao ordenar

### Estados
1. **Loading**: Bot?o desabilitado + texto alterado
2. **Error**: Alert vermelho com ?cone
3. **Success**: Alert verde com ?cone
4. **Empty State**: "Nenhum ticket encontrado"

---

## ??? Adicionar Screenshots

Para adicionar screenshots reais:

1. Tire screenshots de cada tela principal
2. Salve como:
   - `docs/screenshots/connection-form.png`
   - `docs/screenshots/tickets-list.png`
   - `docs/screenshots/filters.png`
   - `docs/screenshots/export-buttons.png`

3. Atualize o README.md com:

```markdown
## Screenshots

### Tela de Conex?o
![Conex?o ao Jira](docs/screenshots/connection-form.png)

### Lista de Tickets
![Lista de Tickets](docs/screenshots/tickets-list.png)

### Filtros
![Filtros](docs/screenshots/filters.png)

### Exporta??o
![Bot?es de Exporta??o](docs/screenshots/export-buttons.png)
```

---

## ?? Demonstra??o em V?deo

Para criar um v?deo de demonstra??o:

1. **Introdu??o** (0:00-0:15)
   - Mostrar logo e t?tulo
   - Explicar prop?sito

2. **Conex?o** (0:15-0:45)
   - Preencher formul?rio
   - Conectar ao Jira
   - Sucesso da conex?o

3. **Visualiza??o** (0:45-1:30)
   - Mostrar lista de tickets
   - Demonstrar busca
   - Aplicar filtros
   - Ordenar colunas

4. **Exporta??o** (1:30-2:00)
   - Exportar para Excel
   - Abrir arquivo Excel
   - Exportar para PDF
   - Mostrar PDF gerado

5. **Conclus?o** (2:00-2:15)
   - Resumo das funcionalidades
   - Call to action

---

## ?? Dimens?es

### Cards
- Border Radius: 16px
- Padding: 2rem (32px)
- Box Shadow: 0 10px 40px rgba(0,0,0,0.15)

### Inputs
- Height: ~40px
- Border Radius: 8px
- Border Width: 2px

### Buttons
- Padding: 0.75rem 1.5rem
- Border Radius: 8px
- Font Weight: 600

### Badges
- Padding: 0.25rem 0.75rem
- Border Radius: 12px
- Font Size: 0.85rem

---

**Para capturar screenshots de alta qualidade**:
- Use resolu??o 1920x1080 para desktop
- Use 375x812 para mobile
- Considere usar ferramentas como:
  - Mac: Cmd+Shift+4
  - Windows: Win+Shift+S
  - Browser DevTools para responsivo

**Para criar GIFs animados**:
- [LICEcap](https://www.cockos.com/licecap/)
- [Kap](https://getkap.co/) (Mac)
- [ScreenToGif](https://www.screentogif.com/) (Windows)
