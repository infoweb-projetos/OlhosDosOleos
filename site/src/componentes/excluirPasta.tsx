import { useState } from 'react';
import '../estilos/excluirPasta.css';
import axios from 'axios';
import { api } from '../apiUrl';

interface parametros {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    pastaid: string | null;
    nomePasta: string | null;
}

const ExcluirPasta: React.FC<parametros> = ({setModal, pastaid, nomePasta}) => {

    console.log("pasta id: ", pastaid);
    const [sucesso, setSucesso] = useState(false);

    const clickExcluirPasta  = (pastaid: string) => {
        console.log("pasta id: ", pastaid);
            const token = localStorage.getItem('tokenODO');
            try {
                axios.delete(`${api}pastas/excluir/${pastaid}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("pasta excluida")
                setSucesso(true)
                location.reload();

            } catch (error) {
                console.error('Houve um erro ao tentar excluir a pasta:', error)
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
                                <button type="button" id='removeButton' onClick={() => clickExcluirPasta(pastaid ?? '')}>
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
export default ExcluirPasta;