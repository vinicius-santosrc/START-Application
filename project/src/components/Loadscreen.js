import React from "react"

function Loadscreen() {
  return(
    <div className="loading">
        <h1>START</h1>
        <div className="inner-circle-loading"></div>
    </div>
  )
}

function Hideload() {
    const loading = document.querySelector('.loading')
    loading.style.display = 'none'

}

export  {Loadscreen, Hideload}