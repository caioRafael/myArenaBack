import { Test } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { UserDto } from '../dto/user.dto';
import { CreateUserSchemaDTO } from '../schema/create-user.schema';
import { IUserRepository } from '../repositories/user.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import UserInMemoryRepository from '../repositories/in-memory/user-in-memory.repository';

describe('user controller', () => {
  let userController: UserController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [JwtModule],
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: IUserRepository,
          useClass: UserInMemoryRepository,
        },
      ],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
  });

  it('shoud be able a create a new user', async () => {
    const body: CreateUserSchemaDTO = {
      email: 'usertest@email.com',
      name: 'user test',
      nickname: 'user',
      password: 'usertest123',
      phone: '+55(84)99929-2307',
      profile: 'CLIENT',
    };
    const result = await userController.create(body);

    expect(result).toHaveProperty('id');
  });
});
