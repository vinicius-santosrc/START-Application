
/* REACT IMPORTS*/
import React, { useCallback } from 'react';

/* ANOTHER IMPORTS*/
import HeaderApp from '../components/HeaderApp';
import { app, auth } from '../systemlogin';
import { json } from 'react-router-dom';
import Swal from 'sweetalert2'


function gotoRotina() {
  window.location.href = window.location.origin + '/rotina'
}

function gotoAcademia() {
  window.location.href = window.location.origin + '/academia'
}

function gotoProlepse() {
  window.location.href = window.location.origin + '/prolepse'
}

function gotoHidratacao() {
  window.location.href = window.location.origin + '/hidratacao'
}


function loadposts() {
  let output = ''

  app.firestore()
  .collection('publicacoes')
  .orderBy('date', 'desc')
  .get()
  .then(s => {
    let publicacoes = s.docs.map(postagem => ({
      ...postagem.data(),
      docuid: postagem.id
    }))
    publicacoes.forEach((i) => {
      output += `
      <div class="posts">
        <div class="toppost">
          <div class="toppost-1">
          <img src="${i.userphoto}" />
            <div class="toppost-2">
              <h1>${i.name}</h2>
              </div>
          </div>
          <div>
            ${i.uid == app.auth().currentUser.uid ? '<i class="fa-solid fa-trash"></i>' : '<i></i>'}
          </div>
        </div>
        <div class="middle-post">
          <p>${i.post}</p>
        </div>
        <div class="bottom-post">
        <div>
          <button class="curtirrotina"><i class="fa-regular fa-heart"></i> ${i.curtidas}</button>
          <button class="saverotina"><i class="fa-solid fa-floppy-disk"> </i></button>
       </div>
        </div>
        
      </div>`
    })
    if(window.location.href == window.location.origin + '/') {
      document.querySelector('.feed-posts').innerHTML = output
      
      function observemsg(callback) {
        app.firestore()
        .collection('publicacoes').onSnapshot(callback)
      }

      observemsg()
    }
    
    
  })
  
}

loadposts()

function abrirpostagem() {
  document.querySelector('.postagem-show').style.display = 'block'
  document.querySelector('.createpost').style.display = 'none'
}

function IndexPage() {
    return (
      
    <div className="App">
      <HeaderApp />
      <section className='banner-index-pc'>
        <img src='./imgs/banner-index-pc.webp' alt='Banner academia'></img>
      </section>
      <section className='banner-index'>
        <img src='./imgs/banner-index.webp' alt='Banner academia'></img>
        <button onClick={gotoRotina} className='btn-index-mobile'><i>COMECE AGORA</i></button>
      </section>
  
      <section className='bottom-section-index'>
        <h2>PROGRESS</h2>
        <div className='CardsChoices'>
          <div className='Card' onClick={gotoRotina}>
            <div className='Cardinfos'>
              <h3>ROTINA</h3>
              <p>Organize sua rotina de forma apropriada.</p>
            </div>
            <i className="fa-solid fa-calendar"></i>
          </div>
          <div className='Card' onClick={gotoAcademia}>
            <div className='Cardinfos'>
              <h3>ACADEMIA</h3>
              <p>Faça seus treinos.</p>
            </div>
            <i className="fa-solid fa-dumbbell"></i>
          </div>
          <div className='Card' onClick={gotoHidratacao}>
            <div className='Cardinfos'>
              <h3>HIDRATAÇÃO</h3>
              <p>Configure do seu modo.</p>
            </div>
            <i className="fa-solid fa-droplet"></i>
          </div>
          <div className='Card' onClick={gotoProlepse}>
            <div className='Cardinfos'>
              <h3>PROLEPSE</h3>
              <p>Modo sem distrações.</p>
            </div>
            <i className="fa-solid fa-bolt"></i>
          </div>
        </div>
      </section>
      <section className='bottom-section-index-2'>
        <h2>POSTAGENS</h2>
        <div className='feed-posts'>

        </div>
      </section>

    </div>
    )
}

export default IndexPage;