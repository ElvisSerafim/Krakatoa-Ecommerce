import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './schemas/user.schema';
import { genSalt, hash } from 'bcrypt';
import { JwtStrategy } from './jwt.strategy';
import { Pedido, PedidoSchema } from '../pedido/schemas/pedido.schema';

const logger = new Logger('User Module');

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'testando12',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: async function(): Promise<typeof schema> {
          const schema = UserSchema;
          schema.pre('save', async function(this: User, next) {
            try {
              if (!this.isModified('password')) return next();
              const salt = await genSalt(10);
              const Hash = await hash(this.password, salt);
              this.password = Hash;
              logger.log('Ok!');
              return next();
            } catch (error) {
              logger.error(error);
              return next(error);
            }
          });
          return schema;
        },
      },
    ]),
    MongooseModule.forFeature([{ name: Pedido.name, schema: PedidoSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class UserModule {}
