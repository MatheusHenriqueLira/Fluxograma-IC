import { Handle, Position } from "@xyflow/react";
function EntradaNode({ id, data }) {
    return (

        <div className={
            id === data.nodeAtual?.id
                ? "entradaNode nodeAtual"
                : "entradaNode"
        }>
            <Handle type="target" position={Position.Top} className="node-handle" />
            <span className="nodeTitulo">Entrada</span>
            <input
                type="text"
                placeholder="Variável (ex: n1)"
                value={data?.variable ?? ""}
                onChange={(e) =>
                    data.atualizarNode(id, {
                        variable: e.target.value
                    })
                }
            />
            <select
                className="nodeSelect"
                value={data?.dataType ?? "int"}
                onChange={(e) =>
                    data.atualizarNode(id, {
                        dataType: e.target.value
                    })
                }
            >
                <option value="int">Inteiro (int)</option>
                <option value="float">Decimal (float)</option>
                <option value="string">Texto (str)</option>
                <option value="bool">Booleano (bool)</option>
            </select>
            <input
                type="text"
                placeholder="Prompt (opcional)"
                value={data?.label ?? ""}
                onChange={(e) =>
                    data.atualizarNode(id, {
                        label: e.target.value
                    })
                }
            />

            <Handle type="source" position={Position.Bottom} className="node-handle" />
        </div>

    );

}

export default EntradaNode;