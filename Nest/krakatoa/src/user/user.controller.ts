import {
  Controller,
  Post,
  Put,
  Body,
  UseGuards,
  Get,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { userResponse } from '../utils/types';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './schemas/user.schema';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { DetailsUserDto } from './dto/update-details-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpExceptionFilter } from '../http-exception.filter';

@UseFilters(new HttpExceptionFilter())
@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

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

  @Post('/recover')
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
  ): Promise<void> {
    await this.userService.UpdateDetailUser(detailsUserDto, user);
    return;
  }

  @UseGuards(AuthGuard())
  @Get()
  async GetUser(@GetUser() user: User): Promise<userResponse> {
    const { telefone, nome, pedidos, email, endereco, cpf } = user;
    const UserResponse: userResponse = {
      telefone,
      nome,
      cpf,
      pedidos,
      email,
      endereco,
    };
    return await UserResponse;
  }

  @UseGuards(AuthGuard())
  @Put()
  async updateEndeUser(
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    await this.userService.UpdateEndeUser(user, updateUserDto);
    return;
  }

}
