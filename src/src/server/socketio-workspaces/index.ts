import * as socketIo from 'socket.io';
import { Server } from 'http';

export class SocketIoServer {
  public io: socketIo.Server

  public listen(server: Server): Server {
    this.io = new socketIo.Server(server);

    const workspace: socketIo.Namespace = this.io.of('/my-namespace');
    workspace.use((socket, next) => {
      if (socket.handshake.query && socket.handshake.query.token){
        // jwt.verify(socket.handshake.query.token, 'SECRET_KEY', function(err, decoded) {
        //   if (err) return next(new Error('Authentication error'));
        //   socket.decoded = decoded;
        //   next();
        // });
        console.log(socket.handshake.query.token);
        next();
      }
      else {
        console.log('no token');
        next(new Error('Authentication error'));
      }    
    });
    workspace.on('connection', (socket: any) => {
      console.log('a user connected');
      
      workspace.emit('new_user', 'New User Joined, Say Hi :D');
      socket.on('chat_message', (msg) => {
          console.log('message: ' + msg);
          workspace.emit('chat_message', msg);
      });

      socket.on('disconnect', () => {
          console.log('user disconnected');
      });
    });

    return server
  }
}
