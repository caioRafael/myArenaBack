import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ScheduleService } from './schedule.service';
import { Server } from 'socket.io';

// interface SchedulesData {
//   arenaId: string;
//   date?: string;
// }

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ScheduleGateway {
  constructor(private readonly scheduleService: ScheduleService) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage('findSchedules')
  async findSchedules() {
    this.server.emit('findSchedules', true);
  }
}
