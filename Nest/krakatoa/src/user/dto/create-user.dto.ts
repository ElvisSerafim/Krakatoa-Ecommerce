import { IsEmail, IsNotEmpty, Length, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @Length(0,128,{message:'Nome Muito Grande'})
  nome: string;
  @Length(8, 20, { message: 'Verificar Senha' })
  @IsNotEmpty()
  password: string;
}
