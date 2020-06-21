import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Produto extends Document {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  preco: number;
  /* Fazer um enum */
  @Prop({ required: true })
  tipo: string;
  /* Fazer um enum */
  @Prop({ required: true })
  tamanho: string[];

  @Prop({ required: true })
  promocao: boolean;

  @Prop()
  precoPromo: number;
  /* Fazer um enum */
  @Prop({ required: true })
  categoria: string;

  @Prop({ required: true, minlength: 1 })
  cores: string[];

  @Prop({ required: true, min: 10 })
  descricao: string;

  @Prop({ required: true })
  vendas: number;

  @Prop({ required: true, min: 1 })
  quantidade: number;
}

export const ProdutoSchema = SchemaFactory.createForClass(Produto);
