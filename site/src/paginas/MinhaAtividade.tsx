import { useState } from 'react';
import HeaderSite from '../componentes/header';
import RodapeSite from '../componentes/rodape';
import '../estilos/minhaAtividade.css';

const MinhaAtividade: React.FC = () => {
    const [selecionarCurtidas, setSelecionarCurtida] = useState<boolean>(false);
    const [selecionarComentarios, setSelecionarComentarios] = useState<boolean>(false);
    const [tabSelecionada, setTabSelecionada] = useState<boolean>(true);

    return (
        <div className='organizacaoPadrao'>
            <HeaderSite />
            <div className="areaConteudo pagMinhaAtividade">
                <div>
                    <div className='introducaoMinhaAtividade'>
                        <h3>Sua Atividade</h3>
                        <ul>
                            <li>
                                <figure>
                                    <img src='/imgs/minhaAtividade/iconeInteracoes.svg' />
                                </figure>
                                <div>
                                    <h4>Interações</h4>
                                    <span>Analise e exclua curtidas, comentarios e outras interações</span>
                                </div>
                            </li>
                            <li>
                                <figure>
                                    <img src='/imgs/minhaAtividade/iconeHistorico.svg' />
                                </figure>
                                <div>
                                    <h4>Historico da Conta</h4>
                                    <span>Verifique as atividades que você fez desde que criou sua conta</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className='conteudoMinhaAtividade'>
                        <ul className='tabsAtividade'>
                            <li className='ocupaEspacoAtividade ocupaEspacoAtividadeEsquerdo'></li>
                            <li onClick={() => setTabSelecionada(true)} className='tipoAtividade '><button className={tabSelecionada ? 'tabSelecionadaAtividade' : ''}>Curtidas</button></li>
                            <li onClick={() => setTabSelecionada(false)} className='tipoAtividade'><button className={!tabSelecionada ? 'tabSelecionadaAtividade' : ''}>Comentarios</button></li>
                            <li className='ocupaEspacoAtividade'></li>
                        </ul>
                        {
                            tabSelecionada ?
                                (
                                    <div className='postsCurtidosAtividade'>
                                        <div>
                                            <div>
                                                <h5>Sua Atividade</h5>
                                                <button>Classificar e Filtrar</button>
                                            </div>
                                            <button onClick={() => setSelecionarCurtida(!selecionarCurtidas)}>Selecionar</button>
                                        </div>
                                        <ul >
                                            <li>
                                                <figure>
                                                    <img src='/imgs/temp/postFeed.png' />
                                                    {
                                                        selecionarCurtidas &&
                                                        (
                                                            <canvas></canvas>
                                                        )
                                                    }
                                                    {
                                                        selecionarCurtidas &&
                                                        (
                                                            <img className='selecionadoInteracaoAtividade' src='/imgs/minhaAtividade/iconeSelecionado.svg' />
                                                        )
                                                    }
                                                    {/* nova interface, com selecionado para exibir canvas ou img */}
                                                </figure>
                                            </li>
                                        </ul>
                                    </div>
                                )
                                :
                                (
                                    <div className='postsComentariosAtividade'>
                                        <div>
                                            <h5>Sua Atividade</h5>
                                            <button onClick={() => setSelecionarComentarios(!selecionarComentarios)}>Selecionar</button>
                                        </div>
                                        <ul >
                                            <li className={selecionarComentarios ? 'atividadeComentarioSelecionado' : ''}>
                                                <div className='atividadeComentarioAreaCriadorPost'>
                                                    <div>
                                                        <figure className='atividadeComentarioUsuario'>
                                                            <img src='/imgs/temp/postFeed.png' />
                                                        </figure>
                                                        <div>
                                                            <div>
                                                                <h6>Nome autor</h6>
                                                                <span>Titulo post</span>
                                                            </div>
                                                            <p>descrição da publicação...</p>
                                                            <span>dias</span>
                                                        </div>

                                                    </div>
                                                    <figure className='atividadeComentarioPost'>
                                                        <img src='/imgs/temp/postFeed.png' />
                                                    </figure>
                                                </div>
                                                <div className='atividadeComentarioAreaComentario'>
                                                   
                                                    <div>
                                                        <figure className='atividadeComentarioUsuario'>
                                                            <img src='/imgs/temp/postFeed.png' />
                                                        </figure>
                                                        <div>
                                                            <div>
                                                                <h6>seu nome</h6>
                                                                <span>Comentario</span>
                                                            </div>
                                                            <span>dias</span>
                                                        </div>
                                                        
                                                    </div>
                                                    {
                                                        selecionarComentarios &&
                                                        (<canvas></canvas>)
                                                    }
                                                </div>
                                            </li>
                                            <li className={selecionarComentarios ? 'atividadeComentarioSelecionado' : ''}>
                                                <div className='atividadeComentarioAreaCriadorPost'>
                                                    <div>
                                                        <figure className='atividadeComentarioUsuario'>
                                                            <img src='/imgs/temp/postFeed.png' />
                                                        </figure>
                                                        <div>
                                                            <div>
                                                                <h6>Nome autor</h6>
                                                                <span>Titulo post</span>
                                                            </div>
                                                            <p>descrição da publicação...</p>
                                                            <span>dias</span>
                                                        </div>

                                                    </div>
                                                    <figure className='atividadeComentarioPost'>
                                                        <img src='/imgs/temp/postFeed.png' />
                                                    </figure>
                                                </div>
                                                <div className='atividadeComentarioAreaComentario'>
                                                   
                                                    <div>
                                                        <figure className='atividadeComentarioUsuario'>
                                                            <img src='/imgs/temp/postFeed.png' />
                                                        </figure>
                                                        <div>
                                                            <div>
                                                                <h6>seu nome</h6>
                                                                <span>Comentario</span>
                                                            </div>
                                                            <span>dias</span>
                                                        </div>
                                                        
                                                    </div>
                                                    <canvas></canvas>
                                                </div>
                                            </li>
                                            <li className={selecionarComentarios ? 'atividadeComentarioSelecionado' : ''}>
                                                <div className='atividadeComentarioAreaCriadorPost'>
                                                    <div>
                                                        <figure className='atividadeComentarioUsuario'>
                                                            <img src='/imgs/temp/postFeed.png' />
                                                        </figure>
                                                        <div>
                                                            <div>
                                                                <h6>Nome autor</h6>
                                                                <span>Titulo post</span>
                                                            </div>
                                                            <p>descrição da publicação...</p>
                                                            <span>dias</span>
                                                        </div>

                                                    </div>
                                                    <figure className='atividadeComentarioPost'>
                                                        <img src='/imgs/temp/postFeed.png' />
                                                    </figure>
                                                </div>
                                                <div className='atividadeComentarioAreaComentario'>
                                                   
                                                    <div>
                                                        <figure className='atividadeComentarioUsuario'>
                                                            <img src='/imgs/temp/postFeed.png' />
                                                        </figure>
                                                        <div>
                                                            <div>
                                                                <h6>seu nome</h6>
                                                                <span>Comentario</span>
                                                            </div>
                                                            <span>dias</span>
                                                        </div>
                                                        
                                                    </div>
                                                    {
                                                        selecionarComentarios &&
                                                        (<canvas></canvas>)
                                                    }
                                                    
                                                </div>
                                            </li>
                                            <li className={selecionarComentarios ? 'atividadeComentarioSelecionado' : ''}>
                                                <div className='atividadeComentarioAreaCriadorPost'>
                                                    <div>
                                                        <figure className='atividadeComentarioUsuario'>
                                                            <img src='/imgs/temp/postFeed.png' />
                                                        </figure>
                                                        <div>
                                                            <div>
                                                                <h6>Nome autor</h6>
                                                                <span>Titulo post</span>
                                                            </div>
                                                            <p>descrição da publicação...</p>
                                                            <span>dias</span>
                                                        </div>

                                                    </div>
                                                    <figure className='atividadeComentarioPost'>
                                                        <img src='/imgs/temp/postFeed.png' />
                                                    </figure>
                                                </div>
                                                <div className='atividadeComentarioAreaComentario'>
                                                   
                                                    <div>
                                                        <figure className='atividadeComentarioUsuario'>
                                                            <img src='/imgs/temp/postFeed.png' />
                                                        </figure>
                                                        <div>
                                                            <div>
                                                                <h6>seu nome</h6>
                                                                <span>Comentario</span>
                                                            </div>
                                                            <span>dias</span>
                                                        </div>
                                                        
                                                    </div>
                                                    {
                                                        selecionarComentarios &&
                                                        (<img className='selecionadoInteracaoAtividade' src='/imgs/minhaAtividade/iconeSelecionado.svg' />)
                                                    }
                                                    
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                )
                        }

                    </div>
                </div>
            </div>
            <RodapeSite />
        </div>
    );
}
export default MinhaAtividade;