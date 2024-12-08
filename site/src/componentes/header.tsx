import { Link, useNavigate } from 'react-router-dom';
import { AbrirFecharModal } from '../scripts/modal';
import React, { useState, useEffect } from 'react';
import CriarPasta from './criarPasta';
import { VerificaToken } from '../scripts/uteis';

const HeaderSite: React.FC = () => {
    const navegar = useNavigate();
    const [tokenAtual, atualizarTokenAtual] = useState<string | null>("");
    const VerificarToken = async () => {
        const token = await VerificaToken();
        if (token) atualizarTokenAtual(token);
    }
    useEffect(() => {
        VerificarToken();
    }, []);

    const AbrirFecharPerfil = () => {
        AbrirFecharModal('modalPerfilHeader');
    }
    const AbrirFecharOpcoes = () => {
        AbrirFecharModal('modalOpcoes');
    }
    const AtualizarPagina = () => {
        navegar('/meuperfil');
        navegar(0);
    }
    const SairConta = () => {
        localStorage.removeItem('tokenODO');
        navegar('/entrar');
    }

    const [isVisible, setIsVisible] = useState(true);
    const rolarTela = () => {
        const posicaoRolagemAtual = window.pageYOffset;

        if (posicaoRolagemAtual > 50) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    };
    

    useEffect(() => {
        window.addEventListener('scroll', rolarTela);
        return () => {
            window.removeEventListener('scroll', rolarTela);
        };
    }, []);

    const [criandoPasta, setCriandoPasta] = useState(false);

    return (
        <div>
            {criandoPasta && <CriarPasta setModal={setCriandoPasta} token={tokenAtual}/>}
            <div className={`header ${!isVisible ? 'headerEscondido trasicaoEsconder' : ' transicaoMostrar'}`} >
                <div className="headerEsquerda">
                    <Link className="headerLogo" to="/"><img src="/imgs/header/signo.svg" alt="Logo do site. Signo em formato de cabeça de elefante." /></Link>
                    <ul>
                        <li><Link to="/">Explorar</Link></li>
                        <li><a className="pagSelecionada" href="#">Portfólios</a></li>
                    </ul>
                    <form action="#">
                        <div>
                            <input type="image" src="/imgs/header/lupa.svg" alt="Icone de lupa." />
                            <input type="text" placeholder='Busque por "aquarela"' />
                        </div>
                        <input type="submit" className="botaoComum fundoBtVermelho" value="Pesquisar" />
                    </form>
                </div>
                <div className="headerDireita">
                    {
                        !localStorage.getItem('tokenODO') ?
                            (
                                <ul>
                                    <li>
                                        <Link to="/entrar" className="botaoComum fundoBtBranco">
                                            <img src="/imgs/header/login-icon.svg" alt="Icone de entrar." />
                                            <p>Entrar</p>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/cadastro" className="botaoComum fundoBtVermelho">
                                            <img src="/imgs/header/signIn-icon.svg" alt="Icone de cadastrar-se." />
                                            <p>Cadastre-se</p>
                                        </Link>
                                    </li>
                                    <li onClick={AbrirFecharOpcoes} className="submenu">
                                        <button className="marginEsquerda"><img src="/imgs/header/pontinhosIcone.png" alt="Icone para ver mais opções" /></button>
                                        <div>
                                            <ul id="modalOpcoes" className="menuVermelho">
                                                <li>
                                                    <a className="menuItemComum" href="#">
                                                        <p>Sobre</p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="menuItemComum" href="#">
                                                        <p>Memorial</p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="menuItemComum" href="#">
                                                        <p>Ajuda</p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="menuItemComum" href="#">
                                                        <p>Política de Privacidade</p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="menuItemComum" href="#">
                                                        <p>Termos de Serviço</p>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            )
                            :
                            (
                                <ul>
                                    <li>
                                        <button onClick={() => AbrirFecharModal('menuOpcoesHeaderCriar')} className="botaoComum fundoBtVermelho ">
                                            <img src="/imgs/header/maisIcone.png" alt="Icone de entrar." />
                                            <p>Criar</p>
                                           
                                        </button>
                                        <ul id='menuOpcoesHeaderCriar' className='modalOpcoesComum modalOpcoesComumHeader'>
                                            <li>
                                                <Link className='modalOpcoesComumBt' to="/postar">
                                                    Nova Publicação
                                                </Link>
                                                
                                            </li>
                                            <li>
                                                <button onClick={() => setCriandoPasta(true)} className='modalOpcoesComumBt'>
                                                    Nova Pasta
                                                </button>
                                            
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#" className="marginEsquerda centralizado"><img src="/imgs/header/notificacaoIcone.png" alt="Icone de notificação." /></a>
                                    </li>
                                    <li >
                                        <button onClick={AbrirFecharPerfil} type='button' className="centralizado buttonSemEstilo"><img src="/imgs/header/perfilIcone.png" alt="Icone de perfil." /></button>
                                        <ul id="modalPerfilHeader" className="menuVermelho">
                                            <li>
                                                <Link to="/meuperfil" onClick={AtualizarPagina} className="menuItemComum">
                                                <img src="/imgs/header/perfilSubMenuIcone.svg" alt="Perfil." />
                                                    <p>Perfil</p>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="menuItemComum" to="/editar/perfil">
                                                    <img src="/imgs/header/editarHeader.svg" alt="Lapis." />
                                                    <p>Editar perfil</p>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="menuItemComum" to="/verpastas">
                                                    <img src="/imgs/header/favoritarHeader.svg" alt="Icone de banner." />
                                                    <p>Itens Favoritos</p>
                                                </Link>
                                            </li>
                                            <li>
                                                <a className="menuItemComum" href="#">
                                                    <img src="/imgs/header/atividadeHeader.svg" alt="Icone de relogio." />
                                                    <p>Minha Atividade</p>
                                                </a>
                                            </li>
                                            <li>
                                                <button onClick={SairConta} className="menuItemComum">
                                                    <img src="/imgs/header/sairHeader.svg" alt="Porta de Saida" />
                                                    <p>Sair</p>
                                                </button>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#" className="centralizado tirarMarginDireita"><img src="/imgs/header/configuracaoIcone.png" alt="Icone de configuração." /></a>
                                    </li>
                                </ul>
                            )
                    }

                </div>
            </div>
        </div>
    );
}
export default HeaderSite;