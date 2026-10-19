import { Handle, Position } from "@xyflow/react";
import endSvg from "../../assets/nodes/End.svg";

function EndNode({ data, id }) {
    const isAtual = id === data.nodeAtual?.id;

    return (
        <div className={`nodeSvgContainer endNode ${isAtual ? "nodeAtual" : ""}`}>
            <img src={endSvg} alt="Fim" className="nodeSvgBackground" draggable="false" />
            <span className="nodeLabel">{data?.label ?? "Fim"}</span>
            <Handle type="target" position={Position.Top} className="node-handle" />
        </div>
    );
}

export default EndNode;