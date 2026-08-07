import { Handle, Position } from "@xyflow/react";

function EndNode({ data }) {

    return (

        <div className="endNode">
            <Handle type="target" position={Position.Top} />
            <span>{data?.label ?? "Fim"}</span>
        </div>

    );

}

export default EndNode;