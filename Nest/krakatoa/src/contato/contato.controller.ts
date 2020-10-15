import { Controller, Post, Body } from '@nestjs/common';
import { ContatoService } from './contato.service';
import { CreateContatoDto } from './dto/create-contato.dto';

@Controller('contato')
export class ContatoController {
  constructor(private contatoService: ContatoService) { }
  @Post()
  createContato(@Body() createContatoDto: CreateContatoDto): Promise<void> {
    return this.contatoService.createContato(createContatoDto);
  }
}
