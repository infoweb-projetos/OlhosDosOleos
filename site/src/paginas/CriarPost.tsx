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

const CriarPost: React.FC = () => {
    const navegar = useNavigate();
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [dados, setDados] = useState<CriarPostDados>({
        usuarioid: 0,
        imagemPost: undefined,
        tituloPost: '',
        descricaoPost: undefined,
        postSensivel: false,
        rascunho: false,
    });
    const [qtdPost, setQtdPost] = useState<number>(1);

    useEffect(() => {
        const token = localStorage.getItem('tokenODO');
        if (!token) {
            navegar('/');
        }
        else {
            VerificarPost(token);
            axios.get('http://localhost:3000/usuarios/perfil', {
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
                    localStorage.removeItem('tokenODO');
                    navegar('/');
                });
        }
    }, [navegar]);

    const VerificarPost = async (token : string) => {
        axios.get('http://localhost:3000/posts/meus', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            const postsBD = response.data.dados;
            setQtdPost(postsBD.length)
        })
    }

    const AoMudarValorInput = (elemento: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, checked, files } = elemento.target;
        if (type == 'checkbox') {
            setDados({
                ...dados,
                [name]: checked,
            });
        }
        else if (type == 'file') {
            setDados({
                ...dados,
                [name]: files ? files : undefined,
            });
        }
        else {
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
        console.log( dados.rascunho);
        console.log(ehRascunho);

        const data = new FormData();
        if (!dados.tituloPost) return console.log("Coloque um titulo");
        data.append('titulo', dados.tituloPost);
        data.append('descricao', dados.descricaoPost ?? '');
        data.append('rascunho', (dados.rascunho ?? false).toString());
        data.append('sensivel', (dados.postSensivel ?? false).toString());
        data.append('usuarioid', dados.usuarioid.toString());
        data.append('categoriaid', 'Arte Digital');
        if (dados.imagemPost) {
            data.append('imagem', dados.imagemPost[0]);
        }
        else return console.log("Anexe imagem.");
        // dados.processo.forEach((file, index) => {
        //     data.append(`processo`, file);
        // });

        try {
            const response = await axios.post('http://localhost:3000/posts/criar', data, {
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
                                <button className="botaoComum fundoBtBranco" type="button">
                                    <img src="imgs/criarPost/iconeClipe.svg" />
                                    Anexar Imagem
                                </button>
                                <p>Anexe imagens do processo da sua arte</p>
                                <input type="file" name="imagensPost" />
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
                        <input  checked={dados.postSensivel} onChange={AoMudarValorInput} type="checkbox" name="postSensivel" id="postSensivel" />
                    </div>
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