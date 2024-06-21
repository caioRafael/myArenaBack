import { CreateScheduleUseCase } from './useCases/create-schedule.usecase';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
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
  constructor(private readonly createScheduleUseCase: CreateScheduleUseCase) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage('findSchedules')
  async findSchedules() {
    this.server.emit('findSchedules', true);
  }
}
