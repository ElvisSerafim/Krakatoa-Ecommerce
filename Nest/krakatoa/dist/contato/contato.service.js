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
exports.ContatoService = void 0;
const common_1 = require("@nestjs/common");
const contato_schema_1 = require("./schemas/contato.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let ContatoService = class ContatoService {
    constructor(contatoModel) {
        this.contatoModel = contatoModel;
    }
    async createContato(createContatoDto) {
        const createdContato = await new this.contatoModel(createContatoDto);
        if (createdContato) {
            return;
        }
        throw new Error('Não foi possivel salvar o contato');
    }
};
ContatoService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel(contato_schema_1.Contato.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], ContatoService);
exports.ContatoService = ContatoService;
//# sourceMappingURL=contato.service.js.map