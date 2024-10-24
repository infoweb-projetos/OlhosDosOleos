import { useState } from 'react';
import HeaderSite from '../componentes/header';
import RodapeSite from '../componentes/rodape';
import '../estilos/editarPerfil.css';
import { useNavigate, Link } from 'react-router-dom';
import { AtribuirImagem } from '../scripts/atribuirImagem';


const EditarPerfil: React.FC = () => {
    useNavigate();
    const [ehTabDados, setEhTabDados] = useState<boolean>(true);
    const [ehTabLocalizacao, setEhTabLocalizacao] = useState<boolean>(false);
    const [ehTabEssencial, setEhTabEssencial] = useState<boolean>(false);
    const [ehTabContato, setEhTabContato] = useState<boolean>(false);
    const [ehTabApresentacao, setEhTabApresentacao] = useState<boolean>(false);
    const [ehTabCor, setEhTabCor] = useState<boolean>(false);
    const [ehTabBanner, setEhTabBanner] = useState<boolean>(false);
    const LimpaSecaoSelecionada = () => {
        setEhTabLocalizacao(false);
        setEhTabEssencial(false);
        setEhTabApresentacao(false);
        setEhTabCor(false);
        setEhTabContato(false);
        setEhTabBanner(false);
    }

    const [cor, setCor] = useState<string | null>(null);
    const [cor2, setCor2] = useState<string | null>(null);
    const [cor3, setCor3] = useState<string | null>(null);
    const [cor4, setCor4] = useState<string | null>(null);
    const [bannerUrl, setBannerUrl] = useState<string | undefined>(undefined);
    const LimparBanner = () =>{
        setBannerUrl(undefined);
    }
    return (
        <div className='organizacaoPadrao'>
            <HeaderSite />
            <div className="areaConteudo pagEditarPerfil">

                <p><Link className='btComumEditarPerfil' to={"/meuperfil"}>Voltar para Perfil</Link></p>

                {
                    ehTabDados ?
                        (
                            <ul className='editarPerfilDadosSectionsUl'>
                                <li onClick={() => { LimpaSecaoSelecionada(); setEhTabEssencial(true) }}>
                                    <a className={ehTabEssencial ? "selecionado" : ""} href='#editarPerfilEssencialTitulo'>Informações essenciais</a>
                                </li>
                                <li onClick={() => { LimpaSecaoSelecionada(); setEhTabLocalizacao(true) }}>
                                    <a className={ehTabLocalizacao ? "selecionado" : ""} href='#editarPerfilLocalizacaoTitulo'>Localização</a>
                                </li>
                                <li onClick={() => { LimpaSecaoSelecionada(); setEhTabContato(true) }}>
                                    <a className={ehTabContato ? "selecionado" : ""} href='#editarPerfilContatosTitulo'>Contatos</a>
                                </li>
                                <li onClick={() => { LimpaSecaoSelecionada(); setEhTabApresentacao(true) }}>
                                    <a className={ehTabApresentacao ? "selecionado" : ""} href='#editarPerfilApresentacaoTitulo'>Apresentação</a>
                                </li>
                            </ul>
                        )
                        :
                        (
                            <ul className='editarPerfilPersoSectionsUl'>
                                <li onClick={() => { LimpaSecaoSelecionada(); setEhTabBanner(true) }}>
                                    <a className={ehTabBanner ? "selecionado" : ""} href='#editarPerfilBannerTitulo'>Banner</a>
                                </li>
                                <li onClick={() => { LimpaSecaoSelecionada(); setEhTabCor(true) }}>
                                    <a className={ehTabCor ? "selecionado" : ""} href='#editarPerfilCorTitulo'>Cor de Fundo</a>
                                </li>
                            </ul>
                        )
                }
                <div>
                    <ul>
                        <li><button className={ehTabDados ? "selecionado" : ""} onClick={() => { setEhTabDados(true) }}>Edição de Dados</button></li>
                        <li><button className={ehTabDados ? "" : "selecionado"} onClick={() => { setEhTabDados(false) }}>Personalização</button></li>
                    </ul>
                    <form>
                        {
                            ehTabDados ?
                                (
                                    <div>
                                        <h2 id='editarPerfilEssencialTitulo'>Informações essenciais</h2>
                                        <div className='editarPerfilFormSecao editarPerfilFormSecaoDireitaEsquerda'>
                                            <div className='editarPerfilAreaFoto '>
                                                <figure className='cursorPointer' onClick={() => AtribuirImagem('editarPerfilInput', 'editarPerfilImagem')}>
                                                    <img src="/imgs/verPerfil/perfil.png" id='editarPerfilImagem' />
                                                    <figcaption>Upload</figcaption>
                                                </figure>
                                                <input type='file' className='escondido' id='editarPerfilInput' />
                                            </div>
                                            <div className='editarPerfilAreaCampo'>
                                                <div className='editarPerfilCampo'>
                                                    <label>Nome</label>
                                                    <div className='divInputIcone'>
                                                        <input type='text' />
                                                        <img src='/imgs/cadastro/nomeCad.svg' />
                                                    </div>
                                                </div>
                                                <div className='editarPerfilCampo'>
                                                    <label>Email</label>
                                                    <div className='divInputIcone'>
                                                        <input type='text' />
                                                        <img src='/imgs/cadastro/emailCad.svg' />
                                                    </div>
                                                </div>
                                                <div className='editarPerfilCampo'>
                                                    <label>Usuario</label>
                                                    <div className='divInputIcone'>
                                                        <input type='text' />
                                                        <img src='/imgs/cadastro/nomeUsuarioCad.svg' />
                                                    </div>
                                                </div>
                                                <div className='editarPerfilCampo'>
                                                    <label>Senha</label>
                                                    <div className='divInputIcone'>
                                                        <input type='text' />
                                                        <img src='/imgs/cadastro/senhaCad.svg' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <h2 id='editarPerfilLocalizacaoTitulo'>Informações de localização</h2>
                                        <div className='editarPerfilFormSecao editarPerfilFormSecaoDireita'>
                                            <div className='editarPerfilAreaCampo'>
                                                <div className='editarPerfilCampo'>
                                                    <label>Estado</label>
                                                    <div className='divInputIcone'>
                                                        <select>
                                                            <option>a</option>
                                                            <option>b</option>
                                                        </select>
                                                        <img src='/imgs/cadastro/estadoCad.svg' />
                                                    </div>
                                                </div>
                                                <div className='editarPerfilCampo'>
                                                    <label>Cidade</label>
                                                    <div className='divInputIcone'>
                                                        <select>
                                                            <option>a</option>
                                                            <option>b</option>
                                                        </select>
                                                        <img src='/imgs/cadastro/cidadeCad.svg' />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <h2 id='editarPerfilContatosTitulo'>Informações de contato</h2>
                                        <div className='editarPerfilFormSecao editarPerfilFormSecaoDireita'>
                                            <div className='editarPerfilAreaCampo'>
                                                <div className='editarPerfilCampo'>
                                                    <label>Instagram</label>
                                                    <div className='divInputIcone'>
                                                        <input type='text' />
                                                        <img src='/imgs/cadastro/instaCad.png' />
                                                    </div>
                                                </div>
                                                <div className='editarPerfilCampo'>
                                                    <label>WhatsApp</label>
                                                    <div className='divInputIcone'>
                                                        <input type='text' />
                                                        <img src='/imgs/cadastro/zapCad.svg' />
                                                    </div>
                                                </div>
                                                <div className='editarPerfilCampo'>
                                                    <label>Facebook</label>
                                                    <div className='divInputIcone'>
                                                        <input type='text' />
                                                        <img src='/imgs/cadastro/faceCad.svg' />
                                                    </div>
                                                </div>
                                                <div className='editarPerfilCampo'>
                                                    <label>YouTube</label>
                                                    <div className='divInputIcone'>
                                                        <input type='text' />
                                                        <img src='/imgs/cadastro/youtubeCad.svg' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <h2 id='editarPerfilApresentacaoTitulo'>Informações de Personalização e Apresentação</h2>
                                        <div className='editarPerfilFormSecao'>
                                            <div className='editarPerfilAreaCampo editarPerfilAreaCampoCompleto'>
                                                <div className='editarPerfilCampo editarPerfilDesc'>
                                                    <label>Descrição</label>
                                                    <textarea></textarea>
                                                </div>
                                                <div className='editarPerfilCampo editarPerfilTipo'>
                                                    <label>Sou um Artista</label>
                                                    <select>
                                                        <option>a</option>
                                                        <option>b</option>
                                                    </select>
                                                </div>

                                            </div>
                                        </div>
                                        <button className='btComumEditarPerfil'>Salvar</button>
                                    </div>
                                )
                                :
                                (
                                    <div>
                                        <h2 id='editarPerfilBannerTitulo'>Banner</h2>
                                        <div className='editarPerfilFormSecaoBanner'>
                                            <p>Dimensões ideais 3200 x 410px</p>
                                            <div className='cursorPointer' onClick={() => AtribuirImagem('editarPerfilBannerInput', 'editarPerfilBanner')}>
                                                <img src={bannerUrl} className='editarPerfilBannerImg' id='editarPerfilBanner' />
                                                <div >
                                                    <img src='/imgs/verPerfil/add_image.svg' className='editarPerfilBannerImgICone' />
                                                    <span>Fazer Upload</span>
                                                </div>
                                                <input type='file' className='escondido' id='editarPerfilBannerInput' />
                                            </div>
                                            <span onClick={LimparBanner} className='cursorPointer'>Remover imagem<img src='/imgs/editarPerfil/iconeExcluirBanner.svg' /></span>

                                        </div>
                                        <h2 id='editarPerfilCorTitulo'>Cor de Fundo</h2>
                                        <div className='editarPerfilFormSecaoCores'>
                                            <div style={{backgroundColor: cor ? cor : ""}} className='editarPerfilPerfilAba'>
                                                <figure>
                                                    <img src='/imgs/verPerfil/perfil.png' />
                                                </figure>
                                                <h3 className="dmSans">Nome</h3>
                                                <span className="dmSans">tipo de artista</span>
                                                <p className="dmSansThin"><img src='/imgs/verPerfil/location_icon.png' />localização</p>
                                            </div>
                                            <div className='editarPerfilDadosCores'>
                                                <p>Escolher...</p>
                                                <ul>
                                                    <li>
                                                        <input onChange={(e) => setCor(e.target.value)} type="color" />
                                                        <div>
                                                            <p className="dmSans">Cor</p>
                                                            <span className="dmSans">{cor ? cor : "#"}</span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <input onChange={(e) => setCor2(e.target.value)} type="color" />
                                                        <div>
                                                            <p className="dmSans">Cor</p>
                                                            <span className="dmSans">{cor2 ? cor2 : "#"}</span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <input onChange={(e) => setCor3(e.target.value)} type="color" />
                                                        <div>
                                                            <p className="dmSans">Cor</p>
                                                            <span className="dmSans">{cor3 ? cor3 : "#"}</span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <input onChange={(e) => setCor4(e.target.value)} type="color" />
                                                        <div>
                                                            <p className="dmSans">Cor</p>
                                                            <span className="dmSans">{cor4 ? cor4 : "#"}</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                                <p>
                                                    Para garantir a melhor visibilidade das informações no seu perfil, <b>cores muito vibrantes serão
                                                        ajustadas com menor saturação</b>, preservando o contraste e a legibilidade.
                                                </p>
                                            </div>
                                        </div>
                                        <button className='btComumEditarPerfil'>Salvar</button>
                                    </div>
                                )
                        }


                    </form>
                </div>
            </div>
            <RodapeSite />
        </div>
    );
}
export default EditarPerfil;