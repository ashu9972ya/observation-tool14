FROM node:16-alpine
WORKDIR /internship
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm install
CMD ["npm", "start"]