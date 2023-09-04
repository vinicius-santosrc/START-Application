import React from 'react';
import HeaderApp from '../components/HeaderApp';

function AcademiaPage() {
    return (
        <div className="App">
            <HeaderApp />
            <div className='contents-page'>
                
                <div className='background-page'>
                    <img src="imgs/academiabgfe314315r34t45gh5da.webp" alt='fundo academia'/>
                </div>
                <div className='block-box-rotinas'>
                    <div className='left-side-page'>
                        <div className='title-page'>
                            <i className="fa-solid fa-dumbbell"></i>
                            <h1>ACADEMIA</h1>
                        </div>
                        <div className="content-page-middle">
                            <div className='button-info-ativar'>
                                <button>EM BREVE</button>
                                <p>Configure seu treino e seus exercícios.</p>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AcademiaPage;