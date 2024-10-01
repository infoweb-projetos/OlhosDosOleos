import { Usuario } from "./Usuario";

export interface Post {
    id?: number;
    usuarioid: number;
    imagem?: ArrayBuffer;
    imagemUrl?: string;
    imagemtipo?: string;
    titulo: string;
    descricao?: string;
    sensivel: boolean;
    rascunho?: boolean;
    usuario?: Usuario;
}

export interface CriarPostDados {
    usuarioid: number;
    imagemPost?: FileList;
    tituloPost: string;
    descricaoPost?: string;
    postSensivel: boolean;
    rascunho: boolean;
}
