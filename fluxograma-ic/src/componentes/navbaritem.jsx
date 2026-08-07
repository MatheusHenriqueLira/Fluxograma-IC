function NavbarItem({ nome, tipo, onAdicionarNode }) {

    return (

        <div className="navbarItem">

            <span>{nome}</span>

            <button onClick={() => onAdicionarNode(tipo, nome)}>+</button>

        </div>

    );

}

export default NavbarItem;

