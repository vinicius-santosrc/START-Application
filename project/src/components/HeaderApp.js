import React from 'react';
import { signOutUser } from '../systemlogin';
/* PAGES */

import '../pages/hidratacao';
import '../pages/academia';
import '../pages/index';
import '../pages/prolepse';
import '../pages/rotina';
import '../pages/settings';


function HeaderApp() {
    function gotoHidratacao() {
        window.location.href = window.location.origin + '/hidratacao'
    }
    
    function gotoIndex() {
        window.location.href = window.location.origin + '/'
    }
    
    function gotoRotina() {
        window.location.href = window.location.origin + '/rotina'
    }
    
    function gotoAcademia() {
        window.location.href = window.location.origin + '/academia'
    }
    
    function gotoProlepse() {
        window.location.href = window.location.origin + '/prolepse'
    }
    
    function gotoConfig() {
        window.location.href = window.location.origin + '/settings'
    }
    //
    function OpenMenu() {
        document.querySelector('.menu-header').style.display = 'block';
    }
    function CloseMenu() {
        document.querySelector('.menu-header').style.display = 'none';
    }
        
    return (
        <>
            <div className="menu-header">
                <i onClick={CloseMenu} className="fa-solid fa-xmark"></i>
                    <div className="Top-Menu">
                        <img src={localStorage.getItem('p')} alt='Imagem do perfil do usuário' />
                        <div><h1>Olá, {localStorage.getItem('n')}!</h1>
                        <p>{localStorage.getItem('e')}</p></div>
                    </div>
                    <div className='Middle-Menu'>
                        <div className='icons-middle-menu'>
                            <label onClick={gotoIndex}><i className="fa-solid fa-house"></i> Página Inicial</label>
                            <label onClick={gotoRotina}><i className="fa-solid fa-calendar"></i> Rotina</label>
                            <label onClick={gotoAcademia}><i className="fa-solid fa-dumbbell"></i> Academia</label>
                            <label onClick={gotoHidratacao}><i className="fa-solid fa-droplet"></i> Hidratação</label>
                            <label onClick={gotoProlepse}><i className="fa-solid fa-bolt"></i> Prolepse</label>
                            <label onClick={gotoConfig}><i className="fa-solid fa-gear"></i> Ajustes</label>
                        </div>

                    </div>
                    <div className="Bottom-Menu">
                        <button className='btn-signout' onClick={signOutUser}>Finalizar sessão</button>
                    </div>
            </div>

                <header className="App-header">
                    <div className='Start-LOGO' onClick={gotoIndex}>
                        <h1><i>START</i></h1>
                    </div>
                    <div className='middlesideheader'>
                        <div className='iconsmiddleheader'>
                            <div onClick={gotoIndex}>
                                <label>Início</label>
                            </div>
                            <div onClick={gotoRotina}>
                                <label>Rotina</label>
                            </div>
                            <div onClick={gotoAcademia}>
                                <label>Academia</label>
                            </div>
                            <div onClick={gotoHidratacao}>
                                <label>Hidratação</label>
                            </div>
                            <div onClick={gotoProlepse}>
                                <label>Prolepse</label>
                            </div>
                        </div>
                    </div>
                    <div className='leftside'>
                        <>
                            <i onClick={OpenMenu} className="fa-solid fa-bars openmenu"></i>
                            <img onClick={gotoConfig} className='imgtop' alt='Imagem de perfil do usuário' src={localStorage.p} />
                        </>
                    </div>
                </header>
        </>
    );
}

export default HeaderApp;