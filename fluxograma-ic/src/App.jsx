import './App.css';
import Header from './componentes/Header';
import Navbar from './componentes/Navbar';
import Montador from './componentes/Montador';

function App() {
  return (
    <div className="app">

      <Header />

      <div className="content">

        <Navbar />

        <Montador />

      </div>

    </div>
  );
}

export default App;