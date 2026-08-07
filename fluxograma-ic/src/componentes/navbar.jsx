import NavbarItem from "./navbaritem";
const blocos = [
    { id: 1, nome: "Processo", tipo: "process" },
    { id: 2, nome: "Decisão", tipo: "decision" },
    { id: 3, nome: "Entrada", tipo: "process" },
    { id: 4, nome: "Saída", tipo: "process" },
    { id: 5, nome: "Fim", tipo: "end" }
];

function Navbar({ onAdicionarNode }) {

    return (

        <aside className="navbar">

            <h2>Blocos</h2>

            {

                blocos.map((bloco) => (

                    <NavbarItem
                        key={bloco.id}
                        nome={bloco.nome}
                        tipo={bloco.tipo}
                        onAdicionarNode={onAdicionarNode}
                    />

                ))

            }

        </aside>

    );

}

export default Navbar;