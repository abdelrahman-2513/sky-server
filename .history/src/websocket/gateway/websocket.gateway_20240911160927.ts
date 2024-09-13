import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
@WebSocketGateway({
  cors: { origins: '*' },
})
export class SocketGateWay implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messageService: MessageService) {}

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
    // Join the conversation room
    client.join(conversationId);
    console.log(`${client} joined ${conversationId}`);
  }

  @SubscribeMessage('leaveConversation')
  async handleLeaveConversation(
    client: Socket,
    conversationId: string,
  ): Promise<void> {
    // Leave the conversation room
    client.leave(conversationId);
  }
  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, payload: string) {
    const msgData = JSON.parse(payload.toString());
    console.log(msgData);
    const message = await this.messageService.createMessage(msgData);
    Object.assign(message, { user: { id: message.user } });
    console.log(message);
    this.server
      .to(message.conversationId.toString())
      .emit('newMessage', message);
  }
}
