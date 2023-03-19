FROM node:19-alpine3.16

COPY . .

# install node dependencies
RUN npm install
RUN npm run build
RUN npm run downloadLocales

# gunicorn
CMD ["npm", "run", "serve"]
