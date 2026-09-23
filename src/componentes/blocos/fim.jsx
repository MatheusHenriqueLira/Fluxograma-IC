import { Handle, Position } from "@xyflow/react";

function EndNode({ data, id }) {

    return (

        <div className={
    id === data.nodeAtual?.id
        ? "endNode nodeAtual"
        : "endNode"
}>
            <Handle type="target" position={Position.Top} className="node-handle" />
            <span>{data?.label ?? "Fim"}</span>
        </div>

    );

}

export default EndNode;