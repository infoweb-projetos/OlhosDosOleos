import { Atividade } from "./Atividade";
import { Post } from "./Post";
import { Usuario } from "./Usuario";

export interface Comentario {
    id?: number;
    usuarioid?: number;
    postid?: number;
    texto?: string;
    criacao?: Date;
    post?: Post;
    usuario?: Usuario;
    atividades?: Atividade[];
}