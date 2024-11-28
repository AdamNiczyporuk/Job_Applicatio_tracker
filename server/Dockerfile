# Wybieramy obraz bazowy
FROM node:18

# Ustalamy katalog roboczy
WORKDIR /app

# Kopiujemy pliki package.json i package-lock.json
COPY package*.json ./

# Instalujemy zależności
RUN npm install

# Kopiujemy resztę plików
COPY . .

# Uruchamiamy aplikację
CMD ["npm", "start"]

EXPOSE 5000
