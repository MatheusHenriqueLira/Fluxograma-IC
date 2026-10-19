import { Handle, Position } from "@xyflow/react";
import inputSvg from "../../assets/nodes/Input.svg";

function EntradaNode({ id, data }) {
    const isAtual = id === data.nodeAtual?.id;

    return (
        <div className={`nodeSvgContainer entradaNode ${isAtual ? "nodeAtual" : ""}`}>
            <img src={inputSvg} alt="Entrada" className="nodeSvgBackground" draggable="false" />
            <Handle
                type="target"
                position={Position.Top}
                className="node-handle handle-entrada-top"
                style={{ top: "23px" }}
            />
            <div className="nodeSvgContent entradaContent">
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
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                className="node-handle handle-entrada-bottom"
                style={{ bottom: "12px" }}
            />
        </div>
    );
}

export default EntradaNode;