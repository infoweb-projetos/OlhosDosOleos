import { Seguir } from "./Seguir";
import { Curtida } from "./Curtida";
import { Cidade, Estado } from "./Enums";

export interface Usuario {
    biografia?: string;
    email?: string;
    face?: string;
    id: number;
    imagem?: { type: string; data: Array<number> };
    imagemUrl?: string;
    imagemtipo?: string;
    banner?: { type: string; data: Array<number> };
    bannertipo?: string;
    insta?: string;
    localizacao?: string | {estado: Estado, cidade: Cidade};
    localizacaoid?: string;
    nome?: string;
    senha?: string;
    tipoid?: string;
    usuario?: string;
    youtube?: string;
    zap?: string;
    cidadeid? : number;
    estadoid? : number;
    cor1?: string;
    cor2?: string;
    cor3?:string;
    cor4?:string;
    seguidores?: Seguir[]; 
    qtdSeguidores?: number;
    seguidos?: Seguir[];
    sigo?: boolean;
    postcurtidos?:Curtida[]
}
