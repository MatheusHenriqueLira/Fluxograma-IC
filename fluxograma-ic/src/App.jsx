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
  },

  {
    id: "2",
    type: "process",
    position: { x: 300, y: 100 },
    data: {
      label: "Entrada"
    }
  },

  {
    id: "3",
    type: "process",
    position: { x: 300, y: 250 },
    data: {
      label: "Saída"
    }
  },

  {
    id: "4",
    type: "process",
    position: { x: 300, y: 400 },
    data: {
      label: "Processo"
    }
  },

  {
    id: "5",
    type: "decision",
    position: { x: 600, y: 250 },
    data: {
      label: "if (condição)"
    }
  },

  {
    id: "6",
    type: "end",
    position: { x: 300, y: 550 },
    data: {
      label: "Fim"
    }
  }
];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  function onConnect(connection){

    setEdges((eds)=>addEdge(connection, eds));

}
  return (
    
    <div className="app">

      <Header />

      <div className="content">

        <Navbar />

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