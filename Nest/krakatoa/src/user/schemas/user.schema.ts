import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class User extends Document {
  @Prop({ trim: true })
  nome: string;
  @Prop({ unique: true, require: true })
  email: string;

  @Prop()
  cpf: string;

  @Prop()
  telefone: string;

  @Prop({ require: true })
  password: string;
  @Prop()
  endereco: {
    cep: string;
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: string;
    complemento: string;
  };
  @Prop()
  pedidos: [typeof SchemaTypes.ObjectId];
  static findByCredentials = async function(
    model: Model<User>,
    email: string,
    password: string,
  ): Promise<User> {
    try {
      const user = await model.collection.findOne({ email });
      if (!user) {
        throw new Error('Usuario não encontrado');
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error('Senha Invalida');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Senha Invalida');
    }
  };
}
export const UserSchema = SchemaFactory.createForClass(User);
