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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoSchema = exports.Pedido = void 0;
const mongoose_1 = require("mongoose");
const NestMongo = require("@nestjs/mongoose");
let Pedido = class Pedido extends mongoose_1.Document {
};
__decorate([
    NestMongo.Prop({ required: true }),
    __metadata("design:type", Number)
], Pedido.prototype, "precoTotal", void 0);
__decorate([
    NestMongo.Prop({ required: true }),
    __metadata("design:type", Number)
], Pedido.prototype, "frete", void 0);
__decorate([
    NestMongo.Prop({
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    }),
    __metadata("design:type", mongoose_1.Schema.Types.ObjectId)
], Pedido.prototype, "user", void 0);
__decorate([
    NestMongo.Prop(NestMongo.raw([
        {
            Produto_id: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Produto',
                autopopulate: true,
            },
            quantidadePedido: { type: Number, required: true },
            tamanhoEscolhido: { type: String, required: true },
        },
    ])),
    __metadata("design:type", Object)
], Pedido.prototype, "produtos", void 0);
__decorate([
    NestMongo.Prop({ required: true }),
    __metadata("design:type", String)
], Pedido.prototype, "metodo", void 0);
__decorate([
    NestMongo.Prop({ required: true }),
    __metadata("design:type", String)
], Pedido.prototype, "idPagamento", void 0);
__decorate([
    NestMongo.Prop({ required: true }),
    __metadata("design:type", String)
], Pedido.prototype, "idPedido", void 0);
Pedido = __decorate([
    NestMongo.Schema({ timestamps: true, toJSON: { virtuals: true } })
], Pedido);
exports.Pedido = Pedido;
exports.PedidoSchema = NestMongo.SchemaFactory.createForClass(Pedido).plugin(require('mongoose-autopopulate'));
//# sourceMappingURL=pedido.schema.js.map