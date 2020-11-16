import { Document } from 'mongoose';
export declare class Contato extends Document {
    nome: string;
    email: string;
    assunto: string;
    mensagem: string;
}
export declare const ContatoSchema: import("mongoose").Schema<any>;
