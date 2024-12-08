import '../estilos/favoritarPost.css';
import axios from 'axios';
import { api } from '../apiUrl';
import { useState } from 'react';

interface parametros {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    token: string | null;
    postId: number;
}

const FavoritarPost: React.FC<parametros> = ({setModal, token, postId}) => {
    console.log(postId);
    console.log(token);
    const [sucesso, setSucesso] = useState(false);
    const Salvar  = () => {
        if(token){
            axios.post(`${api}pastas/criar`, { },{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log('Pasta criada com sucesso!', response);
                setSucesso(true);
            })
            .catch(error => {
                console.log('Erro ao criar pasta:', error);
            });
        }
       
    }

    return (
        <div className="modalFavoritarPostArea">
            <div>
                
                <div className="modalFavoritarPostHeader">
                    <div>
                        <figure>
                            <img src='/imgs/feed/iconeFavoritoVermelho.svg'/>
                          
                        </figure>
                        <h3>Favoritar Post</h3>
                    </div>
                    
                    <button onClick={() =>   setModal(false)}><img src="/imgs/criarPost/criarFecharBt.svg" /></button>
                </div>
                {
                    !sucesso && 
                    (
                        <span>Selecione uma de suas pasta para salvar a postagem</span>
                    )
                }
                
                {
                    !sucesso ?
                    (
                        <ul>
                            <li>
                                <figure>
                                    <img src='/imgs/temp/postFeed.png'/>
                                    <figcaption>Titulo Pasta</figcaption>
                                </figure>
                                <button>
                                    Salvar
                                </button>
                            </li>
                            <li>
                                <figure>
                                    <img src='/imgs/temp/postFeed.png'/>
                                    <figcaption>Titulo Pasta</figcaption>
                                </figure>
                                <button>
                                    Salvar
                                </button>
                            </li>
                            <li>
                                <figure>
                                    <img src='/imgs/temp/postFeed.png'/>
                                    <figcaption>Titulo Pasta</figcaption>
                                </figure>
                                <button>
                                    Salvar
                                </button>
                            </li>
                            <li>
                                <figure>
                                    <img src='/imgs/temp/postFeed.png'/>
                                    <figcaption>Titulo Pasta</figcaption>
                                </figure>
                                <button>
                                    Salvar
                                </button>
                            </li>
                            <li>
                                <figure>
                                    <img src='/imgs/temp/postFeed.png'/>
                                    <figcaption>Titulo Pasta</figcaption>
                                </figure>
                                <button>
                                    Salvar
                                </button>
                            </li>
                            <li>
                                <figure>
                                    <img src='/imgs/temp/postFeed.png'/>
                                    <figcaption>Titulo Pasta</figcaption>
                                </figure>
                                <button>
                                    Salvar
                                </button>
                            </li>
                            <li>
                                <figure>
                                    <img src='/imgs/temp/postFeed.png'/>
                                    <figcaption>Titulo Pasta</figcaption>
                                </figure>
                                <button>
                                    Salvar
                                </button>
                            </li>
                            <li>
                                <figure>
                                    <img src='/imgs/temp/postFeed.png'/>
                                    <figcaption>Titulo Pasta</figcaption>
                                </figure>
                                <button>
                                    Salvar
                                </button>
                            </li>
                        </ul>
            
                    )
                    :
                    (
                    <figure>
                        <img src='/imgs/cadastro/cadEnviar.png' />
                        <figcaption>Post adicionado a pasta com sucesso</figcaption>
                    </figure> 
                    )
                }
                {
                    !sucesso && 
                    (
                        <button>
                            <img src="/imgs/header/maisIcone.png" alt="Icone de entrar." />
                            Criar Pasta
                        </button>
                    )
                }
                
                
            </div>
           
        </div>
    );
}
export default FavoritarPost;