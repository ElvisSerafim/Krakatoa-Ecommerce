import { Controller, Post, Put } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';

@Controller('pagamento')
export class PagamentoController {
  /*   constructor(private pagamentoService: PagamentoService) {}
  @Post()
  async CreatePagamento() {
    this.pagamentoService.createPagamento();
  }
  @Put
  async UpdatePagamento() {
    this.pagamentoService.updatePagamento();
  }
  @Post()
  async GetPagamentos() {
    this.pagamentoService.getPagamentos();
  } */
}
