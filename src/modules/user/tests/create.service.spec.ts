import { Test } from '@nestjs/testing';
import { UserService } from '../user.service';
import { UserDto } from '../dto/user.dto';
import { IUserRepository } from '../repositories/user.repository';
import UserInMemoryRepository from '../repositories/in-memory/user-in-memory.repository';

describe('test create new user', () => {
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: IUserRepository,
          useClass: UserInMemoryRepository,
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
  });

  it('should be able create a new user', async () => {
    const data: UserDto = {
      email: 'usertest@email.com',
      name: 'user test',
      nickname: 'user',
      password: 'usertest123',
      phone: '+55(84)99929-2307',
      profile: 'CLIENT',
    };

    const result = await userService.create(data);

    expect(result).toHaveProperty('id');
  });

  it('should not be able to create a new user if email already exist', async () => {
    const data: UserDto = {
      email: 'user-email-test@email.com',
      name: 'user test',
      nickname: 'user',
      password: 'usertest123',
      phone: '+55(84)99929-2307',
      profile: 'CLIENT',
    };

    await userService.create(data);
    expect(userService.create(data)).rejects.toThrowError();
  });
});
