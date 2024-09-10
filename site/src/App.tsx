import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Entrar from './componentes/Entrar';
import Feed from './componentes/Feed'; // Importe sua nova página

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Feed/>}  />
        <Route path="/entrar"  element={<Entrar />} />
      </Routes>
    </Router>
  );
};

export default App;