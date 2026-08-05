import { ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const nodes = [

    {

        id: "1",

        position: { x: 200, y: 100 },

        data: {

            label: "Início"

        },

        type: "default"

    }

];

function FlowCanvas() {

    return (

        <div className="flowCanvas">

            <ReactFlow nodes={nodes}/>

        </div>

    );

}

export default FlowCanvas;