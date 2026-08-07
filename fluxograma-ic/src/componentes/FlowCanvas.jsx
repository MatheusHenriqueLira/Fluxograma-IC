import { ReactFlow} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "../App.css";
import StartNode from "./blocos/inicio";
import DefaultNode from "./blocos/node";
import DecisionNode from "./blocos/decisao";
import EndNode from "./blocos/fim";

const nodeTypes = {
    start: StartNode,
    process: DefaultNode,
    decision: DecisionNode,
    end: EndNode
}


function FlowCanvas({ nodes, onNodesChange, edges, onEdgesChange, onConnect }) {
  return (
    <div className="flowCanvas">
      <ReactFlow
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodes={nodes}
        onNodesChange={onNodesChange}
        nodeTypes={nodeTypes}
        nodesDraggable
        fitView
      />
    </div>
  );
}

export default FlowCanvas;