import { useState } from 'react';
import HeaderSite from '../componentes/header';
import RodapeSite from '../componentes/rodape';
import '../estilos/minhaAtividade.css';

const MinhaAtividade: React.FC = () => {
    const [selecionarCurtidas, setSelecionarCurtida] = useState<boolean>(false);

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
                                    <img src='/imgs/minhaAtividade/iconeInteracoes.svg'/>
                                </figure>
                                <div>
                                    <h4>Interações</h4>
                                    <span>Analise e exclua curtidas, comentarios e outras interações</span>
                                </div>
                            </li>
                            <li>
                                <figure>
                                    <img src='/imgs/minhaAtividade/iconeHistorico.svg'/>
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
                            <li className='tipoAtividade '><button className='tabSelecionadaAtividade'>Curtidas</button></li>
                            <li className='tipoAtividade'><button>Comentarios</button></li>
                            <li className='ocupaEspacoAtividade'></li>
                        </ul>
                        <div className='postsCurtidosAtividade'>
                            <div>
                                <div>
                                    <h5>Sua Atividade</h5>
                                    <button>Classificar e Filtrar</button>
                                </div>
                                <button onClick={() =>  setSelecionarCurtida(!selecionarCurtidas)}>Selecionar</button>
                            </div>
                            <ul >
                                <li>
                                    <figure>
                                        <img src='/imgs/temp/postFeed.png'/>
                                        {
                                            selecionarCurtidas &&
                                            (
                                                <canvas></canvas>
                                            )
                                        }
                                        {
                                            selecionarCurtidas &&
                                            (
                                                <img className='selecionadoInteracaoAtividade' src='/imgs/minhaAtividade/iconeSelecionado.svg'/>
                                            )
                                        }
                                        {/* nova interface, com selecionado para exibir canvas ou img */}
                                    </figure>
                                   
                                </li>
                                <li>
                                    <figure>
                                        <img src='/imgs/temp/postFeed.png'/>
                                        {
                                            selecionarCurtidas &&
                                            (
                                                <canvas></canvas>
                                            )
                                        }
                                        {
                                            selecionarCurtidas &&
                                            (
                                                <img className='selecionadoInteracaoAtividade' src='/imgs/minhaAtividade/iconeSelecionado.svg'/>
                                            )
                                        }
                                        {/* nova interface, com selecionado para exibir canvas ou img */}
                                    </figure>
                                   
                                </li>
                                <li>
                                    <figure>
                                        <img src='/imgs/temp/postFeed.png'/>
                                        {
                                            selecionarCurtidas &&
                                            (
                                                <canvas></canvas>
                                            )
                                        }
                                        {
                                            selecionarCurtidas &&
                                            (
                                                <img className='selecionadoInteracaoAtividade' src='/imgs/minhaAtividade/iconeSelecionado.svg'/>
                                            )
                                        }
                                        {/* nova interface, com selecionado para exibir canvas ou img */}
                                    </figure>
                                   
                                </li>
                                <li>
                                    <figure>
                                        <img src='/imgs/temp/postFeed.png'/>
                                        {
                                            selecionarCurtidas &&
                                            (
                                                <canvas></canvas>
                                            )
                                        }
                                        {
                                            selecionarCurtidas &&
                                            (
                                                <img className='selecionadoInteracaoAtividade' src='/imgs/minhaAtividade/iconeSelecionado.svg'/>
                                            )
                                        }
                                        {/* nova interface, com selecionado para exibir canvas ou img */}
                                    </figure>
                                   
                                </li>
                                <li>
                                    <figure>
                                        <img src='/imgs/temp/postFeed.png'/>
                                        {
                                            selecionarCurtidas &&
                                            (
                                                <canvas></canvas>
                                            )
                                        }
                                        {
                                            selecionarCurtidas &&
                                            (
                                                <img className='selecionadoInteracaoAtividade' src='/imgs/minhaAtividade/iconeSelecionado.svg'/>
                                            )
                                        }
                                        {/* nova interface, com selecionado para exibir canvas ou img */}
                                    </figure>
                                   
                                </li>
                                <li>
                                    <figure>
                                        <img src='/imgs/temp/postFeed.png'/>
                                        {
                                            selecionarCurtidas &&
                                            (
                                                <canvas></canvas>
                                            )
                                        }
                                        {
                                            selecionarCurtidas &&
                                            (
                                                <img className='selecionadoInteracaoAtividade' src='/imgs/minhaAtividade/iconeSelecionado.svg'/>
                                            )
                                        }
                                        {/* nova interface, com selecionado para exibir canvas ou img */}
                                    </figure>
                                   
                                </li>
                                <li>
                                    <figure>
                                        <img src='/imgs/temp/postFeed.png'/>
                                        {
                                            selecionarCurtidas &&
                                            (
                                                <canvas></canvas>
                                            )
                                        }
                                        {
                                            selecionarCurtidas &&
                                            (
                                                <img className='selecionadoInteracaoAtividade' src='/imgs/minhaAtividade/iconeSelecionado.svg'/>
                                            )
                                        }
                                        {/* nova interface, com selecionado para exibir canvas ou img */}
                                    </figure>
                                   
                                </li>
                                <li>
                                    <figure>
                                        <img src='/imgs/temp/postFeed.png'/>
                                        {
                                            selecionarCurtidas &&
                                            (
                                                <canvas></canvas>
                                            )
                                        }
                                        {
                                            selecionarCurtidas &&
                                            (
                                                <img className='selecionadoInteracaoAtividade' src='/imgs/minhaAtividade/iconeSelecionado.svg'/>
                                            )
                                        }
                                        {/* nova interface, com selecionado para exibir canvas ou img */}
                                    </figure>
                                   
                                </li>
                               
                            </ul>
                        </div>
                        
                    </div>
                </div>
            </div>
            <RodapeSite />
        </div>
    );
}
export default MinhaAtividade;