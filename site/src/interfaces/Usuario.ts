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
    localizacao?: string;
    nome?: string;
    senha?: string;
    tipoid?: string;
    usuario?: string;
    youtube?: string;
    zap?: string;
    cidadeid? : number;
    estadoid? : number;
}
