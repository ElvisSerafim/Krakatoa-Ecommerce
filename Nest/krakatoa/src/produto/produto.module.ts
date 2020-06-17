import { Module } from '@nestjs/common';
import { PedidoController } from 'src/pedido/pedido.controller';
import { PedidoService } from 'src/pedido/pedido.service';

@Module({
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class ProdutoModule {}
