import { Injectable } from '@nestjs/common';
import { CreateContatoDto } from './dto/create-contato.dto';
import { Contato } from './schemas/contato.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class ContatoService {
  constructor(
    @InjectModel(Contato.name) private contatoModel: Model<Contato>,
  ) {}
  async createContato(createContatoDto: CreateContatoDto): Promise<Contato> {
    const createdContato = await new this.contatoModel(createContatoDto);
    if (createdContato) {
      return createdContato.save();
    }
    throw new Error('Não foi possivel salvar o contato');
  }
}
