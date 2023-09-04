import React from "react";
import Swal from 'sweetalert2'

let intervalo;
let horas = 0;
let minutos = 0;
let segundos = 0;
let isPaused = false;

function startcronometro() {
    horas = document.querySelector("#horasinput").value
    minutos = document.querySelector("#minutosinput").value
    segundos = document.querySelector("#segundosinput").value
    if(horas == 0 && minutos == 0 && segundos == 0) {
        horas = 2
    }
    
    if(horas > 24) {
        horas = 24
    }
    if(minutos > 59) {
        minutos = 59
    }
    if(segundos > 59) {
        segundos = 59
    }
    localStorage.setItem("fajitg3y8b1u9t134t.timepod", formatTime(horas)+ ":" + formatTime(minutos)+":"+formatTime(segundos))
    document.querySelector("#startbtn").style.display = 'none'
    document.querySelector("#pausebtn").style.display = 'block'
    document.querySelector("#finalizar").style.display = 'block'


    intervalo = setInterval(() => {
        if(!isPaused) {
            segundos -= 1;

            if(segundos === 60) {
                minutos--;
                segundos = 0;
            }
            if(minutos === 60) {
                horas--;
                minutos = 0;
            }

            if(segundos < 0) {
                minutos = minutos - 1;
                segundos = 59;
            }
            if(minutos < 0) {
                horas = horas - 1;
                minutos = 59
            }
            if(horas < 0) {
                horas = 23
            }
            if(horas == 0 && minutos == 0 && segundos == 0) {
                finalizarcronometro()
                completecronometro()
            }

            document.querySelector("#segundoscontador").textContent = formatTime(segundos)
            document.querySelector("#minutoscontador").textContent = formatTime(minutos)
            document.querySelector("#horacontador").textContent = formatTime(horas)
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
    Swal.fire({
        title: 'Finalizar?',
        text: "Você tem certeza que deseja terminar o modo foco?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#70FF00',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SIM!',
        cancelButtonText: "Não"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Parabéns!',
            'Você finalizou sua tarefa.',
            'success'
          )
          clearInterval(intervalo);
    minutos = 0;
    segundos = 0;
    horas = 0;

    document.querySelector("#startbtn").style.display = 'none'
    document.querySelector("#resume").style.display = 'none'
    document.querySelector("#pausebtn").style.display = 'none'
    document.querySelector("#finalizar").style.display = 'none'
    document.querySelector("#restartbutton").style.display = 'block'
        }
      })
    
}

function completecronometro() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Sua meta está feita.',
        text: "Volte amanhã para continuar trabalhando no seu progresso. Te aguardamos 👊",
        showConfirmButton: false,
        timer: 3500
      })
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time
}

function restartcronometro() {
    window.location.reload()
}

export default function FocoContagem() {
    return(
        <>
        <div className="cronometro-display">
             <div className="cronometro-display-time-pod">
                 <h1 className="tempo" id="horacontador"><input id="horasinput" placeholder="00" type="number" maxLength={2} /></h1>
                 <span className="separador">:</span>
                 <h1 className="tempo" id="minutoscontador"><input id="minutosinput" placeholder="00" type="number"  maxLength={2} /></h1>
                 <span className="separador">:</span>
                 <h1 className="tempo" id="segundoscontador"><input id="segundosinput" placeholder="00" type="number"  maxLength={2} /></h1>
             </div>
             <div className="cronometro-btns">
                <button onClick={startcronometro} id="startbtn">COMEÇAR</button>
                <button onClick={restartcronometro} id="restartbutton">REINICIAR</button>
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