import { Handle, Position } from "@xyflow/react";

function EndNode({ data }) {

    return (

        <div className="endNode">
            <Handle type="target" position={Position.Top} className="node-handle" />
            <span>{data?.label ?? "Fim"}</span>
        </div>

    );

}

export default EndNode;