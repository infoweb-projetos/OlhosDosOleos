import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Entrar from './paginas/Entrar';
import Feed from './paginas/Feed'; // Importe sua nova página
import MeuPerfil from './paginas/MeuPerfil';
import CriarPost from './paginas/CriarPost';
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Feed/>}  />
        <Route path="/entrar"  element={<Entrar />} />
        <Route path="/meuperfil"  element={<MeuPerfil />} />
        <Route path="/postar"  element={<CriarPost />} />
      </Routes>
    </Router>
  );
};

export default App;