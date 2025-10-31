FROM node:18-alpine

WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar depend?ncias
RUN npm install

# Copiar c?digo da aplica??o
COPY . .

# Expor porta
EXPOSE 3000

# Comando para executar
CMD ["npm", "start"]
