import { useState, useRef } from 'react'
import '../estilos/formularioEntrada.css'


const FormularioEntrada = () => {
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

    return (
        <div>
            <header>
                <img src="/imgs/logoHeader.png" />
                <p>Olhos<br /> dos<br /> Óleos</p>
            </header>
            <main>
                <section>
                    <div>
                        <div className={painelDireiroAtivo ? 'right-panel-active container' : 'container'} id="container">
                            <div className="form-container sign-up-container">
                                <form action="#">
                                    <div>
                                        <h1>Entrar</h1>
                                        <div>
                                            <label>Usuario:</label>
                                            <input type="text" name="loginUsuario" />
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
                            <div className="form-container sign-in-container">
                                <form action="#" id="formCadastro">
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
                                                <select id="paisSelect" name="paisSelect">
                                                    <option value="br">Brasil</option>
                                                    <option value="eua">Estados Unidos</option>
                                                </select>
                                            </div>
                                            <div className="estadoSelectDiv">
                                                <label htmlFor="ufSelect">Estado:</label>
                                                <select id="ufSelect" name="ufSelect">
                                                    <option value="rn">RN</option>
                                                    <option value="pe">PE</option>
                                                </select>
                                            </div>
                                            <div className="cidadeSelectDiv">
                                                <label htmlFor="cidadeSelect">Cidade:</label>
                                                <select id="cidadeSelect" name="cidadeSelect">
                                                    <option value="natal">Natal</option>
                                                    <option value="vilaAlva">Vila Alva</option>
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
                                                    <select id="tipoUsuarioSelect" name="tipoUsuarioSelect">
                                                        <option value="artistaDigital">Artistista Digital</option>
                                                        <option value="pintorAquarela">Pintor de Aquarela</option>
                                                        <option value="pintorAquarela">Artista Multi-Material</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label>Whatzap:</label>
                                                    <input type="text" />
                                                </div>
                                                <div>
                                                    <label>Facebook:</label>
                                                    <input type="text" />
                                                </div>
                                                <div>
                                                    <label>Twitter:</label>
                                                    <input type="text" />
                                                </div>
                                                <div>
                                                    <label>Insta:</label>
                                                    <input type="text" />
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
        </div>
    );
};

export default FormularioEntrada;
