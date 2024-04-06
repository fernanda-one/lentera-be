# Gunakan image Node.js dengan versi yang bisa diatur
ARG NODE_VERSION=18
FROM node:${NODE_VERSION}

# Set direktori kerja di dalam kontainer
WORKDIR /app

# Salin package.json dan package-lock.json (jika ada)
COPY package*.json ./

# Install dependensi dan generate Prisma client
RUN npm install && \
    npm install -g prisma && \
    npx prisma generate

# Salin kode aplikasi ke dalam kontainer
COPY . .

# Expose port yang digunakan oleh server Node.js
EXPOSE 5000

# Command untuk menjalankan server Node.js
CMD ["node", "src/main.js"]
