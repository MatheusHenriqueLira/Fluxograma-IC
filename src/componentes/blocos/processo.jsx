import { Handle, Position } from "@xyflow/react";

function ProcessoNode({ id, data }) {

    return (

        <div className="processoNode">
            <Handle type="target" position={Position.Top} className="node-handle" />
            <span>{data?.label ?? "Processo"}</span>
            <input
                type="text"
                placeholder="Expressão"
                value={data?.expression ?? ""}
                onChange={(e) =>
                    data.atualizarNode(id, {
                        expression: e.target.value
                    })
                }
            />
            <Handle type="source" position={Position.Bottom} className="node-handle" />
        </div>

    );

}

export default ProcessoNode;