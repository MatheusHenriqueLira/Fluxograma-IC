import './App.css';
import Header from './componentes/header';
import Navbar from './componentes/navbar';
import FlowCanvas from './componentes/FlowCanvas';
import { useNodesState, useEdgesState, addEdge } from "@xyflow/react";


const initialEdges = [];

const initialNodes = [
  {
    id: "1",
    type: "start",
    position: { x: 100, y: 100 },
    data: {}
  }
];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  function onConnect(connection) {
    setEdges((eds) => addEdge(connection, eds));

  }

  function adicionarNode(tipo, label) {
    const novoNode = {
      id: crypto.randomUUID(),
      type: tipo,
      position: {
        x: 300,
        y: 200
      },
      data: {
        label: label
      }
    };

    setNodes((nodesAtuais) => [...nodesAtuais,novoNode]);
  }

  return (

    <div className="app">

      <Header />

      <div className="content">

        <Navbar onAdicionarNode={adicionarNode} />

        <FlowCanvas
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        />

      </div>

    </div>
  );
}

export default App;