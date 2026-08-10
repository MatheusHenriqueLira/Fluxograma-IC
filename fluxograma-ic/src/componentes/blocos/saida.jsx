import { Handle, Position } from "@xyflow/react";

function SaidaNode({ data }) {

    return (

        <div className="saidaNode">
            <Handle type="target" position={Position.Top} className="node-handle" />
            <span>{data?.label ?? "Saída"}</span>
            <Handle type="source" position={Position.Bottom} className="node-handle" />
        </div>

    );

}

export default SaidaNode;