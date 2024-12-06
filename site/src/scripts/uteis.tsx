import axios from "axios";
import {api} from '../apiUrl.ts';

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


export const CurtirPost = async (postid: number, token: string | null) =>{
    if (token && postid > 0){
        axios.post(api + `posts/curtir/${postid}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
    }
    
}