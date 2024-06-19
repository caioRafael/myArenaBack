import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';
import { LoginSchema, LoginSchemaDTO } from './schema/login.schema';

const loginSchemaSwagger = zodToOpenAPI(LoginSchema);

@ApiTags('login')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @ApiBody({
    description: 'login',
    schema: loginSchemaSwagger,
  })
  create(@Body() createLoginDto: LoginSchemaDTO) {
    return this.loginService.create(createLoginDto as CreateLoginDto);
  }
}
