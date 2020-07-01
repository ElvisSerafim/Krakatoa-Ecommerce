import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ContatoModule } from './contato/contato.module';
import { PedidoModule } from './pedido/pedido.module';
import { ProdutoModule } from './produto/produto.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri:
          'mongodb+srv://krakatoaprod:TAsR8gLOsEZF9TOY@cluster0-ivnk7.gcp.mongodb.net/KrakatoaProd?retryWrites=true&w=majority',
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }),
    }),
    UserModule,
    ContatoModule,
    ProdutoModule,
    PedidoModule,
  ],
})
export class AppModule {}
