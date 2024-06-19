import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository';

@Injectable()
export class FindSchedulesUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string) {
    return await this.userRepository.findSchedulesByUser(id);
  }
}
