export function exportarParaContrato(nodes, edges) {
  const nodesSanitizados = nodes.map((node) => {
    const noLimpo = {
      id: String(node.id),
      type: node.type
    };

    if (node.type === "input") {
      noLimpo.data = {
        variable: (node.data?.variable ?? "").trim(),
        dataType: node.data?.dataType ?? "int",
        label: (node.data?.label ?? "").trim()
      };
    } else if (node.type === "process") {
      noLimpo.data = {
        variable: (node.data?.variable ?? "").trim(),
        expression: (node.data?.expression ?? "").trim()
      };
    } else if (node.type === "decision") {
      noLimpo.data = {
        expression: (node.data?.expression ?? "").trim()
      };
    } else if (node.type === "output") {
      noLimpo.data = {
        expression: (node.data?.expression ?? "").trim()
      };
    }

    return noLimpo;
  });

  const edgesSanitizados = edges.map((edge) => {
    const arestaLimpa = {
      source: String(edge.source),
      target: String(edge.target)
    };


    if (edge.label === "sim" || edge.label === "nao") {
      arestaLimpa.label = edge.label;
    }

    return arestaLimpa;
  });

  return {
    version: "1.0",
    nodes: nodesSanitizados,
    edges: edgesSanitizados
  };
}
