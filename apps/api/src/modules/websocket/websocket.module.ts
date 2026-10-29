import { Module } from '@nestjs/common';
import { AdminGateway } from './websocket.gateway';

@Module({
  providers: [AdminGateway],
  exports: [AdminGateway],
})
export class WebsocketModule {}
