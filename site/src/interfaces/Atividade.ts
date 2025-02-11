import { Comentario } from "./Comentario";
import { Post } from "./Post";
import { Usuario } from "./Usuario";

export interface Atividade {
    id?: number;
    usuarioid?: number;
    postid?: number;
    comentarioid?: number;
    post?: Post;
    comentario?: Comentario;
    usuario?: Usuario;
    selecionado?: boolean;
}
