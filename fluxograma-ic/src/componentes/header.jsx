function Header({ onSalvar, onCarregar }) {
    return (
        <header className="header">

            <div className="logo"></div>
            <div className="title"><h1>Uau uau uau uau</h1></div>
            <div className="botoes">
            <button className="salvar-button" onClick={onSalvar}>
                Salvar Fluxograma
            </button>
            <button className="carregar-button" onClick={onCarregar}>
                Carregar Fluxograma
            </button>
            </div>
        </header>
    );
}

export default Header;