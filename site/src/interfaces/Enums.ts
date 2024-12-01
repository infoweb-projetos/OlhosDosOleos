export interface TipoArtista {
    nome: string;
}
export interface Estado {
    id: number;
    nome: string;
}
export interface Cidade {
    id: number;
    nome: string;
    estadoid: number
}

export interface Categoria {
    nome: string;
}

export interface Tag {
    nome: string;
    ferramenta: boolean;
}