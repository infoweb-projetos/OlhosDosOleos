import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormularioEntrada from './componentes/FormularioEntrada';
import Feed from './componentes/Feed'; // Importe sua nova página

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={<FormularioEntrada />} />
        <Route path="/feed" element={<Feed/>}  />
      </Routes>
    </Router>
  );
};

export default App;