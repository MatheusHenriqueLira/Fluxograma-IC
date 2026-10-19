import { Handle, Position } from "@xyflow/react";
import processSvg from "../../assets/nodes/Process.svg";

function ProcessoNode({ id, data }) {
    const isAtual = id === data.nodeAtual?.id;

    return (
        <div className={`nodeSvgContainer processNode ${isAtual ? "nodeAtual" : ""}`}>
            <img src={processSvg} alt="Processo" className="nodeSvgBackground" draggable="false" />
            <Handle type="target" position={Position.Top} className="node-handle" style={{ top: "2px" }}/>
            <div className="nodeSvgContent">
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
            </div>
            <Handle type="source" position={Position.Bottom} className="node-handle" style={{ top: "85px" }} />
        </div>
    );
}

export default ProcessoNode;
