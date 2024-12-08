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


const Feed: React.FC = () => {
    const [tokenAtual, atualizarTokenAtual] = useState<string | null>("");
    const [posts, setPosts] = useState<Array<Post>>([]);
    const[categorias, setCategorias] = useState<Array<Categoria>>([]);
    const [ultimosPosts, setUltimosPosts] = useState<Array<Post>>([]);
    const [ultimosUsuarios, setUltimosUsuarios] = useState<Array<Usuario>>([]);
    const [carroselAtivo, ativacaoCarrossel] = useState<boolean>(false);
    const navegar = useNavigate();
    const [modalFavoritar, setModalFavoritar] = useState<boolean>(false);
    const [postId, setPostId] = useState<number>(0);


    const SalvarPost = (id:number) => {
        if(id > 0){
            setPostId (id);
            setModalFavoritar(true);
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
                    rascunho: p.rascunho,
                    imagemUrl: '',
                    curtidasQtd: p.curtidas && p.curtidas.length > 0 ? p.curtidas.length : 0
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
            setUltimosPosts(postLista.slice(0, postLista.length > 8 ? 8 : postLista.length));
            if (postLista.length > 8){
                setPosts(postLista.slice(8));
            }
        })
        .catch(error => {
            console.log(error);
            navegar('/');
        });
    }

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
    
    const VerificarToken = async () => {
        const token = await VerificaToken();
        if (token) atualizarTokenAtual(token);
    }
    useEffect(() => {
        VerificarToken();
    }, []);


    useEffect(() => {
        CarregarCategorias(),
        CarregarPosts();
        UltimosUsuarios();
    }, []);

    useEffect(() => {
        if (ultimosUsuarios.length > 0 && !carroselAtivo) {
            CarroselComum('anteBtn', 'proxBtn', 'carroselSlide', 'carroselFeedUsuarios', 'listaImagensCarroselFeedUsuario');
            ativacaoCarrossel(true);
        }
    }, [ultimosUsuarios, UltimosUsuarios]);

   
    return (
        <div className='organizacaoPadrao'>
            <HeaderSite />
            {modalFavoritar && <FavoritarPost token={tokenAtual} setModal={setModalFavoritar} postId={postId}/>}
            <div className="areaConteudo feed">
                <h1>Descubra a arte <b>potiguar</b>!</h1>
                <form className="espacamentoFeedComum">
                    <select className="botaoComum fundoBtBranco">
                        <option>Classificar</option>
                        <option>aa</option>
                    </select>
                    <button type="button" className="botaoComum fundoBtBranco"><img src="imgs/feed/iconeFIltrar.svg" alt="Icone de filtragem" /> Filtrar</button>
                </form>
                <ul className="menuCategoriasFiltro">
                    {categorias.length > 0 ? (
                        categorias.map((categoria, index) => (
                            <li key={index}>
                                <a>
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
                {
                        ultimosPosts.length === 0 ?
                        (
                            <li></li>
                        ) :
                        (
                            ultimosPosts.map((post, index) => 
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
                                        <Link to="">
                                            <img  className={ post.sensivel ? "conteudoSensivel" : ""} src={post.imagemUrl} />
                                            <figcaption>{post.titulo}</figcaption>
                                        </Link>
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
                                        <button onClick={() => CurtirPost(post.id? post.id : 0, tokenAtual, setUltimosPosts, ultimosPosts)}>
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
                        posts.length === 0 ?
                        (
                            <li></li>
                        ) :
                        (
                            posts.map((post, index) => 
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
                                        <Link to="">
                                            <img  className={ post.sensivel ? "conteudoSensivel" : ""} src={post.imagemUrl} />
                                            <figcaption>{post.titulo}</figcaption>
                                        </Link>
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
                                            <Link to="">
                                                <img src={post.usuario?.imagemUrl} />
                                                {post.usuario?.nome}
                                            </Link>
                                        </figure>
                                        <button onClick={() => CurtirPost(post.id? post.id : 0, tokenAtual, setPosts, posts)}>
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
                        <li><button type="button" >Todos</button></li>
                        <li><button type="button" >Recentes</button></li>
                        <li><button type="button" >Meus Artistas</button></li>
                        <li><button type="button" >Populares</button></li>
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