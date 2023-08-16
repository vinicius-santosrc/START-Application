
/* REACT IMPORTS*/
import React, { useCallback } from 'react';

/* ANOTHER IMPORTS*/
import HeaderApp from '../components/HeaderApp';
import { app, auth } from '../systemlogin';
import { json } from 'react-router-dom';
import Swal from 'sweetalert2'
import toHtml from 'string-to-html';

import { useState, useEffect } from 'react';


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


export const Loadposts = () => {
  const [postsofusers, setPublic] = useState([]);
  app.firestore()
  .collection('publicacoes')
  .orderBy('date', 'desc')
  .get()
  .then(s => {
    const Publicacoes = async () => {
      setPublic(
        s.docs.map((postagens => ({
          ...postagens.data(),
          docuid: postagens.id
      })))
    )}
    Publicacoes()
  }, []);
  return(
    <div>
      
    {postsofusers.map(i => {
      function gotoRotina() {
        window.location.href= window.location.origin + '/rotina?uid=' + i.post.uid
      }
      function deletethispost() {
        app.firestore()
        .collection('publicacoes')
        .doc(i.docuid)
        .delete()
        .then(
          Swal.fire(
            'Deletada!',
            'Publicação excluída com sucesso.',
            'success'
          )
        )
      }
      return(
        <div className="posts">
        <div className="toppost">
          <div className="toppost-1">
          <img src={i.userphoto} />
            <div className="toppost-2">
              <h1>{i.name}</h1>
              </div>
          </div>
          <div>
            {i.uid == app.auth().currentUser.uid ? <i onClick={deletethispost} className="fa-solid fa-trash"></i> : <i></i>}
          </div>
        </div>
        <div className="middle-post" onClick={
          gotoRotina
        }>
        <div className="component-rotina-compartilhada">
          <h1>{i.post.name}</h1>
           <p>{i.post.desc}</p>
           <table className="tabela-rotina">
              <button><i className="fa-solid fa-list"></i> VISUALIZAR A ROTINA COMPARTILHADA</button>
            </table>
          </div>        
        </div>
        <div className="bottom-post">
        <div>
          <button className="curtirrotina"><i className="fa-regular fa-heart"></i> {i.curtidas}</button>
          <button className="saverotina"><i className="fa-solid fa-floppy-disk"> </i></button>
      </div>
        </div>
        
      </div>
      )
    })}
  </div>
  )
}

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
          <Loadposts />
        </div>
      </section>

    </div>
    )
}

export default IndexPage;