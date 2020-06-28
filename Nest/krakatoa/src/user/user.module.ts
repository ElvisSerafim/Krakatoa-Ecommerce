import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, UserSchema } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: async function(): Promise<typeof UserSchema> {
          UserSchema.pre('save', async function(this: User, next) {
            try {
              if (!this.isModified('password')) return next();
              const salt = await bcrypt.genSalt(10);
              const Hash = await bcrypt.hash(this.password, salt);
              this.password = Hash;
              console.log(Hash);

              return next();
            } catch (error) {
              console.log(error);
              return next(error);
            }
          });
          return UserSchema;
        },
      },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'testando12',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class UserModule {}
