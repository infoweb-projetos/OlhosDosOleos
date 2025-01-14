import { useState } from 'react';
import '../estilos/editarPasta.css';
import axios from 'axios';
import { api } from '../apiUrl';
import { PastaPosts } from '../interfaces/Pasta';

interface parametros {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    pastaid: string | null;
    nomePasta: string | null;
    descricao: string | null;
    posts: Array<PastaPosts>;
    imagemUrl: string | null;
    setPosts: React.Dispatch<React.SetStateAction<Array<PastaPosts>>>;
}

const EditarPasta: React.FC<parametros> = ({setModal, pastaid, nomePasta, posts, imagemUrl, setPosts}) => {

    console.log("pasta id: ", pastaid);
    const [sucesso, setSucesso] = useState(false);
    

    const clickEditarPasta  = (pastaid: string) => {
        console.log("pasta id: ", pastaid);
            const token = localStorage.getItem('tokenODO');
            try {
                axios.delete(`${api}pastas/Editar/${pastaid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("pasta excluida")
                setSucesso(true)
                location.reload();

            } catch (error) {
                console.error('Houve um erro ao tentar Editar a pasta:', error)
            }
    }
    
    const [modalConfirmar, setModalConfirmar] = useState<boolean>(false);
    const [postid, setPostid] = useState<number>(0);
    const [pastaAtualId, setPastaAtualId] = useState<string | null>(null);
    const AbrirFecharModal = (postid: number=0, pastaAtualId: string='') => {
        if (postid > 0 && pastaAtualId && !modalConfirmar) {
            setPostid(postid);
            setPastaAtualId(pastaAtualId);
            setModalConfirmar(true);
        } else {
            setModalConfirmar(false);
            setPostid(0);
            setPastaAtualId(null);
        }
    }

    const excluirPostDaPasta = async () => {
        if (modalConfirmar) {
            const token = localStorage.getItem('tokenODO');
            try {
                await axios.delete(`${api}pastas/excluir/${pastaAtualId}/${postid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then(response => {
                    let postsExibidos = [...posts.filter(p => !(p.postid == postid))]
                    setPosts(postsExibidos);
                    AbrirFecharModal();
                });
              

            } catch (error) {
                console.error('Houve um erro ao tentar excluir o post:', error)
            }
        }
    }


    return (
        <div className="modalEditarPastaArea">
            {modalConfirmar && (
                <div className='ModalConfirmarExclusao'>
                    <div className=''>
                        <div className='ModalConfirmarExclusaoHeader'>
                            <figure>
                                <img src='/imgs/verPerfil/iconeExcluirPost.svg' />
                            </figure>
                            <button onClick={() => AbrirFecharModal()}>✕</button>
                        </div>
                        <h3>Excluir da pasta</h3>
                        <p>Tem certeza que deseja remover da pasta?</p>
                        <div className='ModalConfirmarExclusaoAcoes'>
                            <button onClick={excluirPostDaPasta} className='ModalConfirmarExclusaoBtExcluir'>Excluir</button>
                            <button onClick={() => AbrirFecharModal()} className='ModalConfirmarExclusaoBtCancelar'>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
            <div className='modalProblema'>
                <div className="modalEditarPastaHeader">
                    <h3>Editar pasta</h3>
                    <button onClick={() =>   setModal(false)}><img src="/imgs/criarPost/criarFecharBt.svg" /></button>
                </div>
                {
                    !sucesso ?
                    (
                        <div className='modalEditarContent'>
                            <div className='pastaPosts'>
                                <h3>{nomePasta}</h3>
                                {
                                posts.length < 1 ?
                                    (
                                        null
                                    )
                                    :
                                    (
                                        posts.map((pastaPost, index) =>
                                        (


                                            <div key={index} className='item-pasta'>
                                                <picture>
                                                    <img src={pastaPost.post?.imagemUrl} alt="arte da pasta" />
                                                </picture>
                                                <div className='hover-item'>
                                                    <img className="vermais-post" onClick={() => AbrirFecharModal(pastaPost.post?.id, pastaid ?? '')} src="../public/imgs/pastas/icontrash.svg" alt="ver mais" />
                                                    <div className='info-post'>
                                                        <h3>{pastaPost.post?.titulo}</h3>
                                                        <img src={pastaPost.post?.usuario?.imagemUrl} alt="" />
                                                        <p>{pastaPost.post?.usuario?.nome}</p>
                                                    </div>
                                                </div>
                                            </div>

                                        ))
                                    )
                                }
                            </div>
                            <form>
                                <figure>
                                    <img src={imagemUrl ?? ""} ></img>
                                </figure>
                                <label className='dmSans' htmlFor="titulo">Título</label>
                                <input className='dmSans' type="text" name='titulo' id='tituloPasta' placeholder={nomePasta ?? 'nome da pasta'}/>
                                <label className='dmSans' htmlFor="descricao">Descrição</label>
                                <textarea className='dmSans' name='descricao' id='descricaoPasta'/>
                            </form>
                        </div>
                    )
                    :
                    (
                        <figure>
                            <img src='/imgs/cadastro/cadEnviar.png' />
                            <figcaption>Pasta “{nomePasta}” <br/> editada com sucesso!</figcaption>
                        </figure>
                    )
                }
               <div className="buttonArea">
                                <button type="button" id='removeButton' onClick={() => clickEditarPasta(pastaid ?? '')}>
                                    Pronto
                                </button>
                </div>
                
            </div>
        </div>
    );
}
export default EditarPasta;