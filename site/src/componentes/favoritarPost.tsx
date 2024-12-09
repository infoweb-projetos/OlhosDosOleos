import '../estilos/favoritarPost.css';
import axios from 'axios';
import { api } from '../apiUrl';
import { useEffect, useState } from 'react';
import { PastaImagem } from '../interfaces/Pasta';
import CriarPasta from './criarPasta';

interface parametros {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    token: string | null;
    postId: number;
}

const FavoritarPost: React.FC<parametros> = ({setModal, token, postId}) => {
    console.log(postId);
    console.log(token);
    const [sucesso, setSucesso] = useState(false);
    const [pastas, setPastas] = useState<Array<PastaImagem>>([]);
    const [criarPasta, setCriarPasta] = useState<boolean>(false)

    const CarregarPastas = async (token: string | null) => {
        const url = api + 'pastas/minhas';
        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                const pastasBD = response.data.dados;

                const pastaLista: Array<PastaImagem> = pastasBD.map((p: PastaImagem) => {
                    const obj: PastaImagem = {
                        id: p.id, 
                        nome: p.nome, 
                        posts: p.posts, 
                        imagemUrl: '../public/imgs/feed/iconeCarregamento.png', 
                    };

                    if (obj.posts.length > 0) {
                        const postimagem = obj.posts[0].post;
                        console.log(postimagem);
                        if (postimagem.imagem && postimagem.imagemtipo) {
                            const blob = new Blob([new Uint8Array(postimagem.imagem.data)], { type: postimagem.imagemtipo });
                            const urlImagem = URL.createObjectURL(blob);
                            obj.imagemUrl = urlImagem;
                        }

                    }
                    return obj;
                });
                setPastas(pastaLista);
            })
            .catch(error => {
                console.log(error);
                console.log('Token inválido ou expirado');
            });
    }; 
    useEffect(() =>{
        if (token) CarregarPastas(token);
    }, [token, criarPasta])

    const Salvar  = (pastaId: number) => {
        if(token && pastaId > 0 && postId > 0){
            axios.post(`${api}pastas/favoritar/${pastaId}/${postId}`, { },{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log('Post adicionado a pasta com sucesso', response);
                setSucesso(true);
            })
            .catch(error => {
                console.log('Erro ao adicionar post na pasta:', error);
            });
        }
    }

    return (
        <div className="modalFavoritarPostArea">
            <div>
                {criarPasta && (<CriarPasta token={token} setModal={setCriarPasta}/>)}
                <div className="modalFavoritarPostHeader">
                    <div>
                        <figure>
                            <img src='/imgs/feed/iconeFavoritoVermelho.svg'/>
                          
                        </figure>
                        <h3>Favoritar Post</h3>
                    </div>
                    
                    <button onClick={() => setModal(false)}><img src="/imgs/criarPost/criarFecharBt.svg" /></button>
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
                            {
                                 pastas.map((pasta, index) =>
                                 (
                                    <li onClick={() => {Salvar(pasta.id)}} key={index}>
                                        <figure>
                                            <img src={pasta.imagemUrl}/>
                                            <figcaption>{pasta.nome}</figcaption>
                                        </figure>
                                        <button>
                                            Salvar
                                        </button>
                                    </li>
                                 ))
                            }
                            
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
                        <button onClick={() => setCriarPasta(true)}>
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