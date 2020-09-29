FROM node:10.17.0-alpine

COPY src .
COPY package.json .
COPY pm2.json .
RUN npm install --production

ENV NODE_ENV development
ENV APP_PREFIX ''
ENV APP_PORT 2230
ENV APP_NAME qnetwork-idp
ENV LOG_LEVEL debug
ENV URL 'http://51.68.173.176:8180/auth'
ENV MASTERREALM master
ENV REALM dev
ENV USERNAME admin
ENV PASSWORD admin
ENV CLIENT_ID admin-cli
ENV LOGIN_CLIENT_ID 'client-confidential-app'
ENV CLIENT_SECRET '9da1a900-5c17-4ece-9922-ebf5f7448e86'
ENV TOKEN_TYPE tokenType
ENV ADMIN_TOKEN adminToken
ENV ADMIN_TOKEN_EXPIRY ADMIN_TOKEN_EXPIRY
ENV ADMIN_REFRESH_TOKEN ADMIN_REFRESH_TOKEN
ENV ADMIN_REFRESH_TOKEN_EXPIRY ADMIN_REFRESH_TOKEN_EXPIRY

CMD [ "node", "app.js" ]
