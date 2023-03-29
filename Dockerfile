FROM node:19-alpine3.16

COPY . .

# install node dependencies
RUN npm install
RUN npm run build
RUN chmod +x ./production_run.sh

# gunicorn
CMD ["./production_run.sh"]
