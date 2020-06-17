import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { ProdutoController } from './produto/produto.controller';
import { CorreiosController } from './correios/correios.controller';
import { PagamentoController } from './pagamento/pagamento.controller';
import { PedidoController } from './pedido/pedido.controller';
import { ContatoController } from './contato/contato.controller';
import { UserService } from './user/user.service';
import { ProdutoService } from './produto/produto.service';
import { PedidoService } from './pedido/pedido.service';
import { PagamentoService } from './pagamento/pagamento.service';
import { CorreiosService } from './correios/correios.service';
import { ContatoService } from './contato/contato.service';
import { ContatoModule } from './contato/contato.module';
import { CorreiosModule } from './correios/correios.module';
import { PagamentoModule } from './pagamento/pagamento.module';
import { PedidoModule } from './pedido/pedido.module';
import { ProdutoModule } from './produto/produto.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ContatoModule, CorreiosModule, PagamentoModule, PedidoModule, ProdutoModule, UserModule],
  controllers: [
    AppController,
    UserController,
    ProdutoController,
    CorreiosController,
    PagamentoController,
    PedidoController,
    ContatoController,
  ],
  providers: [AppService, UserService, ProdutoService, PedidoService, PagamentoService, CorreiosService, ContatoService],
})
export class AppModule {}
