import './App.css';
import Header from './componentes/header';
import Sidebar from './componentes/sidebar';
import Terminal from './componentes/terminal';
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

    setNodes((nodesAtuais) => [...nodesAtuais, novoNode]);
  }

  function atualizarNode(id, novosDados) {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? {
            ...node,
            data: {
              ...node.data,
              ...novosDados
            }
          }
          : node
      )
    );
  }

  function salvarFluxograma() {
    const fluxograma = {
      nodes: nodes,
      edges: edges
    };
    localStorage.setItem("fluxograma", JSON.stringify(fluxograma));

  }
  function carregarFluxograma() {

    const dadosSalvos = localStorage.getItem("fluxograma");

    if (dadosSalvos) {

      const fluxograma = JSON.parse(dadosSalvos);

      setNodes(fluxograma.nodes);
      setEdges(fluxograma.edges);
    }
  }

  function validarFluxograma(nodes, edges) {
    if (nodes.length === 0) {
      alert("O fluxograma está vazio.");
      return false;
    }
  }

  const inicio = nodes.find((node) => {
    return node.type === "start";
  });
  const proximo = encontrarnode(inicio, nodes, edges);
  console.log(proximo);

  function encontrarnode(nodeAtual, nodes, edges) {
    const edge = edges.find((edge) => {
      return edge.source === nodeAtual.id;
    });
    if (!edge) {
      return null;
    }
    const nodeDestino = nodes.find((node) => {
      return node.id === edge.target;
    });

    return nodeDestino;
  }

  function rodar() {

  }

  return (

    < div className="app" >

      <Header
        onSalvar={salvarFluxograma}
        onCarregar={carregarFluxograma} />

      <div className="content">

        <Sidebar onAdicionarNode={adicionarNode} />

        <FlowCanvas
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          setNodes={setNodes}
          atualizarNode={atualizarNode}
        />
        <Terminal />
      </div>

    </div >
  );
}

export default App;