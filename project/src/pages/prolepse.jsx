
import React from 'react';
import HeaderApp from '../components/HeaderApp';
import Swal from 'sweetalert2'

function startprolepsepage() {
    Swal.fire({
        title: 'Deseja iniciar o modo Prolepse?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'COMEÇAR',
        denyButtonText: `VOLTAR`,
      }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = window.location.origin + '/prolepse/start'
        } else if (result.isDenied) {
          
        }
      })
    
}

function ProlepsePage() {
    return (
        <div className="App">
            <HeaderApp />
            <div className='contents-page'>
                
                <div className='background-page'>
                    <img src="https://img.freepik.com/free-photo/leopard-is-curled-up-its-back_188544-19872.jpg?w=1380&t=st=1692192898~exp=1692193498~hmac=c6d6ca73e63a3543222d926483189426f272cc980261ac8f843a22cb2068beaf" alt='fundo academia'/>
                </div>
                <div className='block-box-rotinas'>
                    <div className='left-side-page'>
                        <div className='title-page'>
                            <i className="fa-solid fa-bolt"></i>
                            <h1>PROLEPSE</h1>
                        </div>
                        <div className="content-page-middle">
                            <div className='button-info-ativar'>
                                <button onClick={startprolepsepage}>COMEÇAR</button>
                                <p>Modo sem distrações: 
                                    <li>Tela em modo foco(congelada).</li>
                                    <li>Cronometro ativo para contabilizar tempo no modo foco.</li>
                                    
                                    </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProlepsePage;