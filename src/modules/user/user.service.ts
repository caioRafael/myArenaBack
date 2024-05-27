import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FileDto, UserDto } from './dto/user.dto';
import { hash } from 'bcrypt';
import { IUserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: IUserRepository) {}
  async create(createUserDto: UserDto) {
    const user = await this.userRepository.findUserByEmail(createUserDto.email);

    if (user)
      throw new HttpException('Usuário ja existe', HttpStatus.BAD_REQUEST);

    if (
      (createUserDto.profile === 'EMPLOYEE' ||
        createUserDto.profile === 'ADMINISTRATOR') &&
      (createUserDto.arenaId === undefined || createUserDto.arenaId === null)
    ) {
      throw new HttpException(
        'Perfil de funcionário precisa estar vinculado a uma emrpesa',
        HttpStatus.BAD_REQUEST,
      );
    }

    const password = await hash(createUserDto.password, 10);

    const data = {
      ...createUserDto,
      password,
    };

    const newUser = await this.userRepository.create(data);

    return newUser;
  }

  async findAll(arenaId: string) {
    const users = await this.userRepository.findAll(arenaId);

    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne(id);

    return user;
  }

  async findSchedulesByUser(id: string) {
    const schedules = await this.userRepository.findSchedulesByUser(id);

    return schedules;
  }

  async update(id: string, updateUserDto: UserDto) {
    const user = await this.userRepository.update(id, updateUserDto);

    return user;
  }

  async remove(id: string) {
    await this.userRepository.remove(id);
  }

  async upload(file: FileDto, userId: string) {
    const user = await this.userRepository.upload(file, userId);

    return user;
  }

  async deleteAvatar(userId: string, fileUrl: string) {
    await this.userRepository.deleteAvatar(userId, fileUrl);
  }
}
