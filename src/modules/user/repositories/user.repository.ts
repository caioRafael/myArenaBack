import ScheduleDto from 'src/modules/schedule/dto/schedule.dto';
import { UserDto } from '../dto/user.dto';

export abstract class IUserRepository {
  abstract create(data: UserDto): Promise<UserDto | null>;
  abstract findUserByEmail(email: string): Promise<UserDto | null>;
  abstract findAll(arenaId: string): Promise<UserDto[]>;
  abstract findOne(id: string): Promise<UserDto | null>;
  abstract findSchedulesByUser(id: string): Promise<ScheduleDto[]>;
  abstract update(id: string, data: UserDto): Promise<UserDto | null>;
  abstract remove(id: string): Promise<void>;
}
