import React from 'react';


function openbarprolepse() {
    document.querySelector(".navbarheaderprolepse").style.display="block";
}

function closeprolepse() {
    document.querySelector(".navbarheaderprolepse").style.display="none";
}

function gotoHomePage() {
    window.location.href=window.location.origin
}

export default function HeaderProlepse() {
    return(
        <>
        <div className='flex-header-application-prolepse'>
            <i onClick={openbarprolepse} className="fa-solid fa-bars"></i>
            <h1>START</h1>
        </div>
        <div className='pc-header-flexbox-prolepse'>
            <h1>START</h1>

            <i onClick={openbarprolepse} className="fa-solid fa-bars"></i>
        </div>
        <div className='navbarheaderprolepse'>
            <div className='headernavbarprolepse'>
                <i onClick={closeprolepse} class="fa-solid fa-xmark"></i>
                <h1>START</h1>
                <i></i>
            </div>
            <section>
                <h2>MODOS PROLEPSE</h2>
                <div className='card-modes'>
                    <div className='card-prolepse-nav'>
                        <a href="./foco">
                            <h3>FOCO - CONTAGEM</h3>
                        </a>
                    </div>
                    <div className='card-prolepse-nav'>
                        <a href="./cronometro">
                            <h3>CRONÔMETRO</h3>
                        </a>
                    </div>
                    <div className='card-prolepse-nav'>
                        <a href="./screenprotect">
                            <h3>PROTETOR DE TELA</h3>
                        </a>
                    </div>
                </div>
            </section>
            <section>
                <h2>OPÇÕES</h2>
                <div className='card-modes'>
                    <div className='card-prolepse-nav'>
                        <a href="#">
                            <h3>RECOMPENSAS</h3>
                        </a>
                    </div>
                    <div className='card-prolepse-nav' id='homebtn'>
                        <a href="#homepage" onClick={gotoHomePage}>
                            <h3>VOLTAR PARA O START</h3>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    </>
    )
}