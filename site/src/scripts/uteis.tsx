import axios from "axios";


export const VerificaToken = async () : Promise<string | undefined> => {
    const token = localStorage.getItem('tokenODO');
    if (!token) {
        return undefined;
    }
    try {
        await axios.get('https://olhosdosoleosbackend-production.up.railway.app/autenticacao/verificatoken', {
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

