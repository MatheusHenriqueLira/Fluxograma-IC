import { Handle, Position } from "@xyflow/react";

function StartNode({ data, id }) {

    return (

        <div className={
            id === data.nodeAtual?.id
                ? "startNode nodeAtual"
                : "startNode"
        }>
            <Handle type="source" position={Position.Bottom} className="node-handle" />
            <span>{data?.label ?? "Início"}</span>
        </div>

    );

}

export default StartNode;