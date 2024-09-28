import HeaderSite from '../componentes/header';
import RodapeSite from '../componentes/rodape';
import '../estilos/feed.css';
import { useEffect} from 'react';
import {CarroselComum} from '../scripts/carrossel'


const Feed: React.FC = () => {
    useEffect(() => {
        CarroselComum('anteBtn', 'proxBtn', 'carroselSlide', 'carroselFeedUsuarios', 'listaImagensCarroselFeedUsuario')
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