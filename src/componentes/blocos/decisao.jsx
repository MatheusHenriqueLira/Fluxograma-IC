import { Handle, Position } from "@xyflow/react";

function DecisionNode({id, data }) {

    return (

        <div className="decisionNode">
            <Handle type="target" position={Position.Top} className="node-handle" />
            <div className="decisionDiamond">
                <div className="decisionContent">
                    <span>{data?.label ?? "Decisão"}</span>
                    <input
                        type="text"
                        placeholder="ex: media >= 6"
                        value={data?.expression ?? data?.condition ?? ""}
                        onChange={(e) =>
                            data.atualizarNode(id, {
                                expression: e.target.value,
                                condition: e.target.value // retrocompatibilidade
                            })
                        }
                    />
                </div>
            </div>
            <span className="handleLabelLeft">Não</span>
            <Handle type="source"
                position={Position.Left}
                className="node-handle"
                id="left"
            />
            <Handle type="source"
                position={Position.Right}
                className="node-handle"
                id="right"
            />
            <span className="handleLabelRight">Sim</span>
        </div>

    )

}

export default DecisionNode;