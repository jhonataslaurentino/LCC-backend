From node:14-slim

ENV HOME=/home/app

WORKDIR $HOME/

COPY package.json .
COPY yarn.lock .

RUN yarn install --production && yarn global add pm2

COPY . .

RUN yarn build

RUN rm -rf src/

CMD ["pm2-runtime", "node", "dist/server.js", "-i", "max"]
