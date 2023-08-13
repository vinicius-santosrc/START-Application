
/* REACT IMPORTS*/
import React from 'react';

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


function criarpostagem() {
  document.querySelector('.postagem-show').style.display = 'none'
  document.querySelector('.createpost').style.display = 'block'

  let postagem = document.querySelector('.postagem').value
  let loc = document.querySelector('.loc').value
  let desc = document.querySelector('.desc').value

  if(postagem == '' || loc == '' || desc == '' ) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Insira todos os dados.',
    })
  }
  else {
    const date = new Date
    const ano = date.getFullYear()
    const mes = date.getMonth()
    const dia = date.getDate()
    const horas = date.getHours()

    const dataatual = horas + '-' + dia + '-' + mes + '-' + ano

    const newpost = {
      userphoto: auth.currentUser.photoURL,
      name: auth.currentUser.displayName,
      uid: auth.currentUser.uid,
      loc: loc,
      post: postagem,
      description: desc,
      date: dataatual
    }

    app.firestore()
    .collection("publicacoes")
    .add(newpost)
    .then(s => {
      Swal.fire('Sucesso!', 'Você criou sua postagem', 'success')
      window.location.reload()
    })
  }
}

function loadposts() {
  let output = ''

  app.firestore()
  .collection('publicacoes')
  .orderBy('date')
  .get()
  .then(s => {
    let publicacoes = s.docs.map(postagem => ({
      ...postagem.data()
    }))

    publicacoes.forEach((i) => {
      output += `
      <div class="posts">
        <div class="toppost">
          <div class="toppost-1">
          <img src="${i.userphoto}" />
            <div class="toppost-2">
              <h1>${i.name}</h2>
              <p>${i.loc}</p></div>
          </div>
          <div>
            <i class="fa-solid fa-ellipsis"></i>
          </div>
        </div>
        <div class="middle-post">
          <p>${i.post}</p>
        </div>
        <div class="bottom-post">
          <p>Criado por <b>${i.name}</b> no dia: ${i.date}</p>
          <p><b>Descrição:</b> ${i.description}</p>  
        </div>
        
      </div>`
    })
      
  document.querySelector('.feed-posts').innerHTML = output
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
        <button className='createpost' onClick={abrirpostagem}>Criar uma postagem <i class="fa-solid fa-plus"></i></button>
        <div className='postagem-show'>
          <input type="text" className='postagem' placeholder='Postagem' />
          <input type="text" className="loc" placeholder='Localizacao' />
          <input type="text" className="desc" placeholder='Descrição' />
          <button onClick={criarpostagem}>Criar sua postagem</button>
        </div>

        <div className='feed-posts'>

        </div>
      </section>

    </div>
    )
}

export default IndexPage;