import { Handle, Position } from "@xyflow/react";

function SaidaNode({ id, data }) {

    return (

        <div className={
            id === data.nodeAtual?.id
                ? "saidaNode nodeAtual"
                : "saidaNode"
        }>
            <svg
                className="saidaShape"
                viewBox="0 0 130 75"
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
            >
                <defs>
                    <linearGradient id={`saidaGradient-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#898d92" />
                        <stop offset="100%" stopColor="#474d53" />
                    </linearGradient>
                </defs>
                <path
                    d="M 1 37.5 L 27 0 H 92 C 115 0 130 15 130 37.5 C 130 60 115 75 92 75 H 27 Z"
                    fill={`url(#saidaGradient-${id})`}
                />
            </svg>
            <Handle type="target" position={Position.Top} className="node-handle" />
            <span>{data?.label ?? "Saída"}</span>
            <input
                type="text"
                placeholder="Expressão"
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

export default SaidaNode;