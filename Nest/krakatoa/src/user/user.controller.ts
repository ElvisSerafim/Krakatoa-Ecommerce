import { Controller, Post, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  /*   constructor(private userService: UserService) {}
  @Post()
  createUser(createUserdto: CreateUserDto) {
    this.userService.CreateUser(createUserdto);
  }
  @Post()
  Login(createUserdto: CreateUserDto): User {
    this.userService.Login(createUserdto);
  }
  @Post()
  Logout(createUserdto: CreateUserDto) {
    this.userService.Logout();
  }
  @Put()
  updateUser() {
    this.userService.UpdateUser();
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
