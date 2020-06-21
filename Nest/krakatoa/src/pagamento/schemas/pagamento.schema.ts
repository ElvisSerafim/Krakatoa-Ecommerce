import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Pedido } from '../../pedido/schemas/pedido.schema';

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Pagamento extends Document {
  @Prop(
    raw({
      User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    }),
  )
  user: Record<string, any>;

  @Prop({ required: true })
  valor: string;

  @Prop({ required: true })
  metodo: string;

  @Prop()
  pedido: Pedido;
  @Prop(
    raw({
      produtos: [
        {
          produto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Produto',
          },
          quantidadePedido: {
            type: Number,
          },
          tamanhoEscolhido: {
            type: String,
          },
          corEscolhida: {
            type: String,
          },
        },
      ],
    }),
  )
  produtos: Record<string, any>;
}

export const ContatoSchema = SchemaFactory.createForClass(Pagamento);
