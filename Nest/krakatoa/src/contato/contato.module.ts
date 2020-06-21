import { Module } from '@nestjs/common';
import { ContatoController } from './contato.controller';
import { ContatoService } from './contato.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Contato, ContatoSchema } from './schemas/contato.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Contato.name, schema: ContatoSchema }]),
  ],
  controllers: [ContatoController],
  providers: [ContatoService],
})
export class ContatoModule {}
