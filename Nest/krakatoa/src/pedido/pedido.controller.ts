import { Controller, Post, Get, Put, Body } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoDto } from './dto/pedido.dto';
import { Pedido } from '../pedido/schemas/pedido.schema';
@Controller('pedido')
export class PedidoController {
  constructor(private pedidoService: PedidoService) {}
  @Post()
  async CreatePedido(
    @Body() pedidoDto: PedidoDto,
    @Body() userId: string,
  ): Promise<Pedido> {
    return await this.pedidoService.createPedido(pedidoDto, userId);
  }
  @Get()
  async GetPedidos(userId: string): Promise<Pedido[]> {
    return await this.pedidoService.getPedidos(userId);
  } /*
  @Put()
  UpdadePedido(@Body() id: string, pedidoDto: PedidoDto): Pedido {
    this.pedidoService.updatePedido(pedidoDto, id);
    return PedidoEntity;
  } */
}
