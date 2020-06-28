import {
  Controller,
  Post,
  Put,
  Delete,
  Body,
  UseGuards,
  Get,
  Logger,
} from '@nestjs/common';
import { UserService, userResponse } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './schemas/user.schema';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { DetailsUserDto } from './dto/update-details-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  private logger = new Logger('UserController');
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() createUserdto: CreateUserDto): Promise<User> {
    return await this.userService.CreateUser(createUserdto);
  }

  @Post('/login')
  async Login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ acessToken: string }> {
    return await this.userService.Login(loginUserDto);
  }

  @UseGuards(AuthGuard())
  @Put('/detalhes')
  async updateDetailUser(
    @GetUser() user: User,
    @Body() detailsUserDto: DetailsUserDto,
  ): Promise<userResponse> {
    return await this.userService.UpdateDetailUser(detailsUserDto, user);
  }

  @UseGuards(AuthGuard())
  @Get()
  async GetUser(@GetUser() user: User): Promise<userResponse> {
    const { telefone, nome, pedidos, email } = user;
    const UserResponse: userResponse = { telefone, nome, pedidos, email };
    return await UserResponse;
  }

  @UseGuards(AuthGuard())
  @Put()
  async updateEndeUser(
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<userResponse> {
    return await this.userService.UpdateEndeUser(user, updateUserDto);
  }

  @Delete()
  @UseGuards(AuthGuard())
  async DeleteUser(@GetUser() user: User): Promise<void> {
    return await this.userService.DeleteUser(user);
  }
}