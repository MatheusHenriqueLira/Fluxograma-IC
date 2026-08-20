import {ReactFlow, Background, BackgroundVariant} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "../App.css";
import StartNode from "./blocos/inicio";
import ProcessoNode from "./blocos/processo";
import DecisionNode from "./blocos/decisao";
import EndNode from "./blocos/fim";
import EntradaNode from "./blocos/entrada";
import SaidaNode from "./blocos/saida";

const nodeTypes = {
    start: StartNode,
    process: ProcessoNode,
    decision: DecisionNode,
    end: EndNode,
    entrada: EntradaNode,
    saida: SaidaNode
}

function FlowCanvas({ nodes, onNodesChange, edges, onEdgesChange, onConnect, atualizarNode }) {
  const nodesComFuncao = nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      atualizarNode
    }
  }));

  return (
    <div className="flowCanvas">
      <ReactFlow
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodes={nodesComFuncao}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        nodesDraggable
        fitView 
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
      </ReactFlow>
    </div>
  );
}

export default FlowCanvas;