import React, { createElement } from 'react';
import HeaderApp from '../components/HeaderApp';
import { app, auth } from '../lib/firebase';
import { json } from 'react-router-dom';
import Swal from 'sweetalert2'


function SettingsPage() {
    return (
        <div className="App">
            <HeaderApp />
            <div className='account-page'>
                <img src={app.auth().currentUser.photoURL} alt="Foto do usuário" />
                <h1>{app.auth().currentUser.displayName}</h1>
                <p>{app.auth().currentUser.email}</p>
                <div className='options-account-page'>
                    <a href=""><label><i className="fa-solid fa-address-card"></i> Informações Pessoais</label></a>
                    <a href=""><label><i className="fa-solid fa-key"></i> Segurança da conta</label></a>
                    <a href=""><label><i className="fa-solid fa-circle-minus"></i> Desativar minha conta</label></a>
                    <a href=""><label><i className="fa-solid fa-trash-can"></i> Excluir minha conta</label></a>
                </div>
            </div>
        </div>
    )
}

export default SettingsPage;