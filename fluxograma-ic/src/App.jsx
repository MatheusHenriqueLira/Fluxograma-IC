import './App.css';
import Header from './componentes/header';
import Navbar from './componentes/navbar';
import FlowCanvas from './componentes/FlowCanvas';

function App() {
  return (
    <div className="app">

      <Header />

      <div className="content">

        <Navbar />

        <FlowCanvas />

      </div>

    </div>
  );
}

export default App;