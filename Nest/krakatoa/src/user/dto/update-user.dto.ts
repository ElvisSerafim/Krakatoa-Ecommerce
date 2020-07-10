import { IsString, Length } from 'class-validator';

export class UpdateUserDto {
  nome: string;
  telefone: string;
  @Length(11)
  @IsString()
  cpf: string;
  @IsString()
  cep: string;
  @IsString()
  bairro: string;
  @IsString()
  cidade: string;
  @IsString()
  estado: string;
  @IsString()
  rua: string;
  @IsString()
  numero: string;
  @IsString()
  complemento: string;
}
