import { Link } from 'react-router-dom';
import '../estilos/footer.css';

const RodapeSite: React.FC = () => {
    return (
        <div className="rodape">
            <div>
                <ul>
                    <li><Link to="#">Sobre Nós</Link></li>
                    <li><Link to="#">Equipe</Link></li>
                    <li><Link to="#">Ajuda</Link></li>
                </ul>
                <ul className="listaPlataformas">
                    <li><Link to="#"><img src="/imgs/footer/iconeGithub.svg"  alt="logomarca do github"/></Link></li>
                    <li><Link to="#"><img src="/imgs/footer/iconeFigma.svg"  alt="logomarca do figma"/></Link></li>
                </ul>
            </div>
            <figure>
                <img src="/imgs/entrar/logoOdoVermelha.png" alt="logomarca olhos dos oleos com abreviatura e signo"/>
            </figure>
            <ul>
                <li><Link to="#">Política de Privacidade</Link></li>
                <li><Link to="#">Termos de uso</Link></li>
                <li><Link to="#">Mapa do Site</Link></li>
                <li><Link to="#">Dúvidas Frequentes</Link></li>
            </ul>
        </div>
    );
}
export default RodapeSite;