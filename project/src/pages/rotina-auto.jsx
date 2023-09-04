import React, { createElement, useState } from 'react';
import HeaderApp from '../components/HeaderApp';
import { app, auth } from '../lib/firebase';
import { json } from 'react-router-dom';
import Swal from 'sweetalert2'

if(window.location.href == window.location.origin + '/rotina-auto') {
    document.querySelector('body').style.background = 'black'
}

function openrotinaauto() {

}

function AddTarefa() {
    
}

function RotinaAuto() {
    return (
        <div className="App-RotinaAuto">
            <HeaderApp />
            <div className='make-rotina'>
               <div className="etapa1-make-rotina">
               <a href="./rotina-auto"><i class="fa-solid fa-caret-left"></i> VOLTAR</a>
                    <div className="top-section">
                        <i className="fa-solid fa-comment"></i>
                    </div>
                    <h1>ROTINA OTIMIZADA</h1>
                    <div className='etapa1-content'>
                        <h3>ETAPA 1</h3>
                        <p className="question">Cria sua rotina otimizada</p>
                        <div className="buttons-index">
                            <p>Adicione tarefas de acordo com suas importâncias</p>
                            <div className='addtarefas'>
                                <select id="importancia">
                                    <option value="baixa">Baixa importância</option>
                                    <option value="media">Média importância</option>
                                    <option value="alta">Alta importância</option>
                                    <option value="muito-alta">Muito Alta importância</option>
                                </select>
                                <input type="text" max='10' className='tarefa_add' placeholder='Escreva aqui'/>
                                <button className='addthis' onClick={AddTarefa}>+</button>
                            </div>
                            <div className='add-tarefas'>
                                
                            </div>
                        </div>
                    </div>
               </div>
            </div>
            <div className="Flex-box-RotinasAuto">
                <div className='leftside-flex-rotinaauto'>
                    <p>NOVO</p>
                    <h1>FAÇA SUA ROTINA</h1>
                    <h1>OTIMIZADA</h1>
                    <div className="inner-button">
                        <button onClick={openrotinaauto}>COMECE AGORA</button>
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