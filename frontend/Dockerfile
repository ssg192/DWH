FROM node:20-alpine AS build
WORKDIR /app

# Instala dependencias de compilación
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    libc6-compat

# Instala las herramientas necesarias en versión exacta
RUN npm install -g npm@latest

# Copia primero los archivos de dependencias
COPY package.json package-lock.json ./

# Instala dependencias con versión exacta
RUN npm ci --legacy-peer-deps --force

# Copia el resto de archivos
COPY . .

# Ejecuta el build
RUN npm run build

# Servidor Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]