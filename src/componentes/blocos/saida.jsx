import { Handle, Position } from "@xyflow/react";
import outputSvg from "../../assets/nodes/Output.svg";

function SaidaNode({ id, data }) {
    const isAtual = id === data.nodeAtual?.id;

    return (
        <div className={`nodeSvgContainer saidaNode ${isAtual ? "nodeAtual" : ""}`}>
            <img src={outputSvg} alt="Saída" className="nodeSvgBackground" draggable="false" />
            <Handle type="target" position={Position.Top} className="node-handle" />
            <div className="nodeSvgContent saidaContent">
                <span className="nodeTitulo">{data?.label ?? "Saída"}</span>
                <input
                    type="text"
                    placeholder="Expressão (ex: media)"
                    value={data?.expression ?? ""}
                    onChange={(e) =>
                        data.atualizarNode(id, {
                            expression: e.target.value
                        })
                    }
                />
            </div>
            <Handle type="source" position={Position.Bottom} className="node-handle" />
        </div>
    );
}

export default SaidaNode;