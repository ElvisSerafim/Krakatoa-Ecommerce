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

  @Prop({ required: true })
  produtos: [
    {
      Produto_id: { type: mongoose.Types.ObjectId; ref: 'Produto' };
      quantidadePedido: number;
      tamanhoEscolhido: string;
      corEscolhida: string;
    },
  ];

  @Prop({ required: true })
  metodo: string;

  @Prop({ required: true })
  idPagamento: string;

  @Prop({ required: true })
  idPedido: string;
}

export const PedidoSchema = SchemaFactory.createForClass(Pedido);
