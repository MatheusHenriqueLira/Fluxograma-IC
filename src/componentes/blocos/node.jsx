import { Handle, Position } from "@xyflow/react";

function DefaultNode({ data }) {

    return (

        <div className="defaultNode">
            <Handle type="target" position={Position.Top} className="node-handle" />
            <span>{data?.label ?? "Processo"}</span>
            <Handle type="source" position={Position.Bottom} className="node-handle" />
        </div>

    );

}

export default DefaultNode;