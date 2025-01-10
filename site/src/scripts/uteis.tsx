import axios from "axios";
import {api} from '../apiUrl.ts';
import { Post } from "../interfaces/Post.ts";
import { Usuario } from "../interfaces/Usuario.ts";

export const VerificaToken = async (descodificado: boolean = false) => {
    const token = localStorage.getItem('tokenODO');
    if (!token) {
        return undefined;
    }
    try {
       const response= await axios.get(api + 'autenticacao/verificatoken', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if(response.data.estado==='ok'){
            if(descodificado){
                return response.data.token.usuario;
            }

        }
        return token;
    } catch (error) {
        console.log(error);
        console.log('Token inválido ou expirado');
        return undefined;
    }
}

export const CurtirPost = async (postid: number, token: string | null, setUltimosPosts: React.Dispatch<React.SetStateAction<Post[]>> | null, ultimosPosts: Post[]) => {
    if (token && postid > 0){
        axios.post(api + `posts/curtir/${postid}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            let curtido = true;
            if (response.data.dados && response.data.dados.post && response.data.dados.post.curtidas){
                const postAtualizado = response.data.dados.post; 
                const postsAtualizado = [...ultimosPosts];
                const postIndex = postsAtualizado.findIndex(post => post.id === postid);
                if (postIndex != -1) {
                    let qtd = postAtualizado.curtidas.length > 0 ? postAtualizado.curtidas.length : 0
                    if (qtd > 0 && response.data.dados.foiApagado == true){
                        qtd--;
                        curtido = false;
                    } 
                    postsAtualizado[postIndex].curtidasQtd = qtd;
                    if (setUltimosPosts) setUltimosPosts(postsAtualizado); 
                    return curtido;
                } 
            }
        })
        .catch(error => {
            console.log(error);
            return false;
        });
    }
    
}

export const CurtirPostSimples = async (postid: number, token: string | null, setPostCurtido: React.Dispatch<React.SetStateAction<boolean>>) => {
    console.log(postid);
    if (token && postid > 0){
        axios.post(api + `posts/curtir/${postid}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response)
            if (response){
                console.log(response)
                setPostCurtido(response.data.dados.foiApagado as boolean); 
            }
            else setPostCurtido(false); 
        })
        .catch(error => {
            console.log(error);
            setPostCurtido(false); 
        });
    }
    
}

export const Seguir = async (usuarioid: number, token: string | null, setUsuario: React.Dispatch<React.SetStateAction<Usuario | null>> | null, usuario: Usuario | null) => {
    if (token && usuarioid > 0){
        axios.post(api + `usuarios/seguir/${usuarioid}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.data.dados && response.data.dados.usuario && usuario){
                const usuarioAtualizado = { ...usuario };
                usuarioAtualizado.qtdSeguidores = response.data.dados.usuario.seguidores ? response.data.dados.usuario.seguidores.length : 0;
                usuarioAtualizado.sigo = true;
                if (usuarioAtualizado.qtdSeguidores && usuarioAtualizado.qtdSeguidores > 0 && response.data.dados.seguindo == false){
                    usuarioAtualizado.qtdSeguidores--;
                    usuarioAtualizado.sigo = false;
                } 
                   
                if(setUsuario) setUsuario(usuarioAtualizado);
                return  usuarioAtualizado.sigo;
            }
        })
        .catch(error => {
            console.log(error);
            return  false;
        });
    }
    
}

export const SeguirSimples = async (usuarioid: number, token: string | null,  setSeguindo: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (token && usuarioid > 0){
        axios.post(api + `usuarios/seguir/${usuarioid}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.data.dados && response.data.dados.usuario){
                setSeguindo(true);
                if (response.data.dados.seguindo == false){
                    setSeguindo(false);
                }   
            }
        })
        .catch(error => {
            console.log(error);
            setSeguindo(false);
        });
    }
}