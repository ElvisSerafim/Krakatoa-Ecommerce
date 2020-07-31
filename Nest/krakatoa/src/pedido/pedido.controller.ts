import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoDto } from './dto/pedido.dto';
import { Pedido } from './schemas/pedido.schema';
import { User } from '../user/schemas/user.schema';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../user/get-user.decorator';

@Controller('pedidos')
@UseGuards(AuthGuard())
export class PedidoController {
  constructor(private pedidoService: PedidoService) {}
  @Post()
  async CreatePedido(
    @GetUser() user: User,
    @Body() pedidoDto: PedidoDto,
  ): Promise<any> {
    return await this.pedidoService.createPedido(pedidoDto, user);
  }
  @Get()
  async GetPedidos(@GetUser() user: User): Promise<Pedido[]> {
    return await this.pedidoService.getPedidos(user);
  }
}
