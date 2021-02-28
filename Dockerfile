FROM node:14

WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

ENV GOOGLE_APPLICATION_CREDENTIALS=/app/google-application-credentials.json

CMD [ "node", "bot.js" ]