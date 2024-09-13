import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@WebSocketGateway({
  cors: { origins: '*' },
})
export class SocketGateWay implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }
  @SubscribeMessage('joinConversation')
  async handleJoinConversation(
    client: Socket,
    conversationId: string,
  ): Promise<void> {
    client.join(conversationId);
    console.log(`${client} joined ${conversationId}`);
  }

  @SubscribeMessage('leaveConversation')
  async handleLeaveConversation(
    client: Socket,
    conversationId: string,
  ): Promise<void> {
    client.leave(conversationId);
  }
  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, payload: string) {
    const msgData = JSON.parse(payload.toString());
    console.log(msgData);

    this.server
      .to(msgData.conversationId.toString())
      .emit('newMessage', msgData);
  }
}
