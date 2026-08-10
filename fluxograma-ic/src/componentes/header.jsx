function Header({ onSalvar, onCarregar }) {
    return (
        <header className="header">
            <h1>Uau uau uau uau</h1>
            <button className="salvar-button" onClick={onSalvar}>
                Salvar Fluxograma
            </button>
            <button className="carregar-button" onClick={onCarregar}>
                Carregar Fluxograma
            </button>
        </header>
    );
}

export default Header;