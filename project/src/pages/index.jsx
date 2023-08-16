
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
    let imgsrc
    let imgsrcpc
    let random = Math.floor(Math.random() * (6 - 1) + 1)
    if(random == 1) {
      
    imgsrc='./imgs/banner-index.webp'
    imgsrcpc="./imgs/banner-index-pc.webp"
      
      
    }
    else if(random == 2) {
      imgsrcpc='https://img.freepik.com/free-photo/3d-rendering-modern-loft-gym-fitness_105762-2020.jpg?w=1380&t=st=1692154465~exp=1692155065~hmac=2602c88ec2d51990045b28e3db1b0890e5fee45b6279f176ce0e38d1dc973668'
      imgsrc='https://img.freepik.com/free-photo/3d-rendering-modern-loft-gym-fitness_105762-2020.jpg?w=1380&t=st=1692154465~exp=1692155065~hmac=2602c88ec2d51990045b28e3db1b0890e5fee45b6279f176ce0e38d1dc973668'
    }
    else if(random == 3) {
      imgsrcpc='https://img.freepik.com/free-photo/cast-iron-dumbbell-weights_1048-11523.jpg?w=1380&t=st=1692155278~exp=1692155878~hmac=99a116287ab3f97ce1acca63f3a38d5bd16d4a9f9444a666e44e1c924af31591'
      imgsrc='https://img.freepik.com/free-photo/cast-iron-dumbbell-weights_1048-11523.jpg?w=1380&t=st=1692155278~exp=1692155878~hmac=99a116287ab3f97ce1acca63f3a38d5bd16d4a9f9444a666e44e1c924af31591'
    }
    else if(random == 4) {
      imgsrcpc="https://img.freepik.com/free-photo/unfocused-gym-with-big-windows_1203-1702.jpg?w=1380&t=st=1692155470~exp=1692156070~hmac=631982b219e64b3d448dcdccc459667dcbf10d9a279d2df028088add83b0fda1"
      imgsrc="https://img.freepik.com/free-photo/unfocused-gym-with-big-windows_1203-1702.jpg?w=1380&t=st=1692155470~exp=1692156070~hmac=631982b219e64b3d448dcdccc459667dcbf10d9a279d2df028088add83b0fda1"
    }
    else if(random == 5) {
      imgsrcpc="https://img.freepik.com/free-photo/close-up-black-dumbbell-gym_23-2147827464.jpg?w=740&t=st=1692155540~exp=1692156140~hmac=b55ae465ed0d9b93e4443ba99e095fb080b70e5ea86b9ae045950dabc3255af8"
      imgsrc="https://img.freepik.com/free-photo/close-up-black-dumbbell-gym_23-2147827464.jpg?w=740&t=st=1692155540~exp=1692156140~hmac=b55ae465ed0d9b93e4443ba99e095fb080b70e5ea86b9ae045950dabc3255af8"
    }

    
  
    return (
    <div className="App">
      <HeaderApp />
      <section className='banner-index-pc'>
        <img src={imgsrcpc} alt='Banner academia'></img>
      </section>
      <section className='banner-index'>
        <img src={imgsrc} alt='Banner academia'></img>
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