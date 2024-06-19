import { UpdateUserUseCase } from './useCases/update-user.usecase';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Put,
  Request,
} from '@nestjs/common';
import { FileDto, UserDto } from './dto/user.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import {
  CreateUserSchemaDTO,
  CreateUserSchema,
} from './schema/create-user.schema';
import { zodToOpenAPI } from 'nestjs-zod';
import { AuthGuard } from '../../infra/providers/auth-guard.provider';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserUseCase } from './useCases/create-user.usecase';
import { FindUserByIdUseCase } from './useCases/find-user-by-id.usecase';
import { FindSchedulesUserUseCase } from './useCases/find-schedules-user.usecase';
import { DeleteUserUseCase } from './useCases/delete-user.usecase';
import { UploadAvatarUseCase } from './useCases/upload-avatar.usecase';
import { DeleteAvatarUseCase } from './useCases/delete-avatar.usecase';

const userSchemaSwagger = zodToOpenAPI(CreateUserSchema);

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    // private userService: UserService,
    private createUserUseCase: CreateUserUseCase,
    private findUserByIdUseCase: FindUserByIdUseCase,
    private findSchedulesUserUseCase: FindSchedulesUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    private uploadAvatarUseCase: UploadAvatarUseCase,
    private deleteAvatarUseCase: DeleteAvatarUseCase,
  ) {}

  @Post()
  @ApiBody({
    schema: userSchemaSwagger,
  })
  create(@Body() createUserDto: CreateUserSchemaDTO) {
    return this.createUserUseCase.execute(createUserDto as UserDto);
  }

  //passar para modulo de arena
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard)
  // @Get('arena/:arenaId')
  // findAll(@Param('arenaId') arenaId: string) {
  //   return this.userService.findAll(arenaId);
  // }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  findOne(@Request() request) {
    return this.findUserByIdUseCase.execute(request.user.sub);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('schedule/')
  findSchedulesByUser(@Request() request) {
    return this.findSchedulesUserUseCase.execute(request.user.sub);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Request() request, @Body() updateUserDto: UserDto) {
    return this.updateUserUseCase.execute(request.user.sub, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete()
  remove(@Request() request) {
    return this.deleteUserUseCase.execute(request.user.sub);
  }

  //falta adicionar url no banco
  @Put('upload')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: FileDto, @Request() request) {
    return await this.uploadAvatarUseCase.execute(file, request.user.sub);
  }

  @Put('delete-avatar')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async deleteAvatar(@Body() fileUrl: { fileUrl: string }, @Request() request) {
    return await this.deleteAvatarUseCase.execute(
      request.user.sub,
      fileUrl.fileUrl,
    );
  }
}
