import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, toJSON: { virtuals: true } })
export class Contato extends Document {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, max: 255, min: 10 })
  assunto: string;

  @Prop({ required: true, max: 512, min: 10 })
  mensagem: string;
}

export const ContatoSchema = SchemaFactory.createForClass(Contato);
