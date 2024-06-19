import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PrismaService } from '../../infra/database/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ILoginReository } from './repositories/login.reository';
import LoginrismaRepository from './repositories/prisma/login.prisma.repository';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'efrpfewpfwp3ojr4mfkmdsçamf4mi45m34040495949',
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [LoginController],
  providers: [
    LoginService,
    PrismaService,
    {
      provide: ILoginReository,
      useClass: LoginrismaRepository,
    },
  ],
})
export class LoginModule {}
