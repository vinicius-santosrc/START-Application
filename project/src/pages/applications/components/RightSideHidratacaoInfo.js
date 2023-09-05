import React from "react"

export default function RightSideHidratacaoInfo() {
    return(
        <>
            <div className="block-rightside">
                <h3>CLIQUE PARA ADICIONAR AO SEU PROGRESSO DIÁRIO</h3>
                <div className="cards-hidratation">
                    <div onClick={""} className="card-h">
                        <p>250ml</p>
                    </div>
                    <div onClick={""} className="card-h">
                        <p>500ml</p>
                    </div>
                    <div onClick={""} className="card-h">
                        <p>750ml</p>
                    </div>
                    <div onClick={""} className="card-h">
                        <p>1000ml</p>
                    </div>
                </div>
            </div>
        </>
    )
}