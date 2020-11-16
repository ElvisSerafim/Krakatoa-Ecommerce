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
exports.ProdutoSchema = exports.Produto = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Produto = class Produto extends mongoose_2.Document {
};
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Produto.prototype, "nome", void 0);
__decorate([
    mongoose_1.Prop({ required: true, min: 0 }),
    __metadata("design:type", Number)
], Produto.prototype, "preco", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Produto.prototype, "tipo", void 0);
__decorate([
    mongoose_1.Prop({ required: true, default: ['Único'] }),
    __metadata("design:type", Array)
], Produto.prototype, "tamanho", void 0);
__decorate([
    mongoose_1.Prop({ required: true, default: false }),
    __metadata("design:type", Boolean)
], Produto.prototype, "promocao", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", Array)
], Produto.prototype, "imagens", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Number)
], Produto.prototype, "precoPromo", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Produto.prototype, "categoria", void 0);
__decorate([
    mongoose_1.Prop({ required: true, min: 10 }),
    __metadata("design:type", String)
], Produto.prototype, "descricao", void 0);
__decorate([
    mongoose_1.Prop({ default: 0 }),
    __metadata("design:type", Number)
], Produto.prototype, "vendas", void 0);
__decorate([
    mongoose_1.Prop(),
    __metadata("design:type", Object)
], Produto.prototype, "quantidade", void 0);
Produto = __decorate([
    mongoose_1.Schema({ timestamps: true, toJSON: { virtuals: true } })
], Produto);
exports.Produto = Produto;
exports.ProdutoSchema = mongoose_1.SchemaFactory.createForClass(Produto);
//# sourceMappingURL=produto.schema.js.map