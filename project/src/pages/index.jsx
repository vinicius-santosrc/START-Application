
/* REACT IMPORTS*/
import React from 'react';

/* ANOTHER IMPORTS*/
import HeaderApp from '../components/HeaderApp';

function gotoRotina() {
  window.location.href = window.location.origin + '/rotina'
}

function gotoAcademia() {
  window.location.href = window.location.origin + '/academia'
}

function gotoProlepse() {
  window.location.href = window.location.origin + '/prolepse'
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
          <div className='Card' onClick={gotoAcademia}>
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

    </div>
    )
}

export default IndexPage;