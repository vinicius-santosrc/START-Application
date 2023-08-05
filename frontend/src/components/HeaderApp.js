import React from 'react';
import { auth, signOutUser } from '../systemlogin';

function HeaderApp() {
    function OpenMenu() {
        document.querySelector('.menu-header').style.display = 'block';
    }
    function CloseMenu() {
        document.querySelector('.menu-header').style.display = 'none';
    }
        
    
    return (
        <>
            <div className="menu-header">
                <i onClick={CloseMenu} class="fa-solid fa-xmark"></i>
                    <div className="Top-Menu">
                        <img src={localStorage.getItem('p')} />
                        <div><h1>Olá, {localStorage.getItem('n')}!</h1>
                        <p>{localStorage.getItem('e')}</p></div>
                    </div>
                    <div className="Middle-Menu">
                        <a className='btn-signout' onClick={signOutUser}>Finalizar sessão</a>
                    </div>
            </div>

                <header className="App-header">
                    <div className='Start-LOGO'>
                        <h1><i>START</i></h1>
                    </div>
                    <div className='leftside'>
                        <>
                            <i onClick={OpenMenu} class="fa-solid fa-bars"></i>
                        </>
                    </div>
                </header>
        </>
    );
}


export default HeaderApp;