import React, { useCallback } from 'react';

/* ANOTHER IMPORTS*/
import HeaderApp from '../components/HeaderApp';
import { app, auth } from '../systemlogin';
import { json } from 'react-router-dom';
import Swal from 'sweetalert2'
import RotinaPage from './rotina';

import { useState, useEffect } from 'react';

function getIdPost() {
    var urlId = new URLSearchParams(window.location.search)
    if(urlId.get('id') == 'null') {
        window.location.href = window.location.origin + '/'
    }
    return urlId.get('id')
}

export const PostPage = () => {
    const [postsfixed, SetPublicacao] = useState([]);
    const id = getIdPost();
    app.firestore()
    .collection("publicacoes")
    .doc(id)
    .get()
    .then(p => {
        function Publicacoes() {
            SetPublicacao(p.data())
        }
        Publicacoes()
      }, []);
        return(
           <>
            {postsfixed != undefined ? 

                <div className='post-content'>
                    <div className="top-post-content">
                        <div className="leftside-post-top">
                            <img src={postsfixed.userphoto} alt="Imagem do usuário" />
                            <h1>{postsfixed.name}</h1>
                        </div>
                        <div className="rightside-post-top">
                            <p>OPTIONS</p>
                        </div>
                    </div>
                    <div className="middle-post-content">
                        
                    </div>
                    <div className="bottom-post-content">
                        {postsfixed.curtidas}
                    </div>
                </div>
                
            :
            window.location.href = window.location.origin + '/'
            }
            </>
        )
}

export default PostPage