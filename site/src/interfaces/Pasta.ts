import { PostPasta } from "./PostPasta";

export interface Pasta {
    id: number;
    nome: string;
    posts: Array<PostPasta>
}

export interface PastaImagem {
    id: number;
    nome: string;
    posts: Array<{post: {imagem?:  { type: string; data: Array<number> }; imagemtipo: string}}>;
    imagemUrl: string;
}