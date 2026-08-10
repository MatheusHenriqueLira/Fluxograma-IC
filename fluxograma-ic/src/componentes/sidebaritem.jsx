function SidebarItem({ nome, tipo, onAdicionarNode }) {

    return (

        <div className="sidebarItem">

            <span>{nome}</span>

            <button onClick={() => onAdicionarNode(tipo, nome)}>+</button>

        </div>

    );

}

export default SidebarItem;

