import axios from "axios";
import {api} from '../apiUrl.ts';
import { Post } from "../interfaces/Post.ts";

export const VerificaToken = async () : Promise<string | undefined> => {
    const token = localStorage.getItem('tokenODO');
    if (!token) {
        return undefined;
    }
    try {
        await axios.get(api + 'autenticacao/verificatoken', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return token;
    } catch (error) {
        console.log(error);
        console.log('Token inválido ou expirado');
        return undefined;
    }
}

export const CurtirPost = async (postid: number, token: string | null, setUltimosPosts: React.Dispatch<React.SetStateAction<Post[]>>, ultimosPosts: Post[]) => {
    if (token && postid > 0){
        axios.post(api + `posts/curtir/${postid}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response);
            if (response.data.dados && response.data.dados.post && response.data.dados.post.curtidas){
                const postAtualizado = response.data.dados.post; 
                const postsAtualizado = [...ultimosPosts];
                const postIndex = postsAtualizado.findIndex(post => post.id === postid);
                if (postIndex != -1) {
                    let qtd = postAtualizado.curtidas.length > 0 ? postAtualizado.curtidas.length : 0
                    if (qtd > 0 && response.data.dados.foiApagado == true) qtd--;
                    postsAtualizado[postIndex].curtidasQtd = qtd;
                    setUltimosPosts(postsAtualizado); 
                } 
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
    
}