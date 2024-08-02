import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import '../estilos/formularioEntrada.css'
import { useNavigate, Link } from 'react-router-dom'


const FormularioEntrada: React.FC = () => {
    const [painelDireiroAtivo, setPainelDireitoAtivo] = useState(true);
    const handleCadastroClick = () => {
        setPainelDireitoAtivo(false);
    };
    const handleEntrarClick = () => {
        setPainelDireitoAtivo(true);
    };

    const inputRef = useRef<HTMLInputElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const handleAtribuirImagem = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (imgRef.current) {
                    imgRef.current.src = e.target?.result as string;
                }
            };
            reader.readAsDataURL(file);
        } else {
            if (imgRef.current) {
                imgRef.current.src = '/imgs/perfilPadrao.png';
            }
        }
    };
    const handleImgClick = () => {
        inputRef.current?.click();
    };

    const [isArtista, setArtista] = useState(false);
    const handleCheckArtista = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.checked) setArtista(true);
        else setArtista(false);
    };

    const navegar = useNavigate();
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formElement = e.currentTarget; // Certifique-se de que é um HTMLFormElement
        if (!(formElement instanceof HTMLFormElement)) {
            console.error("e.currentTarget não é um HTMLFormElement");
            return;
        }

        const formData = new FormData(formElement);
        const userData = Object.fromEntries(formData.entries());

        const pais = formData.get('paisSelect');
        const estado = formData.get('ufSelect');
        const cidade = formData.get('cidadeSelect');
        const localizacao = `${pais}, ${estado}, ${cidade}`;

        const data = {
            nome: userData.cadUsuario ? userData.cadUsuario : null,
            tipo: isArtista ? userData.tipoUsuarioSelect : null,
            localizacao: localizacao ? localizacao : null,
            descricao: userData.cadBio ? userData.cadBio : null,
            zap: isArtista ? userData.cadZap : null,
            insta: isArtista ? userData.cadInsta : null,
            face: isArtista ? userData.cadFace : null,
            twitter: isArtista ? userData.cadX : null,
            foto: null, // Adicione lógica para capturar a URL da imagem aqui, se necessário
            Senha: userData.cadSenha ? userData.cadSenha : null,
            Email: userData.cadEmail ? userData.cadEmail : null,
        };
        try {
            alert("Tentando ");
            const response = await axios.post('http://localhost:5000/api/usuario', data);
            navegar('/feed');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                let erro = (error.response?.data?.error || error.message).toString();
                console.log('Erro ao cadastrar:', erro);
                alert('Erro ao cadastrar: ' + erro);
            }
            else {
                console.error('Erro inesperado:', error);
            }
        }
    };

    const [cidades, setCidades] = useState<string[]>([]);
    const [cidadeSelecionada, setCidadeSelecionada] = useState<string | ''>('');
    useEffect(() => {
        // Função para buscar cidades da API
        const buscaCidades = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/cidades');
                const cidadeNomes = response.data.map((cidade: { nome: string }) => cidade.nome);
                setCidades(cidadeNomes);
            } catch (error) {
                console.error('Erro ao buscar cidades:', error);
            }
        };

        buscaCidades();
    }, []);

    const [estados, setEstados] = useState<string[]>([]);
    const [estadoSelecionado, setEstadoSelecionado] = useState<string | ''>('');
    useEffect(() => {
        // Função para buscar cidades da API
        const buscaEstados = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/estados');
                const estadosNomes = response.data.map((estado: { nome: string }) => estado.nome);
                setEstados(estadosNomes);
            } catch (error) {
                console.error('Erro ao buscar estados:', error);
            }
        };

        buscaEstados();
    }, []);

    const [paises, setPaises] = useState<string[]>([]);
    const [paisSelecionado, setPaisSelecionado] = useState<string | ''>('');
    useEffect(() => {
        // Função para buscar cidades da API
        const buscaPaises = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/paises');
                const paisesNomes = response.data.map((pais: { nome: string }) => pais.nome);
                setPaises(paisesNomes);
            } catch (error) {
                console.error('Erro ao buscar paises:', error);
            }
        };

        buscaPaises();
    }, []);

    const [especializacoes, setEspecializacoes] = useState<string[]>([]);
    const [especializacaoSelecionada, setEspecializacaoSelecionada] = useState<string | ''>('');
    useEffect(() => {
        // Função para buscar cidades da API
        const buscaEspecializacoes = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/especializacoes');
                const especializacoes = response.data.map((especializacao: { nome: string }) => especializacao.nome);
                setEspecializacoes(especializacoes);
            } catch (error) {
                console.error('Erro ao buscar especializações:', error);
            }
        };

        buscaEspecializacoes();
    }, []);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const loginUsuario = (event.currentTarget.elements.namedItem('loginUsuario') as HTMLInputElement).value;
        const loginSenha = (event.currentTarget.elements.namedItem('loginSenha') as HTMLInputElement).value;

        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                loginUsuario,
                loginSenha
            });

            localStorage.setItem('token', response.data.token);

            alert('Login bem-sucedido');
            navegar('/feed');
        } catch (error: any) {
            console.error('Erro ao fazer login:', error.response?.data?.error || error.message);
            alert('Erro ao fazer login: ' + (error.response?.data?.error || error.message));
        }
    };

    return (
        <>
            <header>
                <Link to="/feed">
                    <img src="/imgs/logoHeader.png" />
                    <p>Olhos<br /> dos<br /> Óleos</p>
                </Link>
            </header>
            <main>
                <section>
                    <div>
                        <div className={painelDireiroAtivo ? 'right-panel-active container' : 'container'} id="container">
                            <div className="form-container sign-up-container">
                                <form action="#" className="formularioEntrada" onSubmit={handleLogin}>
                                    <div>
                                        <h1>Entrar</h1>
                                        <div>
                                            <label>Email:</label>
                                            <input type="email" name="loginUsuario" />
                                        </div>
                                        <div>
                                            <label>Senha:</label>
                                            <input type="password" name="loginSenha" />
                                        </div>
                                        <a href="#">Esqueceu a senha?</a>
                                        <input type="submit" value="Entrar" />
                                    </div>
                                    <div>
                                        <hr />
                                        <button type="button" onClick={handleCadastroClick} id="signUp">Não possui conta? Registre-se <b>aqui</b></button>
                                    </div>
                                </form>
                            </div>
                            <div className="form-container sign-in-container" >
                                <form action="#" id="formCadastro" onSubmit={handleFormSubmit} className="formularioEntrada">
                                    <div>
                                        <h1>Cadastro</h1>
                                        <div>
                                            <img onClick={handleImgClick} id="imgForm" src="/imgs/perfilPadrao.png" ref={imgRef} />
                                            <input type="file" ref={inputRef} onChange={handleAtribuirImagem} id="inputArquivo" name="cadImg" />
                                        </div>
                                        <div>
                                            <label>Usuario:</label>
                                            <input type="text" name="cadUsuario" />
                                        </div>
                                        <div>
                                            <label>Bio:</label>
                                            <textarea name="cadBio" ></textarea>
                                        </div>
                                        <div>
                                            <label>Email:</label>
                                            <input type="text" name="cadEmail" />
                                        </div>
                                        <div>
                                            <label>Senha:</label>
                                            <input type="password" name="cadSenha" />
                                        </div>
                                        <div>
                                            <label>Confirme a senha:</label>
                                            <input type="password" name="cadConfirmarSenha" />
                                        </div>
                                        <div className="campoFlex">
                                            <div className="paisSelectDiv">
                                                <label htmlFor="paisSelect">Pais:</label>
                                                <select id="paisSelect" name="paisSelect" value={paisSelecionado}
                                                    onChange={(e) => setPaisSelecionado(e.target.value)} >
                                                    {paises.map(pais => (
                                                        <option key={pais} value={pais}>{pais} </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="estadoSelectDiv">
                                                <label htmlFor="ufSelect">Estado:</label>
                                                <select id="ufSelect" name="ufSelect" value={estadoSelecionado}
                                                    onChange={(e) => setEstadoSelecionado(e.target.value)} >
                                                    {estados.map(estado => (
                                                        <option key={estado} value={estado}>{estado} </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="cidadeSelectDiv">
                                                <label htmlFor="cidadeSelect">Cidade:</label>
                                                <select id="cidadeSelect" name="cidadeSelect" value={cidadeSelecionada}
                                                    onChange={(e) => setCidadeSelecionada(e.target.value)} >
                                                    {cidades.map(cidade => (
                                                        <option key={cidade} value={cidade}>{cidade} </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="campoFlex campoCheck">
                                            <input type="checkbox" id="artistaCheck" onChange={handleCheckArtista} name="artistaCheck" />
                                            <label htmlFor="artistaCheck">Artista</label>
                                        </div>
                                        {!isArtista ?
                                            null :
                                            <div id="areaCamposContato">
                                                <div className="campoSelectComum">
                                                    <label htmlFor="tipoUsuarioSelect">Tipo:</label>
                                                    <select id="tipoUsuarioSelect" name="tipoUsuarioSelect" value={especializacaoSelecionada}
                                                        onChange={(e) => setEspecializacaoSelecionada(e.target.value)} >
                                                        {especializacoes.map(especializacao => (
                                                            <option key={especializacao} value={especializacao}>{especializacao} </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label>Whatsapp:</label>
                                                    <input type="text" name="cadZap" />
                                                </div>
                                                <div>
                                                    <label>Facebook:</label>
                                                    <input type="text" name="cadFace" />
                                                </div>
                                                <div>
                                                    <label>Twitter:</label>
                                                    <input type="text" name="cadX" />
                                                </div>
                                                <div>
                                                    <label>Insta:</label>
                                                    <input type="text" name="cadInsta" />
                                                </div>
                                            </div>
                                        }

                                        <input type="submit" value="Cadastrar" />
                                    </div>

                                    <div>
                                        <hr />
                                        <button type="button" onClick={handleEntrarClick} id="signIn">Já possui conta? Entre por <b>aqui</b></button>
                                    </div>
                                </form>

                            </div>
                            <div className="overlay-container">
                                <div className="overlay">
                                    <div className="overlay-panel overlay-left">
                                        <img src="/imgs/login/imgLogin.jpg" />
                                    </div>
                                    <div className="overlay-panel overlay-right">
                                        <img src="/imgs/login/imgLogin.jpg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default FormularioEntrada;
