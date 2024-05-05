import { Test } from '@nestjs/testing';
import { UserService } from '../user.service';
import { IUserRepository } from '../repositories/user.repository';
import UserInMemoryRepository from '../repositories/in-memory/user-in-memory.repository';
import { UserDto } from '../dto/user.dto';

describe('update user test', () => {
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

  it('shoud ble able to update user', async () => {
    const data: UserDto = {
      email: 'usertest@email.com',
      name: 'user test',
      nickname: 'user',
      password: 'usertest123',
      phone: '+55(84)99929-2307',
      profile: 'CLIENT',
    };

    const result = await userService.create(data);

    const updatedUser = {
      ...result,
      name: 'New user test',
    };

    const updatedResult = await userService.update(result.id, updatedUser);

    expect(updatedResult).toEqual(updatedUser);
  });
});
