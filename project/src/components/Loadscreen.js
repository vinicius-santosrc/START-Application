import React from "react"
import { Ring } from '@uiball/loaders'
function Loadscreen() {
  return(
    <div className="loading">
        <h1>START</h1>
        <Ring 
        size={40}
        lineWeight={5}
        speed={2} 
        color="white" 
        />
    </div>
  )
}

function Hideload() {
    const loading = document.querySelector('.loading')
    loading.style.display = 'none'

}

export  {Loadscreen, Hideload}