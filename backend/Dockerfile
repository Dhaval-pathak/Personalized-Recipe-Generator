FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "npx prisma generate &&  npx prisma migrate dev --name init && npm start"]