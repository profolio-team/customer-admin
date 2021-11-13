FROM node:14.15.0
WORKDIR /app
COPY /package.json .
RUN npm install
COPY . .
ENV REACT_APP_NAME=hiiii
EXPOSE 3000
CMD ["npm", "start"]