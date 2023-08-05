import React from 'react';
import { auth, signOutUser } from '../systemlogin';

function HeaderApp(props) {
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
                        <img src={localStorage.getItem('p')} />
                        <div><h1>Olá, {localStorage.getItem('n')}!</h1>
                        <p>{localStorage.getItem('e')}</p></div>
                    </div>
                    <div className='Middle-Menu'>
                        <div className='icons-middle-menu'>
                            <label><i className="fa-solid fa-house"></i> Página Inicial</label>
                            <label><i className="fa-solid fa-calendar"></i> Rotina</label>
                            <label><i className="fa-solid fa-dumbbell"></i> Academia</label>
                            <label><i className="fa-solid fa-droplet"></i> Hidratação</label>
                            <label><i className="fa-solid fa-bolt"></i> Prolepse</label>
                        </div>

                    </div>
                    <div className="Bottom-Menu">
                        <a className='btn-signout' onClick={signOutUser}>Finalizar sessão</a>
                    </div>
            </div>

                <header className="App-header">
                    <div className='Start-LOGO'>
                        <h1><i>START</i></h1>
                    </div>
                    <div className='middlesideheader'>
                        <div className='iconsmiddleheader'>
                            <div>
                                <label>Início</label>
                            </div>
                            <div>
                                <label>Rotina</label>
                            </div>
                            <div>
                                <label>Academia</label>
                            </div>
                            <div>
                                <label>Hidratação</label>
                            </div>
                            <div>
                                <label>Prolepse</label>
                                </div>
                        </div>
                    </div>
                    <div className='leftside'>
                        <>
                            <i onClick={OpenMenu} className="fa-solid fa-bars openmenu"></i>
                            <img className='imgtop' src={localStorage.p} />
                        </>
                    </div>
                </header>
        </>
    );
}


export default HeaderApp;