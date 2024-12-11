import HeaderSite from '../componentes/header';
import RodapeSite from '../componentes/rodape';

const Modelo: React.FC = () => {
    return (
        <div className='organizacaoPadrao'>
            <HeaderSite />
            <div className="areaConteudo ">
                Conteudo aqui
            </div>
            <RodapeSite />
        </div>
    );
}
export default Modelo;