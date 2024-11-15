import HeaderSite from '../componentes/header';
import RodapeSite from '../componentes/rodape';
import '../estilos/criarPost.css';
import { AbrirFecharModal } from '../scripts/modal';
import { AtribuirImagem } from '../scripts/atribuirImagem';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Usuario } from '../interfaces/Usuario';
import { CriarPostDados } from '../interfaces/Post';
import { VerificaToken } from '../scripts/uteis';
import {api} from '../apiUrl.ts';
import { Categoria } from '../interfaces/Enums.ts';
import { CarroselComum } from '../scripts/carrossel.ts';

const CriarPost: React.FC = () => {
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
    const [carroselAtivo, ativacaoCarrossel] = useState<boolean>(false);

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

    useEffect(() => {
        const token = localStorage.getItem('tokenODO');
        if (!token) {
            navegar('/');
        }
        else {
            VerificarPost(token);
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
        ListarCategorias();
        if(!carroselAtivo){
            CarroselComum('anteBtn', 'proxBtn', 'carroselSlide', 'carroselCriarPost', 'listaImagensCarroselCriarPost');
            ativacaoCarrossel(true);
        }
      
    }, [navegar, listaCategorias, carroselAtivo]);

    const VerificarPost = async (token: string) => {
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
        } else {
            setDados({
                ...dados,
                [name]: value,
            });
        }
    }

    const Criar = async (ehRascunho: boolean) => {
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
        if (dados.imagemPost) {
            data.append('imagem', dados.imagemPost[0]);
        }
        else return console.log("Anexe imagem.");
        if (dados.processoPost) {
            console.log(dados.processoPost);
            for (let img of dados.processoPost){ data.append('processo', img);}
        }

        try {
            const response = await axios.post(api + 'posts/criar', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('Resposta da API:', response.data);
            navegar(0);
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
                            <img id="imgFundo" />
                            <button onClick={() => AtribuirImagem('imagemPost', 'imgFundo')} type="button">
                                <img src="imgs/criarPost/criarUploadImagem.svg" />
                                Faça upload de um arquivo ou o arraste até aqui
                            </button>
                            <input type="file" onChange={AoMudarValorInput} id="imagemPost" name="imagemPost" />
                        </div>
                        <div className="criarPostDireita">
                            <div className="campoCriarPostComum">
                                <label>Descrição...</label>
                                <textarea value={dados.descricaoPost} onChange={AoMudarValorInput} name="descricaoPost"></textarea>
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
                                <button onClick={() => document.getElementById('processoPost')?.click()} className="botaoComum fundoBtBranco" type="button">
                                    <img src="imgs/criarPost/iconeClipe.svg" />
                                    Anexar Imagem
                                </button>
                                <p>Anexe imagens do processo da sua arte</p>
                                <input  type="file" id="processoPost" name="processoPost" multiple onChange={(evento) => {AtribuiImagensProcesso(evento); AoMudarValorInput(evento);}}/>
                            </div>

                            <div className="criarPostEnviarArea">
                                <input type="submit" onClick={() => Criar(false)} value="Postar" />

                                <button onClick={() => Criar(true)} type="button">
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