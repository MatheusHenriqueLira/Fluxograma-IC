import SidebarItem from "./sidebaritem";
const blocos = [
    { id: 1, nome: "Processo", tipo: "process" },
    { id: 2, nome: "Decisão", tipo: "decision" },
    { id: 3, nome: "Entrada", tipo: "entrada" },
    { id: 4, nome: "Saída", tipo: "saida" },
    { id: 5, nome: "Fim", tipo: "end" }
];

function Sidebar({ onAdicionarNode, onRodar }) {

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
                <button className="botaoconverter">Converter</button>
            </div>
        </div>
    );

}

export default Sidebar;