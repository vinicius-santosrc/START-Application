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
        if(rotinas) {
            showrotinas(rotinas)
        }
        if(rotinas.length == 0) {
            document.querySelector('.rotinasmobile').style.display = 'none';document.querySelector('.rotinas-pc').style.display = 'none'
        }
    }).catch(e => {
        console.log('ERRO AO CARREGAR/ CONSULTE UM DESENVOLVEDOR / erro: ' + e)
    })
}

function showrotinas(rotinas) {
    const divrotinas = document.querySelector('.db-rotinas')
    
    rotinas.forEach(rotinas => {
        const divinside = document.createElement('div')
        divinside.setAttribute('class', 'rotina')
        const divleft = document.createElement('div')
        divleft.setAttribute('class', 'left-side-button-rotina')

        const li = document.createElement('li');
        li.classList.add('right-side-button-rotina')

        const name = document.createElement('h2');
        name.innerHTML = rotinas.name
        divleft.appendChild(name);

        const desc = document.createElement('p');
        desc.innerHTML = rotinas.description
        divleft.appendChild(desc);

        const date = document.createElement('p');
        date.innerHTML = formatDate(rotinas.date)
        divleft.appendChild(date);

        const rotina_list = document.createElement('li')

        const insiderotinalist = document.createElement('div')
        insiderotinalist.setAttribute('class', 'listofrotinas')
        rotina_list.appendChild(insiderotinalist)

        divinside.addEventListener('click', () => {
            if(document.querySelector('.rotina_item') == null) {
                loadrotinas()
            }
            else {
                document.querySelector('.listofrotinas').innerHTML = ''
            }
        })

        li.appendChild(rotina_list)
        divinside.appendChild(divleft)
        divinside.appendChild(li)

        divrotinas.appendChild(divinside)


        function loadrotinas() {
            let dr = document.createElement('div')

            dr.setAttribute('class', 'rotina_item')
            dr.innerHTML = JSON.stringify(rotinas.rotina)
            insiderotinalist.appendChild(dr)
            
        }
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
                <div className='flex-box-rotinas'>
                    <div> 
                    <div className='rotinasmobile'>
                                <h2>Suas rotinas</h2>
                                <div className='db-rotinas'>
                                    
                                </div>
                            </div>
                    </div>
                    <div className='left-side-page'>
                        <div className='title-page'>
                            <i className="fa-regular fa-calendar"></i>
                            <h1>Rotina</h1>
                        </div>
                        <div className="content-page-middle">
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
        </div>
    )
}

export default RotinaPage;