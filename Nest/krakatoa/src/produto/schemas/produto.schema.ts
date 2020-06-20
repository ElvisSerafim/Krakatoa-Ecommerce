import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Produto extends Document {
  @Prop()
  nome: string;

  @Prop()
  preco: number;

  @Prop()
  tipo: string;

  @Prop()
  tamanho: string[];

  @Prop()
  promocao: boolean;

  @Prop()
  precoPromo: boolean;

  @Prop()
  categoria: string;

  @Prop()
  cores: string[];

  @Prop()
  descricao: string;

  @Prop()
  vendas: number;

  @Prop()
  quantidade: number;
}

export const ProdutoSchema = SchemaFactory.createForClass(Produto);
