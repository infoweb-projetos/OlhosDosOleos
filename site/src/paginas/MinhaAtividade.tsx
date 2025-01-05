import { useEffect, useState } from 'react';
import HeaderSite from '../componentes/header';
import RodapeSite from '../componentes/rodape';
import '../estilos/minhaAtividade.css';
import LinksAtividade from '../componentes/menuLinksAtividade';
import axios from 'axios';
import { Atividade } from '../interfaces/Atividade';
import { api } from '../apiUrl';
import { CurtirPost, VerificaToken } from '../scripts/uteis';
import { useNavigate } from 'react-router-dom';
import { tempoRelativo } from '../scripts/funcoesUteis';

const MinhaAtividade: React.FC = () => {
    const [selecionarCurtidas, setSelecionarCurtida] = useState<boolean>(false);
    const [selecionarComentarios, setSelecionarComentarios] = useState<boolean>(false);
    const [tabSelecionada, setTabSelecionada] = useState<boolean>(true);

    const navegar = useNavigate();
    const [tokenAtual, atualizarTokenAtual] = useState<string | null>("");
    const [atividades, setAtividades] = useState<Atividade[]>([]);
    
    const CarregarAtividades = async () =>{
        axios.get(api + 'atividades/listar', { headers: {'Authorization': `Bearer ${tokenAtual}` }})
        .then(response => {

            const lista: Array<Atividade> = response.data.dados.map((a: Atividade) => {
                const obj: Atividade = {
                    id: a.id,
                    usuarioid: a.usuarioid, 
                    postid: a.postid, 
                    comentarioid: a.comentarioid, 
                    usuario: a.usuario,
                    post: a.post,
                    selecionado: false,
                    comentario: a.comentario,
                };

                if (obj.post) {
                    const postimagem = obj.post;
                    if (postimagem.imagem && postimagem.imagemtipo) {
                        const blob = new Blob([new Uint8Array(postimagem.imagem.data)], { type: postimagem.imagemtipo });
                        const urlImagem = URL.createObjectURL(blob);
                        obj.post.imagemUrl = urlImagem;
                    }
                }

                if (obj.post && obj.post.usuario) {
                    const postimagem = obj.post.usuario;
                    if (postimagem.imagem && postimagem.imagemtipo) {
                        const blob = new Blob([new Uint8Array(postimagem.imagem.data)], { type: postimagem.imagemtipo });
                        const urlImagem = URL.createObjectURL(blob);
                        obj.post.usuario.imagemUrl = urlImagem;
                    }
                    else{
                        obj.post.usuario.imagemUrl = '/imgs/verPerfil/perfil.png'
                    }
                }

                if (obj.usuario) {
                    const imagem = obj.usuario;
                    if (imagem.imagem && imagem.imagemtipo) {
                        const blob = new Blob([new Uint8Array(imagem.imagem.data)], { type: imagem.imagemtipo });
                        const urlImagem = URL.createObjectURL(blob);
                        obj.usuario.imagemUrl = urlImagem;
                    }
                    else{
                        obj.usuario.imagemUrl = '/imgs/verPerfil/perfil.png'
                    }
                }

                return obj;
            });
            setAtividades(lista);
        })
    }

    useEffect(() => {
        CarregarAtividades();
    }, [tokenAtual]);

    const VerificarToken = async () => {
        const token = await VerificaToken();
        if (token) atualizarTokenAtual(token); 
        else { navegar('/entrar'); localStorage.removeItem('tokenODO');}
    }
    useEffect(() => {
        VerificarToken();
    }, []);
  
    const selecionar = (id: number) =>{
        if (selecionarCurtidas || selecionarComentarios){
            const novaLista = [...atividades];
            let index = novaLista.findIndex(a => a.id == id);
            if(index != -1){
                novaLista[index] = {
                    ...novaLista[index], 
                    selecionado: !novaLista[index].selecionado, 
                };
                setAtividades(novaLista);
            }
        }
    }

    const apagarCurtidas = () => {
        const curtidasSelecionadas = atividades.filter(a => !a.comentarioid && a.selecionado);
        for (let atividade of curtidasSelecionadas){
            CurtirPost(atividade.postid? atividade.postid : 0, tokenAtual, null, []);
        }
        const atividadesRestantes = atividades.filter(a => !a.comentarioid && !curtidasSelecionadas.includes(a));
        setAtividades(atividadesRestantes);

    }

    const apagarComentarios = async () => {
        const comentariosSelecionados = atividades.filter(a => a.comentarioid && a.selecionado);
        for (let atividade of comentariosSelecionados){
            axios.delete(api + `comentarios/apagar/${atividade.comentarioid}`, { headers: {'Authorization': `Bearer ${tokenAtual}` }})
            .then(resposta =>{
                console.log(resposta);
            })
            .catch(erro =>{
                console.log(erro);
            })
        }
        const atividadesRestantes = atividades.filter(a => a.comentarioid && !comentariosSelecionados.includes(a));
        setAtividades(atividadesRestantes);
    }

    return (
        <div className='organizacaoPadrao'>
            <HeaderSite />
            <div className="areaConteudo pagMinhaAtividade">
                <LinksAtividade />
                <div>
                    <div className='introducaoMinhaAtividade'>
                        <h3>Sua Atividade</h3>
                        <ul>
                            <li>
                                <figure>
                                    <img src='/imgs/minhaAtividade/iconeInteracoes.svg' />
                                </figure>
                                <div>
                                    <h4>Interações</h4>
                                    <span>Analise e exclua curtidas, comentarios e outras interações</span>
                                </div>
                            </li>
                            <li>
                                <figure>
                                    <img src='/imgs/minhaAtividade/iconeHistorico.svg' />
                                </figure>
                                <div>
                                    <h4>Historico da Conta</h4>
                                    <span>Verifique as atividades que você fez desde que criou sua conta</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className='conteudoMinhaAtividade'>
                        <ul className='tabsAtividade'>
                            <li className='ocupaEspacoAtividade ocupaEspacoAtividadeEsquerdo'></li>
                            <li onClick={() => {setTabSelecionada(true); setSelecionarComentarios(false)}} className='tipoAtividade '><button className={tabSelecionada ? 'tabSelecionadaAtividade' : ''}>Curtidas</button></li>
                            <li onClick={() => {setTabSelecionada(false); setSelecionarCurtida(false)}} className='tipoAtividade'><button className={!tabSelecionada ? 'tabSelecionadaAtividade' : ''}>Comentarios</button></li>
                            <li className='ocupaEspacoAtividade'></li>
                        </ul>
                        {
                            tabSelecionada ?
                                (
                                    <div className='postsCurtidosAtividade'>
                                        <div>
                                            <div>
                                                <h5>Sua Atividade</h5>
                                                <button className='classificarFiltrar'>Classificar e Filtrar</button>
                                            </div>
                                            <button onClick={() => setSelecionarCurtida(!selecionarCurtidas)}>Selecionar</button>
                                        </div>
                                        <ul >
                                            {
                                                atividades.filter(a => !a.comentarioid).map((atividade, index) =>
                                                (
                                                    <li  key={index}>
                                                        <figure onClick={() => selecionar(atividade.id ? atividade.id : 0)}>
                                                            <img src={atividade.post?.imagemUrl} />
                                                            {
                                                                 selecionarCurtidas && !atividade.selecionado &&
                                                                (
                                                                    <canvas></canvas>
                                                                )
                                                            }
                                                            {
                                                                 selecionarCurtidas && atividade.selecionado &&
                                                                (
                                                                    <img className='selecionadoInteracaoAtividade' src='/imgs/minhaAtividade/iconeSelecionado.svg' />
                                                                )
                                                            }
                                                        </figure>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                        {
                                            selecionarCurtidas &&
                                            (
                                                <div className='minhaAtividadeExclusaoArea'>
                                                <div>
                                                    <div>
                                                        <button  onClick={() => setSelecionarCurtida(!selecionarCurtidas)}>
                                                            <img src='/imgs/minhaAtividade/cancelarExcluir.svg'/>
                                                        </button>
                                                        <span>
                                                            {atividades.filter(a => !a.comentarioid && a.selecionado).length} 
                                                            {atividades.filter(a => !a.comentarioid && a.selecionado).length == 1 ? " item selecionado" : " itens selecionados"} 
                                                        </span>
                                                    </div>
                                                    <button onClick={() => apagarCurtidas()}>Excluir</button>
                                                </div>
                                                <p>Uma curtida excluída não será mais contabilizada na postagem nem em sua atividade.</p>
                                            </div>
                                            )
                                        }
                                       
                                    </div>
                                )
                                :
                                (
                                    <div className='postsComentariosAtividade'>
                                        <div>
                                            <h5>Sua Atividade</h5>
                                            <button onClick={() => setSelecionarComentarios(!selecionarComentarios)}>Selecionar</button>
                                        </div>
                                        <ul >
                                            {
                                                atividades.filter(a => a.comentarioid).map((atividade, index) =>
                                                (
                                                    <li onClick={() => selecionar(atividade.id ? atividade.id : 0)} key={index} className={selecionarComentarios ? 'atividadeComentarioSelecionado' : ''}>
                                                        <div className='atividadeComentarioAreaCriadorPost'>
                                                            <div >
                                                                <figure className='atividadeComentarioUsuario'>
                                                                    <img src={atividade.post?.usuario?.imagemUrl} />
                                                                </figure>
                                                                <div>
                                                                    <div>
                                                                        <h6>{atividade.post?.usuario?.nome}</h6>
                                                                        <span>{atividade.post?.titulo}</span>
                                                                    </div>
                                                                    <p>{atividade.post?.descricao}</p>
                                                                    <span>
                                                                    {   
                                                                        atividade.post?.entrada ?
                                                                        tempoRelativo(new Date(atividade.post?.entrada))
                                                                        : '' 
                                                                    }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <figure className='atividadeComentarioPost'>
                                                                <img src={atividade.post?.imagemUrl} />
                                                            </figure>
                                                        </div>
                                                        <div className='atividadeComentarioAreaComentario'>
                                                            <div>
                                                                <figure className='atividadeComentarioUsuario'>
                                                                    <img  src={atividade.usuario?.imagemUrl} />
                                                                </figure>
                                                                <div>
                                                                    <div>
                                                                        <h6>{atividade.usuario?.nome}</h6>
                                                                        <span>{atividade.comentario?.texto}</span>
                                                                    </div>
                                                                    <span>
                                                                        { 
                                                                            atividade.comentario?.criacao ?
                                                                            tempoRelativo(new Date(atividade.comentario?.criacao)) 
                                                                            : ''
                                                                        }
                                                                    </span>
        
                                                                </div>
                                                                
                                                            </div>
                                                            {
                                                                selecionarComentarios && !atividade.selecionado &&
                                                                (<canvas></canvas>)
                                                            }
                                                            {
                                                                selecionarComentarios  && atividade.selecionado &&
                                                                (<img className='selecionadoInteracaoAtividade' src='/imgs/minhaAtividade/iconeSelecionado.svg' />)
                                                            }
                                                        </div>
                                                    </li>
                                                ))
                                            }
                                            
                                        </ul>
                                        {
                                            selecionarComentarios &&
                                            (
                                                <div className='minhaAtividadeExclusaoArea'>
                                                <div>
                                                    <div>
                                                        <button  onClick={() => setSelecionarComentarios(false)}>
                                                            <img src='/imgs/minhaAtividade/cancelarExcluir.svg'/>
                                                        </button>
                                                        <span>
                                                        {atividades.filter(a => a.comentarioid && a.selecionado).length} 
                                                        {atividades.filter(a => a.comentarioid && a.selecionado).length == 1 ? " item selecionado" : " itens selecionados"} 
                                                        </span>
                                                    </div>
                                                    <button onClick={() => apagarComentarios()}>Excluir</button>
                                                </div>
                                                <p>Um comentario excluído não será mais contabilizado na postagem nem em sua atividade.</p>
                                            </div>
                                            )
                                        }
                                    </div>
                                )
                        }

                    </div>
                </div>
            </div>
            <RodapeSite />
        </div>
    );
}
export default MinhaAtividade;