import { Post } from "./Post";
import { Usuario } from "./Usuario";

export interface Atividade {
    usuarioid?: number;
    postid?: number;
    comentarioid?: number;
    post?: Post
    usuario?: Usuario
    selecionado?: boolean 
}
