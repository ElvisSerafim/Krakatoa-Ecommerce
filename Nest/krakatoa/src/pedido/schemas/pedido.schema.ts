import mongoose, { SchemaTypes, Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Pedido extends Document {
  @Prop({ required: true })
  precoTotal: number;

  @Prop({ required: true })
  frete: number;

  @Prop()
  user: { type: mongoose.Types.ObjectId; ref: 'User' };

  @Prop()
  produtos: [
    {
      Produto_id: { type: mongoose.Types.ObjectId; ref: 'Produto' };
      quantidadePedido: number;
      tamanhoEscolhido: string;
      corEscolhida: string;
    },
  ];

  @Prop()
  metodo: string;
}

export const PedidoSchema = SchemaFactory.createForClass(Pedido);
