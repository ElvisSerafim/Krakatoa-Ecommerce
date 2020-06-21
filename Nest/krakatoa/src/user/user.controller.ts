import {
  Controller,
  Post,
  Put,
  Delete,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserdto: CreateUserDto): Promise<User> {
    return await this.userService.CreateUser(createUserdto);
  }
  /*  @Put()
  updateUser() {
    this.userService.UpdateUser();
  } */
  /* @Post()
  Login(createUserdto: CreateUserDto): User {
    this.userService.Login(createUserdto);
  }
  @Post()
  Logout(createUserdto: CreateUserDto) {
    this.userService.Logout();
  }
  @Put()
  updateUserEnde() {
    this.userService.UpdateUserEnde();
  }
  @Delete()
  deleteUser() {
    this.userService.DeleteUser();
  } */
}
