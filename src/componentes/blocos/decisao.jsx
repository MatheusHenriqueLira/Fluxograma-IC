import { Handle, Position } from "@xyflow/react";
import decisionSvg from "../../assets/nodes/Decision.svg";

function DecisionNode({ id, data }) {
    const isAtual = id === data.nodeAtual?.id;

    return (
        <div className={`nodeSvgContainer decisionNode ${isAtual ? "nodeAtual" : ""}`}>
            <img src={decisionSvg} alt="Decisão" className="nodeSvgBackground" draggable="false" />
            <Handle type="target" 
            position={Position.Top}
            className="node-handle handle-decision-top"
             />

            <div className="nodeSvgContent decisionContent">
                <span className="nodeTitulo">{data?.label ?? "Decisão"}</span>
                <input
                    type="text"
                    placeholder="ex: media >= 6"
                    value={data?.expression ?? ""}
                    onChange={(e) =>
                        data.atualizarNode(id, {
                            expression: e.target.value
                        })
                    }
                />
            </div>

            <span className="handleLabelLeft">Não</span>
            <Handle
                type="source"
                position={Position.Left}
                className="node-handle"
                id="left"
            />
            <Handle
                type="source"
                position={Position.Right}
                className="node-handle"
                id="right"
            />
            <span className="handleLabelRight">Sim</span>
        </div>
    );
}

export default DecisionNode;