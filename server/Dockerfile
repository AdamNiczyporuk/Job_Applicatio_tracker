# Używamy obrazu Node.js jako bazowego
FROM node:16

# Ustalamy katalog roboczy w kontenerze
WORKDIR /app

# Kopiujemy pliki zależności aplikacji
COPY package*.json ./

# Instalujemy zależności
RUN npm install

# Kopiujemy resztę plików aplikacji
COPY . .

# Eksponujemy port, na którym będzie działać aplikacja
EXPOSE 5000

# Uruchamiamy aplikację
CMD ["npm", "start"]
