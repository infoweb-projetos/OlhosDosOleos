import HeaderSite from '../componentes/header';
import RodapeSite from '../componentes/rodape';
import '../estilos/feed.css';
import { useEffect, useState } from 'react';
import { CarroselComum } from '../scripts/carrossel'
import axios from 'axios';
import { Post } from '../interfaces/Post';
import { Link } from 'react-router-dom';


const Feed: React.FC = () => {
    const [posts, setPosts] = useState<Array<Post>>([]);
    useEffect(() => {
        CarroselComum('anteBtn', 'proxBtn', 'carroselSlide', 'carroselFeedUsuarios', 'listaImagensCarroselFeedUsuario');

        axios.get('http://localhost:3000/posts/listar', {})
            .then(response => {
                const postsBD = response.data.dados;

                const postLista: Array<Post> = postsBD.map((p: any) => {
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
                        const blob = new Blob([new Uint8Array(obj.usuario.imagem.data)], { type: obj.usuario.imagemtipo });
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
    });
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
                    <li className="postFeed">
                        <figure>
                            <a href="">
                                <img src="imgs/temp/postFeed.png" />
                                <figcaption>Titulo</figcaption>
                            </a>
                        </figure>
                        <div>
                            <figure>
                                <a href="">
                                    <img src="imgs/feed/iconePerfilFeedPadrao.svg" />
                                    Nome
                                </a>
                            </figure>
                            <button>
                                100 mil
                                <img src="imgs/feed/iconeLikeFeed.svg" />
                            </button>
                        </div>
                    </li>
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
                            <a href="" className="carroselSlide"><img src="imgs/feed/fotoUsuarioNovoFeed.png" alt="" /></a>
                            <a href="" className="carroselSlide"><img src="imgs/feed/fotoUsuarioNovoFeed.png" alt="" /></a>
                            <a href="" className="carroselSlide"><img src="imgs/feed/fotoUsuarioNovoFeed.png" alt="" /></a>
                            <a href="" className="carroselSlide"><img src="imgs/feed/fotoUsuarioNovoFeed.png" alt="" /></a>
                            <a href="" className="carroselSlide"><img src="imgs/feed/fotoUsuarioNovoFeed.png" alt="" /></a>
                            <a href="" className="carroselSlide"><img src="imgs/feed/fotoUsuarioNovoFeed.png" alt="" /></a>
                            <a href="" className="carroselSlide"><img src="imgs/feed/fotoUsuarioNovoFeed.png" alt="" /></a>
                            <a href="" className="carroselSlide"><img src="imgs/feed/fotoUsuarioNovoFeed.png" alt="" /></a>
                            <a href="" className="carroselSlide"><img src="imgs/feed/fotoUsuarioNovoFeed.png" alt="" /></a>
                        </div>

                        <button className="prox" id="proxBtn"><img src="/imgs/feed/setaCarroselUsuarioDireita.svg" /></button>
                    </div>
                </div>

                <ul className="postsArea">
                    {posts.length === 0 ?
                    (
                        <li></li>
                    ) :
                    (
                        posts.map((post) => 
                        (
                            !post.rascunho ? 
                            (
                            <li className="postFeed">
                                <figure>
                                    <Link to="">
                                        <img src={post.imagemUrl} />
                                        <figcaption>{post.titulo}</figcaption>
                                    </Link>
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
                            (<li></li>)
                        ))
                    )}
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