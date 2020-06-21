import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async CreateUser(createUserDto: CreateUserDto): Promise<User> {
    const { email } = createUserDto;
    let createdUser = await this.userModel.findOne({ email });
    if (!createdUser) {
      createdUser = await new this.userModel(createUserDto);
      if (createdUser) {
        return createdUser.save();
      }
      throw new Error('Erro ao salvar o usuario');
    }
    throw new Error('Usuario já existe');
  }
  /*   Login() {}
  UpdateUser() {}
  UpdateUserEnde() {}
  Logout() {}
  DeleteUser() { */
}
