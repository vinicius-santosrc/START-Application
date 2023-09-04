import React from "react"

let intervalo;
let horas = 0;
let minutos = 0;
 let segundos = 0;
let isPaused = false;

function startcronometro() {
    

    document.querySelector("#startbtn").style.display = 'none'
    document.querySelector("#pausebtn").style.display = 'block'
    document.querySelector("#finalizar").style.display = 'block'


    intervalo = setInterval(() => {
        if(!isPaused) {
            segundos += 1;

            if(segundos === 60) {
                minutos++;
                segundos = 0;
            }
            if(minutos === 60) {
                horas++;
                minutos = 0;
            }

            document.querySelector("#segundos").textContent = formatTime(segundos)
            document.querySelector("#minutos").textContent = formatTime(minutos)
            document.querySelector("#hora").textContent = formatTime(horas)
            document.querySelector("#resume").style.display = 'none'
            
        
        }
    }, 1000);
}

function pausecronometro() {
    document.querySelector("#pausebtn").style.display = 'none'
    document.querySelector("#resume").style.display = 'block'
    isPaused = true;
}

function resumecronometro() {
    isPaused = false;
    document.querySelector("#pausebtn").style.display = 'block'
    document.querySelector("#resume").style.display = 'none'
}

function finalizarcronometro() {
    clearInterval(intervalo);
    minutos = 0;
    segundos = 0;
    horas = 0;

    document.querySelector("#segundos").textContent = '00';
    document.querySelector("#minutos").textContent = '00';
    document.querySelector("#hora").textContent = '00';

    document.querySelector("#startbtn").style.display = 'block'
    document.querySelector("#resume").style.display = 'none'
    document.querySelector("#pausebtn").style.display = 'none'
    document.querySelector("#finalizar").style.display = 'none'

}

function formatTime(time) {
    return time < 10 ? `0${time}` : time
}

export default function Cronometro() {
    return(
       <>
       <div className="cronometro-display">
        <div className="gif-image">
            <img src="https://usagif.com/wp-content/uploads/gifs/book-27.gif" />
        </div>
            <div className="cronometro-display-time">
                <h1 className="tempo" id="hora">00</h1>
                <span className="separador">:</span>
                <h1 className="tempo" id="minutos">00</h1>
                <span className="separador">:</span>
                <h1 className="tempo" id="segundos">00</h1>
            </div>
            <div className="cronometro-btns">
                <button onClick={startcronometro} id="startbtn">COMEÇAR</button>
                <button onClick={pausecronometro} id="pausebtn">PAUSAR</button>
                <button onClick={resumecronometro} id="resume">CONTINUAR</button>
                <button onClick={finalizarcronometro} id="finalizar">FINALIZAR</button>
            </div>
            <div className="frase-motivacional">
            <h2>NÃO DESISTA, CADA DIA VOCÊ ESTÁ MAIS PROXIMO DO SEU OBJETIVO</h2>
       </div>
       </div>
    
       </>
    )
}