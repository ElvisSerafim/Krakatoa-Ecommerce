import mongoose, { SchemaTypes, Document } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Pedido extends Document {
  @Prop({ required: true })
  precoTotal: number;

  @Prop({ required: true })
  frete: number;

  @Prop()
  user: typeof SchemaTypes.ObjectId;

  @Prop()
  produtos: [
    {
      Produto_id: mongoose.Types.ObjectId;
      quantidadePedido: number;
      tamanhoEscolhido: string;
      corEscolhida: string;
    },
  ];

  @Prop()
  metodo: string;
}

export const PedidoSchema = SchemaFactory.createForClass(Pedido);
