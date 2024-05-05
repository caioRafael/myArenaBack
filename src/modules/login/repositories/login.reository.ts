import { UserDto } from 'src/modules/arena/dto/arena.dto';
import { CreateLoginDto } from '../dto/create-login.dto';

export abstract class ILoginReository {
  abstract findUserByEmail(credentials: CreateLoginDto): Promise<UserDto>;
}
