import { useEffect, useState } from 'react';
import HeaderSite from '../componentes/header';
import RodapeSite from '../componentes/rodape';
import '../estilos/editarPerfil.css';
import { useNavigate, Link } from 'react-router-dom';
import { AtribuirImagem } from '../scripts/atribuirImagem';
import axios from 'axios';
import { api } from '../apiUrl';
import { Cidade, Estado, TipoArtista } from '../interfaces/Enums';
import { Usuario } from '../interfaces/Usuario';
import { VerificaToken } from '../scripts/uteis';

const EditarPerfil: React.FC = () => {
    const navegar = useNavigate();
    const [tokenAtual, atualizarTokenAtual] = useState<string | null>("");
    const [ehRemoverBanner, setEhRemoverBanner] = useState<boolean>(false);
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

    const [usuario, setUsuario] = useState<Usuario | undefined>(undefined);
    const [nome, setNome] = useState<string>("");
    const [nomeUsuario, setNomeUsuario] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [estado, setEstado] = useState<number | undefined>(0);
    const [cidade, setCidade] = useState<number | undefined>(0);
    const [youtube, setYoutube] = useState<string>("");
    const [whats, setWhats] = useState<string>("");
    const [insta, setInsta] = useState<string>("");
    const [face, setFace] = useState<string>("");
    const [tipo, setTipo] = useState<string | undefined>("");
    const [descricao, setDescricao] = useState<string>("");
    const [foto, setFoto] = useState<FileList | null>(null);
    const [fotoUrl, setFotoUrl] = useState<string | undefined>("/imgs/verPerfil/perfil.png");
    const [cor, setCor] = useState<string>("#000000");
    const [cor2, setCor2] = useState<string>("#000000");
    const [cor3, setCor3] = useState<string>("#000000");
    const [cor4, setCor4] = useState<string>("#000000");
    const [banner, setBanner] = useState<FileList | null>(null);
    const [bannerUrl, setBannerUrl] = useState<string | undefined>(undefined);

    const [listaTipoArtista, setlistaTipoArtista] = useState<Array<TipoArtista>>([]);
    const [listaEstados, setlistaEstados] = useState<Array<Estado>>([]);
    const [listaCidades, setlistaCidades] = useState<Array<Cidade>>([]);
    const [filtroCidade, setFiltroCidade] = useState<number | null>(null);

    const LimparBanner = async () => {
        setBannerUrl(undefined); 
        setBanner(null); 
        const input = document.getElementById('editarPerfilBannerInput') as HTMLInputElement;
        if (input) {
            input.files = null;
        }
        setEhRemoverBanner(true);
        
    }

    const ListarTipos = async () => {
        await axios.get(api + 'tiposartista/listar', {})
            .then(response => {
                const listaBD = response.data.dados;
                setlistaTipoArtista(listaBD);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const ListarEstados = async () => {
        await axios.get(api + 'estados/listar', {})
            .then(response => {
                const listaBD = response.data.dados;
                setlistaEstados(listaBD);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const ListarCidades = async () => {
        await axios.get(api + 'cidades/listar', {})
            .then(response => {
                const listaBD = response.data.dados;
                setlistaCidades(listaBD);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const CarregarUsuario = async (token: string | null) => {
        const url = api + 'usuarios/perfil';
        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                const usu = response.data.dados;
                setUsuario(usu);

                if (!usu && !usuario) {
                    return;
                }
                if (usu){
                    if (usu.nome) setNome(usu.nome);
                    if (usu.usuario) setNomeUsuario(usu.usuario);
                    if (usu.senha) setSenha(usu.senha);
                    if (usu.email) setEmail(usu.email);
                    if (usu.cidadeid) setCidade(usu.cidadeid);
                    if (usu.estadoid) setEstado(usu.estadoid);
                    if (usu.tipoid) setTipo(usu.tipoid);
                    if (usu.insta) setInsta(usu.insta);
                    if (usu.face) setFace(usu.face);
                    if (usu.zap) setWhats(usu.zap);
                    if (usu.youtube) setYoutube(usu.youtube);
                    if (usu.biografia) setDescricao(usu.biografia);
    
                    if (usu.cor1) setCor("#" + usu.cor1);
                    if (usu.cor2) setCor2("#" + usu.cor2);
                    if (usu.cor3) setCor3("#" + usu.cor3);
                    if (usu.cor4) setCor4("#" + usu.cor4);
                }   

                if (usu.imagem && usu.imagem.data && usu.imagemtipo) {
                    const blob = new Blob([new Uint8Array(usu.imagem.data)], { type: usu.imagemtipo });
                    const urlImagem = URL.createObjectURL(blob);
                    setFotoUrl(urlImagem);
                } else {
                    setFotoUrl("/imgs/verPerfil/perfil.png"); // Ou uma imagem padrão
                }

                if (usu.banner && usu.banner.data && usu.bannertipo) {
                    const blob = new Blob([new Uint8Array(usu.banner.data)], { type: usu.bannertipo });
                    const urlImagem = URL.createObjectURL(blob);
                    setBannerUrl(urlImagem);
                } else {
                    setBannerUrl(undefined);
                }

                if (usu.cor1) setCor("#" + usu.cor1);
            })
            .catch(error => {
                console.log(error);
                console.log('Token inválido ou expirado');
            });
    }

    const VerificarToken = async () => {
        const token = await VerificaToken();
        if (!token){ navegar('/entrar'); localStorage.removeItem('tokenODO');}
        else atualizarTokenAtual(token);
    }
    useEffect(() => {
        VerificarToken();
    }, []);

    useEffect(() => {
        if (tokenAtual){ 
            CarregarUsuario(tokenAtual);
            ListarCidades();
            ListarEstados();
            ListarTipos();
        }
    }, [tokenAtual]);

    const EnviarDados = async (event: React.FormEvent) => {
        event.preventDefault();
        if(!tokenAtual) navegar(0);

        const data = new FormData();
        if (nome) data.append('nome', nome);
        if (nomeUsuario) data.append('usuario', nomeUsuario);
        if (email) data.append('email', email);
        if (senha) data.append('senha', senha);
        if (estado) data.append('estadoid', estado.toString());
        else data.append('estadoid', '');
        if (cidade) data.append('cidadeid', cidade.toString());
        else data.append('cidadeid', '');
        if (youtube) data.append('youtube', youtube);
        if (whats) data.append('zap', whats);
        if (insta) data.append('insta', insta);
        if (face) data.append('face', face);
        if (tipo) data.append('tipoid', tipo);
        else data.append('tipoid', '');
        if (descricao) data.append('biografia', descricao);
        if (foto && foto.length > 0) data.append('imagem', foto[0]);
        data.append('ehpersonalizacao', '');

        try {
            await axios.patch(api + 'usuarios/atualizar', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${tokenAtual}`,
                },
            })
            .then(response => {
                navegar(0);
                console.log("Atualizar: " + response);
            })
            .catch(error => {
                console.log(error);
            });
            navegar("/editar/perfil");
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            if (axios.isAxiosError(error) && error.response) {
                console.error('Resposta do servidor:', error.response.data);
            }
        }

        navegar(0);
    }

    const EnviarPersonalizacao = async (event: React.FormEvent) => {
        event.preventDefault();
        if(!tokenAtual) navegar(0);

        if(ehRemoverBanner){
            try {
                await axios.patch(api + 'usuarios/removerbanner', {}, {
                    headers: {
                        'Authorization': `Bearer ${tokenAtual}`
                    }
                })
                .then(response => {
                    console.log("removerbanner: " + response);
                })
                .catch(error => {
                    console.log(error);
                });
                navegar("/editar/perfil");
            } catch (error) {
                console.error('Erro ao enviar dados:', error);
                if (axios.isAxiosError(error) && error.response) {
                    console.error('Resposta do servidor:', error.response.data);
                }
            }
        }
       
        const data = new FormData();

        if (cor) data.append('cor1', cor.replace('#', ''));
        if (cor2) data.append('cor2', cor2.replace('#', ''));
        if (cor3) data.append('cor3', cor3.replace('#', ''));
        if (cor4) data.append('cor4', cor4.replace('#', '')); 
        if (banner && banner.length > 0) data.append('banner', banner[0]);
        data.append('ehpersonalizacao', 'true');

        try {
            await axios.patch(api + 'usuarios/atualizar', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${tokenAtual}`,
                },
            })
            .then(response => {
                navegar(0);
                console.log("Atualizar: " + response);
            })
            .catch(error => {
                console.log(error);
            });
            navegar("/editar/perfil");
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            if (axios.isAxiosError(error) && error.response) {
                console.error('Resposta do servidor:', error.response.data);
            }
        }
        navegar(0);
    }

    const MudarEstado = (estadoId : number | undefined) =>{
        setEstado(estadoId); 
        if (!estadoId) setFiltroCidade(null);
        if (estadoId){
            setFiltroCidade(estadoId)
            setCidade(listaCidades.filter(c => c.estadoid == estadoId)[0]?.id);
        }
    }

    const MudarCidade = (cidadeId : number | undefined) =>{
        setCidade(cidadeId); 
        if (cidadeId) setEstado(listaCidades.find(c => c.id == cidadeId)?.estadoid);
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
                                                    <img src={fotoUrl} id='editarPerfilImagem' />
                                                    <figcaption>Upload</figcaption>
                                                </figure>
                                                <input type='file'  onChange={(e) => setFoto(e.target.files ? e.target.files : null)} className='escondido' id='editarPerfilInput' />
                                            </div>
                                            <div className='editarPerfilAreaCampo'>
                                                <div className='editarPerfilCampo'>
                                                    <label>Nome</label>
                                                    <div className='divInputIcone'>
                                                        <input value={nome} onChange={(e) => setNome(e.target.value)} type='text' />
                                                        <img src='/imgs/cadastro/nomeCad.svg' />
                                                    </div>
                                                </div>
                                                <div className='editarPerfilCampo'>
                                                    <label>Email</label>
                                                    <div className='divInputIcone'>
                                                        <input value={email} onChange={(e) => setEmail(e.target.value)} type='text' />
                                                        <img src='/imgs/cadastro/emailCad.svg' />
                                                    </div>
                                                </div>
                                                <div className='editarPerfilCampo'>
                                                    <label>Usuario</label>
                                                    <div className='divInputIcone'>
                                                        <input value={nomeUsuario} onChange={(e) => setNomeUsuario(e.target.value)} type='text' />
                                                        <img src='/imgs/cadastro/nomeUsuarioCad.svg' />
                                                    </div>
                                                </div>
                                                <div className='editarPerfilCampo'>
                                                    <label>Senha</label>
                                                    <div className='divInputIcone'>
                                                        <input value={senha} onChange={(e) => setSenha(e.target.value)} type='text' />
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
                                                        <select onChange={(e) => MudarEstado(Number(e.target.value))} value={estado  == 0 ? undefined : estado} >
                                                            <option value={undefined} >
                                                                ----
                                                            </option>
                                                            {(
                                                                listaEstados.map((estado, index) =>
                                                                (
                                                                    <option value={estado.id} key={index}>
                                                                        {estado.nome}
                                                                    </option>
                                                                ))
                                                            )}
                                                        </select>
                                                        <img src='/imgs/cadastro/estadoCad.svg' />
                                                    </div>
                                                </div>
                                                <div className='editarPerfilCampo'>
                                                    <label>Cidade</label>
                                                    <div className='divInputIcone'>
                                                        <select onChange={(e) => MudarCidade(Number(e.target.value))} value={cidade == 0 ? undefined : cidade} >
                                                            {
                                                                !filtroCidade &&
                                                                (
                                                                    <option value={undefined} >
                                                                        ----
                                                                    </option>
                                                                )
                                                            }
                                                            {
                                                                listaCidades.filter(c => (filtroCidade && c.estadoid == filtroCidade) || !filtroCidade).map((cidade, index) =>
                                                                (
                                                                    
                                                                    <option value={cidade.id} key={index}>
                                                                        {cidade.nome}
                                                                    </option>
                                                                ))
                                                            }
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
                                                        <input value={insta} onChange={(e) => setInsta(e.target.value)} type='text' />
                                                        <img src='/imgs/cadastro/instaCad.png' />
                                                    </div>
                                                </div>
                                                <div className='editarPerfilCampo'>
                                                    <label>WhatsApp</label>
                                                    <div className='divInputIcone'>
                                                        <input value={whats} onChange={(e) => setWhats(e.target.value)} type='text' />
                                                        <img src='/imgs/cadastro/zapCad.svg' />
                                                    </div>
                                                </div>
                                                <div className='editarPerfilCampo'>
                                                    <label>Facebook</label>
                                                    <div className='divInputIcone'>
                                                        <input value={face} onChange={(e) => setFace(e.target.value)} type='text' />
                                                        <img src='/imgs/cadastro/faceCad.svg' />
                                                    </div>
                                                </div>
                                                <div className='editarPerfilCampo'>
                                                    <label>YouTube</label>
                                                    <div className='divInputIcone'>
                                                        <input value={youtube} onChange={(e) => setYoutube(e.target.value)} type='text' />
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
                                                    <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)}>{descricao}</textarea>
                                                </div>
                                                <div className='editarPerfilCampo editarPerfilTipo'>
                                                    <label>Sou um Artista</label>
                                                    <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                                                        <option value={undefined} >
                                                            ----
                                                        </option>
                                                        {(
                                                            listaTipoArtista.map((tipo, index) =>
                                                            (
                                                                <option value={tipo.nome} key={index}>
                                                                    {tipo.nome}
                                                                </option>
                                                            ))
                                                        )}
                                                    </select>
                                                </div>

                                            </div>
                                        </div>
                                        <button onClick={EnviarDados} className='btComumEditarPerfil'>Salvar</button>
                                    </div>
                                )
                                :
                                (
                                    <div>
                                        <h2 id='editarPerfilBannerTitulo'>Banner</h2>
                                        <div className='editarPerfilFormSecaoBanner'>
                                            <p>Dimensões ideais 3200 x 410px</p>
                                            <div className='cursorPointer' onClick={() => {AtribuirImagem('editarPerfilBannerInput', 'editarPerfilBanner'); setEhRemoverBanner(false);}}>
                                                
                                                {
                                                    bannerUrl ? 
                                                    (<img src={bannerUrl} className='editarPerfilBannerImg' id='editarPerfilBanner' /> )
                                                    : 
                                                    (<img className='editarPerfilBannerImg' id='editarPerfilBanner' />)
                                                }
                                                
                                                <div >
                                                    <img src='/imgs/verPerfil/add_image.svg' className='editarPerfilBannerImgICone' />
                                                    <span>Fazer Upload</span>
                                                </div>
                                                <input  onChange={(e) => setBanner(e.target.files ? e.target.files : null)} type='file' className='escondido' id='editarPerfilBannerInput' />
                                            </div>
                                            <span onClick={LimparBanner} className='cursorPointer'>Remover imagem<img src='/imgs/editarPerfil/iconeExcluirBanner.svg' /></span>

                                        </div>
                                        <h2 id='editarPerfilCorTitulo'>Cor de Fundo</h2>
                                        <div className='editarPerfilFormSecaoCores'>
                                            <div style={{ backgroundColor: cor ? cor : "" }} className='editarPerfilPerfilAba'>
                                                <figure>
                                                    <img src={fotoUrl} />
                                                </figure>
                                                <h3 className="dmSans">{nome}</h3>
                                                <span className="dmSans">{tipo}</span>
                                            </div>
                                            <div className='editarPerfilDadosCores'>
                                                <p>Escolher...</p>
                                                <ul>
                                                    <li>
                                                        <input value={cor} onChange={(e) => setCor(e.target.value)} type="color" />
                                                        <div>
                                                            <p className="dmSans">Cor</p>
                                                            <span className="dmSans">{cor ? cor : "#"}</span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <input value={cor2} onChange={(e) => setCor2(e.target.value)} type="color" />
                                                        <div>
                                                            <p className="dmSans">Cor</p>
                                                            <span className="dmSans">{cor2 ? cor2 : "#"}</span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <input value={cor3} onChange={(e) => setCor3(e.target.value)} type="color" />
                                                        <div>
                                                            <p className="dmSans">Cor</p>
                                                            <span className="dmSans">{cor3 ? cor3 : "#"}</span>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <input value={cor4} onChange={(e) => setCor4(e.target.value)} type="color" />
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
                                        <button onClick={EnviarPersonalizacao} className='btComumEditarPerfil'>Salvar</button>
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