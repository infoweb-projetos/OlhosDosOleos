import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Entrar from './paginas/Entrar';
import Feed from './paginas/Feed'; 
import MeuPerfil from './paginas/MeuPerfil';
import Perfil from './paginas/Perfil';
import CriarPost from './paginas/CriarPost';
import Cadastro from './paginas/Cadastro';
import EditarPerfil from './paginas/EditarPefil';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Feed/>}  />
        <Route path="/entrar"  element={<Entrar />} />
        <Route path="/cadastro"  element={<Cadastro />} />
        <Route path="/meuperfil"  element={<MeuPerfil />} />
        <Route path="/editar"  element={<EditarPerfil />} />
        <Route path="/editar/perfil"  element={<EditarPerfil />} />
        <Route path="/perfil/:perfilid"  element={<Perfil />} />
        <Route path="/postar"  element={<CriarPost />} />
      </Routes>
    </Router>
  );
};

export default App;