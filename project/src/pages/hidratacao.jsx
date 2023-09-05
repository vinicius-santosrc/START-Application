/* REACT IMPORTS*/
import React, { useEffect, useState } from 'react';
/* FIREBASE IMPORTS*/
import { auth, provider, signInWithPopup, app } from '../lib/firebase';

/* ANOTHER IMPORTS*/
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeaderApp from '../components/HeaderApp';
import {Loadscreen, Hideload} from '../components/Loadscreen';
import Swal from 'sweetalert2'
import '../App.css';

function gotoHidratacaoPage() {
    window.location.href = window.location.origin + '/application/hidratacao'
}

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
                            <i className="fa-solid fa-droplet"></i>
                            <h1>HIDRATAÇÃO</h1>
                        </div>
                        <div className="content-page-middle">
                            <div className='button-info-ativar'>
                                <button onClick={gotoHidratacaoPage}>ACESSAR</button>
                                <p>Defina uma quantidade diária para beber água.</p>
                            
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HidratacaoPage;