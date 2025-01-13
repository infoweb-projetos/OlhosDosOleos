import { useEffect, useState } from 'react';
import '../estilos/verPost.css';
import axios from 'axios';
import { Post } from '../interfaces/Post';
import { api } from '../apiUrl';
import { Tag } from '../interfaces/Enums';
import { CurtirPostSimples, SeguirSimples, VerificaToken } from '../scripts/uteis';
import { Comentario } from '../interfaces/Comentario';
import { Link, useNavigate } from 'react-router-dom';
import { tempoRelativo } from '../scripts/funcoesUteis';
import FavoritarPost from './favoritarPost';

interface parametros {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    postId: number;
}

const VerPost: React.FC<parametros> = ({setModal, postId}) => {
    const navegar = useNavigate();
    const [tokenAtual, atualizarTokenAtual] = useState<string | null>("");
    const [post, setPost] = useState<Post | null>(null);
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [souEu, setSouEu] = useState<boolean>(false);
    const [seguindo, setSeguindo] = useState<boolean>(false);
    const [naoCurtido, setNaoCurtido] = useState<boolean>(true);
    const [favoritado, setFavoritado] = useState<boolean>(false);
    const [comentario, setComentario] = useState<Comentario>({postid: postId});
    const [habilitaComentario, setHabilitaComentario] = useState<boolean>(true);
    const [foto, setFoto] = useState<string>("/imgs/verPerfil/perfil.png");
    const [modalFavoritar, setModalFavoritar] = useState<boolean>(false);

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

    const verPerfil = (id: number) =>{
        if (id > 0) navegar(`/perfil/${id}`)
    }

    const CarregarPost = async () => {
        axios.get(api + `posts/verpost/${postId}`, {})
        .then(response => {
            const postBD = response.data.dados;
            if(postBD){
                const obj: Post = {
                    id: postId,
                    titulo: postBD.titulo ?? '',
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
                setPost(obj);
            }
            
        });
    }
    useEffect(() => {
        CarregarPost();
    }, []);

    const CarregaComentarios = async () => {
        axios.get(api + `comentarios/post/${postId}/comentarios`, {})
        .then(response => {
            const comentariosBD = response.data.dados;
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
    }, []);

    const CriarComentario = async () =>{
        if (tokenAtual && comentario.texto && comentario.postid){
            setHabilitaComentario(false);
            axios.post(api + `comentarios/criar`, comentario, {headers: {'Authorization': `Bearer ${tokenAtual}` }})
            .then(response => {
                let obj = response.data.dados as Comentario;
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
                setComentarios([obj , ...comentarios])
            })
            .catch(error => {
                console.log(error);
                setHabilitaComentario(true);
            });
            setHabilitaComentario(true);
        }
    }

    const SetarImagem = async () => {
        const url = api + 'usuarios/perfil';
        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${tokenAtual}`
            }
        })
        .then(response => {
            const usu = response.data.dados;
            if (usu && usu.imagem && usu.imagem.data && usu.imagemtipo) {
                const blob = new Blob([new Uint8Array(usu.imagem.data)], { type: usu.imagemtipo });
                const urlImagem = URL.createObjectURL(blob);
                setFoto(urlImagem);
            } else {
                setFoto("/imgs/verPerfil/perfil.png");
            }
        })
        .catch(() => setFoto("/imgs/verPerfil/perfil.png"));
    }
    useEffect(() => {
        if(tokenAtual) SetarImagem()
    }, [tokenAtual]);

    const VerificaSeguindoCurtida = async () => {
        if (post && post.usuario){
            const usuarioId = await VerificaToken(true);
            if (usuarioId){
                if (post.usuario.seguidores) setSeguindo(post.usuario.seguidores.filter(s => s.seguidorid == usuarioId).length > 0);
                if (post.curtidas) setNaoCurtido(post.curtidas.filter(c => c.usuarioid == usuarioId).length < 1);
            } 
        }
    }
    const VerificaFavoritado = async () => {
        if (post){
            const usuarioId = await VerificaToken(true);
            if (usuarioId){
                axios.get(api + `pastas/favoritado/post/${post.id ?? 0}`, {headers: {'Authorization': `Bearer ${tokenAtual}` }})
                .then(response => {
                    setFavoritado(response.data.favoritado);
                })
                .catch(error =>{
                    console.log(error);
                    setFavoritado(false);
                })
            } 
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
            VerificaSeguindoCurtida();
            VerificaSouEu();
            VerificaFavoritado();
        }
    }, [post]);

    useEffect(() => {
        if (post && !modalFavoritar){
            VerificaFavoritado();
        }
    }, [modalFavoritar]);

    const Curtir = () => {
        if(post && tokenAtual){
            CurtirPostSimples(post.id ?? 0, tokenAtual, setNaoCurtido);
            console.log(naoCurtido)
        }
    }
    const Favoritar =  () =>{
        if(post && tokenAtual && post.id){
            setModalFavoritar(true);
        }
    }
    const SeguirProprietario = () =>{
        if (post && tokenAtual){
            SeguirSimples(post?.usuarioid ?? 0, tokenAtual, setSeguindo);
        }
    }
    return (
        <div className="modalVerPost">
            {modalFavoritar && <FavoritarPost token={tokenAtual} setModal={setModalFavoritar} postId={post?.id ?? 0}/>}
            <button onClick={() => setModal(false)}>
                <img src='/imgs/verPost/iconeFechar.svg'/>
            </button>
            <div className='modalVerPostCorpo'>
                <div className='modalVerPostConteudo'>
                    <div className='modalVerPostConteudoCabecalho'>
                        <img onClick={() => verPerfil(post?.usuario?.id ?? 0)} src={post?.usuario?.imagemUrl}/>
                        <div>
                            <h5>{post?.titulo}</h5>
                            <div>
                                <span onClick={() => verPerfil(post?.usuario?.id ?? 0)}>{post?.usuario?.nome}</span>
                                <canvas></canvas>
                                {!souEu && <button onClick={() => SeguirProprietario()}> {seguindo? "Deixar de Seguir" : "Seguir"}</button>}
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
                                    <img src={foto} />
                                    <textarea value={comentario.texto ? comentario.texto : undefined} onChange={(e) => setComentario({...comentario, texto: e.target.value})} placeholder='O que você achou da postagem?'></textarea>
                                </div>
                                <button disabled={!habilitaComentario}   onClick={() => CriarComentario()}  className={comentario.texto ? 'podeComentarVerPost' : ''}>Publicar comentário</button>
                            </div>
                            <ul>
                                {comentarios && comentarios.length > 0 && (
                                    comentarios.map((comentario, index) => (
                                        <li key={index}>
                                            <figure>
                                                <Link to={`/perfil/${comentario.usuarioid}`}><img src={comentario.usuario?.imagemUrl} /></Link>
                                            </figure>
                                            <div>
                                                <div>
                                                    <h6 className='ubuntoThin'>{comentario.usuario?.nome}</h6>
                                                    <canvas></canvas>
                                                    <span className='ubuntoThin'>
                                                    {
                                                        comentario.criacao ?
                                                        tempoRelativo(new Date(comentario.criacao))
                                                        : ''
                                                        
                                                    }
                                                    </span>
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
                                    <button onClick={() => SeguirProprietario()} className='modalVerPostConteudoAreaComentarioAsideProprietarioBtSeguir' >
                                        {!seguindo && <img src='/imgs/verPost/iconeSeguir.svg' />}
                                        {seguindo? "Deixar de Seguir" : "Seguir"}
                                    </button>
                                    )
                                }
                                
                                <button onClick={() => verPerfil(post?.usuario?.id ?? 0)} className='modalVerPostConteudoAreaComentarioAsideProprietarioBtVer'>
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
                       <button onClick={() => verPerfil(post?.usuario?.id ?? 0)}>
                           <img src={post?.usuario?.imagemUrl}/>
                       </button>
                       {!souEu && <button onClick={() => SeguirProprietario()} className='btSeguirVerPost'>{seguindo? "Deixar de Seguir" : "Seguir"}</button>}
                    </li> 
                    <li onClick={() => Curtir()} className='modalVerPostAcoesNormal'>
                       <button >
                           <img src={naoCurtido ? '/imgs/verPost/iconeCurtir.svg' : '/imgs/verPost/iconeCurtido.svg'} />
                       </button>
                       <p>Curtir</p>
                    </li> 
                    <li  className='modalVerPostAcoesNormal'>
                       <button>
                           <img src='/imgs/verPost/iconeComentar.svg' />
                       </button>
                       <p>Comentar</p>
                    </li> 
                    <li onClick={() => Favoritar()} className='modalVerPostAcoesNormal'>
                       <button >
                           <img src={!favoritado ? '/imgs/verPost/iconeSalvar.svg' : '/imgs/verPost/iconeSalvo.svg'} />
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