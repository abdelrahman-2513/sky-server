import { Module } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { SocketGateWay } from './gateway/websocket.gateway';

@Module({
  providers: [WebsocketService, SocketGateWay],
})
export class WebsocketModule {}
