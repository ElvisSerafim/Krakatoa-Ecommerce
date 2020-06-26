import { Controller, Post, Get, Put, Body, Param } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoDto } from './dto/pedido.dto';
import { Pedido } from './schemas/pedido.schema';

@Controller('pedido')
export class PedidoController {
  constructor(private pedidoService: PedidoService) {}
  @Post(':id')
  async CreatePedido(
    @Body() pedidoDto: PedidoDto,
    @Param('id') userId: string,
  ): Promise<any> {
    return await this.pedidoService.createPedido(pedidoDto, userId);
  }
  @Get(':id')
  async GetPedidos(@Param('id') userId: string): Promise<Pedido[]> {
    return await this.pedidoService.getPedidos(userId);
  } /*
  @Put()
  UpdadePedido(@Body() id: string, pedidoDto: PedidoDto): Pedido {
    this.pedidoService.updatePedido(pedidoDto, id);
    return PedidoEntity;
  } */
}
