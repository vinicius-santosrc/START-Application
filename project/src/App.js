import './App.css';

/* REACT IMPORTS*/
import React, { useEffect, useState } from 'react';

/* FIREBASE IMPORTS*/
import { auth, provider, signInWithPopup } from './systemlogin';


/* ANOTHER IMPORTS*/
import BottomBar from './components/BottomBar';
import HeaderApp from './components/HeaderApp';


function LoginPage() {
  const [i_email, setMail] = useState('')
  const [i_name, setName] = useState('')
  const [i_photo, setPhoto] = useState('')
  const SignWithGoogle =()=> {
    signInWithPopup(auth, provider).then((i) => {
      setMail(i.user.email)
      setName(i.user.displayName)
      setPhoto(i.user.photoURL)
      localStorage.setItem('e', i.user.email)
      localStorage.setItem('n', i.user.displayName)
      localStorage.setItem('p', i.user.photoURL)
    })
  };

  useEffect(() => {
    setMail(localStorage.getItem('e'))
    setName(localStorage.getItem('n'))
    setPhoto(localStorage.getItem('p'))
  })

  return (
    <div>
      {i_email && i_name && i_photo ? IndexPage() :
        <div className="content-login-page">
          <div>
            <img className='landingpagebackpc' src='./imgs/landingpage-pc-backingground.webp' />
            <img className='landingpageback' src='./imgs/landingpage-cell-backingground.webp' />
          </div>
          <div className="title">
            <h1><i>START</i></h1>
            <p><i>SEJA BEM VINDO (A) </i></p>
          </div>
          <div className='googlesignin' onClick={SignWithGoogle}>
            <div>
              <img src="https://img.freepik.com/icones-gratis/google_318-258888.jpg"></img>
            </div>
            <div>
              <label>Entrar com o Google</label>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

function SignWithFacebook() {
  alert('Facebook Pop-Up')
}

function IndexPage() {
  return (
    <div className="App">
      <HeaderApp/>
      <section className='banner-index-pc'>
        <img src='./imgs/banner-index-pc.webp'></img>
      </section>
      <section className='banner-index'>
        <img src='./imgs/banner-index.webp'></img>
        <button className='btn-index-mobile'><i>COMECE AGORA</i></button>
      </section>
      <section className='bottom-section-index'>
        <h2>PROGRESS</h2>
        <div className='CardsChoices'>
          <div className='Card'>
            <div className='Cardinfos'>
              <h3>ROTINA</h3>
              <p>Organize sua rotina de forma apropriada.</p>
            </div>
            <i className="fa-solid fa-calendar"></i>
          </div>
          <div className='Card'>
          <div className='Cardinfos'>
              <h3>ACADEMIA</h3>
              <p>Faça seus treinos.</p>
            </div>
            <i className="fa-solid fa-dumbbell"></i>
          </div>
          <div className='Card'>
          <div className='Cardinfos'>
              <h3>HIDRATAÇÃO</h3>
              <p>Configure do seu modo.</p>
            </div>
            <i className="fa-solid fa-droplet"></i>
          </div>
          <div className='Card'>
          <div className='Cardinfos'>
              <h3>PROLEPSE</h3>
              <p>Modo sem distrações.</p>
            </div>
            <i className="fa-solid fa-bolt"></i>
          </div>
        </div>
      </section>

    </div>
  );
}

function GymPage() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='Start-LOGO'>
          <h1><i>START</i></h1>
        </div>
        <div className='leftside'>
          <div>
            <img src="https://www.nicepng.com/png/detail/73-730154_open-default-profile-picture-png.webp" />
          </div>
        </div>
      </header>

    </div>
  );
}

function HidratacaoPage() {

}

function ProlepsePage() {

}

function SettingsPage() {

}

export default LoginPage;
