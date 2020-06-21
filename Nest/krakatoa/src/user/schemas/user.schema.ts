import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import * as bcrypt from 'bcrypt';

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
    cep: number;
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    numero: number;
    complemento: string;
  };
  @Prop(
    raw({
      pedidos: [
        {
          type: SchemaTypes.ObjectId,
          ref: 'Pedidos',
        },
      ],
    }),
  )
  pedidos: Record<string, any>;
  @Prop(
    raw({
      tokens: [
        {
          token: {
            type: String,
            required: true,
          },
        },
      ],
    }),
  )
  tokens: Record<string, any>;
  static findByCredentials = async (
    email: string,
    password: string,
  ): Promise<User> => {
    const user = await User.prototype.collection.findOne({ email });
    if (!user) {
      throw new Error('Usuario não encontrado');
    }
    const passwordMatch = await bcrypt.compare(
      password,
      User.prototype.password,
    );
    if (!passwordMatch) {
      throw new Error('Senha Invalida');
    }
    return user;
  };
}
export const UserSchema = SchemaFactory.createForClass(User);
