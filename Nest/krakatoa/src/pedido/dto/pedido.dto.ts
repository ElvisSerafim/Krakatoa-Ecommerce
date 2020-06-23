interface produto {
  quantidadePedido: number;
  tamanhoEscolhido: string;
  corEscolhida: string;
  /*   id: string; */
}
export class PedidoDto {
  precoTotal: number;
  frete: number;
  data: string;
  produtos: produto[];
}
