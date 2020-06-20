import { Injectable } from '@nestjs/common';
import { PagamentoDto } from './dto/pagamento.dto';

@Injectable()
export class PagamentoService {
  async createPagamento(pagamentoDto: PagamentoDto): PagamentoEntity {}
  async updatePagamento(pagamentoDto: PagamentoDto): PagamentoEntity {}
  getPagamentos(id: string): PagamentoEntity {
    findbyid(id);
  }
}
