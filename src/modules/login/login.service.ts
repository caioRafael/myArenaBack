import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { PrismaService } from '../../infra/database/prisma.service';
import { compare } from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  async create(createLoginDto: CreateLoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: createLoginDto.email,
      },
    });

    if (!user) throw new UnauthorizedException();

    const isEqualPassword = await compare(
      createLoginDto.password,
      user.password,
    );

    if (!isEqualPassword) throw new UnauthorizedException();

    const payload = {
      sub: user.id,
      username: user.nickname,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
    };
  }
}
