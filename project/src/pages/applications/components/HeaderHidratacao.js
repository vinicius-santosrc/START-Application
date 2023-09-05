import React from 'react';
import { auth, provider, signInWithPopup, app } from '../../../lib/firebase';


function openbarprolepse() {
    document.querySelector(".navbarheaderprolepse").style.display="block";
}

function closeprolepse() {
    document.querySelector(".navbarheaderprolepse").style.display="none";
}

function gotoHomePage() {
    window.location.href=window.location.origin
}


export default function HeaderHidratacao() {
    return(
        <>
        <div className='flex-header-application-prolepse'>
            <i onClick={openbarprolepse} className="fa-solid fa-bars"></i>
            <h1>START</h1>
            <img id="imageprofileheader" src={auth.currentUser.photoURL} />
        </div>
        <div className='pc-header-flexbox-prolepse'>
            <h1>STARTWATER</h1>

            <i onClick={openbarprolepse} className="fa-solid fa-bars"></i>
        </div>
        <div className='navbarheaderprolepse'>
            <div className='headernavbarprolepse'>
                <i onClick={closeprolepse} class="fa-solid fa-xmark"></i>
                <h1>START</h1>
                <i></i>
            </div>
           
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

