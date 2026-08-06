import { ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "../App.css";
import StartNode from "./blocos/inicio";
import DefaultNode from "./blocos/node";
import DecisionNode from "./blocos/decisao";

const nodeTypes = {

    start: StartNode,

    process: DefaultNode,

    decision: DecisionNode

}

const nodes = [
  {
    id: "1",
    type: "start",
    position: { x: 100, y: 100 },
    data: {}
  },

  {
    id: "2",
    type: "process",
    position: { x: 350, y: 100 },
    data: {
      label: "Processo"
    }
  },

  {
    id: "3",
    type: "decision",
    position: { x: 650, y: 100 },
    data: {
      label: "x > 10?"
    }
  }
];

function FlowCanvas() {

    return (

        <div className="flowCanvas">

            <ReactFlow nodes={nodes} nodeTypes={nodeTypes}/>

        </div>

    );

}

export default FlowCanvas;