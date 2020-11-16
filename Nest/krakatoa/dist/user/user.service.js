"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("bcrypt");
const Jwt = require("jsonwebtoken");
const uuidv4_1 = require("uuidv4");
const mailjet = require('node-mailjet').connect('9b4c4b2356385d8f352b67ad0813b60c', '5fa302479fd049e12e0a763f9973aa07');
let UserService = class UserService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger('User Service');
    }
    async Recover(token, newPassword) {
        try {
            const DecodedToken = Jwt.decode(token);
            const { email } = DecodedToken;
            const user = await this.userModel.findOne({ email: email });
            const id = user.resetId;
            const teste = Jwt.verify(token, id);
            if (teste !== undefined) {
                user.password = newPassword;
                user.resetId = undefined;
                await user.save();
                const payload = { email, nome: user.nome };
                const accessToken = Jwt.sign(payload, id, { expiresIn: 3600000 });
                return { accessToken };
            }
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Token Invalido');
        }
    }
    async Forgot(email) {
        const user = await this.userModel.findOne({ email: email });
        if (user) {
            const id = uuidv4_1.uuid();
            user.resetId = id;
            await user.save();
            const payload = { email };
            const recoverToken = Jwt.sign(payload, id, { expiresIn: 3600000 });
            const request = mailjet.post('send', { version: 'v3.1' }).request({
                Messages: [
                    {
                        From: {
                            Email: 'recover@testekrakatoa.tk',
                            Name: 'Krakatoa',
                        },
                        To: [
                            {
                                Email: email,
                                Name: user.nome,
                            },
                        ],
                        TemplateID: 1602027,
                        TemplateLanguage: true,
                        Subject: 'Recuperação de Senha',
                        Variables: {
                            user: user.nome,
                            token: recoverToken,
                        },
                    },
                ],
            });
            request
                .then(result => {
                console.log(result.body);
            })
                .catch(err => {
                console.log(err.statusCode);
            });
        }
    }
    async CreateUser(createUserDto) {
        try {
            const createdUser = new this.userModel(createUserDto);
            if (createdUser) {
                await createdUser.save();
                const { email, nome } = createdUser;
                const payload = { email, nome };
                const accessToken = this.jwtService.sign(payload);
                return { accessToken };
            }
        }
        catch (error) {
            this.logger.log(error);
            if (error.name.length > 1) {
                throw new common_1.ConflictException('Usuario já existe');
            }
            throw new common_1.InternalServerErrorException('Erro no Salvar');
        }
    }
    async Login(loginUserDto) {
        const { email, password } = loginUserDto;
        const model = this.userModel;
        const user = await user_schema_1.User.findByCredentials(model, email, password);
        if (!user) {
            throw new Error('Usuario Não Encontrado');
        }
        const nome = user.nome !== undefined ? user.nome : 'Usuário';
        const payload = { email, nome };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }
    async UpdateDetailUser(detailsUserDto, user) {
        const { nome, password, telefone, newPassword } = detailsUserDto;
        const User = user;
        User.nome =
            typeof nome === 'string' && nome !== User.nome ? nome : User.nome;
        User.telefone =
            typeof telefone === 'string' && telefone !== User.telefone
                ? telefone
                : User.telefone;
        if (newPassword !== undefined) {
            const isMatch = await bcrypt_1.compare(password, User.password);
            User.password = isMatch ? newPassword : User.password;
        }
        const Save = User.save();
        if (Save) {
            return;
        }
        throw new Error('Não foi possivel salvar');
    }
    async UpdateEndeUser(user, updateUserDto) {
        const UserUp = user;
        const { cep, estado, cidade, bairro, rua, numero, complemento, cpf, nome, telefone, } = updateUserDto;
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
        }
        else {
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
        if (nome) {
            UserUp.nome = nome !== UserUp.nome ? nome : UserUp.nome;
        }
        if (telefone) {
            UserUp.telefone =
                telefone !== UserUp.telefone ? telefone : UserUp.telefone;
        }
        UserUp.cpf = cpf !== UserUp.cpf ? cpf : UserUp.cpf;
        const save = await UserUp.save();
        if (save) {
            return;
        }
        throw new Error('Não foi possivel Salvar');
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map