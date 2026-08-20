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
                    placeholder="Condição"
                    value={data?.condition ?? ""}
                    onChange={(e) =>
                        data.atualizarNode(id, {
                            condition: e.target.value
                        })
                    }
                />
                </div>
            </div>
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
        </div>

    )

}

export default DecisionNode;