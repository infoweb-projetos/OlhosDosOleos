import { api } from '../apiUrl.ts';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../estilos/cadastro.css';
import { TrocaEtapa } from '../scripts/cadEtapa.ts';
import { useCallback, useEffect, useState } from 'react';
import { AtribuirImagem } from '../scripts/atribuirImagem';
import { Cidade, Estado, TipoArtista } from '../interfaces/Enums.ts';

const Cadastro: React.FC = () => {
    const navegar = useNavigate();
    const [nome, setNome] = useState<string | null>(null);
    const [usuario, setUsuario] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [senha, setSenha] = useState<string | null>(null);
    const [estado, setEstado] = useState<number | null>(null);
    const [cidade, setCidade] = useState<number | null>(null);
    const [youtube, setYoutube] = useState<string | null>(null);
    const [whats, setWhats] = useState<string | null>(null);
    const [insta, setInsta] = useState<string | null>(null);
    const [face, setFace] = useState<string | null>(null);
    const [tipo, setTipo] = useState<string | null>(null);
    const [cor, setCor] = useState<string | null>(null);
    const [cor2, setCor2] = useState<string | null>(null);
    const [cor3, setCor3] = useState<string | null>(null);
    const [cor4, setCor4] = useState<string | null>(null);
    const [descricao, setDescricao] = useState<string | null>(null);
    const [foto, setFoto] = useState<FileList | null>(null);
    const [listaTipoArtista, setlistaTipoArtista] = useState<Array<TipoArtista>>([]);
    const [listaEstados, setlistaEstados] = useState<Array<Estado>>([]);
    const [listaCidades, setlistaCidades] = useState<Array<Cidade>>([]);
    const ListarTipos = useCallback(async () => {
        await axios.get(api + 'tiposartista/listar', {})
            .then(response => {
                const listaBD = response.data.dados;
                setlistaTipoArtista(listaBD);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    const ListarEstados = useCallback(async () => {
        await axios.get(api + 'estados/listar', {})
            .then(response => {
                const listaBD = response.data.dados;
                setlistaEstados(listaBD);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    const ListarCidades = useCallback(async () => {
        await axios.get(api + 'cidades/listar', {})
            .then(response => {
                const listaBD = response.data.dados;
                setlistaCidades(listaBD);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        ListarEstados();
        ListarCidades();
        ListarTipos();
    }, []);

    const [inputSenhaTipo, setInputSenhaTipo] = useState("password");
    const MudarTipoInpuSenha = () => {
        if (inputSenhaTipo == "password") setInputSenhaTipo("text");
        else setInputSenhaTipo("password")
    }

    const EnviarClique = async (event: React.FormEvent) => {
        event.preventDefault();

        const data = new FormData();
        if (nome) data.append('nome', nome);
        if (usuario) data.append('usuario', usuario);
        if (email) data.append('email', email);
        if (senha) data.append('senha', senha);
        if (estado) data.append('estadoid', estado.toString());
        if (cidade) data.append('cidadeid', cidade.toString());
        if (youtube) data.append('youtube', youtube);
        if (whats) data.append('zap', whats);
        if (insta) data.append('insta', insta);
        if (face) data.append('face', face);
        if (tipo) data.append('tipoid', tipo);
        if (cor) data.append('cor1', cor.replace('#', ''));
        if (cor2) data.append('cor2', cor2.replace('#', ''));
        if (cor3) data.append('cor3', cor3.replace('#', ''));
        if (cor4) data.append('cor4', cor4.replace('#', ''));
        if (descricao) data.append('biografia', descricao);
        if (foto && foto.length > 0) data.append('imagem', foto[0]);

        try {
            const response = await axios.post(api + 'usuarios/criar', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Resposta da API:', response.data);
            navegar("/");
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            if (axios.isAxiosError(error) && error.response) {
                console.error('Resposta do servidor:', error.response.data);
            }
        }

        const dadosLogin = {
            email: usuario,
            senha: senha,
        };

        try {
            const response = await axios.post(api + 'autenticacao/login', dadosLogin, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            localStorage.setItem('tokenODO', response.data.acessToken);
            navegar('/')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                alert(error.response?.data.message);
            } else {
                console.error('Erro inesperado:', error);
            }
        }
    }
    return (
        <div className="pagCadastro">
            <Link to="/" className="figureHeaderCadastrar">
                <img src="/imgs/header/signo.svg" alt="Logo do site. Signo em formato de cabeça de elefante." />
            </Link>
            <div className="formCadCompleto">
                <figure>
                    <img src="/imgs/entrar/banner.png" />
                </figure>
                <div className="cadFormArea">
                    <figure>
                        <img src="/imgs/entrar/logoOdoVermelha.png" />
                    </figure>
                    <h1 className="dmSans">Criar Conta</h1>
                    <div className="cadEtapaProgresso">
                        <p id="etapaNumero1" className="etapaNumero etapaNumeroVermelho dmSans">1</p>
                        <canvas id="etapaBarraVermelha" className="cadBarraVermelhaMetade"></canvas>
                        <p id="etapaNumero2" className="etapaNumero dmSans">2</p>
                        <canvas id="etapaBarraAzul"></canvas>
                        <p id="etapaNumero3" className="etapaNumero dmSans">3</p>
                        <canvas id="etapaBarraVerde"></canvas>
                        <p id="etapaNumero4" className="etapaNumero dmSans">4</p>
                        <canvas id="etapaBarraAmarela"></canvas>
                        <p id="etapaNumero5" className="etapaNumero dmSans">5</p>
                    </div>

                    <hr />

                    <form action="">
                        <div className="cadEtapa cadEtapaAtiva" id="cadEtapa1">
                            <h2 className="dmSans">Informações essenciais</h2>
                            <p className="dmSans">Complete seu cadastro para começar a compartilhar sua arte com o mundo!</p>
                            <div className="cadCampoComum cadCampoMetadinha">
                                <label className="dmSans">Nome</label>
                                <div>
                                    <input onChange={(e) => setNome(e.target.value)} type="text" className="dmSans" placeholder="digite seu nome" />
                                    <figure>
                                        <img src="/imgs/cadastro/nomeCad.svg" />
                                    </figure>

                                </div>
                            </div>
                            <div className="cadCampoComum cadCampoMetadinha">
                                <label className="dmSans">Email</label>
                                <div>
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" className="dmSans" placeholder="digite seu email" />
                                    <figure>
                                        <img src="/imgs/cadastro/emailCad.svg" />
                                    </figure>
                                </div>
                            </div>
                            <div className="cadCampoComum cadCampoMetadinha">
                                <label className="dmSans">Nome de Usuario</label>
                                <div>
                                    <input onChange={(e) => setUsuario(e.target.value)} type="text" className="dmSans" placeholder="digite o nome de seu usuario" />
                                    <figure>
                                        <img src="/imgs/cadastro/nomeUsuarioCad.svg" />
                                    </figure>
                                </div>
                            </div>
                            <div className="cadCampoComum cadCampoMetadinha">
                                <label className="dmSans">Senha</label>
                                <div>
                                    <input onChange={(e) => setSenha(e.target.value)} type={inputSenhaTipo} className="dmSans" placeholder="digite sua senha" />
                                    <figure onClick={MudarTipoInpuSenha}>
                                        <img src="/imgs/cadastro/senhaCad.svg" />
                                    </figure>
                                </div>
                            </div>

                            <a href="" className="botaoComum google">
                                <img src="/imgs/entrar/googleIcone.png" />
                                <p className="dmSans">Entre com o Google</p>
                            </a>

                            <div className="cadEtapaBotoes flexDireita">
                                <button type="button" className="btVermelhoPreenchido dmSans"
                                    onClick={() => TrocaEtapa('cadEtapa1', 'cadEtapa2', false, 1, 'etapaNumero1', 'etapaNumero2',
                                        'etapaBarraVermelha', 'etapaBarraAzul')}
                                >
                                    Prosseguir
                                </button>
                            </div>
                        </div>
                        <div className="cadEtapa" id="cadEtapa2">
                            <h2>Informações de localização</h2>
                            <p>Informe sua localização para ajudar a contextualizar sua arte e facilitar a conexão com sua comunidade</p>

                            <div className="cadCampoComum">
                                <label className="dmSans">Estado</label>
                                <div>
                                    <select onChange={(e) => setEstado(Number(e.target.value))} className="dmSans">
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
                                    <figure>
                                        <img src="/imgs/cadastro/estadoCad.svg" />
                                    </figure>
                                </div>
                            </div>
                            <div className="cadCampoComum">
                                <label className="dmSans">Cidade</label>
                                <div>
                                    <select onChange={(e) => setCidade(Number(e.target.value))} className="dmSans">
                                        <option value={undefined} >
                                            ----
                                        </option>
                                        {(
                                            listaCidades.map((cidade, index) =>
                                            (
                                                <option value={cidade.id} key={index}>
                                                    {cidade.nome}
                                                </option>
                                            ))
                                        )}
                                    </select>
                                    <figure>
                                        <img src="/imgs/cadastro/cidadeCad.svg" />
                                    </figure>
                                </div>
                            </div>

                            <div className="cadEtapaBotoes">
                                <button className="btAzul dmSans" onClick={() => TrocaEtapa('cadEtapa2', 'cadEtapa1', true, 2, 'etapaNumero2', 'etapaNumero1',
                                    'etapaBarraAzul', 'etapaBarraVermelha')} type="button">Voltar</button>
                                <button className="btAzulPreenchido dmSans"
                                    onClick={() => TrocaEtapa('cadEtapa2', 'cadEtapa3', false, 2, 'etapaNumero2', 'etapaNumero3',
                                        'etapaBarraAzul', 'etapaBarraVerde')} type="button">Prosseguir</button>
                            </div>
                        </div>
                        <div className="cadEtapa" id="cadEtapa3">
                            <h2 className="dmSans">Informações de contato</h2>
                            <p className="dmSans">Compartilhe suas redes sociais e contatos para facilitar a comunicação com outros artistas e possíveis compradores</p>
                            <div className="cadCampoComum cadCampoMetadinha">
                                <label className="dmSans">Instagram</label>
                                <div>
                                    <input onChange={(e) => setInsta(e.target.value)} type="text" className="dmSans" placeholder="copie e cole o link aqui" />
                                    <figure>
                                        <img src="/imgs/cadastro/instaCad.png" />
                                    </figure>
                                </div>
                            </div>
                            <div className="cadCampoComum cadCampoMetadinha">
                                <label className="dmSans">WhatsApp</label>
                                <div>
                                    <input onChange={(e) => setWhats(e.target.value)} type="text" className="dmSans" placeholder="copie e cole o link aqui" />
                                    <figure>
                                        <img src="/imgs/cadastro/zapCad.svg" />
                                    </figure>
                                </div>
                            </div>
                            <div className="cadCampoComum cadCampoMetadinha">
                                <label className="dmSans">Facebook</label>
                                <div>
                                    <input onChange={(e) => setFace(e.target.value)} type="text" className="dmSans" placeholder="copie e cole o link aqui" />
                                    <figure>
                                        <img src="/imgs/cadastro/faceCad.svg" />
                                    </figure>
                                </div>
                            </div>
                            <div className="cadCampoComum cadCampoMetadinha">
                                <label className="dmSans">Youtube</label>
                                <div>
                                    <input onChange={(e) => setYoutube(e.target.value)} type="text" className="dmSans" placeholder="copie e cole o link aqui" />
                                    <figure>
                                        <img src="/imgs/cadastro/youtubeCad.svg" />
                                    </figure>
                                </div>
                            </div>
                            <div className="cadEtapaBotoes">
                                <button className="btVerde dmSans" onClick={() => TrocaEtapa('cadEtapa3', 'cadEtapa2', true, 3, 'etapaNumero3', 'etapaNumero2',
                                    'etapaBarraVerde', 'etapaBarraAzul')} type="button">Voltar</button>
                                <button className="btVerdePreenchido dmSans" onClick={() => TrocaEtapa('cadEtapa3', 'cadEtapa4', false, 3, 'etapaNumero3', 'etapaNumero4',
                                    'etapaBarraVerde', 'etapaBarraAmarela')} type="button">Prosseguir</button>
                            </div>
                        </div>
                        <div className="cadEtapa" id="cadEtapa4">
                            <h2 className="dmSans">Informações de Personalização e Apresentação</h2>
                            <p className="dmSans">Mostre quem você é! Deixe sua marca e torne seu perfil único!</p>
                            <div onClick={() => AtribuirImagem('inputImagemCad', 'imgPerfilCad')} className="areaFoto">
                                <label className="dmSans">Minha foto</label>
                                <figure>
                                    <img id='imgPerfilCad' src="/imgs/verPerfil/perfil.png" />
                                </figure>
                                <input onChange={(e) => setFoto(e.target.files ? e.target.files : null)} id='inputImagemCad' type="file" />
                            </div>
                            <div className="divCores">
                                <label className="dmSans">Minhas cores</label>
                                <ul>
                                    <li>
                                        <input onChange={(e) => setCor(e.target.value)} type="color" />
                                        <div>
                                            <p className="dmSans">Cor</p>
                                            <span className="dmSans">{cor}</span>
                                        </div>
                                    </li>
                                    <li>
                                        <input onChange={(e) => setCor2(e.target.value)} type="color" />
                                        <div>
                                            <p className="dmSans">Cor</p>
                                            <span className="dmSans">{cor2}</span>
                                        </div>
                                    </li>
                                    <li>
                                        <input onChange={(e) => setCor3(e.target.value)} type="color" />
                                        <div>
                                            <p className="dmSans">Cor</p>
                                            <span className="dmSans">{cor3}</span>
                                        </div>
                                    </li>
                                    <li>
                                        <input onChange={(e) => setCor4(e.target.value)} type="color" />
                                        <div>
                                            <p className="dmSans">Cor</p>
                                            <span className="dmSans">{cor4}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="cadCampoComum cadCampoMetadinha">
                                <label className="dmSans">Biografia</label>
                                <textarea onChange={(e) => setDescricao(e.target.value)} className="dmSans"></textarea>
                            </div>
                            <div className="cadCampoComum cadCampoMetadinha">
                                <label className="dmSans">Sou um artista...</label>
                                <div>
                                    <select onChange={(e) => setTipo(e.target.value)} className="dmSans">
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
                            <div className="cadEtapaBotoes">
                                <button className="btAmarelo dmSans"
                                    onClick={() => TrocaEtapa('cadEtapa4', 'cadEtapa3', true, 4, 'etapaNumero4', 'etapaNumero3',
                                        'etapaBarraAmarela', 'etapaBarraVerde')} type="button">Voltar</button>
                                <button className="btAmareloPreenchido dmSans"
                                    onClick={() => TrocaEtapa('cadEtapa4', 'cadEtapa5', false, 4, 'etapaNumero4', 'etapaNumero5',
                                        'etapaBarraAmarela', 'etapaBarraAmarela')} type="button">Prosseguir</button>
                            </div>
                        </div>
                        <div className="cadEtapa" id="cadEtapa5">
                            <h2 className="dmSans">Você conseguiu! Agora, finalize e prepare-se para mostrar sua arte ao mundo!</h2>
                            <figure>
                                <img src="/imgs/cadastro/cadEnviar.png" />
                            </figure>
                            <button onClick={EnviarClique} className="dmSans">Enviar</button>
                            <span className="dmSans">Não se preocupe, você ainda poderá mudar as informações coletadas aqui no seu perfil!</span>
                            <div className="cadEtapaBotoes dmSans">
                                <button className="btVermelho dmSans" onClick={() => TrocaEtapa('cadEtapa5', 'cadEtapa4', true, 5, 'etapaNumero5', 'etapaNumero4',
                                    'etapaBarraAmarela', 'etapaBarraAmarela')} type="button">Voltar</button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}
export default Cadastro;