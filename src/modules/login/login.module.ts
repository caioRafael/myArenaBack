import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PrismaService } from '../../infra/database/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'efrpfewpfwp3ojr4mfkmdsçamf4mi45m34040495949',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService, PrismaService],
})
export class LoginModule {}
