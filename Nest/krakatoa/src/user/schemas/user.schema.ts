import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  nome: {
    type: string;
    trim: true;
  };
  @Prop()
  email: {
    type: string;
    unique: true;
    require: true;
    validate: (
      value,
    ) => {
      /*       if (!validator.isEmail(value)) {
        throw new Error('Email Invalido' );
      } */
    };
  };
  @Prop()
  cpf: {
    type: string;
  };
  @Prop()
  telefone: {
    type: string;
  };
  @Prop()
  password: {
    type: string;
    required: true;
  };
  @Prop()
  endereco: {
    cep: number;
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: number;
    complemento: string;
  };

  @Prop()
  pedidos: [{ type: SchemaTypes.ObjectId; ref: 'Pedido' }];
  @Prop()
  tokens: [
    {
      token: {
        type: string;
        required: true;
      };
    },
  ];
  timestamps: true;
}
export const UserSchema = SchemaFactory.createForClass(User);
