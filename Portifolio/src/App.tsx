import { Link, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PainelProjectPage from './pages/PainelProjectPage';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          <h1>Meu Kanban App</h1>
        </Link>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projeto/:projetoId" element={<PainelProjectPage />} />
          <Route path="*" element={<div>Página não encontrada</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App
