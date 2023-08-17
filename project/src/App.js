import './App.css';

/* REACT IMPORTS*/
import React, { useEffect, useState } from 'react';


/* FIREBASE IMPORTS*/
import { auth, provider, signInWithPopup, app } from './systemlogin';


/* ANOTHER IMPORTS*/
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Loadscreen, Hideload} from './components/Loadscreen';

/* PAGES */
import IndexPage from './pages/index'
import SettingsPage from './pages/settings'
import AcademiaPage from './pages/academia'
import HidratacaoPage from './pages/hidratacao'
import ProlepsePage from './pages/prolepse'
import RotinaPage from './pages/rotina'
import RotinaAuto from './pages/rotina-auto';
import PostPage from './pages/post';

function LoginPage() {
  const [i_ison, setUserOn] = useState('')
  const SignWithGoogle =()=> {
    signInWithPopup(auth, provider).then((i) => {
     window.location.reload()})
  };


  useEffect(() => {
    auth.onAuthStateChanged(function (u) {
      setUserOn(u)
    })
  })

  if(i_ison == null) {
    return (
      <div>
        { i_ison ?
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<IndexPage />} />
              <Route path="/academia" element={<AcademiaPage />} />
              <Route path="/hidratacao" element={<HidratacaoPage />} />
              <Route path="/prolepse" element={<ProlepsePage />} />
              <Route path="/rotina" element={<RotinaPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/rotina-auto" element={<RotinaAuto />} />
              <Route path="/post" element={<PostPage />} />
          </Routes>

        </BrowserRouter> 
        :
        <>
  
            <div className="content-login-page">
              <div>
                <img className='landingpagebackpc' src='./imgs/landingpage-pc-backingground.webp' alt='Background treino'/>
                <img className='landingpageback' src='./imgs/landingpage-cell-backingground.webp' alt='Background treino'/>
              </div>
              <div className="title">
                <h1><i>START</i></h1>
                <p><i>SEJA BEM VINDO (A) </i></p>
              </div>
              <div className='googlesignin' onClick={SignWithGoogle}>
                <div>
                  <img src="https://img.freepik.com/icones-gratis/google_318-258888.jpg" alt='Logo da Google'></img>
                </div>
                <div>
                  <label>Entrar com o Google</label>
                </div>
              </div>
            </div>
        </>
      }
      </div>
    )
  } else {
    return (
      <div>
        <Loadscreen />
        { i_ison ?
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<IndexPage />} />
              <Route path="/academia" element={<AcademiaPage />} />
              <Route path="/hidratacao" element={<HidratacaoPage />} />
              <Route path="/prolepse" element={<ProlepsePage />} />
              <Route path="/rotina" element={<RotinaPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/rotina-auto" element={<RotinaAuto />} />
              <Route path="/post" element={<PostPage />} />
          </Routes>
          <Hideload />
        </BrowserRouter> 
        
        :
        <>
            <div className="content-login-page">
              <div>
                <img className='landingpagebackpc' src='./imgs/landingpage-pc-backingground.webp' alt='Background treino'/>
                <img className='landingpageback' src='./imgs/landingpage-cell-backingground.webp' alt='Background treino'/>
              </div>
              <div className="title">
                <h1><i>START</i></h1>
                <p><i>SEJA BEM VINDO (A) </i></p>
              </div>
              <div className='googlesignin' onClick={SignWithGoogle}>
                <div>
                  <img src="https://img.freepik.com/icones-gratis/google_318-258888.jpg" alt='Logo da Google'></img>
                </div>
                <div>
                  <label>Entrar com o Google</label>
                </div>
              </div>
            </div>
        </>
      }
      </div>
    )
  }
};
export default LoginPage;
