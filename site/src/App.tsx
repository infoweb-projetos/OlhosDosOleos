import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Entrar from './paginas/Entrar';
import Feed from './paginas/Feed'; // Importe sua nova página
import Perfil from './paginas/MeuPerfil';
import CriarPost from './paginas/CriarPost';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Feed/>}  />
        <Route path="/entrar"  element={<Entrar />} />
        <Route path="/meuperfil"  element={<Perfil />} />
        <Route path="/perfil/:perfilid"  element={<Perfil />} />
        <Route path="/postar"  element={<CriarPost />} />
      </Routes>
    </Router>
  );
};

export default App;