[eslint]: https://github.com/SOFTOO-Pvt-Ltd/Hazree/workflows/eslint/badge.svg?branch=develop
[build]: https://github.com/SOFTOO-Pvt-Ltd/Hazree/workflows/build/badge.svg?branch=develop

![eslint] ![build]

# Hazree

Softoo Ultimate Attendance bot 

### Install 

1. clone repo
2. npm install
3. cp .env.sample .env

### Start

1. docker-compose up 
2. npm run start-dev
3. http://localhost:9000/ping this should return `pong`

### Local development

For developing locally please contact the team to set up a bot and ngork https://ngrok.com/. Post man can also be used 
for sending mock calls to the API.. most of the coding should be done with unit tests 

### Pull request

1. make new branch SOO-<issue number>-<issue title> 
2. request review 
3. squash and merge 

### Tech
TypeScripte, Nodejs, MongoDB

### Usefull Comands

1. npm run build 
2. npm run eslint
3. ./ngrok http 9000
