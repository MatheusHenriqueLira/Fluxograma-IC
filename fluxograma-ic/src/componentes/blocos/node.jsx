import { Handle, Position } from "@xyflow/react";

function DefaultNode({ data }) {

    return (

        <div className="defaultNode">
            <Handle type="target" position={Position.Top} />
            <span>{data?.label ?? "Processo"}</span>
            <Handle type="source" position={Position.Bottom} />
        </div>

    );

}

export default DefaultNode;