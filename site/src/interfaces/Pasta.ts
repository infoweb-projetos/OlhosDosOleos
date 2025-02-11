import { Post } from "./Post";
import { PostPasta } from "./PostPasta";

export interface Pasta {
    id: number;
    nome: string;
    posts: Array<PostPasta>
}

export interface PastaImagem {
    id: number;
    nome: string;
    descricao?: string;
    posts: Array<{post: {imagem?:  { type: string; data: Array<number> }; imagemtipo: string}}>;
    imagemUrl: string;
}

export interface PastaPosts {
    pastaid?: number;
    postid?: number;
    post?: Post;
}

