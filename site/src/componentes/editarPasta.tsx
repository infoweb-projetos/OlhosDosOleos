import { useState } from 'react';
import '../estilos/editarPasta.css';
import axios from 'axios';
import { api } from '../apiUrl';

interface parametros {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    token: string | null;
}

const EditarPasta: React.FC<parametros> = ({setModal, token}) => {

    const [nomePasta, setNomePasta] = useState('');
    const [sucesso, setSucesso] = useState(false);

    const clickExcluirPasta  = () => {
        console.log(token);
        if(token){
            axios.post(`${api}pastas/excluir`, { nome: nomePasta },{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log('Pasta excluida com sucesso!', response);
                setSucesso(true);
            })
            .catch(error => {
                console.log('Erro ao excluir pasta:', error);
            });
        }
       
    }

    return (
        <div className="modalExcluirPastaArea">
            <div>
                <div className="modalExcluirPastaHeader">
                    <h3>Excluir pasta</h3>
                    <button onClick={() =>   setModal(false)}><img src="/imgs/criarPost/criarFecharBt.svg" /></button>
                </div>
                {
                    !sucesso ?
                    (
                        <div className='modalExcluirContent'>
                            <div>
                                <h3>Tem certeza que deseja remover essa pasta?</h3>
                                <p>Essa operação não pode ser desfeita.</p>
                            </div>
                            <div className="buttonsArea">
                                <button type="button" id="cancelarButton" onClick={() =>   setModal(false)}>
                                    <img src="/imgs/pastas/criarFecharBt.svg" />
                                    Cancelar
                                </button>
                                <button type="button" id='removeButton' onClick={clickExcluirPasta}>
                                    <img src="/imgs/pastas/icontrash.svg" />
                                    Remover
                                </button>
                            </div>
                        </div>
                    )
                    :
                    (
                        <figure>
                            <img src='/imgs/cadastro/cadEnviar.png' />
                            <figcaption>Pasta “{nomePasta}” <br/> excluida com sucesso!</figcaption>
                        </figure>
                    )
                }
               
                
            </div>
        </div>
    );
}
export default EditarPasta;