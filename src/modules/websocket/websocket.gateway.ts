import {
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway implements OnGatewayInit, OnGatewayConnection {
  handleConnection(client: Socket) {
    console.log(`Client connected, ${client.id}`)
  }
  afterInit(server: Server) {
    // console.log(server);
  }
  @WebSocketServer() server: Server;

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload) {
    console.log('connecteed')
    this.server.emit('response', {hi: 'Hii', ...payload});
  }
}
