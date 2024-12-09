import HeaderSite from '../componentes/header';
import RodapeSite from '../componentes/rodape';
import '../estilos/criarPost.css';
import { AbrirFecharModal } from '../scripts/modal';
import { AtribuirImagem } from '../scripts/atribuirImagem';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Usuario } from '../interfaces/Usuario';
import { CriarPostDados } from '../interfaces/Post';
import { VerificaToken } from '../scripts/uteis';
import {api} from '../apiUrl.ts';
import { Categoria, Tag } from '../interfaces/Enums.ts';
import { CarroselComum } from '../scripts/carrossel.ts';

const CriarPost: React.FC = () => {
    const [tokenAtual, atualizarTokenAtual] = useState<string | null>("");
    const navegar = useNavigate();
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [dados, setDados] = useState<CriarPostDados>({
        usuarioid: 0,
        imagemPost: undefined,
        processoPost: undefined,
        tituloPost: '',
        descricaoPost: undefined,
        postSensivel: false,
        rascunho: false,
        categoriaPost: '',
    });
    const [qtdPost, setQtdPost] = useState<number>(1);
    const [listaCategorias, setListaCategorias] = useState<Array<Categoria>>([]);
    const [tagsPost, setTagsPost] = useState<Array<string>>([]);
    const [ferramentasPost, setFerramentasPost] = useState<Array<string>>([]);
    const classesCorTag = ['tagVermelho','tagAzul','tagVerdeAgua','tagVerde','tagAmarelo'];
    const [estaEnviando, setEstaEnviando] = useState<boolean>(false);
    const [listaTags, setListaTags] = useState<Array<Tag>>([]);
    const [listaFerramentas, setListaFerramentas] = useState<Array<Tag>>([]);
    const [temImagem, setTemImagem] = useState<boolean>(false);
    const [sucessoEnvio, setSucessoEnvio] = useState<boolean>(false);

    const [imagens, setImagens] = useState<string[]>([]);

    const AtribuiImagensProcesso = (evento: React.ChangeEvent<HTMLInputElement>) => {
        const arquivos = evento.target.files;

        if (arquivos) {
            const leitores = Array.from(arquivos).map(arquivo => {
                return new Promise<string>((resolve) => {
                    const leitor = new FileReader();
                    leitor.onload = () => resolve(leitor.result as string);
                    leitor.readAsDataURL(arquivo);
                });
            });

            Promise.all(leitores).then(urls => {
                setImagens(urls);
            });
        }
    };
    

    const ListarCategorias = async () => {
        await axios.get(api + 'categorias/listar', {})
            .then(response => {
                const listaBD = response.data.dados;
                setListaCategorias(listaBD);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const ListarTags = async () => {
        await axios.get(api + 'tags/tags', {})
            .then(response => {
                const listaBD = response.data.dados;
                setListaTags(listaBD);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const ListarFerramentas = async () => {
        await axios.get(api + 'tags/ferramentas', {})
            .then(response => {
                const listaBD = response.data.dados;
                setListaFerramentas(listaBD);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const VerificarPost = async (token: string | null) => {
        axios.get(api + 'posts/meus', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                const postsBD = response.data.dados;
                setQtdPost(postsBD.length)
            })
    }

    const Perfil = async (token: string | null) => {
        axios.get(api + 'usuarios/perfil', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            const usu = response.data.dados;
            setUsuario(usu);
        })
        .catch(error => {
            console.log('Token inválido ou expirado');
            console.log(error);
            localStorage.removeItem('tokenODO');
            navegar('/');
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
            ListarCategorias();
            ListarTags();
            ListarFerramentas();
            Perfil(tokenAtual);
            VerificarPost(tokenAtual);
        } 
    }, [tokenAtual]);

    useEffect(() => {
        CarroselComum('anteBtn', 'proxBtn', 'carroselSlide', 'carroselCriarPost', 'listaImagensCarroselCriarPost');
    }, [imagens]);

    const AtualizarTags = () => {
        let elemento = document.getElementById('tagsPost') as HTMLInputElement;
        if (elemento){
            if (elemento.value && !tagsPost.includes(elemento.value)) setTagsPost([...tagsPost, elemento.value]);
        }
    }
    const RemoverTag = (tag: string) =>{
        setTagsPost(tagsPost.filter(item => item !== tag));
    }

    const AtualizarFerramentas = () => {
        let elemento = document.getElementById('ferramentasPost') as HTMLInputElement;
        if (elemento){
            if (elemento.value && !ferramentasPost.includes(elemento.value)) setFerramentasPost([...ferramentasPost, elemento.value]);
        }
    }
    const RemoverFerramenta = (tag: string) =>{
        setFerramentasPost(ferramentasPost.filter(item => item !== tag));
    }

    const AoMudarValorInput = (elemento: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = elemento.target as HTMLInputElement;
        if (type === 'checkbox') {
            const { checked } = elemento.target as HTMLInputElement;
            setDados({
                ...dados,
                [name]: checked,
            });
        } else if (type === 'file') {
            const { files } = elemento.target as HTMLInputElement;
            setDados({
                ...dados,
                [name]: files ? files : undefined,
            });
            if (elemento.target.name == "imagemPost") setTemImagem(true);
            else setTemImagem(false);
        } else {
            setDados({
                ...dados,
                [name]: value,
            });
        }
    }

    const Criar = async (ehRascunho: boolean) => {
        if (!tokenAtual) navegar('/');
        if (!usuario) return console.log("Erro ao vincular com usuario");
        dados.usuarioid = usuario.id;
        dados.rascunho = ehRascunho;

        const data = new FormData();
        if (!dados.tituloPost) return console.log("Coloque um titulo");
        if (!dados.categoriaPost) return console.log("Coloque uma Categoria");
        data.append('titulo', dados.tituloPost);
        data.append('descricao', dados.descricaoPost ?? '');
        data.append('rascunho', (dados.rascunho ?? false).toString());
        data.append('sensivel', (dados.postSensivel ?? false).toString());
        data.append('usuarioid', dados.usuarioid.toString());
        data.append('categoriaid', dados.categoriaPost ?? '');
        data.append('tagsjson', JSON.stringify(tagsPost));
        data.append('ferramentasjson', JSON.stringify(ferramentasPost));
        if (dados.imagemPost) {
            data.append('imagem', dados.imagemPost[0]);
        }
        else return console.log("Anexe imagem.");
        if (dados.processoPost) {
            console.log(dados.processoPost);
            for (let img of dados.processoPost){ data.append('processo', img);}
        }

        try {
            setEstaEnviando(true);
            const response = await axios.post(api + 'posts/criar', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${tokenAtual}`,
                },
            });
            console.log('Resposta da API:', response.data);
            setSucessoEnvio(true);
            setEstaEnviando(false);
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            if (axios.isAxiosError(error) && error.response) {
                console.error('Resposta do servidor:', error.response.data);
            }
        }
    }

    const AoEnviar = (e: React.FormEvent) => {
        return e.preventDefault();
    };

    const VoltarPagAnterior = () => {
        window.history.back();
    }

    return (
        <div className='organizacaoPadrao'>
            <HeaderSite />
            {
                sucessoEnvio &&
                (
                    <div onClick={() => navegar(0)} className='modalPostSucesso'>
                        <div>
                            <div>
                                <div>
                                    <figure>
                                        <img src='/imgs/criarPost/iconeSucesso.svg' />
                                    </figure>
                                </div>

                                <button>
                                    <img src="imgs/criarPost/fecharModalDiretriz.svg" />
                                </button>
                            </div>
                            <h3>Post publicado</h3>
                            <span>Sua arte agora poderá ser apreciada por toda a nossa comunidade!</span>
                            <button>Fechar</button>
                        </div>  
                    </div>
                )
            }
            
            <div className="areaConteudo  criarPost">
                <form onSubmit={AoEnviar}>
                    <div className="criarTituloPost">
                        <div>
                            <label>O título aparecerá aqui!</label>
                            <button onClick={VoltarPagAnterior} type="button"><img src="imgs/criarPost/criarFecharBt.svg" alt="icone de x para voltar para pagina anterior" /></button>
                        </div>
                        <input value={dados.tituloPost} onChange={AoMudarValorInput} type="text" name="tituloPost" />
                    </div>
                    <div className="criarTituloPost">
                        <div>
                            <label>Selecione uma categoria</label>
                        </div>
                        <select onChange={AoMudarValorInput} name="categoriaPost">
                            <option value={undefined} >
                                ----
                            </option>
                            {(
                                listaCategorias.map((categoria, index) =>
                                (
                                    <option value={categoria.nome} key={index}>
                                        {categoria.nome}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>
                    <div className="criarLadoLadoPost">
                        <div className="criarPostEsquerda">
                            <figure>
                                {
                                temImagem?
                                (<img id="imgFundo" className={temImagem ? "criarPostImagemSelecionada" : undefined} onClick={temImagem? () => AtribuirImagem('imagemPost', 'imgFundo') : undefined}/>)
                                :
                                (<img id="imgFundo" style={{display: "none",}} />)
                                } 
                                
                               {
                                temImagem?
                                    (<img onClick={() => AtribuirImagem('imagemPost', 'imgFundo')} src="/imgs/criarPost/iconeLapis.svg" id='criarPostEditarLapis'/>)
                                :
                                undefined
                               } 
                            </figure>
                            {
                                !temImagem?
                                (
                                    <button onClick={() => AtribuirImagem('imagemPost', 'imgFundo')} type="button">
                                        <img src="imgs/criarPost/criarUploadImagem.svg" />
                                        Faça upload de um arquivo aqui
                                    </button>
                                )
                                :
                                undefined
                            } 
                           
                            <input type="file" onChange={AoMudarValorInput} id="imagemPost" name="imagemPost" />
                        </div>
                        <div className="criarPostDireita">
                            <div className="campoCriarPostComum">
                                <label>Descrição...</label>
                                <textarea value={dados.descricaoPost} onChange={AoMudarValorInput} name="descricaoPost"></textarea>
                            </div>
                            <div className="campoCriarPostComum">
                                <label>Adicionar...</label>
                                <figure  >
                                    <img style={{cursor:"pointer",}} onClick={() => { AbrirFecharModal('modalTagsCriarPost'); AbrirFecharModal('modalTagsCriarPostArea', 'flex'); }} src="imgs/criarPost/iconeTags.svg" />
                                    <figcaption style={{cursor:"pointer",}} onClick={() => { AbrirFecharModal('modalTagsCriarPost'); AbrirFecharModal('modalTagsCriarPostArea', 'flex'); }}>Tags</figcaption>
                                    <div id="modalTagsCriarPostArea" className="modalAvisoArea">
                                        <div id="modalTagsCriarPost" className="modalAviso" style={{ opacity: 0, }}>
                                            <div>
                                                <figure>
                                                    <img src="imgs/criarPost/iconeTags.svg" />
                                                </figure>
                                                <button onClick={() => { AbrirFecharModal('modalTagsCriarPost'); AbrirFecharModal('modalTagsCriarPostArea', 'flex'); }}><img src="imgs/criarPost/fecharModalDiretriz.svg" /></button>
                                            </div>
                                            <h3>Adicione Tags</h3>
                                            <p>
                                                tags ajudam pessoas a descobrirem sua arte.
                                            </p>

                                            <div className='ModalSecaoTag'>
                                                <div>
                                                    <img src='imgs/criarPost/iconeLupaCriarPost.svg' />
                                                    <input id='tagsPost' name='tagsPost' placeholder='Procurar Tag' list='tagsPostOpcoes' />
                                                    <datalist id="tagsPostOpcoes">
                                                        {(
                                                            listaTags.map((tag, index) =>
                                                            (
                                                                <option value={tag.nome} key={index}>
                                                                    {tag.nome}
                                                                </option>
                                                            ))
                                                        )}
                                                    </datalist>
                                                    <button onClick={AtualizarTags}>+</button>
                                                </div>
                                                <ul className='listaTags'>
                                                    {
                                                        tagsPost.map((valor, index) => {
                                                            const tagClasse = classesCorTag[index % classesCorTag.length];
                                                            return(
                                                                <li className={tagClasse} value={valor} key={index}>
                                                                    <p>{valor}</p>
                                                                    <button onClick={() => RemoverTag(valor)} className={tagClasse}>x</button>
                                                                </li>
                                                            )

                                                        })
                                                    }
                                                </ul>
                                            </div>
                                            <ul >
                                                <li><button type='button' onClick={() => { AbrirFecharModal('modalTagsCriarPost'); AbrirFecharModal('modalTagsCriarPostArea', 'flex'); }}>Sair</button></li>
                                                <li><button type='button' className='btModalAvisoVermelho' onClick={() => { AbrirFecharModal('modalTagsCriarPost'); AbrirFecharModal('modalTagsCriarPostArea', 'flex'); }}>Confirmar</button></li>
                                            </ul>
                                        </div>
                                    </div>
                                </figure>
                                <hr />
                                <figure>
                                    <img style={{cursor:"pointer",}} onClick={() => { AbrirFecharModal('modalFerramentasCriarPost'); AbrirFecharModal('modalFerramentasCriarPostArea', 'flex'); }} src="imgs/criarPost/iconeSoftwaresUsados.svg" />
                                    <figcaption style={{cursor:"pointer",}} onClick={() => { AbrirFecharModal('modalFerramentasCriarPost'); AbrirFecharModal('modalFerramentasCriarPostArea', 'flex'); }}>Softwares Usados</figcaption>

                                    <div id="modalFerramentasCriarPostArea" className="modalAvisoArea">
                                        <div id="modalFerramentasCriarPost" className="modalAviso" style={{ opacity: 0, }}>
                                            <div>
                                                <figure>
                                                    <img src="imgs/criarPost/iconeSoftwaresUsados.svg" />
                                                </figure>
                                                <button onClick={() => { AbrirFecharModal('modalFerramentasCriarPost'); AbrirFecharModal('modalFerramentasCriarPostArea', 'flex'); }}><img src="imgs/criarPost/fecharModalDiretriz.svg" /></button>
                                            </div>
                                            <h3>Adicione as Ferramentas Utilizadas</h3>
                                            <p>
                                                softwares, hardwares ou materiais usados
                                            </p>

                                            <div className='ModalSecaoTag'>
                                                <div>
                                                    <img src='imgs/criarPost/iconeLupaCriarPost.svg' />
                                                    <input id='ferramentasPost' name='ferramentasPost' placeholder='Procurar Ferramenta' list='ferramentasPostOpcoes' />
                                                    <datalist id="ferramentasPostOpcoes">
                                                        <option value="asdsa" >
                                                                      sads
                                                        </option>
                                                        {(
                                                            listaFerramentas.map((tag, index) =>
                                                            (
                                                                <option value={tag.nome} key={index}>
                                                                    {tag.nome}
                                                                </option>
                                                            ))
                                                        )}
                                                    </datalist>
                                                    <button onClick={AtualizarFerramentas}>+</button>
                                                </div>
                                                <ul className='listaTags'>
                                                    {
                                                        ferramentasPost.map((valor, index) => {
                                                            const tagClasse = classesCorTag[index % classesCorTag.length];
                                                            return(
                                                                <li className={tagClasse} value={valor} key={index}>
                                                                    <p>{valor}</p>
                                                                    <button onClick={() => RemoverFerramenta(valor)} className={tagClasse}>x</button>
                                                                </li>
                                                            )

                                                        })
                                                    }
                                                </ul>
                                            </div>
                                            <ul >
                                                <li><button type='button' onClick={() => { AbrirFecharModal('modalFerramentasCriarPost'); AbrirFecharModal('modalFerramentasCriarPostArea', 'flex'); }}>Sair</button></li>
                                                <li><button type='button' className='btModalAvisoVermelho' onClick={() => { AbrirFecharModal('modalFerramentasCriarPost'); AbrirFecharModal('modalFerramentasCriarPostArea', 'flex'); }}>Confirmar</button></li>
                                            </ul>
                                        </div>
                                    </div>
                                </figure>
                            </div>
                            <div className="campoCriarPostComum">
                                <label>Anexar Imagens</label>
                                <button onClick={() => document.getElementById('processoPost')?.click()} className="botaoComum fundoBtBranco" type="button">
                                    <img src="imgs/criarPost/iconeClipe.svg" />
                                    Anexar Imagem
                                </button>
                                <p className='textoAnexeImagens'>Anexe imagens do processo da sua arte</p>
                                <input  type="file" id="processoPost" name="processoPost" multiple onChange={(evento) => {AtribuiImagensProcesso(evento); AoMudarValorInput(evento);}}/>
                            </div>

                            <div className="criarPostEnviarArea">
                                <input disabled={estaEnviando} type="submit" onClick={() => Criar(false)} value="Postar" />

                                <button disabled={estaEnviando} onClick={() => Criar(true)} type="button">
                                    Salvar rascunho
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="criarPostSensivel">
                        <label htmlFor="postSensivel">  Sua arte possui conteúdo sensível?</label>
                        <input checked={dados.postSensivel} onChange={AoMudarValorInput} type="checkbox" name="postSensivel" id="postSensivel" />
                    </div>

                    {
                        imagens.length > 0 ?
                        (
                        <div className="carrosel" id='carroselCriarPost'>
                            <button className="ante" id="anteBtn"><img src="imgs/feed/setaCarroselUsuarioEsquerda.svg" /></button>
                            <div id="listaImagensCarroselCriarPost" className="imagemCarrosel">
                                {imagens.map((src, index) => (
                                    <img className='carroselSlide' key={index} src={src} />
                                ))}
                            </div>

                            <button className="prox" id="proxBtn"><img src="/imgs/feed/setaCarroselUsuarioDireita.svg" /></button>
                        </div>)
                        :
                        (undefined)
                    }
                </form>
                {
                    qtdPost > 0 ?
                        (null)
                        :
                        (
                            <div id="modalDiretrizPostArea" className="modalAvisoArea">
                                <div id="modalDiretrizPost" className="modalAviso" style={{ opacity: 1, }}>
                                    <div>
                                        <figure>
                                            <img src="imgs/criarPost/iconeDiretrizModal.svg" />
                                        </figure>
                                        <button onClick={() => { AbrirFecharModal('modalDiretrizPost'); AbrirFecharModal('modalDiretrizPostArea', 'flex'); }}><img src="imgs/criarPost/fecharModalDiretriz.svg" /></button>
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
                        )
                }
               

            </div>
            <RodapeSite />
        </div>
    );
}
export default CriarPost;