FROM node:19-alpine3.16

COPY . .

# install node dependencies
RUN npm install
RUN npm run build

# gunicorn
CMD ["npm", "run", "server"]
