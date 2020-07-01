import { Model } from 'mongoose';
import {
  Injectable,
  Logger,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DetailsUserDto } from './dto/update-details-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload';
import { compare } from 'bcrypt';
import * as Jwt from 'jsonwebtoken';
import { uuid } from 'uuidv4';
import { Mail } from './mail/nodemailer';

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

export interface tokenDecode {
  email: string;
  iat: number;
  exp: number;
}

@Injectable()
export class UserService {
  private logger = new Logger('User Service');
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async Recover(
    token: string,
    newPassword: string,
  ): Promise<{ acessToken: string }> {
    try {
      const DecodedToken = Jwt.decode(token) as tokenDecode;
      const { email } = DecodedToken;
      const user = await this.userModel.findOne({ email: email });
      const id = user.resetId;
      const teste = Jwt.verify(token, id);
      if (teste !== undefined) {
        user.password = newPassword;
        user.resetId = undefined;
        await user.save();
        const payload: JwtPayload = { email, nome: user.nome };
        const acessToken = Jwt.sign(payload, id, { expiresIn: 3600000 });
        return { acessToken };
      }
    } catch (error) {
      throw new UnauthorizedException('Token Invalido');
    }
  }

  async Forgot(email: string): Promise<void> {
    this.logger.log(email);
    const user = await this.userModel.findOne({ email: email });
    if (user) {
      const id = uuid();
      user.resetId = id;
      await user.save();
      const payload = { email };
      const recoverToken = Jwt.sign(payload, id, { expiresIn: 3600000 });
      const mail = new Mail(
        email,
        'Recuperar Senha',
        `http://localhost:3000/user/recover/${recoverToken}`,
      );
      const resultado = await mail.sendMail();
      this.logger.log(resultado);
      /* if (resultado.length > 2) {
        throw new Error('Não Foi possivel enviar email');
      } */
      console.log(recoverToken);
    }
  }

  async CreateUser(
    createUserDto: CreateUserDto,
  ): Promise<{ acessToken: string }> {
    try {
      const createdUser = new this.userModel(createUserDto);
      if (createdUser) {
        await createdUser.save();
        const { email, nome } = createdUser;
        const payload: JwtPayload = { email, nome };
        const acessToken = this.jwtService.sign(payload);
        return { acessToken };
      }
    } catch (error) {
      this.logger.log(error);
      if (error.name.length > 1) {
        throw new ConflictException('Usuario já existe');
      }
      throw new InternalServerErrorException('Erro no Salvar');
    }
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
    const acessToken = this.jwtService.sign(payload);
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
