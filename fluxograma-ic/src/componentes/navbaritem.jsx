function NavbarItem({ nome }) {

    return (

        <div className="navbarItem">

            <span>{nome}</span>

            <button>+</button>

        </div>

    );

}

export default NavbarItem;