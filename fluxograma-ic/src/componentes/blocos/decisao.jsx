import { Handle, Position } from "@xyflow/react";

function DecisionNode({ data }){

    return(

        <div className="decisionNode">
            <Handle type="target" position={Position.Top} className="node-handle" />
            <span>{data?.label ?? "Decisão"}</span>
            <Handle type="source" position={Position.Bottom} className="node-handle" />
            <Handle type="source" position={Position.Right} className="node-handle" />
        </div>

    )

}

export default DecisionNode;