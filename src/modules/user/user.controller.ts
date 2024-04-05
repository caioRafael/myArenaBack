import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from 'src/infra/providers/auth-guard.provider';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import {
  CreateUserSchemaDTO,
  CreateUserSchema,
} from './schema/create-user.schema';
import { zodToOpenAPI } from 'nestjs-zod';

const userSchemaSwagger = zodToOpenAPI(CreateUserSchema);

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({
    schema: userSchemaSwagger,
  })
  create(@Body() createUserDto: CreateUserSchemaDTO) {
    return this.userService.create(createUserDto as UserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('arena/:arenaId')
  findAll(@Param('arenaId') arenaId: string) {
    return this.userService.findAll(arenaId);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('schedule/:id')
  findSchedulesByUser(@Param('id') id: string) {
    return this.userService.findSchedulesByUser(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
