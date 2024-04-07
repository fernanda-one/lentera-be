# Create image based on the official Node image from dockerhub
FROM node:18-alpine
 
# Create app directory
WORKDIR /app
 
# Copy dependency definitions
COPY package*.json .
 
# Install dependencies
#RUN npm set progress=false \
#    && npm config set depth 0 \
#    && npm i install
RUN npm i
# Get all the code needed to run the app
COPY . .
RUN npx prisma db push

# Expose the port the app runs in
EXPOSE 3000
 
# Serve the app
CMD ["node", "src/main.js"]