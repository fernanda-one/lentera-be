# Gunakan image Node.js sebagai dasar
FROM node:16

# Set direktori kerja di dalam kontainer
WORKDIR /app

# Salin package.json dan package-lock.json (jika ada)
COPY package*.json ./

# Install dependensi
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Salin kode aplikasi ke dalam kontainer
COPY . .

# Expose port yang digunakan oleh server Node.js
EXPOSE 5000

# Command untuk menjalankan server Node.js
CMD ["node", "src/main.js"]  
