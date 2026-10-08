import { Handle, Position } from "@xyflow/react";

function ProcessoNode({ id, data }) {

    return (

        <div className={
            id === data.nodeAtual?.id
                ? "processNode nodeAtual"
                : "processNode"
        }>
            <Handle type="target" position={Position.Top} className="node-handle" />
            <span className="nodeTitulo">Processo</span>
            <input
                type="text"
                placeholder="Variável (ex: media)"
                value={data?.variable ?? ""}
                onChange={(e) =>
                    data.atualizarNode(id, {
                        variable: e.target.value
                    })
                }
            />
            <input
                type="text"
                placeholder="Expressão (ex: (a + b) / 2)"
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