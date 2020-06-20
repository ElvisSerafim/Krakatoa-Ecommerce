import { Controller, Post, Get, Put, Body } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoDto } from './dto/pedido.dto';

@Controller('pedido')
export class PedidoController {
  /*  constructor(private pedidoService: PedidoService) {}
  @Post()
  CreatePedido(pedidoDto: PedidoDto): PedidoEntity {
    this.pedidoService.createPedido(pedidoDto);
    return PedidoEntity;
  }
  @Get()
  GetPedidos(): PedidoEntity[] {
    this.pedidoService.getPedidos();
    return PedidoEntity[];
  }
  @Put()
  UpdadePedido(@Body() id: string, pedidoDto: PedidoDto): Pedido {
    this.pedidoService.updatePedido(pedidoDto, id);
    return PedidoEntity;
  } */
}
