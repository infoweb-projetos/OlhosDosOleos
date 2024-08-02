import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Usuario {
    usuarioid: number;
    nome: string;
    tipo?: string;
    localizacao?: string;
    descricao?: string;
    foto?: string;
    Email: string;
}

const Feed: React.FC = () => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
        const getUsuario = async () => {
            try {
                const token = localStorage.getItem('token');

                if (token) {
                    const response = await axios.get<Usuario>('http://localhost:5000/api/usuario', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUsuario(response.data);
                }
            } catch (error) {
                console.error('Erro ao obter dados do usuário:', error);
            }
        };

        getUsuario();
    }, []);


    return (
        <>
            <header>
                <div className="headerEsquerda">
                    <Link to="/feed">
                        <img src="/imgs/logoHeader.png" />
                    </Link>
                    <form >
                        <input type="image" src="/imgs/lupaPesquisaHeader.png" />
                        <input type="search" />
                    </form>
                </div>
                <div className="headerDireita">
                    <button>
                        <img src="/imgs/menuSanduicheHeader.png" />
                    </button>
                   
                   
                    {usuario ? (
                        <>
                            <Link to="/feed">
                                <img src="/imgs/perfilHeader.png" />
                            </Link>
                            <Link to="/feed">
                                {usuario.nome}
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/">
                                <img src="/imgs/perfilHeader.png" />
                            </Link>
                            <Link to="/">
                                Entrar
                            </Link>
                        </>
                    )}
                   
                </div>
            </header>
        </>

    );
}
export default Feed;