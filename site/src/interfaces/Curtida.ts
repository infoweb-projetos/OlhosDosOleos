import { Post } from "./Post"
import { Usuario } from "./Usuario"

export interface Curtida {
postid?: number;
usuarioid?: number;
post?: Post;
usuario?: Usuario;
}