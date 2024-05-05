import ScheduleDto from 'src/modules/schedule/dto/schedule.dto';
import { UserDto } from '../../dto/user.dto';
import { IUserRepository } from '../user.repository';
import { randomUUID } from 'crypto';

export default class UserInMemoryRepository implements IUserRepository {
  users: UserDto[] = [];
  async create(data: UserDto): Promise<UserDto> {
    const user: UserDto = {
      ...data,
      id: randomUUID(),
    };

    this.users.push(user);
    return user;
  }
  async findUserByEmail(email: string): Promise<UserDto> {
    const searchUser = this.users.find((user) => user.email === email);

    return searchUser;
  }
  findAll(arenaId: string): Promise<UserDto[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string): Promise<UserDto> {
    throw new Error('Method not implemented.');
  }
  findSchedulesByUser(id: string): Promise<ScheduleDto[]> {
    throw new Error('Method not implemented.');
  }
  async update(id: string, data: UserDto): Promise<UserDto> {
    const updatedList = this.users.map((user) => {
      if (user.id === id) {
        return data;
      } else {
        return user;
      }
    });

    this.users = updatedList;

    const updatedUser = this.users.find((user) => user.id === id);

    return updatedUser;
  }
  remove(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
