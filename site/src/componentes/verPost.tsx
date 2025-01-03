import { useEffect, useState } from 'react';
import '../estilos/verPost.css';
import axios from 'axios';
import { Post } from '../interfaces/Post';
import { api } from '../apiUrl';
import { Tag } from '../interfaces/Enums';
import { VerificaToken } from '../scripts/uteis';
import { Comentario } from '../interfaces/Comentario';

interface parametros {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    postId: number;
}

const VerPost: React.FC<parametros> = ({setModal, postId}) => {
    const [tokenAtual, atualizarTokenAtual] = useState<string | null>("");
    const [post, setPost] = useState<Post | null>(null);
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [souEu, setSouEu] = useState<boolean>(false);
    const [seguindo, setSeguindo] = useState<boolean>(false);
    const [comentario, setComentario] = useState<Comentario>({postid: postId});
    const [criandoComentario, setCriandoComentario] = useState<boolean>(false);

    const VerificarToken = async () => {
        const token = await VerificaToken();
        if (token) atualizarTokenAtual(token);
        else {
            if (localStorage.getItem('tokenODO')) localStorage.removeItem('tokenODO');
        }
    }
    useEffect(() => {
        VerificarToken();
    }, []);

    const CarregarPost = async () => {
        axios.get(api + `posts/verpost/${postId}`, {})
        .then(response => {
            const postBD = response.data.dados;
            console.log(response.data.dados);
            const obj: Post = {
                titulo: postBD.titulo,
                usuario: postBD.usuario,
                imagem: postBD.imagem,
                imagemtipo: postBD.imagemtipo,
                usuarioid: postBD.usuarioid ?? 0,
                sensivel: postBD.sensivel ?? false,
                curtidas:postBD.curtidas,
                curtidasQtd: postBD.curtidas && postBD.curtidas.length > 0 ? postBD.curtidas.length : 0,
                entrada: postBD.entrada?postBD.entrada:undefined,
                processo: postBD.processo,
                descricao: postBD.descricao,
                tags: (postBD.tags as Array<{tag : Tag}>).map(item => item.tag) as Array<Tag>,
            };

            if (obj) {
                console.log(obj);
                if (obj.imagem && obj.imagemtipo) {
                    const blob = new Blob([new Uint8Array(obj.imagem.data)], { type: obj.imagemtipo });
                    const urlImagem = URL.createObjectURL(blob);
                    obj.imagemUrl = urlImagem;
                }

                if(obj.usuario){
                    if (obj.usuario?.imagem && obj.usuario?.imagemtipo) {
                        const blob = new Blob([new Uint8Array(obj.usuario?.imagem.data)], { type: obj.usuario?.imagemtipo });
                        const urlImagem = URL.createObjectURL(blob);
                        obj.usuario.imagemUrl = urlImagem;
                    }
                    else{
                        obj.usuario.imagemUrl = '/imgs/verPerfil/perfil.png';
                    }
                }
               

                if(obj.processo){
                    for (let processo of obj.processo){
                        if (processo.imagem && processo.imagemtipo) {
                            const blob = new Blob([new Uint8Array(processo.imagem.data)], { type: processo.imagemtipo });
                            const urlImagem = URL.createObjectURL(blob);
                            processo.imagemUrl = urlImagem;
                        }
                    }
                }
            }
            console.log(obj);
            setPost(obj);
        });
    }
    useEffect(() => {
        CarregarPost();
    }, []);

    const CarregaComentarios = async () => {
        axios.get(api + `comentarios/post/${postId}/comentarios`, {})
        .then(response => {
            const comentariosBD = response.data.dados;
            console.log('comen ', comentariosBD);
            const comentariosLista: Comentario[] = comentariosBD.map((c: Comentario) => {
                const obj = {...c};
                if (obj.usuario ){
                    if (obj.usuario.imagem && obj.usuario.imagemtipo){
                        const blob = new Blob([ new Uint8Array(obj.usuario.imagem.data)], { type: obj.usuario.imagemtipo });
                        const urlImagem = URL.createObjectURL(blob);
                        obj.usuario.imagemUrl = urlImagem;
                    }
                    else{
                        obj.usuario.imagemUrl = '/imgs/verPerfil/perfil.png';
                    }
                }
                return obj;
            });
            setComentarios(comentariosLista);
        });
    }
   
    useEffect(() => {
        CarregaComentarios();
    }, [comentario]);

    const CriarComentario = async () =>{
        if (tokenAtual && comentario.texto && comentario.postid){
            setCriandoComentario(true);
            axios.post(api + `comentarios/criar`, comentario, {headers: {'Authorization': `Bearer ${tokenAtual}` }})
            .then(response => {
                console.log(response.data.status);
                setComentario({postid: postId});
                setCriandoComentario(false);
            })
            .catch(error => {
                setCriandoComentario(false);
                console.log(error);
            });
        }
    }

    const VerificaSeguindo = async () => {
        if (post && post.usuario && post.usuario.seguidores){
            const usuarioId = await VerificaToken(true);
            if (usuarioId) setSeguindo(post.usuario.seguidores.filter(s => s.seguidorid == usuarioId).length > 0);
        }
    }
    const VerificaSouEu = async () => {
        if (post && post.usuario){
            const usuarioId = await VerificaToken(true);
            if (usuarioId) setSouEu(post.usuarioid == usuarioId);
        }
    }
    useEffect(() => {
        if (post){
            VerificaSeguindo();
            VerificaSouEu();
        }
       
    }, [post]);
    return (
        <div className="modalVerPost">
            <button onClick={() => setModal(false)}>
                <img src='/imgs/verPost/iconeFechar.svg'/>
            </button>
            <div className='modalVerPostCorpo'>
                <div className='modalVerPostConteudo'>
                    <div className='modalVerPostConteudoCabecalho'>
                        <img src={post?.usuario?.imagemUrl}/>
                        <div>
                            <h5>{post?.titulo}</h5>
                            <div>
                                <span>{post?.usuario?.nome}</span>
                                <canvas></canvas>
                                {!souEu && <button> {seguindo? "Deixar de Seguir" : "Seguir"}</button>}
                            </div>
                        </div>
                        
                    </div>
                    <div className='modalVerPostConteudoImagens'>
                        <img src={post?.imagemUrl}/>
                        {post?.processo && post?.processo.length > 0 && (
                            post?.processo.map((img, index) => (
                                <img key={index} src={img?.imagemUrl}/>
                            ))
                        )}
                    </div>

                    <div className='modalVerPostConteudoDesc'>
                        <h4>{post?.titulo}</h4>
                        <p>{post?.descricao}</p>
                        <div>
                            <figure>
                                <img src='/imgs/verPost/iconeCoracaoBranco.svg' />
                                <figcaption>{post?.curtidasQtd}</figcaption>
                            </figure>
                            <figure>
                                <img src='/imgs/verPost/iconeComentarioBranco.svg' />
                                <figcaption>{comentarios.length}</figcaption>
                            </figure>
                        </div>
                    </div>

                    <div className='modalVerPostConteudoAreaComentario'>
                        <div className='modalVerPostConteudoComentarios'>
                            <div>
                                <div>
                                    <img src='/imgs/verPerfil/perfil.png' />
                                    <textarea value={comentario.texto ? comentario.texto : undefined} onChange={(e) => setComentario({...comentario, texto: e.target.value})} placeholder='O que você achou da postagem?'></textarea>
                                </div>
                                <button disabled={criandoComentario}   onClick={() => CriarComentario()}  className={comentario.texto ? 'podeComentarVerPost' : ''}>Publicar comentário</button>
                            </div>
                            <ul>
                                {comentarios && comentarios.length > 0 && (
                                    comentarios.map((comentario, index) => (
                                        <li key={index}>
                                            <figure>
                                                <a href='#'><img src={comentario.usuario?.imagemUrl} /></a>
                                            </figure>
                                            <div>
                                                <div>
                                                    <h6 className='ubuntoThin'>{comentario.usuario?.nome}</h6>
                                                    <canvas></canvas>
                                                    <span className='ubuntoThin'>Há 5 dias</span>
                                                </div>
                                                <p className='ubuntoThin'>{comentario.texto}</p>
                                            </div>
                                        
                                        </li>
                                    ))
                                )}
                                
                            </ul>
                        </div>
                        <div className='modalVerPostConteudoAreaComentarioAside'>
                            <div className='modalVerPostConteudoAreaComentarioAsideProprietario'>
                                <p>PROPRIETÁRIO</p>
                                <div>
                                    <img src={post?.usuario?.imagemUrl}/>
                                    <div>
                                        <p>{post?.usuario?.nome}</p>
                                        {post?.usuario?.localizacao && typeof post?.usuario?.localizacao !== 'string' ? 
                                            (
                                                <span>
                                                <img src='/imgs/verPost/iconeLocalizacao.svg'/>
                                                    { 
                                                      'Brasil, ' + post?.usuario?.localizacao.estado.nome + ', '  + 
                                                      post?.usuario?.localizacao.cidade.nome
                                                    }
                                                </span>
                                            )
                                             
                                            : null
                                        }
                                       
                                    </div>
                                </div>
                                {
                                    !souEu && (
                                    <button className='modalVerPostConteudoAreaComentarioAsideProprietarioBtSeguir' >
                                        {!seguindo && <img src='/imgs/verPost/iconeSeguir.svg' />}
                                        {seguindo? "Deixar de Seguir" : "Seguir"}
                                    </button>
                                    )
                                }
                                
                                <button className='modalVerPostConteudoAreaComentarioAsideProprietarioBtVer'>
                                    <img  src='/imgs/verPost/iconeVer.svg' />
                                    Ver Perfi
                                </button>
                            </div>
                            <div className='modalVerPostConteudoAreaComentarioAsidePosts'>
                                <h5>{post?.titulo}</h5>
                                <div>
                                    <figure>
                                        <img src='/imgs/verPost/iconeCoracaoVermelho.svg' />
                                        <figcaption>{post?.curtidasQtd}</figcaption>
                                    </figure>
                                    <figure>
                                        <img src='/imgs/verPost/iconeComentarioVermelho.svg' />
                                        <figcaption>{comentarios.length}</figcaption>
                                    </figure>
                                </div>
                                <p>Publicado em: {post?.entrada ? new Date(post?.entrada)?.toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric'}) : null}</p>
                            </div>
                            <ul className='modalVerPostConteudoAreaComentarioAsideTags modalVerPostConteudoAreaComentarioAsideTagsTag'>
                                {post?.tags && post?.tags.length > 0 && (
                                    post?.tags.filter(t => t.ferramenta).map((tag, index) => (
                                        <li key={index} ># {tag.nome}</li>
                                    ))
                                )}
                            </ul>
                            <ul className='modalVerPostConteudoAreaComentarioAsideTags'>
                                {post?.tags && post?.tags.length > 0 && (
                                    post?.tags.filter(t => !t.ferramenta).map((tag, index) => (
                                        <li key={index} ># {tag.nome}</li>
                                    ))
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
               
            </div>
            <ul>
                   <li className='modalVerPostAcoesPerfil'>
                       <button>
                           <img src={post?.usuario?.imagemUrl}/>
                       </button>
                       {!souEu && <p>{seguindo? "Deixar de Seguir" : "Seguir"}</p>}
                    </li> 
                    <li  className='modalVerPostAcoesNormal'>
                       <button>
                           <img src='/imgs/verPost/iconeCurtir.svg' />
                       </button>
                       <p>Curtir</p>
                    </li> 
                    <li  className='modalVerPostAcoesNormal'>
                       <button>
                           <img src='/imgs/verPost/iconeComentar.svg' />
                       </button>
                       <p>Comentar</p>
                    </li> 
                    <li  className='modalVerPostAcoesNormal'>
                       <button>
                           <img src='/imgs/verPost/iconeSalvar.svg' />
                       </button>
                       <p>Salvar</p>
                    </li> 
                    <li  className='modalVerPostAcoesNormal'>
                       <button>
                           <img src='/imgs/verPost/iconeCompartilhar.svg' />
                       </button>
                       <p>Compartilhar</p>
                    </li> 
                    <li  className='modalVerPostAcoesNormal'>
                       <button>
                           <img src='/imgs/verPost/iconeBaixar.svg' />
                       </button>
                       <p>Baixar</p>
                    </li> 
                </ul>
        </div>
    );
}
export default VerPost;