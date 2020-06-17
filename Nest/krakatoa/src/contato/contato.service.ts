import { Injectable } from '@nestjs/common';
import { CreateContatoDto } from './dto/create-contato.dto';
import { Contato } from './contato.model';
@Injectable()
export class ContatoService {
  createContato(createContatoDto: CreateContatoDto): Contato {
    const { nome, email, assunto, mensagem } = createContatoDto;
    const contato: Contato = {
      nome,
      email,
      assunto,
      mensagem,
    };
    return contato;
  }
}
