import { Length, IsEmail } from 'class-validator';

export class CreateContatoDto {
  @Length(4, 30)
  nome: string;
  @IsEmail()
  email: string;
  @Length(4, 50)
  assunto: string;
  @Length(5, 255)
  mensagem: string;
}
