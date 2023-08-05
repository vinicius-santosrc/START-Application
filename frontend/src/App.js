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
            <img className='landingpageback' src='./imgs/frame-landing-page-mobile.png'>
            </img>
          </div>
          <div className="title">
            <h1>START</h1>
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
      <HeaderApp />
      <section className='banner-index'>
        <img src='./imgs/banner-index.png'></img>
      </section>
      <section className='bottom-section-index'>
        <h2>PROGRESS</h2>
        <div className='CardsChoices'>
          <div className='Card'>
            <h3>ROTINA</h3>
            <i className="fa-solid fa-calendar"></i>
          </div>
          <div className='Card'>
            <h3>ACADEMIA</h3>
            <i className="fa-solid fa-dumbbell"></i>
          </div>
          <div className='Card'>
            <h3>HIDRATAÇÃO</h3>
            <i className="fa-solid fa-droplet"></i>
          </div>
          <div className='Card'>
            <h3>PROLEPSE</h3>
            <i className="fa-solid fa-bolt"></i>
          </div>
        </div>
      </section>
      <div className='bottom-bar'>
        <div className='icon'>
          <i className="fa-solid fa-calendar"></i>
          <h3>ROTINA</h3>
        </div>

        <div className='icon'>
          <i className="fa-solid fa-dumbbell" onClick={GymPage}></i>
          <h3>ACADEMIA</h3>
        </div>

        <div className='icon'>
          <i className="fa-solid fa-droplet"></i>
          <h3>HIDRATAÇÃO</h3>
        </div>

        <div className='icon'>
          <i className="fa-solid fa-bolt"></i>
          <h3>PROLEPSE</h3>
        </div>

        <div className='icon'>
          <i className="fa-solid fa-gear"></i>
          <h3>AJUSTES</h3>
        </div>

      </div>
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
            <img src="https://www.nicepng.com/png/detail/73-730154_open-default-profile-picture-png.png" />
          </div>
        </div>
      </header>
      <BottomBar />
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
