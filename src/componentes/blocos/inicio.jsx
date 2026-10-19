import { Handle, Position } from "@xyflow/react";
import startSvg from "../../assets/nodes/Start.svg";

function StartNode({ data, id }) {
    const isAtual = id === data.nodeAtual?.id;

    return (
        <div className={`nodeSvgContainer startNode ${isAtual ? "nodeAtual" : ""}`}>
            <img src={startSvg} alt="Início" className="nodeSvgBackground" draggable="false" />
            <span className="nodeLabel">{data?.label ?? "Início"}</span>
            <Handle type="source" position={Position.Bottom} className="node-handle" />
        </div>
    );
}

export default StartNode;