import { WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({
  namespace: '/admin',
  cors: {
    origin: [process.env.ADMIN_URL ?? 'http://localhost:3001'],
    credentials: true,
  },
})
export class AdminGateway {}
