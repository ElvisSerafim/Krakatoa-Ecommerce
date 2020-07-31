import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Produto extends Document {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true, min: 0 })
  preco: number;
  /* Fazer um enum */
  @Prop({ required: true })
  tipo: string;
  /* Fazer um enum */
  @Prop({ required: true, default: ['Único'] })
  tamanho: string[];

  @Prop({ required: true, default: false })
  promocao: boolean;

  @Prop({ required: true })
  imagens: string[];

  @Prop()
  precoPromo: number;
  /* Fazer um enum */
  @Prop({ required: true })
  categoria: string;

  @Prop({ required: true, min: 10 })
  descricao: string;

  @Prop({ default: 0 })
  vendas: number;

  @Prop({ required: true, min: 1, default: 10 })
  quantidade: number;
}

export const ProdutoSchema = SchemaFactory.createForClass(Produto);
