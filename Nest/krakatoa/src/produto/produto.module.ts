import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PedidoController } from 'src/pedido/pedido.controller';
import { PedidoService } from 'src/pedido/pedido.service';
import { Produto, ProdutoSchema } from './schemas/produto.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Produto.name, schema: ProdutoSchema }]),
  ],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class ProdutoModule {}
