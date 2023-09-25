FROM node:20-alpine3.17

ENV NODE_ENV development

# Add a work directory
WORKDIR /app

# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .

RUN npm i
# RUN npm run migrate

# Copy app files
COPY . .

# Start the app
CMD npm run dev -- --host
