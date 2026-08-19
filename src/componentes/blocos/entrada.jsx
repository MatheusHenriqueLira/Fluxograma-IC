import { Handle, Position } from "@xyflow/react";

function EntradaNode({ data }) {

    return (

        <div className="entradaNode">
            <Handle type="target" position={Position.Top} className="node-handle" />
            <span>{data?.label ?? "Entrada"}</span>
            <Handle type="source" position={Position.Bottom} className="node-handle" />
        </div>

    );

}

export default EntradaNode;