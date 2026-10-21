import './App.css';
import Header from './componentes/header';
import Sidebar from './componentes/sidebar';
import Terminal from './componentes/terminal';
import FlowCanvas from './componentes/FlowCanvas';
import { useNodesState, useEdgesState, addEdge } from "@xyflow/react";
import { useState } from 'react';
import { exportarParaContrato } from './utils/exportador';
import { API_CONVERT_ENDPOINT } from './config/api';

const initialEdges = [];

const initialNodes = [
    {
        id: "1",
        type: "start",
        position: { x: 100, y: 100 },
        data: {},
        deletable: false
    }
];

function App() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [nodeAtual, setNodeAtual] = useState(null);

    // Estados da integração com a API
    const [codigoPython, setCodigoPython] = useState("");
    const [statusConversao, setStatusConversao] = useState("idle");
    const [erroConversao, setErroConversao] = useState(null);

    function onConnect(connection) {
        const noOrigem = nodes.find((node) => node.id === connection.source);
        let novaConexao = { ...connection };

        if (noOrigem && noOrigem.type === "decision") {
            if (connection.sourceHandle === "right") {
                novaConexao.label = "sim";
            } else if (connection.sourceHandle === "left") {
                novaConexao.label = "nao";
            }

            novaConexao.labelStyle = { fill: "#222", fontWeight: 700, fontSize: 12 };
            novaConexao.labelBgStyle = { fill: "#ffffff", fillOpacity: 0.95, rx: 4, ry: 4 };
            novaConexao.labelBgPadding = [6, 4];

            setEdges((eds) => {
                const semDuplicadas = eds.filter((edge) => {
                    const ehMesmoNo = edge.source === connection.source;
                    const ehMesmaBolinha = edge.sourceHandle === connection.sourceHandle;
                    const ehDuplicada = ehMesmoNo && ehMesmaBolinha;
                    return !ehDuplicada;
                });

                return addEdge(novaConexao, semDuplicadas);
            });
            return;
        }


        setEdges((eds) => {
            const semSaidaAnterior = eds.filter((edge) => edge.source !== connection.source);
            return addEdge(novaConexao, semSaidaAnterior);
        });
    }

    function adicionarNode(tipo, label) {
        let dadosIniciais = { label };
        if (tipo === "input") {
            dadosIniciais = { variable: "", dataType: "int", label: "" };
        } else if (tipo === "process") {
            dadosIniciais = { variable: "", expression: "" };
        } else if (tipo === "decision") {
            dadosIniciais = { expression: "" };
        } else if (tipo === "output") {
            dadosIniciais = { expression: "" };
        }

        const novoNode = {
            id: crypto.randomUUID(),
            type: tipo,
            position: {
                x: 300,
                y: 200
            },
            data: dadosIniciais
        };

        setNodes((nodesAtuais) => [...nodesAtuais, novoNode]);
    }

    function atualizarNode(id, novosDados) {
        setNodes((nodes) =>
            nodes.map((node) =>
                node.id === id
                    ? {
                        ...node,
                        data: {
                            ...node.data,
                            ...novosDados
                        }
                    }
                    : node
            )
        );
    }

    function salvarFluxograma() {
        const fluxograma = {
            nodes: nodes,
            edges: edges
        };
        localStorage.setItem("fluxograma", JSON.stringify(fluxograma));
    }

    function carregarFluxograma() {
        const fluxograma = localStorage.getItem("fluxograma");
        if (fluxograma) {
            const dados = JSON.parse(fluxograma);
            setNodes(dados.nodes);
            setEdges(dados.edges);
        }
    }

    function obterContratoSemantico() {
        const contrato = exportarParaContrato(nodes, edges);
        console.log("Contrato semântico gerado para a API:", contrato);
        return contrato;
    }

    async function converterParaPython() {
        const valido = validarFluxograma(nodes, edges);
        if (!valido) return;

        try {
            setStatusConversao("loading");
            setErroConversao(null);

            const payload = exportarParaContrato(nodes, edges);
            console.log("Enviando contrato semântico para a API Laravel:", payload);

            const resposta = await fetch(API_CONVERT_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (!resposta.ok) {
                const erroJson = await resposta.json().catch(() => null);
                const mensagemErro = erroJson?.message || erroJson?.error || `Erro HTTP ${resposta.status}: ${resposta.statusText}`;
                throw new Error(mensagemErro);
            }

            const dados = await resposta.json();
            const codigo = typeof dados === "string"
                ? dados
                : (dados.code || dados.python || dados.output || dados.data?.code);

            if (typeof codigo !== "string" || !codigo.trim()) {
                throw new Error("A API não retornou o código Python.");
            }

            setCodigoPython(codigo);
            setStatusConversao("success");
        } catch (err) {
            console.error("Falha ao comunicar com a API:", err);
            setErroConversao(err.message || "Não foi possível conectar à API.");
            setStatusConversao("error");
        }
    }

    function validarFluxograma(nodes, edges) {
        if (nodes.length === 0) {
            alert("O fluxograma está vazio.");
            return false;
        }

        // 1. Validar nós de Início e Fim
        const starts = nodes.filter((node) => node.type === "start");
        if (starts.length !== 1) {
            alert("O fluxograma deve ter exatamente um bloco de Início.");
            return false;
        }

        const ends = nodes.filter((node) => node.type === "end");
        if (ends.length === 0) {
            alert("O fluxograma deve ter pelo menos um bloco de Fim.");
            return false;
        }

        const inicio = starts[0];

        // 2. Validar que todo bloco de Decisão possui as duas saídas ('sim' e 'nao')
        const decisoes = nodes.filter((node) => node.type === "decision");
        for (const dec of decisoes) {
            const temSim = edges.some((e) => e.source === dec.id && e.label === "sim");
            const temNao = edges.some((e) => e.source === dec.id && e.label === "nao");

            if (!temSim || !temNao) {
                alert("Todo bloco de Decisão deve ter ambas as saídas conectadas ('Sim' e 'Não').");
                return false;
            }
        }

        // 3. Travessia em Grafo (DFS) a partir do Início para checar conectividade
        const visitados = new Set();
        const pilha = [inicio.id];
        let alcancouFim = false;

        while (pilha.length > 0) {
            const idAtual = pilha.pop();

            if (visitados.has(idAtual)) continue;
            visitados.add(idAtual);

            const noAtual = nodes.find((n) => n.id === idAtual);
            if (noAtual?.type === "end") {
                alcancouFim = true;
            }

            // Encontra todas as conexões que saem deste nó
            const arestasSaindo = edges.filter((e) => e.source === idAtual);

            // Bloco intermediário que não seja 'end' precisa ter saída
            if (noAtual?.type !== "end" && arestasSaindo.length === 0) {
                alert(`O bloco "${noAtual?.data?.label || noAtual?.type}" não possui conexão de saída.`);
                return false;
            }

            for (const aresta of arestasSaindo) {
                if (!visitados.has(aresta.target)) {
                    pilha.push(aresta.target);
                }
            }
        }

        // 4. Checar se pelo menos um 'end' foi alcançado
        if (!alcancouFim) {
            alert("O fluxograma não possui um caminho que leve até o bloco Fim.");
            return false;
        }

        // 5. Checar se existem blocos desconectados (órfãos) no canvas
        if (visitados.size !== nodes.length) {
            const orfaos = nodes.filter((n) => !visitados.has(n.id));
            alert(`Existem ${orfaos.length} bloco(s) não conectado(s) ao fluxo principal.`);
            return false;
        }

        return true;
    }

    function encontrarnode(nodeAtual, nodes, edges) {
        if (!nodeAtual) return null;

        let edge = null;
        if (nodeAtual.type === "decision") {
            // Na navegação visual passo a passo, segue por padrão o caminho 'sim'
            edge = edges.find((e) => e.source === nodeAtual.id && e.label === "sim")
                || edges.find((e) => e.source === nodeAtual.id);
        } else {
            edge = edges.find((e) => e.source === nodeAtual.id);
        }

        if (!edge) return null;
        return nodes.find((node) => node.id === edge.target) || null;
    }

    function rodar() {
        const valido = validarFluxograma(nodes, edges);
        if (!valido) return;

        const inicio = nodes.find((node) => node.type === "start");
        setNodeAtual(inicio);
    }

    function avancarNode() {
        if (!nodeAtual) {
            alert("Inicie o fluxograma clicando em 'Rodar'.");
            return;
        }

        const fim = nodes.find((node) => node.type === "end");
        if (nodeAtual.id === fim?.id) {
            setNodeAtual(null);
            alert("O fluxograma chegou ao fim.");
            return;
        }

        const proximoNode = encontrarnode(nodeAtual, nodes, edges);
        if (!proximoNode) {
            alert("O fluxograma não possui um próximo nó conectado.");
            return;
        }

        setNodeAtual(proximoNode);
    }
    return (

        < div className="app" >

            <Header
                onSalvar={salvarFluxograma}
                onCarregar={carregarFluxograma} />

            <div className="content">

                <Sidebar
                    onAdicionarNode={adicionarNode}
                    onRodar={rodar}
                    onAvancar={avancarNode}
                    onConverter={converterParaPython}
                    carregandoConversao={statusConversao === "loading"}
                />

                <FlowCanvas
                    nodes={nodes}
                    onNodesChange={onNodesChange}
                    edges={edges}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    setNodes={setNodes}
                    atualizarNode={atualizarNode}
                    nodeAtual={nodeAtual}
                />
                <Terminal
                    codigoPython={codigoPython}
                    status={statusConversao}
                    erro={erroConversao}
                />
            </div>

        </div >
    );
}

export default App;