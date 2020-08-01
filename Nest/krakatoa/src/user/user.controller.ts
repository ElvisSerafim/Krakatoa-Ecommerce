import {
  Controller,
  Post,
  Put,
  Delete,
  Body,
  UseGuards,
  Get,
  Logger,
  Param,
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
  async createUser(
    @Body() createUserdto: CreateUserDto,
  ): Promise<{ accessToken: string }> {
    return await this.userService.CreateUser(createUserdto);
  }

  @Post('/login')
  async Login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ accessToken: string }> {
    return await this.userService.Login(loginUserDto);
  }

  @Post('/forgot')
  async Forgot(@Body('email') email: string): Promise<void> {
    await this.userService.Forgot(email);
  }

  @Post('/recover/:id')
  async Recover(
    @Body('token') id: string,
    @Body('newPassword') newPassword: string,
  ): Promise<{ accessToken: string }> {
    return this.userService.Recover(id, newPassword);
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
    const { telefone, nome, pedidos, email,endereco } = user;
    const UserResponse: userResponse = { telefone, nome, pedidos, email,endereco };
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
