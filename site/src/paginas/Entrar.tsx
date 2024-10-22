import { useState} from 'react';
import axios from 'axios';
import '../estilos/entrar.css';
import { useNavigate, Link } from 'react-router-dom';

const Entrar: React.FC = () => {
    const navegar = useNavigate();

    const [inputSenhaTipo, setInputSenhaTipo] = useState("password");
    const MudarTipoInpuSenha = () => {
        const input = document.getElementById('campoSenhaEntrar',) as HTMLInputElement | null;
        if (input != null) {
            if (inputSenhaTipo == "password") setInputSenhaTipo("text");
            else setInputSenhaTipo("password")
        }
    }

    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const EntrarClique = async (event: React.FormEvent) => {
        event.preventDefault();

        const dados = {
            email: login,
            senha: senha,
        };

        try {
            const response = await axios.post('https://olhosdosoleosbackend-production.up.railway.app/autenticacao/login', dados, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            //console.log(response);
            //alert(response.data);
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
        <div id='entrarPag'>
            <figure className="figureHeader">
                <Link className="headerLogo" to="/"><img src="imgs/header/signo.svg" alt="Logo do site. Signo em formato de cabeça de elefante." /></Link>
            </figure>
            <div className="formCompleto">
                <form >
                    <figure>
                        <img src="imgs/entrar/logoOdoVermelha.png" />
                    </figure>
                    <h2 className="dmSans">Entrar</h2>
                    <input name="login" type="text" className="dmSansThin" placeholder="nome ou email"
                        onChange={(e) => setLogin(e.target.value)} />
                    <div className="campoSenha">
                        <input name="senha" type={inputSenhaTipo} id="campoSenhaEntrar" className="dmSansThin" placeholder="senha"
                            onChange={(e) => setSenha(e.target.value)} />
                        <span className="olhoSenha" onClick={MudarTipoInpuSenha}>
                            <img src="/imgs/entrar/iconeVerSenha.svg" alt="Mostrar senha" />
                        </span>
                    </div>
                    <span className="dmSansThin">-OU-</span>
                    <a href="" className="botaoComum google">
                        <img src="imgs/entrar/googleIcone.png" />
                        <p >Entre com o Google</p>
                    </a>
                    <div>
                        <input className="botaoComum fundoBtVermelho" type="submit" value="Entrar" onClick={EntrarClique} />
                        <a className="linkSimples dmSans" href="#">
                            Ainda não possui uma conta? <mark className="dmSans">Registre-se  <b className="dmSans">aqui</b></mark>
                        </a>
                    </div>
                </form>
                <figure>
                    <img src="imgs/entrar/banner.png" />
                </figure>
            </div>
        </div>
    );
};

export default Entrar;
