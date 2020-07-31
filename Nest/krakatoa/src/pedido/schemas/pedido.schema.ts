import { Document, Schema, SchemaTypes } from 'mongoose';
import * as NestMongo from '@nestjs/mongoose';
@NestMongo.Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Pedido extends Document {
  @NestMongo.Prop({ required: true })
  precoTotal: number;

  @NestMongo.Prop({ required: true })
  frete: number;

  @NestMongo.Prop({
    type: Schema.Types.ObjectId,
    ref: 'User',
  })
  user: Schema.Types.ObjectId;

  @NestMongo.Prop(
    NestMongo.raw([
      {
        Produto_id: {
          type: Schema.Types.ObjectId,
          ref: 'Produto',
          autopopulate: true,
        },
        quantidadePedido: { type: Number, required: true },
        tamanhoEscolhido: { type: String, required: true },
      },
    ]),
  )
  produtos: Record<string, any>;

  @NestMongo.Prop({ required: true })
  metodo: string;

  @NestMongo.Prop({ required: true })
  idPagamento: string;

  @NestMongo.Prop({ required: true })
  idPedido: string;
}

export const PedidoSchema = NestMongo.SchemaFactory.createForClass(
  Pedido,
).plugin(require('mongoose-autopopulate'));
