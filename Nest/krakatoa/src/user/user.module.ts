import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './schemas/user.schema';
import { genSalt, hash } from 'bcrypt';
import { JwtStrategy } from './jwt.strategy';

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
              return next();
            } catch (error) {
              return next(error);
            }
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class UserModule {}
