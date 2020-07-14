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
  ): Promise<{ accessToken: string }> {
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
        const accessToken = Jwt.sign(payload, id, { expiresIn: 3600000 });
        return { accessToken };
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
  ): Promise<{ accessToken: string }> {
    try {
      const createdUser = new this.userModel(createUserDto);
      if (createdUser) {
        await createdUser.save();
        const { email, nome } = createdUser;
        const payload: JwtPayload = { email, nome };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
      }
    } catch (error) {
      this.logger.log(error);
      if (error.name.length > 1) {
        throw new ConflictException('Usuario já existe');
      }
      throw new InternalServerErrorException('Erro no Salvar');
    }
  }

  async Login(loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    const { email, password } = loginUserDto;
    const model = this.userModel;
    const user = await User.findByCredentials(model, email, password);
    if (!user) {
      throw new Error('Usuario Não Encontrado');
    }

    const nome = user.nome !== undefined ? user.nome : 'Usuário';
    const payload: JwtPayload = { email, nome };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
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
    let UserUp = user;
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
      telefone,
    } = updateUserDto;

    if (!UserUp.endereco) {
      UserUp.endereco = {
        cep,
        estado,
        bairro,
        cidade,
        complemento,
        numero,
        rua,
      };
    } else {
      const endereco = {
        cep,
        complemento,
        estado,
        bairro,
        cidade,
        numero,
        rua,
      };
      endereco.cep = cep !== UserUp.endereco.cep ? cep : UserUp.endereco.cep;

      endereco.complemento =
        complemento !== UserUp.endereco.complemento
          ? complemento
          : UserUp.endereco.complemento;

      endereco.estado =
        estado !== UserUp.endereco.estado ? estado : UserUp.endereco.estado;

      endereco.cidade =
        cidade !== UserUp.endereco.cidade ? cidade : UserUp.endereco.cidade;

      endereco.estado =
        estado !== UserUp.endereco.estado ? estado : UserUp.endereco.estado;

      endereco.bairro =
        bairro !== UserUp.endereco.bairro ? bairro : UserUp.endereco.bairro;

      endereco.rua = rua !== UserUp.endereco.rua ? rua : UserUp.endereco.rua;

      endereco.numero =
        numero !== UserUp.endereco.numero ? numero : UserUp.endereco.numero;
      UserUp.endereco = endereco;
    }

    UserUp.nome =
      typeof nome === 'string' && nome.trim().length > 0 && UserUp.nome !== nome
        ? nome
        : UserUp.nome;

    UserUp.telefone =
      typeof telefone === 'string' &&
      telefone.trim().length >= 11 &&
      UserUp.telefone !== telefone
        ? telefone
        : UserUp.telefone;

    UserUp.cpf = cpf !== UserUp.cpf ? cpf : UserUp.cpf;
    /*     console.log(UserUp);
     */
    const save = await UserUp.save();
    console.log(save);

    if (save) {
      const UserResponse: userResponse = {
        email: UserUp.email,
        nome,
        pedidos: UserUp.pedidos,
        telefone,
        endereco: UserUp.endereco,
        cpf,
      };
      return UserResponse;
    }
    throw new Error('Não foi possivel Salvar');
  }
}
