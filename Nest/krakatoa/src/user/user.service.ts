import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DetailsUserDto } from './dto/update-details-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload';
import { compare } from 'bcrypt';

export interface userResponse {
  email: string;
  nome: string;
  pedidos: any;
  telefone: string;
  endereco?: {
    cep: string;
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    complemento: string;
  };
  cpf?: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
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

  async Login(loginUserDto: LoginUserDto): Promise<{ acessToken: string }> {
    const { email, password } = loginUserDto;
    const model = this.userModel;
    const user = await User.findByCredentials(model, email, password);
    if (!user) {
      throw new Error('Usuario Não Encontrado');
    }
    const nome = user.nome !== undefined ? user.nome : 'Usuário';

    const payload: JwtPayload = { email, nome };
    const acessToken = await this.jwtService.sign(payload);
    return { acessToken };
  }

  async UpdateDetailUser(
    detailsUserDto: DetailsUserDto,
    user: User,
  ): Promise<userResponse> {
    const { nome, password, telefone, newPassword } = detailsUserDto;
    const User = user;
    User.nome =
      typeof nome === 'string' && nome !== User.nome ? nome : User.nome;
    User.telefone =
      typeof telefone === 'string' && telefone !== User.telefone
        ? telefone
        : User.telefone;

    if (newPassword !== undefined) {
      const isMatch = await compare(password, User.password);
      User.password = isMatch ? newPassword : User.password;
    }

    const Save = User.save();
    if (Save) {
      const { email, pedidos, nome, telefone } = User;
      const response: userResponse = { email, pedidos, telefone, nome };
      return response;
    }
    throw new Error('Não foi possivel salvar');
  }

  async DeleteUser(user: User): Promise<void> {
    const id = user._id;
    const deleteResult = await this.userModel.deleteOne({ _id: id });
    if (deleteResult) {
      return;
    }
    throw new Error('Não foi possivel apagar o usuário');
  }

  async UpdateEndeUser(
    user: User,
    updateUserDto: UpdateUserDto,
  ): Promise<userResponse> {
    console.log(updateUserDto);
    const User = user;
    const {
      cep,
      estado,
      cidade,
      bairro,
      rua,
      numero,
      complemento,
      nome,
      cpf,
    } = updateUserDto;
    const telefone = updateUserDto.celular;

    if (!User.endereco) {
      User.endereco = { cep, estado, bairro, cidade, complemento, numero, rua };
    } else {
      User.endereco.cep = cep !== User.endereco.cep ? cep : User.endereco.cep;

      User.endereco.complemento =
        complemento !== User.endereco.complemento
          ? complemento
          : User.endereco.complemento;

      User.endereco.estado =
        estado !== User.endereco.estado ? estado : User.endereco.estado;

      User.endereco.cidade =
        cidade !== User.endereco.cidade ? cidade : User.endereco.cidade;

      User.endereco.estado =
        estado !== User.endereco.estado ? estado : User.endereco.estado;

      User.endereco.bairro =
        bairro !== User.endereco.bairro ? bairro : User.endereco.bairro;

      User.endereco.rua = rua !== User.endereco.rua ? rua : User.endereco.rua;

      User.endereco.numero =
        numero !== User.endereco.numero ? numero : User.endereco.numero;
    }

    User.nome =
      typeof nome === 'string' && nome.trim().length > 0 && User.nome !== nome
        ? nome
        : User.nome;

    User.telefone =
      typeof telefone === 'string' &&
      telefone.trim().length === 11 &&
      User.telefone !== telefone
        ? telefone
        : User.telefone;

    User.cpf = cpf !== User.cpf ? cpf : User.cpf;

    const save = await User.save();
    if (save) {
      const UserResponse: userResponse = {
        email: User.email,
        nome,
        pedidos: User.pedidos,
        telefone,
        endereco: User.endereco,
        cpf,
      };
      return UserResponse;
    }
    throw new Error('Não foi possivel Salvar');
  }
}
