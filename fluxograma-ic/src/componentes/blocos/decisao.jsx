import { Handle, Position } from "@xyflow/react";

function DecisionNode({ data }){

    return(

        <div className="decisionNode">
            <Handle type="target" position={Position.Top} />
            <span>{data?.label ?? "Decisão"}</span>
            <Handle type="source" position={Position.Bottom} />
        </div>

    )

}

export default DecisionNode;