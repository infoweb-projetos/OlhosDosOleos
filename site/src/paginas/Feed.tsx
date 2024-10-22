import HeaderSite from '../componentes/header';
import RodapeSite from '../componentes/rodape';
import '../estilos/feed.css';
import { useCallback, useEffect, useState } from 'react';
import { CarroselComum } from '../scripts/carrossel'
import axios from 'axios';
import { Post } from '../interfaces/Post';
import { Link, useNavigate } from 'react-router-dom';
import { Usuario } from '../interfaces/Usuario';
import {api} from '../apiUrl.ts';


const Feed: React.FC = () => {
    const [posts, setPosts] = useState<Array<Post>>([]);
    const [ultimosPosts, setUltimosPosts] = useState<Array<Post>>([]);
    const [ultimosUsuarios, setUltimosUsuarios] = useState<Array<Usuario>>([]);
    const [carroselAtivo, ativacaoCarrossel] = useState<boolean>(false);
    const navegar = useNavigate();

    const UltimosUsuarios = useCallback(async  () =>{
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
    }, [navegar])

    useEffect(() => {
        axios.get(api + 'posts/listar', {})
        .then(response => {
            const postsBD = response.data.dados;

            const postLista: Array<Post> = postsBD.map((p: Post) => {
                const obj: Post = {
                    titulo: p.titulo,
                    usuario: p.usuario,
                    usuarioid: p.usuarioid,
                    sensivel: p.sensivel,
                    rascunho: p.rascunho,
                    imagemUrl: ''
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
        UltimosUsuarios();
        if (ultimosUsuarios.length > 0 && !carroselAtivo) {
            CarroselComum('anteBtn', 'proxBtn', 'carroselSlide', 'carroselFeedUsuarios', 'listaImagensCarroselFeedUsuario');
            ativacaoCarrossel(true);
        }
    }, [ultimosPosts, posts, ultimosUsuarios, UltimosUsuarios, carroselAtivo, navegar]);

   
    return (
        <div className='organizacaoPadrao'>
            <HeaderSite />
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
                    <li>
                        <a href="">
                            <img src="imgs/temp/iconeCategoriaFeed.png" />
                            Categoria
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <img src="imgs/temp/iconeCategoriaFeed.png" />
                            Categoria
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <img src="imgs/temp/iconeCategoriaFeed.png" />
                            Categoria
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <img src="imgs/temp/iconeCategoriaFeed.png" />
                            Categoria
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <img src="imgs/temp/iconeCategoriaFeed.png" />
                            Categoria
                        </a>
                    </li>
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
                                        <button>
                                            100 mil
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
                                        <button>
                                            100 mil
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