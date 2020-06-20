import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Length, isEmail } from 'class-validator';
@Entity()
export class Contato {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(10, 50)
  nome: string;

  @Column()
  @isEmail()
  email: string;
}
