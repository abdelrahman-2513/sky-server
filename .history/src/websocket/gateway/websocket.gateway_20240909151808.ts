import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({
  cors: { origins: '*' },
})
export class SocketGateWay implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  handleConnection(client: any, ...args: any[]): any {}

  handleDisconnect(client: any): any {}
}
