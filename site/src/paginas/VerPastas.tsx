import { useNavigate } from 'react-router-dom';
import HeaderSite from '../componentes/header';
import RodapeSite from '../componentes/rodape';
import '../estilos/verPastas.css';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { api } from '../apiUrl';
import { Post } from '../interfaces/Post';
import CriarPasta from '../componentes/criarPasta';
import ExcluirPasta from '../componentes/excluirPasta';
import { VerificaToken } from '../scripts/uteis';
import VerPost from '../componentes/verPost';
import EditarPasta from '../componentes/editarPasta';
import { PastaImagem, PastaPosts } from '../interfaces/Pasta';


const VerPastas: React.FC = () => {
    const navegar = useNavigate();
    const [tokenAtual, atualizarTokenAtual] = useState<string | null>("");
    const [pastas, setPastas] = useState<Array<PastaImagem>>([]);
    const [posts, setPosts] = useState<Array<PastaPosts>>([]);
    const [pastaId, setPastaId] = useState<string | null>(null); // Estado para armazenar o ID da pasta selecionada
    const [nomePastaSelecionada, setNomePastaSelecionada] = useState<string | null>(null);
    const [descricaoPasta, setDescricaoPasta] = useState<string | null>(null);
    const [pastaImagem, setPastaImagem] = useState<string | null>(null);
    const [criarPasta, setCriarPasta] = useState<boolean>(false)
    const [excluirPasta, setExcluirPasta] = useState<boolean>(false)
    const [editarPasta, setEditarPasta] = useState<boolean>(false)

    const VerificarToken = async () => {
        const token = await VerificaToken();
        if (token) atualizarTokenAtual(token);
    }
    useEffect(() => {
        VerificarToken();
    }, []);

    const CarregarPastas = useCallback(async (token: string | null) => {
        // Define a URL da API que será usada para buscar as pastas
        const url = api + 'pastas/minhas';

        // Faz uma requisição GET para a API usando axios
        axios.get(url, {
            headers: {
                // Define o token de autorização no cabeçalho da requisição
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                // Extrai os dados das pastas retornados pelo backend
                const pastasBD = response.data.dados;
                console.log(pastasBD); // Exibe os dados recebidos no console para debug

                // Mapeia as pastas recebidas do backend para uma estrutura que o front-end utilizará
                const pastaLista: Array<PastaImagem> = pastasBD.map((p: PastaImagem) => {
                    // Cria um objeto PastaImagem com as informações básicas
                    const obj: PastaImagem = {
                        id: p.id, // ID da pasta
                        nome: p.nome, // Nome da pasta
                        posts: p.posts, // Lista de posts da pasta
                        imagemUrl: '../public/imgs/feed/iconeCarregamento.png', // URL da imagem (será preenchida a seguir, se aplicável)
                    };


                    // Obtém o primeiro post da pasta (presumindo que o backend retorna uma lista de posts)
                    if (obj.posts.length > 0) {
                        const postimagem = obj.posts[0].post;
                        console.log(postimagem); // Exibe os dados do post no console para debug

                        // Verifica se o post tem uma imagem associada e um tipo de imagem
                        if (postimagem.imagem && postimagem.imagemtipo) {
                            // Cria um Blob a partir dos dados da imagem (convertendo para um formato manipulável pelo navegador)
                            const blob = new Blob([new Uint8Array(postimagem.imagem.data)], { type: postimagem.imagemtipo });

                            // Gera uma URL temporária para exibir a imagem no navegador
                            const urlImagem = URL.createObjectURL(blob);

                            // Atualiza o campo imagemUrl do objeto PastaImagem com a URL gerada
                            obj.imagemUrl = urlImagem;
                        }

                    }

                    // Retorna o objeto transformado para o novo array de pastas
                    return obj;
                });

                // Atualiza o estado com a lista de pastas transformadas
                setPastas(pastaLista);
            })
            .catch(error => {
                // Exibe o erro no console para debug
                console.log(error);

                // Exibe uma mensagem informando que o token é inválido ou expirou
                console.log('Token inválido ou expirado');
            });
    }, []); // useCallback é usado para memorizar a função e evitar recriações desnecessárias

    const CarregarPosts = useCallback(async (token: string | null, pastaId: string) => {
        // Define a URL da API para buscar os posts de uma pasta específica
        const url = `${api}pastas/${pastaId}/posts`;

        // Faz a requisição GET para a API
        axios.get(url, {
            headers: {
                // Passa o token de autenticação no cabeçalho
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                const postsBD = response.data;
                console.log('Posts carregados:', postsBD);

                const postLista: Array<PastaPosts> = postsBD.map((pastaPost: PastaPosts) => {
                    const pasta: PastaPosts = {
                        post: pastaPost.post,
                        pastaid: pastaPost.pastaid,
                        postid: pastaPost.postid,
                    }
                    console.log('jonas', pastaPost);
                    console.log('jonas post', pastaPost.post);
                    if (pastaPost.post) {
                        const obj: Post = {
                            id: pastaPost.post.id,
                            titulo: pastaPost.post.titulo,
                            imagemUrl: '',
                            usuarioid: pastaPost.post.usuarioid,
                            sensivel: pastaPost.post.sensivel,
                            descricao: pastaPost.post.descricao,
                            imagemtipo: pastaPost.post.imagemtipo,
                        };

                        console.log('jonas obj', obj);


                        if (pastaPost.post.imagem && pastaPost.post.imagemtipo) {
                            const blob = new Blob([new Uint8Array(pastaPost.post.imagem.data)], { type: pastaPost.post.imagemtipo });
                            const urlImagem = URL.createObjectURL(blob);
                            obj.imagemUrl = urlImagem;
                        }

                        obj.usuario = pastaPost.post.usuario;
                        if (obj.usuario) {
                            if (obj.usuario.imagem && obj.usuario.imagemtipo) {
                                const blobUsu = new Blob([new Uint8Array(obj.usuario.imagem.data)], { type: obj.usuario.imagemtipo });
                                const urlImagemUsu = URL.createObjectURL(blobUsu);
                                obj.usuario.imagemUrl = urlImagemUsu;
                                console.log('jonas imgUrl', urlImagemUsu);

                                obj.usuario.imagemUrl = urlImagemUsu;
                            }
                            else {
                                obj.usuario.imagemUrl = '/imgs/verPerfil/perfil.png';
                            }
                        }
                        pasta.post = obj;
                    }
                    return pasta;
                });


                setPosts(postLista);
            })
            .catch(error => {
                console.log(error);

            });
    }, []);



    useEffect(() => {
        const token = localStorage.getItem('tokenODO');

        if (!token) navegar('/');

        if (token) {
            axios.get(api + 'autenticacao/verificatoken', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    localStorage.removeItem('tokenODO');
                    console.log(error);
                    navegar(0);
                });

            CarregarPastas(token);
            // Se pastaId foi selecionada, carrega os posts dessa pasta
            if (pastaId) {
                CarregarPosts(token, pastaId);
            }
        }
    }, [pastaId, CarregarPastas, CarregarPosts, navegar, criarPasta]);  // Dependências para garantir a execução correta

    // Função para selecionar uma pasta
    const selecionarPasta = (id: string, nome: string, descricao: string, imagemUrl: string) => {
        setPastaId(id);  // Atualiza o estado com o ID da pasta
        setNomePastaSelecionada(nome);
        setDescricaoPasta(descricao);
        setPastaImagem(imagemUrl);
        const seta = document.getElementById('setaBaixo');
        if(seta) {
            seta.style.display = "flex";
        }
        
    };

    const [modalPost, setModalPost] = useState<boolean>(false);
    const [postId, setPostId] = useState<number>(0);
    const VerModalPost = (id:number) => {
        if(id > 0){
            setPostId (id);
            setModalPost(true);
        }
    }

    function showModal() {
        const modal = document.getElementById('modalOpcoes');
        if (modal) {
        if (modal.style.display == "flex") {
            modal.style.display = "none"
        } else {
            modal.style.display = "flex";
        }}
    }
    return (
        <div className='organizacaoPadrao'>
            <HeaderSite />
            {(modalPost) && <div className='Esmaecer'></div>}
            {modalPost && <VerPost setModal={setModalPost} postId={postId} />}
            {criarPasta && (<CriarPasta token={tokenAtual} setModal={setCriarPasta}/>)}
            {excluirPasta && (<ExcluirPasta setModal={setExcluirPasta} nomePasta={nomePastaSelecionada} pastaid={pastaId}/>)}
            {editarPasta && (<EditarPasta setPosts={setPosts} setModal={setEditarPasta} nomePasta={nomePastaSelecionada} pastaid={pastaId} descricao={descricaoPasta} posts={posts} imagemUrl={pastaImagem}/>)}

            <div className="pagPastas areaConteudo">
                <section className="pastas" >
                    <h2>Minhas pastas</h2>
                    <div className="new-project-card">
                            <button onClick={() => setCriarPasta(true)} style={{backgroundColor: "transparent"}} className="new-project-button">
                                <span className="new-project-icon dmSansThin">+</span>
                                <span className="new-project-text dmSansThin">Criar pasta</span>
                            </button>
                            <p className="new-project-description dmSans">
                                Organize seus itens favoritos da forma que desejar!
                            </p>
                        </div>
                    <div className='pastasDiv'>
                        
                        {
                            pastas.length < 1 ?
                                (
                                    null
                                )
                                :
                                (
                                    pastas.map((pasta, index) =>
                                    (
                                        <div className='card-pasta' key={index} onClick={() => selecionarPasta(`${pasta.id}`, `${pasta.nome}`, `${pasta.descricao}`, `${pasta.imagemUrl}`)}>
                                            <img className='card-capa' src={pasta.imagemUrl} alt='icone de carregamento' />
                                            <p><strong>{pasta.nome}</strong></p>
                                            <img className='icone' src='../public/imgs/pastas/iconeImg.svg' alt='icone de imagem' /> <span>{pasta.posts.length} publicações</span>
                                            <div className='botaoOpcoes' onClick={showModal}>
                                                <img src="../public/imgs/pastas/IconeOpcoes.svg" alt="" />
                                                <div id="modalOpcoes">
                                                    <button onClick={() => setExcluirPasta(true)}>
                                                        <img src="" alt="" />
                                                        Excluir Pasta
                                                    </button>
                                                    <button onClick={() => setEditarPasta(true)}>
                                                        <img src="" alt="" />
                                                        Editar Pasta
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    ))
                                )
                        }
                        {/* html estático
                        <div className='card-pasta'>
                        <img className='card-capa' src='../public/imgs/feed/iconeCarregamento.png' alt='icone de carregamento' />
                            <p><strong>{nome}</strong></p>
                            <img className='icone' src='../public/imgs/pastas/iconeImg.svg' alt='icone de imagem' /> <span>{lengthPasta} publicações</span>
                        </div> */}
                    </div>
                    <div>
                        <div>
                            <div className="pastaSelecionada">
                                <h2>{nomePastaSelecionada}</h2>
                                <span id="setaBaixo">v</span>

                            </div>
                            
                            {
                                posts.length < 1 ?
                                    (
                                        null
                                    )
                                    :
                                    (
                                        posts.map((pastaPost, index) =>
                                        (


                                            <div onClick={() => VerModalPost(pastaPost?.postid ?? 0)} key={index} className='item-pasta'>
                                                <picture>
                                                    <img src={pastaPost.post?.imagemUrl} alt="arte da pasta" />
                                                </picture>
                                                <div className='hover-item'>
                                                    <img className="vermais-post" src="../public/imgs/pastas/vermais-icon.svg" alt="ver mais" />
                                                    <div className='info-post'>
                                                        <h3>{pastaPost.post?.titulo}</h3>
                                                        <img src={pastaPost.post?.usuario?.imagemUrl} alt="" />
                                                        <p>{pastaPost.post?.usuario?.nome}</p>
                                                    </div>
                                                </div>
                                            </div>

                                        ))
                                    )
                            }
                        </div>
                    </div>
                </section>
            </div>
            <RodapeSite />
        </div>
    );
}
export default VerPastas;