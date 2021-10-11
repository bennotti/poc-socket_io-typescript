
Template for building nodejs and typescript services. The main goal of this boilerplate is to offer a good Developer Experience (eg: debugging, watch and recompile) by providing the following features out of the box:

***Features***

* Language - [TypeScript](https://www.typescriptlang.org/)
* REST API - [koa2](http://koajs.com/)
* Graceful Shutdown - [Pattern](https://nemethgergely.com/nodejs-healthcheck-graceful-shutdown/)
* HealthCheck - [Pattern /health](http://microservices.io/patterns/observability/health-check-api.html)
* Authentication and Authorization - [JWT](https://github.com/auth0/node-jsonwebtoken)
* Validation - [Joi](https://github.com/hapijs/joi)
* Testing - [Mocha](https://mochajs.org/) [Chai](http://www.chaijs.com/) + [Sinon](http://sinonjs.org/) [Coverage](https://istanbul.js.org/)
* Code Style - [Prettier](https://prettier.io/)
* Git Hooks - [Husky](https://github.com/typicode/husky)

## Installation & Run

* *npm install* - Install dependencies
* *npm run start* - Start application (It needs a mysql database)

### Running with Docker

* *docker-compose up* (compose and run, it also creates the mysql database)
* *docker-compose down* (Destroy application and mysql containers)

## Useful npm commands

* *npm run build* - Transpile TypeScript code
* *npm run clean* - Remove dist, node_modules, coverage folders
* *npm run coverage* - Run NYC coverage
* *npm run lint* - Lint your TypeScript code
* *npm run start:dev* - Run application in dev mode (debug & watch). Debug mode is running on port 5858 (open `chrome://inspect/#devices`).
* *npm run test* - Run unit tests
* *npm run test:integration* - Run integration tests
* *npm run test:all* - Run Unit and Integration tests

## JWT TOKEN on client

```
const {token} = sessionStorage;
const socket = io.connect('http://localhost:3000', {
  query: {token}
});
```

```
socket.emit('message', "this is a test"); //sending to sender-client only
socket.broadcast.emit('message', "this is a test"); //sending to all clients except sender
socket.broadcast.to('game').emit('message', 'Nice game'); //sending to all clients in 'game' room(channel) except sender
socket.to('game').emit('message', 'enjoy the game'); //sending to sender client, only if they are in 'game' room(channel)
socket.broadcast.to(socketid).emit('message', 'for your eyes only'); //sending to individual socketid
io.emit('message', "this is a test"); //sending to all clients, include sender
io.in('game').emit('message', 'cool game'); //sending to all clients in 'game' room(channel), include sender
io.of('myNamespace').emit('message', 'gg'); //sending to all clients in namespace 'myNamespace', include sender
socket.emit(); //send to all connected clients
socket.broadcast.emit(); //send to all connected clients except the one that sent the message
socket.on(); //event listener, can be called on client to execute on server
io.sockets.socket(); //for emiting to specific clients
io.sockets.emit(); //send to all connected clients (same as socket.emit)
io.sockets.on() ; //initial connection from a client.
```
