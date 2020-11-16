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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const login_user_dto_1 = require("./dto/login-user.dto");
const user_schema_1 = require("./schemas/user.schema");
const passport_1 = require("@nestjs/passport");
const get_user_decorator_1 = require("./get-user.decorator");
const update_details_user_dto_1 = require("./dto/update-details-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const http_exception_filter_1 = require("../http-exception.filter");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(createUserdto) {
        return await this.userService.CreateUser(createUserdto);
    }
    async Login(loginUserDto) {
        return await this.userService.Login(loginUserDto);
    }
    async Forgot(email) {
        await this.userService.Forgot(email);
    }
    async Recover(id, newPassword) {
        return this.userService.Recover(id, newPassword);
    }
    async updateDetailUser(user, detailsUserDto) {
        await this.userService.UpdateDetailUser(detailsUserDto, user);
        return;
    }
    async GetUser(user) {
        const { telefone, nome, pedidos, email, endereco, cpf } = user;
        const UserResponse = {
            telefone,
            nome,
            cpf,
            pedidos,
            email,
            endereco,
        };
        return await UserResponse;
    }
    async updateEndeUser(user, updateUserDto) {
        await this.userService.UpdateEndeUser(user, updateUserDto);
        return;
    }
};
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    common_1.Post('/login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "Login", null);
__decorate([
    common_1.Post('/forgot'),
    __param(0, common_1.Body('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "Forgot", null);
__decorate([
    common_1.Post('/recover'),
    __param(0, common_1.Body('token')),
    __param(1, common_1.Body('newPassword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "Recover", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard()),
    common_1.Put('/detalhes'),
    __param(0, get_user_decorator_1.GetUser()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User,
        update_details_user_dto_1.DetailsUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateDetailUser", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard()),
    common_1.Get(),
    __param(0, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "GetUser", null);
__decorate([
    common_1.UseGuards(passport_1.AuthGuard()),
    common_1.Put(),
    __param(0, get_user_decorator_1.GetUser()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User,
        update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateEndeUser", null);
UserController = __decorate([
    common_1.UseFilters(new http_exception_filter_1.HttpExceptionFilter()),
    common_1.Controller('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map