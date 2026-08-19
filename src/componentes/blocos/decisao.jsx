import { Handle, Position } from "@xyflow/react";

function DecisionNode({ data }){

    return(

        <div className="decisionNode">
            <Handle type="target" position={Position.Top} className="node-handle" />
            <div className="gambiarra">
                <span>{data?.label ?? "Decisão"}</span>
            </div>
            <Handle type="source"
            position={Position.Left} 
            className="node-handle"
            id="left"
            />
            <Handle type="source"
            position={Position.Right}
            className="node-handle"
            id="right"
             />
        </div>

    )

}

export default DecisionNode;