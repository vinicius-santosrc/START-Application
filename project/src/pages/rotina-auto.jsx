import React, { createElement } from 'react';
import HeaderApp from '../components/HeaderApp';
import { app, auth } from '../systemlogin';
import { json } from 'react-router-dom';
import Swal from 'sweetalert2'

if(window.location.href == window.location.origin + '/rotina-auto') {
    document.querySelector('body').style.background = 'black'
}

function RotinaAuto() {
    return (
        <div className="App-RotinaAuto">
            <HeaderApp />
            <div className="Flex-box-RotinasAuto">
                <div className='leftside-flex-rotinaauto'>
                    <p>NOVO</p>
                    <h1>FAÇA SUA ROTINA</h1>
                    <h1>OTIMIZADA</h1>
                    <div className="inner-button">
                        <button>COMECE AGORA</button>
                    </div>
                </div>
                <div className='rightside-flex-rotinaauto'>
                    <div className='image-inner'>
                        <img className='corredor' src="./imgs/corredor-banner.png" alt="CORREDOR IMAGE" />
                        <img className='corredorback' src="./imgs/background-corredor.png" alt="" />
                        <h1 className='destac-h1-image'>OTIMIZADO</h1>
                    </div>
                </div>
                <div className="inner-button-mobile">
                        <button>COMECE AGORA</button>
                    </div>
            </div>
            <div className='rotinas-existentes-automaticas'>
                <div className="leftside-rotinas-automaticas">
                    <h1>SUAS ROTINAS</h1>
                    <h1>SUAS ROTINAS</h1>
                    <h1 className='selectedrotinas'>SUAS ROTINAS</h1>
                    <h1>SUAS ROTINAS</h1>
                    <h1>SUAS ROTINAS</h1>
                </div>
                <div className="rightside-rotinas-automaticas">
                    
                </div>
            </div>
        </div>
    )
}

export default RotinaAuto;