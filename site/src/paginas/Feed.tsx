import HeaderSite from '../componentes/header';
import RodapeSite from '../componentes/rodape';
import '../estilos/feed.css';
import '../estilos/carroselComum.css';
import { useEffect, useState } from 'react';
import { CarroselComum } from '../scripts/carrossel'
import axios from 'axios';
import { Post } from '../interfaces/Post';
import { Link, useNavigate } from 'react-router-dom';
import { Usuario } from '../interfaces/Usuario';
import {api} from '../apiUrl.ts';
import { CurtirPost, VerificaToken } from '../scripts/uteis.tsx';
import { AbrirFecharModal } from '../scripts/modal.ts';
import FavoritarPost from '../componentes/favoritarPost.tsx';
import { Categoria } from '../interfaces/Enums.ts';
import VerPost from '../componentes/verPost.tsx';


type Ordenacao = 'Recentes' | 'Populares' | 'Curtidos' | 'Meus Artistas';

const Feed: React.FC = () => {
    const [tokenAtual, atualizarTokenAtual] = useState<string | null>("");
    const [posts, setPosts] = useState<Post[]>([]);
    const[ordenacao, setOrdenacao]= useState<Ordenacao>("Recentes");
    const[categorias, setCategorias] = useState<Array<Categoria>>([]);
    const[categoriaSelecionada, setCategoriaSelecionada]=useState<string>('');
    const[postsExibidos, setPostsExibidos] = useState<Array<Post>>([]);
    const [ultimosUsuarios, setUltimosUsuarios] = useState<Array<Usuario>>([]);
    const [carroselAtivo, ativacaoCarrossel] = useState<boolean>(false);
    const navegar = useNavigate();
    const [modalFavoritar, setModalFavoritar] = useState<boolean>(false);
    const [modalPost, setModalPost] = useState<boolean>(false);
    const [postId, setPostId] = useState<number>(0);

    const VerificarToken = async () => {
        const token = await VerificaToken();
        if (token) atualizarTokenAtual(token);
    }
    useEffect(() => {
        VerificarToken();
    }, []);
    useEffect(() => {
        CarregarCategorias(),
        UltimosUsuarios();
    }, []);

    const SalvarPost = (id:number) => {
        if(id > 0){
            setPostId (id);
            setModalFavoritar(true);
        }
    }

    const VerModalPost = (id:number) => {
        if(id > 0){
            setPostId (id);
            setModalPost(true);
        }
    }
    
    const UltimosUsuarios = async  () => {
        axios.get(api + 'usuarios/ultimos', {})
        .then(response => {
            const usuariosBD = response.data.dados;
            const usuariosLista: Array<Usuario> = usuariosBD.map((u: Usuario) => {
                const obj: Usuario = {
                    tipoid: u.tipoid,
                    id: u.id,
                    imagemUrl: ''
                };
                if (u.imagem && u.imagemtipo) {
                    const blob = new Blob([ new Uint8Array(u.imagem.data)], { type: u.imagemtipo });
                    const urlImagem = URL.createObjectURL(blob);
                    obj.imagemUrl = urlImagem;
                }
                else {
                    obj.imagemUrl = "/imgs/verPerfil/perfil.png";
                }

                return obj;
            });
            setUltimosUsuarios(usuariosLista);
        })
        .catch(error => {
            console.log(error);
            navegar('/');
        });
    }
    
    const CarregarPosts = async () =>{
        axios.get(api + 'posts/listar', {})
        .then(response => {
            const postsBD = response.data.dados;

            const postLista: Array<Post> = postsBD.map((p: Post) => {
                const obj: Post = {
                    id: p.id,
                    titulo: p.titulo,
                    usuario: p.usuario,
                    usuarioid: p.usuarioid,
                    sensivel: p.sensivel,
                    categoriaid:p.categoriaid,
                    rascunho: p.rascunho,
                    imagemUrl: '',
                    curtidas:p.curtidas,
                    curtidasQtd: p.curtidas && p.curtidas.length > 0 ? p.curtidas.length : 0,
                    entrada: p.entrada?p.entrada:undefined,
                    comentariosQtd: p.comentarios ? p.comentarios.length : 0,
                };

                if (p.imagem && p.imagemtipo) {
                    const blob = new Blob([new Uint8Array(p.imagem.data)], { type: p.imagemtipo });
                    const urlImagem = URL.createObjectURL(blob);
                    obj.imagemUrl = urlImagem;
                }

                if (obj.usuario && obj.usuario && obj.usuario.imagem && obj.usuario.imagemtipo) {
                    const blob = new Blob([ new Uint8Array(obj.usuario.imagem.data)], { type: obj.usuario.imagemtipo });
                    const urlImagem = URL.createObjectURL(blob);
                    obj.usuario.imagemUrl = urlImagem;
                } else {
                    if (obj.usuario) obj.usuario.imagemUrl = "/imgs/verPerfil/perfil.png";
                }
                return obj;
            });
            setPosts(postLista);
        })
        .catch(error => {
            console.log(error);
            navegar('/');
        });
    }
    
    const OrdenaPosts = async (filtro:Ordenacao) => {

        let postsOrdenados=[...posts]
        if(categoriaSelecionada){
            postsOrdenados=postsOrdenados.filter(post => post.categoriaid === categoriaSelecionada)
        }
        switch(filtro){
            case 'Curtidos':
                {
               
                const usuarioId= await VerificaToken(true);
                if(usuarioId){        
                    postsOrdenados= postsOrdenados.filter(post => post.curtidas?.some(curtida=> curtida.usuarioid === usuarioId)); 
                }
                break;
            }
            case 'Populares':
            {
                postsOrdenados=postsOrdenados.sort((a,b) => (b.curtidasQtd || 0) - (a.curtidasQtd ||0));
                break;
            }
            case 'Meus Artistas':
            {
                const usuarioId = await VerificaToken(true);
                if(usuarioId){        
                    postsOrdenados= postsOrdenados.filter(post => post.usuario?.seguidores?.some(seguidor=> seguidor.seguidorid === usuarioId)); 
                }
                break;
            }
            case 'Recentes':{
                postsOrdenados= postsOrdenados.sort((a,b)=> 
                    new Date(b.entrada || 0).getTime() - new Date(a.entrada || 0).getTime()
                );
                break;
            } default: return posts;
        }
        setPostsExibidos(postsOrdenados);
        setClassificadorAtual(-1);
    }

    useEffect(() =>{
        CarregarPosts();
    },[]);

    useEffect(() => {
        if(posts.length>0){

            OrdenaPosts(ordenacao);
        }
    }, [ordenacao, posts,categoriaSelecionada]);


    const CarregarCategorias = async () =>{
        try{
            axios.get(api + 'categorias/listar',{})
                .then(response =>{
                    const categorias = response.data.dados;
                    const catLista: Array<Categoria> = categorias.map((c:Categoria)=>{
                        const item: Categoria ={
                            nome:c.nome,
                        };
                        return item;
                    });
                    if (catLista.length > 0){
                        setCategorias(catLista);
                    }
                })
        }catch(error){
            console.log('Erro ao carregar as categorias',error);
            navegar('/');
        }
    }
    const SelecionarCategoria = (categoriaId: string)=>{

        setCategoriaSelecionada(categoriaId===categoriaSelecionada?'':categoriaId);

    }

    useEffect(() => {
        if (ultimosUsuarios.length > 0 && !carroselAtivo) {
            CarroselComum('anteBtn', 'proxBtn', 'carroselSlide', 'carroselFeedUsuarios', 'listaImagensCarroselFeedUsuario');
            ativacaoCarrossel(true);
        }
    }, [ultimosUsuarios, UltimosUsuarios]);
    
    useEffect(() => {
        if (postId) {
            setPostId(0);
        }
    }, [modalPost]);

    const [modalClassificar, setModalClassificar] = useState<boolean>(false);
    const Classificacoes = {
        Recomendado: 0,
        Recente: 1,
        Curtidos: 2,
        Comentados: 3,
    }
    const [classificadorAtual, setClassificadorAtual] = useState<number>(Classificacoes.Recente);
    const classificarPosts = (classificacao: number) => {
        if(postsExibidos && postsExibidos.length > 0){
            setClassificadorAtual(classificacao)
            let postsCopia = [...postsExibidos];
            if (classificacao == Classificacoes.Recomendado){
                postsCopia.sort((a, b) => (b.curtidasQtd ?? 0) + (b.comentariosQtd ?? 0) - (a.curtidasQtd ?? 0) + (a.comentariosQtd ?? 0));
            }
            else if (classificacao == Classificacoes.Curtidos){
                postsCopia.sort((a, b) => (b.curtidasQtd ?? 0)- (a.curtidasQtd ?? 0));
            }
            else if (classificacao == Classificacoes.Comentados){
                postsCopia.sort((a, b) => (b.comentariosQtd ?? 0) - (a.comentariosQtd ?? 0));
            }
            else if (classificacao == Classificacoes.Recente){
                postsCopia.sort((a, b) => {
                    const timeA = a.entrada instanceof Date && !isNaN(a.entrada.getTime()) ? a.entrada.getTime() : 0;
                    const timeB = b.entrada instanceof Date && !isNaN(b.entrada.getTime()) ? b.entrada.getTime() : 0;
                    return timeB - timeA;
                });
            }
            setPostsExibidos(postsCopia);
        }
    }
    

    return (
        <div className='organizacaoPadrao'>
            {(modalPost) && <div className='Esmaecer'></div>}
            <HeaderSite />
            {modalFavoritar && <FavoritarPost token={tokenAtual} setModal={setModalFavoritar} postId={postId}/>}
            {modalPost && <VerPost setModal={setModalPost} postId={postId} />}
            <div className="areaConteudo feed">
                <h1>Descubra a arte <b>potiguar</b>!</h1>
                <form className="espacamentoFeedComum">
                    <button type="button" className="botaoComum fundoBtBranco"><img src="imgs/feed/iconeFIltrar.svg" alt="Icone de filtragem" /> Filtrar</button>
                    <button onClick={() => setModalClassificar(!modalClassificar)} id='btClassificarFeed' type="button" className="botaoComum fundoBtBranco">
                        Classificar
                        {
                            modalClassificar &&
                            (
                                <ul className='modalClassificar'>
                                    <li onClick={() => classificarPosts(Classificacoes.Recomendado)}>
                                        <button className={classificadorAtual == Classificacoes.Recomendado ? 'btClassificarFeedSelecionado' : ''} >Recomendado</button>
                                    </li>
                                    <li onClick={() => classificarPosts(Classificacoes.Recente)}>
                                        <button className={classificadorAtual == Classificacoes.Recente ? 'btClassificarFeedSelecionado' : ''}>Mais Recente</button>
                                    </li>
                                    <li  onClick={() => classificarPosts(Classificacoes.Curtidos)}>
                                        <button className={classificadorAtual == Classificacoes.Curtidos ? 'btClassificarFeedSelecionado' : ''}>Mais Curtido</button>
                                    </li>
                                    <li onClick={() => classificarPosts(Classificacoes.Comentados)}>
                                        <button className={classificadorAtual == Classificacoes.Comentados ? 'btClassificarFeedSelecionado' : ''}>
                                            Mais Comentado
                                        </button>
                                    </li>
                                </ul>
                            )
                        }
                    </button>
                </form>
                <ul className="menuCategoriasFiltro">
                    {categorias.length > 0 ? (
                        categorias.map((categoria, index) => (
                            <li key={index}>
                                <a
                                    onClick={()=> SelecionarCategoria(categoria.nome)}
                                    className={categoriaSelecionada===categoria.nome? 'categoriaSelecionada':''}
                                >
                                    <img src="imgs/temp/iconeCategoriaFeed.png" alt={categoria.nome} />
                                    {categoria.nome}
                                </a>
                            </li>
                        ))
                    ) : (
                        <li>Carregando Categorias...</li>
                    )}
                </ul>


                <ul className="postsArea">
                    {postsExibidos.length === 0 ?(
                            <li>Não há posts...</li>
                        ) : (
                            postsExibidos.slice(0,8).map((post, index) => 
                            (
                                
                                !post.rascunho ? 
                                (
                                <li key={index} className="postFeed">
                                   
                                    <figure className='postArea'>
                                        <div className='opcoesPostFeed'>
                                            <img onClick={() => AbrirFecharModal('menuOpcoesPostFeed' + post.id)} src='/imgs/verPerfil/iconesOpcoesHorizontal.svg' />
                                            <ul id={'menuOpcoesPostFeed' + post.id} className='modalOpcoesComum'>
                                                <li>
                                                    <button onClick={() => SalvarPost(post.id ? post.id : 0)} className='modalOpcoesComumBt'>
                                                        Favoritar
                                                        <img src='/imgs/feed/iconeFavoritoVermelho.svg' />
                                                    </button>
                                                </li>
                                                <li>
                                                    <button className='modalOpcoesComumBt'>
                                                        Baixar
                                                        <img src='/imgs/feed/iconeDowloadVermelho.svg' />
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                        <a onClick={() => VerModalPost(post?.id ?? 0)}>
                                            <img  className={ post.sensivel ? "conteudoSensivel" : ""} src={post.imagemUrl} />
                                            <figcaption>{post.titulo}</figcaption>
                                        </a>
                                        {
                                            post.sensivel ?
                                            (
                                            <div className='divSensivel'>
                                                <img src="/imgs/verPerfil/olhoSensivel.svg" alt="Icone indicando conteudo sensivel." />
                                            </div>
                                            )
                                            :
                                            (null)
                                        }
                                        
                                    </figure>
                                    <div>
                                        <figure>
                                            <Link to={`/perfil/${post.usuario?.id}`}>
                                                <img src={post.usuario?.imagemUrl} />
                                                {post.usuario?.nome}
                                            </Link>
                                        </figure>
                                        <button onClick={() => {CurtirPost(post.id? post.id : 0, tokenAtual, setPosts, posts); OrdenaPosts(ordenacao)}}>
                                            {post.curtidasQtd}
                                            <img src="imgs/feed/iconeLikeFeed.svg" />
                                        </button>
                                    </div>
                                </li>
                                ) 
                                : 
                                (<li key={index}></li>)
                            ))
                        )
                    }
                </ul>
                <div className="areaCarroselNovosUsuarios">
                    <div className="espacamentoFeedComum">
                        <div className="areaTextoCarrosel">
                            <p className="dmSansThin">Checa só nossa exibição dos novatos aqui no site! Eles acabaram de chegar e já tão arrasando! </p>
                            <p className="dmSansThin">
                                Se achegue você também, pois aqui te damos holofotes e oportunidades pra você brilhar
                                <img src="imgs/feed/iconeBrilho.svg" />
                            </p>
                        </div>
                        <img src="imgs/feed/iconePincelCavalete.svg" />
                    </div>

                    <div className="carrosel" id='carroselFeedUsuarios'>
                        <button className="ante" id="anteBtn"><img src="imgs/feed/setaCarroselUsuarioEsquerda.svg" /></button>
                        <div id="listaImagensCarroselFeedUsuario" className="imagemCarrosel">
                            {
                                ultimosUsuarios.length > 0 ?
                                (
                                    ultimosUsuarios.map((usuario, index) => 
                                    (
                                        <Link to={`/perfil/${usuario.id}`} key={index} className="carroselSlide">
                                            <img src={usuario.imagemUrl} alt="" />
                                        </Link>
                                    ))
                                )
                                :
                                (null)
                            }
                        </div>

                        <button className="prox" id="proxBtn"><img src="/imgs/feed/setaCarroselUsuarioDireita.svg" /></button>
                    </div>
                </div>

                <ul className="postsArea">
                    {
                        postsExibidos.length === 0 ?
                        (
                            <li></li>
                        ) :
                        (
                            postsExibidos.slice(8).map((post, index) => 
                            (
                                !post.rascunho ? 
                                (
                                <li key={index} className="postFeed">
                                    <figure className='postArea'>
                                        <div className='opcoesPostFeed'>
                                            <img onClick={() => AbrirFecharModal('menuOpcoesPostFeed' + post.id)} src='/imgs/verPerfil/iconesOpcoesHorizontal.svg' />
                                            <ul id={'menuOpcoesPostFeed' + post.id} className='modalOpcoesComum'>
                                                <li>
                                                    <button className='modalOpcoesComumBt'>
                                                        Favoritar
                                                        <img src='/imgs/feed/iconeFavoritoVermelho.svg' />
                                                    </button>
                                                </li>
                                                <li>
                                                    <button className='modalOpcoesComumBt'>
                                                        Baixar
                                                        <img src='/imgs/feed/iconeDowloadVermelho.svg' />
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                        <a  onClick={() => VerModalPost(post?.id ?? 0)}>
                                            <img  className={ post.sensivel ? "conteudoSensivel" : ""} src={post.imagemUrl} />
                                            <figcaption>{post.titulo}</figcaption>
                                        </a>
                                        {
                                            post.sensivel ?
                                            (
                                            <div className='divSensivel'>
                                                <img src="/imgs/verPerfil/olhoSensivel.svg" alt="Icone indicando conteudo sensivel." />
                                            </div>
                                            )
                                            :
                                            (null)
                                        }
                                        
                                    </figure>
                                    <div>
                                        <figure>
                                            <Link to={`/perfil/${post.usuario?.id}`}>
                                                <img src={post.usuario?.imagemUrl} />
                                                {post.usuario?.nome}
                                            </Link>
                                        </figure>
                                        <button onClick={() => {CurtirPost(post.id? post.id : 0, tokenAtual, setPosts, posts); OrdenaPosts(ordenacao)}}>
                                            {post.curtidasQtd}
                                            <img src="imgs/feed/iconeLikeFeed.svg" />
                                        </button>
                                    </div>
                                </li>
                                ) 
                                : 
                                (<li key={index}></li>)
                            ))
                        )
                    }
                </ul>

                <div className="areaOrdernarRapido">
                    <ul className="">
                        {["Recentes","Curtidos", "Meus Artistas", "Populares"].map((filtro) =>(
                            <li key={filtro}>

                                <button 
                                    type='button' 
                                    onClick={() => setOrdenacao(filtro as Ordenacao)}
                                    className={ordenacao===filtro?'ativo':''}>

                                    {filtro}

                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <button className="btVoltarTopo">
                    <img src="imgs/feed/setaVoltarPraTopo.svg" />
                </button>
            </div>
            <RodapeSite />
        </div>
    );
}
export default Feed;
