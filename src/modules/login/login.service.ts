import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { PrismaService } from '../../infra/database/prisma.service';
import { compare } from 'bcrypt';
import { ILoginReository } from './repositories/login.reository';

@Injectable()
export class LoginService {
  constructor(
    private loginRepository: ILoginReository,
    private jwtService: JwtService,
  ) {}
  async create(createLoginDto: CreateLoginDto) {
    const user = await this.loginRepository.findUserByEmail(createLoginDto);

    if (!user) throw new UnauthorizedException();

    const isEqualPassword = await compare(
      createLoginDto.password,
      user.password,
    );

    if (!isEqualPassword) throw new UnauthorizedException();

    const payload = {
      sub: user.id,
      username: user.nickname,
      profile: user.profile,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }
}
