import { Controller, Post, Body } from '@nestjs/common';
import { ContatoService } from './contato.service';
import { CreateContatoDto } from './dto/create-contato.dto';
import { Contato } from './contato.model';

@Controller('contato')
export class ContatoController {
  constructor(private contatoService: ContatoService) {}
  @Post()
  createContato(@Body() createContatoDto: CreateContatoDto): Contato {
    return this.contatoService.createContato(createContatoDto);
  }
}
