import React from 'react';
import HeaderApp from '../components/HeaderApp';

function HidratacaoPage() {
    return (
        <div className="App">
            <HeaderApp />
            <div className='contents-page'>
                
                <div className='background-page'>
                    <img src="https://img.freepik.com/free-photo/attractive-sportsman-drinking-water-after-hard-training_342744-617.jpg?w=1380&t=st=1692192365~exp=1692192965~hmac=4ddeeecffcb45fbc69928792671249bc5dcb58e5bbf0e4c88b20af4d096b9f20" alt='fundo academia'/>
                </div>
                <div className='block-box-rotinas'>
                    <div className='left-side-page'>
                        <div className='title-page'>
                            <i className="fa-regular fa-calendar"></i>
                            <h1>HIDRATAÇÃO</h1>
                        </div>
                        <div className="content-page-middle">
                            <div className='button-info-ativar'>
                                <button onClick=''>EM BREVE</button>
                                <p>Defina um horário para receber notificações para se hidratar.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HidratacaoPage;