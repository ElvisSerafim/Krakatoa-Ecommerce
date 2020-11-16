import { Document, SchemaTypes, Model } from 'mongoose';
export declare class User extends Document {
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    resetId: string;
    password: string;
    endereco: {
        cep: string;
        estado: string;
        cidade: string;
        bairro: string;
        rua: string;
        numero: string;
        complemento: string;
    };
    pedidos: [{
        type: typeof SchemaTypes.ObjectId;
        ref: 'Produto';
    }];
    static findByCredentials: (model: Model<User>, email: string, password: string) => Promise<User>;
}
export declare const UserSchema: import("mongoose").Schema<any>;
