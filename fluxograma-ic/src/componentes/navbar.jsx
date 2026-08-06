import NavbarItem from "./navbarItem";
const blocos = [
    { id: 1, nome: "Processo", tipo: "block" },
    { id: 2, nome: "Decisão", tipo: "decision" },
    { id: 3, nome: "Entrada", tipo: "block" },
    { id: 4, nome: "Saída", tipo: "block" },
    { id: 5, nome: "Fim", tipo: "block" }
];

function Navbar() {

    return (

        <aside className="navbar">

            <h2>Blocos</h2>

            {

                blocos.map((bloco) => (

                    <NavbarItem
                        key={bloco.id}
                        nome={bloco.nome}
                    />

                ))

            }

        </aside>

    );

}

export default Navbar;