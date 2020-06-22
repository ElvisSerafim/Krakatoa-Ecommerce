import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;
  @Length(8, 20, { message: 'Verificar Senha' })
  @IsNotEmpty()
  password: string;
}
