import { Handle, Position } from "@xyflow/react";

function StartNode({ data }) {

    return (

        <div className="startNode">
            <Handle type="source" position={Position.Bottom} className="node-handle" />
            <span>{data?.label ?? "Início"}</span>
        </div>

    );

}

export default StartNode;