import { Link } from 'react-router-dom';
import '../estilos/menuLinksAtividade.css';
import { LinkMinhaAtividade } from '../interfaces/Enums';

const LinksAtividade: React.FC<{selecionado: number}> = ({selecionado}) => {
    console.log(selecionado);
    return (
        <ul className="menuLinksAtividade">
            <li ></li>
            <li>
                <Link className={selecionado == LinkMinhaAtividade.Conta ? 'menuLinkSelecionado' : ''}  to='#'>Informações da Conta</Link>
            </li>
            <li>
                <Link className={selecionado == LinkMinhaAtividade.Atividade ? 'menuLinkSelecionado' : ''} to='/atividade/'>Minha Atividade</Link>
            </li>
            <li>
                <Link className={selecionado == LinkMinhaAtividade.Privacidade ? 'menuLinkSelecionado' : ''} to='#'>Privacidade</Link>
            </li>
            <li>
                <Link className={selecionado == LinkMinhaAtividade.Utilizacao ? 'menuLinkSelecionado' : ''}  to='#'>Guia de Utilização</Link>
            </li>
            <li  ></li>
        </ul>
    );
}
export default LinksAtividade;