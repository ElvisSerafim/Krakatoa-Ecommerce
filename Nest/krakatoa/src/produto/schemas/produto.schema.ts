import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Categoria, Tipo, Tamanho, Quantidade } from '../../utils/types';

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Produto extends Document {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true, min: 0 })
  preco: number;

  @Prop({ required: true })
  tipo: Tipo;

  @Prop({ required: true, default: ['Único'] })
  tamanho: Tamanho[];

  @Prop({ required: true, default: false })
  promocao: boolean;

  @Prop({ required: true })
  imagens: string[];

  @Prop()
  precoPromo: number;

  @Prop({ required: true })
  categoria: Categoria;

  @Prop({ required: true, min: 10 })
  descricao: string;

  @Prop({ default: 0 })
  vendas: number;

  @Prop()
  quantidade: Quantidade;
}

export const ProdutoSchema = SchemaFactory.createForClass(Produto);

