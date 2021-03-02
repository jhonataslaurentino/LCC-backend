From node:14.11.0

ENV HOME=/home/app

WORKDIR $HOME/

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn
COPY . .

CMD ["yarn", "build"]

CMD ["node", "dist/server.js"]
