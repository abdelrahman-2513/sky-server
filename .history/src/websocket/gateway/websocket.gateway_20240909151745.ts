import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'http';

@WebSocketGateway({
  cors: { origins: '*' },
})
export class SocketGateWay implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  handleConnection(client: any, ...args: any[]): any {}

  handleDisconnect(client: any): any {}
}
