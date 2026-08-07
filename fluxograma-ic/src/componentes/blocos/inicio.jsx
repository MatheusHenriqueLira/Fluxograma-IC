import { Handle, Position } from "@xyflow/react";

function StartNode({ data }) {

    return (

        <div className="startNode">
            <Handle type="source" position={Position.Bottom} />
            <span>{data?.label ?? "Início"}</span>
        </div>

    );

}

export default StartNode;