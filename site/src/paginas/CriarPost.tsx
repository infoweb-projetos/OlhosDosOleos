import HeaderSite from '../componentes/header';
import RodapeSite from '../componentes/rodape';
import '../estilos/criarPost.css';
import { AbrirFecharModal } from '../scripts/modal';
import { AtribuirImagem } from '../scripts/atribuirImagem';

const CriarPost: React.FC = () => {
    const VoltarPagAnterior = () =>{
        window.history.back();
    }
    return (
        <div className='organizacaoPadrao'>
            <HeaderSite />
            <div className="areaConteudo  criarPost">
                <form>
                    <div className="criarTituloPost">
                        <div>
                            <label>O título aparecerá aqui!</label>
                            <button onClick={VoltarPagAnterior} type="button"><img src="imgs/criarPost/criarFecharBt.svg" alt="icone de x para voltar para pagina anterior" /></button>
                        </div>
                        <input type="text" name="tituloPost" />
                    </div>
                    <div className="criarLadoLadoPost">
                        <div className="criarPostEsquerda">
                            <img id="imgFundo" />
                            <button onClick={() => AtribuirImagem('imagemPost', 'imgFundo')} type="button">
                                <img src="imgs/criarPost/criarUploadImagem.svg" />
                                Faça upload de um arquivo ou o arraste até aqui
                            </button>
                            <input type="file" id="imagemPost" name="imagemPost" />
                        </div>
                        <div className="criarPostDireita">
                            <div className="campoCriarPostComum">
                                <label>Descrição...</label>
                                <textarea name="descricaoPost"></textarea>
                            </div>
                            <div className="campoCriarPostComum">
                                <label>Adicionar...</label>
                                <figure>
                                    <img src="imgs/criarPost/iconeTags.svg" />
                                    <figcaption>Tags</figcaption>
                                </figure>
                                <hr />
                                <figure>
                                    <img src="imgs/criarPost/iconeSoftwaresUsados.svg" />
                                    <figcaption>Softwares Usados</figcaption>
                                </figure>
                            </div>
                            <div className="campoCriarPostComum">
                                <label>Anexar Imagens</label>
                                <button className="botaoComum fundoBtBranco" type="button">
                                    <img src="imgs/criarPost/iconeClipe.svg" />
                                    Anexar Imagem
                                </button>
                                <p>Anexe imagens do processo da sua arte</p>
                                <input type="file" name="imagensPost" />
                            </div>

                            <div className="criarPostEnviarArea">
                                <input type="submit" value="Postar" />
                                <button type="button">
                                    Salvar rascunho
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="criarPostSensivel">
                        <label htmlFor="postSensivel">  Sua arte possui conteúdo sensível?</label>
                        <input type="checkbox" name="postSensivel" id="postSensivel" />
                    </div>
                </form>

                <div id="modalDiretrizPostArea" className="modalAvisoArea">
                    <div id="modalDiretrizPost" className="modalAviso" style={{opacity:1,}}>
                        <div>
                            <figure>
                                <img src="imgs/criarPost/iconeDiretrizModal.svg" />
                            </figure>
                            <button onClick={() => {AbrirFecharModal('modalDiretrizPost'); AbrirFecharModal('modalDiretrizPostArea', 'flex');}}><img src="imgs/criarPost/fecharModalDiretriz.svg" /></button>
                        </div>
                        <h3> Conheça nossas diretrizes de Postagens</h3>
                        <p>
                            Antes de postar, recomendamos que você se familiarize com nossas regras para garantir que tudo ocorra com respeito,
                            inclusão e diversidade. Assim, todos podem compartilhar suas criações em um ambiente acolhedor e positivo.
                        </p>
                        <ul >
                            <li><button onClick={VoltarPagAnterior}>Sair</button></li>
                            <li><a href="">Ver</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <RodapeSite />
        </div>
    );
}
export default CriarPost;