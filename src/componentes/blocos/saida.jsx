import { Handle, Position } from "@xyflow/react";

function SaidaNode({ id, data }) {

    return (

        <div className="saidaNode">
            <Handle type="target" position={Position.Top} className="node-handle" />
            <span>{data?.label ?? "Saída"}</span>
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

export default SaidaNode;