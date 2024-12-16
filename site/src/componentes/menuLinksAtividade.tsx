import { Link } from 'react-router-dom';
import '../estilos/menuLinksAtividade.css';

const LinksAtividade: React.FC = () => {
    return (
        <ul className="menuLinksAtividade">
            <li ></li>
            <li>
                <Link  to='#'>Informações da Conta</Link>
            </li>
            <li>
                <Link to='/atividade/'>Minha Atividade</Link>
            </li>
            <li>
                <Link to='#'>Privacidade</Link>
            </li>
            <li>
                <Link  to='#'>Guia de Utilização</Link>
            </li>
            <li  ></li>
        </ul>
    );
}
export default LinksAtividade;