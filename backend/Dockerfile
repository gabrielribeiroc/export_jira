FROM python:3.11-slim

WORKDIR /app

# Instalar depend?ncias do sistema
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copiar e instalar depend?ncias Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar c?digo da aplica??o
COPY . .

# Expor porta
EXPOSE 5000

# Comando para executar
CMD ["python", "app.py"]
