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
exports.PedidoController = void 0;
const common_1 = require("@nestjs/common");
const pedido_service_1 = require("./pedido.service");
const pedido_dto_1 = require("./dto/pedido.dto");
const user_schema_1 = require("../user/schemas/user.schema");
const passport_1 = require("@nestjs/passport");
const get_user_decorator_1 = require("../user/get-user.decorator");
const http_exception_filter_1 = require("../http-exception.filter");
let PedidoController = class PedidoController {
    constructor(pedidoService) {
        this.pedidoService = pedidoService;
    }
    async CreatePedido(user, pedidoDto) {
        return await this.pedidoService.createPedido(pedidoDto, user);
    }
    async GetPedidos(user) {
        return await this.pedidoService.getPedidos(user);
    }
};
__decorate([
    common_1.Post(),
    __param(0, get_user_decorator_1.GetUser()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User,
        pedido_dto_1.PedidoDto]),
    __metadata("design:returntype", Promise)
], PedidoController.prototype, "CreatePedido", null);
__decorate([
    common_1.Get(),
    __param(0, get_user_decorator_1.GetUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User]),
    __metadata("design:returntype", Promise)
], PedidoController.prototype, "GetPedidos", null);
PedidoController = __decorate([
    common_1.Controller('pedidos'),
    common_1.UseFilters(new http_exception_filter_1.HttpExceptionFilter()),
    common_1.UseGuards(passport_1.AuthGuard()),
    __metadata("design:paramtypes", [pedido_service_1.PedidoService])
], PedidoController);
exports.PedidoController = PedidoController;
//# sourceMappingURL=pedido.controller.js.map