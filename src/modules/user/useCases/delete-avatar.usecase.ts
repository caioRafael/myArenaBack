import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository';
import { IStorage } from 'src/infra/providers/storage/storage';

@Injectable()
export class DeleteAvatarUseCase {
  constructor(
    private userRepository: IUserRepository,
    private storage: IStorage,
  ) {}

  async execute(id: string, fileUrl: string) {
    await this.storage.delete(fileUrl);

    await this.userRepository.deleteAvatar(id);
  }
}
