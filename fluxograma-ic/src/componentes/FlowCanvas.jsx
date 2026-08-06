import { ReactFlow, useNodesState } from "@xyflow/react";
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

const initialNodes = [
{
    id:"1",
    type:"start",
    position:{x:100,y:100},
    data:{}
},

{
    id:"2",
    type:"process",
    position:{x:300,y:100},
    data:{
        label:"Entrada"
    }
},

{
    id:"3",
    type:"process",
    position:{x:300,y:250},
    data:{
        label:"Saída"
    }
},

{
    id:"4",
    type:"process",
    position:{x:300,y:400},
    data:{
        label:"Processo"
    }
},

{
    id:"5",
    type:"decision",
    position:{x:600,y:250},
    data:{
        label:"if (condição)"
    }
},

{
    id:"6",
    type:"end",
    position:{x:300,y:550},
    data:{
        label:"Fim"
    }
}
];

function FlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  return (
    <div className="flowCanvas">
      <ReactFlow
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