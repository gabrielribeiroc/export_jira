# Guia de Contribui??o

Obrigado por considerar contribuir com o Jira Export! ??

## Como Contribuir

### Reportar Bugs

Se encontrar um bug, por favor abra uma issue incluindo:

- Descri??o clara do problema
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots (se aplic?vel)
- Ambiente (SO, vers?o do Python, Node, etc)

### Sugerir Funcionalidades

Adoramos ouvir novas ideias! Abra uma issue com:

- Descri??o detalhada da funcionalidade
- Por que seria ?til
- Exemplos de uso
- Poss?veis implementa??es

### Pull Requests

1. **Fork o reposit?rio**

2. **Clone seu fork**
```bash
git clone https://github.com/seu-usuario/export_jira.git
cd export_jira
```

3. **Crie uma branch para sua feature**
```bash
git checkout -b feature/minha-nova-funcionalidade
```

4. **Fa?a suas altera??es**

5. **Teste suas altera??es**
```bash
# Backend
cd backend
python -m pytest

# Frontend
cd frontend
npm test
```

6. **Commit suas mudan?as**
```bash
git commit -m "feat: adiciona nova funcionalidade X"
```

Use o padr?o de commits:
- `feat:` - Nova funcionalidade
- `fix:` - Corre??o de bug
- `docs:` - Documenta??o
- `style:` - Formata??o
- `refactor:` - Refatora??o
- `test:` - Testes
- `chore:` - Manuten??o

7. **Push para seu fork**
```bash
git push origin feature/minha-nova-funcionalidade
```

8. **Abra um Pull Request**

## Padr?es de C?digo

### Python (Backend)

- Siga PEP 8
- Use type hints quando poss?vel
- Docstrings para fun??es p?blicas
- M?ximo 100 caracteres por linha

```python
def buscar_tickets(jql: str, max_results: int = 100) -> list:
    """
    Busca tickets do Jira usando JQL.
    
    Args:
        jql: Query JQL para filtrar tickets
        max_results: N?mero m?ximo de resultados
        
    Returns:
        Lista de dicion?rios com dados dos tickets
    """
    pass
```

### JavaScript (Frontend)

- Use ES6+
- Componentes funcionais com hooks
- PropTypes ou TypeScript
- Nomes descritivos para vari?veis

```javascript
// Bom
const [isLoading, setIsLoading] = useState(false);
const handleTicketClick = (ticketId) => { ... };

// Evitar
const [x, setX] = useState(false);
const func = (id) => { ... };
```

### CSS

- Use classes sem?nticas
- Mobile-first
- BEM notation (opcional)

```css
/* Bom */
.ticket-card {
  padding: 1rem;
}

.ticket-card__title {
  font-size: 1.2rem;
}

.ticket-card--highlighted {
  background: yellow;
}
```

## Estrutura de Commits

### Mensagens de Commit

```
<tipo>(<escopo>): <assunto>

<corpo>

<rodap?>
```

Exemplo:
```
feat(export): adiciona exporta??o para CSV

Implementa nova funcionalidade de exporta??o em CSV
com suporte a encoding UTF-8 e sele??o de colunas.

Closes #123
```

## Testes

### Backend

```bash
cd backend
python -m pytest tests/
```

### Frontend

```bash
cd frontend
npm test
```

## Documenta??o

- Atualize o README.md se necess?rio
- Adicione docstrings/coment?rios em c?digo complexo
- Atualize o CHANGELOG.md

## Code Review

Todos os PRs passar?o por code review. Esperamos:

- C?digo limpo e leg?vel
- Testes passando
- Documenta??o atualizada
- Sem conflitos com a branch main
- Seguir os padr?es do projeto

## D?vidas?

Abra uma issue ou entre em contato! Estamos aqui para ajudar. ??

---

**Obrigado por contribuir! ??**
