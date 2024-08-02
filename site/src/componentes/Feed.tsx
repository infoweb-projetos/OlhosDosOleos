import { Link } from 'react-router-dom'

const Feed: React.FC = () => {
    return (
        <>
            <header>
                <div className="headerEsquerda">
                    <Link to="/feed">
                        <img src="/imgs/logoHeader.png" />
                    </Link>
                    <form >
                        <input type="image" src="/imgs/lupaPesquisaHeader.png" />
                        <input type="search" />
                    </form>
                </div>
                <div className="headerDireita">
                    <button>
                        <img src="/imgs/menuSanduicheHeader.png" />
                    </button>
                   
                    <Link to="/">
                        <img src="/imgs/perfilHeader.png" />
                    </Link>
                    <Link to="/">
                        Entrar
                    </Link>
                </div>
            </header>
        </>

    );
}
export default Feed;