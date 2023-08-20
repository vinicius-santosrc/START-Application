/* REACT IMPORTS*/
import React, { useEffect, useState } from 'react';
/* FIREBASE IMPORTS*/
import { auth, provider, signInWithPopup, app } from '../systemlogin';

/* ANOTHER IMPORTS*/
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeaderApp from '../components/HeaderApp';
import {Loadscreen, Hideload} from '../components/Loadscreen';
import Swal from 'sweetalert2'
import '../App.css';

let date = new Date
let hora = date.getHours()

if(localStorage.getItem('notify') == 'true') {
    Notification.requestPermission().then(perm => {
        if(perm === 'granted') {
            if(hora % 2 == 0) {
                if (cont != 1) {
                    let notification = new Notification('Hora de se hidratar 💧', {
                        body: `Beba ${localStorage.getItem('water')}ml de água.`,
                        icon: "favicon.ico"
                    })
                }
                let cont = 1
            }
        }
        else if (perm === 'denied') {
            if(localStorage.getItem('ignoremsgnot') == 'true') {
                
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Parece que você desativou nossas notificações.',
                    footer: '<a href="">Como eu posso resolver isso?</a>'
                }).then(() => {
                    localStorage.setItem('ignoremsgnot', 'true')
                })
            }
        }
    })
}

function ativarnotificacoes() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: true
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Deseja ativar as notificações?',
        text: "Você será notificado a cada 2 horas para tomar água.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ATIVAR',
        cancelButtonText: 'CANCELAR',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
        localStorage.setItem('notify', 'true')
          swalWithBootstrapButtons.fire(
            'Sucesso!',
            'Você ativou as notificações.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
        }
      })
}

function desativarnotifications() {

} 
if(localStorage.getItem('water') == null) {
    localStorage.setItem('water', 200)
}

function changewater () {
    localStorage.setItem('water', document.querySelector('#quantwater').value)
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
                            <i className="fa-regular fa-calendar"></i>
                            <h1>HIDRATAÇÃO</h1>
                        </div>
                        <div className="content-page-middle">
                            <div className='button-info-ativar'>
                                <button onClick={ativarnotificacoes}>ATIVAR NOTIFICAÇÕES</button>
                                <p>Defina um horário para receber notificações para se hidratar.</p>
                                <p>Desejo receber notificações para beber {localStorage.getItem('water')}ml de água</p>
                                <h2>Mudar quantidade de água: 
                                <select onChange={changewater} name="" id="quantwater">
                                    <option value="100">100ml</option>
                                    <option value="200" selected>200ml (padrão)</option>
                                    <option value="300">300ml</option>
                                    <option value="400">400ml</option>
                                    <option value="500">500ml</option>
                                    <option value="700">700ml</option>
                                    <option value="1000">1000ml</option>
                                    </select>
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HidratacaoPage;