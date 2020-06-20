export class PedidoDto {
  precoTotal: number;
  frete: number;
  data: Date;
  user: UserEntity;
  produto: ProdutoEntity[];
}
