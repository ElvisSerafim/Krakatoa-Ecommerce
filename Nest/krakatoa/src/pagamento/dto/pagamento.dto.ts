interface produto {
  quantidadePedido: number;
  tamanhoEscolhido: string;
  corEscolhida: string;
  id: string;
}
export class PagamentoDto {
  data: Date;
  valor: number;
  produto: produto[];
  metodo: string;
  userId: string;
}
