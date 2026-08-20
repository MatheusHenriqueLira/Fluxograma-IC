import { Handle, Position } from "@xyflow/react";
function EntradaNode({ id, data }) {
    return (

        <div className="entradaNode">
            <Handle type="target" position={Position.Top} className="node-handle" />
            <span>{data?.label ?? "Entrada"}</span>
            <input
                type="text"
                placeholder="Variável"
                value={data?.variable ?? ""}
                onChange={(e) =>
                    data.atualizarNode(id, {
                        variable: e.target.value
                    })
                }
            />
            <input
                type="text"
                placeholder="Valor"
                value={data?.value ?? ""}
                onChange={(e) =>
                    data.atualizarNode(id, {
                        value: e.target.value
                    })
                }
            />

            <Handle type="source" position={Position.Bottom} className="node-handle" />
        </div>

    );

}

export default EntradaNode;