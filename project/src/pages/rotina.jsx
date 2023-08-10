import React, { createElement } from 'react';
import HeaderApp from '../components/HeaderApp';
import { app, auth } from '../systemlogin';
import { json } from 'react-router-dom';


function organizarrotina() {
    alert('button organize sua rotina')
}

function buttonrotinaauto() {
    alert('button rotina auto')
}

app.auth().onAuthStateChanged(u => {
    if(u) {
        adicionarotinasexistentes(u)
    }
})

function adicionarotinasexistentes(u) {
    app.firestore()
    .collection("rotinas")
    .where('user.uid', '==', u.uid)
    .orderBy('date', 'desc')
    .get()
    .then(s => {
        const rotinas = s.docs.map(doc => doc.data())
        console.log(rotinas)
        if(rotinas) {
            showrotinas(rotinas)
        }
        if(rotinas.length == 0) {
            document.querySelector('.rotinasmobile').style.display = 'none'
        }
    }).catch(e => {
        console.log('ERRO AO CARREGAR/ CONSULTE UM DESENVOLVEDOR / erro: ' + e)
    })
}

function showrotinas(rotinas) {
    const divrotinas = document.querySelector('.db-rotinas')
    
    rotinas.forEach(rotinas => {
        const li = document.createElement('li');
        li.classList.add('rotina')

        const name = document.createElement('h2');
        name.innerHTML = rotinas.name
        li.appendChild(name);

        const date = document.createElement('p');
        date.innerHTML = formatDate(rotinas.date)
        li.appendChild(date);
        console.log(date)

        const rotina_list = document.createElement('li');
        rotina_list.innerHTML = rotinas.rotina
        li.appendChild(rotina_list);
        console.log(JSON.stringify(rotinas.rotina))

        divrotinas.appendChild(li)
    })

}

function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-br')
}

function RotinaPage() {
    return (
        <div className="App">
            <HeaderApp />
            <div className='contents-page'>
                <div className='background-page'>
                    <img src="./imgs/rotina-page-banner.webp" alt='fundo academia'/>
                </div>
                <div className='left-side-page'>
                    <div className='title-page'>
                        <i className="fa-regular fa-calendar"></i>
                        <h1>Rotina</h1>
                    </div>
                    <div className="content-page-middle">
                        <div className='rotinasmobile'>
                            <h2>Suas rotinas</h2>
                            <div className='db-rotinas'>
                                
                            </div>
                        </div>
                        <div className='button-info'>
                            <button onClick={organizarrotina}>ORGANIZE SUA ROTINA</button>
                            <p>Crie sua rotina de acordo com as importâncias de cada tarefa. </p>
                        </div>
                        <div className='button-info'>
                            <button onClick={buttonrotinaauto}>ROTINA AUTOMÁTICA</button>
                            <p>A aplicação irá desenvolver uma rotina otimizada para você. </p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RotinaPage;