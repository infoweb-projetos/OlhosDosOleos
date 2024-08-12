import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import  { Usuario } from '../interfaces/Usuario';
import '../estilos/verPerfil.css'

const Perfil: React.FC = () => {
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
        <div id="pagPerfil">
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
                        <div>
                            <Link to="/perfil">
                                <img src="/imgs/perfilHeader.png" />
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <Link to="/">
                                <img src="/imgs/perfilHeader.png" />
                            </Link>
                            <Link to="/">
                                Entrar
                            </Link>
                        </div>
                    )}
                   
                </div>
            </header>
            <div className="esquerda">
            <h1>Portifolio</h1>

            <ul>
                <li>
                    <a href="#">
                        <img src="imgs/sistema/load.png" />
                    </a>  
                </li>
                <li>
                    <a href="#">
                        <img src="imgs/sistema/load.png" />
                    </a>  
                </li>
                <li>
                    <a href="#">
                        <img src="imgs/sistema/load.png" />
                    </a>  
                </li>
                <li>
                    <a href="#">
                        <img src="imgs/sistema/load.png" />
                    </a>  
                </li>
                <li>
                    <a href="#">
                        <img src="imgs/sistema/load.png" />
                    </a>  
                </li>
                <li>
                    <a href="#">
                        <img src="imgs/sistema/load.png" />
                    </a>  
                </li>
            </ul>
        </div>
        <div className="direita">
            <figure>
                <img src="imgs/sistema/perfilIcone.png" />
            </figure>
            <h1>{usuario?.nome}</h1>
            <span>{usuario?.tipo}</span>
            <span> <img src="imgs/icones/localizacao.png"/> {usuario?.localizacao}.</span>
            <p>{usuario?.descricao}</p>
            <span>Contatos</span>
            {usuario?.zap ? <a href={usuario?.zap}><img src="imgs/redes/Wpp.png" />{usuario?.zap}</a> : null}
            {usuario?.insta ? <a href={usuario?.insta}><img src="imgs/redes/Insta.png" />{usuario?.insta}</a> : null}
            {usuario?.face ? <a href={usuario?.face}><img src="imgs/redes/Face.png" />{usuario?.face}</a> : null}

        </div>
        </div>

    );
}
export default Perfil;