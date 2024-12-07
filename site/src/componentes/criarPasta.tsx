import { useState } from 'react';
import '../estilos/criarPasta.css';
import axios from 'axios';
import { api } from '../apiUrl';

interface parametros {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    token: string | null;
}

const CriarPasta: React.FC<parametros> = ({setModal, token}) => {

    const [nomePasta, setNomePasta] = useState('');
    const [sucesso, setSucesso] = useState(false);

    const clickCriarPasta  = () => {
        console.log(token);
        if(token){
            axios.post(`${api}pastas/criar`, { nome: nomePasta },{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log('Pasta criada com sucesso!', response);
                setSucesso(true);
            })
            .catch(error => {
                console.log('Erro ao criar pasta:', error);
            });
        }
       
    }

    return (
        <div className="modalCriarPastaArea">
            <div>
                <div className="modalCriarPastaHeader">
                    <h3>Nova Pasta</h3>
                    <button onClick={() =>   setModal(false)}><img src="/imgs/criarPost/criarFecharBt.svg" /></button>
                </div>
                {
                    !sucesso ?
                    (
                        <form>
                            <div>
                                <label htmlFor="formCriarPastatituloPasta">Nome</label>
                                <input value={nomePasta} onChange={(e) => setNomePasta(e.target.value)} name="formCriarPastatituloPasta" id="formCriarPastatituloPasta" type="text" placeholder="Escreva o nome da sua pasta"/>
                            </div>
                            <button type="button" onClick={clickCriarPasta}>
                                <img src="/imgs/header/maisIcone.png" />
                                Criar
                            </button>
                        </form>
                    )
                    :
                    (
                        <figure>
                            <img src='/imgs/cadastro/cadEnviar.png' />
                            <figcaption>Pasta “{nomePasta}” <br/> criada com sucesso!</figcaption>
                        </figure>
                    )
                }
               
                
            </div>
        </div>
    );
}
export default CriarPasta;