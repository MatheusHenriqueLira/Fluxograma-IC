import './App.css';
import Header from './componentes/header';
import Sidebar from './componentes/sidebar';
import Terminal from './componentes/terminal';
import FlowCanvas from './componentes/FlowCanvas';
import { useNodesState, useEdgesState, addEdge } from "@xyflow/react";
import { useState } from 'react';

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
  const [nodeAtual, setNodeAtual] = useState(null);
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

    const dados = JSON.stringify(fluxograma);

    const arquivo = new Blob([dados], { type: "application/json" });

    const url = URL.createObjectURL(arquivo);

    const link = document.createElement("a");
    link.href = url;
    link.download = "meu-fluxograma.json";
    link.click();
  }

  function carregarFluxograma() {
    const input = document.createElement("input");

    input.type = "file";
    input.accept = ".json,application/json";

    input.onchange = (event) => {
      const arquivo = event.target.files[0];

      const leitor = new FileReader();

      leitor.onload = (e) => {
        const fluxograma = JSON.parse(e.target.result);

        setNodes(fluxograma.nodes);
        setEdges(fluxograma.edges);
      };

      leitor.readAsText(arquivo);
    };

    input.click();
  }

  function validarFluxograma(nodes, edges) {
    if (nodes.length === 0) {
      alert("O fluxograma está vazio.");
      return false;
    }
    const inicio = nodes.find((node) => {
      return node.type === "start";
    });
    if (!inicio) {
      alert("O fluxograma não possui um início.");
      return false;
    }
    const fim = nodes.find((node) => {
      return node.type === "end";
    });
    if (!fim) {
      alert("O fluxograma não possui um fim.");
      return false;
    }
    const conexaoInicio = edges.find((edge) => {
      return edge.source === inicio.id;
    });
    if (!conexaoInicio) {
      alert("O início não está conectado.");
      return false;
    }
    const caminhovalido = verificarCaminho(inicio, fim, nodes, edges);
    if (!caminhovalido.valido) {
      alert("O fluxograma não possui um caminho válido do início ao fim.");
      return false;
    }

    if (caminhovalido.visitados.size !== (nodes.length - 1)) {
      alert("O fluxograma possui nós não conectados.");
      return false;
    }
    return true;
  }

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
    const validar = validarFluxograma(nodes, edges);
    if (!validar) {
      return;
    }
    const inicio = nodes.find((node) => {
      return node.type === "start";
    });
    setNodeAtual(inicio);

  }
  function avancarNode() {
    const proximoNode = encontrarnode(nodeAtual, nodes, edges);
    const fim = nodes.find((node) => {
      return node.type === "end";
    });
    if (!proximoNode) {
      alert("O fluxograma não possui um próximo nó.");
      return;
    }
    if (proximoNode.id === fim.id) {
      setNodeAtual(null);
      alert("O fluxograma chegou ao fim.");
      return;
    }
    setNodeAtual(proximoNode);
  }
  function verificarCaminho(inicio, fim, nodes, edges) {

    const visitados = new Set();

    let atual = inicio;

    while (atual.id !== fim.id) {

      if (visitados.has(atual.id)) {
        return {
          valido: false,
          visitados: visitados
        };
      }

      visitados.add(atual.id);

      const proximo = encontrarnode(atual, nodes, edges);
      if (proximo === null) {
        return {
          valido: false,
          visitados: visitados
        };
      }
      atual = proximo;
    }
    return {
      valido: true,
      visitados: visitados
    };
  }
  return (

    < div className="app" >

      <Header
        onSalvar={salvarFluxograma}
        onCarregar={carregarFluxograma} />

      <div className="content">

        <Sidebar
          onAdicionarNode={adicionarNode}
          onRodar={rodar}
          onAvancar={avancarNode} />

        <FlowCanvas
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          setNodes={setNodes}
          atualizarNode={atualizarNode}
          nodeAtual={nodeAtual}
        />
        <Terminal />
      </div>

    </div >
  );
}

export default App;