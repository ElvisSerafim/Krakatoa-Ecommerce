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
exports.ContatoSchema = exports.Contato = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Contato = class Contato extends mongoose_2.Document {
};
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Contato.prototype, "nome", void 0);
__decorate([
    mongoose_1.Prop({ required: true }),
    __metadata("design:type", String)
], Contato.prototype, "email", void 0);
__decorate([
    mongoose_1.Prop({ required: true, max: 255, min: 10 }),
    __metadata("design:type", String)
], Contato.prototype, "assunto", void 0);
__decorate([
    mongoose_1.Prop({ required: true, max: 512, min: 10 }),
    __metadata("design:type", String)
], Contato.prototype, "mensagem", void 0);
Contato = __decorate([
    mongoose_1.Schema({ timestamps: true, toJSON: { virtuals: true } })
], Contato);
exports.Contato = Contato;
exports.ContatoSchema = mongoose_1.SchemaFactory.createForClass(Contato);
//# sourceMappingURL=contato.schema.js.map