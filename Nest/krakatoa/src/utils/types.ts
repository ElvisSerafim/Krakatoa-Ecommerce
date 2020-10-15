export type Tamanho = 'GG' | 'G' | 'M' | 'P' | 'Único'

export type Tipo = 'cangas' | 'confeccoes' | 'acessorios' | 'P'

export type CategoriaCangas = 'mandalas' | 'turisticas' | 'estampadas' | 'pompom'

export type Categoria = CategoriaCangas | 'batas' | 'vestidos' | 'chapeus' | 'shorts' | 'bolsas' | 'macaquinhos'

export interface tokenDecode {
    email: string;
    iat: number;
    exp: number;
}

export interface userResponse {
    email: string;
    nome: string;
    pedidos: any;
    telefone: string;
    endereco?: {
        cep: string;
        estado: string;
        cidade: string;
        bairro: string;
        rua: string;
        numero: string;
        complemento: string;
    };
    cpf?: string;
}

export interface Quantidade {
    G?: number;
    P?: number;
    M?: number;
    GG?: number;
    'Único'?: number;
}