import { Usuario } from "./Usuario"

export interface Seguir {
    usuarioid?: number;
    seguidorid?: number;
    seguidor?: Usuario;
    usuario?: Usuario;
}