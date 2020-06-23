import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Pedido extends Document {
  @Prop({ required: true })
  precoTotal: number;

  @Prop({ required: true })
  frete: number;

  @Prop({ required: true })
  data: Date;

  @Prop(
    raw({
      User: {
        type: SchemaTypes.ObjectId,
        ref: 'Users',
      },
    }),
  )
  user: Record<string, any>;
  @Prop(
    raw({
      pagamento: {
        type: SchemaTypes.ObjectId,
        ref: 'Pagamentos',
      },
    }),
  )
  pagamento: Record<string, any>;
  /*   @Prop(
    raw({
      produtos: [
        {
          produto_id: {
            type: SchemaTypes.ObjectId,
            ref: 'Produtos',
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
  produtos: Record<string, any> */

  @Prop()
  produtos: [
    {
      precoTotal: number;
      frete: number;
      data: Date;
    },
  ];
}

export const PedidoSchema = SchemaFactory.createForClass(Pedido);
