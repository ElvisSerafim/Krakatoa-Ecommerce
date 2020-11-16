"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoModule = void 0;
const common_1 = require("@nestjs/common");
const pedido_controller_1 = require("./pedido.controller");
const pedido_service_1 = require("./pedido.service");
const mongoose_1 = require("@nestjs/mongoose");
const pedido_schema_1 = require("./schemas/pedido.schema");
const produto_schema_1 = require("../produto/schemas/produto.schema");
const user_schema_1 = require("../user/schemas/user.schema");
const user_module_1 = require("../user/user.module");
let PedidoModule = class PedidoModule {
};
PedidoModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: pedido_schema_1.Pedido.name, schema: pedido_schema_1.PedidoSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: produto_schema_1.Produto.name, schema: produto_schema_1.ProdutoSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            user_module_1.UserModule,
        ],
        controllers: [pedido_controller_1.PedidoController],
        providers: [pedido_service_1.PedidoService],
    })
], PedidoModule);
exports.PedidoModule = PedidoModule;
//# sourceMappingURL=pedido.module.js.map