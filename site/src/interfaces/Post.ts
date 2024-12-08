import { Curtida } from "./Curtida";
import { Tag } from "./Enums";
import { Usuario } from "./Usuario";

export interface Post {
    id?: number;
    usuarioid: number;
    imagem?:  { type: string; data: Array<number> };
    imagemUrl?: string;
    imagemtipo?: string;
    titulo: string;
    descricao?: string;
    sensivel: boolean;
    rascunho?: boolean;
    usuario?: Usuario;
    categoriaid?: string;
    tags?: Array<Tag>;
    processo?: Array<Processo>;
    curtidas?: Curtida[];
    curtidasQtd?: number;
    entrada?: Date;
}


export interface CriarPostDados {
    usuarioid: number;
    imagemPost?: FileList;
    processoPost?: FileList;
    tituloPost: string;
    descricaoPost?: string;
    postSensivel: boolean;
    rascunho: boolean;
    categoriaPost: string;
}

export interface Processo{
    id: number;
    postid: number;
    imagem?:  { type: string; data: Array<number> };
    imagemtipo: string;
}
