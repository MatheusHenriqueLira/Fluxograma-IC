function Terminal({ codigoPython, status, erro, saidaConsole }) {
    return (
        <div className="terminal">
            <div className="AreaLinguagem">
                <div className="terminalHeader">
                    <span className="terminalTitulo">Código Python</span>
                    {status === 'loading' && <span className="statusBadge loading">Convertendo...</span>}
                    {status === 'success' && <span className="statusBadge success">Convertido</span>}
                </div>

                <div className="codigoArea">
                    {status === "loading" && (
                        <p className="terminalMensagem aviso">Enviando fluxograma e aguardando resposta da API...</p>
                    )}

                    {status === "error" && (
                        <div className="terminalMensagem erro">
                            <strong>Erro na conversão:</strong>
                            <p>{erro}</p>
                            <small>Certifique-se de que a API Laravel está rodando.</small>
                        </div>
                    )}

                    {status === "success" && codigoPython && (
                        <pre className="codigoPython">
                            <code>{codigoPython}</code>
                        </pre>
                    )}

                    {(!status || status === "idle") && (
                        <p className="terminalMensagem">
                            Clique em <strong>"Converter"</strong> na barra lateral para gerar o código em Python.
                        </p>
                    )}
                </div>
            </div>
            <div className="Areaterminal">
                <span className="terminalTitulo">Saída da Execução</span>
                <pre className="consoleOutput">{saidaConsole || "Nenhuma execução iniciada."}</pre>
            </div>
        </div>
    );
}

export default Terminal;