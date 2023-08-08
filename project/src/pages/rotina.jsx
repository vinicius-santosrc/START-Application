import React from 'react';
import HeaderApp from '../components/HeaderApp';

function RotinaPage() {
    return (
        <div className="App">
            <HeaderApp />
            <div className='contents-page'>
                <div className='background-page'>
                    <img src="./imgs/rotina-page-banner.webp" />
                </div>
                <div className='left-side-page'>
                    <div className='title-page'>
                        <i className="fa-regular fa-calendar"></i>
                        <h1>Rotina</h1>
                    </div>
                    <div className="content-page-middle">
                        <div className='button-info'>
                            <button>ORGANIZE SUA ROTINA</button>
                            <p>Crie sua rotina de acordo com as importâncias de cada tarefa. </p>
                        </div>
                        <div className='button-info'>
                            <button>ROTINA AUTOMÁTICA</button>
                            <p>A aplicação irá desenvolver uma rotina otimizada para você. </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RotinaPage;