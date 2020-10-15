import { Length, IsEmail } from 'class-validator';

export class CreateContatoDto {
  @Length(1, 100)
  nome: string;
  @IsEmail()
  email: string;
  @Length(4, 50)
  assunto: string;
  @Length(5, 255)
  mensagem: string;
}
