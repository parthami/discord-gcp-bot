FROM node:14 as dev-env

WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm install
COPY . .

ENV GOOGLE_APPLICATION_CREDENTIALS=/app/google-application-credentials.json

FROM dev-env as production-env

CMD [ "node", "bot.js" ]