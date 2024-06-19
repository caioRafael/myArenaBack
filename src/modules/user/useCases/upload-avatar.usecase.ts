import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository';
import { IStorage } from 'src/infra/providers/storage/storage';
import { FileDto } from '../dto/user.dto';

@Injectable()
export class UploadAvatarUseCase {
  constructor(
    private userRepository: IUserRepository,
    private storage: IStorage,
  ) {}

  async execute(file: FileDto, id: string) {
    const avatarUrl = await this.storage.upload(file);

    if (!avatarUrl)
      throw new HttpException(
        'Não foi possivel atualizar seu perfil',
        HttpStatus.BAD_REQUEST,
      );

    return await this.userRepository.upload(avatarUrl, id);
  }
}
