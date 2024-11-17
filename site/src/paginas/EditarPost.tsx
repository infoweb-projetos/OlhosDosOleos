import HeaderSite from '../componentes/header';
import RodapeSite from '../componentes/rodape';
import '../estilos/criarPost.css';
import { AbrirFecharModal } from '../scripts/modal';
import { AtribuirImagem } from '../scripts/atribuirImagem';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Usuario } from '../interfaces/Usuario';
import { CriarPostDados, Post } from '../interfaces/Post';
import { VerificaToken } from '../scripts/uteis';
import {api} from '../apiUrl.ts';
import { Categoria, Tag } from '../interfaces/Enums.ts';
import { CarroselComum } from '../scripts/carrossel.ts';

const EditarPost: React.FC = () => {
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
    const [post, setPost] = useState<Post | undefined>(undefined);
    const [qtdPost, setQtdPost] = useState<number>(1);
    const [listaCategorias, setListaCategorias] = useState<Array<Categoria>>([]);
    const [carroselAtivo, ativacaoCarrossel] = useState<boolean>(false);
    const [tagsPost, setTagsPost] = useState<Array<string>>([]);
    const [ferramentasPost, setFerramentasPost] = useState<Array<string>>([]);
    const classesCorTag = ['tagVermelho','tagAzul','tagVerdeAgua','tagVerde','tagAmarelo'];
    const [estaEnviando, setEstaEnviando] = useState<boolean>(false);
    const [listaTags, setListaTags] = useState<Array<Tag>>([]);
    const [listaFerramentas, setListaFerramentas] = useState<Array<Tag>>([]);
    const [temImagem, setTemImagem] = useState<boolean>(false);
    const { id } = useParams();

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
            if (carroselAtivo) ativacaoCarrossel(false);
        }
    };
    

    const ListarCategorias = useCallback(async () => {
        await axios.get(api + 'categorias/listar', {})
            .then(response => {
                const listaBD = response.data.dados;
                setListaCategorias(listaBD);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const ListarTags = useCallback(async () => {
        await axios.get(api + 'tags/tags', {})
            .then(response => {
                const listaBD = response.data.dados;
                setListaTags(listaBD);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const ListarFerramentas = useCallback(async () => {
        await axios.get(api + 'tags/ferramentas', {})
            .then(response => {
                const listaBD = response.data.dados;
                setListaFerramentas(listaBD);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const VerificarPost = useCallback(async (token: string) => {
        axios.get(api + 'posts/meus', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                const postsBD = response.data.dados;
                setQtdPost(postsBD.length)
            })
    }, []);

    const Perfil = useCallback(async (token: string) => {
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
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('tokenODO');
        if (!token) {
            navegar('/');
        }
        else {
            if (!usuario) Perfil(token);
            VerificarPost(token);
        }
        ListarCategorias();
        ListarTags();
        ListarFerramentas();
        if (id && Number(id) > 0) CarregarPost(Number(id), token);
        else navegar('/meuperfil');
        if(!carroselAtivo){
            CarroselComum('anteBtn', 'proxBtn', 'carroselSlide', 'carroselCriarPost', 'listaImagensCarroselCriarPost');
            ativacaoCarrossel(true);
        }
      
    }, [navegar, listaCategorias, carroselAtivo, listaTags, listaFerramentas, post, usuario, qtdPost]);

    const CarregarPost = useCallback(async (idpost:number, token: string | null) => {
        if (token){
            await axios.get(api + `posts/post/${idpost}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
            })
            .then(response => {
                const postBD = response.data.dados;
                console.log("post bd: ", postBD);
                setPost(postBD);
                dados.tituloPost    = postBD.titulo;
                dados.categoriaPost = postBD.categoriaid ? postBD.categoriaid : '';
                dados.rascunho      = postBD.rascunho ? true : false;
                dados.postSensivel  = postBD.sensivel ? true : false;
                dados.descricaoPost = postBD.descricao?? undefined;
                const tags = (postBD.tags as Array<{tag : Tag}>).map(item => item.tag) as Array<Tag>;
                console.log("tags: ", tags)
                setTagsPost(tags.filter(t => t.ferramenta === false).map(tag => tag.nome)); 
                setFerramentasPost(tags.filter(t => t.ferramenta === true).map(tag => tag.nome)); 
               
            })
            .catch(error => {
                console.log(error);
            });
        }
    }, []);


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
            if (files && files?.length > 0) setTemImagem(true);
            else setTemImagem(false);
        } else {
            setDados({
                ...dados,
                [name]: value,
            });
        }
    }

    const Atualizar = async (ehRascunho: boolean) => {
        const token = await VerificaToken();
        if (!token) navegar('/');
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
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('Resposta da API:', response.data);
            navegar(0);
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
            <div className="areaConteudo  criarPost">
                <form onSubmit={AoEnviar}>
                    <div className="criarTituloPost">
                        <div>
                            <label>O título aparecerá aqui!</label>
                            <button onClick={VoltarPagAnterior} type="button"><img src="/imgs/criarPost/criarFecharBt.svg" alt="icone de x para voltar para pagina anterior" /></button>
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
                                        <img src="/imgs/criarPost/criarUploadImagem.svg" />
                                        Faça upload de um arquivo ou o arraste até aqui
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
                                    <img style={{cursor:"pointer",}} onClick={() => { AbrirFecharModal('modalTagsCriarPost'); AbrirFecharModal('modalTagsCriarPostArea', 'flex'); }} src="/imgs/criarPost/iconeTags.svg" />
                                    <figcaption style={{cursor:"pointer",}} onClick={() => { AbrirFecharModal('modalTagsCriarPost'); AbrirFecharModal('modalTagsCriarPostArea', 'flex'); }}>Tags</figcaption>
                                    <div id="modalTagsCriarPostArea" className="modalAvisoArea">
                                        <div id="modalTagsCriarPost" className="modalAviso" style={{ opacity: 0, }}>
                                            <div>
                                                <figure>
                                                    <img src="/imgs/criarPost/iconeTags.svg" />
                                                </figure>
                                                <button onClick={() => { AbrirFecharModal('modalTagsCriarPost'); AbrirFecharModal('modalTagsCriarPostArea', 'flex'); }}><img src="/imgs/criarPost/fecharModalDiretriz.svg" /></button>
                                            </div>
                                            <h3>Adicione Tags</h3>
                                            <p>
                                                tags ajudam pessoas a descobrirem sua arte.
                                            </p>

                                            <div className='ModalSecaoTag'>
                                                <div>
                                                    <img src='/imgs/criarPost/iconeLupaCriarPost.svg' />
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
                                    <img style={{cursor:"pointer",}} onClick={() => { AbrirFecharModal('modalFerramentasCriarPost'); AbrirFecharModal('modalFerramentasCriarPostArea', 'flex'); }} src="/imgs/criarPost/iconeSoftwaresUsados.svg" />
                                    <figcaption style={{cursor:"pointer",}} onClick={() => { AbrirFecharModal('modalFerramentasCriarPost'); AbrirFecharModal('modalFerramentasCriarPostArea', 'flex'); }}>Softwares Usados</figcaption>

                                    <div id="modalFerramentasCriarPostArea" className="modalAvisoArea">
                                        <div id="modalFerramentasCriarPost" className="modalAviso" style={{ opacity: 0, }}>
                                            <div>
                                                <figure>
                                                    <img src="/imgs/criarPost/iconeSoftwaresUsados.svg" />
                                                </figure>
                                                <button onClick={() => { AbrirFecharModal('modalFerramentasCriarPost'); AbrirFecharModal('modalFerramentasCriarPostArea', 'flex'); }}><img src="/imgs/criarPost/fecharModalDiretriz.svg" /></button>
                                            </div>
                                            <h3>Adicione as Ferramentas Utilizadas</h3>
                                            <p>
                                                softwares, hardwares ou materiais usados
                                            </p>

                                            <div className='ModalSecaoTag'>
                                                <div>
                                                    <img src='/imgs/criarPost/iconeLupaCriarPost.svg' />
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
                                    <img src="/imgs/criarPost/iconeClipe.svg" />
                                    Anexar Imagem
                                </button>
                                <p>Anexe imagens do processo da sua arte</p>
                                <input  type="file" id="processoPost" name="processoPost" multiple onChange={(evento) => {AtribuiImagensProcesso(evento); AoMudarValorInput(evento);}}/>
                            </div>

                            <div className="criarPostEnviarArea">
                                <input disabled={estaEnviando} type="submit" onClick={() => Atualizar(false)} value="Postar" />

                                <button disabled={estaEnviando} onClick={() => Atualizar(true)} type="button">
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
                            <button className="ante" id="anteBtn"><img src="/imgs/feed/setaCarroselUsuarioEsquerda.svg" /></button>
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
                                            <img src="/imgs/criarPost/iconeDiretrizModal.svg" />
                                        </figure>
                                        <button onClick={() => { AbrirFecharModal('modalDiretrizPost'); AbrirFecharModal('modalDiretrizPostArea', 'flex'); }}><img src="/imgs/criarPost/fecharModalDiretriz.svg" /></button>
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
export default EditarPost;