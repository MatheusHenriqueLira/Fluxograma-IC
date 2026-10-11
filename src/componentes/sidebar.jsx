import SidebarItem from "./sidebaritem";
const blocos = [
    { id: 1, nome: "Processo", tipo: "process" },
    { id: 2, nome: "Decisão", tipo: "decision" },
    { id: 3, nome: "Entrada", tipo: "input" },
    { id: 4, nome: "Saída", tipo: "output" },
    { id: 5, nome: "Fim", tipo: "end" }
];

function Sidebar({ onAdicionarNode, onRodar, onAvancar, onConverter, carregandoConversao }) {

    return (

        <div className="sidebar">
            <h2>Blocos</h2>

            {

                blocos.map((bloco) => (

                    <SidebarItem
                        key={bloco.id}
                        nome={bloco.nome}
                        tipo={bloco.tipo}
                        onAdicionarNode={onAdicionarNode}
                    />

                ))

            }
            <div className="botoessidebar">
                <button onClick={onRodar} className="botaorodar">Rodar</button>
                <button onClick={onAvancar} className="botaoavancar">Avançar</button>
                <button
                    onClick={onConverter}
                    className="botaoconverter"
                    disabled={carregandoConversao}
                >
                    {carregandoConversao ? "Convertendo..." : "Converter"}
                </button>
            </div>
        </div>
    );

}

export default Sidebar;