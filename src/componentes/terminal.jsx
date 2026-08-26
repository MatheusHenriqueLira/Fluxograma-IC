function Terminal() {
    return (
        <div className="terminal">
            <div className="AreaLinguagem">
                <select className="languageSelect" defaultValue="">
                    <option value="" disabled>Linguagem</option>
                    <option value="javascript">Javascript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                </select>

                <p>
                    <br />
                    let X=2 <br />
                    let Y=3 <br />

                    Soma = X+Y <br />
                    console.log(Soma)
                    <br />
                </p>
            </div>
            <div className="Areaterminal">
                <h2>Terminal</h2>
            </div>
        </div>
    );
}

export default Terminal;